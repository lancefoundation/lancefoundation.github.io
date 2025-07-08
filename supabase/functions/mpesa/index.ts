import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MPesaSTKRequest {
  phone: string;
  amount: number;
  donationId?: string;
}

interface MPesaCallback {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    if (req.method === 'POST' && path === 'stk-push') {
      // STK Push initiation
      const { phone, amount, donationId }: MPesaSTKRequest = await req.json();

      // Get M-Pesa credentials from Supabase secrets
      const consumerKey = Deno.env.get('MPESA_CONSUMER_KEY');
      const consumerSecret = Deno.env.get('MPESA_CONSUMER_SECRET');
      const shortcode = Deno.env.get('MPESA_SHORTCODE');
      const passkey = Deno.env.get('MPESA_PASSKEY');
      const callbackUrl = Deno.env.get('MPESA_CALLBACK_URL');

      if (!consumerKey || !consumerSecret || !shortcode || !passkey || !callbackUrl) {
        return new Response(
          JSON.stringify({ error: 'M-Pesa configuration not complete' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate OAuth token
      const auth = btoa(`${consumerKey}:${consumerSecret}`);
      const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      });

      const tokenData = await tokenResponse.json();
      if (!tokenData.access_token) {
        return new Response(
          JSON.stringify({ error: 'Failed to get M-Pesa access token' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate timestamp and password
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = btoa(`${shortcode}${passkey}${timestamp}`);

      // Format phone number
      const formattedPhone = phone.startsWith('0') ? `254${phone.slice(1)}` : phone.startsWith('+254') ? phone.slice(1) : phone;

      // STK Push request
      const stkPushPayload = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: donationId || 'DONATION',
        TransactionDesc: 'Donation to The Lance Foundation',
      };

      const stkResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkPushPayload),
      });

      const stkData = await stkResponse.json();

      if (stkData.ResponseCode === '0') {
        // Store transaction in database
        await supabase.from('mpesa_transactions').insert({
          merchant_request_id: stkData.MerchantRequestID,
          checkout_request_id: stkData.CheckoutRequestID,
          amount: amount,
          phone_number: formattedPhone,
          status: 'pending',
          donation_id: donationId,
        });

        return new Response(
          JSON.stringify({ success: true, checkoutRequestId: stkData.CheckoutRequestID }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ error: stkData.errorMessage || 'STK Push failed' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (req.method === 'POST' && path === 'callback') {
      // M-Pesa callback handler
      const callbackData: MPesaCallback = await req.json();
      const { stkCallback } = callbackData.Body;

      console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

      // Update transaction status
      const updateData: any = {
        result_code: stkCallback.ResultCode,
        result_desc: stkCallback.ResultDesc,
        status: stkCallback.ResultCode === 0 ? 'completed' : 'failed',
      };

      if (stkCallback.ResultCode === 0 && stkCallback.CallbackMetadata) {
        // Extract payment details
        const metadata = stkCallback.CallbackMetadata.Item;
        const receiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
        const transactionDate = metadata.find(item => item.Name === 'TransactionDate')?.Value;

        updateData.mpesa_receipt_number = receiptNumber;
        updateData.transaction_date = transactionDate ? new Date(String(transactionDate)) : null;
      }

      const { data: transaction } = await supabase
        .from('mpesa_transactions')
        .update(updateData)
        .eq('checkout_request_id', stkCallback.CheckoutRequestID)
        .select()
        .single();

      // If successful and linked to a donation, update donation status
      if (stkCallback.ResultCode === 0 && transaction?.donation_id) {
        await supabase
          .from('donations')
          .update({ 
            status: 'completed',
            transaction_id: transaction.mpesa_receipt_number 
          })
          .eq('id', transaction.donation_id);
      }

      return new Response('OK', { status: 200 });
    }

    return new Response(
      JSON.stringify({ error: 'Invalid endpoint' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('M-Pesa function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
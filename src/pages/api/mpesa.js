// src/pages/api/mpesa.js (Next.js API Route)
// Processes M-Pesa STK Push payment using Safaricom Daraja Sandbox

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { amount, phone } = req.body;

  // M-Pesa sandbox credentials
  const consumerKey = 'X4gKF13iuspqjsggpl3NnyPTX0Dp8ZTIRao9CP2GTNKNXg6Z';
  const consumerSecret = 'LVEbH1GMe5wnwHimSaw4PVF7iWwNAOUlX4KG2atbbk7qnPNe4azdlKbd93cOXouu';
  const shortCode = '174379'; // Default for sandbox
  const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
  const callbackUrl = 'https://webhook.site/your-custom-url'; // Replace with a real public URL for callbacks

  try {
    // 1. Get access token from Safaricom
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const accessToken = tokenRes.data.access_token;

    // 2. Prepare STK Push parameters
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // Format phone number to 2547XXXXXXXX
    let phoneNumber = phone;
    if (phoneNumber.startsWith('0')) phoneNumber = '254' + phoneNumber.slice(1);

    // 3. Initiate STK Push
    const stkRes = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: 'Donation',
        TransactionDesc: 'Donation'
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 4. Respond to frontend
    if (stkRes.data.ResponseCode === '0') {
      res.status(200).json({
        status: 'success',
        message: 'STK Push sent successfully. (In sandbox: use test phone 254708374149, PIN 1234)',
        data: stkRes.data,
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: stkRes.data.ResponseDescription,
        data: stkRes.data,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.response?.data?.errorMessage || err.message,
    });
  }
}

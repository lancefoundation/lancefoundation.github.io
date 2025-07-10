import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationNotificationRequest {
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  coverLetter: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      jobTitle, 
      applicantName, 
      applicantEmail, 
      applicantPhone, 
      coverLetter 
    }: ApplicationNotificationRequest = await req.json();

    console.log("Processing application notification for:", { jobTitle, applicantName });

    // Send notification to HR team
    const hrEmailResponse = await resend.emails.send({
      from: "HR System <careers@thelancefoundation.org>",
      to: ["denis.gathua@thelancefoundation.org", "careers@thelancefoundation.org"],
      subject: `New Job Application: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Job Application Received</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Position: ${jobTitle}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Applicant Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${applicantName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${applicantEmail}" style="color: #667eea; text-decoration: none;">
                      ${applicantEmail}
                    </a>
                  </td>
                </tr>
                ${applicantPhone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="tel:${applicantPhone}" style="color: #667eea; text-decoration: none;">
                      ${applicantPhone}
                    </a>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Applied:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</td>
                </tr>
              </table>
            </div>

            <h3 style="color: #333; margin-bottom: 10px;">Cover Letter</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <p style="margin: 0; line-height: 1.6; color: #555; white-space: pre-wrap;">${coverLetter}</p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0 0 15px 0; font-weight: bold;">Quick Actions</p>
              <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:${applicantEmail}?subject=Re: Your application for ${jobTitle}&body=Dear ${applicantName},%0D%0A%0D%0AThank you for your application for the ${jobTitle} position. We have received your application and will review it carefully.%0D%0A%0D%0ABest regards,%0D%0AThe Lance Foundation HR Team" 
                   style="background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; font-size: 14px;">
                  Reply to Applicant
                </a>
                <a href="https://gzefinshznzvlpygghxj.supabase.co/dashboard" 
                   style="background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; font-size: 14px;">
                  View in Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation email to applicant
    const applicantEmailResponse = await resend.emails.send({
      from: "The Lance Foundation <careers@thelancefoundation.org>",
      to: [applicantEmail],
      subject: `Application Received: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Application Received!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in joining our team</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #333; font-size: 16px; margin-top: 0;">Dear ${applicantName},</p>
            
            <p style="color: #555; line-height: 1.6;">
              Thank you for applying for the <strong>${jobTitle}</strong> position at The Lance Foundation. 
              We have successfully received your application and appreciate your interest in joining our mission 
              to make a positive impact in communities worldwide.
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
              <ul style="color: #555; line-height: 1.6; padding-left: 20px;">
                <li><strong>Review Process:</strong> Our HR team will carefully review your application within 3-5 business days.</li>
                <li><strong>Initial Screening:</strong> If your profile matches our requirements, we'll contact you for a preliminary discussion.</li>
                <li><strong>Interview Process:</strong> Qualified candidates will be invited for interviews with our team.</li>
                <li><strong>Decision:</strong> We'll notify all applicants of our decision via email.</li>
              </ul>
            </div>

            <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #333; margin-top: 0;">Application Summary</h4>
              <p style="color: #555; margin-bottom: 5px;"><strong>Position:</strong> ${jobTitle}</p>
              <p style="color: #555; margin-bottom: 5px;"><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p style="color: #555; margin-bottom: 0;"><strong>Application ID:</strong> TLF-${Date.now().toString().slice(-6)}</p>
            </div>

            <p style="color: #555; line-height: 1.6;">
              If you have any questions about your application or the role, please don't hesitate to contact us at 
              <a href="mailto:careers@thelancefoundation.org" style="color: #667eea;">careers@thelancefoundation.org</a>.
            </p>

            <p style="color: #555; line-height: 1.6;">
              Thank you again for your interest in The Lance Foundation. We look forward to reviewing your application!
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #777; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>The Lance Foundation HR Team</strong><br>
                <a href="https://thelancefoundation.org" style="color: #667eea;">www.thelancefoundation.org</a>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { 
      hrEmail: hrEmailResponse.data?.id, 
      applicantEmail: applicantEmailResponse.data?.id 
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        hrEmailId: hrEmailResponse.data?.id,
        applicantEmailId: applicantEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-application-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
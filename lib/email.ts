/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USERNAME,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

interface SendOTPParams {
  email: string;
  otp: string;
  username: string;
}

/**
 * Send OTP email to user
 */
export async function sendOTPEmail({
  email,
  otp,
  username,
}: SendOTPParams): Promise<{ success: boolean; message?: string }> {
  try {
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || "BC Gym"}" <${process.env.NEXT_PUBLIC_SMTP_USERNAME}>`,
      to: email,
      subject: "Your Login Code",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: linear-gradient(135deg, #0f1a14 0%, #18181b 100%);
                border-radius: 12px;
                padding: 40px;
                text-align: center;
              }
              .logo {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #d4af37 0%, #e6c76a 100%);
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
                color: #0f1a14;
              }
              h1 {
                color: #ffffff;
                margin: 0 0 10px;
                font-size: 24px;
              }
              p {
                color: #a1a1aa;
                margin: 0 0 30px;
              }
              .otp-container {
                background: #18181b;
                border: 2px solid #d4af37;
                border-radius: 8px;
                padding: 20px;
                margin: 30px 0;
              }
              .otp-code {
                font-size: 36px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #d4af37;
                margin: 0;
                font-family: 'Courier New', monospace;
              }
              .validity {
                color: #71717a;
                font-size: 14px;
                margin: 15px 0 0;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #27272a;
                color: #71717a;
                font-size: 12px;
              }
              .warning {
                background: #7f1d1d;
                border-left: 4px solid #ef4444;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
                text-align: left;
              }
              .warning p {
                color: #fca5a5;
                margin: 0;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">BC</div>
              <h1>Hello, ${username}!</h1>
              <p>Your one-time password (OTP) for login</p>
              
              <div class="otp-container">
                <p class="otp-code">${otp}</p>
                <p class="validity">Valid for 10 minutes</p>
              </div>

              <div class="warning">
                <p><strong>⚠️ Security Notice:</strong> Never share this code with anyone. Our team will never ask for your OTP.</p>
              </div>

              <div class="footer">
                <p>If you didn't request this code, please ignore this email.</p>
                <p>BC Gym Management System</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: error.message || "Failed to send email",
    };
  }
}

/**
 * Verify SMTP configuration
 */
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("SMTP configuration error:", error);
    return false;
  }
}

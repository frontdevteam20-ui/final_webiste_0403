import nodemailer from 'nodemailer';

// Create a transporter using custom domain SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false // Helps with self-signed certificates
    }
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, verificationCode, username } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ error: 'Email and verification code are required' });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Tech Cloud ERP" <noreply@techclouderp.com>',
      to: email,
      subject: 'Your Verification Code - Tech Cloud ERP Login',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #ff6b00;
              margin-bottom: 10px;
            }
            .code-box {
              background: #f8fafc;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 30px 0;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              color: #1e293b;
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
              margin: 10px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              font-size: 12px;
              color: #6b7280;
              text-align: center;
            }
            .warning {
              background: #fef2f2;
              border: 1px solid #fecaca;
              border-radius: 6px;
              padding: 15px;
              margin: 20px 0;
              color: #dc2626;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛡️ Tech Cloud ERP</div>
              <h1>Two-Factor Authentication</h1>
            </div>
            
            <p>Hello ${username || 'User'},</p>
            
            <p>You requested a verification code to sign in to your Tech Cloud ERP account. Use the code below to complete the authentication process.</p>
            
            <div class="code-box">
              <p style="margin: 0; font-weight: 600; color: #6b7280;">Your verification code is:</p>
              <div class="code">${verificationCode}</div>
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong><br>
              This code will expire in 10 minutes. Never share this code with anyone. If you didn't request this code, please ignore this email.
            </div>
            
            <p>If you have any questions or need assistance, please contact our support team.</p>
            
            <div class="footer">
              <p>© 2026 Tech Cloud ERP. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Verification email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}

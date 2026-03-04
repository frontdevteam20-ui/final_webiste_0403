import nodemailer from 'nodemailer';

// Test account for development - shows emails in browser
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, verificationCode, username } = req.body;

    // Create test account
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const mailOptions = {
      from: '"Tech Cloud ERP" <noreply@techclouderp.com>',
      to: email,
      subject: 'Your Verification Code - Tech Cloud ERP Login',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b00;">🛡️ Tech Cloud ERP</h2>
          <h1>Two-Factor Authentication</h1>
          <p>Hello ${username || 'User'},</p>
          <p>Your verification code is:</p>
          <div style="background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <div style="font-size: 32px; font-weight: bold; color: #1e293b; letter-spacing: 8px; font-family: monospace;">${verificationCode}</div>
          </div>
          <p style="color: #dc2626; background: #fef2f2; padding: 15px; border-radius: 6px;">
            <strong>⚠️ Security Notice:</strong> This code will expire in 10 minutes. Never share this code with anyone.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    
    res.status(200).json({ 
      success: true, 
      previewUrl: nodemailer.getTestMessageUrl(info),
      testAccount: {
        user: testAccount.user,
        pass: testAccount.pass
      },
      message: 'Test email sent - check preview URL'
    });

  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ 
      error: 'Failed to send test email',
      details: error.message 
    });
  }
}

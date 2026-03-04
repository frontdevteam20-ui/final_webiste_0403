export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mobile, action, verificationCode, username } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: 'Mobile number is required' });
    }

    // Validate mobile number format
    const cleanMobile = mobile.replace(/\s/g, '');
    const mobileRegex = /^\+[1-9]\d{1,14}$/;
    if (!mobileRegex.test(cleanMobile)) {
      return res.status(400).json({ error: 'Invalid mobile number format. Use format: +919502780215' });
    }

    if (action === 'send') {
      // Generate 6-digit OTP
      const generatedCode = Math.floor(100000 + Math.random() * 900000);
      
      // Store the code in a simple in-memory storage
      global.otpStore = global.otpStore || {};
      global.otpStore[cleanMobile] = {
        code: generatedCode,
        timestamp: Date.now(),
        attempts: 0
      };

      console.log(`OTP generated for ${cleanMobile}: ${generatedCode}`);
      
      // In development mode, show the code for testing
      const response = {
        success: true,
        message: 'OTP sent successfully',
        mobile: cleanMobile,
        developmentCode: process.env.NODE_ENV === 'development' ? generatedCode : undefined,
        note: 'This is a simulated OTP. For real SMS, enable Firebase Phone Auth in console.',
        expiresIn: 300 // 5 minutes
      };

      res.status(200).json(response);

    } else if (action === 'verify') {
      // Verify OTP
      if (!verificationCode) {
        return res.status(400).json({ error: 'Verification code is required' });
      }

      const storedData = global.otpStore && global.otpStore[cleanMobile];
      
      if (!storedData) {
        return res.status(400).json({ error: 'OTP not found or expired' });
      }

      // Check if OTP is expired (5 minutes)
      if (Date.now() - storedData.timestamp > 300000) {
        delete global.otpStore[cleanMobile];
        return res.status(400).json({ error: 'OTP expired' });
      }

      // Check attempts (max 3)
      if (storedData.attempts >= 3) {
        delete global.otpStore[cleanMobile];
        return res.status(400).json({ error: 'Too many attempts. Please request new OTP' });
      }

      // Verify code
      if (storedData.code.toString() === verificationCode.toString()) {
        delete global.otpStore[cleanMobile];
        res.status(200).json({ 
          success: true, 
          message: 'OTP verified successfully',
          mobile: cleanMobile
        });
      } else {
        storedData.attempts++;
        res.status(400).json({ 
          error: 'Invalid OTP',
          attemptsLeft: 3 - storedData.attempts
        });
      }

    } else {
      res.status(400).json({ error: 'Invalid action. Use "send" or "verify"' });
    }

  } catch (error) {
    console.error('OTP API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

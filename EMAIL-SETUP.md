# Email Setup for 2FA Authentication

## Quick Setup Guide

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update .env.local file**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_FROM="Tech Cloud ERP" <noreply@techclouderp.com>
   NODE_ENV=development
   ```

### Option 2: SendGrid (Production Ready)

1. **Sign up for SendGrid** at https://sendgrid.com
2. **Create an API Key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions

3. **Update .env.local file**:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   EMAIL_FROM="Tech Cloud ERP" <noreply@techclouderp.com>
   NODE_ENV=production
   ```

### Option 3: Other SMTP Providers

Update the SMTP settings in `.env.local`:
```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
EMAIL_FROM="Tech Cloud ERP" <noreply@techclouderp.com>
```

## Testing the Email Functionality

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test the login flow**:
   - Go to `/blogs/blogs/create-blog`
   - Enter credentials: `admin` / `TECH@WEB-Blog2026`
   - Complete captcha verification
   - Choose email verification
   - Check your email for the 6-digit code

3. **Check console logs** for debugging information

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**:
   - Check Gmail username and app password
   - Ensure 2FA is enabled on Gmail account

2. **"Connection refused"**:
   - Check SMTP host and port settings
   - Verify firewall isn't blocking SMTP

3. **"Email not received"**:
   - Check spam/junk folder
   - Verify recipient email address
   - Check console for error messages

### Debug Mode:

The system shows verification codes in development mode:
- Code appears in the UI (blue box)
- Code is logged to console
- Check browser console for detailed logs

## Security Notes

- **Never commit `.env.local` to version control**
- **Use app passwords instead of regular passwords**
- **Consider using a transactional email service for production**
- **Monitor email deliverability and spam complaints**

## Production Deployment

For production deployment:
1. Use a transactional email service (SendGrid, Mailgun, AWS SES)
2. Set up proper DNS records (SPF, DKIM, DMARC)
3. Monitor email metrics and deliverability
4. Set up email bounce handling
5. Use environment variables for configuration

## SMS Integration (Optional)

To add SMS verification, integrate with:
- **Twilio**: https://www.twilio.com
- **AWS SNS**: https://aws.amazon.com/sns
- **MessageBird**: https://www.messagebird.com

Example Twilio integration would go in the `handleSendCode` function.

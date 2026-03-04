# Gmail App Password Setup Guide

## ⚠️ Important: You Need an App Password

Gmail no longer allows regular passwords for third-party apps. You must create an **App Password**.

## 🔧 Step-by-Step Setup (2 minutes)

### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com
2. Click **Security** in the left menu
3. Find **2-Step Verification** and click it
4. If it's off, turn it **ON**
5. Follow the setup process (add phone number, etc.)

### Step 2: Generate App Password
1. Still in **Security** settings, find **App Passwords**
2. Click **App Passwords** (you may need to sign in again)
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)**
5. Enter a name like **"Tech Cloud ERP 2FA"**
6. Click **Generate**
7. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Your Configuration
Replace your current password with the app password:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sowmyaodela1998@gmail.com
SMTP_PASS=your-16-character-app-password-here
EMAIL_FROM="Tech Cloud ERP" <noreply@techclouderp.com>
```

## 🚨 Common Mistakes

### ❌ Don't use your regular Gmail password
- Regular passwords won't work with SMTP
- Must use the 16-character app password

### ❌ Don't include spaces in the app password
- Remove all spaces when copying to .env.local
- Example: `abcd efgh ijkl mnop` → `abcdefghijklmnop`

### ❌ Don't forget to restart your server
- After updating .env.local, restart: `npm run dev`

## ✅ What Should Happen

After setting up the app password:
1. Restart your dev server
2. Test the login flow
3. You should receive emails at `sowmyaodela1998@gmail.com`

## 🔍 Troubleshooting

### "Authentication failed" error:
- Double-check app password (no spaces)
- Ensure 2FA is enabled on your Gmail account
- Generate a new app password if needed

### "Network error" message:
- Check your internet connection
- Verify SMTP settings are correct
- Look at browser console for detailed errors

## 🎯 Quick Test

Once you have the app password:
1. Update .env.local
2. Restart server: `npm run dev`
3. Test with credentials: `admin` / `TECH@WEB-Blog2026`
4. Check your Gmail inbox!

---

**The app password is different from your regular Gmail password and is required for SMTP access!**

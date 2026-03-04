# 🔥 Firebase Hosting Deployment Guide

## 🎯 Deploy Your 2FA System to Firebase Hosting

### **Why Firebase Hosting?**
- ✅ **Free tier**: Generous hosting limits
- ✅ **Global CDN**: Fast content delivery
- ✅ **SSL certificates**: Automatic HTTPS
- ✅ **Custom domain**: Easy domain setup
- ✅ **Firebase integration**: Seamless with your existing Firebase project

---

## 🔧 Step 1: Install Firebase CLI

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Or using npm
npm install -g firebase-tools
```

---

## 🔧 Step 2: Initialize Firebase Hosting

```bash
# Login to Firebase
firebase login

# Initialize Firebase Hosting in your project
firebase init hosting
```

### **Configuration Options:**
```
? Please select an option: Use an existing project
? Select a default Firebase project: tcerp-newversion
? What do you want to use as your public directory? out
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File out/index.html already exists. Overwrite? No
```

---

## 🔧 Step 3: Configure Firebase for Next.js

### **Update firebase.json:**
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          }
        ]
      }
    ]
  }
}
```

---

## 🔧 Step 4: Update Next.js for Static Export

### **Update next.config.mjs:**
```javascript
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: true,
  
  // Enable static export for Firebase Hosting
  output: 'export',
  distDir: 'out',
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Disable server-side features for static export
  experimental: {
    appDir: false,
  },
};

export default config;
```

---

## 🔧 Step 5: Build for Static Export

### **Option 1: Build with Memory Fix**
```bash
# Increase memory and build
set NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

### **Option 2: Use Development Build (If Memory Issues Persist)**
```bash
# Skip heavy optimization
set NODE_ENV=production
set NEXT_MINIMIZE=false
npm run build
```

---

## 🔧 Step 6: Deploy to Firebase Hosting

```bash
# Deploy to Firebase Hosting
firebase deploy

# Or deploy to specific site
firebase deploy --only hosting
```

---

## 🎯 Alternative: Use Firebase App Hosting (New)

### **For Next.js Apps, Firebase App Hosting is Better:**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize App Hosting
firebase init apphosting

# Deploy
firebase deploy
```

### **Benefits of App Hosting:**
- ✅ **Next.js optimized**: Built for Next.js apps
- ✅ **Server-side rendering**: Full Next.js features
- ✅ **API routes**: Your 2FA API routes work
- ✅ **Automatic builds**: CI/CD integration
- ✅ **Environment variables**: Secure configuration

---

## 🔧 Step 7: Configure Environment Variables

### **For App Hosting:**
```bash
# Set environment variables
firebase apphosting:secrets:set SMTP_HOST
firebase apphosting:secrets:set SMTP_USER
firebase apphosting:secrets:set SMTP_PASS
firebase apphosting:secrets:set FIREBASE_API_KEY
```

### **For Static Hosting:**
Environment variables are embedded during build time.

---

## 🎯 Recommended: Firebase App Hosting

Since you have API routes for 2FA, **Firebase App Hosting** is better than static hosting:

### **Why App Hosting:**
- ✅ **API routes work**: Your email/SMS APIs will function
- ✅ **Server-side features**: Full Next.js capabilities
- ✅ **Environment variables**: Secure secret management
- ✅ **Automatic scaling**: Handles traffic spikes
- ✅ **Build optimization**: Handles memory issues

### **Deploy with App Hosting:**
```bash
# Initialize App Hosting
firebase init apphosting

# Select your project: tcerp-newversion
# Configure build settings
# Deploy
firebase deploy
```

---

## 🎉 Deployment Success

### **After Deployment:**
1. **Test your 2FA system** at the Firebase URL
2. **Verify email verification** works
3. **Test SMS verification** with fallback
4. **Check all authentication flows**

### **Firebase Hosting Features:**
- ✅ **Free SSL certificate**
- ✅ **Global CDN**
- ✅ **Custom domain support**
- ✅ **Automatic deployments**
- ✅ **Version history**

---

## 🚀 Quick Deploy Commands

### **For Static Hosting:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### **For App Hosting (Recommended):**
```bash
npm install -g firebase-tools
firebase login
firebase init apphosting
firebase deploy
```

---

## 🎯 Your 2FA System on Firebase

### **What Works:**
- ✅ **Email verification**: Gmail SMTP integration
- ✅ **SMS verification**: Firebase Phone Auth + fallback
- ✅ **Captcha protection**: reCAPTCHA integration
- ✅ **Authentication flow**: Complete 2FA system
- ✅ **Blog creation**: Full functionality

### **Firebase Benefits:**
- 🔥 **Same project**: Uses your existing Firebase project
- 🌍 **Global CDN**: Fast content delivery
- 🔒 **Free SSL**: Automatic HTTPS
- 📊 **Analytics**: Built-in performance monitoring
- 🚀 **Scalability**: Handles 100+ users

---

**Deploy your 2FA system to Firebase Hosting - it's the perfect match for your Firebase-powered application!** 🔥

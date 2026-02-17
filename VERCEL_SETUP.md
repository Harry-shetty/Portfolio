# 🚀 Vercel Deployment Guide

## ⚠️ IMPORTANT: Set Environment Variables in Vercel

Your form is trying to send to a placeholder URL. You need to configure the Google Apps Script URL in Vercel.

## 📝 Step-by-Step Instructions

### 1. Go to Your Vercel Project
1. Open your Vercel dashboard: https://vercel.com/dashboard
2. Select your Portfolio project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

### 2. Add the Google Apps Script URL
Add this environment variable:

**Variable Name:**
```
VITE_GOOGLE_SCRIPT_URL
```

**Value:**
```
https://script.google.com/macros/s/AKfycbzUflnfZp1SFF-ZrhQUcgRTOWtdbEXctIAWTVGQL5nv9IBPT_1S6TKxuRzJQJpP1engGw/exec
```

**Environment:** Select all (Production, Preview, Development)

### 3. Redeploy Your Site
After adding the environment variable:
1. Go to **Deployments** tab
2. Click the **⋮** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for the deployment to complete

### 4. Test Your Form
1. Visit your deployed site
2. Fill out the contact form
3. Submit the message
4. Check your Google Sheet - the data should appear!

## 🔍 Troubleshooting

### If the form still doesn't work:

1. **Verify the environment variable is set:**
   - Go to Settings → Environment Variables
   - Make sure `VITE_GOOGLE_SCRIPT_URL` is there
   - Check that it's enabled for Production

2. **Redeploy is required:**
   - Environment variables only take effect after redeployment
   - Always redeploy after adding/changing variables

3. **Check the Apps Script deployment:**
   - Make sure "Who has access" is set to **Anyone**
   - The URL should end with `/exec`

4. **Check browser console:**
   - If you see CORS errors, make sure the Apps Script has "Who has access: Anyone"
   - The form uses `mode: "no-cors"` which should work for Google Apps Script

## ✅ Expected Result

After configuration:
- Form submissions go directly to Google Sheets
- No backend server needed for production
- Instant data appears in your spreadsheet
- Success message displays after submission

## 📊 View Submissions
Your Google Sheet: https://docs.google.com/spreadsheets/d/1W30kNIrqgxZUUidGvTmdgbSokdm34D4BPaz-HSnjQ2M/edit

---

**Need help?** Check the QUICK_SETUP.md for Google Apps Script deployment instructions.

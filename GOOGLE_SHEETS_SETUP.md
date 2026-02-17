# Google Sheets Integration Setup Guide

## Complete Setup Instructions

### Step 1: Deploy Google Apps Script

1. Open your Google Sheet:
   https://docs.google.com/spreadsheets/d/1W30kNIrqgxZUUidGvTmdgbSokdm34D4BPaz-HSnjQ2M/edit

2. Click **Extensions** > **Apps Script**

3. Delete any existing code in the script editor

4. Copy and paste the entire contents of `server/google-sheets-script.js` into the editor

5. Click the **Save** icon (💾) and name your project (e.g., "Portfolio Contact Form")

6. Click **Deploy** > **New deployment**

7. Click the gear icon ⚙️ next to "Select type" and choose **Web app**

8. Configure deployment:
   - **Description**: Portfolio Contact Form v1
   - **Execute as**: Me (your@email.com)
   - **Who has access**: Anyone

9. Click **Deploy**

10. You may need to authorize the script:
    - Click **Authorize access**
    - Choose your Google account
    - Click **Advanced** > **Go to [Project name] (unsafe)**
    - Click **Allow**

11. **Copy the Web App URL** that appears (it will look like):
    ```
    https://script.google.com/macros/s/AKfycby.../exec
    ```

### Step 2: Configure Your Frontend

#### For Local Development:

Create a file `.env.local` in the project root:
```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

#### For Vercel Deployment:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Value**: Your Web App URL from Step 1
   - **Environments**: Production, Preview, Development
4. Click **Save**
5. Redeploy your site

### Step 3: Test the Integration

1. Start your frontend:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173/

3. Scroll to the Contact section

4. Fill out the form and click "Send Message"

5. Check your Google Sheet - you should see a new row with:
   - Timestamp
   - Name
   - Email
   - Message

## Important Notes

- **No Backend Required**: This solution works directly from the browser to Google Sheets
- **CORS Handling**: The script uses `mode: "no-cors"` which means you won't see response data in the browser, but the request will succeed
- **Rate Limits**: Google Apps Script has execution limits (6 min/execution, quotas apply)
- **Security**: The Web App URL is public but only accepts POST requests with your specific data format

## Troubleshooting

### Messages Not Appearing in Sheet

1. Check the Apps Script execution log:
   - Go to Apps Script editor
   - Click **Executions** (clock icon)
   - Look for errors

2. Verify the deployment is active:
   - Click **Deploy** > **Manage deployments**
   - Ensure your deployment is listed

3. Check browser console for errors

### "Authorization Required" Error

- Redeploy the script with "Who has access: Anyone"
- Make sure you authorized the script to access your Google account

### Environment Variable Not Working

- Restart your dev server after adding `.env.local`
- For Vercel, redeploy after adding environment variables
- Variable names MUST start with `VITE_` to be exposed to the frontend

## Alternative: Keep Using Backend

If you prefer to keep using your Express backend instead:

1. Don't set `VITE_GOOGLE_SCRIPT_URL`
2. The form will automatically fall back to your backend API
3. Backend can still optionally write to Google Sheets using the service account method

## Sheet Column Structure

Your Google Sheet will have these columns:
- **A**: Timestamp (auto-generated)
- **B**: Name
- **C**: Email
- **D**: Message

The script automatically adds headers on first run.

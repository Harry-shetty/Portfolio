# Quick Setup: Google Sheets Integration

## ✅ Step-by-Step Instructions

### 1. Open Your Google Sheet
Your sheet is already open in the browser:
https://docs.google.com/spreadsheets/d/1W30kNIrqgxZUUidGvTmdgbSokdm34D4BPaz-HSnjQ2M/edit

### 2. Open Apps Script Editor
- Click **Extensions** in the menu
- Select **Apps Script**

### 3. Paste the Script
Copy this entire code and paste it in the Apps Script editor:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, message } = data;
    
    if (!name || !email || !message) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'All fields required' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    // Append new submission
    const timestamp = new Date();
    sheet.appendRow([timestamp, name, email, message]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'Portfolio Contact Form API' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### 4. Deploy the Script
- Click **Deploy** button (top right)
- Select **New deployment**
- Click the gear icon ⚙️ next to "Select type"
- Choose **Web app**
- Settings:
  - **Description**: Portfolio Contact Form
  - **Execute as**: Me (your email)
  - **Who has access**: Anyone
- Click **Deploy**
- **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)

### 5. Update Your Frontend Environment
Create a file `.env` in your project root:

```bash
VITE_GOOGLE_SCRIPT_URL=<paste the Web App URL here>
```

### 6. Restart Your Frontend Server
Stop the current server (Ctrl+C) and restart:
```bash
npm run dev
```

## 🎉 Done!
Now when you submit the contact form, it will go directly to Google Sheets!

## 🔍 Testing
1. Submit a test message from your portfolio
2. Check your Google Sheet - you should see the data appear immediately
3. The sheet will automatically create headers on first submission

## ⚠️ Troubleshooting
- If you get "Authorization required", make sure you selected "Execute as: Me"
- If submissions fail, check the Apps Script logs: View → Executions
- Make sure "Who has access" is set to "Anyone"

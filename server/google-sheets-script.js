/**
 * Google Apps Script for Portfolio Contact Form
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1W30kNIrqgxZUUidGvTmdgbSokdm34D4BPaz-HSnjQ2M/edit
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code and paste this script
 * 4. Click Deploy > New deployment
 * 5. Select type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy and copy the Web App URL
 * 9. Set VITE_GOOGLE_SCRIPT_URL environment variable to that URL in your frontend
 */

function doPost(e) {
  try {
    // Parse the incoming request
    const data = JSON.parse(e.postData.contents);
    const { name, email, message } = data;
    
    // Validate required fields
    if (!name || !email || !message) {
      return ContentService.createTextOutput(
        JSON.stringify({ 
          success: false, 
          error: 'name, email and message are required' 
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    // Append the new row with timestamp
    const timestamp = new Date();
    sheet.appendRow([timestamp, name, email, message]);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully',
        timestamp: timestamp.toISOString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Handle GET requests for testing
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      status: 'ok',
      message: 'Portfolio Contact Form API is running. Use POST to submit data.' 
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

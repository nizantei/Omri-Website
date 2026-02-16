/**
 * Google Apps Script — Lead Collection for Campaign Website
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Copy this entire file content into the Code.gs editor
 * 3. Click "Deploy" > "New deployment"
 * 4. Select type: "Web app"
 * 5. Set "Execute as": Me (your account)
 * 6. Set "Who has access": Anyone
 * 7. Click "Deploy" and authorize when prompted
 * 8. Copy the Web App URL
 * 9. Paste the URL into config/settings.js → SETTINGS.form.submissionEndpoint
 *
 * The script will automatically create a Google Sheet named "Campaign Leads"
 * in your Google Drive on first submission.
 */

// Sheet name constant
var SHEET_NAME = 'Campaign Leads';

/**
 * Handle POST requests from the website form
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet();

    // Append the lead data as a new row
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.phone || '',
      data.hostMeetings ? 'Yes' : 'No',
      data.volunteer ? 'Yes' : 'No',
      data.joinUpdates ? 'Yes' : 'No',
      data.timestamp || new Date().toISOString(),
      data.source || '',
      data.language || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Lead collection endpoint is active.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get existing sheet or create a new one with headers
 */
function getOrCreateSheet() {
  var ss;
  var files = DriveApp.getFilesByName(SHEET_NAME);

  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create(SHEET_NAME);
    var sheet = ss.getActiveSheet();

    // Add headers
    sheet.appendRow([
      'Name',
      'Email',
      'Phone',
      'Host Meetings',
      'Volunteer',
      'Join Updates',
      'Timestamp',
      'Source URL',
      'Language'
    ]);

    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, 9);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1B2A4A');
    headerRange.setFontColor('#FFFFFF');

    // Auto-resize columns
    for (var i = 1; i <= 9; i++) {
      sheet.autoResizeColumn(i);
    }

    // Set column widths for readability
    sheet.setColumnWidth(1, 150); // Name
    sheet.setColumnWidth(2, 200); // Email
    sheet.setColumnWidth(3, 130); // Phone
    sheet.setColumnWidth(7, 200); // Timestamp
  }

  return ss.getActiveSheet();
}

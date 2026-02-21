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

// Client's email-sending script URL (deployed from client's Google account)
// Replace with the actual URL after client deploys EmailSender.gs
var EMAIL_SCRIPT_URL = '';

// Shared secret — must match the secret in EmailSender.gs
var EMAIL_SECRET = 'Omri_Ronen_2026';

// Expected headers (source of truth)
var HEADERS = [
  'Name', 'Email', 'Phone', 'City',
  'Host Meetings', 'Volunteer', 'Receive Updates',
  'Timestamp', 'Source URL', 'Language'
];

/**
 * Handle POST requests from the website form
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet();

    // Force phone to plain text by prepending apostrophe
    var phone = String(data.phone || '');
    if (phone && /^[+=\-@]/.test(phone)) {
      phone = "'" + phone;
    }

    // Append the lead data as a new row
    sheet.appendRow([
      String(data.name || ''),
      String(data.email || ''),
      phone,
      String(data.city || ''),
      data.hostMeetings ? 'Yes' : 'No',
      data.volunteer ? 'Yes' : 'No',
      data.receiveUpdates ? 'Yes' : 'No',
      data.timestamp || new Date().toISOString(),
      String(data.source || ''),
      String(data.language || '')
    ]);

    // Set the phone column (column 3) to plain text format for the new row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 3).setNumberFormat('@');

    // Trigger welcome email via client's script
    if (EMAIL_SCRIPT_URL) {
      try {
        UrlFetchApp.fetch(EMAIL_SCRIPT_URL, {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify({
            secret: EMAIL_SECRET,
            name: data.name,
            email: data.email
          }),
          muteHttpExceptions: true
        });
      } catch (emailErr) {
        console.error('Email trigger failed: ' + emailErr.toString());
      }
    }

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
 * Get existing sheet or create a new one with headers.
 * If an existing sheet has outdated headers, they are updated.
 */
function getOrCreateSheet() {
  var ss;
  var files = DriveApp.getFilesByName(SHEET_NAME);

  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
    var sheet = ss.getActiveSheet();

    // Check if headers match — fix if columns were added
    var currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (currentHeaders.length !== HEADERS.length || String(currentHeaders) !== String(HEADERS)) {
      // Overwrite header row with correct headers
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setValues([HEADERS]);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1B2A4A');
      headerRange.setFontColor('#FFFFFF');
    }

    // Always set phone column to plain text
    sheet.getRange(1, 3, sheet.getMaxRows(), 1).setNumberFormat('@');

    return sheet;
  }

  // Create new sheet
  ss = SpreadsheetApp.create(SHEET_NAME);
  var sheet = ss.getActiveSheet();

  // Add headers
  sheet.appendRow(HEADERS);

  // Format header row
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#1B2A4A');
  headerRange.setFontColor('#FFFFFF');

  // Auto-resize columns
  for (var i = 1; i <= HEADERS.length; i++) {
    sheet.autoResizeColumn(i);
  }

  // Set column widths for readability
  sheet.setColumnWidth(1, 150); // Name
  sheet.setColumnWidth(2, 200); // Email
  sheet.setColumnWidth(3, 130); // Phone
  sheet.setColumnWidth(4, 150); // City
  sheet.setColumnWidth(8, 200); // Timestamp

  // Set phone column to plain text
  sheet.getRange(1, 3, sheet.getMaxRows(), 1).setNumberFormat('@');

  return sheet;
}


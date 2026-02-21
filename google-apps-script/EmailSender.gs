/**
 * Google Apps Script — Email Sender (deployed from CLIENT's account)
 *
 * SETUP:
 * 1. Client logs into Google with their account
 * 2. Goes to https://script.google.com → New project
 * 3. Pastes this code
 * 4. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Authorize when prompted
 * 6. Copy the Web App URL and give it to the developer
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Verify secret key to prevent unauthorized use
    if (data.secret !== 'Omri_Ronen_2026') {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sendWelcomeEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Email sender is active.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendWelcomeEmail(data) {
  var email = String(data.email || '').trim();
  if (!email) return;

  var name = String(data.name || '').trim();
  var firstName = name.split(' ')[0] || '';

  var subject = 'תודה שהצטרפת! — עמרי רונן';

  var htmlBody = '<!DOCTYPE html>'
    + '<html dir="rtl" lang="he"><head><meta charset="UTF-8"></head>'
    + '<body style="font-family:Heebo,Arial,sans-serif;background:#f8f9fa;margin:0;padding:0;">'
    + '<div style="max-width:560px;margin:2rem auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">'
    // Header
    + '<div style="background:#1B2A4A;padding:1.5rem 2rem;text-align:center;">'
    + '<h1 style="color:#fff;margin:0;font-size:1.6rem;">עמרי רונן</h1>'
    + '<p style="color:#E8F0FE;margin:0.25rem 0 0;font-size:1rem;">בונים מחדש</p>'
    + '</div>'
    // Body
    + '<div style="padding:2rem;">'
    + '<p style="font-size:1.1rem;color:#1A1A2E;margin:0 0 1rem;">שלום ' + firstName + ',</p>'
    + '<p style="font-size:1rem;color:#555;line-height:1.8;margin:0 0 1rem;">'
    + 'תודה רבה שהצטרפת אלינו! אנחנו שמחים שבחרת להיות חלק מהתנועה.'
    + '</p>'
    + '<p style="font-size:1rem;color:#555;line-height:1.8;margin:0 0 1.5rem;">'
    + 'בקרוב נעדכן אותך בחדשות, אירועים ודרכים להשתתף בפעילות. יחד נוכל לחולל שינוי אמיתי.'
    + '</p>'
    // WhatsApp button
    + '<div style="text-align:center;margin:1.5rem 0;">'
    + '<a href="https://chat.whatsapp.com/D4oyjjwzNs05S8IvWxZqhP?mode=gi_t" '
    + 'style="display:inline-block;background:#25D366;color:#fff;padding:0.75rem 2rem;border-radius:8px;'
    + 'text-decoration:none;font-weight:700;font-size:1rem;">הצטרפו לקבוצת הוואטסאפ</a>'
    + '</div>'
    // Register button
    + '<div style="text-align:center;margin:1rem 0;">'
    + '<a href="https://p.democrats.org.il/Cw7gd" '
    + 'style="display:inline-block;background:#2C5F8A;color:#fff;padding:0.75rem 2rem;border-radius:8px;'
    + 'text-decoration:none;font-weight:700;font-size:1rem;">הרשמה למפלגה</a>'
    + '</div>'
    + '</div>'
    // Footer
    + '<div style="background:#f8f9fa;padding:1.25rem 2rem;text-align:center;font-size:0.85rem;color:#888;">'
    + '<p style="margin:0;">צוות הקמפיין של עמרי רונן</p>'
    + '<p style="margin:0.25rem 0 0;font-size:0.8rem;">קיבלת מייל זה כי נרשמת באתר הקמפיין. לבקשת הסרה, השב/י למייל זה.</p>'
    + '</div>'
    + '</div></body></html>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody,
    name: 'עמרי רונן — צוות הקמפיין'
  });
}

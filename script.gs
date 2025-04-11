// Main function to check and send emails
function checkAndSendEmails() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  const formattedToday = formatDate(today);

  // Skip header row
  data.slice(1).forEach(row => {
    const name = row[1]; // Full Name
    const email = row[2]; // Email
    const sendDate = row[3]; // Send Date
    const content = row[4]; // Content
    const fileId = row[5]; // Google Drive File ID

    if (formattedToday === sendDate) {
      const personalizedContent = content.replace("[Full Name]", name);
      sendEmail(email, "Automated Notification", personalizedContent, fileId);
    }
  });
}

// Send email with attachment
function sendEmail(to, subject, content, fileId) {
  try {
    let attachments = [];
    if (fileId) {
      const file = DriveApp.getFileById(fileId);
      attachments.push(file.getBlob());
    }

    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: content,
      attachments: attachments
    });
    Logger.log(`Email sent to: ${to}`);
  } catch (e) {
    Logger.log(`Error sending email to ${to}: ${e.message}`);
  }
}

// Format date to dd/MM/yyyy
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Create daily trigger to run at 7 AM
function createDailyTrigger() {
  deleteAllTriggers(); // Remove old triggers
  ScriptApp.newTrigger("checkAndSendEmails")
    .timeBased()
    .atHour(7) // 7 AM UTC, adjust if needed
    .everyDays(1)
    .create();
}

// Delete all existing triggers
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
}

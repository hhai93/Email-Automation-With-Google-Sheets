// Hàm chính kiểm tra và gửi email
function checkAndSendEmails() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  const formattedToday = formatDate(today);

  // Bỏ qua hàng tiêu đề
  data.slice(1).forEach(row => {
    const name = row[1]; // Họ tên
    const email = row[2]; // Email
    const sendDate = row[3]; // Ngày gửi
    const content = row[4]; // Nội dung
    const fileId = row[5]; // File ID trên Google Drive

    if (formattedToday === sendDate) {
      const personalizedContent = content.replace("[Họ tên]", name);
      sendEmail(email, "Automated Notification", personalizedContent, fileId);
    }
  });
}

// Gửi email với file đính kèm
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

// Định dạng ngày thành dd/MM/yyyy
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Tạo trigger chạy tự động lúc 7h sáng mỗi ngày
function createDailyTrigger() {
  deleteAllTriggers(); // Xóa trigger cũ
  ScriptApp.newTrigger("checkAndSendEmails")
    .timeBased()
    .atHour(7) // 7h sáng UTC, chỉnh nếu cần
    .everyDays(1)
    .create();
}

// Xóa tất cả trigger hiện có
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
}

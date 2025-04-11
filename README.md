# Email-Automation-with-Google-Sheets

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/hhai93/Email-Automation-with-Google-Sheets)

Automate email sending with **Google Apps Script** using a Google Sheets schedule. Sends personalized emails with attachments from Google Drive when the "Send Date" matches today.

---

## :sparkles: Features
- Daily email sending based on a Google Sheets date column.
- Mail merge support (e.g., `[Full Name]`).
- Attaches Google Drive files via File IDs.

---

## :memo: Spreadsheet Setup
Use this format in Google Sheets:

| No. | Full Name | Email            | Send Date  | Content         | File ID          |
|-----|-----------|------------------|------------|-----------------|------------------|
| 1   | John Doe  | john@example.com | 15/04/2025 | Hello [Full Name] | abc123xyz      |
| 2   | Jane Smith| jane@example.com | 20/04/2025 | Hi there        | def456uvw      |

- **Send Date**: `dd/MM/yyyy`.
- **File ID**: From Google Drive URL (`https://drive.google.com/file/d/[FILE_ID]/view`).

---

## :rocket: Quick Setup
1. Create a Google Sheet with the above structure.
2. Upload attachments to Google Drive, add File IDs to the sheet.
3. Go to **Extensions > Apps Script**, paste `script.gs`, and save.
4. Run `checkAndSendEmails()` to authorize permissions.
5. Run `createDailyTrigger()` to schedule daily at 7 AM (UTC). Edit `.atHour(7)` for your time zone (e.g., `.atHour(0)` for UTC+7).

---

## :warning: Notes
- Google Apps Script email limit: 100/day (free accounts), 1500/day (Google Workspace).
- Ensure File IDs are accessible to your Google account.

---

## :computer: Files
- `script.gs`: Core automation script.
- `README.md`: This guide.

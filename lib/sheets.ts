import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

export async function appendToSheet(
  auth: GoogleAuth,
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<void> {
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

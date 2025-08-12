#!/usr/bin/env node
import { Command } from "commander";
import { fetchMeals } from "../lib/yazio.js";
import { appendToSheet } from "../lib/sheets.js";
import { authenticate } from "../lib/auth.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const program = new Command();

interface ExportOptions {
  start: string;
  end: string;
}

program
  .name("yazio-export")
  .description("Export Yazio data to Google Sheets")
  .version("0.1.0");

program
  .command("export")
  .description("Export meals to Google Sheets")
  .option("-s, --start <date>", "Start date YYYY-MM-DD")
  .option("-e, --end <date>", "End date YYYY-MM-DD")
  .action(async (opts: ExportOptions) => {
    const { start, end } = opts;
    
    if (!start || !end) {
      console.error("❌ Both start and end dates are required");
      process.exit(1);
    }
    
    if (!process.env.SPREADSHEET_ID) {
      console.error("❌ SPREADSHEET_ID environment variable is required");
      process.exit(1);
    }
    
    try {
      console.log(`Fetching Yazio data from ${start} to ${end}...`);
      const meals = await fetchMeals(start, end);
      
      console.log("Authorizing Google Sheets...");
      const auth = await authenticate();

      console.log("Appending data...");
      await appendToSheet(auth, process.env.SPREADSHEET_ID, "Sheet1!A1", meals);

      console.log("✅ Export completed!");
    } catch (error) {
      console.error("❌ Export failed:", error);
      process.exit(1);
    }
  });

program.parse();

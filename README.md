# Yazio Export Tool

A TypeScript CLI tool for exporting Yazio data to Google Sheets.

## Prerequisites

1. **Google Sheets API Setup**: You need to set up Google Sheets API credentials:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API
   - Create a service account and download the JSON key file
   - Rename the key file to `service-account-key.json` and place it in the project root

2. **Environment Variables**: Copy `.env.example` to `.env` and fill in your details:
   ```
   YAZIO_EMAIL=your@email.com
   YAZIO_PASSWORD=yourpassword
   SPREADSHEET_ID=your_google_sheet_id
   ```

## Installation

```bash
npm install
```

## Development

For development with TypeScript hot-reloading:

```bash
npm run dev -- export --start 2024-01-01 --end 2024-01-31
```

## Building

To compile TypeScript to JavaScript:

```bash
npm run build
```

## Production Usage

After building, you can run the compiled version:

```bash
npm start -- export --start 2024-01-01 --end 2024-01-31
```

Or install globally and use the CLI:

```bash
npm install -g .
yazio-export export --start 2024-01-01 --end 2024-01-31
```

## Commands

### export

Export meals from Yazio to Google Sheets.

**Options:**
- `-s, --start <date>`: Start date in YYYY-MM-DD format
- `-e, --end <date>`: End date in YYYY-MM-DD format

**Example:**
```bash
yazio-export export --start 2024-01-01 --end 2024-01-31
```

## TypeScript Features

This project is now fully converted to TypeScript with:

- Type-safe function parameters and return types
- Proper interfaces for data structures
- Development mode with `tsx` for hot-reloading
- Build process that compiles to JavaScript
- Type declarations included in the build output

## Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Run in development mode with hot-reloading
- `npm start`: Run the compiled JavaScript version
- `npm run clean`: Remove the dist directory
- `npm run prepublishOnly`: Clean and build before publishing

## File Structure

```
├── bin/
│   └── index.ts          # CLI entry point
├── lib/
│   ├── auth.ts           # Google Sheets authentication
│   ├── sheets.ts         # Google Sheets operations
│   └── yazio.ts          # Yazio data fetching
├── dist/                 # Compiled JavaScript output
├── .env                  # Environment variables
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project configuration
```

## Notes

- The `lib/yazio.ts` currently contains placeholder implementation
- The `lib/auth.ts` expects a `service-account-key.json` file for authentication
- Both files will need proper implementation based on your specific requirements

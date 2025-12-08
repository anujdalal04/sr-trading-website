# SR Trading Co. Website

Welcome to the official repository for the **SR Trading Co.** website. This project is a modern, responsive website built for a water pump and machinery trading business, featuring a robust contact form that sends emails and saves leads to Google Sheets.

## Features

### 1. Modern UI/UX
- Responsive design for mobile and desktop.
- Smooth scrolling and animations.
- "Glassmorphism" design elements.

<img width="1266" height="714" alt="Screenshot 2025-12-08 at 15 26 57" src="https://github.com/user-attachments/assets/ab8efa03-bef9-46f6-bafb-f2485be3b6af" />


### 2. Contact Form with Email Notifications
- Powered by **Resend API**.
- Sends instant email notifications to `srwaterpump@gmail.com` upon form submission.
- Includes sender details (Name, Phone, Email, Subject, Message).

<img width="517" height="357" alt="Screenshot 2025-12-08 at 15 27 55" src="https://github.com/user-attachments/assets/f87adfa7-c122-43e0-964e-8f8a319f0607" />


### 3. Google Sheets Integration
- Automatically saves every contact form submission to a designated Google Sheet.
- Auto-creates headers if the sheet is empty (`Date`, `Name`, `Email`, `Phone`, `Subject`, `Message`).
- Secure server-side authentication using Google Service Account.

<img width="1056" height="282" alt="Screenshot 2025-12-08 at 15 28 25" src="https://github.com/user-attachments/assets/4824b00e-9d3d-4386-b4b3-546b6673ae80" />


## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Services**: 
  - **Resend** (Email Delivery)
  - **Google Sheets API** (Data Storage)
  - **Render** (Deployment Platform)

## Setup Instructions

### Prerequisites
- Node.js installed.
- Google Cloud Service Account (JSON key).
- Resend API Key.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following keys:
   ```env
   PORT=3000
   RESEND_API_KEY=re_12345...
   SPREADSHEET_ID=your_google_sheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Visit `http://localhost:3000`.

## Deployment (Render)

This project is ready for deployment on Render.
**IMPORTANT**: You must add the Environment Variables in the Render Dashboard for the contact form to work.

1. Create a new **Web Service** on Render connected to this repo.
2. Set the **Build Command** to `npm install`.
3. Set the **Start Command** to `node server.js`.
4. Add the **Environment Variables** from your `.env` file.

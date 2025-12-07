# SR Trading Co. Website

This is the website for SR Trading Co., featuring a contact form that sends emails directly to srtradingdalal@gmail.com.

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Configure email credentials:
   - Edit the `.env` file with your Gmail credentials
   - For Gmail, you'll need to use an app password instead of your regular password
   - To create an app password:
     1. Go to your Google Account → Security
     2. Enable 2-Step Verification if not already enabled
     3. Go to "App passwords"
     4. Create a new app password for "Mail" and "Other"
     5. Copy the generated password to the .env file

3. Start the server:
```
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Important Notes

- The contact form now sends emails directly to srtradingdalal@gmail.com
- Make sure your Gmail account is configured to allow less secure apps or use an app password
- If you deploy this to production, update the email configuration with proper security measures 
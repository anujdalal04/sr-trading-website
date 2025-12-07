require('dotenv').config();
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); // Force IPv4 to prevent Render/Gmail timeouts
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Resend
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      "style-src": ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      "font-src": ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      "img-src": ["'self'", "data:", "https:"],
      "frame-src": ["'self'", "https://www.google.com"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Contact form limiter
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many emails sent from this IP, please try again later.'
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname, {
  index: false,
  extensions: ['html', 'css', 'js']
}));

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Resend API endpoint
app.post('/send-email', contactLimiter, async (req, res) => {
  try {
    console.log('Received form submission:', req.body);
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and message' });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'SR Trading Contact <onboarding@resend.dev>', // Sends from Resend's verified domain
      to: 'anujd300@gmail.com', // MUST match your Resend account email for testing
      reply_to: email, // Valid reply-to header
      subject: `New Contact: ${req.body.subject || 'Inquiry'} from ${name}`,
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${req.body.subject || 'General Inquiry'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    console.log('Email sent via Resend:', data);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message
    });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading the page');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
  } else {
    console.error('Server error:', error);
  }
}); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Helper functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// POST Endpoint
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data) {
    return res.status(400).json({ is_success: false, message: 'Invalid input' });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = '';
  let primeFound = false;

  // Process data array
  data.forEach((item) => {
    if (!isNaN(item)) {
      const num = parseInt(item, 10);
      numbers.push(num);
      if (isPrime(num)) primeFound = true;
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (item >= 'a' && item <= 'z' && item > highestLowercase) {
        highestLowercase = item;
      }
    }
  });

  // File validation
  let fileValid = false;
  let fileMimeType = '';
  let fileSizeKB = 0;

  if (file_b64) {
    try {
      const buffer = Buffer.from(file_b64, 'base64');
      fileMimeType = 'application/octet-stream'; // Replace with actual logic to detect MIME type
      fileSizeKB = (buffer.length / 1024).toFixed(2);
      fileValid = true;
    } catch (err) {
      fileValid = false;
    }
  }

  res.json({
    is_success: true,
    user_id: 'your_name_ddmmyyyy', // Replace with your actual ID format
    email: 'your_email@example.com',
    roll_number: 'ABCD123', // Replace with your roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: primeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

// GET Endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pool = require('./server/config/db.js'); 
const authRoutes = require('./server/routes/authRoutes.js');
const cryptoRoutes = require('./server/routes/cryptoRoutes.js');

const app = express();

// Middleware for security headers
app.use(helmet());

// Middleware for CORS
app.use(cors());

// Middleware for parsing JSON and URL-Encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes import
app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('CryptoTracker API Running');
  });

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
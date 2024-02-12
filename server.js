require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pool = require('./server/config/db'); 
const authRoutes = require('./server/routes/authRoutes');
const cryptoRoutes = require('./server/routes/cryptoRoutes');
const userRoutes = require('./server/routes/userRoutes');
// const dashboardRoutes = require('./server/routes/dashboardRoutes');
// const transactionRoutes = require('./server/routes/transactionRoutes');
// const db = require('./config/db'); 

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
app.use('/api/user', userRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/transaction', transactionRoutes);


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('CryptoTracker API Running');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
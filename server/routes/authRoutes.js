/**
 * @fileoverview Auth routes
 */

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../config/db.js');

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    // Create and send token
    const token = jwt.sign({ userId: newUser.rows[0].user_id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/**
 * @description Authenticate a user
 * @route POST /api/auth/login
 * @access Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    

    // Check for user existence
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    const username = await pool.query(
      'SELECT * FROM users',

    ); 
    console.log(username.rows, '##############%%%%%')

    if (user.rows.length === 0) {
      return res.status(400).send('Invalid Credentials');
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(400).send('Invalid Credentials');
    }

    // Create and send token
    const token = jwt.sign({ userId: user.rows[0].user_id }, process.env.JWT_SECRET);
    res.json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
// server/controllers/userController.js
const { User } = require('../models');
const db = require("../config/db");

// Function to handle fetching data, could be user data or other.
const getData = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server error');
  }
};

// Fetches a user by ID
const getUserData = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ name: user.username });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Server error');
  }
};

// Updates a user's details
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    await db.query("UPDATE users SET username = $1, email = $2 WHERE user_id = $3", [username, email, id]);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Deletes a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE user_id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetches dashboard data for a user
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; 
    const userDetails = await db.query("SELECT * FROM users WHERE user_id = $1", [userId]);
    // The query for userCryptoHoldings is commented out; uncomment and adjust as necessary.
    // const userCryptoHoldings = await db.query("SELECT * FROM holdings WHERE userId = $1", [userId]);
    
    res.json({
      user: userDetails.rows[0],
      // holdings: userCryptoHoldings.rows // Uncomment and adjust as necessary.
    });
  } catch (err) {
    res.status(500).send({ message: "Error fetching dashboard data" });
  }
};

module.exports = {
  getData,
  getUserData,
  updateUser,
  deleteUser,
  getDashboardData
};

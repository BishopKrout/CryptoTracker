// server/controllers/userController.js
const { User } = require('../models');

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

const updateUser = async (req, res) => {
  // ... updateUser logic
};

const deleteUser = async (req, res) => {
  // ... deleteUser logic
};

module.exports = {
  getUserData,
  updateUser,
  deleteUser
};


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');// Import the User model from the models index file

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    try {
        // Use Sequelize methods to check if the user exists
        const userExists = await User.findOne({ where: { email: email } });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Use Sequelize methods to create a new user
        const newUser = await User.create({
            username,
            email,
            password_hash: hashedPassword
        });

        // Proceed with your JWT token creation and response
        // ... The rest of your JWT logic ...

    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });

    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    register,
    login
};

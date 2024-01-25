/**
 * @fileOverview Database operations for users.
 */

const db = require("../config/db");

/**
 * Get a user by ID.
 *
 * @param {Object} req - The request object.
 * @param {number} req.params.id - The user ID.
 * @param {Object} res - The response object.
 * @returns {Object} The user object.
 */
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

/**
 * Update a user.
 *
 * @param {Object} req - The request object.
 * @param {number} req.params.id - The user ID.
 * @param {Object} req.body - The user data.
 * @param {string} req.body.username - The new username.
 * @param {string} req.body.email - The new email.
 * @param {Object} res - The response object.
 * @returns {Object} The success message.
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    await db.query("UPDATE users SET username = $1, email = $2 WHERE id = $3", [username, email, id]);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete a user.
 *
 * @param {Object} req - The request object.
 * @param {number} req.params.id - The user ID.
 * @param {Object} res - The response object.
 * @returns {Object} The success message.
 */
exports.deleteUser = async (req, res) => {
  try{
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
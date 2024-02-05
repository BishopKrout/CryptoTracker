const pool = require('../config/db');

exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user id from JWT middleware
    const portfolio = await pool.query('SELECT * FROM portfolio WHERE user_id = $1', [userId]);
    res.json(portfolio.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addCryptoToPortfolio = async (req, res) => {
  const { userId, cryptoId, amount } = req.body;
  try {
    const newEntry = await pool.query(
      'INSERT INTO portfolio (user_id, crypto_id, amount) VALUES ($1, $2, $3) RETURNING *',
      [userId, cryptoId, amount]
    );
    res.json(newEntry.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

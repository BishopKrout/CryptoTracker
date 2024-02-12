const { Cryptocurrency } = require('../models');

exports.fetchCryptoData = async (req, res) => {
  try {
    const cryptoData = await Cryptocurrency.findAll();
    res.json(cryptoData);
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    res.status(500).send('Server error');
  }
};

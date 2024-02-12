const { fetchCryptoData } = require('../controllers/cryptoController');
const { Cryptocurrency } = require('../models');

describe('fetchCryptoData', () => {
  it('should fetch cryptocurrency data successfully', async () => {
    // Mocking the Cryptocurrency.findAll() function
    Cryptocurrency.findAll = jest.fn().mockResolvedValue(['Bitcoin', 'Ethereum', 'Litecoin']);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await fetchCryptoData(req, res);

    expect(Cryptocurrency.findAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(['Bitcoin', 'Ethereum', 'Litecoin']);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should handle errors when fetching cryptocurrency data', async () => {
    // Mocking the Cryptocurrency.findAll() function to throw an error
    Cryptocurrency.findAll = jest.fn().mockRejectedValue(new Error('Database error'));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await fetchCryptoData(req, res);

    expect(Cryptocurrency.findAll).toHaveBeenCalledTimes(1);
    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Server error');
  });
});
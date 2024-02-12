const Cryptocurrency = require('../models/Cryptocurrency');
const sequelize = require('../config/db');

describe('Cryptocurrency Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will create the table in the test database
  });

  afterEach(async () => {
    await Cryptocurrency.destroy({ where: {} }); // This will delete all records after each test
  });

  afterAll(async () => {
    await sequelize.close(); // This will close the connection to the test database
  });

  it('should create a new cryptocurrency', async () => {
    const cryptocurrency = await Cryptocurrency.create({
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap: 100000000000,
      current_price: 50000
    });

    expect(cryptocurrency.crypto_id).toBeDefined();
    expect(cryptocurrency.name).toBe('Bitcoin');
    expect(cryptocurrency.symbol).toBe('BTC');
    expect(cryptocurrency.market_cap).toBe(100000000000);
    expect(cryptocurrency.current_price).toBe(50000);
  });

  it('should not allow null values for name and symbol', async () => {
    expect.assertions(1);

    try {
      await Cryptocurrency.create({
        market_cap: 100000000000,
        current_price: 50000
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
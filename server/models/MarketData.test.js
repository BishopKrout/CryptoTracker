const MarketData = require('../models/MarketData');
const sequelize = require('../config/db');

describe('MarketData Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will create the table in the test database
  });

  afterEach(async () => {
    await MarketData.destroy({ where: {} }); // This will delete all records after each test
  });

  afterAll(async () => {
    await sequelize.close(); // This will close the connection to the test database
  });

  it('should create a new market data entry', async () => {
    const marketData = await MarketData.create({
      crypto_id: 1,
      date: '2022-01-01',
      opening_price: 50000,
      closing_price: 55000,
      high: 60000,
      low: 45000,
      volume: 1000
    });

    expect(marketData.data_id).toBeDefined();
    expect(marketData.crypto_id).toBe(1);
    expect(marketData.date).toBe('2022-01-01');
    expect(marketData.opening_price).toBe(50000);
    expect(marketData.closing_price).toBe(55000);
    expect(marketData.high).toBe(60000);
    expect(marketData.low).toBe(45000);
    expect(marketData.volume).toBe(1000);
  });

  it('should not allow null values for crypto_id, date, opening_price, closing_price, high, low, and volume', async () => {
    expect.assertions(1);

    try {
      await MarketData.create({});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
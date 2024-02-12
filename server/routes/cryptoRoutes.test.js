const axios = require('axios');
const express = require('express');
const supertest = require('supertest');
const router = require('./cryptoRoutes');

jest.mock('axios');

describe('Crypto Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use('/', router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if available and not expired', async () => {
    const cachedData = {
      data: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
      ],
      lastFetch: Date.now() - 15 * 60 * 1000 // Set last fetch time to 15 minutes ago
    };
    const expectedResponse = cachedData.data;

    // Mock the axios.get function to return the cached data
    axios.get.mockResolvedValue({ data: cachedData });

    const response = await supertest(app).get('/markets');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    expect(axios.get).not.toHaveBeenCalled(); // Ensure axios.get is not called
  });

  it('should fetch data from CoinGecko API if cache is expired or not available', async () => {
    const fetchedData = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
    ];
    const expectedResponse = fetchedData;

    // Mock the axios.get function to return the fetched data
    axios.get.mockResolvedValue({ data: fetchedData });

    const response = await supertest(app).get('/markets');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    expect(axios.get).toHaveBeenCalledWith('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1
      }
    });
  });

  it('should handle errors when fetching data from CoinGecko API', async () => {
    const errorMessage = 'Error fetching data from CoinGecko';
    const expectedResponse = { message: errorMessage };

    // Mock the axios.get function to throw an error
    axios.get.mockRejectedValue(new Error(errorMessage));

    const response = await supertest(app).get('/markets');

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expectedResponse);
    expect(console.error).toHaveBeenCalledWith('Error fetching data from CoinGecko:', expect.any(Error));
  });
});

-- Use this script to initialize the DB schema.
-- Includes creation of users, cryptos, transactions, and market data

-- Users: stores user creds and join date
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    date_joined TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cryptocurrencies: Details of each crypto
CREATE TABLE cryptocurrencies (
    crypto_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    market_cap DECIMAL(19, 4),
    current_price DECIMAL(19, 4)
);

-- Transactions: Track buy/sell activities for each user. 
CREATE TABLE transactions (
    transactions_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    crypto_id INT REFERENCES cryptocurrencies(crypto_id),
    quantity DECIMAL(19, 4) NOT NULL,
    transaction_type VARCHAR(4) CHECK(transaction_type IN ('BUY', 'SELL')),
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Market Data: Historical price data for cryptos.
CREATE TABLE market_data (
    data_id SERIAL PRIMARY KEY,
    crypto_id INT REFERENCES cryptocurrencies(crypto_id),
    date DATE NOT NULL,
    opening_price DECIMAL(19, 4),
    closing_price DECIMAL(19, 4),
    high DECIMAL(19, 4),
    low DECIMAL(19, 4),
    volume DECIMAL(19, 4)
);

-- Directly run this script against PSQL instance for CryptoTracker DB.
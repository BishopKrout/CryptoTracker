-- Filename: db/seedTest.sql

-- Clear existing data from all tables
TRUNCATE TABLE users, cryptocurrencies, market_data, portfolio, RESTART IDENTITY CASCADE;

-- Insert test data into the 'users' table
INSERT INTO users (username, email, password_hash, date_joined) 
VALUES 
('testUser', 'test@example.com', '$2b$10$g5sTYRPQbFXaNB3Wn3MrVOqrhLkh1av//fLnbRrIJTmvCn1n1EfqW', NOW());

-- Insert test data into the 'cryptocurrencies' table
INSERT INTO cryptocurrencies (name, symbol, market_cap, current_price)
VALUES
('Bitcoin', 'BTC', 850000000000, 45000),
('Ethereum', 'ETH', 350000000000, 3000),
('Cardano', 'ADA', 50000000000, 1.5);

-- Insert test data into the 'market_data' table
-- Note: Ensure crypto_id matches the ID of the cryptocurrencies inserted above
INSERT INTO market_data (crypto_id, date, opening_price, closing_price, high, low, volume)
VALUES
(1, CURRENT_DATE, 45000, 45500, 46000, 44000, 1000),
(2, CURRENT_DATE, 3000, 3050, 3100, 2900, 500);

-- Insert test data into the 'portfolio' table
-- Note: Ensure user_id and crypto_id match the IDs from the inserted users and cryptocurrencies
INSERT INTO portfolio (user_id, crypto_id, quantity, average_cost, current_value, last_updated)
VALUES
(1, 1, 1.5, 45000, 67500, NOW()),
(1, 2, 10, 3000, 30000, NOW());


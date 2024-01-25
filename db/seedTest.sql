-- Clear existing data
-- TRUNCATE TABLE users CASCADE;
-- Insert test data
INSERT INTO users (username, email, password_hash) 
VALUES ('testUser', 'test@example.com', '$2b$10$g5sTYRPQbFXaNB3Wn3MrVOqrhLkh1av//fLnbRrIJTmvCn1n1EfqW');


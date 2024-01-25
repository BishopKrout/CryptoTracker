require('dotenv').config();
const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const clearTestDB = require('../../db/clearTestDB');
const prepareTestDB = require('../../db/prepareTestDB'); 


const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeEach(async () => {
    await clearTestDB();
  });

describe('Authentication Routes', () => {
    describe('POST /register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
        });
    });

    describe('POST /login', () => {

        it('should authenticate a user', async () => {
            await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
            const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
            

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        });
    });
});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { register, login } = require('./authController');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('register', () => {
  it('should register a new user successfully', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne = jest.fn().mockResolvedValue(null);
    bcrypt.genSalt = jest.fn().mockResolvedValue('salt');
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
    User.create = jest.fn().mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com' });

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });

  it('should return an error if user already exists', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne = jest.fn().mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com' });

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('should handle errors during registration', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Server error');
  });
});

describe('login', () => {
  it('should login a user successfully', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'testpassword'
      }
    };
    const res = {
      json: jest.fn()
    };

    User.findOne = jest.fn().mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com', password_hash: 'hashedPassword' });
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jwt.sign = jest.fn().mockReturnValue('token');

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ token: 'token', username: 'testuser' });
  });

  it('should return an error if user does not exist', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'testpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne = jest.fn().mockResolvedValue(null);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should return an error if password is invalid', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'testpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne = jest.fn().mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com', password_hash: 'hashedPassword' });
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should handle errors during login', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'testpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Server error');
  });
});
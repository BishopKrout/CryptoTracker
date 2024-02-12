const authenticateToken = require('../Middleware/authenticateToken');
const jwt = require('jsonwebtoken');

describe('authenticateToken Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next() if a valid token is provided', () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
    req.headers['authorization'] = `Bearer ${token}`;

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 1 });
  });

  it('should return 401 if no token is provided', () => {
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided, authorization denied.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if an invalid token is provided', () => {
    req.headers['authorization'] = 'Bearer invalid-token';

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not valid.' });
    expect(next).not.toHaveBeenCalled();
  });
});
import request from 'supertest';
import express from 'express';
import userRoutes from './userRoutes';
import userController from '../controllers/userController';
import authenticate from '../../Middleware/authenticateToken';

const app = express();
app.use(express.json());
app.use('/', userRoutes);

jest.mock('../controllers/userController');
jest.mock('../../Middleware/authenticateToken');

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getUserData controller when GET /:id is called', async () => {
    const mockUserData = { id: 1, name: 'John Doe' };
    userController.getUserData.mockResolvedValue(mockUserData);

    const response = await request(app).get('/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserData);
    expect(userController.getUserData).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    expect(authenticate).toHaveBeenCalled();
  });

  it('should call updateUser controller when PUT /:id is called', async () => {
    const mockUpdatedUser = { id: 1, name: 'Updated User' };
    userController.updateUser.mockResolvedValue(mockUpdatedUser);

    const response = await request(app).put('/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedUser);
    expect(userController.updateUser).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    expect(authenticate).toHaveBeenCalled();
  });

  it('should call deleteUser controller when DELETE /:id is called', async () => {
    const mockDeletedUser = { id: 1, message: 'User deleted' };
    userController.deleteUser.mockResolvedValue(mockDeletedUser);

    const response = await request(app).delete('/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDeletedUser);
    expect(userController.deleteUser).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    expect(authenticate).toHaveBeenCalled();
  });
});
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const Admin = require('../../src/Models/admin');
const { adminLogin } = require('../../src/Controllers/authAdmin');

// Mock the environment variables
process.env.MYSQL_URL = 'mysql://username:password@localhost:3306/parkingmonitoring';

jest.mock('../../src/Models/admin', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  return dbMock.define('admin', {
    username: 'admin',
    password: 'password'
  });
});

describe('adminLogin', () => {
  it('should return a token if login is successful', async () => {
    Admin.findByPk.mockResolvedValue({
      username: 'admin',
      password: 'password'
    });

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/admin/login',
      body: {
        username: 'admin',
        password: 'password'
      }
    });
    const res = httpMocks.createResponse();
    await adminLogin(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toHaveProperty('token');
  });

  it('should return 401 if username or password is incorrect', async () => {
    Admin.findByPk.mockResolvedValue(null);

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/admin/login',
      body: {
        username: 'wrong',
        password: 'password'
      }
    });
    const res = httpMocks.createResponse();
    await adminLogin(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._getData()).toEqual({ message: 'username atau password salah' });
  });

  it('should handle errors correctly', async () => {
    Admin.findByPk.mockRejectedValue(new Error('Database error'));

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/admin/login',
      body: {
        username: 'admin',
        password: 'password'
      }
    });
    const res = httpMocks.createResponse();
    await adminLogin(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual({ message: 'Database error' });
  });
});
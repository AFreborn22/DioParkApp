const request = require('supertest');
const app = require('../../src/app'); 
const { sequelize } = require('../../src/Models/admin');

describe('Admin Login API', () => {

  it('harus mengembalikan status 200 dan token ketika admin masuk dengan kredensial yang benar', async () => {
    const res = await request(app)
      .post('/api/auth/admin/login')
      .send({ username: 'admin1', password: 'jawir123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('harus mengembalikan status 401 ketika admin masuk dengan kredensial yang salah', async () => {
    const res = await request(app)
      .post('/api/auth/admin/login')
      .send({ username: 'faishalnomi', password: 'ataufaishalshella' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'username atau password salah');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
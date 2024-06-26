const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/Models');
const Pengguna = require('../../src/Models/pengguna');

beforeAll(async () => {
  const transaction = await sequelize.transaction();
  try {
    await Pengguna.destroy({ where: {} }, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error('Error during cleanup:', error);
    throw error;
  }
});

afterAll(async () => {
  await sequelize.close(); 
});

describe('Register API', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nama: 'John Doe',
        nomor_telp: '081234567890',
        nomor_polisi: 'AB123CD',
        detail_kendaraan: 'Motor',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Pengguna berhasil terdaftar');
  });

  it('should return error if email is already registered', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nama: 'Jane Doe',
        nomor_telp: '081234567890',
        nomor_polisi: 'AB123CD',
        detail_kendaraan: 'Motor',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Email sudah terdaftar. Silakan gunakan email lain.');
  });

  it('should return error if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nama: '',
        nomor_telp: '',
        nomor_polisi: '',
        detail_kendaraan: '',
        email: '',
        username: '',
        password: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Semua field harus diisi.');
  });
});

describe('Login API', () => {
  it('should login successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login berhasil');
    expect(res.body).toHaveProperty('token');
  });

  it('should return error if username or email is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        password: 'password123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Diperlukan nama pengguna atau email');
  });

  it('should return error if user is not found', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Pengguna tidak di temukan');
  });

  it('should return error if password is incorrect', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Kata sandi salah');
  });
});
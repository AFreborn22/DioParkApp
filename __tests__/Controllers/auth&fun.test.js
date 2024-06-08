const request = require('supertest');
const app = require('../app'); // pastikan path ke file app.js atau server.js yang mendefinisikan Express app
const { sequelize } = require('../src/Models');
const createTestData = require('../config/createdummy');
const Pengguna = require('../src/Models/pengguna');
const bcrypt = require('bcrypt');

describe('User API', () => {
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Menghapus dan membuat ulang tabel
    const { pengguna } = await createTestData();
    token = await request(app)
      .post('/api/auth/login')
      .send({
        email: pengguna.email,
        password: 'password123',
      })
      .then(res => res.body.token);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Register API', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nama: 'Jane Doe',
          nomor_telp: '081234567891',
          nomor_polisi: 'AB123DE',
          detail_kendaraan: 'Mobil',
          email: 'janedoe@example.com',
          username: 'janedoe',
          password: 'password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Pengguna berhasil terdaftar');
    });

    it('should return error if email is already registered', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nama: 'John Doe',
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

  describe('Update Profile API', () => {
    it('should update user profile successfully', async () => {
      const res = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nama: 'John Updated',
          nomor_telp: '081234567890',
          nomor_polisi: 'AB123CD',
          detail_kendaraan: 'Motor',
          email: 'johnupdated@example.com',
          username: 'johnupdated',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Profil berhasil di ubah');
    });

    it('should return error if user is not found', async () => {
      const invalidToken = jwt.sign({ id_pengguna: 99999 }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const res = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send({
          nama: 'John Updated',
          nomor_telp: '081234567890',
          nomor_polisi: 'AB123CD',
          detail_kendaraan: 'Motor',
          email: 'johnupdated@example.com',
          username: 'johnupdated',
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan');
    });
  });

  describe('Get User Data API', () => {
    it('should get user data successfully', async () => {
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('pengguna');
    });

    it('should return error if user is not found', async () => {
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Data pengguna tidak ditemukan.');
    });
  });

  describe('Logout API', () => {
    it('should logout successfully', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Logout berhasil');
    });
  });
});
const request = require('supertest');
const app = require('../../src/app'); 
const Pengguna = require('../../src/Models/pengguna'); 
const bcrypt = require('bcrypt');

// Mock bcrypt hash function
jest.mock('bcrypt', () => ({
  hash: jest.fn((password, salt) => Promise.resolve('hashed_password')),
}));

describe('Auth Controller - Register', () => {

  test('should register a new user', async () => {
    const newUser = {
      nama: 'John Doe',
      nomor_telp: '081234567890',
      nomor_polisi: 'AB123CD',
      detail_kendaraan: 'Motor',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    console.log('Response body:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Pengguna berhasil terdaftar');
    expect(res.body).toHaveProperty('pengguna');
    expect(res.body.pengguna).toHaveProperty('nama', newUser.nama);
    expect(res.body.pengguna).toHaveProperty('email', newUser.email);
  });

  test('should return 400 if email already exists', async () => {
    const existingUser = {
      nama: 'Jane Doe',
      nomor_telp: '081234567891',
      nomor_polisi: 'AB123DE',
      detail_kendaraan: 'Mobil',
      email: 'janedoe@example.com',
      username: 'janedoe',
      password: 'password123',
    };

    // Buat user baru untuk memastikan email sudah terdaftar
    await Pengguna.create({
      ...existingUser,
      password: await bcrypt.hash(existingUser.password, 10),
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send(existingUser);

    console.log('Response body:', res.body);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email sudah terdaftar. Silakan gunakan email lain.');
  });

  test('should return 400 if any required field is missing', async () => {
    const incompleteUser = {
      nama: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(incompleteUser);

    console.log('Response body:', res.body);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Semua field harus diisi.');
  });
});
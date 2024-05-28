const request = require('supertest');
const app = require('../../src/app'); 

describe('Auth Controller - Register', () => {
  test('should register a new user successfully', async () => {
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

    expect(res.statusCode).toBe(201);
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
      email: 'johndoe@example.com',
      username: 'janedoe',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(existingUser);

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(400);
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

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Semua field harus diisi.');
  });
});

describe('Auth Controller - Login', () => {
  test('should login user successfully', async () => {
    const credentials = {
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login berhasil');
    expect(res.body).toHaveProperty('pengguna');
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

  test('should return 400 if username or email is missing', async () => {
    const credentials = {
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Diperlukan nama pengguna atau email');
  });

  test('should return 404 if user is not found', async () => {
    const credentials = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Pengguna tidak di temukan');
  });

  test('should return 401 if password is incorrect', async () => {
    const credentials = {
      email: 'johndoe@example.com',
      password: 'incorrectpassword',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Kata sandi salah');
  });
});

let token; 

beforeEach(async () => {
  const credentials = {
    email: 'johndoe@example.com',
    password: 'password123',
  };

  const res = await request(app)
    .post('/api/auth/login')
    .send(credentials);

  token = res.body.token;
});

describe('Auth Controller - Update Profile', () => {
  test('should update user profile successfully', async () => {
    const updatedProfile = {
      nama: 'John Doe Updated',
      nomor_telp: '081234567891',
      nomor_polisi: 'ZYX987WV',
      detail_kendaraan: 'Mobil',
      email: 'johndoe@example.com',
      username: 'johndoeupdated',
    };

    const res = await request(app)
      .put('/api/profile/update')
      .send(updatedProfile)
      .set('Authorization', `Bearer ${token}`)

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Profil berhasil di ubah');
  });

  test('should return 404 if user is not found or no changes applied', async () => {
    const nonExistingProfile = {
      nama: 'Nonexistent User',
      nomor_telp: '081234567891',
      nomor_polisi: 'ZYX987WV',
      detail_kendaraan: 'Mobil',
      email: 'nonexistent@example.com',
      username: 'nonexistentuser',
    };

    const res = await request(app)
      .put('/api/profile/update') 
      .send(nonExistingProfile)
      .set('Authorization', `Bearer ${token}`)

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan');
  });
});

describe('Auth Controller - Get User Data', () => {
  test('should get user data successfully', async () => {
    const res = await request(app)
      .get('/api/profile/show')
      .set('Authorization', `Bearer ${token}`)

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pengguna');
  });

  test('should return 404 if user data not found', async () => {
    const res = await request(app)
      .get('/api/profile/show')
      .set('Authorization', `Bearer ${token}`)

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Data pengguna tidak ditemukan.');
  });
});

describe('Auth Controller - Logout', () => {
  test('should logout user successfully', async () => {
    const res = await request(app)
      .get('/api/auth/logout')

    console.log('Response body:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Logout berhasil');
  });
});


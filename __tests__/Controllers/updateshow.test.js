const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/Models');
const Pengguna = require('../../src/Models/pengguna');
const mockMidlewarePengguna = require('../midleware/mockMidlewarePengguna');

app.use('/api/profile/show', mockMidlewarePengguna);
app.use('/api/profile/update', mockMidlewarePengguna);
app.use('/api/auth/logout', mockMidlewarePengguna);

let token;

beforeAll(async () => {
  const transaction = await sequelize.transaction();
  try {
    await Pengguna.destroy({ where: {} }, { transaction });
    await transaction.commit();

    await Pengguna.create({
      nama: 'John Doe',
      nomor_telp: '081234567890',
      nomor_polisi: 'AB123CD',
      detail_kendaraan: 'Motor',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: 'password123'
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error during setup:', error);
    throw error;
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
//   describe('getDataUser', () => {

//     beforeEach(async () => {
//       const credentials = {
//         email: 'johndoe@example.com',
//         password: 'password123',
//       };
//       const res = await request(app)
//         .post('/api/auth/login')
//         .send(credentials);
//       token = res.body.token;
//       console.log(res)
//     });

//     test('should return user data', async () => {
//       const res = await request(app)
//         .get('/api/profile/show')
//         .set('Authorization', `Bearer ${token}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty('pengguna');
//       expect(res.body.pengguna.email).toBe('johndoe@example.com');
//     });

//     test('should return 404 if user not found', async () => {
//       await Pengguna.destroy({ where: { email: 'johndoe@example.com' } });

//       const res = await request(app)
//         .get('/api/profile/show')
//         .set('Authorization', `Bearer ${token}`);

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toHaveProperty('error', 'Data pengguna tidak ditemukan.');
//     });
//   });

//   describe('updateProfile', () => {
//     beforeEach(async () => {
//         const credentials = {
//           email: 'johndoe@example.com',
//           password: 'password123',
//         };
//         const res = await request(app)
//           .post('/api/auth/login')
//           .send(credentials);
//         token = res.body.token;
//     });

//     test('should update user profile', async () => {
//       const updatedProfile = {
//         nama: 'John Doe',
//         nomor_telp: '081234567890',
//         nomor_polisi: 'AB123CD',
//         detail_kendaraan: 'Motor',
//         email: 'johndoe@example.com',
//         username: 'johndoe',
//       };

//       const res = await request(app)
//         .put('/api/profile/update')
//         .set('Authorization', `Bearer ${token}`)
//         .send(updatedProfile);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty('message', 'Profil berhasil di ubah');
//     });

//     test('should return 404 if no changes applied', async () => {
//       const noChangesProfile = {
//         nama: 'John Doe',
//         nomor_telp: '081234567890',
//         nomor_polisi: 'AB123CD',
//         detail_kendaraan: 'Motor',
//         email: 'johndoe@example.com',
//         username: 'johndoe',
//       };

//       const res = await request(app)
//         .put('/api/profile/update')
//         .set('Authorization', `Bearer ${token}`)
//         .send(noChangesProfile);

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toHaveProperty('message', 'Pengguna tidak ditemukan atau tidak ada perubahan yang diterapkan');
//     });
//   });

  describe('logout', () => {
    test('should logout user', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Logout berhasil');
    });
  });
});
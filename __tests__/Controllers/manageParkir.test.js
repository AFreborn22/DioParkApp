const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/Models');
const Parkiran = require('../../src/Models/parkiran');
const Parkiranrealtime = require('../../src/Models/parkiranrealtime');
const Pengguna = require('../../src/Models/pengguna'); 
const Transaksi = require('../../src/Models/transaksi'); 
const createTestData = require('../../config/createdummy');
const mockAdminMidleware = require('../midleware/mockAdminMidleware');

app.use('/admin/parkiran/realtime', mockAdminMidleware);
app.use('/admin/parkiran/search', mockAdminMidleware);
app.use('/admin/parkiran', mockAdminMidleware);
app.use('/admin/parkiran/create', mockAdminMidleware);

let token;

beforeAll(async () => {
  await sequelize.authenticate();

  const transaction = await sequelize.transaction();
  try {
    // Bersihkan tabel Parkiran, Parkiranrealtime, dan Pengguna sebelum menjalankan test
    await Parkiranrealtime.destroy({ where: {} }, { transaction });
    await Parkiran.destroy({ where: {} }, { transaction });
    await Pengguna.destroy({ where: {} }, { transaction });
    await Transaksi.destroy({ where: {} }, { transaction });

    // Commit transaksi
    await transaction.commit();

    // Autentikasi sebagai admin dan dapatkan token
    const credentials = {
      username: 'admin1',
      password: 'jawir123',
    };
    const res = await request(app)
      .post('/api/auth/admin/login')
      .send(credentials);
    token = res.body.token;
  } catch (error) {
    // Rollback transaksi jika terjadi kesalahan
    await transaction.rollback();
    console.error('Error during setup:', error);
    throw error;
  }
});

afterEach(async () => {
    const transaction = await sequelize.transaction();
    try {
      // Bersihkan tabel Parkiran, Parkiranrealtime, Pengguna, dan Transaksi setelah setiap test
      await Parkiranrealtime.destroy({ where: {} }, { transaction });
      await Parkiran.destroy({ where: {} }, { transaction });
      await Pengguna.destroy({ where: {} }, { transaction });
      await Transaksi.destroy({ where: {} }, { transaction });
  
      // Commit transaksi
      await transaction.commit();
    } catch (error) {
      // Rollback transaksi jika terjadi kesalahan
      await transaction.rollback();
      console.error('Error during cleanup:', error);
      throw error;
    }
  });

describe('Parkiran API', () => {
  describe('getAllParkiranRealtime', () => {
    test('should return 404 if no parking data found', async () => {
      const res = await request(app)
        .get('/api/admin/parkiran/realtime')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Tidak ada pengguna yang parkir');
    });

    test('should return 200 with all parking data', async () => {
      await createTestData();

      const res = await request(app)
        .get('/api/admin/parkiran/realtime')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('getPenggunaByBlokParkir', () => {
    test('should return 404 if user not found by block parkir', async () => {
      const res = await request(app)
        .get('/api/admin/parkiran/search/A2')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Pengguna yang parkir tidak ditemukan');
    });

    test('should return 200 with user data by block parkir', async () => {
      await createTestData();

      const res = await request(app)
        .get(`/api/admin/parkiran/search/A1`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('blok_parkir', 'A1');
      expect(res.body).toHaveProperty('id_pengguna');
    });
  });

  describe('getAllParkiran', () => {
    test('should return 200 with all parking data', async () => {
      await createTestData();
      
      const res = await request(app)
        .get('/api/admin/parkiran')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('createParkiran', () => {
    test('should return 201 with created parking data', async () => {
      const newParkiran = { blok_parkir: 'A2', lantai: 1, kendaraan: 'motor', status: 'available' };

      const res = await request(app)
        .post('/api/admin/parkiran/create')
        .send(newParkiran)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Data parkiran berhasil ditambahkan');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('blok_parkir', 'A2');
    });
  });

  describe('updateParkiran', () => {
    test('should return 404 if parking data not found', async () => {
      const res = await request(app)
        .put('/api/admin/parkiran/A3')
        .send({ lantai: 2, kendaraan: 'mobil', status: 'unavailable' })
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Data parkiran tidak ditemukan');
    });

    test('should return 200 with updated parking data', async () => {
      await Parkiran.create({ blok_parkir: 'A1', lantai: 1, kendaraan: 'motor', status: 'available' });

      const res = await request(app)
        .put('/api/admin/parkiran/A1')
        .send({ lantai: 2, kendaraan: 'mobil', status: 'unavailable' })
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Data parkiran berhasil diperbarui');
    });
  });

  describe('deleteParkiran', () => {
    test('should return 404 if parking data not found', async () => {
      const res = await request(app)
        .delete('/api/admin/parkiran/A2')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Data parkiran tidak ditemukan');
    });

    test('should return 200 with successful deletion message', async () => {
      await Parkiran.create({ blok_parkir: 'A1', lantai: 1, kendaraan: 'motor', status: 'available' });

      const res = await request(app)
        .delete('/api/admin/parkiran/A1')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Data parkiran berhasil dihapus');
    });
  });
});
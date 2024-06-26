const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/Models');
const Parkiranrealtime = require('../../src/Models/parkiranrealtime');
const Transaksi = require('../../src/Models/transaksi');
const Pengguna = require('../../src/Models/pengguna');
const Parkiran = require('../../src/Models/parkiran');
const mockAdminMidleware = require('../midleware/mockAdminMidleware');

// Pindahkan middleware mockAdminMidleware ke sini
app.use('/api/parkiran/masuk/generate-qr/motor', mockAdminMidleware);
app.use('/api/parkiran/masuk/generate-qr/mobil', mockAdminMidleware);

let token;

beforeAll(async () => {
  const transaction = await sequelize.transaction();
  try {
    await Parkiranrealtime.destroy({ where: {} }, { transaction });
    await Transaksi.destroy({ where: {} }, { transaction });
    await Parkiran.destroy({ where: {} }, { transaction });
    await Pengguna.destroy({ where: {} }, { transaction });
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
    await transaction.rollback();
    console.error('Error during cleanup:', error);
    throw error;
  }
});

afterAll(async () => {
  await sequelize.close(); 
});

describe('generateQRCodeForAvailableParking', () => {
  describe('generateQRCodeForAvailableParkingMotor', () => {
    test('should return 404 if no available parking for motor', async () => {
      const res = await request(app)
        .get('/api/parkiran/masuk/generate-qr/motor')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Tidak ada tempat parkir yang tersedia');
    });

    test('should return 200 with available parking block for motor', async () => {
      await Parkiran.create({ blok_parkir: 'A1', lantai: 1, kendaraan: 'motor', status: 'available' });

      const res = await request(app)
        .get('/api/parkiran/masuk/generate-qr/motor')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Data tempat parkir berhasil ditemukan');
      expect(res.body).toHaveProperty('data', 'A1');
    });
  });

  describe('generateQRCodeForAvailableParkingMobil', () => {
    test('should return 404 if no available parking for mobil', async () => {
      const res = await request(app)
        .get('/api/parkiran/masuk/generate-qr/mobil')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Tidak ada tempat parkir yang tersedia');
    });

    test('should return 200 with available parking block for mobil', async () => {
      // Tambahkan data tempat parkir yang tersedia untuk mobil
      await Parkiran.create({ blok_parkir: 'B1', lantai: 2, kendaraan: 'mobil', status: 'available' });

      const res = await request(app)
        .get('/api/parkiran/masuk/generate-qr/mobil')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Data tempat parkir berhasil ditemukan');
      expect(res.body).toHaveProperty('data', 'B1');
    });
  });
});

const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/Models');
const Parkiran = require('../../src/Models/parkiran');
const mockAdminMidleware = require('../midleware/mockAdminMidleware');

app.use('/api/parkiran/masuk/generate-qr/motor', mockAdminMidleware);
app.use('/api/parkiran/masuk/generate-qr/mobil', mockAdminMidleware);

describe('generateQRCodeForAvailableParking', () => {
  let token;

  beforeAll(async () => {
    // Atur koneksi ke database
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // // Kosongkan tabel parkiran sebelum menjalankan tes
    // await Parkiran.destroy({ where: {} });
    // console.log('Parkiran table has been cleared.');

    // Login sebagai admin untuk mendapatkan token
    const credentials = {
      username: 'admin1',
      password: 'jawir123',
    };

    const res = await request(app)
      .post('/api/auth/admin/login')
      .send(credentials);

    token = res.body.token;
  });

  describe('generateQRCodeForAvailableParkingMotor', () => {
    test('should return 404 if no available parking for motor', async () => {
      await Parkiran.destroy({ where: { blok_parkir: 'A1' } });

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
      await Parkiran.destroy({ where: { blok_parkir: 'B1' } });

      const res = await request(app)
        .get('/api/parkiran/masuk/generate-qr/mobil')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Tidak ada tempat parkir yang tersedia');
    });

    test('should return 200 with available parking block for mobil', async () => {
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
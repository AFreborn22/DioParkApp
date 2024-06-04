const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/Models');
const Parkiranrealtime = require('../../src/Models/parkiranrealtime');
const Transaksi = require('../../src/Models/transaksi');
const Pengguna = require('../../src/Models/pengguna');
const Parkiran = require('../../src/Models/parkiran');
const mockAdminMidleware = require('../midleware/mockAdminMidleware');

app.use('/api/parkiran/keluar/generate-qr/exit', mockAdminMidleware);

describe('generateQRCodeForExitParking API', () => {
    let pengguna, parkiran, transaksi, parkiranrealtime;
    let token;

    beforeAll(async () => {
        await sequelize.authenticate();

        await Parkiranrealtime.destroy({ where: {} });
        await Transaksi.destroy({ where: {} });
        await Parkiran.destroy({ where: {} });
        await Pengguna.destroy({ where: {} });

        const credentials = {
            username: 'admin1',
            password: 'jawir123',
        };

        const res = await request(app)
            .post('/api/auth/admin/login')
            .send(credentials);

        token = res.body.token;

        pengguna = await Pengguna.create({
            nama: 'John Doe',
            nomor_telp: '081234567890',
            nomor_polisi: 'AB123CD',
            detail_kendaraan: 'Motor',
            email: 'johndoe@example.com',
            username: 'johndoe',
            password: 'password123'
        });

        parkiran = await Parkiran.create({
            blok_parkir: 'A1',
            lantai: 1,
            kendaraan: 'motor',
            status: 'available'
        });

        transaksi = await Transaksi.create({
            id_pengguna: pengguna.id_pengguna,
            status: 'masuk',
            blok_parkir: 'A1'
        });

        parkiranrealtime = await Parkiranrealtime.create({
            id_pengguna: pengguna.id_pengguna,
            blok_parkir: 'A1',
            id_transaksi: transaksi.id_transaksi
        });
    });

    test('should return 404 if parking data not found', async () => {
        const res = await request(app)
            .post('/api/parkiran/keluar/generate-qr/exit')
            .send({ blok_parkir: 'Z9' })
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Data parkir tidak ditemukan');
    });

    test('should return 200 with parking block data', async () => {
        const res = await request(app)
            .post('/api/parkiran/keluar/generate-qr/exit')
            .send({ blok_parkir: 'A1' })
            .set('Authorization', `Bearer ${token}`);

        console.log(res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Data parkir berhasil ditemukan');
        expect(res.body).toHaveProperty('data', expect.objectContaining({
            blok_parkir: 'A1'
        }));
    });
});
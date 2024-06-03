const request = require('supertest');
const app = require('../../src/app'); 
const { sequelize } = require('../../src/Models'); 
const Pengguna = require('../../src/Models/pengguna');
const Transaksi = require('../../src/Models/transaksi');
const Parkiran = require('../../src/Models/parkiran');
const Parkiranrealtime = require('../../src/Models/parkiranrealtime');
const mockAdminMidleware = require('../midleware/mockAdminMidleware'); 

app.use('/api/parkiran/keluar/generate-qr/exit', mockAdminMidleware);

describe('generateQRCodeForExitParking API', () => {
    let pengguna, parkiran, transaksi, parkiranrealtime;
    let token;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        const credentials = {
            username: 'admin1',
            password: 'jawir123',
        };

        const res = await request(app)
            .post('/api/auth/admin/login')
            .send(credentials);

        token = res.body.token;

        pengguna = await Pengguna.create({
            nama: "Akmal Fauzan",
            nomor_telp: "081299920023",
            nomor_polisi: "E 5351 XM",
            detail_kendaraan: "Vario 110",
            email: "aafauzan52@gmail.com",
            username: "Afreborn",
            password: "akmalpunya123"
        });

        console.log(pengguna);

        parkiran = await Parkiran.create({
            blok_parkir: "A1",
            lantai: 1,
            kendaraan: "motor",
            status: "unavailable"
        });

        transaksi = await Transaksi.create({
            id_pengguna: pengguna.id_pengguna,
            status: "masuk",
            blok_parkir: "A1"
        });

        parkiranrealtime = await Parkiranrealtime.create({
            id_parkir: parkiran.id_parkir,
            id_pengguna: pengguna.id_pengguna,
            blok_parkir: 'A1',
            id_transaksi: transaksi.id_transaksi
        });

    });

    afterAll(async () => {
        await Pengguna.destroy({ where: { id_pengguna : '1'  } });
        await Parkiran.destroy({ where: { blok_parkir : 'A1' } });
        await Transaksi.destroy({ where: { id_transaksi : '1' } });
        await Parkiranrealtime.destroy({ where: { id_parkir : '1' } });
        await sequelize.close();
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
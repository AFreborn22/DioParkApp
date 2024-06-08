const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/Models');
const Parkiranrealtime = require('../../src/Models/parkiranrealtime');
const Transaksi = require('../../src/Models/transaksi');
const Pengguna = require('../../src/Models/pengguna');
const Parkiran = require('../../src/Models/parkiran');
const createTestData = require('../../config/createdummy')
const mockAdminMidleware = require('../midleware/mockAdminMidleware');

app.use('/api/parkiran/keluar/generate-qr/exit', mockAdminMidleware);

describe('generateQRCodeForExitParking API', () => {
    let token;

    beforeAll(async () => {
        await sequelize.authenticate();
        
        console.log('Starting cleanup...');

        const transaction = await sequelize.transaction();
        try {
            await Parkiranrealtime.destroy({ where: {} }, { transaction });
            await Transaksi.destroy({ where: {} }, { transaction });
            await Parkiran.destroy({ where: {} }, { transaction });
            await Pengguna.destroy({ where: {} }, { transaction });
            await transaction.commit();
            console.log('Cleanup completed.');
        } catch (error) {
            await transaction.rollback();
            console.error('Error during cleanup:', error);
            throw error;
        }

        await createTestData(transaction);

        const credentials = {
            username: 'admin1',
            password: 'jawir123',
        };

        const res = await request(app)
            .post('/api/auth/admin/login')
            .send(credentials);

        token = res.body.token;


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
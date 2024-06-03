// const request = require('supertest');
// const app = require('../../src/app'); 
// const mockAdminMidleware = require('../midleware/mockAdminMidleware'); 

// app.use('/api/parkiran/keluar/generate-qr/exit', mockAdminMidleware);

// describe('generateQRCodeForExitParking API', () => {
//     let token;

//     beforeAll(async () => {

//         const credentials = {
//             username: 'admin1',
//             password: 'jawir123',
//         };

//         const res = await request(app)
//             .post('/api/auth/admin/login')
//             .send(credentials);

//         token = res.body.token;

//     });

//     test('should return 404 if parking data not found', async () => {
//         const res = await request(app)
//             .post('/api/parkiran/keluar/generate-qr/exit')
//             .send({ blok_parkir: 'Z9' })
//             .set('Authorization', `Bearer ${token}`);

//         expect(res.statusCode).toBe(404);
//         expect(res.body).toHaveProperty('message', 'Data parkir tidak ditemukan');
//     });

//     test('should return 200 with parking block data', async () => {
//         const res = await request(app)
//             .post('/api/parkiran/keluar/generate-qr/exit')
//             .send({ blok_parkir: 'A1' })
//             .set('Authorization', `Bearer ${token}`);

//         console.log(res.body);

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('message', 'Data parkir berhasil ditemukan');
//         expect(res.body).toHaveProperty('data', expect.objectContaining({
//             blok_parkir: 'A1'
//         }));
//     });
// });
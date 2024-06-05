/**
 * @swagger
 * tags:
 *   name: Transaksi
 *   description: Endpoints untuk mengelola riwayat transaksi
 */

/**
 * @swagger
 * /transaksi/riwayat-transaksi:
 *   get:
 *     summary: Mendapatkan riwayat transaksi pengguna
 *     tags: [Transaksi]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan riwayat transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       waktu_parkir:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-05T15:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "selesai"
 *                       pengguna:
 *                         type: object
 *                         properties:
 *                           nama:
 *                             type: string
 *                             example: "Faisal Selabalikan"
 *                           username:
 *                             type: string
 *                             example: "faisalselabalikan"
 *                           email:
 *                             type: string
 *                             example: "faisalselabalikan@example.com"
 *                           nomor_polisi:
 *                             type: string
 *                             example: "AB123CD"
 *                           detail_kendaraan:
 *                             type: string
 *                             example: "Toyota Avanza"
 *       404:
 *         description: Tidak ada riwayat transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tidak ada riwayat transaksi."
 *       500:
 *         description: Terjadi kesalahan saat mengambil riwayat transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan saat mengambil riwayat transaksi."
 */
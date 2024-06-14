/**
 * @swagger
 * tags:
 *   name: Statistic
 *   description: Endpoints untuk menampilkan statistik 
 */

/**
 * @swagger
 * /stat/transaksi:
 *   get:
 *     summary: Mengambil statistik transaksi parkir
 *     tags: [Statistic]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data statistik transaksi parkir berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaksi:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_transaksi:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       waktu_parkir:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-14T16:29:45.000Z
 *                       status:
 *                         type: string
 *                         example: masuk
 *                       blok_parkir:
 *                         type: string
 *                         example: A1
 *                 totalTransaksi:
 *                   type: integer
 *                   example: 2
 *                 totalMasuk:
 *                   type: integer
 *                   example: 1
 *                 totalKeluar:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Tidak ada transaksi parkir ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tidak ada transaksi parkir ditemukan dengan kondisi tersebut
 *       500:
 *         description: Terjadi kesalahan saat mengambil data transaksi parkir
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Terjadi kesalahan saat mengambil data transaksi parkir
 */
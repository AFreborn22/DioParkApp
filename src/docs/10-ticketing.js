/**
 * @swagger
 * tags:
 *   name: Parkiran
 *   description: Endpoints untuk menampilkan ticket parkir
 */

/**
 * @swagger
 * /show/ticket:
 *   get:
 *     summary: Mengambil data tiket parkiran pengguna
 *     tags: [Parkiran]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data tiket parkiran berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id_parkir:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     pengguna:
 *                       type: object
 *                       properties:
 *                         nama:
 *                           type: string
 *                           example: John Doe
 *                         nomor_polisi:
 *                           type: string
 *                           example: B1234XYZ
 *                         detail_kendaraan:
 *                           type: string
 *                           example: Toyota Avanza 2019
 *       404:
 *         description: Whoop anda belum parkir
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Whoop anda belum parkir
 *       500:
 *         description: Terjadi kesalahan saat mengambil data parkiran
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Terjadi kesalahan saat mengambil data parkiran
 */
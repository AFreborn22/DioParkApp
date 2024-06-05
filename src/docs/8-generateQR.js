/**
 * @swagger
 * tags:
 *   name: generate QRCode Masuk
 *   description: Endpoints untuk menghasilkan QR Code untuk tempat parkir yang tersedia
 */

/**
 * @swagger
 * /parkiran/masuk/generate-qr/motor:
 *   get:
 *     summary: Menghasilkan QR Code untuk tempat parkir motor yang tersedia
 *     tags: [generate QRCode Masuk]
 *     responses:
 *       200:
 *         description: Data tempat parkir berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data tempat parkir berhasil ditemukan
 *                 data:
 *                   type: string
 *                   example: A1
 *       404:
 *         description: Tidak ada tempat parkir yang tersedia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tidak ada tempat parkir yang tersedia
 *       500:
 *         description: Terjadi kesalahan saat mencari tempat parkir
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan saat mencari tempat parkir
 */

/**
 * @swagger
 * /parkiran/masuk/generate-qr/mobil:
 *   get:
 *     summary: Menghasilkan QR Code untuk tempat parkir mobil yang tersedia
 *     tags: [generate QRCode Masuk]
 *     responses:
 *       200:
 *         description: Data tempat parkir berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data tempat parkir berhasil ditemukan
 *                 data:
 *                   type: string
 *                   example: A1
 *       404:
 *         description: Tidak ada tempat parkir yang tersedia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tidak ada tempat parkir yang tersedia
 *       500:
 *         description: Terjadi kesalahan saat mencari tempat parkir
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan saat mencari tempat parkir
 */
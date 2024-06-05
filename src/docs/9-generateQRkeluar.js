/**
 * @swagger
 * tags:
 *   name: generate QRCode Keluar
 *   description: Endpoints untuk menghasilkan QR Code untuk keluar dari tempat parkir
 */

/**
 * @swagger
 * /parkiran/keluar/generate-qr/exit:
 *   post:
 *     summary: Menghasilkan QR Code untuk keluar dari tempat parkir
 *     tags: [generate QRCode Keluar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blok_parkir
 *             properties:
 *               blok_parkir:
 *                 type: string
 *                 example: "A1"
 *     responses:
 *       200:
 *         description: Data parkir berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data parkir berhasil ditemukan
 *                 data:
 *                   type: object
 *                   properties:
 *                     blok_parkir:
 *                       type: string
 *                       example: "A1"
 *       404:
 *         description: Data parkir tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data parkir tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan saat mencari data parkir
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan saat mencari data parkir
 */

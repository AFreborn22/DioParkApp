/**
 * @swagger
 * tags:
 *   name: Scan QR code
 *   description: Endpoints untuk memproses pemindaian QR code masuk dan keluar parkiran
 */

/**
 * @swagger
 * /diopark/scan-masuk:
 *   post:
 *     summary: Memproses pemindaian QR code untuk masuk parkiran
 *     tags: [Scan QR code]
 *     security:
 *       - BearerAuth: []
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
 *         description: Pemindaian QR code masuk berhasil diproses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaksi:
 *                   type: object
 *                   properties:
 *                     id_transaksi:
 *                       type: integer
 *                       example: 1
 *                     id_pengguna:
 *                       type: integer
 *                       example: 1
 *                     waktu_parkir:
 *                       type: string
 *                       example: "2024-06-05T15:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "masuk"
 *                     blok_parkir:
 *                       type: string
 *                       example: "A1"
 *                 parkiranrealtime:
 *                   type: object
 *                   properties:
 *                     id_pengguna:
 *                       type: integer
 *                       example: 1
 *                     blok_parkir:
 *                       type: string
 *                       example: "A1"
 *                     id_transaksi:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Parkiran tidak tersedia atau QR code tidak valid / Informasi pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parkiran tidak tersedia atau QR code tidak valid"
 *       500:
 *         description: Gagal memproses pemindaian QR code masuk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Gagal memproses pemindaian QR code masuk"
 */

/**
 * @swagger
 * /diopark/scan-keluar:
 *   post:
 *     summary: Memproses pemindaian QR code untuk keluar parkiran
 *     tags: [Scan QR code]
 *     security:
 *       - BearerAuth: []
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
 *         description: Pemindaian QR code keluar berhasil diproses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_transaksi:
 *                   type: integer
 *                   example: 1
 *                 id_pengguna:
 *                   type: integer
 *                   example: 1
 *                 waktu_parkir:
 *                   type: string
 *                   example: "2024-06-05T15:00:00Z"
 *                 status:
 *                   type: string
 *                   example: "keluar"
 *                 blok_parkir:
 *                   type: string
 *                   example: "A1"
 *       404:
 *         description: Parkiran tidak tersedia atau QR code tidak valid / Informasi pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parkiran tidak tersedia atau QR code tidak valid"
 *       500:
 *         description: Gagal memproses pemindaian QR code keluar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Gagal memproses pemindaian QR code keluar"
 */
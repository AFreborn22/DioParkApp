/**
 * @swagger
 * tags:
 *   name: Manage pengguna Diopark
 *   description: Endpoints untuk mengelola pengguna
 */

/**
 * @swagger
 * /manage/pengguna/all:
 *   get:
 *     summary: Mendapatkan semua pengguna
 *     tags: [Manage pengguna Diopark]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data semua pengguna
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   nama:
 *                     type: string
 *                   username:
 *                     type: string
 *                   nomor_polisi:
 *                     type: string
 *                   detail_kendaraan:
 *                     type: string
 *       500:
 *         description: Terjadi kesalahan pada server
 */

/**
 * @swagger
 * /manage/pengguna/add:
 *   post:
 *     summary: Menambahkan pengguna baru
 *     tags: [Manage pengguna Diopark]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nama
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               nama:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               nomor_polisi:
 *                 type: string
 *               detail_kendaraan:
 *                 type: string
 *     responses:
 *       201:
 *         description: Data pengguna berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     nama:
 *                       type: string
 *                     username:
 *                       type: string
 *                     nomor_polisi:
 *                       type: string
 *                     detail_kendaraan:
 *                       type: string
 *       400:
 *         description: Terjadi kesalahan pada saat menambahkan pengguna
 */

/**
 * @swagger
 * /manage/pengguna/delete:
 *   delete:
 *     summary: Menghapus pengguna berdasarkan email
 *     tags: [Manage pengguna Diopark]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data pengguna berhasil dihapus
 *       404:
 *         description: Data pengguna tidak ditemukan
 *       400:
 *         description: Terjadi kesalahan pada saat menghapus pengguna
 */
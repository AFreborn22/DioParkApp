/**
 * @swagger
 * tags:
 *   name: Fungsionalitas Admin
 *   description: Endpoints untuk mengelola parkiran dan parkiran real-time
 */

/**
 * @swagger
 * /admin/parkiran/realtime:
 *   get:
 *     summary: Mendapatkan semua data parkiran real-time
 *     tags: [Fungsionalitas Admin]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data parkiran real-time
 *       404:
 *         description: Tidak ada pengguna yang parkir
 *       500:
 *         description: Terjadi kesalahan pada server
 */

/**
 * @swagger
 * /admin/parkiran/search/{blok_parkir}:
 *   get:
 *     summary: Mendapatkan pengguna berdasarkan blok parkir
 *     tags: [Fungsionalitas Admin]
 *     parameters:
 *       - in: path
 *         name: blok_parkir
 *         schema:
 *           type: string
 *         required: true
 *         description: Blok parkir pengguna
 *     responses:
 *       200:
 *         description: Berhasil mengambil data pengguna parkir
 *       404:
 *         description: Pengguna yang parkir tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */

/**
 * @swagger
 * /admin/parkiran:
 *   get:
 *     summary: Mendapatkan semua data parkiran
 *     tags: [Fungsionalitas Admin]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data parkiran
 *       500:
 *         description: Terjadi kesalahan pada server
 */

/**
 * @swagger
 * /admin/parkiran/create:
 *   post:
 *     summary: Menambahkan data parkiran baru
 *     tags: [Fungsionalitas Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blok_parkir
 *               - lantai
 *               - kendaraan
 *             properties:
 *               blok_parkir:
 *                 type: string
 *                 example: "A1"
 *               lantai:
 *                 type: string
 *                 example: "Lantai 1"
 *               kendaraan:
 *                 type: string
 *                 example: "Mobil"
 *               status:
 *                 type: string
 *                 example: "Tersedia"
 *     responses:
 *       201:
 *         description: Data parkiran berhasil ditambahkan
 *       400:
 *         description: Terjadi kesalahan pada saat menambahkan data parkiran
 */

/**
 * @swagger
 * /admin/parkiran/{blok_parkir}:
 *   put:
 *     summary: Memperbarui data parkiran
 *     tags: [Fungsionalitas Admin]
 *     parameters:
 *       - in: path
 *         name: blok_parkir
 *         schema:
 *           type: string
 *         required: true
 *         description: Blok parkir
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lantai:
 *                 type: string
 *                 example: "Lantai 1"
 *               kendaraan:
 *                 type: string
 *                 example: "Mobil"
 *               status:
 *                 type: string
 *                 example: "Tersedia"
 *     responses:
 *       200:
 *         description: Data parkiran berhasil diperbarui
 *       400:
 *         description: Gagal memperbarui data parkiran
 *       404:
 *         description: Data parkiran tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */

/**
 * @swagger
 * /admin/parkiran/{blok_parkir}:
 *   delete:
 *     summary: Menghapus data parkiran
 *     tags: [Fungsionalitas Admin]
 *     parameters:
 *       - in: path
 *         name: blok_parkir
 *         schema:
 *           type: string
 *         required: true
 *         description: Blok parkir
 *     responses:
 *       200:
 *         description: Data parkiran berhasil dihapus
 *       404:
 *         description: Data parkiran tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
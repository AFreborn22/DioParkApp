/**
 * @swagger
 * tags:
 *   name: Forgot Password
 *   description: Endpoints untuk pengelolaan autentikasi pengguna
 */

/**
 * @swagger
 * /password/forgot-password:
 *   post:
 *     summary: Mengirimkan email untuk reset password
 *     tags: [Forgot Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Tautan reset sudah dikirim ke email Anda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tautan reset sudah dikirim ke email Anda
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Pengguna tidak ditemukan
 *       500:
 *         description: Server sedang gangguan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server sedang gangguan
 */

/**
 * @swagger
 * /password/reset-password?token=${token}:
 *   post:
 *     summary: Mengatur ulang kata sandi pengguna
 *     tags: [Forgot Password]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Berhasil mengatur ulang kata sandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Berhasil mengatur ulang kata sandi
 *       404:
 *         description: Pengguna tidak di temukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Pengguna tidak di temukan
 *       500:
 *         description: Server sedang gangguan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server sedang gangguan
 */

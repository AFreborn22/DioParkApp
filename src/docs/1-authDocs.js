// swagger/1-authDocs.js

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - nomor_telp
 *               - nomor_polisi
 *               - detail_kendaraan
 *               - email
 *               - username
 *               - password
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "Faisal Selabalikan"
 *               nomor_telp:
 *                 type: string
 *                 example: "081234567890"
 *               nomor_polisi:
 *                 type: string
 *                 example: "AB123CD"
 *               detail_kendaraan:
 *                 type: string
 *                 example: "Toyota Avanza"
 *               email:
 *                 type: string
 *                 example: "faisalselabalikan@example.com"
 *               username:
 *                 type: string
 *                 example: "faisalselabalikan"
 *               password:
 *                 type: string
 *                 example: "ataufaisalnomiaja123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "faisalselabalikan"
 *               email:
 *                 type: string
 *                 example: "faisalselabalikan@example.com"
 *               password:
 *                 type: string
 *                 example: "ataufaisalnomiaja123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "Faisal Selabalikan"
 *               nomor_telp:
 *                 type: string
 *                 example: "081234567890"
 *               nomor_polisi:
 *                 type: string
 *                 example: "AB123CD"
 *               detail_kendaraan:
 *                 type: string
 *                 example: "Toyota Avanza"
 *               email:
 *                 type: string
 *                 example: "faisalselabalikan@example.com"
 *               username:
 *                 type: string
 *                 example: "faisalselabalikan"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /profile/show:
 *   get:
 *     summary: Get user data
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */
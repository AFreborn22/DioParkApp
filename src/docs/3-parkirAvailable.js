/**
 * @swagger
 * tags:
 *   name: Parkiran Tersedia
 *   description: Endpoints untuk mendapatkan informasi parkiran yang tersedia
 */

/**
 * @swagger
 * /main/motor:
 *   get:
 *     summary: Mendapatkan daftar parkiran motor yang tersedia
 *     tags: [Parkiran Tersedia]
 *     responses:
 *       200:
 *         description: Daftar parkiran motor yang tersedia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableParkir:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       blok_parkir:
 *                         type: string
 *                         example: "A1"
 *                       lantai:
 *                         type: integer
 *                         example: 1
 *                       kendaraan:
 *                         type: string
 *                         example: "Motor"
 *                       status:
 *                         type: string
 *                         example: "available"
 *                 jumlahParkirTersedia:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Server sedang gangguan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server sedang gangguan"
 */

/**
 * @swagger
 * /main/mobil:
 *   get:
 *     summary: Mendapatkan daftar parkiran mobil yang tersedia
 *     tags: [Parkiran Tersedia]
 *     responses:
 *       200:
 *         description: Daftar parkiran mobil yang tersedia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableParkir:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       blok_parkir:
 *                         type: string
 *                         example: "A1"
 *                       lantai:
 *                         type: integer
 *                         example: 1
 *                       kendaraan:
 *                         type: string
 *                         example: "Mobil"
 *                       status:
 *                         type: string
 *                         example: "available"
 *                 jumlahParkirTersedia:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Server sedang gangguan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server sedang gangguan"
 */

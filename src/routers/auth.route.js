const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const router = Router();

/**
 * 
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: the user email
 *         password:
 *           type: string
 *           description: the user password
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: mia@gmail.com
 *         password: 1234
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: user login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Auth'
 *             
 *     responses:
 *       200:
 *         description: user loged
 */
router.post("/auth/login", authController.userLogin);

module.exports = router;
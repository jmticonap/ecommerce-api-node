const { Router } = require("express")
const userController = require("../controllers/users.controller")

const router = Router()

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: the user name
 *         email:
 *           type: string
 *           description: the user email
 *         password:
 *           type: string
 *           description: the user password
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: Mia Mauren
 *         email: mia@gmail.com
 *         password: 1234
 *   
 * 
 * 
 */


/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: list of all users
 *     tags: [User]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: all the list was fetched
 */
router.get("/users", userController.findAll)
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: create new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: new user created successfuly
 */
router.post("/users", userController.create)

module.exports = router
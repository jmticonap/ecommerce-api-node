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

router.get("/users", userController.findAll)
router.post("/users", userController.create)

module.exports = router
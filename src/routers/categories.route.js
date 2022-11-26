const { Router } = require("express")
const categoriesController = require("../controllers/categoriesController")

const router = Router()

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: specific name for the category
 *         
 *       required:
 *         - name
 *       example:
 *         name: tech
 *   
 * 
 */

router.get("/categories", categoriesController.findAll)
router.get("/categories/:id", categoriesController.findById)
router.post("/categories", categoriesController.create)
router.patch("/categories/:id", categoriesController.update)
router.delete("/categories/:id", categoriesController.delete)

module.exports = router
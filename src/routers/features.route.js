const { Router } = require("express")
const featuresController = require("../controllers/features.controller")

const router = Router()

/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     Feature:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: specific name for the feature
 *         
 *       required:
 *         - name
 *       example:
 *         name: processor
 *     FeatureContent:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: posible value for some feature
 *         
 *       required:
 *         - name
 *       example:
 *         name: intel core i7
 *   
 * 
 */

router.get("/features", featuresController.findAll)
router.get("/features/:id", featuresController.findById)
router.post("/features", featuresController.create)
router.patch("/features/:id", featuresController.update)
router.delete("/features/:id", featuresController.delete)

module.exports = router
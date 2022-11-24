const { Router } = require("express")
const featuresController = require("../controllers/features.controller")

const router = Router()

router.get("/features", featuresController.findAll)
router.get("/features/:id", featuresController.findById)
router.post("/features", featuresController.create)
router.patch("/features/:id", featuresController.update)
router.delete("/features/:id", featuresController.delete)

module.exports = router
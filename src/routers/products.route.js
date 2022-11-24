const { Router } = require("express")
const productsController = require("../controllers/products.controller")

const router = Router()

router.get("/products", productsController.findAll)
router.get("/products/:id", productsController.findById)
router.post("/products", productsController.create)
router.patch("/products/:id", productsController.update)
router.delete("/products/:id", productsController.delete)

module.exports = router
const { Router } = require("express")
const cartsController = require("../controllers/carts.controller")

const router = Router()

router.get("/cart", cartsController.findActiveByUser)
router.get("/carts", cartsController.findAll)
router.get("/carts/:id", cartsController.findById)
router.post("/carts", cartsController.create)
router.post("/cart/purchase", cartsController.purchase)
router.patch("/cart/add_products", cartsController.addProducts)
router.patch("/cart/update_products", cartsController.updateProductInCart)
router.patch("/cart/product/:productId/delete", cartsController.deleteProductInCart)


module.exports = router
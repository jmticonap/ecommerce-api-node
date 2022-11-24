const { Router } = require("express")
const userController = require("../controllers/users.controller")

const router = Router()

router.get("/users", userController.findAll)
router.post("/users", userController.create)

module.exports = router
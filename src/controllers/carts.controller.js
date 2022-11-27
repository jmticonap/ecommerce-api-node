const cartsService = require("../services/carts.service")

const cartsController = {
    create: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await cartsService.create(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    addProducts: async (req, res, next) => {
        try {
            const cart = await cartsService.addProducts(req)
            res
                .status(200)
                .json(cart)
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    updateProductInCart: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await cartsService.updateProductInCart(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    deleteProductInCart: async (req, res, next) => {
        try {
            await cartsService.deleteProductInCart(req)
            res
                .status(200)
                .end()
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    purchase: async (req, res, next) => {
        try {
            res
                .status(201)
                .json(await cartsService.purchase(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    findAll: async (req, res, next) => {
        try {

        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    findById: async (req, res, next) => {
        try {

        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    findActiveByUser: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await cartsService.findActiveByUser(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    }
}

module.exports = cartsController
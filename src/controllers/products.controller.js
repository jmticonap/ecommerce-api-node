const productsService = require("../services/products.service")
const buyService = require("../services/buy.service")

const productsController = {
    findAll: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await productsService.findAll(req))
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
            res
                .status(200)
                .json(await productsService.findById(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    addFeatures: async (req, res, next) => {
        try {
            res
                .status(201)
                .json(await productsService.addFeatures(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    setCategory: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await productsService.setCategory(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    create: async (req, res, next) => {
        try {
            res
                .status(201)
                .json(await productsService.create(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    buy: async (req, res, next) => {
        try {
            const buys = await buyService.buy(req)

            res
                .status(200)
                .json(buys)
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    findBuyByProduct: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await buyService.findBuyByProduct(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    update: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await productsService.update(req))
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }
    },
    delete: async (req, res, next) => {
        try {
            await productsService.delete(req)
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
    }
}

module.exports = productsController
const categoriesService = require("../services/categories.service")

const categoriesController = {
    findAll: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await categoriesService.findAll(req))
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
                .json(await categoriesService.findById(req))
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
                .json(await categoriesService.create(req))
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
                .json(await categoriesService.update(req))
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

module.exports = categoriesController
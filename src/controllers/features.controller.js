const featuresService = require("../services/features.service")

const featuresController = {
    findAll: async (req, res, next) => {
        try {
            res
                .status(200)
                .json(await featuresService.findAll(req))
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
                .json(await featuresService.findById(req))
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
                .json(await featuresService.create(req))
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
                .json(await featuresService.update(req))
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
            await featuresService.delete(req)
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

module.exports = featuresController
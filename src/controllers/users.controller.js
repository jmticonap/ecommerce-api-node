const userService = require("../services/users.service")

const userController = {
    create: async (req, res, next) => {
        try {
            const user = await userService.create(req)
            res
                .status(200)
                .json(user)
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
            const users = await userService.findAll(req)
            res
                .status(200)
                .json(users)
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: ""
            })
        }

    }
}

module.exports = userController
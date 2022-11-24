const UserModel = require("../models/users.model")

const userService = {
    create: async (req) => {
        try {
            return UserModel.create(req.body)
        } catch (error) {
            throw (error)
        }
    },
    findAll: async (req) => {
        try {
            return UserModel.findAll()
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = userService
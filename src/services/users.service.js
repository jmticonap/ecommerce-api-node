const UserModel = require("../models/users.model")

const userService = {
    create: async (req) => {
        try {
            const user = await UserModel.create(req.body)

            return await UserModel.findByPk(user.id, {
                attributes: {
                    exclude: ["password"]
                }
            })
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
const CategoriesModel = require("../models/categories.model")

const categoriesService = {
    create: async (req) => {
        try {
            return CategoriesModel.create(req.body)
        } catch (error) {
            throw (error)
        }
    },
    findAll: async (req) => {
        try {
            return CategoriesModel.findAll({
                order:[
                    ["id"]
                ]
            })
        } catch (error) {
            throw (error)
        }
    },
    findById: async (req) => {
        try {
            const { id } = req.params
            return CategoriesModel.findByPk(id)
        } catch (error) {
            throw (error)
        }
    },
    update: async (req) => {
        try {
            const { id } = req.params
            const updatables_fields = ["name"]

            const category = await CategoriesModel.findByPk(id)

            //Deleting NO updatables fields from object
            Object.keys(req.body).forEach(key => {
                !updatables_fields.includes(key) && delete req.body[key]
            })
            if (Object.keys(req.body).length == 0)
                throw "No one field can be update."

            await category.update(req.body)
            await category.save()

            await category.reload()

            return category
        } catch (error) {
            throw (error)
        }
    },
    delete: async (req) => {
        try {
            const { id } = req.params

            const category = await CategoriesModel.findByPk(id)
            await category.destroy()

            return true
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = categoriesService
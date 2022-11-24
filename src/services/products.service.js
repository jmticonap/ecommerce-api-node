const ProductModel = require("../models/products.model")
const CategoriesModel = require("../models/categories.model")

const productsService = {
    create: async (req) => {
        try {
            const isCategory = req.body.hasOwnProperty('category')
            console.log(`isCateogry: ${isCategory? "true":"false"}`)
            return ProductModel.create(req.body, (isCategory) && {
                include: [
                    isCategory && {
                        model: CategoriesModel,
                        as: "category"
                    }
                ]
            })
        } catch (error) {
            throw (error)
        }
    },
    findAll: async (req) => {
        try {
            return ProductModel.findAll({
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
            return ProductModel.findByPk(id)
        } catch (error) {
            throw (error)
        }
    },
    update: async (req) => {
        try {
            const { id } = req.params
            const updatables_fields = ["name", "description"]

            const product = await ProductModel.findByPk(id)

            //Deleting NO updatables fields from object
            Object.keys(req.body).forEach(key => {
                !updatables_fields.includes(key) && delete req.body[key]
            })
            if (Object.keys(req.body).length == 0)
                throw "No one field can be update."

            await product.update(req.body)
            await product.save()
            await product.reload()

            return product
        } catch (error) {
            throw (error)
        }
    },
    delete: async (req) => {
        try {
            const { id } = req.params

            const product = await ProductModel.findByPk(id)
            await product.destroy()

            return true
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = productsService
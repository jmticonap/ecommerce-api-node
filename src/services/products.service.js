const ProductModel = require("../models/products.model")
const CategoriesModel = require("../models/categories.model")
const FeaturesModel = require("../models/features.model")
const FeaturesContentModel = require("../models/featuresContent.model")
const ProductFeaturesModel = require("../models/productFeatures.model")

const productsService = {
    create: async (req) => {
        try {
            const isCategory = req.body.hasOwnProperty('category')
            console.log(`isCateogry: ${isCategory ? "true" : "false"}`)
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
                order: [
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
            return ProductModel.findByPk(id, {
                include: [
                    {
                        model: FeaturesModel,
                        as: "productFeatures"
                    },
                    {
                        model: CategoriesModel,
                        as: "category"
                    }

                ]
            })
        } catch (error) {
            throw (error)
        }
    },
    addFeatures: async (req) => {
        try {
            //id: for the product
            const { id } = req.params
            const product = await ProductModel.findByPk(id, {
                include: {
                    model: FeaturesModel,
                    as: "productFeatures"
                }
            })
            /**
             * JSON structure
             * [
             *  {
             *      "content":"core i7", 
             *      "featureId": 1
             *  }
             * ]
             * 
             */
            const productFeatures = req.body

            const productFeaturesIterator = async productFeature => {
                const { content, featureId } = productFeature
                const feature = await FeaturesModel.findByPk(featureId, {
                    include: [
                        {
                            model: FeaturesContentModel,
                            as: "contents"
                        }
                    ]
                })

                //check that "content" is the list of feature
                if (!await feature["contents"].some(itm => itm.content == content))
                    throw ("The content is not in the feature allowed terms")

                await product.addProductFeature(feature, {
                    through: { content }
                })
            }
            //TODO: throw is no correct
            productFeatures.forEach(productFeaturesIterator)

            product.reload({
                include: {
                    model: FeaturesModel,
                    as: "productFeatures"
                }
            })

            return product
        } catch (error) {
            throw (error)
        }
    },
    setCategory: async (req) => {
        try {
            const { id } = req.params
            const { categoryId } = req.body
            const product = await ProductModel.findByPk(id, {
                include: {
                    model: CategoriesModel,
                    as: "category"
                }
            })
            const category = await CategoriesModel.findByPk(categoryId)

            await product.setCategory(category)

            return await product.reload()
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
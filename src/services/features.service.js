const FeaturesModel = require("../models/features.model")
const FeaturesContentModel = require("../models/featuresContent.model")

const sharedInclude = [
    {
        model: FeaturesContentModel,
        as: "contents"
    }
]

const featuresService = {
    create: async (req) => {
        try {
            const isContents = req.body.hasOwnProperty('contents')
            
            return FeaturesModel.create(req.body, (isContents) && {
                include: isContents && sharedInclude
            })
        } catch (error) {
            throw (error)
        }
    },
    findAll: async (req) => {
        try {
            return FeaturesModel.findAll({
                order:[
                    ["id"]
                ],
                include: sharedInclude
            })
        } catch (error) {
            throw (error)
        }
    },
    findById: async (req) => {
        try {
            const { id } = req.params
            return FeaturesModel.findByPk(id, {
                include: sharedInclude
            })
        } catch (error) {
            throw (error)
        }
    },
    update: async (req) => {
        try {
            const { id } = req.params
            const updatables_fields = ["name"]

            const feature = await FeaturesModel.findByPk(id)

            //Deleting NO updatables fields from object
            Object.keys(req.body).forEach(key => {
                !updatables_fields.includes(key) && delete req.body[key]
            })
            if (Object.keys(req.body).length == 0)
                throw "No one field can be update."

            await feature.update(req.body)
            await feature.save()

            return await feature.reload()
        } catch (error) {
            throw (error)
        }
    },
    delete: async (req) => {
        try {
            const { id } = req.params

            const feature = await FeaturesModel.findByPk(id)
            await feature.destroy()

            return true
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = featuresService
const BuyModel = require("../models/buy.model")
const ProductModel = require("../models/products.model")

const buyService = {
    buy: async req => {
        try {
            /**
             * request structure
             * [
             *  { "productId": 1, "quantity": 20 } <== [buyProduct]
             *  { "productId": 2, "quantity": 25 }
             * ]
             */
            const buyProducts = req.body
            const savedBuyProductId = buyProducts.map(itm => itm.productId)

            const products = await ProductModel.findAll({
                where: { id: savedBuyProductId },
                include: { model: BuyModel, as: "buy"}
            })
            products.forEach(async (product, i) => {
                product.stock += buyProducts[i].quantity

                product.createBuy({quantity: buyProducts[i].quantity})
                await product.save()
                await product.reload()
            })
            return await ProductModel.findAll({
                where: { id: savedBuyProductId }
            }) 
        } catch (error) {
            throw (error)
        }
    },
    findBuyByProduct: async req => {
        try {
            const { id } = req.params
            return await BuyModel.findAll({
                where: { id }
            })
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = buyService
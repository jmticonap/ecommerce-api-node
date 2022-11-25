const CartsModel = require("../models/carts.model")
const CartDetailsModel = require("../models/cartDetails.model")
const UserModel = require("../models/users.model")
const ProductModel = require("../models/products.model")

const cartsService = {
    create: async req => {
        try {
            const user = await UserModel.findByPk(req.user.id)
            const cart = await CartsModel.create({})
            await cart.setUser(user)

            return cart.reload({
                include: {
                    model: UserModel,
                    as: "user",
                    attributes: ["id", "name", "email"]
                }
            })
        } catch (error) {
            throw (error)
        }
    },
    addProducts: async req => {
        try {
            const user = await UserModel.findByPk(req.user.id)
            const active_cart = await CartsModel.findOne({
                where: {
                    user_id: user.id,
                    isPurchased: false
                },
                include: {
                    model: ProductModel,
                    as: "cartProducts"
                }
            })
            const cartProducts = req.body
            cartProducts.forEach(async cartProduct => {
                /**
                 * cartProduct:
                 * {
                 *  "productId": 1,
                 *  "price": 20.5,
                 *  "quantity": 10
                 * }
                 */
                const product = await ProductModel.findByPk(
                    cartProduct.productId, {
                    include: "cartProducts"
                })
                await active_cart.addCartProduct(product, {
                    through: {
                        price: cartProduct.price,
                        quantity: cartProduct.quantity
                    }
                })
            })

            return await active_cart.reload()
        } catch (error) {
            throw (error)
        }
    },
    findAll: async req => {
        try {
            return await CartsModel.findAll({
                order: [
                    ["id"]
                ],
                include: {
                    model: CartDetailsModel,
                    as: "cartProducts"
                }
            })
        } catch (error) {
            throw (error)
        }
    },
    findById: async (req) => {
        try {
            const { id } = req.params
            return await CartsModel.findByPk(id, {
                include: {
                    model: CartDetailsModel,
                    as: "cartProducts"
                }
            })
        } catch (error) {
            throw (error)
        }
    },
    findActiveByUser: async (req) => {
        try {
            const user = await UserModel.findByPk(req.user.id)
            const active_cart = await CartsModel.findOne({
                where: {
                    user_id: user.id,
                    isPurchased: false
                },
                attributes: {
                    exclude: ["updatedAt"]
                },
                include: "cartProducts"
            })

            if (active_cart === null) {
                const new_cart = await CartsModel.create({}, {
                    attributes: {
                        exclude: ["updatedAt"]
                    }
                })
                await new_cart.setUser(user)

                return new_cart.reload({
                    include: "cartProducts"
                })
            } else {
                return active_cart
            }
        } catch (error) {
            throw (error)
        }
    },

    // update: async (req, userId) => {
    //     //Only for purchase process
    //     try {
    //         const { id } = req.params
    //         const updatables_fields = ["is_purchased"]

    //         const cart = await CartsModel.findOne({
    //             where: {
    //                 id,
    //                 user_id: userId
    //             }
    //         })

    //         //Deleting NO updatables fields from object
    //         Object.keys(req.body).forEach(key => {
    //             !updatables_fields.includes(key) && delete req.body[key]
    //         })
    //         if (Object.keys(req.body).length == 0)
    //             throw "No one field can be update."

    //         await cart.save(req.body)

    //         return await cart.reload()
    //     } catch (error) {
    //         throw (error)
    //     }
    // }
}

module.exports = cartsService
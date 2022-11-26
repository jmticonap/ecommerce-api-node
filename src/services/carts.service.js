const db = require("../database/database")
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
            const t = await db.transaction()

            const user = await UserModel.findByPk(req.user.id)
            const active_cart = await CartsModel.findOne({
                where: {
                    user_id: user.id,
                    isPurchased: false
                }
            })
            const cartProducts = req.body
            const productsId = cartProducts.map(p => p.productId)
            const productsForCart = await ProductModel.findAll({
                where: { id: productsId }
            });

            const bulkData = productsForCart.map(p => {
                const cartProductsItem = cartProducts.find(cp => cp.productId == p.id)
                return ({
                    price: cartProductsItem.price,
                    quantity: cartProductsItem.quantity,
                    productId: p.id,
                    cartId: active_cart.id
                })
            })
            const result = await CartDetailsModel.bulkCreate(
                bulkData,
                {
                    include: [
                        { model: CartsModel, as: "cart" },
                        { model: ProductModel, as: "product" }
                    ],
                    transaction: t
                }
            )

            await t.commit()

            return result
        } catch (error) {
            throw (error)
        }
    },
    updateProductInCart: async req => {
        const t = await db.transaction()
        try {
            /**
             * cartProduct:
             * {
             *  "productId": 1,
             *  "quantity": 10
             * }
            */
            const user = await UserModel.findByPk(req.user.id)
            const toUpdateData = req.body
            const activeCart = await CartsModel.findOne({
                where: {
                    user_id: user.id,
                    isPurchased: false
                }
            })
            const productsInCart = await CartDetailsModel.findAll({
                where: { cartId: activeCart.id }
            }, { transaction: t })

            toUpdateData.forEach(data => {
                const pInCart = productsInCart.find(p => p.productId == data.productId)
                if (pInCart) {
                    pInCart.quantity = data.quantity
                    pInCart.save()
                }
            })

            await t.commit()

            return productsInCart
        } catch (error) {
            throw (error)
        }
    },
    deleteProductInCart: async req => {
        try {
            const t = await db.transaction()
            const { productId } = req.params
            const user = await UserModel.findByPk(req.user.id)
            const activeCart = await CartsModel.findOne({
                where: {
                    user_id: user.id,
                    isPurchased: false
                }
            })
            const productsInCart = await CartDetailsModel.findAll({
                where: { cartId: activeCart.id }
            }, { transaction: t })

            productsInCart.find(pic => pic.productId == productId).destroy()

            await t.commit()
            return true
        } catch (error) {
            throw (error)
        }
    },
    purchase: async req => {
        const t = await db.transaction()
        try {
            const user = await UserModel.findByPk(req.user.id)
            const activeCart = await CartsModel.findOne({
                where: {
                    user_id: user.id,
                    isPurchased: false
                },
                include: { 
                    model: ProductModel, 
                    as: "cartProducts" 
                },
                transaction: t
            })
            const productsInCart = await CartDetailsModel.findAll({
                where: { cartId: activeCart.id }
            })
            productsInCart.forEach(async pic => {
                const product = await ProductModel.findOne({
                    where: { id: pic.productId },
                    transaction: t
                })
                product.stock -= pic.quantity
                await product.save()
            })

            activeCart.isPurchased = true
            await activeCart.save()

            await t.commit()

            return await activeCart.reload()
        } catch (error) {
            await t.rollback()
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
    }

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
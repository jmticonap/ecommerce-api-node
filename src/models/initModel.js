const UserModel = require("./users.model")
const CategoriesModel = require("./categories.model")
const ProductModel = require("./products.model")
const CartsModel = require("./carts.model")
const CartDetailsModel = require("./cartDetails.model")
const DeliverDataModel = require("./deliverData.model")
const WishListModel = require("./wishList.model")
const FeaturesModel = require("./features.model")
const ProductImagesModel = require("./productImages.model")
const BuyModel = require("./buy.model")
const PriceModel = require("./price.model")


const initModels = () => {

    /**
     * ************* PRODUCT <----> CATEGORY *************
     */
    CategoriesModel.hasMany(ProductModel, {
        as: "products",
        foreignKey: "category_id",
        sourceKey: "id"
    })
    ProductModel.belongsTo(CategoriesModel, {
        as: "category",
        foreignKey: "category_id",
        targetKey: "id"
    })

    /**
     * ************* USER <----> CART *************
     */
    UserModel.hasMany(CartsModel, {
        as: "carts",
        foreignKey: "user_id",
        sourceKey: "id"
    })
    CartsModel.belongsTo(UserModel, {
        as: "user",
        foreignKey: "user_id",
        targetKey: "id"
    })
    

    /**
     * ************* CART <----> CART_DETAIL *************
     */
    CartsModel.hasMany(CartDetailsModel, {
        as: "details",
        foreignKey: "cart_id",
        sourceKey: "id"
    })
    CartDetailsModel.belongsTo(CartsModel, {
        as: "cart",
        foreignKey: "cart_id",
        targetKey: "id"
    })

    /**
     * ************* PRODUCT <----> CART_DETAIL *************
     */
    ProductModel.hasMany(CartDetailsModel, {
        as: "cartDetails",
        foreignKey: "product_id",
        sourceKey: "id"
    })
    CartDetailsModel.belongsTo(ProductModel, {
        as: "product",
        foreignKey: "product_id",
        targetKey: "id"
    })


    /**
     * ************* CART <----> DELIVER_DATA *************
     */
    CartsModel.hasOne(DeliverDataModel, {
        as: "deliver",
        foreignKey: "cart_id",
        sourceKey: "id"
    })
    DeliverDataModel.belongsTo(CartsModel, {
        as: "cart",
        foreignKey: "cart_id",
        targetKey: "id"
    })

    /**
     * ************* USER <--[WISH_LIST]--> PRODUCT *************
     */
    UserModel.belongsToMany(ProductModel, {
        through: WishListModel,
        as: "wish_products"
    })
    ProductModel.belongsToMany(UserModel, {
        through: WishListModel,
        as: "wish_products"
    })


    /**
     * ************* PRODUCT <--[product_feature]--> FEATURES *************
     */
    ProductModel.belongsToMany(FeaturesModel, {
        through: "product_feature",
        as: "productFeatures"
    })
    FeaturesModel.belongsToMany(ProductModel, {
        through: "product_feature",
        as: "productFeatures"
    })


    /**
     * ************* PRODUCT <----> PRODUCT_IMAGES *************
     */
    ProductModel.hasMany(ProductImagesModel, {
        as: "images",
        foreignKey: "product_id",
        sourceKey: "id"
    })
    ProductImagesModel.belongsTo(ProductModel, {
        as: "product",
        foreignKey: "product_id",
        targetKey: "id"
    })


    /**
     * ************* PRODUCT <----> BUY *************
     */
     ProductModel.hasMany(BuyModel, {
        as: "buy",
        foreignKey: "product_id",
        sourceKey: "id"
    })
    BuyModel.belongsTo(ProductModel, {
        as: "product",
        foreignKey: "product_id",
        targetKey: "id"
    })


    /**
     * ************* PRODUCT <----> PRICE *************
     */
     ProductModel.hasMany(PriceModel, {
        as: "price",
        foreignKey: "product_id",
        sourceKey: "id"
    })
    PriceModel.belongsTo(ProductModel, {
        as: "product",
        foreignKey: "product_id",
        targetKey: "id"
    })

}

module.exports = initModels
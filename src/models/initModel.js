const UserModel = require("./users.model") //
const CategoriesModel = require("./categories.model") //
const ProductModel = require("./products.model") // [addFeatures, setCategory]
const CartsModel = require("./carts.model")
const CartDetailsModel = require("./cartDetails.model")
const DeliverDataModel = require("./deliverData.model")
const WishListModel = require("./wishList.model")
const FeaturesModel = require("./features.model") //
const FeaturesContentModel = require("./featuresContent.model") //
const ProductFeaturesModel = require("./productFeatures.model")
const ProductImagesModel = require("./productImages.model")
const BuyModel = require("./buy.model")
const PriceModel = require("./price.model")


const initModels = function () {

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
     * ************* CART <--[CartDetailsModel]--> PRODUCT *************
     */
    CartsModel.belongsToMany(ProductModel, {
        through: CartDetailsModel,
        as: "cartProducts"
    })
    ProductModel.belongsToMany(CartsModel, {
        through: CartDetailsModel,
        as: "cartProducts"
    })
    CartDetailsModel.belongsTo(CartsModel,{as: "cart"})
    CartDetailsModel.belongsTo(ProductModel,{as: "product"})


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
        through: ProductFeaturesModel,
        as: "productFeatures"
    })
    FeaturesModel.belongsToMany(ProductModel, {
        through: ProductFeaturesModel,
        as: "productFeatures"
    })

    /**
     * ************* FEATURES <----> FEATURES_CONTENT *************
     */
    FeaturesModel.hasMany(FeaturesContentModel, {
        as: "contents",
        foreignKey: "feature_id",
        sourceKey: "id",
        onDelete: "CASCADE"
    })
    FeaturesContentModel.belongsTo(FeaturesModel, {
        as: "feature",
        foreignKey: "feature_id",
        targetKey: "id"
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
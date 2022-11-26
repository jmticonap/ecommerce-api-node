
const UserModel = require("../models/users.model")
const ProductModel = require("../models/products.model")


const initData = async (db) => {
    const t = await db.transaction()
    await UserModel.create({
        email: "mia@gmail.com",
        name: "Mia Ticona",
        password: "1234"
    }, { transaction: t })

    await ProductModel.bulkCreate([
        {
            "name": "smarthphone",
            "description": "Xiaomi Redmi 8"
        },
        {
            "name": "Tablet",
            "description": "Ipad Pro - Apple"
        },{
            "name": "laptop",
            "description": "Lenovo ideapad 5"
        }
    ], { transaction: t })
    
    await t.commit()
}

module.exports = initData
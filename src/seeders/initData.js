
const UserModel = require('../models/users.model')
const ProductModel = require('../models/products.model')
const BuyModel = require('../models/buy.model')

const initData = async (db) => {
  const t = await db.transaction()
  await UserModel.create({
    email: 'mia@gmail.com',
    name: 'Mia Ticona',
    password: '1234'
  }, { transaction: t })

  await ProductModel.bulkCreate([
    {
      name: 'smarthphone',
      description: 'Xiaomi Redmi 8'
    },
    {
      name: 'Tablet',
      description: 'Ipad Pro - Apple'
    }, {
      name: 'laptop',
      description: 'Lenovo ideapad 5'
    }
  ], { transaction: t })

  await BuyModel.bulkCreate([
    { quantity: 30, product_id: 1 },
    { quantity: 40, product_id: 2 },
    { quantity: 30, product_id: 3 }
  ], { transaction: t })

  await t.commit()
}

module.exports = initData

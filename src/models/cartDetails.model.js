const db = require("../database/database")
const { DataTypes } = require("sequelize")

const CartDetailsModel = db.define("cart_details", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: false,
  hooks: {

  }
})

module.exports = CartDetailsModel
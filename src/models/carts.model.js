const db = require("../database/database")
const { DataTypes } = require("sequelize")

const CartsModel = db.define("carts", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  isPurchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = CartsModel
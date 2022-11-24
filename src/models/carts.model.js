const db = require("../database/database")
const { DataTypes } = require("sequelize")

const CartsModel = db.define("carts", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  is_purchased: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
})

module.exports = CartsModel
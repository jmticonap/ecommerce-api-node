const db = require("../database/database")
const { DataTypes } = require("sequelize")

const BuyModel = db.define("buy", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
})

module.exports = BuyModel

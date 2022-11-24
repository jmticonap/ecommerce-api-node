const db = require("../database/database")
const { DataTypes } = require("sequelize")

const PriceModel = db.define("price", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  value: {
    type: DataTypes.DOUBLE,
    allowNull: true
  }
})

//TODO: Make before every insert all is_active values become FALSE

module.exports = PriceModel


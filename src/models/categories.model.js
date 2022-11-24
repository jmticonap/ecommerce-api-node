const db = require("../database/database")
const { DataTypes } = require("sequelize")

const CategoriesModel = db.define("categories",{
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true
  }
}, {
  timestamps: false
})

module.exports = CategoriesModel
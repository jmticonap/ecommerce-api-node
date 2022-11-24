const db = require("../database/database")
const { DataTypes } = require("sequelize")

const ProductImagesModel = db.define("product_images", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
}, {
  timestamps: false
})

module.exports = ProductImagesModel

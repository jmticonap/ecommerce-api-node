const db = require("../database/database")
const { DataTypes } = require("sequelize")

const FeaturesContentModel = db.define("features_content", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = FeaturesContentModel

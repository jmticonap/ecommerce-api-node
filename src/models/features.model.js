const db = require("../database/database")
const { DataTypes } = require("sequelize")

const FeaturesModel = db.define("features", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = FeaturesModel

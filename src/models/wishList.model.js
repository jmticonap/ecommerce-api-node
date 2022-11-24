const db = require("../database/database")
const { DataTypes } = require("sequelize")

const WishListModel = db.define("wish_list", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false
})

module.exports = WishListModel
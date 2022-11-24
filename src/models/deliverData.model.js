const db = require("../database/database")
const { DataTypes } = require("sequelize")

const DeliverDataModel = db.define("deliver_data",{
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  street: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
})

module.exports = DeliverDataModel
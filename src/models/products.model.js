const db = require("../database/database")
const { DataTypes } = require("sequelize")

const ProductModel = db.define("products", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    stock: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false
})

module.exports = ProductModel
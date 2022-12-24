const { Sequelize } = require('sequelize')
require('dotenv').config()

const db = new Sequelize({
  host: process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_HOST : process.env.DEV_DB_HOST,
  port: process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_PORT : process.env.DEV_DB_PORT,
  database: process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_NAME : process.env.DEV_DB_NAME,
  username: process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_USERNAME : process.env.DEV_DB_USERNAME,
  password: process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
  dialect: 'postgres',
  logging: false,
  dialectOptions: process.env.NODE_ENV === 'pro' && { ssl: { require: true, rejectUnauthorized: false } }
})

module.exports = db

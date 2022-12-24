const { Sequelize } = require('sequelize')
require('dotenv').config()

// const db = new Sequelize(
//   process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_NAME : process.env.DEV_DB_NAME,
//   process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_USERNAME : process.env.DEV_DB_USERNAME,
//   process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
//   {
//     host: process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_HOST : process.env.DEV_DB_HOST,
//     port: process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_PORT : process.env.DEV_DB_PORT,
//     dialect: 'postgres',
//     logging: false,
//     ssl: process.env.NODE_ENV === 'pro'
//     // dialectOptions: process.env.NODE_ENV === 'pro' && { ssl: { require: true, rejectUnauthorized: false } }
//   })

const db = new Sequelize(
  process.env.NODE_ENV === 'pro' ? process.env.PRO_DB_URI : process.env.DEV_DB_URI,
  {
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'pro' && { ssl: { require: true, rejectUnauthorized: false } }
  }
)

// database: string, username: string, password: string, options: object
// const db = new Sequelize('postgres://jmtp_user:i1BQ9zO5gfOqehs6lygFEZBnmlZDjsVL@dpg-ce1t3g9a6gdsa63us9i0-a.oregon-postgres.render.com/jmtp_db')

module.exports = db

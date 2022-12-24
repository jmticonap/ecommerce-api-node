const path = require('path')
const express = require('express')
const cors = require('cors')
const db = require('./src/database/database')
const errorHandler = require('./src/middlewares/error.middleware')
const initModels = require('./src/models/initModel')
const compression = require('compression')
const helmet = require('helmet')

const userRouter = require('./src/routers/users.route')
const authRouter = require('./src/routers/auth.route')
const categoryRouter = require('./src/routers/categories.route')
const productRouter = require('./src/routers/products.route')
const featureRouter = require('./src/routers/features.route')
const cartRouter = require('./src/routers/cart.route')

const authenticate = require('./src/middlewares/auth.middleware')

const initData = require('./src/seeders/initData')

// swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpecs = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JMTP - Ecommerce',
      version: '1.0.0'
    },
    servers: [
      { url: 'http://localhost:8000' }
    ]
  },
  apis: [`${path.join(__dirname, './src/routers/*.js')}`]
}

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(compression())

Promise
  .all([initModels(), db.authenticate()])
  .then(() => {
    console.log('initModels\t ...done\n', '\bdb.authenticate\t ...done')
    return db.sync({
      force: process.env.NODE_ENV !== 'pro'
    })
  })
  .then(() => {
    console.log('db.sync\t\t ...done')
    process.env.NODE_ENV !== 'pro' && initData(db)
  })
  .catch(error => {
    console.error(error)
  })

app.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      message: 'hello world'
    })
  next()
})

app.use('/api/v1', userRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', authenticate, categoryRouter)
app.use('/api/v1', authenticate, productRouter)
app.use('/api/v1', authenticate, featureRouter)
app.use('/api/v1', authenticate, cartRouter)

app.use(
  '/api-doc',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpecs))
)

app.use(errorHandler)

module.exports = app

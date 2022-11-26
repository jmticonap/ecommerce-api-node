const path = require("path")
const express = require("express")
const cors = require("cors")
const db = require("./src/database/database")
const errorHandler = require("./src/middlewares/error.middleware")
const initModels = require("./src/models/initModel")

const userRouter = require("./src/routers/users.route")
const authRouter = require("./src/routers/auth.route")
const categoryRouter = require("./src/routers/categories.route")
const productRouter = require("./src/routers/products.route")
const featureRouter = require("./src/routers/features.route")
const cartRouter = require("./src/routers/cart.route")

const authenticate = require("./src/middlewares/auth.middleware")

const initData = require("./src/seeders/initData")

//swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpecs = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JMTP - Ecommerce",
            version: "1.0.0"
        },
        servers: [
            { url: "http://localhost:8000" }
        ]
    },
    apis: [`${path.join(__dirname, "./src/routers/*.js")}`]
}

const app = express()

app.use(express.json())
app.use(cors())


initModels()

db.authenticate()
    .then(() => console.log("Successfull DB authentication."))
    .catch(error => console.log(error))

db.sync({ force: true })
    .then(() => {
        console.log("DB schema created successfully.")
        //LOADING INIT DB DATA
        initData(db)
    })
    .catch(error => console.log(error))


app.get("/", (req, res, next) => {
    res.json({
        message: "hello world"
    })
    res.end()
    next()
})

app.use("/api/v1", userRouter)
app.use("/api/v1", authRouter)
app.use("/api/v1", authenticate, categoryRouter)
app.use("/api/v1", authenticate, productRouter)
app.use("/api/v1", authenticate, featureRouter)
app.use("/api/v1", authenticate, cartRouter)

app.use(
    "/api-doc",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerSpecs))
)

app.use(errorHandler)

module.exports = app
const express = require("express")
const cors = require("cors")
const db = require("./src/database/database")
const errorHandler = require("./src/middlewares/error.middleware")
const initModels = require("./src/models/initModel")

const userRouter = require("./src/routers/users.route")
const categoryRouter = require("./src/routers/categories.route")
const productRouter = require("./src/routers/products.route")

const app = express()

app.use(express.json())
app.use(cors())


initModels()

db.authenticate()
    .then(() => console.log("Successfull DB authentication."))
    .catch(error => console.log(error))

db.sync({ force: true })
    .then(() => console.log("DB schema created successfully."))
    .catch(error => console.log(error))


app.get("/", (req, res, next) => {
    res.json({
        message: "hello world"
    })
    res.end()
})

app.use("/api/v1", userRouter)
app.use("/api/v1", categoryRouter)
app.use("/api/v1", productRouter)

app.use(errorHandler)

module.exports = app
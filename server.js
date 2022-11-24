const app = require("./app")

const HOSTNAME = "localhost"
const PORT = "8000"


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running http://${HOSTNAME}:${PORT}`)
})
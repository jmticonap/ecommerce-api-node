const testUtil = require("./utils")
const supertest = require("supertest")
const app = require("../../app")
const server = require("../../server")
const db = require("../database/database")
const initData = require("../seeders/initData")

const api = supertest(app)

test(`GET->/api/v1/cart
- Get active card
`, async () => {
  const token = `Bearer ${await testUtil.getTestActiveToken()}`
  const responseActiveCart = await api
    .get("/api/v1/cart")
    .set('Authorization', token)
  expect(responseActiveCart.type).toBe("application/json")
  expect(responseActiveCart.body.isPurchased).toEqual(false)
})

test(`PATCH->/api/v1/cart/add_products
- Add products to he cart
`, async () => {
  const token = `Bearer ${await testUtil.getTestActiveToken()}`
})


beforeAll(async () => {
  await db.authenticate()
  await db.sync({ force: true })
  await initData(db)
})

// afterAll(async () => {
//     server.close()
// })
const CategoriesModel = require('../models/categories.model')
const testUtil = require('./utils')
const supertest = require('supertest')
const app = require('../../app')
const server = require('../../server')
const db = require('../database/database')
const initData = require('../seeders/initData')

const api = supertest(app)

beforeAll(async () => {
  await db.sync({ force: true })
})


test('Creatting new category', async () => {
  const newCategory = await CategoriesModel.create({
    name: 'desktop'
  })
  expect(newCategory).toHaveProperty('id')
})


test('Path: GET->/api/v1/categories', async () => {
  const token = `Bearer ${await testUtil.getTestActiveToken()}`
  await api
    .get('/api/v1/categories')
    .set('Authorization', token)
    .expect('Content-Type', /application\/json/)
    .expect(200)
})

beforeAll(async () => {
  await db.authenticate()
  await db.sync({ force: true })
  await initData(db)
})

// afterAll(async () => {
//     server.close()
// })

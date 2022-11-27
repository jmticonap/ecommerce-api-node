const supertest = require("supertest")
const app = require("../../app")
const server = require("../../server")
const UserModel = require("../models/users.model")

const api = supertest(app)

describe("Unit Test: USER_MODEL", () => {
    test("Creatting a new user", async () => {
        const newUser = await UserModel.create({
            email: "donovan@gmail.com",
            name: "Donovan Ian Ticona Verdeguer",
            password: "1234"
        })
        expect(newUser).toHaveProperty('id')
    })

})


beforeAll(async () => {

})



describe("End-Point: [USER]", () => {
    test("Path: GET->/api/v1/users [make sure Content-Typye=application/json]", async () => {
        await api
            .get("/api/v1/users")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test(
        `Path: POST->/api/v1/users 
        - make sure user is created
        - Content-Type=application/json
        - password field isn't present in response`,
        async () => {
            const response = await api
                .post("/api/v1/users")
                .send({
                    "email": "jm.ticona.pacheco@gmail.com",
                    "name": "Juan Manuel Ticona Pacheco",
                    "password": "1234"
                })
                .set('Accept', 'application/json')

            
            expect(response.headers["content-type"]).toMatch(/application\/json/);
            expect(response.status).toEqual(200);
            expect(response.body).not.toHaveProperty('password');

        })
})

afterAll(() => {
    server.close()
})

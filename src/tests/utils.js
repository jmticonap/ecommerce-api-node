const authService = require("../services/auth.service")

const testUtil = {
    getTestActiveToken: async () => {
        const result = await authService.authenticate({
            email: "mia@gmail.com",
            password: "1234"
        })
        return authService.genToken(result.result);
    },
    productsToCart: [
        {
            "productId": 1,
            "price": 1150.5,
            "quantity": 3
        }, {
            "productId": 2,
            "price": 4200.25,
            "quantity": 2
        }
    ]
}

module.exports = testUtil
const authService = require("../services/auth.service")

const authController = {
    userLogin: async (req, res, next) => {
        try {
            // email y password
            const credentials = req.body;
            const result = await authService.authenticate(credentials);
            // false --> no era contraseña invalida
            // null --> no se encuentra al usuario
            // { isValid, result }
            if (result) {
                const { id, name, email } = result.result;
                const user = { id, name, email };
                const token = authService.genToken(user);
                user.token = token;
                res.json(user);
            } else {
                res
                    .status(400)
                    .json({ message: "Información inválida" });
            }
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: "Email o contraseña inválida",
            });
        }
    }
}

module.exports = authController
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authService = {
    authenticate: async credentials => {
        try {
            const { email, password } = credentials;
            const result = await UserModel.findOne({
                where: { email },
            });
            if (result) {
                const isValid = bcrypt.compareSync(password, result.password);
                return isValid ? { isValid, result } : isValid;
            } else {
                return result;
            }
        } catch (error) {
            throw error;
        }
    },
    genToken: data => {
        try {
            const token = jwt.sign(data, process.env.SECRET, {
                expiresIn: "2h",
                algorithm: "HS512",
            });
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = authService
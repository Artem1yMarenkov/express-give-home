const config = require('dotenv').config();

const jwt = require('jsonwebtoken');

const {User} = require('../database/models');

// Errors
const signupErrors = {
    EMAIL_ALREADY_EXIST: "Email already exist!",
}

const signinErrors = {
    USER_NOT_FOUND: "User not found!",
}

class AuthService {
    // Registrate User
    static async signup({login, email, password}) {
        const user = User.build({login, email, password});
        console.log(user)

        try {
            await user.save();
        } catch (error) {
            const errorCode = error.original.code;

            // Catch Email Exist
            if (errorCode == "ER_DUP_ENTRY") {
                throw Error(signupErrors.EMAIL_ALREADY_EXIST);
            }

            // Throw error to Controller
            throw error;
        }
    }

    // Login User
    static async signin({login, email, password}) {
        const user = await User.findOne({
            where: {login, email, password}
        });

        if (!user) {
            throw Error(signinErrors.USER_NOT_FOUND);
        }

        const payload = {email: user.email, id: user.id};
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, {expiresIn: "2 days"});

        return token;
    }
}

module.exports = AuthService;
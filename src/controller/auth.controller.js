const {AuthService} = require('../service');
const {SERVER_ERROR} = require('./errors');

class AuthController {
    static async signup(req, res) {
        const {login, email, password} = req.body;
        try {
            await AuthService.signup({login, email, password});
        } catch (error) {
            return res.status(500).json({error: SERVER_ERROR});
        }
    }

    static async signin(req, res) {
        const {login, email, password} = req.body;
        try {
            await AuthService.signin({login, email, password});
        } catch (error) {
            return res.status(500).json({error: SERVER_ERROR});
        }
    }
}

module.exports = AuthController;
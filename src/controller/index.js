const {Router} = require('express');

const AuthService = require('../service/auth.service');

const router = Router();

router
    .post('/auth/singin', AuthService.singIn)
    .post('/auth/singup', AuthService.singUp)

module.exports = router;
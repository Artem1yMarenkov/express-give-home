const validator = require('validator');

const validateAuthData = (req, res, next) => {
    const {login, email, password} = req.body;

    const loginIsValid = !validator.isEmpty(login, {min: 3, max: 100});
    const emailIsValid = validator.isEmail(email);
    const passwordIsValid = validator.isEmpty(password, {min: 6, max: 20});

    next();
}

module.exports = validateAuthData;
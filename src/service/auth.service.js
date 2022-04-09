const jwt = require('jsonwebtoken');
const md5 = require('md5');

const User = require('../database/models/User');

const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
const SAVE_USER_ERROR = 'SAVE_USER_ERROR';

const FIND_USER_ERROR = 'FIND_USER_ERROR';
const SINGIN_SUCCESS = 'SINGIN_SUCCESS';

const SECRET_KEY = '234luereiupfg2379w09ch0283g';


const singUp = async (req, res) => {
    const {login, email, password} = req.body;
    
    const newUser = User.build({login, email, password: md5(password)});

    console.log(newUser);

    try {
        await newUser.save();
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: SAVE_USER_ERROR});
    }

    return res.status(200).json({message: SAVE_USER_SUCCESS});
}

const singIn = async (req, res) => {
    const {email, password} = req.body;
    
    console.log(md5(password));

    let user;
    try {
        user = await User.findOne({
            where: { email: email, password: md5(password) }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: FIND_USER_ERROR})
    }


    if (!user) {
        return res.status(400).json({message: FIND_USER_ERROR})
    }

    const payload = {
        user
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2d'});

    console.log(jwt.decode(token));

    return res.status(200).json({token});
}

module.exports = {
    singUp,
    singIn
}
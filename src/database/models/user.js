const { Model, DataTypes } = require("sequelize");
const db = require('../db');

class User extends Model {}

User.init({
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, 
    { sequelize: db, modelName: 'User' }
);

module.exports = User;
const { Model, DataTypes } = require("sequelize");
const db = require('../db');

class Post extends Model {}

Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
}, 
    { sequelize: db, modelName: 'Post', paranoid: true}
);

module.exports = Post;
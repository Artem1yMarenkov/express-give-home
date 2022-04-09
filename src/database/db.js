const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('givehome', 'root', 'Artem180808', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
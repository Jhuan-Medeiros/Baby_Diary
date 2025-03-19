const Sequelize = require("sequelize");

const sequelize = new Sequelize("babyDiary", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: "3307"
})

module.exports = sequelize;
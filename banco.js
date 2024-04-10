const Sequelize = require("sequelize")
const sequelize = new Sequelize("p1multiplataforma", "root", "",{
    host:"localhost",
    dialect:"mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize:sequelize
}
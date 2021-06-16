const Sequelize = require('sequelize');
const sequelize = new Sequelize('meubanco', 'root', '', {host:'localhost', dialect:'sqlite', storage:'./database/meubanco.sqlite'});
module.exports=sequelize;
global.sequelize=sequelize;


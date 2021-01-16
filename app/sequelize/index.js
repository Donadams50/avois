//const dbConfig = require("../config/db.config.js");
const dotenv=require('dotenv');
//sequelize
dotenv.config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: process.env.dialect,
  operatorsAliases: false,

  pool: {
   max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("../tutorial/tutorial.model.js")(sequelize, Sequelize);
db.profiles = require("../members/members.model.js")(sequelize, Sequelize);
db.member_auths = require("../members/auth.model.js")(sequelize, Sequelize);
module.exports = db;
//Don’t forget to call sync() method in server.js



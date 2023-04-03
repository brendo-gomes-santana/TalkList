const Sequelize = require('sequelize');

const databaseconfig = require('../config/database');
const User = require('../app/models/User');

const models = [User];

class Database {
    constructor(){
        this.init();
    }
    init(){
        //
        this.connection = new Sequelize(databaseconfig);
        models.map(model => model.init(this.connection));
    }
}

module.exports = new Database();

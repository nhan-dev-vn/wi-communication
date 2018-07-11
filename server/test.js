let Sequelize = require('sequelize');
let sequelize = new Sequelize('test_db', 'root', '123456', {host:'localhost', dialect: 'mysql'});

let db = {};

db.User = require('./user.js').define(sequelize, Sequelize);
db.User.create({
    id: 1,
    username: 'abc'
});
/*sequelize.define('User', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING}
});*/
sequelize.sync().then(function() {
    console.log('sync success', db);
}).catch(function(err) {
    console.log(err);
});

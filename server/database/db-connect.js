'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var sequelize = new Sequelize("chat_module", "root", "", {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'chat_angular.sqlite')
});
var Op = Sequelize.Op;
var db = {};
fs
    .readdirSync(path.join(__dirname, 'schemas'))
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        var model = sequelize['import'](path.join(__dirname, 'schemas',file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


db.Conversation.belongsToMany(db.User, {
    through : 'user_conversation',
    foreignKey: 'conversation_id'
});
db.User.belongsToMany(db.Conversation, {
    through : 'user_conversation',
    foreignKey: 'user_id'
});
db.Conversation.hasMany(db.Message, {
    foreignKey: {
        name: 'idConversation',
        allowNull: false
    }
})
db.Message.belongsTo(db.Conversation, {
    foreignKey: {
        name: 'idConversation',
        allowNull: false
    }
});
db.User.hasMany(db.Message, {
    foreignKey: {
        name: 'idSender',
        allowNull: false
    }
})
db.Message.belongsTo(db.User, {
    foreignKey: 'idSender',
    targetKey: 'id'
});
sequelize.sync().then(()=>{
    console.log('\n============================ SYNC DATABASE SUCCESS ====================\n');
}).catch(err=>{
    console.log('\n============================ SYNC DATABASE ERROR ======================\n');
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

module.exports = db;

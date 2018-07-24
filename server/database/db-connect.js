'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);

var configDb = require('config').get('db');

var sequelize = new Sequelize(configDb.db_name, configDb.user, configDb.password, configDb.options);
var Op = Sequelize.Op;
var db = {};
/*fs
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
*/
db.User = require('./schemas/user.js').define(sequelize, Sequelize);
db.Conversation = require('./schemas/conversation.js').define(sequelize, Sequelize);
db.Message = require('./schemas/message.js').define(sequelize, Sequelize);
db.PendingConversation = require('./schemas/pendingConversation').define(sequelize, Sequelize);

db.Conversation.belongsToMany(db.User, {
    through : 'user_conversation',
    foreignKey: 'conversation_id'
});
db.User.belongsToMany(db.Conversation, {
    through : 'user_conversation',
    foreignKey: 'user_id'
});

// Add user pending message

// db.User.belongsToMany(db.Conversation, {
//     through: 'user_conversation_pending',
//     foreignKey: 'pending_user_id',
//     onDelete: 'CASCADE'
// })

// db.Conversation.belongsToMany(db.User, {
//     through : 'user_conversation_pending',
//     foreignKey: 'pending_conversation_id',
//     onDelete: 'CASCADE'
// });

db.User.hasMany(db.PendingConversation, {
    foreignKey: {
        name: 'idUser',
        allowNull: false
    }
})
db.Conversation.hasMany(db.PendingConversation, {
    foreignKey: {
        name: 'idConversation',
        allowNull: false
    }
})
db.PendingConversation.belongsTo(db.User, {
    foreignKey: {
        name: 'idUser',
        allowNull: false
    }
})
db.PendingConversation.belongsTo(db.User, {
    foreignKey: {
        name: 'idConversation',
        allowNull: false
    }
})

// End Add user pending message

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
    console.log('\n============================ SYNC DATABASE ERROR ======================\n', err);
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

module.exports = db;

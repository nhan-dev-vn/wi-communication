'use strict';
module.exports = (sequelize, DataTypes) => {
    var Conversation = sequelize.define('Conversation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });

    return Conversation;
};

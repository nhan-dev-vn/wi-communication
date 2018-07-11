module.exports.define = function(sequelize, DataTypes) {
    return sequelize.define('Conversation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremet: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });
};

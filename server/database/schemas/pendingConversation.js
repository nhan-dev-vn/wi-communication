module.exports.define = function (sequelize, DataTypes) {
    return sequelize.define('PendingConversation', {
        // idConversation: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     allowNull: false
        // },
        // idUser: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     allowNull: false
        // }
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        }
    });
};

module.exports.define = function(sequelize, Sequelize) {
    return sequelize.define('User', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        username: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING}
    });
};

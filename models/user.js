module.exports = function (sequelize, DataTypes){
    return sequelize.define('user', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING
    });
};
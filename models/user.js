module.exports = function (sequelize, DataTypes){
    return sequelize.define('user', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        passwordhash: DataTypes.STRING
    });
};
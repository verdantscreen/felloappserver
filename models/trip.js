module.exports = function (sequelize, DataTypes){
    return sequelize.define("trip", {
        destination: DataTypes.STRING,
        occasion: DataTypes.STRING,
        away: DataTypes.DATE,
        home: DataTypes.DATE,
        companions: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    })
}
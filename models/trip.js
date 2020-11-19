module.exports = function (sequelize, DataTypes){
    return sequelize.define("trip", {
        destination: DataTypes.STRING,
        occasion: DataTypes.STRING,
        depart: DataTypes.DATE,
        return: DataTypes.DATE,
        travel_partners: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    })
}
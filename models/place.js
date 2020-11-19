module.exports = function (sequelize, DataTypes){
    return sequelize.define("place", {
        place: DataTypes.STRING,
        purpose: DataTypes.STRING,
        spend: DataTypes.INTEGER,
        return: DataTypes.BOOLEAN,
        trip_id: DataTypes.INTEGER
    })
}
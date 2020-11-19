module.exports = function (sequelize, DataTypes){
    return sequelize.define("thing", {
        item: DataTypes.STRING,
        quantity: DataTypes.STRING,
        packed: DataTypes.BOOLEAN,
        return: DataTypes.BOOLEAN,
        trip_id: DataTypes.INTEGER
    })
}
module.exports = function (sequelize, DataTypes){
    return sequelize.define("thought", {
        date: DataTypes.DATE,
        entry: DataTypes.STRING,
        trip_id: DataTypes.INTEGER
    })
}
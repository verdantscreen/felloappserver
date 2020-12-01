module.exports = function (sequelize, DataTypes){
    return sequelize.define("thought", {
        date: DataTypes.STRING,
        thought: DataTypes.TEXT,
    })
}
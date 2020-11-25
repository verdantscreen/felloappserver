module.exports = function (sequelize, DataTypes){
    return sequelize.define("thought", {
        date: DataTypes.DATE,
        thought: DataTypes.TEXT,
    })
}
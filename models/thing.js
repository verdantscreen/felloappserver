module.exports = function (sequelize, DataTypes){
    return sequelize.define("thing", {
        item: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        packed: DataTypes.BOOLEAN,
        repacked: DataTypes.BOOLEAN,
    })
}
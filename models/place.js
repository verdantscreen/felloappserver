module.exports = function (sequelize, DataTypes){
    return sequelize.define("place", {
        date: DataTypes.DATEONLY,
        place: DataTypes.STRING,
        purpose: DataTypes.STRING,
        spend: DataTypes.DECIMAL,
        goBack: DataTypes.BOOLEAN,
    })
}
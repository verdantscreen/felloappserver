module.exports = function (sequelize, DataTypes){
    return sequelize.define("place", {
        date: DataTypes.DATE,
        place: DataTypes.STRING,
        purpose: DataTypes.STRING,
        spend: DataTypes.INTEGER,
        goBack: DataTypes.BOOLEAN,
    })
}
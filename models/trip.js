module.exports = function (sequelize, DataTypes){
    return sequelize.define("trip", {
        destination: DataTypes.STRING,
        departDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        returnDate:{
            type: DataTypes.STRING,
            allowNull: true
        },
        companions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        occasion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}
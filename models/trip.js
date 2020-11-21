module.exports = function (sequelize, DataTypes){
    return sequelize.define("trip", {
        destination: DataTypes.STRING,
        departDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        returnDate:{
            type: DataTypes.DATE,
            allowNull: true
        },
        companions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        occasion: {
            type: DataTypes.STRING,
            allowNull: true
        }, //drop down
        userId: DataTypes.INTEGER
    })
}
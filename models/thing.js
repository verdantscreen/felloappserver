module.exports = function (sequelize, DataTypes){
    return sequelize.define("thing", { //define is a sqlize method that maps the model properties onto our postgres db table; we pass in our db table name "thing" and an object containing our column names: column datatypes
        thing: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        packed: DataTypes.BOOLEAN,
        repacked: DataTypes.BOOLEAN,
    })
}
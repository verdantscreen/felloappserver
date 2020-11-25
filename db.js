const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to appfello postgres db');
    },
    function(err){
        console.log(err);
    }
);

let user = sequelize.import('./models/user'); 
let trip = sequelize.import('./models/trip');
let thing = sequelize.import('./models/thing');
let place = sequelize.import('./models/place');
let thought = sequelize.import('./models/thought');

user.hasMany(trip);
trip.belongsTo(user);

trip.hasOne(thing);
thing.belongsTo(trip);
trip.hasOne(place);
place.belongsTo(trip);
trip.hasOne(thought);
thought.belongsTo(trip);

module.exports = sequelize;
require('dotenv').config();
let express = require('express');
let app = express();
let test = require('./controllers/testcontroller'); 
let user = require('./controllers/usercontroller');
let trip = require('./controllers/tripcontroller');
let thing = require('./controllers/thingcontroller');
let place = require('./controllers/placecontroller');
let thought = require('./controllers/thoughtcontroller');
let sequelize = require('./db');

sequelize.sync(); //remove {force:true} when ready to keep data {force:true}

app.use(express.json()); // MUST go above routes so they can use express.json() (otherwise they will break)
app.use(require('./middleware/headers'));

// exposed ROUTES //

app.use('/test', test);
app.use('/user', user);

app.use(require('./middleware/validateSession'));
// protected routes //
app.use('/mytrips', trip);

app.use('/things', thing);
app.use('/places', place);
app.use('/thoughts', thought);

app.listen(process.env.PORT, () => {
     console.log(`server is listening on port ${process.env.PORT}`)
})


// app.listen(3000, function(){
//     console.log('Why, hello there.')
// });

// app.use('/api/test', function(req, res){
//     res.send("this is data from the /api/test endpoint; it's from the server");
// });
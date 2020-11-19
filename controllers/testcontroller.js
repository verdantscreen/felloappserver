let express = require('express'); 
let router = express.Router();
let sequelize = require('../db');
let TestModel = sequelize.import('../models/test'); //model class for Sequelize (use pascal case)

// router.get('/', function(req, res){ 
//     res.send('hey this is a test route');
// });
// // controller method #1 (simple response)
// router.post('/one', function(req, res){ 
//     res.send('test 1 went through!');
// });
// // controller method #2(persisting data)
// router.post('/two', function (req, res){
//     let testData = "Test data for endpoint two";

//     TestModel.create({
//         testdata: testData
//     }).then(dataFromDatabase => {
//         res.send("Test two went through!")
//     })
// });
// // controller method #3 req.body middleware
// router.post('/three', function(req, res){
//     let testData = req.body.testdata.item; //req is the request body is where our data is being held testdata is a property of body and item is a property of testdata

//     TestModel.create({
//         testdata: testData
//     })
//     res.send("Test three went through!")
//     console.log("Test three went through!")
// });

// // step #4 use this with postman
// router.post('/four', function (req, res) {
//     let testData = req.body.testdata.item;
//     TestModel.create({
//         testdata: testData
//     })
//     .then(
//         function message() {
//             res.send("Test four went through!")
//         }
//     );
// });

// // route #5 return data in a promise
// router.post('/five', function (req, res) {
//     let testData = req.body.testdata.item;
//     TestModel.create({
//         testdata: testData
//     })
//     .then(
//         function message(data) {
//             res.send(data);
//         }
//     );
// });

// // route #6 return response as JSON 
// router.post('/six', function (req, res) {
//     let testData = req.body.testdata.item;
//     TestModel.create({
//         testdata: testData
//     })
//     .then(
//         function message(testdata) {
//             res.json({
//                 testdata: testdata
//             });
//         }
//     );
// });

// // route #7 handle errors/bring it all together
// router.post('/seven', function (req, res) {
//     let testData = req.body.testdata.item;
//     TestModel.create({
//         testdata: testData
//     })
//     .then(
//         function message(testdata) {
//             res.json({
//                 testdata: testdata
//             });
//         },
//         function createError(err){
//             res.send(500, err.message);
//         }
//     );
// });

router.get('/helloclient', function (req, res){
    res.send('This is a message from the server to the client')
})

module.exports = router;

//import Express framework, enabling us to use Express methods
//use express variable to access the Router() method (which returns a router object for us)
//pass two arguments into our .get Router method: the path and the callback/handler function that "listens" for a request that matches this path and method and if it's a match, the callback function will run
//send() is an express methodwe can call on the response/res
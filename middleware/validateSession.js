// let jwt = require('jsonwebtoken');
// let sequelize = require('../db');
// let User = sequelize.import('../models/user'); //this may cause issued, refer to workoutlog

// module.exports = function(req, res, next) {
//     if (req.method == 'OPTIONS') {
//         next();
//     } else {
//         let sessionToken = req.headers.authorization;
//         console.log(sessionToken);
//         if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided" });
//         else {
//             jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
//                 if(decoded) {
//                     User.findOne({where: { id: decoded.id }})
//                     .then(user => {
//                         req.user = user;
//                         next();
//                     },
//                     function(){
//                         res.status(401).send({ error: "Not authorized" });
//                     });
//                     } else {
//                         res.status(400).send({ error: "Not authorized" });
//                 }
//             });
//         }
//     }
// };

const jwt = require('jsonwebtoken'); //if you get an error stating something is being redeclared, switch it from a const to a var or let
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => { 
    const token = req.headers.authorization;
    console.log(req.headers)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        // console.log(`INVALID TOKEN: ${decodedToken}`)
        if (!err && decodedToken) {
            User.findOne({ where: {id: decodedToken.id}})
            .then(user => {
                if (!user) throw 'err';
                req.user = user;
                return next();
            })
            .catch(err => {next(err); console.log('this could be where it broke')})
        } else {
            req.errors = err;
            res.status(401).send("This is a bad token")
        }
    })
};

module.exports = validateSession;

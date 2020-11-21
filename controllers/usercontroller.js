let express = require('express'); 
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

// user signup
router.post('/signup', function (req, res){
    let name = req.body.user.name;
    let email = req.body.user.email;
    let password = req.body.user.password;
    User.create({
        name: name,
        email: email,
        passwordhash: bcrypt.hashSync(password, 10)
    }).then(
        function createSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            });
        },
        function createError(err){
            res.send(500, err.message);
            console.log("user sign up error")
        }
    );
});

// user signin
router.post('/signin', function (req, res){
    User.findOne({ where: {email: req.body.user.email} } ).then(
        function (user){
            if(user){
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                    if(matches){
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "user auth success",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "sign in failure"});
                    }
                });
        } else {
            res.status(500).send({error: "failed to sign in"});
        }
        },
        function (err){res.status(501).send({error: "sign in unsuccessful"});
        }
        );
});

module.exports = router;
var express = require('express')
var router = express.Router()
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var multer = require ( 'multer');
var upload = multer({
    dest:"public/images/userava"
})
var path = require("path");

var User = require("../models/User.js");
// Passport local
// готовые фунц-кции паспорт
passport.use(new LocalStrategy({ usernameField: 'email' },
    function( email, password, done) {
        console.log("login", email, password);
        User.findOne({ email: email }).exec(function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            user.comparePassword(password, function(err, isMatch) {
                if (err) return done(err);
                if (isMatch) return done(null, user);
                return done(null, false);
            });
        });
}));

passport.serializeUser(function(user, done) {
    console.log("serializeUser", user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).exec(function(err, user) {
        console.log("deserializeUser", user);
        done(err, user);
    });
});


// Use of Passport user after login
// еще готовые функции от паспорт 
router.use(passport.initialize());// команда , если есть куки, берет куки из браузера
router.use(passport.session());


router.use(function(req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user));
    }
    next();
})

router.post('/api/signup' , upload.single('image') ,function(req , res , next ){
    new User ({
        name: req.body.name ,
        surname: req.body.surname,
        age: req.body.age,
        gender: req.body.gender,
        email:req.body.email,
        password:req.body.password
    })
    .save(function(err, user){ // save changes base in blog 
        if(req.file) {
             var tempPath = req.file.path;
        
            var targetPath = path.resolve('public/images/userava/'+   user._id +'.'+req.file.originalname.split('.').slice(-1).pop());
            
            fs.rename(tempPath, targetPath, function(err) {
                if (err) return next(err);
            });
            
            user.img = 'images/userava/'+   user._id +'.'+req.file.originalname.split('.').slice(-1).pop() ;
            user.save(function(err , newuser){
                 req.login(user, function(err) {
                    if (err)  done(err, newuser);
                    return res.json(newuser);
                });
            })  
        } else {
            user.img = 'images/autoava.jpg';
            user.save(function(err , newuser){
                 req.login(user, function(err) {
                    if (err)  done(err, newuser);
                    return res.json(newuser);
                });
            })  
        }
       
   
    })
})
router.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
});
router.post('/api/logout', function(req, res) {
    req.logout()
    res.status(200).end();
});




router.use('/api/blogs', require("./blog"))
router.use('/api/comments', require("./comment"))
router.use('/api/likes', require("./like"))
router.use('/api/users', require("./user"))

router.get('*',function(req, res , next){
    res.redirect("/#!" + req.originalUrl);
})

module.exports = router ;



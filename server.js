var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");

// for auth
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
mongoose.connect('mongodb://127.0.0.1:27017/test');
var Blog = require("./server/models/Blog.js");
var User = require("./server/models/User.js");

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
    console.log("yyyyyy");
    console.log("serializeUser", user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).exec(function(err, user) {
        console.log("ddddddd");
        console.log("deserializeUser", user);
        done(err, user);
    });
});


var app = express();
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 })); // a client folder public
    app.use(bodyParser.json({limit: "50mb"}))
    app.use(bodyParser.json({limit: "50mb", extended: true }))
    // подключаем кукипарсер и сессион
app.use(cookieParser());
app.use(session({ secret: 'your secret here',
  resave:  true,
  saveUninitialized: true,
  key: 'jsessionid',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


// Use of Passport user after login
// еще готовые функции от паспорт 
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user));
    }
    next();
})
    app.get('/hello', function(req , res , next){
            console.log("hello"); // cout for author 
            res.status(200).send({msg: " PRIVET " }); // give ans for patient
    })
    app.get('/blogs', function(req , res , next){
        Blog.find().exec(function(err, blogs) //all info fron base in 'blogs'
        { 
            // console.log("hello"); // cout for author 
            res.status(200).send( blogs ); // give ans for patient
        })
    })
    
    app.get('/api/blogs', function(req , res , next ){
         Blog.find().exec(function(err, blogs) //all info fron base in 'blogs'
            {
                console.log(blogs);
            res.status(200).send( blogs ); // give ans for patient
            })
    })
    // app.get('/users.html', function(req , res , next ){
    //      Blog.find().exec(function(err, blogs) //all info fron base in 'blogs'
    //         {
    //         console.log(blogs);
    //         res.status(200).send( blogs ); // give ans for patient
    //         })
    // })
    app.post('/api/blogs', function(req , res , next){
            console.log(req.body);
            var blog = new Blog({
            title: req.body.title ,
            description: req.body.description,
            age: req.body.age,
            gender: req.body.gender,
            img:req.body.img
        })
        .save(function(err, blog){ // save changes base in blog 
            res.send(blog); //???
        })
    })
    app.delete('/api/blogs/:itemdelete',function(req,res,next){
            Blog.remove({_id:req.params.itemdelete}).exec(function(err){
                res.status(200).end();
            })
    })
    app.put('/api/blogs' , function(req , res , next){
        Blog.findById(req.body._id).exec(function(err , coritem){
            coritem.title = req.body.title;
            coritem.age = req.body.age;
            coritem.gender = req.body.gender;
            coritem.description = req.body.description;
            coritem.img = req.body.img;
            coritem.save(function(){
                console.log("all in server is ok");
                console.log(req.body);
                res.status(200).end();
            })
        })
    })
    app.get('/api/blogs/:iditem' , function(req , res , next ){
        Blog.findById(req.params.iditem).exec(function(err , item ){
            res.status(200).send(item);
        })
    })
    app.post('/api/signup' ,function(req , res , next ){
        new User ({
            name: req.body.name ,
            surname: req.body.surname,
            age: req.body.age,
            gender: req.body.gender,
            email:req.body.email,
            password:req.body.password
        })
        .save(function(err, user){ // save changes base in blog 
        req.login(user, function(err) {
            if (err)  done(err, user);
            return res.json(user);
        });
        })
    })
    // app.use(function(req, res, next) {
    //     req.asd = "123";
    //     next();
    // })
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
        res.cookie('user', JSON.stringify(req.user));
        res.send(req.user);
    });
    app.post('/api/logout', function(req, res) {
        req.logout()
        res.status(200).end();
    });
    app.get('*',function(req, res , next){
        res.redirect("/#!" + req.originalUrl);
    })
    app.listen(process.env.PORT, function(){
        console.log("express.server runningport " +  process.env.PORT)
    })
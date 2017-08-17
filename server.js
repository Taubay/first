var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");

// for auth
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://127.0.0.1:27017/test');

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

    // app.get('/hello', function(req , res , next){
    //         console.log("hello"); // cout for author 
    //         res.status(200).send({msg: " PRIVET " }); // give ans for patient
    // })
    
    
    // app.get('/blogs', function(req , res , next){
    //     Blog.find().exec(function(err, blogs) //all info fron base in 'blogs'
    //     { 
    //         // console.log("hello"); // cout for author 
    //         res.status(200).send( blogs ); // give ans for patient
    //     })
    // })
            
app.use(require("./server/routes"))

app.listen(process.env.PORT, function(){
    console.log("express.server runningport " +  process.env.PORT)
})
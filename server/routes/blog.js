var express = require('express')
var router = express.Router()

var Blog = require("../models/Blog.js");


router.get('/', function(req , res , next ){
     Blog.find({user:req.user._id}).exec(function(err, blogs) //all info fron base in 'blogs'
        {
            //console.log(blogs);
        res.status(200).send( blogs ); // give ans for patient
        })
})

router.post('/', function(req , res , next){
        console.log(req.body);
        var blog = new Blog({
        title: req.body.title ,
        description: req.body.description,
        age: req.body.age,
        gender: req.body.gender,
        img:req.body.img,
        user:req.user._id
    })
    .save(function(err, blog){ // save changes base in blog 
        res.send(blog); //???
    })
})
router.delete('/:itemdelete',function(req,res,next){
        Blog.remove({_id:req.params.itemdelete}).exec(function(err){
            res.status(200).end();
        })
})
router.put('/' , function(req , res , next){
    Blog.findById(req.body._id).exec(function(err , coritem){
        coritem.title = req.body.title;
        coritem.age = req.body.age;
        coritem.gender = req.body.gender;
        coritem.description = req.body.description;
        coritem.img = req.body.img;
        coritem.save(function(){
            // console.log("all in server is ok");
            // console.log(req.body);
            res.status(200).end();
        })
    })
})
router.get('/:iditem' , function(req , res , next ){
    Blog.findById(req.params.iditem).exec(function(err , item ){
        res.status(200).send(item);
    })
})
router.get('/home/all', function(req , res , next ){
         Blog.find().populate('user' , 'name img').exec(function(err, blogs) //all info fron base in 'blogs'
            {
            res.status(200).send( blogs ); // give ans for patient
            })
    })
router.get('/user/:idmyuser' , function(req , res , next ){
    Blog.find({user:req.params.idmyuser}).exec(function(err , items ){
        console.log(items);
        res.status(200).send(items);
    })
})

router.get('/:key/search', function(req , res , next ){
     Blog.find({
        $or: [
            {
                title:new RegExp(req.params.key , 'i')
            },
            {
                description:new RegExp(req.params.key , 'i')
            }
            ]
                
     }).exec(function(err, result) //all info fron base in 'blogs'
        {
            //console.log(blogs);
        res.status(200).send( result ); // give ans for patient
        })
})
module.exports = router ;

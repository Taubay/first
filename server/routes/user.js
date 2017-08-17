var express = require('express')
var router = express.Router()
var Blog = require("../models/Blog.js");
var User = require("../models/User.js");
var path = require("path");
   
   
   
   
   
var fs = require('fs');
var multer = require ( 'multer');
var upload = multer({
    dest:"public/images/userava"
})
// upload.single('image') говорит что будет сохранять файл т булет сохранять в req.file
router.put('/' , upload.single('image') ,function ( req , res , next ){
    User.findById(req.user.id).exec(function(err , coruserdata){
        coruserdata.name=req.body.name,
        coruserdata.surname=req.body.surname,
        coruserdata.gender=req.body.gender,
        coruserdata.email=req.body.email,
        coruserdata.password=req.body.password,
        coruserdata.save(function(err, user){
            var tempPath = req.file.path;

              var targetPath = path.resolve('public/images/userava/'+   req.user._id +'.'+req.file.originalname.split('.').slice(-1).pop());
        
              fs.rename(tempPath, targetPath, function(err) {
                  if (err) return next(err);
              });
              
              user.img = 'images/userava/'+   req.user._id +'.'+req.file.originalname.split('.').slice(-1).pop() ;
                user.save(function(err , newuser){
                    res.status(200).send(newuser)
                })       

        })
    })
})
router.delete('/' , function( req , res , next){
    Blog.remove({user:req.user.id}).exec(function(err){
        User.remove({_id:req.user._id}).exec(function(err){
            res.status(200).end();
            console.log("----------------------------------------ewkdowad");
        console.log(req.user);
        })
    })
})

router.get('/:iduser' , function(req , res , next ){
        User.findById(req.params.iduser).exec(function(err , user ){
            res.status(200).send(user);
            console.log("boom");
        })
    })
    
module.exports = router ;

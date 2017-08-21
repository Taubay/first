var express = require('express')
var router = express.Router()
var Like = require("../models/Like.js");
var CommLike = require("../models/CommLike.js");

router.get('/:blogid' , function(req, res, next) {
        Like.count({blog:req.params.blogid}).exec(function(err , likes ){
            res.status(200).send({likes: likes});
        })
    })
router.get('/:idlikes' , function(req, res, next) {
Like.findOne({
              blog:req.params.idlikes,
              user:req.user.id 
            }).exec(function(err,item){
            console.log(item);
                 if(err){}
                 if(!item){
                            res.status(200).send({dislike: false})  
                            } 
                else{
                            res.status(200).send({dislike: true})  
                     } 
                }) 
        })
router.post('/:idlikes' , function(req, res, next) {
Like.findOne({
              blog:req.params.idlikes,
              user:req.user.id 
            }).exec(function(err,item){
            console.log(item);
             if(err){}
             if(!item){
                         new Like ({
                                user:req.user._id, // т к у него есть сессия
                                blog:req.params.idlikes
                            }).save(function(err,like){
                                res.status(200).send({dislike: false})  
                                
                            })
                        } 
            else{
                    Like.remove(item).exec(function(err){
                        res.status(200).send({dislike: true})  
                        
                    })
                 } 
                }) 
        })
        
router.get('/comms/:blogid' , function(req, res, next) {
        CommLike.count({comment:req.params.blogid}).exec(function(err , likes ){
            res.status(200).send({likes: likes});
        })
    })       
        
router.post('/comms/:commId' , function(req, res, next) {
CommLike.findOne({
              comment:req.params.commId,
              user:req.user.id 
            }).exec(function(err,item){
            console.log(item);
             if(err){}
             if(!item){
                         new CommLike ({
                                user:req.user._id, // т к у него есть сессия
                                comment:req.params.commId
                            }).save(function(err,like){
                                res.status(200).send({dislike: false})  
                                
                            })
                        } 
            else{
                    CommLike.remove(item).exec(function(err){
                        res.status(200).send({dislike: true})  
                        
                    })
                 } 
                }) 
        })

module.exports = router ;

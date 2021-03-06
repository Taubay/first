var express = require('express')
var router = express.Router()
var Comment = require("../models/Comment.js");
router.post('/:idcomm', function(req, res, next) {
        new Comment ({
            description: req.body.description,
            user:req.user._id,
            blog:req.params.idcomm
        }).save(function(err , mycomm){
            mycomm.user = req.user ; 
            res.status(200).send(mycomm);
        })
    })
router.get('/:idallcomms' , function(req, res, next) {
    Comment.find({blog:req.params.idallcomms}).populate('user' , 'name img').exec(function(err , comments){
        res.status(200).send(comments);
    })
})
router.delete('/one/:idcomm',function(req,res,next){
        Comment.remove({_id:req.params.idcomm}).exec(function(err){
            res.status(200).end();
        })
})
router.put('/:idComm',function(req,res,next){;
        Comment.findById(req.body._id).exec(function(err , corComment){
            corComment.description = req.body.description ;
            corComment.save(function(){
                res.status(200).end();
            })
        })
})

module.exports = router ;

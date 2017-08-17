var mongoose = require("mongoose");
var likeSchema = new mongoose.Schema({
    blog : {type: mongoose.Schema.ObjectId , ref:"Blog"} ,
    user : {type: mongoose.Schema.ObjectId , ref:"User"} ,
    date : {type:Date, default : Date.now}})
module.exports = mongoose.model("Like", likeSchema);
var mongoose = require("mongoose");
var CommLikeSchema = new mongoose.Schema({
    comment : {type: mongoose.Schema.ObjectId ,ref:"Comment"} ,
    user : {type: mongoose.Schema.ObjectId , ref:"User"} ,
    date : {type:Date, default : Date.now}})
module.exports = mongoose.model("CommLike", CommLikeSchema);
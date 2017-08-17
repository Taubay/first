var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
    title: String, 
    description: String,
    img: String,
    user : {type: mongoose.Schema.ObjectId , ref:"User"} ,
    date: {type:Date, default : Date.now}
})
module.exports = mongoose.model("Blog", blogSchema);
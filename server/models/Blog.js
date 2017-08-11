var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
    title: String, 
    description: String,
    age: String,
    gender: String,
    img: String,
    date: {type:Date, default : Date.now}
})
module.exports = mongoose.model("Blog", blogSchema);
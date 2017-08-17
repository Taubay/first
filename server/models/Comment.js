var mongoose = require("mongoose");
var commSchema = new mongoose.Schema({
    description: String,
    user : {type: mongoose.Schema.ObjectId , ref:"User"} ,
    blog : {type: mongoose.Schema.ObjectId , ref:"Blog"} ,
    date: {type:Date, default : Date.now}
})
module.exports = mongoose.model("Comment", commSchema);
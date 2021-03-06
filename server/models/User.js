var mongoose = require("mongoose") ;
var bcrypt = require("bcryptjs");
var userSchema = new mongoose.Schema({
    img: String ,
    name: String, 
    surname: String,
    age: String,
    gender: String,
    email: {type:String, unique : true , lowercase : true , trim : true},
    password: String,
    date : {type:Date, default : Date.now}
})
userSchema.pre('save', function(next) { // перед сохранением юзера и шифрует пароль
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//при авторизции сравнивает пароли 
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model("User", userSchema);
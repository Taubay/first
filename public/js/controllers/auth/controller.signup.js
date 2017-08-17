angular.module("decode")
.controller("SignupCtrl",SignupCtrl);
SignupCtrl.$inject = ["$http", "Auth"]; // подключение
function SignupCtrl ($http , Auth) 
{
    var vm = this;
    vm.fakeava  = "images/photo-camera.png";
    vm.img = "images/autoava.jpg";
    vm.signup = function(){
        Auth.signup({
            //img:vm.img,
            name:vm.user.name,
            surname:vm.user.surname,
            age:vm.user.age,
            gender:vm.user.gender,
            email:vm.user.email,
            password:vm.user.password
            // resolve:{
            // userdata:function(){
            //     return vm.user;
            // } }
        }) 
        
    }
    // vm.loaduserimg = function(myfileuser){
    //     console.log(myfileuser);
    //     vm.img = "data:image/png;base64," + myfileuser.base64;
    //     vm.fakeava = "data:image/png;base64," + myfileuser.base64;
    // }
}
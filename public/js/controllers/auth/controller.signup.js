angular.module("decode")
.controller("SignupCtrl",SignupCtrl);
SignupCtrl.$inject = ["$http", "Auth"]; // подключение
function SignupCtrl ($http , Auth) 
{
    var vm = this;
    console.log("in logctrl all is ok");
    vm.signup = function(){
        Auth.signup({
            name:vm.name,
            surname:vm.surname,
            age:vm.age,
            gender:vm.gender,
            email:vm.email,
            password:vm.password
        })
    }
}
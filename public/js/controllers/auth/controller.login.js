angular.module("decode")
.controller("LoginCtrl",LoginCtrl);
LoginCtrl.$inject = ["$http" , "Auth"]; // подключение
function LoginCtrl ($http , Auth) 
{
    var vm = this;
    vm.login = function(){
        Auth.login({
            email: vm.email,
            password: vm.password 
        })
    }
}
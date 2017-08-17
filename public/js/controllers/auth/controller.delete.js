angular.module("decode")
.controller("DeleteUserCtrl",DeleteUserCtrl);
DeleteUserCtrl.$inject = ["$http" , "Auth"]; // подключение
function DeleteUserCtrl ($http , Auth) 
{
    var vm = this ;
   vm.deleteAcc = function(){
       Auth.deleteUser ({})
   }
}























































  // vm.deleteAcc = function (){
    //     Auth.deleteUser({})
    // }

// var vm = this;
    // vm.deleteAcc = function(){
    //     Auth.deleteAcc()
    // }
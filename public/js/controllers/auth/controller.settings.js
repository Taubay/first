angular.module("decode")
.controller("SettingsCtrl",SettingsCtrl);
SettingsCtrl.$inject = ["$http", "Auth"]; // подключение
function SettingsCtrl ($http , Auth) 
{
    var vm = this ; 
    vm.changedata = function(){
        Auth.changeDataAcc({
            name:vm.newuserdata.name,
            surname:vm.newuserdata.surname,
            gender:vm.newuserdata.gender,
            email:vm.newuserdata.email,
            password:vm.newuserdata.password,
            img:vm.file
        })
    }
}
























// vm.changedata = function() {
    //     Auth.changeuserdata({
    //         //img:vm
    //         name:vm.newuserdata.name,
    //         surname:vm.newuserdata.surname,
    //         age:vm.newuserdata.age,
    //         gender:vm.newuserdata.gender,
    //         email:vm.newuserdata.email,
    //         password:vm.newuserdata.password,
    //         email: vm.newuserdata.email,
    //         password: vm.newuserdata.password 
    //     })
    // }
angular.module("decode")
.controller("SettingsCtrl",SettingsCtrl);
SettingsCtrl.$inject = ["$http", "Auth", '$rootScope']; // подключение
function SettingsCtrl ($http , Auth,$rootScope) 
{
    var vm = this ; 
     
    vm.user = $rootScope.currentUser;
    vm.changedata = function(){
        Auth.changeDataAcc(vm.user)
    }
    
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (event) {
                // $('#blah').attr('src', e.target.result);
                document.getElementById("settimg").src=event.target.result;
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    setTimeout(function(){
        document.getElementById("file")
            .addEventListener("change", function() {
                console.log(this);
                readURL(this);
            });
    
    }, 1000)
    
    
    
}




// $("#imgInp").change(function(){
//     readURL(this);
// });





















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
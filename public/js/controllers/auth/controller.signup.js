angular.module("decode")
.controller("SignupCtrl",SignupCtrl);
SignupCtrl.$inject = ["$http", "Auth"]; // подключение
function SignupCtrl ($http , Auth) 
{
    var vm = this;
    vm.fakeava  = "images/photo-camera2.png";
    // vm.user.img = "images/autoava.jpg";
    vm.signup = function(){
        Auth.signup({
            // img:vm.img,
            name:vm.user.name,
            surname:vm.user.surname,
            age:vm.user.age,
            gender:vm.user.gender,
            email:vm.user.email,
            password:vm.user.password,
            image: vm.file
        }) 
        
    }
    
    function readURL(firstAva) {

        if (firstAva.files && firstAva.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (event) {
                // $('#blah').attr('src', e.target.result);
                document.getElementById("coutAva").src=event.target.result;
            }
    
            reader.readAsDataURL(firstAva.files[0]);
        }
    }
    setTimeout(function(){
        document.getElementById("img-ava")
            .addEventListener("change", function() {
                console.log(this);
                readURL(this);
            });
    
    }, 1000)
    
    // vm.loaduserimg = function(myfileuser){
    //     console.log(myfileuser);
    //     vm.img = "data:image/png;base64," + myfileuser.base64;
    //     vm.fakeava = "data:image/png;base64," + myfileuser.base64;
    // }
}
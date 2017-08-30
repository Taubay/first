angular.module("decode")
.controller("HeaderCtrl", HeaderCtrl);
HeaderCtrl.$inject = ["$http", "$modal" , "Auth" , "$rootScope"]; // подключение
function HeaderCtrl ($http , $modal , Auth , $rootScope) 
{
    var vm = this ;
    vm.newuser = false; 
    $rootScope.$watch("currentUser" , function(){
        vm.newuser = $rootScope.currentUser ; 
    })
    vm.login = function(){
        var open=$modal({
        container: "body",
        templateUrl: "views/login.html" , 
        controller: "LoginCtrl",
        controllerAs: "vm" , 
        show: false,
    })
    open.$promise.then(function(){
        open.show();
    })
    }
    vm.signup = function(){
        console.log("oh ok");
        var open=$modal({
        container: "body",
        templateUrl: "views/signup.html" , 
        controller: "SignupCtrl",
        controllerAs: "vm" , 
        show: false,
    })
    open.$promise.then(function(){
        open.show();
    })
    }
    vm.logout = function (){
        Auth.logout();
    }
    vm.settings = function(){
    var open=$modal({
        container: "body",
        templateUrl: "views/settings.html" , 
        controller: "SettingsCtrl",
        controllerAs: "vm" , 
        show: false,
    })
    open.$promise.then(function(){
        open.show();
    })
    }
    vm.deleteUser = function(){
    var open=$modal({
        container: "body",
        templateUrl: "views/deleteUser.html" , 
        controller: "DeleteUserCtrl",
        controllerAs: "vm" , 
        show: false,
    })
    open.$promise.then(function(){
        open.show();
    })  
    }
    vm.find = function (){
        if(vm.search.length>1){
            $http.get('/api/blogs/' + vm.search + "/search").success(function(dataSearch){
                vm.dataSearch = dataSearch ;
            })
        }
        else{
            vm.dataSearch = [] ;
        }
    }
    vm.chat = function () {
        
    }
}
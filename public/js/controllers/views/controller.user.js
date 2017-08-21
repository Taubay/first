angular.module("decode")
.controller("UserCtrl",UserCtrl);
UserCtrl.$inject = ["$http" , "$state"]; // подключение
function UserCtrl ($http , $state) 
{
    var vm = this;
    console.log("hi mitch");
    $http.get('/api/users/' + $state.params.id).success(function(user){
    vm.user = user ; 
    console.log(vm.user);
    })
    $http.get('/api/blogs/user/' + $state.params.id).success(function(userBlogs){
    vm.userPosts = userBlogs ;     
    console.log(vm.userPosts);
    })
}
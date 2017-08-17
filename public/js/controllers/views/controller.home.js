angular.module("decode")
.controller("HomeCtrl",HomeCtrl);
HomeCtrl.$inject = ["$http"]; // подключение библиотек
function HomeCtrl ($http) 
{
    var vm = this;
    // vm.user = true ;
    $http.get('/api/blogs/home/all').success(function(blogs){
        console.log(blogs);
        vm.posts = blogs ; 
    })
}
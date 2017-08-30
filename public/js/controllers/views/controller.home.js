angular.module("decode")
.controller("HomeCtrl",HomeCtrl);
HomeCtrl.$inject = ["$http"]; // подключение библиотек
function HomeCtrl ($http) 
{
    var vm = this;
    if(localStorage.getItem("currentPage"))
    vm.currentPage = localStorage.getItem("currentPage") ;
    else
    vm.currentPage = 0 ;
    // vm.user = true ;
    /*$http.get('/api/blogs/home/all').success(function(blogs){
        console.log(blogs);
        vm.posts = blogs ; 
    })*/
    
    vm.getPosts = function () {
        localStorage.setItem("currentPage" , vm.currentPage)
        $http.get('/api/blogs/home/' + vm.currentPage + '/pagination').success(function(data){
            vm.total = data.total; 
            vm.pages = new Array (data.pages); 
            vm.posts = data.posts ; 
        })
    }
    vm.getPosts();
    
    vm.prevPage = function () {
        if(vm.currentPage != 0 ){
            vm.currentPage-- ;
            vm.getPosts();
        }
    }
    vm.nextPage = function () {
        if(vm.currentPage !=  vm.pages.length-1){
            vm.currentPage++ ;
            vm.getPosts();
        }
    }
    
    vm.openPage = function(f) {
        vm.currentPage = f ; 
        vm.getPosts();
    }
    
}
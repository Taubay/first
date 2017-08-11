angular.module("decode")
.controller("PostCtrl",PostCtrl);
PostCtrl.$inject = ["$http" , "$state"]; // подключение
function PostCtrl ($http , $state) 
{
    var vm = this;
    console.log($state.params);
    $http.get('/api/blogs/' + $state.params.id).success(function(item){
    vm.item = item ; 
    })
}
angular.module("decode")
.controller("Modalcorrectblog",Modalcorrectblog);
Modalcorrectblog.$inject = ["$http" , "item"]; // подключение
function Modalcorrectblog ($http , item) 
{
    var vm = this;
    vm.blog = item;
    vm.correctimg = function(mynewfile){
        vm.blog.img = "data:image/png;base64," + mynewfile.base64;
    }
        vm.correctPost = function(){
        console.log(vm.blog);
        $http.put('/api/blogs', vm.blog);
    }
}
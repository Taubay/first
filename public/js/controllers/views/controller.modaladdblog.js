angular.module("decode")
.controller("Modaladdblog",Modaladdblog);
Modaladdblog.$inject = ["$http", "items"]; // подключение
function Modaladdblog ($http , items) 
{
    var vm = this;
    vm.fakeimg  = "images/folder.png";
    vm.img = "images/kirpich.jpg";
    vm.addPost = function(){
                $http.post('/api/blogs', 
            {
                title: vm.title,
                lasttitle: vm.lasttitle,
                description: vm.description,
                age: vm.age,
                gender: vm.gender,
                img:vm.img
             }).success(function(blog){
                items.push(blog);//?????
                console.log(blog);
            })
    }
    vm.loadimg = function(myfile){
        console.log(myfile);
        vm.img = "data:image/png;base64," + myfile.base64;
        vm.fakeimg = "data:image/png;base64," + myfile.base64;
    }
}
        

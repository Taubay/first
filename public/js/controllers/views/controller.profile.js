angular.module("decode")
.controller("ProfileCtrl", ProfileCtrl);
ProfileCtrl.$inject = ["$http", "$modal" , "userdata"]; // подключение
function ProfileCtrl ($http , $modal , userdata ) 
{
    var vm = this;
    console.log("in profilectrl" );
    vm.addBlog = function(){
        $http.post('/api/blogs', 
            {
                title: vm.title,
                description: vm.description,
                age: vm.age,
                gender: vm.gender,
                img: vm.img
            }).success(function(blog){
                console.log(blog);
            })
    }
    $http.get('/api/blogs').success(function(blogs){
        console.log("in prctrl is ok");
        vm.blogs = blogs;
        console.log(vm.blogs);
    })

    vm.deleteblog = function(itemdelete)
    {
        console.log(itemdelete);
        $http.delete('/api/blogs/' + itemdelete._id)
        .success(function(){
            var index=vm.blogs.indexOf(itemdelete);
            vm.blogs.splice(index, 1)
        })
    }
    
    vm.open = function (){
    var open=$modal({
        container: "body",
        templateUrl: "views/modaladdblog.html" , 
        controller: "Modaladdblog",
        controllerAs: "vm" , 
        show: false,
        resolve:{
            items:function(){
                return vm.blogs;
            }
        }
    })
    open.$promise.then(function(){
        open.show();
    })
    }
    vm.correctblog = function(itemcorrect){
          console.log(itemcorrect);
          console.log("in ctrlpof all is ok");
        var open=$modal({
            container: "body",
            templateUrl: "views/modalcorrectblog.html" , 
            controller: "Modalcorrectblog",
            controllerAs: "vm" , 
            show: false,
            resolve:{
            item:function(){
                return itemcorrect;
            }
        }
        })
        open.$promise.then(function(){
            open.show();
        })
    }
    // vm.userdata = function (){
    //     $http.get('/api/user').success( )
    // }
}
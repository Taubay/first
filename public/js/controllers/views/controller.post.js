angular.module("decode")
.controller("PostCtrl",PostCtrl);
PostCtrl.$inject = ["$http" , "$state"]; // подключение
function PostCtrl ($http , $state) 
{
    var vm = this;
    //vm.quanifilike = 0 ;
    console.log(vm.quanifilike);
    $http.get('/api/blogs/' + $state.params.id).success(function(item){
    vm.item = item ; 
    })
    $http.get('/api/comments/' + $state.params.id).success(function(comments){
          vm.allcomms = comments ; 
    })
    vm.comment = function(){
        $http.post('/api/comments/' + $state.params.id, {
            description:vm.comm,
            blog:$state.params.id
        }).success(function(datacomm){
            console.log(datacomm);
            vm.allcomms.push(datacomm);
        })
    }
    vm.myLike = function() {
        $http.post('/api/likes/' + $state.params.id).success(function(like){
            
            if(like.dislike) { 
                vm.alllikes-- ; 
            }
            else{
                vm.alllikes++;
            }
                console.log(like);
               // vm.mylike = like ;
              // if(vm.like){
                //vm.alllikes.push(like);
            //    var index2=vm.alllikes.indexOf(like);}
//            vm.blogs.splice(index, 1)
             //   if(!like) {
               // vm.alllikes.splice(index2, 1)}
                //     vm.quanifi = vm.alllikes.length -;
                // }
        }) 
    }
    $http.get('/api/likes/' + $state.params.id).success(function(likes){
        console.log("in Ctrl like");
        vm.alllikes = likes.likes;
        console.log(vm.alllikes);
    })
}
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
            // vm.comment = function() {
    //     $http.post('/api/comment' , {
    //         description:vm.comm,
    //         blog:$state.params.id,
    //     } )
    //     .success(function(dataComm){
    //         vm.onecomment = dataComm ; 
    //     }) 
    // }
    // $http.get('/api/comment/' + $state.params.id).success(function(comms){
    //     vm.allcomments = comms;
    // })
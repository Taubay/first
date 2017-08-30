angular.module("decode")
.controller("PostCtrl",PostCtrl);
PostCtrl.$inject = ["$http" , "$state" , "$modal"]; // подключение
function PostCtrl ($http , $state , $modal ) 
{
    var vm = this;
    //vm.quanifilike = 0 ;
    // console.log(currentUser);
    vm.CommStatus = false ;
    $http.get('/api/blogs/' + $state.params.id).success(function(item){
    vm.blog = item ; 
    console.log(item);
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
    $http.get('/api/likes/' + $state.params.id+'/me').success(function(dislike) {
        if(!dislike.dislike) { 
                vm.vaildLike = "images/heart2.png";
            }
        else {
                vm.vaildLike = "images/heart.png";
        }
    })
    vm.myLike = function() {
        $http.post('/api/likes/' + $state.params.id).success(function(like){
            
            if(like.dislike) { 
                vm.alllikes-- ; 
                vm.vaildLike = "images/heart.png";
            }
            else{
                vm.alllikes++;
                vm.vaildLike = "images/heart2.png";
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
    
    vm.deleteComm = function (item){
        $http.delete('/api/comments/one/' + item._id).success(function(){
            var index=vm.allcomms.indexOf(item);
            vm.allcomms.splice(index, 1)
        })
    }
    // vm.editComm = function (item){
    //     var open=$modal({
    //     container: "body",
    //     templateUrl: "views/editComment.html" , 
    //     controller: "EditCCtrl",
    //     controllerAs: "vm" , 
    //     show: false,
    //     resolve:{
    //         CorComm:function(){
    //             return item;
    //         }
    //     }
    // })
    // open.$promise.then(function(){
    //     open.show();
    // })
    // }
    vm.functionComm = function(commId) {
        $http.post('/api/likes/comms/' + commId).success(function(like){
            
            if(like.dislike) { 
                vm.commLikes-- ; 
                vm.heartComm = "images/heart.png";
            }
            else{
                vm.commLikes++;
                vm.heartComm = "images/heart2.png";
            }
                console.log(like);
        }) 
    }
    // vm.justdoit = function(commId){
    //     $http.get('/api/likes/comms/' + commId).success(function(likes){
    //         console.log("in Ctrl like");
    //         vm.commLikes = likes.likes;
    //         console.log(vm.commLikes);
    //     })
    // }
    
    
    vm.editComm = function(Comment){
        vm.CommStatus = true ; 
        vm.commItem = Comment ;
    }
    
    vm.Editcomment = function(newComment){
        console.log(newComment);
        vm.CommStatus = false ; 
        $http.put("/api/comments/" + $state.params.id , newComment)
    }
    
}


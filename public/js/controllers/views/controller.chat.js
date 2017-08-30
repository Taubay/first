angular.module("decode")
.controller("ChatCtrl",ChatCtrl);
ChatCtrl.$inject = ["$http" , "Socket" , "$rootScope" , "$scope"]; // подключение
function ChatCtrl ($http , Socket , $rootScope , $scope) 
{
    var vm = this ;
    vm.messages = [] ; // http get messages from db
    
    
    Socket.emit("addUser" , {
        room : "room1",
        userName: $rootScope.currentUser.name ,
        userImg:$rootScope.currentUser.img
    }) 
    
    
    Socket.forward("updateChat" , $scope);
    $scope.$on("socket:updateChat" , function(event, author, message, UserImg){
        console.log(author, message, UserImg)
        vm.messages.push({
            message:message,
            author:author,
            ava:UserImg
        })    
    })
    vm.newText = function (){
        if(vm.text&&vm.text.length>0) {
            Socket.emit("newMessage" , {
             message:vm.text ,
            }) 
            vm.text = '';
        }
        
    }
    vm.changeRoom = function (room){
        Socket.emit("changeRoom" , {
            room:room 
        } )
    vm.messages = [] ; 
    }
}
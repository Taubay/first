angular.module("decode")
.controller("EditCCtrl",EditCCtrl);
EditCCtrl.$inject = ["$http" , "CorComm"]; // подключение
function EditCCtrl ($http , CorComm) 
{
    var vm = this ;
    vm.updateComment = function () {
        $http.put('/api/comment/correct/' + CorComm._id , {description:vm.modifiedComm})
    }
}
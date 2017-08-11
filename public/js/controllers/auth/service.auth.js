angular.module("decode")
.factory("Auth",Auth);
Auth.$inject = ["$http", "$rootScope" , "$cookies", "$state"]; // подключение
function Auth ($http , $rootScope , $cookies , $state) 
{
    $rootScope.currentUser = $cookies.getObject("user") ; 
    console.log($rootScope.currentUser);
    return{
        signup: function(user){
            return $http.post("/api/signup" , user ).success(function(data){
                $rootScope.currentUser = data ; 
                console.log(data);
                console.log("okk");
                $state.go('profile');
            })
        },
        
        login: function(user){
            return $http.post("/api/login" , user ).success(function(data){
                $rootScope.currentUser = data ; 
                console.log(data);
                 $state.go('profile');
            })
        },
        
        logout: function(){
            return $http.post("/api/logout" ).success(function(data){
                $rootScope.currentUser = null ; 
                $cookies.remove("user");  
             $state.go('home');
            })
        }
    }
}
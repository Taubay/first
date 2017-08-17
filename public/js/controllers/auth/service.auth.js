angular.module("decode")
.factory("Auth",Auth);
Auth.$inject = ["$http", "$rootScope" , "$cookies", "$state"]; // подключение
function Auth ($http , $rootScope , $cookies , $state) 
{
    $rootScope.currentUser = $cookies.getObject("user") ;
    console.log($rootScope.currentUser);
    return{
        signup: function(user){
            return $http.post("/api/signup" , user).success(function(data){
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
        },
        
        changeDataAcc : function (NewUserData) {
            var fd = new FormData();
            fd.append('image', NewUserData.img);
            fd.append('name', NewUserData.name);
            fd.append('surname', NewUserData.surname);
            fd.append('email', NewUserData.email);
            fd.append('gender', NewUserData.gender);
            fd.append('password', NewUserData.password);
            
                return $http.put('/api/users', fd, {
               transformRequest: angular.identity, //настраиваем наши хедеры для отправки картинки
               headers: {'Content-Type': undefined}
            }).success(function(data){
                    $rootScope.currentUser = data ;
                  $state.go('profile');
                })
            
        },
        
        deleteUser : function (){
            return $http.delete('/api/users').success(function(){
                $rootScope.currentUser = null ;
                $state.go('home');
                $cookies.remove("user");  
            })
        }
        
        
        
    }
}






















































// deleteAcc : function(iduser){
//             return $http.delete("/api/delete").success(function(){
//                 $rootScope.currentUser = null ; 
//                 $cookies.remove("user");  
//                 $state.go('home');
//             })
//         }
            
            
            
            
            
        //     changeuserdata : function(data){
        //     return $http.put("/api/changeuser", data).success(function(res){
        //         $rootScope.currentUser = res ; 
        //         console.log(res);
        //          $state.go('profile');
        //     })
        // },
        

// deleteUser : function(){
        //     return $http.delete('/api/delete').success(function() {
        //         $rootScope.currentUser = null ;
        //         $cookies.remove('user');
        //         $state.go('home');
        //     })
        // },


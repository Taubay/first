angular.module('decode', [
  'ui.router','mgcrea.ngStrap', 'ngResource' , 'naif.base64' , "ngCookies" , "btford.socket-io"
  ])
 .config(routeConfig);
 routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
 function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {
     $locationProvider.html5Mode(true);
     $locationProvider.hashPrefix('!');
     $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('profile', {
   url: '/profile',
   templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
   controllerAs: 'vm'
  })
  .state('post', {
  url: '/post/:id',
  templateUrl: 'views/post.html',
      controller: 'PostCtrl',
  controllerAs: 'vm'
  })
  .state('home', {
  url: '/',
  templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
  controllerAs: 'vm'
  })
  .state('user', {
  url: '/user/:id',
  templateUrl: 'views/user.html',
  controller: 'UserCtrl',
  controllerAs: 'vm'
  })
  .state('chat', {
  url: '/chat',
  templateUrl: 'views/chat.html',
  controller: 'ChatCtrl',
  controllerAs: 'vm'
  })
  console.log("2");
};
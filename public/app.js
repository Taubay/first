angular.module('decode', [
  'ui.router','mgcrea.ngStrap', 'ngResource' , 'naif.base64' , "ngCookies"
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
  console.log("2");
};
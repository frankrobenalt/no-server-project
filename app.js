angular.module('apiApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html',
      controller: 'ctrl2'
    })
    .state('exchange', {
      url: '/exchange-rate',
      templateUrl: './views/exchangeTmpl.html',
      controller: 'ctrl2'
    })
    .state('ppp', {
      url: '/ppp',
      templateUrl: './views/pppTmpl.html'
    })
  });;


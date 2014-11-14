'use strict';

angular
  .module('letusgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])

    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
    }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/shoppingMall/:pageNow', {
        templateUrl: 'views/shoppingMall.html',
        controller: 'ShoppingMallCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .when('/pay', {
        templateUrl: 'views/pay.html',
        controller: 'PayCtrl'
      })
      .when('/productManage', {
        templateUrl: 'views/productManage.html',
        controller: 'ProductManageCtrl'
      })
      .when('/categoryManage', {
        templateUrl: 'views/categoryManage.html',
        controller: 'CategoryManageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

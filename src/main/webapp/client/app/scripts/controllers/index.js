'use strict';

angular.module('letusgoApp')
  .controller('CartSumsCtrl', function ($scope, ItemsService, CartItemsService) {

    CartItemsService.getCartItemCounts(function (counts) {
      if(counts){
        var temp = CartItemsService.get('cartCounts');
        var cartCounts = temp ? temp : counts;
        CartItemsService.set('cartCounts', cartCounts);
        $scope.cartsums = CartItemsService.get('cartCounts');
      }else{
        $scope.cartsums = 0;
      }
    });

    $scope.addCartSum = function (item) {
      $scope.cartsums = ItemsService.addCart(item);
    };


    $scope.$on('to-parent-change', function () {

      CartItemsService.getCartItemCounts(function(data){
        $scope.cartsums = data;
      });
    });

    $scope.$on('to-parent-pay', function () {

      CartItemsService.pay(function () {
        $scope.cartsums = CartItemsService.get('cartSum');
      });
    });

    function highlight(main, shoppingmall, cart, productManage) {
      $scope.mainActive = main;
      $scope.shoppingMallActive = shoppingmall;
      $scope.cartActive = cart;
      $scope.productManageActive = productManage;
    }

    $scope.$on('to-parent-mainActive', function () {
      highlight(true, false, false, false);
    });


    $scope.$on('to-parent-shoppingMallActive', function () {
      highlight(false, true, false, false);
    });


    $scope.$on('to-parent-cartActive', function () {
      highlight(false, false, true, false);
    });


    $scope.$on('to-parent-productManageActive', function () {
      highlight(false, false, false, true);
    });

  });

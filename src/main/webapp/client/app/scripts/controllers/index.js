'use strict';

angular.module('letusgoApp')
    .controller('CartSumsCtrl', function ($scope,ItemsService, CartItemsService) {

      var temp = CartItemsService.get('cartSum');
      var cartSum = temp ? parseInt(temp) : 0;

      CartItemsService.set('cartSum',cartSum);
      $scope.cartsums = CartItemsService.get('cartSum');

      $scope.addCartSum = function(item){
        $scope.cartsums = ItemsService.addCart(item);
      };


       $scope.$on('to-parent-add',function(add, item){

          $scope.cartsums = CartItemsService.add(item);
        });


      $scope.$on('to-parent-reduce',function(reduce,cartItem){

        CartItemsService.getCartItems(function(data) {

          $scope.cartsums = CartItemsService.updateCartSumsWhenReduce(data, cartItem)
        });
      });


    $scope.$on('to-parent-delete',function(event,id){

      CartItemsService.getCartItems(function(data) {
        $scope.cartsums = CartItemsService.updateCartSumsWhenDelete(data, id);
      });
     });

    $scope.$on('to-parent-change',function(event,cartItem){

      CartItemsService.getCartItems(function(data) {
        $scope.cartsums = CartItemsService.updateCartSumsWhenChange(data, cartItem);
      });
    });

    function highlight(main,shoppingmall,cart,productManage) {
      $scope.mainActive = main;
      $scope.shoppingMallActive = shoppingmall;
      $scope.cartActive = cart;
      $scope.productManageActive = productManage;
    }


    $scope.$on('to-parent-pay',function(){

      CartItemsService.pay(function(){
        $scope.cartsums = CartItemsService.get('cartSum');
      });
    });


    $scope.$on('to-parent-mainActive', function () {
      highlight(true,false,false,false);
    });


    $scope.$on('to-parent-shoppingMallActive', function () {
      highlight(false,true,false,false);
    });


    $scope.$on('to-parent-cartActive', function () {
      highlight(false,false,true,false);
    });


    $scope.$on('to-parent-productManageActive', function () {
      highlight(false,false,false,true);
    });

   });

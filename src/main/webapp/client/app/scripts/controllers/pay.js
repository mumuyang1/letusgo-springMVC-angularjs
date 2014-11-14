'use strict';

angular.module('letusgoApp')
    .controller('PayCtrl', function ($scope,CartItemsService) {

    function updateCartData() {
      CartItemsService.getCartItems(function(data){
        $scope.cartItems = data;
        $scope.total = CartItemsService.getTotal($scope.cartItems);
      });
    }

    $scope.$emit('to-parent-cartActive');
    updateCartData();

    $scope.payButton = function(){

      $scope.$emit('to-parent-pay');
      updateCartData();
    };

  });

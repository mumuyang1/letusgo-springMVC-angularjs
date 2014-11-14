'use strict';

angular.module('letusgoApp')
  .controller('CartCtrl', function ($scope, CartItemsService, categoryManageService) {

    $scope.$emit('to-parent-cartActive');
    updateTotalAndCart();

    function updateTotalAndCart() {

      CartItemsService.getCartItems(function (data) {

        _.forEach(data, function (cartItem) {

          categoryManageService.getCategory(cartItem.item.categoryId, function (category) {
            cartItem.item.category = category;
            $scope.cartItems = data;

            $scope.getSubtotal = function (cartItem) {
              return CartItemsService.getSubtotal(cartItem);
            };

            $scope.total = CartItemsService.getTotal($scope.cartItems);
          });
        });
      });
    }


    $scope.deleteButton = function (id) {

      CartItemsService.deleteCartItem(id);
      $scope.$emit('to-parent-change');
      updateTotalAndCart();
    };

    $scope.changeInputCount = function (item) {
      CartItemsService.changeCount(item);
      $scope.$emit('to-parent-change');
      updateTotalAndCart();
    }

  });

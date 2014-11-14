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

      $scope.$emit('to-parent-delete', id);
      CartItemsService.deleteCartItem(id);
      updateTotalAndCart();
    };

    $scope.changeInputCount = function (item) {
      $scope.$emit('to-parent-change', item);
      updateTotalAndCart();
    }

  });

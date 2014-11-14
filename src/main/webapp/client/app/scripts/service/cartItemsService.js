'use strict';

angular.module('letusgoApp')
  .service('CartItemsService', function (localStorageService, $http) {

    this.getCartItems = function (callback) {

      $http.get('http://localhost:8080/api/cartitems')
        .success(function (data) {

          callback(data);
        });
    };

    this.getCartItemCounts = function (callback) {

      this.getCartItems(function (cartItems) {

        callback(_.reduce(_.pluck(cartItems, 'count'), function (count1, count2) {
          return count1 + count2;
        }))
      });
    };

    this.addCartItem = function (item) {
      $http.post('/api/cartitems', {id: null, item: item, count: 1});
    };

    this.deleteCartItem = function (id) {
      $http.delete('/api/cartitems/' + id);
    };

    this.deleteCartItems = function () {

      $http.delete('/api/cartitems/');
    };

    this.changeCount = function (cartItem) {
      $http.put('/api/cartitems/' + cartItem.id, {id: cartItem.id, item: cartItem.item, count: cartItem.count});
    };


    this.getSubtotal = function (cartItem) {
      var subtotal = cartItem.item.price * cartItem.count;
      return subtotal.toFixed(2);
    };


    this.getTotal = function (cartItems) {
      var total = 0;
      _.forEach(cartItems, function (cartItem) {
        total += cartItem.item.price * cartItem.count;
      });
      return total.toFixed(2);
    };


    this.pay = function (callback) {
      this.deleteCartItems();
      localStorageService.set('cartSum', 0);
      callback();
    };


    this.set = function (key, value) {
      localStorageService.set(key, value);
    };


    this.get = function (key) {
      return localStorageService.get(key);
    };

  });

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

//    this.add = function (item) {
//
//      var cartSums = +localStorageService.get('cartSum');
//      cartSums += 1;
//      localStorageService.set('cartSum', cartSums);
//
//      $http.put('/api/cartItems/' + item.id, {'operation': 'add'});
//      return cartSums;
//    };
//
//    this.updateCartSumsWhenReduce = function (cartItems, item) {
//
//      var cartSums = localStorageService.get('cartSum');
//
//      _.forEach(cartItems, function (cartItem) {
//
//        if (cartItem.item.name === item.name) {
//
//          if (cartItem.count > 1) {
//
//            cartSums -= 1;
//            localStorageService.set('cartSum', cartSums);
//          }
//        }
//      });
//      return localStorageService.get('cartSum');
//    };
//
//    this.reduceCartItem = function (item) {
//
//      $http.put('/api/cartItems/' + item.id, {'operation': 'reduce'});
//    };
//
    this.updateCartSumsWhenDelete = function (cartItems, id) {
      var cartSums = localStorageService.get('cartSum');

      _.forEach(cartItems, function (cartItem) {

        if (cartItem.id === id) {
          console.log(cartItem.id + '------');

          cartSums = cartSums - cartItem.count;
          localStorageService.set('cartSum', cartSums);
        }
      });

      return localStorageService.get('cartSum');
    };

    this.deleteCartItem = function (id) {
      $http.delete('/api/cartItems/' + id);
    };

//    this.updateCartItemCount = function(cartItem) {
//      $http.put
//    };


    this.updateCartSumsWhenChange = function (cartItems, item) {

      var cartSums = 0;

      _.forEach(cartItems, function (cartItem) {

        if (cartItem.item.id !== item.item.id) {
          cartSums += cartItem.count;
        }
      });
      localStorageService.set('cartSum', cartSums + parseInt(item.count));
      return localStorageService.get('cartSum');
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
      $http.post('/api/payment')
        .success(function (data, status) {

          if (status === 200) {
            var cartSums = 0;
            localStorageService.set('cartSum', cartSums);
            callback();
          }
        });
    };


    this.set = function (key, value) {
      localStorageService.set(key, value);
    };


    this.get = function (key) {
      return localStorageService.get(key);
    };

  });
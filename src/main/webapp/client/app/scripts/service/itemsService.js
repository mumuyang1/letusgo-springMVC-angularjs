'use strict';

angular.module('letusgoApp').service('ItemsService', function (CartItemsService, $http) {

  this.getItems = function (callback) {

    $http.get('http://localhost:8080/api/items')
      .success(function (data) {
        callback(data);
      });
  };


  this.addCart = function (item) {

    var cartSums = +CartItemsService.get('cartCounts');
    cartSums += 1;
    CartItemsService.set('cartCounts', cartSums);

    this.addToCart(item);
    return cartSums;
  };

  this.addToCart = function (item) {
    CartItemsService.getCartItems(function (cartItems) {
      var data =  _.find(cartItems, function (cartItem) {
        return cartItem.item.id === item.id;
      });


      if (data !== undefined) {
          data.count =  data.count + 1;
        CartItemsService.changeCount(data);
      }else{
        CartItemsService.addCartItem(item);
      }
    });

  };

  this.addProductButton = function (item) {

    this.hasExist(item.name, function (data) {
      if (!data) {
        $http.post('/api/items', {id: null,
          name: item.name,
          unit: item.unit,
          price: item.price,
          categoryId: item.category.id});
      }
    });
  };

  this.hasExist = function (name, callback) {
    this.getItems(function (categories) {
      callback(_.any(categories, { name: name }));
    });
  };

  this.deleteProductButton = function (id) {
    $http.delete('/api/items/' + id);
  };


  this.changeProduct = function (id, newItem) {

    $http.put('/api/items/' + id,
      {
        id: id,
        name: newItem.name,
        unit: newItem.unit,
        price: newItem.price,
        categoryId: newItem.category.id
      });
  };

});

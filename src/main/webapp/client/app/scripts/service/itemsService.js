'use strict';

angular.module('letusgoApp').service('ItemsService', function (CartItemsService, $http) {

  this.getItems = function (callback) {

    $http.get('http://localhost:8080/api/items')
      .success(function (data) {
        callback(data);
      });
  };


  this.addCart = function (item) {

    var cartSum = +CartItemsService.get('cartSum');
    cartSum += 1;
    CartItemsService.set('cartSum', cartSum);

    this.addToCart(item);
    return cartSum;
  };

  this.addToCart = function (item) {
    CartItemsService.getCartItems(function (cartItems) {
//      if (_.any(cartItems, {item : item})) {
//
//      }
      CartItemsService.addCartItem(item);
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

'use strict';

angular.module('letusgoApp').service('ItemsService', function (CartItemsService, $http) {

  function getAllItems(callback) {
    $http.get('http://localhost:8080/api/items')
      .success(function (data) {
        callback(data);
      });
  }

  this.getItems = function (callback) {

    getAllItems(function (data) {
      callback(data);
    });
  };


  this.addCart = function (item) {

    var cartSum = +CartItemsService.get('cartSum');
    cartSum += 1;
    CartItemsService.set('cartSum', cartSum);

    $http.post('/api/cartItems', {'item': item});
    return cartSum;
  };

  this.addProductButton = function (name, price, unit, categoryId, callback) {

    getAllItems(function () {
      $http.post('/api/items', {
        item: {  name: name,
          price: price,
          unit: unit,
          categoryId: categoryId}
      });
      callback();
    });
  };


  this.deleteProductButton = function (id) {
    $http.delete('/api/items/' + id);
  };


  this.changeProduct = function (id, newName, newPrice, newUnit, newCategoryId) {

    $http.put('/api/items/' + id, {
      item: { name: newName,
        price: newPrice,
        unit: newUnit,
        categoryId: newCategoryId}
    });
  };

});

'use strict';

angular.module('letusgoApp').service('ItemsService', function (CartItemsService, $http) {

  function getAllItems(callback) {
    $http.get('http://localhost:8080/api/items')
      .success(function (data) {
        callback(data);
      });
  }

  this.getItems = function (callback) {

//    getAllItems(function (data) {
//      callback(data);
//    });
    $http.get('http://localhost:8080/api/items')
      .success(function (data) {
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


  this.changeProduct = function (id, newName, newPrice, newUnit, newCategoryId) {

    $http.put('/api/items/' + id, {
      item: { name: newName,
        price: newPrice,
        unit: newUnit,
        categoryId: newCategoryId}
    });
  };

});

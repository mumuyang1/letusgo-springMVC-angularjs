'use strict';

angular.module('letusgoApp')
  .service('categoryManageService', function (ItemsService, $http) {

    this.getCategories = function (callback) {
      $http.get('http://localhost:8080/api/categories')
        .success(function (data) {
          callback(data);
        });
    };


    this.getCategory = function (id, callback) {

      this.getCategories(function (categories) {

        var data = _.find(categories, function (category) {
          return category.id === id;
        });
        callback(data);
      });
    };


    this.addCategory = function (newCategoryName,callback) {

      this.getCategories(function (categories) {

        if (!(_.any(categories, { name: newCategoryName }))) {
          $http.post('/api/categories', {id: null, name: newCategoryName})
          .success(function(){callback()})
        }
      });

    };

    this.hasProductsInTheCategory = function (categoryId, callback) {

      $http.get('/api/items').success(function (products) {

        callback(_.any(products, { categoryId: categoryId}));
      });
    };


    this.deleteCategoryButton = function (id) {
      $http.delete('/api/categories/' + id);
    };


    this.changeName = function (id, newName) {
      $http.put('/api/categories/' + id, {id: null, name: newName});
    };
  });

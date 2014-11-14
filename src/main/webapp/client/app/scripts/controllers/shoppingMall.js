'use strict';

angular.module('letusgoApp')
    .controller('ShoppingMallCtrl', function ($scope, ItemsService, categoryManageService) {

        $scope.$emit('to-parent-shoppingMallActive');

        ItemsService.getItems(function(data){

          _.forEach(data,function(item){

             categoryManageService.getCategory(item.categoryId ,function(category){
               item.category = category;
               $scope.items = data;
            });
          });
        });
    });

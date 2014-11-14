'use strict';
angular.module('letusgoApp')
  .controller('ProductManageCtrl', function ($http,$scope,CartItemsService,categoryManageService,ItemsService){

      function refresh(){
        ItemsService.getItems(function(data){

          _.forEach(data,function(item){

            categoryManageService.getCategory(item.categoryId ,function(category){
              item.category = category;
              $scope.allProducts = data;
            });
          });
        });
      }

      refresh();

      $scope.$emit('to-parent-productManageActive');

      function showCharge(layout,add,change){
        $scope.controlLayout = layout;
        $scope.clickAddProduct = add;
        $scope.clickChangeProduct = change;
      }

      showCharge(true,false,false);

      $scope.addProduct = function(){

        showCharge(false,true,false);
        categoryManageService.getCategories(function(data){
          $scope.categories  =  data;
        });
      };

    $scope.finishAddProduct = function(item){
      showCharge(true,false,false);
        ItemsService.addProductButton(item, function(){
          refresh();
      });
    };

      $scope.cancelAddProduct = function(){
        $scope.clickAddProduct = false;
        $scope.controlLayout = true;
        showCharge(true,false,false);
      };


      $scope.changeProduct = function(item){

        categoryManageService.getCategories(function(data){

          $scope.categories = data;
        });

        categoryManageService.getCategoryById(item.categoryId,function(data){

            $scope.itemToChange = {
              name : item.name,
              price : item.price,
              unit : item.unit,
              categoryId : item.categoryId,
              category : data
            };
            CartItemsService.set('productToChange',item.id);
        });
        showCharge(false,false,true);
      };


      $scope.finishChangeProduct = function(newName,newPrice,newUnit,newCategory){

        showCharge(true,false,false);

        $scope.productToChange = CartItemsService.get('productToChange');

        categoryManageService.getCategoryByName(newCategory,function(data){

          var  newCategoryId = data.id;
          ItemsService.changeProduct($scope.productToChange,newName,newPrice,newUnit,newCategoryId);
          refresh();
        });
      };


      $scope.cancelChangeProduct = function(){
        showCharge(true,false,false);
      };

      $scope.deleteProduct = function(id){

        ItemsService.deleteProductButton(id);
        refresh();
      };
  });

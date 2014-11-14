'use strict';

angular.module('letusgoApp')
.controller('CategoryManageCtrl', function ($scope,categoryManageService,CartItemsService) {

    $scope.$emit('to-parent-productManageActive');


    function refresh(){
        categoryManageService.getCategories(function(data){
         $scope.categories = data;
        });
    }

    refresh();

    function showCharge(add,change,clickDelete){
      $scope.clickAddCategory = add;
      $scope.clickChangeCategory = change;
      $scope.clickDelete = clickDelete;
    }

    showCharge(false,false,false);

    $scope.addCategory = function(){
      showCharge(true,false,false);
    };


    $scope.finishAddCategory = function(newCategoryName){

      if(newCategoryName){
        categoryManageService.addCategory(newCategoryName,function(){
          refresh();
        });
      }
      showCharge(false,false,false);
    };


    $scope.cancelAddCategory = function(){

      showCharge(false,false,false);
    };


    $scope.deleteCategory = function(category){


      categoryManageService.hasProductsInTheCategory(category.id,function(data){
        if(data){
          showCharge(false,false,true);

        }else{

          categoryManageService.deleteCategoryButton(category.id);
          refresh();
        }
      });
    };

    $scope.cancelDelete = function(){
      showCharge(false,false,false);
    };

    $scope.changeCategory = function(category){
      $scope.newName = category.name;
      showCharge(false,true,false);
      CartItemsService.set('categoryToChange',category.id);
    };


    $scope.finishChangeCategory = function(newName){
      showCharge(false,false,false);
      $scope.categoryId = CartItemsService.get('categoryToChange');
      categoryManageService.changeName($scope.categoryId,newName);
      refresh();
    };


    $scope.cancelChangeCategory = function(){
      showCharge(false,false,false);
    };

});

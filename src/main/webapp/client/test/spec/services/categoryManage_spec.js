'use strict';

describe('Service: categoryManageService', function () {

    var categoryService,categories,allProducts,category,newCategoryName,$httpBackend;

     beforeEach(function(){

        module('letusgoApp');

        inject(function ($injector) {

            categoryService = $injector.get('categoryManageService');
            $httpBackend = $injector.get('$httpBackend');
         });

        categories = [
            {id: 1, name: '水果'}
          ];
        category = {id: 1, name: '水果'};

        allProducts = [
                  {barcode:'ITEM000001',categoryId:1,name:'苹果',price:'3.00',unit:'斤'},
                  {barcode:'ITEM000002',categoryId:1,name:'香蕉',price:'3.50',unit:'斤'},
                  {barcode:'ITEM000003',categoryId:2,name:'可口可乐',price:'3.00',unit:'瓶'},
                ];
        newCategoryName = '食品';
     });


     it('should get categoryData is right', function(){
        $httpBackend.expectGET('/api/categories').respond(200,categories);
        categoryService.getCategories(function(data){
          expect(data.length).toBe(1);
        });
        $httpBackend.flush();
     });


     it('can get category by id', function(){
         spyOn(categoryService,'getCategories').and.callFake(function(callback){
           callback(categories);
         });
        categoryService.getCategoryById(category.id,function(data){
           expect(categoryService.getCategories).toHaveBeenCalled();
           expect(data.name).toBe('水果');
        });
     });

    it('can get category by name', function(){
      spyOn(categoryService,'getCategories').and.callFake(function(callback){
        callback(categories);
      });
      categoryService.getCategoryByName(category.name,function(data){
        expect(categoryService.getCategories).toHaveBeenCalled();
        expect(data.name).toBe('水果');
      });
    });


    it('can add a category', function(){
      spyOn(categoryService,'getCategories').and.callFake(function(callback){
        callback(categories);
      });

      $httpBackend.expectPOST('/api/categories',{ name : newCategoryName }).respond(200);

      categoryService.addCategory(newCategoryName ,function(){
        expect(categoryService.getCategories).toHaveBeenCalled();
        $httpBackend.flush();
      });
    });


   it('can judge if category contains products', function(){
      $httpBackend.expectGET('/api/items').respond(200,allProducts);
      categoryService.hasProductsInTheCategory(category.id,function(data){
        expect(data).toBe(true);
      });
     $httpBackend.flush();
   });


   it('should deleteCategoryButton can do', function(){
      $httpBackend.expectDELETE('/api/categories/1').respond(200);
      categoryService.deleteCategoryButton(category.id);
      $httpBackend.flush();
   });


   it('should change category name can do', function(){
     $httpBackend.expectPUT('/api/categories/1',{categoryName:newCategoryName}).respond(200);
     categoryService.changeName(category.id,newCategoryName);
     $httpBackend.flush();
   });

});

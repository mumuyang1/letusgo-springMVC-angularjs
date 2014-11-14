'use strict';

describe('Controller: ProductManageCtrl', function () {

  beforeEach(module('letusgoApp'));

  var $controller,categoryService,scope,createController,itemsService,
    cartService,categories,newName,allProducts,product,id;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    cartService = $injector.get('CartItemsService');
    categoryService = $injector.get('categoryManageService');
    itemsService = $injector.get('ItemsService');

    createController = function(){

      return $controller('ProductManageCtrl', {
          $scope: scope,
          CartItemsService: cartService,
          categoryManageService: categoryService,
          ItemsService : itemsService
      });
    };

      categories = [
          {id: 1, name: '水果'},
          {id: 2, name: '生活用品'}
        ];


      newName = '苹果';

     allProducts = [
                {id:1,barcode:'ITEM000001',category:'水果',name:'香蕉',price:'3.50',unit:'斤'},
                {id:2,barcode:'ITEM000002',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
                {id:3,barcode:'ITEM000003',category:'饰品',name:'钻石项链',price:'160000.00',unit:'个'}
              ];
      product = {barcode:'ITEM000001',category:'水果',name:'香蕉',price:'3.50',unit:'斤'};

      id = 1;

      spyOn(cartService,'set');
      spyOn(itemsService,'getItems').and.callFake(function(callback){
        callback(allProducts);
      });
      spyOn(categoryService,'getCategoryById').and.callFake(function(id,callback){
        callback(categories[0]);
      });
      spyOn(categoryService,'getCategoryByName').and.callFake(function(id,callback){
        callback(categories[0]);
      });
      spyOn(categoryService,'getCategories').and.callFake(function(callback){
        callback(categories);
      });

  }));


  it('should highlight ok',function(){
      spyOn(scope,'$emit');
      createController();
  });


  it('should show change manage view ok',function(){
      createController();

      expect(scope.controlLayout).toBe(true);
      expect(scope.clickAddProduct).toBe(false);
      expect(scope.clickChangeProduct).toBe(false);
      expect(scope.clickChangeProduct).toBe(false);
      expect(itemsService.getItems).toHaveBeenCalled();
      expect(categoryService.getCategoryById).toHaveBeenCalled();
  });


  it('should add product view can show',function(){

      createController();
      scope.addProduct();

      expect(scope.controlLayout).toBe(false);
      expect(scope.clickAddProduct).toBe(true);
      expect(categoryService.getCategories).toHaveBeenCalled();
  });


  it('should finish add product can do',function(){
      createController();
      scope.finishAddProduct();

      expect(scope.clickAddProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
      expect(itemsService.getItems).toHaveBeenCalled();
      expect(categoryService.getCategoryById).toHaveBeenCalled();
  });


  it('should add product can cancel',function(){
      createController();

      scope.cancelAddProduct();
      expect(scope.clickAddProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
  });


  it('should delete product can do',function(){
      spyOn(itemsService,'deleteProductButton');

      createController();
      scope.deleteProduct();

      expect(itemsService.deleteProductButton.calls.count()).toBe(1);
  });

  it('should change product view can show',function(){
      createController();
      scope.changeProduct(product);

      expect(scope.clickChangeProduct).toBe(true);
      expect(scope.controlLayout).toBe(false);
      expect(categoryService.getCategories).toHaveBeenCalled();
      expect(categoryService.getCategoryById).toHaveBeenCalled();
      expect(cartService.set).toHaveBeenCalled();
  });

  it('should finish change category can do',function(){
      spyOn(cartService,'get');
      spyOn(itemsService,'changeProduct');

      createController();
      scope.finishChangeProduct();

      expect(scope.clickChangeProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
      expect(cartService.get.calls.count()).toBe(1);
      expect(categoryService.getCategoryByName).toHaveBeenCalled();
      expect(itemsService.changeProduct).toHaveBeenCalled();
      expect(itemsService.getItems).toHaveBeenCalled();
      expect(categoryService.getCategoryById).toHaveBeenCalled();
  });

  it('should change product can cancel',function(){
      createController();
      scope.cancelChangeProduct();
      expect(scope.clickAddProduct).toBe(false);
      expect(scope.controlLayout).toBe(true);
  });

});

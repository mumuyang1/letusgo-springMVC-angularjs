'use strict';

describe('Controller: ShoppingMallCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,$routeParams,itemsService,scope,createController,items,CartItemService,categoryService,categories,id;


  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    $routeParams = $injector.get('$routeParams');
    itemsService = $injector.get('ItemsService');
    CartItemService = $injector.get('CartItemsService');
    categoryService = $injector.get('categoryManageService');

    createController = function(){

      return $controller('ShoppingMallCtrl', {
          $scope: scope,
          ItemsService: itemsService,
          $routeParams : $routeParams
      });
    };

    items = [

            {id:7,barcode:'ITEM000007',categoryId:1,name:'水杯',price:'16.00',unit:'个'},
            {id:3,barcode:'ITEM000003',categoryId:2,name:'菠萝',price:'4.00',unit:'个'}
      ];
    categories = [
      {id: 1, name: '水果'},
      {id: 2, name: '生活用品'}
    ];

    id = 1;
    }));

    it('should hightlight is ok',function(){

        spyOn(scope,'$emit');
        createController();
        expect(scope.$emit).toHaveBeenCalledWith('to-parent-shoppingMallActive');
    });

    it('should shopping list can show',function(){
      spyOn(itemsService,'getItems').and.callFake(function(callback){
        callback(items);
      });
      spyOn(categoryService,'getCategoryById').and.callFake(function(id,callback){
        callback(categories[0]);
      });

      createController();
      expect(itemsService.getItems).toHaveBeenCalled();
      expect(categoryService.getCategoryById).toHaveBeenCalled();
    });


//    it('should page divider ok',function(){
//
//      spyOn(itemsService,'loadAllProducts');
//      spyOn(itemsService,'getPageTotal').and.returnValue([1,2,3,4,5]);
//      $routeParams.pageNow = 3;
//      createController();
//
//      scope.pageNow = parseInt($routeParams.pageNow);
//
//      expect(scope.pageNow).toBe(3);
//      expect(scope.previous).toBe(2);
//      expect(scope.next).toBe(4);
//      expect(itemsService.loadAllProducts).toHaveBeenCalled();
//      expect(itemsService.getPageTotal).toHaveBeenCalled();
//    });
//
//    it('should page divider ok when page is 1',function(){
//
//      spyOn(itemsService,'loadAllProducts');
//      spyOn(itemsService,'getPageTotal').and.returnValue([1,2,3,4,5]);
//      $routeParams.pageNow = 1;
//      createController();
//
//      scope.pageNow = parseInt($routeParams.pageNow);
//
//      expect(scope.pageNow).toBe(1);
//      expect(scope.previous).toBe(1);
//      expect(scope.next).toBe(2);
//    });
//
//    it('should page divider ok when the current page is last page',function(){
//
//      spyOn(itemsService,'loadAllProducts');
//      spyOn(itemsService,'getPageTotal').and.returnValue([1,2,3,4,5]);
//      $routeParams.pageNow = 5;
//      createController();
//
//      scope.pageNow = parseInt($routeParams.pageNow);
//
//      expect(scope.pageNow).toBe(5);
//      expect(scope.previous).toBe(4);
//      expect(scope.next).toBe(5);
//    });

  });

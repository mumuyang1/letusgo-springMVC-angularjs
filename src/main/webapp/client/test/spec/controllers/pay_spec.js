'use strict';

describe('Controller: PayCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,cartItemService,scope,createController,cartProducts,item;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartItemService = $injector.get('CartItemsService');

    createController = function(){

      return $controller('PayCtrl', {
          $scope: scope,
          CartItemService: cartItemService
      });
    };

    cartProducts = [
         {
           item : {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
           count : 1
         }
      ];

      item = {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'};

    spyOn(cartItemService,'getTotal');
    spyOn(cartItemService,'getCartItems').and.callFake(function(callback){
      callback(cartProducts);
    });
  }));

  it('should show is ok',function(){

      spyOn(scope,'$emit');
      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-cartActive');
      expect(cartItemService.getCartItems).toHaveBeenCalled();
      expect(cartItemService.getTotal).toHaveBeenCalled();
  });

  it('should payButton can do',function(){

      createController();
      spyOn(scope,'$emit');
      scope.payButton(item);
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-pay');
      expect(cartItemService.getCartItems).toHaveBeenCalled();
      expect(cartItemService.getTotal).toHaveBeenCalled();
  });

});

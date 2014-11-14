'use strict';

describe('Controller: CartCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,cartService,scope,createController,cartProducts,item;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    cartService = $injector.get('CartItemsService');

    createController = function(){

      return $controller('CartCtrl', {
          $scope: scope,
          CartItemsService: cartService
      });
    };

    cartProducts = [
         {
           item : {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
           count : 1
         }
      ];

      item = {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'};

      spyOn(scope,'$emit');
      spyOn(cartService,'getSubtotal').and.returnValue(16);
      spyOn(cartService,'getTotal');
      spyOn(cartService,'getCartItems').and.callFake(function(callback){
        callback(cartProducts);
      });
  }));

  it('should highlight ok',function(){

      createController();
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-cartActive');
  });


  it('can get subtotal',function(){

    createController();
    var result = scope.getSubtotal();
    expect(result).toBe(16);
  });

  it('should updateTotalAndCart function ok',function(){

      createController();
      expect(cartService.getCartItems).toHaveBeenCalled();
      expect(cartService.getTotal).toHaveBeenCalled();
  });


  it('should addButton can do',function(){

      createController();
      scope.addButton(item);
      expect(scope.$emit).toHaveBeenCalledWith('to-parent-add',item);
      expect(cartService.getCartItems).toHaveBeenCalled();
      expect(cartService.getTotal).toHaveBeenCalled();
  });

  it('should reduceButton can do',function(){
      spyOn(cartService,'reduceCartItem');

      createController();
      scope.reduceButton(item);

      expect(scope.$emit).toHaveBeenCalledWith('to-parent-reduce',item);
      expect(cartService.reduceCartItem).toHaveBeenCalled();
      expect(cartService.getCartItems).toHaveBeenCalled();
      expect(cartService.getTotal).toHaveBeenCalled();
  });

  it('should deleteButton can do',function(){
      spyOn(cartService,'deleteCartItem');

      createController();
      scope.deleteButton(item);

      expect(scope.$emit).toHaveBeenCalledWith('to-parent-delete',item);
      expect(cartService.deleteCartItem).toHaveBeenCalled();
      expect(cartService.getCartItems).toHaveBeenCalled();
      expect(cartService.getTotal).toHaveBeenCalled();
  });

});

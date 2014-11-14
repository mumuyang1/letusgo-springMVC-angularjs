'use strict';

describe('Service: cartItemService', function () {

    var cartService,localStorageService,cartItem,cartItem2,item,item1,cartProducts,$httpBackend;

     beforeEach(function(){

        module('letusgoApp');

        inject(function ($injector) {
            localStorageService = $injector.get('localStorageService');
            cartService = $injector.get('CartItemsService');
            $httpBackend = $injector.get('$httpBackend');
         });

        cartProducts = [

             {
               item : {id:3,barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},
               count : 3
             },
             {
               item : {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'},
               count : 1
             }
          ];

        cartItem2 = {id:3,barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'};
        cartItem = {item:{id:3,barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'},count:3};
        item = {id:5,barcode:'ITEM000003',category:'水果',name:'菠萝',price:'4.00',unit:'个'};
        item1 = {id:7,barcode:'ITEM000007',category:'生活用品',name:'水杯',price:'16.00',unit:'个'};
        spyOn(localStorageService,'get').and.returnValue(4);
        spyOn(localStorageService,'set');

     });


     it('can get cartItems', function(){
       $httpBackend.expectGET('/api/cartItems').respond(200,cartProducts);

       var callback = jasmine.createSpy('callback');
       callback({
         cartProducts: cartProducts
       });
       cartService.getCartItems(callback, function(){
         $httpBackend.flush();
       });
       expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
         cartProducts: cartProducts
       }));
   });

   it('should add can do',function(){
       $httpBackend.expectPUT('/api/cartItems/3',{'operation' : 'add'}).respond(200);
       var result = cartService.add(cartItem2);
       expect(result).toBe(5);
       expect(localStorageService.set.calls.count()).toBe(1);
       expect(localStorageService.get.calls.count()).toBe(1);
       $httpBackend.flush();
   });

  it('cartSums can update when reduce cartItems number',function(){

      cartService.updateCartSumsWhenReduce(cartProducts,cartItem2);
      expect(localStorageService.set.calls.count()).toBe(1);
      expect(localStorageService.get.calls.count()).toBe(2);
  });

  it('cartSums do not reduce when the count is 1',function(){

   cartService.updateCartSumsWhenReduce(cartProducts,item1);

    expect(localStorageService.set.calls.count()).toBe(0);
    expect(localStorageService.get.calls.count()).toBe(2);
  });

  it('should reduce cartItems can do',function(){
    $httpBackend.expectPUT('/api/cartItems/3',{'operation' : 'reduce'}).respond(200);
    cartService.reduceCartItem(cartItem2);
    $httpBackend.flush();
  });

  it('cartSums can update when delete cartItems',function(){

    cartService.updateCartSumsWhenDelete(cartProducts,cartItem2);

    expect(localStorageService.set.calls.count()).toBe(1);
    expect(localStorageService.get.calls.count()).toBe(2);
  });

  it('cartSums do not update when delete is wrong',function(){

    cartService.updateCartSumsWhenDelete(cartProducts,item);

    expect(localStorageService.set.calls.count()).toBe(0);
    expect(localStorageService.get.calls.count()).toBe(2);
  });


  it('should delete cartItems can do',function(){
    $httpBackend.expectPUT('/api/cartItems/3',{'operation' : 'delete'}).respond(200);
    cartService.deleteCartItem(cartItem2);
    $httpBackend.flush();
  });

  it('should getSubtotal function ok',function(){

    var result = cartService.getSubtotal(cartItem);
    expect(result).toBe(12.00.toFixed(2));
  });

    it('should getTotal can do',function(){

      var result = cartService.getTotal(cartProducts);
      expect(result).toBe(28.00.toFixed(2));
    });

    it('should pay can do when request is successful',function(){
      $httpBackend.expectPOST('/api/payment').respond(200);
      cartService.pay(function(){
        expect(localStorageService.set).toHaveBeenCalled();
      });
      $httpBackend.flush();
    });

    it('should pay can do when request fail',function(){
      $httpBackend.expectPOST('/api/payment').respond(500);
      cartService.pay(function(){
        expect(localStorageService.set.calls.count()).toBe(0);
      });
      $httpBackend.flush();
    });

    it('should set can do',function(){
      cartService.set('cartSum',5);
      expect(localStorageService.set.calls.count()).toBe(1);
    });

    it('should get can do',function(){
      var result = cartService.get('cartSum');
      expect(result).toBe(4);
    });

});

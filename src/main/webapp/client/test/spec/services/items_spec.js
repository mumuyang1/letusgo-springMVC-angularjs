'use strict';

describe('Service: itemsService', function () {

  var cartService, itemsService, item, allProducts, $httpBackend;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      cartService = $injector.get('CartItemsService');
      itemsService = $injector.get('ItemsService');
      $httpBackend = $injector.get('$httpBackend');
    });

    item = {id: 3, barcode: 'ITEM000003', category: '水果', name: '菠萝', price: '4.00', unit: '个'};

    allProducts = [
      {id: 1, barcode: 'ITEM000001', categoryId: 1, name: '苹果', price: '3.00', unit: '斤'},
      {id: 2, barcode: 'ITEM000002', categoryId: 1, name: '香蕉', price: '3.50', unit: '斤'},
      {id: 3, barcode: 'ITEM000003', categoryId: 1, name: '菠萝', price: '4.00', unit: '个'},
      {id: 4, barcode: 'ITEM000004', categoryId: 2, name: '雪碧', price: '3.00', unit: '瓶'},
      {id: 5, barcode: 'ITEM000005', categoryId: 2, name: '可口可乐', price: '3.00', unit: '瓶'}
    ];

    spyOn(cartService, 'set');
  });

  it('should items is right when store is not null', function () {
    $httpBackend.expectGET('/api/items').respond(200, allProducts);
    itemsService.getItems(function (data) {
      expect(data.length).toBe(5);
    });
    $httpBackend.flush();
  });

  it('should cartSum in addCart is right', function () {
    $httpBackend.expectPOST('/api/cartItems', {'item': item}).respond(200, null);
    spyOn(cartService, 'get').and.returnValue(3);
    var result = itemsService.addCart(item);
    expect(result).toBe(4);
    expect(cartService.get).toHaveBeenCalled();
    expect(cartService.set).toHaveBeenCalled();
    $httpBackend.flush();
  });

  describe('productManage', function () {

    var allProducts, toChange, newName, newPrice, newUnit, newCategoryId;

    beforeEach(function () {

      allProducts = [
        {id: 1, barcode: 'ITEM000001', category: '水果', name: '苹果', price: '3.00', unit: '斤'},
        {id: 2, barcode: 'ITEM000002', category: '水果', name: '香蕉', price: '3.50', unit: '斤'},
        {id: 3, barcode: 'ITEM000003', category: '饮料', name: '可口可乐', price: '3.00', unit: '瓶'}
      ];
      toChange = 2;

      newName = '果粒奶优';
      newPrice = '6.00';
      newUnit = '瓶';
      newCategoryId = 2;

    });

    it('can add a product', function () {

      $httpBackend.expectGET('/api/items').respond(200, allProducts);
      $httpBackend.expectPOST('/api/items', {
        item: { name: newName,
          price: newPrice,
          unit: newUnit,
          categoryId: newCategoryId}
      }).respond(200);

      itemsService.addProductButton(newName, newPrice, newUnit, newCategoryId, function () {
      });
      $httpBackend.flush();
    });

    it('should delete button can do', function () {
      $httpBackend.expectDELETE('/api/items/3').respond(200);
      itemsService.deleteProductButton(item.id);
      $httpBackend.flush();
    });

    it('should change product can do', function () {

      $httpBackend.expectPUT('/api/items/2', {
        item: { name: newName,
          price: newPrice,
          unit: newUnit,
          categoryId: newCategoryId}
      }).respond(200);
      itemsService.changeProduct(toChange, newName, newPrice, newUnit, newCategoryId);
      $httpBackend.flush();
    });
  });

});

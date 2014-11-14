'use strict';

describe('Controller: MainCtrl', function () {


  beforeEach(module('letusgoApp'));

  var $controller,scope,createController;

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');

    createController = function(){

      return $controller('MainCtrl', {
          $scope: scope,
      });
    };

  }));

    it('should active is ok',function(){

        spyOn(scope,'$emit');
        createController();
        expect(scope.$emit).toHaveBeenCalledWith('to-parent-mainActive');
    });

  });

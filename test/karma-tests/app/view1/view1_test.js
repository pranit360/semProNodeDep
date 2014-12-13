'use strict';

describe('myAppRename.teacher', function() {



  //beforeEach(module({
  //  WikiFactory: {findTitle: function(){return }}
  //
  //}))


  ddescribe('AdminCtrl controller', function () {

    beforeEach(module('myAppRename.teacher', 'myAppRename.factories'));

    // 'myAppRename.teacher';
    var controller;
    var scope;
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('AdminCtrl', {
            $scope: scope

          }
      );
//controller = undefined;
    }));
    it('should have defined controller', function () {
      expect(controller).toBeDefined();

    });

  });




  ddescribe('Admin1Ctrl controller', function () {
    // 'myAppRename.teacher';

    beforeEach(module('myAppRename.teacher', 'myAppRename.factories'));
    var controller;
    var scope;
    beforeEach(inject(function ($rootScope, $controller, TeachersFactory) {
      scope = $rootScope.$new();
      controller = $controller('AdminCtrl', {
            $scope: scope

          }
      );
//controller = undefined;
    }));
    it('should have defined controller', function () {
      expect(controller).toBeDefined();

    });

  });




  ddescribe('ClassFactory', function () {
    var mockBackend;
    var classFactory
    var classForTest = {
      name: "ABC-cos",
      description: "Bsc",
      startTime: "Aug17",
      endTime: "Jan20",
      "_id":"1234"
    };

    beforeEach(module('myAppRename.teacher', 'myAppRename.factories'));

    //Mocks for the test
    var controller;
    var scope;
    var classFactory;
    var lassFactory;
    beforeEach(inject(function($rootScope, $controller, _ClassFactory_) {
          scope = $rootScope.$new();
          controller = $controller('Admin4Ctrl', {
                $scope: scope,
                classFactory:  _ClassFactory_
              });
        })
    );

    beforeEach(inject(function ($httpBackend, ClassFactory) {
          //typeof  SKIP_AUTHENTICATION == false;
          mockBackend = $httpBackend;
          mockBackend.expectGET('/adminApi/allClasses').respond(classForTest);

          classFactory  =ClassFactory;
        })
    );

    it('Should Fetch a Class, for controller', function () {
      classFactory.getClasses().success(function (aCLass) {
        expect(JSON.stringify(aCLass)).toBe(JSON.stringify(classForTest));

      })
      mockBackend.flush();
    });
  });



ddescribe('Admin4Ctrl', function () {

  var mockBackend;
  var classFactory
  var scope;
  var classForTest = {
    "name": "ABC-cos",
    "description": "Bsc",
    "startTime": "Aug17",
    "endTime": "Jan20",
    "_id":"1234"
  };

  beforeEach(module('myAppRename.teacher', 'myAppRename.factories'));



  //Mocks for the test
  beforeEach(inject(function ($httpBackend, $rootScope, $controller,ClassFactory) {
        mockBackend = $httpBackend;
        mockBackend.expectGET('/adminApi/allClasses').respond(classForTest);
        scope = $rootScope.$new();
        var factory = ClassFactory;
        $controller("Admin4Ctrl",{$scope:scope, ClassFactory : factory});
      })
  );

  it('Should Fetch a Class, for controller', function () {
    expect(scope.classes).toBeUndefined();
    mockBackend.flush();
    expect(scope.classes).toBeDefined();
    expect(scope.classes.name).toBe("ABC-cos");
  });
});

});


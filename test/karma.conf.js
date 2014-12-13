module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'public/vendor/angular/angular.js',
      'public/vendor/angular-route/angular-route.js',
      'public/vendor/angular-mocks/angular-mocks.js',
      'public/app/*.js',
      'public/app/components/**/*.js',
      'public/app/components/*.js',
      'public/app/view*/**/*.js',
      'public/app/teacherView/teacherMain.js',
      'test/karma-tests/app/view*/**/*.js',
      'test/karma-tests/app/view1/view1_test.js',
      'test/karma-tests/app/view2/viewCtrlTest.js',
      'test/karma-tests/app/components/*.js',
    ],

    autoWatch : true,

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
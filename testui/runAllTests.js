var app = angular.module('paramsingh', []);

app.controller('RunTestCaseController', function($scope, $http, $window) {
console.log('Loaded');

  $http({
        method: 'GET',
        url: 'http://localhost:1111/data/all'
    }).then(function successCallback(response) {
        console.log('Success Callback');
        // this callback will be called asynchronously when the response is available
        testData = JSON.stringify(response);
        console.log(testData);
        var RunTests = require('../common/RunTests.js');
        //RunTests.run(testData);

        //console.log('Running all Test Cases');

        $http({
              method: 'POST',
              url: '/runAllTests'
          }).then(function successCallback(response) {


            });


    });
  });

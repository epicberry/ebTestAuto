var app = angular.module('paramsingh', []);
//var Horseman = require('node-horseman');

app.controller('TestCaseController', function($scope, $http, $window) {

    $scope.search = "";
    $scope.order = "testCaseId";
    $scope.selectedIndex = null;
    $scope.selectedTestCase = null;
    // $scope.showResults = false;

    $http({
        method: 'GET',
        url: 'http://192.169.179.82:1111/data/all'
            //url: 'http://localhost:1111/data/all'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.testCases = response.data;


    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.testCases = [{}]
    });

    $scope.selectTestCase = function(testCase, index) {
        $scope.selectedIndex = index;
        $scope.selectedTestCase = testCase;
    };

    $scope.sensitiveSearch = function(testCase) {
        if ($scope.search) {
            return testCase.testCaseId.indexOf($scope.search) == 0 ||
                testCase.testCategory.indexOf($scope.search) == 0;
        }
        return true;
    };

    $scope.runTestCases = function(testCases) {
        //console.log(testCases);
        // var testCasesToBeRun = $scope.testCases.filter(function(t){return t.includeInExecution == 'true';});
        var testCasesToBeRun = testCases.filter(function(t) {
            return t.includeInExecution == true;
        });

        //console.log(JSON.stringify(testCasesToBeRun));
        //$window.location.href = '/testResults';

        //Redirect and then run the test cases while showing the live test results

        //$scope.runTestsInAnotherPage(testCasesToBeRun);


        $http({
            method: 'POST',
            url: '/testResults',
            data: testCasesToBeRun
            //url: 'http://localhost:2222/testResults',
            // data: {testData: 'test data passed from main.js'}

        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            //console.log('success call back');
            //$window.location.href = '/testResults';
        });


        // console.log($scope.showResults);
        // console.log('changing the showResults');
        // $scope.showResults = true;
        // console.log($scope.showResults);
    };

    $scope.runTestsInAnotherPage = function(testCasesToBeRun) {
        console.log(testCasesToBeRun);
        // var Horseman = require('node-horseman');

        var count = 0;
        testCasesToBeRun.forEach(function(item) {
            console.log(testCasesToBeRun[count].testCaseId);
            //horseman
            new Horseman()
                .userAgent(testCasesToBeRun[count].basic.browser)
                .open(testCasesToBeRun[count].basic.url)
                .type('input[name="q"]', testCasesToBeRun[count].steps.testQuery)
                .click('[name="btnK"]')
                .keyboardEvent('keypress', 16777221)
                .waitForSelector('div.g')
                .count('div.g')
                .log() // prints out the number of results
                .screenshot('snapshots/' + testCasesToBeRun[count].testCaseId + '.png')
                .close();

            count++;
        });
    };

});

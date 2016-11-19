var express = require('express');
//var $ = require('jQuery');

var router = express.Router();

var testData = '';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/info', function(req, res, next) {
    res.render('info', {
        title: 'Info'
    });
});

// router.get('/runAllTests', function(req, res, next) {
//   $http({
//       method: 'GET',
//       url: 'http://localhost:1111/data/all'
//   }).then(function successCallback(response) {
//       // this callback will be called asynchronously when the response is available
//       testData = JSON.stringify(response);
// console.log(testData);
//       var RunTests = require('../common/RunTests.js');
//       //RunTests.run(testData);
//
//       res.send('Running all Test Cases');
//   });
// });

router.get('/runAllTests', function(req, res, next) {

var rest = require('../common/httpRequests.js');

  var options = {
    host: 'http://localhost:1111/data/all',
    port: 1111,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

rest.getJSON(options,
        function(statusCode, result)
        {
            // I could work with the result html/json here.  I could also just return it
            console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            res.statusCode = statusCode;
            res.send(result);
        });

  // res.render('runAllTests', {
  //     title: 'Run Test Cases'
  // });

//   var http = require('http');
//   http.get("http://localhost:1111/data/all", function(res) {
//   console.log("Got response: " + res.statusCode);
//   if(res.statusCode == 200) {
//     console.log(res);
//   }
// }).on('error', function(e) {
//   console.log("Got error: " + e.message);
// });

  // $.ajax({
  //     method: 'GET',
  //     url: 'http://localhost:1111/data/all',
  //     success: function(response){
  //       testData = JSON.stringify(response);
  //       console.log(testData);
  //       var RunTests = require('../common/RunTests.js');
  //       //RunTests.run(testData);
  //
  //       res.send('Running all Test Cases');
  //     }
  // });
});

router.get('/editTestCase/:testCaseId', function(req, res, next) {
    res.render('editTestCase', {
        title: 'Edit Test Case'
    });
});

router.get('/testResults', function(req, res, next) {
    // res.render('testResults', {
    //     title: 'Test Results'
    // });

    res.redirect('testResults', testData);
});

router.post('/testResults', function(req, res, next) {
    //console.log('reached post');
    // res.render('testResults', { testData: JSON.stringify(req.body) });
    // res.redirect('testResults', { testData: JSON.stringify(req.body) });
    //res.charSet('utf-8');

    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //res.redirect('testResults', { testData: JSON.stringify(req.body) });

    testData = JSON.stringify(req.body);

    // var RunTests = require('C:\\git\\projects\\ebtest\\common\\RunTests.js');
    var RunTests = require('../common/RunTests.js');
    RunTests.run(testData);

    //res.send(testData);
    res.send('Test Case Execution Started');
});


module.exports = router;

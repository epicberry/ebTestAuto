var express = require('express');
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

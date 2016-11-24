function GraphiteAdaptee(){
  this.log = function(testName, status) {
    var graphite = require('graphite');
    var net = require('net');

    // console.log("7624fe70-2464-483b-8470-4b0a981229fb." + testName + " " + status + "\n");
    var socket = net.createConnection(2003, "5ebd096f.carbon.hostedgraphite.com", function() {
        // socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
        // socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + testName + " " + status + "\n");
        socket.write("7624fe70-2464-483b-8470-4b0a981229fb.project1.category1.1016 1" + "\n");
        //console.log("Sent - 7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
        socket.end();
        //console.log('logged - ' + JSON.stringify(testData));
        //console.log('logged - ' + logData)
    });
  };
}

function ELKLogitAdaptee(){
  console.log('Reached Logging using logit');
  this.log = function(testName, status) {
    var logit = require('node-logitio');
    logit.init('489813f6-a692-4394-9573-9e291ab00a6f', { logToConsole: true });
    //logit.log('Logged by Param');
    var testDetails = testName.split(".");
    //console.log(testDetails[0] + '--' + testDetails[1] + '--' + testDetails[2]);
    console.log('Logging in ' + testName + ' project ' + testDetails[0] + ' category ' + testDetails[1] + ' testCaseName ' + testDetails[2] + ' status ' + status );
    logit.log(testName, {'project': testDetails[0], 'category': testDetails[1], 'testCaseName': testDetails[2], 'status': status} );
    console.log('logged!!!!!');
  };
}


function ELKAdaptee(){
  this.log = function(testName, status) {
    // console.log('info',testName, {'status': status});
    // console.log('About to log!');

    // var logger = require('winston');
    // var logsene = require('winston-logsene');
    // logger.add(logsene, {
    //   token: '27a8c002-4ec1-403e-828a-d571b10288ec',
    //   ssl: 'true'
    // });

    var winston = require('winston');
    var logsene = require('winston-logsene')

    winston.handleExceptions(new winston.transports.File({
        filename: '../common/exceptions.log'
    }));

    var logger = new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                level: 'debug',
              handleExceptions: false,
              exitOnError: false,
              humanReadableUnhandledException: false
            })
        ]
    });
    var logger = new winston.Logger()

    logger.add (logsene, {
        token: '27a8c002-4ec1-403e-828a-d571b10288ec',
        type: 'test_logs',
        level: 'debug',
        handleExceptions: true,
        exitOnError: true,
        humanReadableUnhandledException: false,
        ssl: 'true'
    });

    console.log('Starting Log');
    // logger.log('info',"'" + testName + "'", {'status': "'" + status + "'" });

    logger.log('info','project1.category1.1001', {'status': 'passed'});

    console.log('Logging Completed!');


  };
}

function LoggingAdapter(testName, status) {
  // console.log('Choosing Adapter');
    var logWith = 'ELKLogit';

    if(logWith=='ELK'){
      var logUsing = new ELKAdaptee();
      this.log = function log() {
              logUsing.log(testName, status);
          }
    }
    else if(logWith=='Graphite'){
      var logUsing = new GraphiteAdaptee();
      this.log = function log() {
              logUsing.log(testName, status);
          }
    }
    else if(logWith='ELKLogit'){
      var logUsing = new ELKLogitAdaptee();
      this.log = function log() {
              logUsing.log(testName, status);
          }
    }
}

this.log = function(testName, status) {
  var adapter = new LoggingAdapter(testName, status);
  adapter.log();
};



// var logger = require('winston');
// var logsene = require('winston-logsene');
//
// logger.add(logsene, {
//   token: '27a8c002-4ec1-403e-828a-d571b10288ec',
//   ssl: 'true'
// });
//
// logger.log('info','project1.category1.1001', {'status': 'passed'});

// logger.log('info', 'project1.category1.1002', {'status': 'passed'});
// logger.log('info', 'project1.category1.1003', {'status': 'passed'});
// logger.log('info', 'project1.category1.1004', {'status': 'passed'});
// logger.log('info', 'project1.category1.1005', {'status': 'passed'});
// logger.log('info', 'project1.category1.1006', {'status': 'passed'});
// logger.log('info', 'project1.category1.1007', {'status': 'passed'});
// logger.log('info', 'project1.category1.1008', {'status': 'passed'});
// logger.log('info', 'project1.category1.1009', {'status': 'passed'});
// logger.log('info', 'project1.category1.1010', {'status': 'passed'});
//
// logger.log('info', 'project1.category1.1011', {'status': 'failure'});
// logger.log('info', 'project1.category1.1012', {'status': 'failure'});
// logger.log('info', 'project1.category1.1013', {'status': 'failure'});
// logger.log('info', 'project1.category1.1014', {'status': 'failure'});
// logger.log('info', 'project1.category1.1015', {'status': 'failure'});


// this.log = function(logData){
//   //console.log(testData);
//   var socket = net.createConnection(2003, "5ebd096f.carbon.hostedgraphite.com", function() {
//       // socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
//       socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n", function(data){
//
// console.log('callback - data');
// console.log(data);
//       socket.end();
//       });
//
//       //console.log('logged - ' + JSON.stringify(testData));
//       console.log('logged - ' + logData)
//   });
// };


//
// function startP(){
//   var logFile = require('../common/sendLogs.js');
//   logFile.log("project1.category1.1001", "passed");
// }
//
// startP();

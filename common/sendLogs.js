function GraphiteAdaptee(){
  this.log = function(logData) {
    var graphite = require('graphite');
    var net = require('net');

    console.log("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
    var socket = net.createConnection(2003, "5ebd096f.carbon.hostedgraphite.com", function() {
        // socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
        socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
        //console.log("Sent - 7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
        socket.end();
        //console.log('logged - ' + JSON.stringify(testData));
        //console.log('logged - ' + logData)
    });

  };
}


function ELKAdaptee(){
  this.log = function(testName, status) {
    // console.log('info',testName, {'status': status});
    console.log('About to log!');
    var logger = require('winston');
    var logsene = require('winston-logsene');
    logger.add(logsene, {
      token: '27a8c002-4ec1-403e-828a-d571b10288ec',
      ssl: 'true'
    });

    logger.log('info','project1.category1.1001', {'status': 'passed'});
    // logger.log('info',"'" + testName + "'", {'status': "'" + status + "'" });

    console.log('Logging Completed!');


  };
}

function LoggingAdapter(testName, status) {
    var logWith = 'ELK';

    if(logWith=='ELK'){
      var logUsing = new ELKAdaptee();
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

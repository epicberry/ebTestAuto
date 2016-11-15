var graphite = require('graphite');

var net = require('net');

this.log = function(logData){
  //console.log(testData);
  var socket = net.createConnection(2003, "5ebd096f.carbon.hostedgraphite.com", function() {
      // socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
      socket.write("7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
      //console.log("Sent - 7624fe70-2464-483b-8470-4b0a981229fb." + logData + "\n");
      socket.end();
      //console.log('logged - ' + JSON.stringify(testData));
      //console.log('logged - ' + logData)
  });
};



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

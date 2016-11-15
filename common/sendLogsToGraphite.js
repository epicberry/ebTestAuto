var graphite = require('graphite');
var client = graphite.createClient('plaintext://5ebd096f.carbon.hostedgraphite.com:2003/');

// var metrics = {foo: 24};
// client.write(metrics, function(err) {
//   console.log(err);
//   // if err is null, your data was sent to graphite!
// });



var net = require('net');
var socket = net.createConnection(2003, "5ebd096f.carbon.hostedgraphite.com", function() {
    socket.write("7624fe70-2464-483b-8470-4b0a981229fb.doo 1.5\n");
    socket.end();
});

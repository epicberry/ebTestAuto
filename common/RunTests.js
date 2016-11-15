var Horseman = require('node-horseman');
var logFile = require('../common/sendLogs.js');
//var logFile = require('C:\\git\\projects\\ebTestAuto\\common\\sendLogs.js');

// Horseman
function HorsemanAdaptee() {
    this.run = function(testData) {
        //console.time(testData.testCaseId);
        //var t0 = performance.now();
        var start = new Date().getTime();
        new Horseman()
            .userAgent(testData.basic.browser)
            .open(testData.basic.url)
            .type('input[name="q"]', testData.steps.testQuery)
            .click('[name="btnK"]')
            .keyboardEvent('keypress', 16777221)
            .waitForSelector('div.g')
            .count('div.g')
            .log() // prints out the number of results
            .screenshot('snapshots/' + testData.testCaseId + '.png')
            .then(function() {
                var end = new Date().getTime();
                var execTime = end - start;
                //console.log('Execution time: ' + time);
                //log
                //logFile.log(testData,execTime);

                logFile.log('project1.' + testData.testCategory + '.' +testData.testCaseId + ' ' + execTime);
                //logFile.log(testData.testCategory + testData.testCaseId + ' ' + execTime);

            })
            .close();
        return "horseman - Test Completed for - " + testData.testCaseId;
    };
}

// NightWatch
function NightWatchAdaptee() {
    this.run = function(testData) {
        return "NightWatch - " + testData;
    };
}

// adapter interface
function TestFrameworkAdapter(testData) {
    // if (testData == 'NightWatch') {
    //     var runUsing = new NightWatchAdaptee();
    //     return runUsing;
    // } else {
    //     var runUsing = new HorsemanAdaptee();
    //     return runUsing;
    // }

    var runUsing = new HorsemanAdaptee();
    this.run = function run() {
            runUsing.run(testData);
        }
        //return runUsing;
}


this.run = function(testData) {
    var count = 0;
    //console.log(testData);

    var testCases = JSON.parse(testData);

    // var adapter = new TestFrameworkAdapter(testCases);
    // adapter.run();

    testCases.forEach(function(item) {
        console.log(testCases[count].testCaseId);
        //horseman
        var adapter = new TestFrameworkAdapter(testCases[count]);
        adapter.run();
        count++;
    });
};

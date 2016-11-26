var Horseman = require('node-horseman');
var logFile = require('../common/sendLogs.js');
//var logFile = require('C:\\git\\projects\\ebTestAuto\\common\\sendLogs.js');

function ProtractorAdaptee(){
  this.run = function(testData) {
      console.log('Running Protractor Test Case');
      var pro = require('../common/conf.js');
  };
}

function SauceAdaptee() {
    this.run = function(testData) {
          var webdriver = require('selenium-webdriver'),
          username = "param7",
          accessKey = "f0cfe8f5-812c-4ba3-8045-9d3785b25295",
          driver;

      driver = new webdriver.Builder().
        withCapabilities({
          'browserName': 'chrome',
          'platform': 'Windows XP',
          'version': '43.0',
          'username': username,
          'accessKey': accessKey
        }).
        usingServer("https://" + username + ":" + accessKey +
                    "@ondemand.saucelabs.com:443/wd/hub").
        build();

      driver.get(testData.testSteps[0].url);

      driver.findElement(By.css("id=\"twotabsearchtextbox\"")).sendKeys("christmas");

      driver.click(By.xpath("//*[@id=\"result_1\"]/div/div/div/div[2]/div[2]/a"));
      driver.quit();
    };
}

// Horseman
function HorsemanAdaptee() {
    this.run = function(testData) {
        //console.time(testData.testCaseId);
        //var t0 = performance.now();
        var start = new Date().getTime();
        // new Horseman()
        //     .userAgent(testData.browser)
        //     .open('https://google.com')
        //     .type('input[name="q"]', testData.testSteps[1].value)
        //     .click('[name="btnK"]')
        //     .keyboardEvent('keypress', 16777221)
        //     .waitForSelector('div.g')
        //     .count('div.g')
        //     .log() // prints out the number of results
        //     .screenshot('snapshots/' + testData.testCaseId + '.png')
        //     .then(function() {
        //         var end = new Date().getTime();
        //         var execTime = end - start;
        //         //console.log('Execution time: ' + time);
        //         //log
        //         //logFile.log(testData,execTime);
        //
        //         logFile.log('project1.' + testData.testCategory + '.' +testData.testCaseId + ' ' + execTime);
        //         //logFile.log(testData.testCategory + testData.testCaseId + ' ' + execTime);
        //
        //     })
        //     .close();

try {
        new Horseman()
            .on('error', function(msg, trace){
              console.log('Error Occurred!!!!!!');
            })
            .userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0')

            .open('https://www.amazon.com')
            .type('input[id="twotabsearchtextbox"]', testData.testSteps[1].value)
            .keyboardEvent('keypress', 16777221)
            .waitForNextPage()

            // .userAgent(testData.browser)
            // .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            //.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36')

            //.click('//*[@id="nav-search"]/form/div[2]/div/input')

            .screenshot('snapshots/' + testData.testCaseId + '_1.png')
            //.waitForSelector('//*[@id="result_1"]/div/div/div/div[2]/div[2]/a')
            .waitForSelector('[title="A Norman Rockwell Christmas Story"]')
            // .waitForSelector('[id="result_1"]')

            //.screenshot('snapshots/' + testData.testCaseId + '_2.png')
            // .click('[@id="result_1"]/div/div/div/div[2]/div[2]/a')
            // .click('[title="Mallcat Women Stripe Dress Christmas Elk Casual Dress"]')
            .click('[title="A Norman Rockwell Christmas Story"]')
            .screenshot('snapshots/' + testData.testCaseId + '_3.png')
            .waitForNextPage()

            .screenshot('snapshots/' + testData.testCaseId + '.png')
            .then(function() {
                var end = new Date().getTime();
                var execTime = end - start;
                //console.log('Execution time: ' + time);
                //log
                //logFile.log(testData,execTime);

                //logFile.log('project1.' + testData.testCategory + '.' +testData.testCaseId + ' ' + execTime);
                //logFile.log(testData.testCategory + testData.testCaseId + ' ' + execTime);

            })
            .close();

          }
          catch(err) {
            console.log('ERRORRRRRRRRRRRRRRRRRRRR');
          }

            // .finally(function(){
            //   return horseman.close();
            // });


        // new Horseman()
        //     .userAgent(testData.browser)
        //     .open(testData.testSteps[0].url)
        //     .type(testData.testSteps[1].elementName, testData.testSteps[1].value)
        //     .click(testData.testSteps[2].elementName)
        //
        //     .screenshot('snapshots/' + testData.testCaseId + '.png')
        //     .then(function() {
        //         var end = new Date().getTime();
        //         var execTime = end - start;
        //         //console.log('Execution time: ' + time);
        //         //log
        //         //logFile.log(testData,execTime);
        //
        //         //Working
        //         //logFile.log('project1.' + testData.testCategory + '.' +testData.testCaseId + ' ' + execTime);
        //
        //         //logFile.log(testData.testCategory + testData.testCaseId + ' ' + execTime);
        //
        //     })
        //     .close();
        //

        //return "horseman - Test Completed for - " + testData.testCaseId;
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

    var runWith = 'protractor';

    if(runWith=='horseman'){
      console.log('Running using horseman');
      var runUsing = new HorsemanAdaptee();
      this.run = function run() {
              runUsing.run(testData);
          }
    }
    else if (runWith=='sauce'){
      console.log('Running using Sauce');
      var runUsing = new SauceAdaptee();
      this.run = function run() {
              runUsing.run(testData);
          }
    }
    else if (runWith=='protractor'){
      console.log('Running using protractor');
      var runUsing = new ProtractorAdaptee();
      this.run = function run(){}
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

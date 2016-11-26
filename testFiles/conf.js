exports.config = {
  seleniumAddress: 'https://param7:f0cfe8f5-812c-4ba3-8045-9d3785b25295@ondemand.saucelabs.com:443/wd/hub',
  specs: ['*.js'],
  // specs: ['1000.js'],
  multiCapabilities: [{
      'browserName': 'chrome'
      ,shardTestFiles: true,
      maxInstances: 8
    }
    // , {
    //   'browserName': 'chrome'
    // }
  ],
    onPrepare: function(){
       browser.ignoreSynchronization = true;
    }
};

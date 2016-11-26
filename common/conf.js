exports.config = {
  seleniumAddress: 'https://param7:f0cfe8f5-812c-4ba3-8045-9d3785b25295@ondemand.saucelabs.com:443/wd/hub',
  specs: ['sampleProtractorTest.js'],
  multiCapabilities: [{
      'browserName': 'chrome'
    }]
};

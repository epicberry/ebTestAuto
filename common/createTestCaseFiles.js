var http = require('http');

PrepareTests();

function PrepareTests(){
  var options = {
    host: '192.169.179.82',
    port: 1111,
    path: '/data/all'
  };

  http.get(options, function(res){
    res.on('data', function(chunk){
      //console.log(JSON.parse(chunk));
      CreateFiles(JSON.parse(chunk));
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
}


function CreateFiles(testCases){
  testCases.forEach(function(testCase) {
     //var editedTestCase = "describe('Amazon shopping', function() { it('should open an item', function() { browser.get('https://www.amazon.com'); element(by.css('[id=\"twotabsearchtextbox\"]')).sendKeys('"+item.testSteps[1].value+"'); element(by.xpath('[//*[@id=\"result_1\"]/div/div/div/div[2]/div[2]/a]')).click(); }); });"
    var strTestFlow = CreateProtractorString(testCase);

    var fs = require('fs');
    fs.writeFile("../testFiles/"+testCase.testCaseId+".js", strTestFlow, function(err) {
        if(err) {
            return console.log(err);
        }
        //console.log("The file was saved!");
    });
  });
}

// function CreateProtractorString(testCase){
//   //return "describe('Amazon shopping', function() { it('should open an item', function() { browser.get('https://www.amazon.com'); element(by.css('[id=\"twotabsearchtextbox\"]')).sendKeys('"+testCase.testSteps[1].value+"'); element(by.css('[value=\"Go\"]')).click();   }); });"
//   var strTestFlow = "describe('" + testCase.description + "' , function() { it('" + testCase.description + "', function() {";
//   testCase.testSteps.forEach(function(testStep) {
//     switch(testStep.type) {
//         case 'navigate':
//             strTestFlow += "\n browser.get('" + testStep.url + "');"
//             break;
//         case 'input':
//             strTestFlow += "\n element(by.css('[" + testStep.elementName + "]')).sendKeys('" + testStep.value + "');";
//             break;
//         case 'click':
//             strTestFlow += "\n element(by.css('[" + testStep.elementName + "]')).click();";
//             break;
//         default:
//             console.log('In default');
//       }
//   });
//   strTestFlow += "\n }); \n });";
//   return strTestFlow;
// }

function CreateProtractorString(testCase){
  //return "describe('Amazon shopping', function() { it('should open an item', function() { browser.get('https://www.amazon.com'); element(by.css('[id=\"twotabsearchtextbox\"]')).sendKeys('"+testCase.testSteps[1].value+"'); element(by.css('[value=\"Go\"]')).click();   }); });"
  var strTestFlow = "var logFile = require('../common/sendLogs.js'); \n describe('" + testCase.description + "' , function() { it('" + testCase.description + "', function() {";
  var logEntry = "logFile.log(\"project1" + "." + testCase.testCategory + "." + testCase.testCaseId + "\", ";
  var strEndFlow = "";
  testCase.testSteps.forEach(function(testStep) {
    switch(testStep.type) {
        case 'navigate':
            strTestFlow += "\n browser.get('" + testStep.url + "').then(function(){";
            strEndFlow += "\n}, function(err){\n " + logEntry + "\"failure\"); " + " \n console.log(err); \n throw new Error('Error occurred'); \n});";
            break;
        case 'input':
            // strTestFlow += "\n element(by."+testStep.selectBy+"('[" + testStep.elementName + "]')).sendKeys('" + testStep.value + "').then(function(){";
            strTestFlow += "\n element(by."+testStep.selectBy+"('" + testStep.elementName + "')).sendKeys('" + testStep.value + "').then(function(){";
            strEndFlow += "\n}, function(err){\n " + logEntry + "\"failure\"); " + " \n console.log(err); \n throw new Error('Error occurred'); \n});";
            break;
        case 'click':
            // strTestFlow += "\n element(by." + testStep.selectBy + "('[" + testStep.elementName + "]')).click().then(function(){";
            strTestFlow += "\n element(by." + testStep.selectBy + "('" + testStep.elementName + "')).click().then(function(){";
            strEndFlow += "\n}, function(err){\n " + logEntry + "\"failure\"); " + " \n console.log(err); \n throw new Error('Error occurred'); \n});";
            break;
        case 'sleep':
            strTestFlow += "\n browser.sleep(" + testStep.timeInMilliSecs + "); ";
            break;
        default:
            console.log('In default');
      }
  });
  logEntry += "\"passed\");";
  strTestFlow += "\n" + logEntry + strEndFlow + "\n }); \n });";

  return strTestFlow;
}

// //if body is sent in chunks
// request.on('response', function (response) {
//   var body = '';
//   response.on('data', function (chunk) {
//     body += chunk;
//   });
//   response.on('end', function () {
//     console.log('BODY: ' + body);
//   });
// });
// request.end();

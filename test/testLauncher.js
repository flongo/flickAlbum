var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

childProcess.exec('node node_modules/mocha-phantomjs/bin/mocha-phantomjs -p ' + binPath + ' test/test.html', [], function(err, stdout, stderr) {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (err) {
        process.exit(err.code);
    }
})
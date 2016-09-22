/*
 * fis3-postprocessor-stylefmt
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict';

var path = require('path');
var nodePath = 'node';
var spawnSync = require('child_process').spawnSync;
var stylefmtBin = path.normalize(path.join(__dirname, './bin/stylefmt.js'));
function nodeBin() {
  var args = [].slice.call(arguments).map(function(arg) {
    return typeof arg === 'string' ? arg : JSON.stringify(arg);
  });
  var result = spawnSync(nodePath, args, {encoding: 'utf-8'});

  if (result.error) {
    log.warn(
      result.error.message,
      result.error.stack
    );
    process.exit(1);
  }

  result = result.stdout + '';

  try {
    result = JSON.parse(result);
  } catch(err) {
    result = null;
  }

  return result;
}

module.exports = function(content, file, conf){
  var result = nodeBin(stylefmtBin, content);
  if (result && result.css) {
    return result.css;
  }

  return content;
};



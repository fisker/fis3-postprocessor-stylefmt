/*
 * fis3-postprocessor-stylefmt
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict';

var syncPromise = require('promise-synchronizer');
var log = (global.fis && fis.log) || console;

module.exports = function(content, file, conf){

  var promise = stylefmt(content, {})
    .then(function(result) {
      if (result && result.css) {
        content = result.css;
      }
    });

  syncPromise(promise);
  return content;
};



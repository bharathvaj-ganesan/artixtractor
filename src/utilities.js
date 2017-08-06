'use strict';
// Holds misc. utility methods which prove to be useful throughout this library.
const _ = require('lodash');

module.exports.StringSplitter = function(string, pattern) {
    return _.split(string, pattern);
};

module.exports.StringReplace = function(string, pattern, replaceWith) {
    return _.replace(string, pattern, replaceWith);
};

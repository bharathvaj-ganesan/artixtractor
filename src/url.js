'use strict';
const urlPaser = require('url');
const utilsUrl = require('./utils_url');

module.exports.removeArgs = function(url) {
    if (utilsUrl._hasUrlQuery(url)) {
        return utilsUrl._removeArgs(url);
    }
    return url;
};

module.exports.getProtocol = function(url) {
    return urlPaser.parse(url).protocol;
};

module.exports.getDomainName = function(url) {
    return urlPaser.parse(url).hostname;
};

module.exports.getPath = function(url) {
    return urlPaser.parse(url).pathname;
};

module.exports.isValidUrl = function(url) {
    if (utilsUrl._followUrlFormat(url)) {
        return utilsUrl._validDomain(urlPaser.parse(url).hostname);
    } else {
        return false;
    }
};

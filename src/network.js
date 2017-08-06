'use strict';
/*
    Abstract for all requests and responses over the http.
*/
const request = require('request-promise-native');
const cheerio = require('cheerio');
const fs = require('fs');

const config = require('./config');

function getRequestOptions(timeOut, userAgent) {
    return {
        timeOut: timeOut,
        headers: {
            'User-Agent': userAgent
        },
        transform: function(body) {
            return cheerio.load(body, {xmlmode: true});
        },
        maxRedirects: 100,
        jar: true
    };
}

module.exports.getParsedHtml = function(sourceUrl) {
    if (config.test) {
        return new Promise((resolve, reject)=>{
            fs.readFile(sourceUrl, 'utf-8', (error, data)=>{
                if (error) reject(error);
                if (data != undefined) resolve(cheerio.load(data));
            });
        });
    }
    return request.get(sourceUrl, getRequestOptions(config.timeOut, config.userAgent));
};

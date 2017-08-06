'use strict';
// Keep all html page extraction code within this file
const path = require('path');
const _ = require('lodash');
const config = require('./config');
const util = require('./utilities');
const network = require('./network');

// Article
let getTitle = function($) {
    // We extract title from any of these meta data
    let fbTitle = $('meta[property=\'og:title\']').attr('content'),
        twitterTitle = $('meta[property=\'twitter:title\']').attr('content'),
        pageTitle = $('title').text(),
        h1 = $('h1').text();
    if (fbTitle != '' && fbTitle != undefined && fbTitle != null) {
       return fbTitle;
    }
    if (twitterTitle != '' && twitterTitle != undefined && twitterTitle != null) {
        return twitterTitle;
    }
    if (pageTitle != '' && pageTitle != undefined && pageTitle != null) {
        return pageTitle;
    }
    if (h1 != '' && h1 != undefined && h1 != null) {
        return h1;
    }
    return '';
};

let getDescription = function($) {
    let fbDescription = $('meta[property=\'og:description\']').attr('content'),
        twitterDescription = $('meta[property=\'twitter:description\']').attr('content');

    if (fbDescription != '' && fbDescription != undefined && fbDescription != null) {
       return fbDescription;
    }
    if (twitterDescription != '' && twitterDescription != undefined && twitterDescription != null) {
        return twitterDescription;
    }
    return '';
};

let getTopImage = function($) {
    // Extract image url from any of these meta data
    let fbImage = $('meta[property=\'og:image\']').attr('content'),
        twitterImage = $('meta[property=\'twitter:image\']').attr('content');
    if (fbImage != '' && fbImage != undefined && fbImage != null) {
        return fbImage;
    }
    if (twitterImage != '' && twitterImage != undefined && twitterImage != null) {
        return twitterImage;
    }
    return '';
};

let getText = function($) {
    let p = $('p').text();
    if (p != '' && p != undefined && p != null) {
        return p;
    }
    return '';
};

let getDate = function($) {
     // Extract date from any of these meta data
     let avaliableDate1 = $('meta[property=\'article:published\']').attr('content'),
         avaliableDate2 = $('meta[property=\'article:published_time\']').attr('content'),
         avaliableDate3 = $('meta[property=\'og:pubdate\']').attr('content'),
         avaliableDate4 = $('meta[name=\'sailthru.date\']').attr('content');
    if (avaliableDate1 != '' && avaliableDate1 != undefined && avaliableDate1 != null) {
        return avaliableDate1;
    }
    if (avaliableDate2 != '' && avaliableDate2 != undefined && avaliableDate2 != null) {
        return avaliableDate2;
    }
    if (avaliableDate3 != '' && avaliableDate3 != undefined && avaliableDate3 != null) {
        return avaliableDate3;
    }
    if (avaliableDate4 != '' && avaliableDate4 != undefined && avaliableDate4 != null) {
        return avaliableDate4;
    }
    return '';
};

let getAuthor = function($) {
    let availableAuthor1 = $('meta[name=\'author\']').attr('content'),
		availableAuthor2 = $('meta[property=\'author\']').attr('content'),
		availableAuthor3 = ($('meta[property=\'article:author\']').attr('content'))?$('meta[property=\'article:author\']').attr('content').split('/')[3]: '';
    if (availableAuthor1 != '' && availableAuthor1 != undefined && availableAuthor1 != null) {
        return availableAuthor1;
    }
    if (availableAuthor2 != '' && availableAuthor2 != undefined && availableAuthor2 != null) {
        return availableAuthor2;
	}
	if (availableAuthor3 != '' && availableAuthor3 != undefined && availableAuthor3 != null) {
        return availableAuthor3;
    }
    return '';
};

module.exports = {
    getTitle: getTitle,
    getText: getText,
    getDescription: getDescription,
    getDate: getDate,
    getTopImage: getTopImage,
    getAuthor: getAuthor,
};

'use strict';

const _ = require('lodash');
const network = require('./network');
const extractor = require('./extractor');
const url = require('./url');

/**
 *
 * @param {string} inputUrl - Url of Article to Parse
 * @return {promise}  - Parsed article
 */

let Article = async function(inputUrl) {
    if (url.isValidUrl(inputUrl)) {
        let $ = network.getParsedHtml(inputUrl);
        let Article = {};
        _.set(Article, 'domain', url.getDomainName(inputUrl));
        _.set(Article, 'title', extractor.getTitle(await $));
        _.set(Article, 'articleContent', extractor.getText(await $));
        _.set(Article, 'primaryImage', extractor.getTopImage(await $));
        _.set(Article, 'date', extractor.getDate(await $));
        _.set(Article, 'author', extractor.getAuthor(await $));
        _.set(Article, 'shortDescription', extractor.getDescription(await $));
        return Article;
    } else {
        return 'Not a Valid Domain';
    }
};

module.exports = Article;

'use strict';
const _ = require('lodash');
const urlPaser = require('url');

const ALLOWED_TYPES = ['html', 'htm', 'md', 'rst', 'aspx', 'jsp', 'rhtml', 'cgi',
                 'xhtml', 'jhtml', 'asp', 'php'];
const BAD_DOMAINS = ['amazon.com', 'doubleclick.com', 'twitter.com', 'facebook.com'];

const GOOD_PATHS = ['story', 'article', 'feature', 'featured', 'slides',
              'slideshow', 'gallery', 'news', 'video', 'media',
              'v', 'radio', 'press', 'sport', 'entertainment', 'world', 'technology', 'tech', 'showbiz'];

const BAD_CHUNKS = ['careers', 'contact', 'about', 'faq', 'terms', 'privacy',
              'advert', 'preferences', 'feedback', 'info', 'browse', 'howto',
              'account', 'subscribe', 'donate', 'shop', 'admin'];

module.exports._followUrlFormat = function(url) {
    let regEx = /^((http[s]|ftp):\/)*?\/*?([^:\/\s]*)[/]*$/;
    if (regEx.test(url)) {
        return false;
    }
    return true;
};
module.exports._startWithForwardSlash = function(urlPath) {
   if (_.startsWith(urlPath, '/')) return true;
   return false;
};

module.exports._splitPath = function(urlPath) {
    return _.split(urlPath, '/');
};

module.exports._removeIndex = function(pathChuncks) {
    return _.pull(pathChuncks, 'index');
};

module.exports._getDomainName = function(domain, tld) {
    return _.pull(_.split(domain, '.'), tld)[0];
};

module.exports._urlHasDate = function(url) {
    /*
        Search of a YYYY/MM/DD pattern in the url.
    */
    let regEx = /([\./\-_]{0,1}(19|20)\d{2})[\./\-_]{0,1}(([0-3]{0,1}[0-9][\./\-_])|(\w{3,5}[\./\-_]))([0-3]{0,1}[0-9][\./\-]{0,1})?/;
    if (regEx.test(url)) {
        return true;
    }
    return false;
};

module.exports._validDomain = function(domain) {
    if (_.indexOf(BAD_DOMAINS, domain) === -1) {
        return true;
    }
     return false;
};

module.exports._hasNewsSlug = function(urlSlug, domainName) {
    let dashCount = occurrences(urlSlug, '-');
    let underscoreCount = occurrences(urlSlug, '_');

    if (dashCount > 4 || underscoreCount > 4) {
        if (dashCount >= underscoreCount) {
            // check if the domain name is in slug
            if (_.indexOf(_.split(urlSlug, '-'), domainName) == -1) {
return true;
}
        }
        if (underscoreCount > dashCount) {
            // check if the domain name is in slug
            if (_.indexOf(_.split(urlSlug, '_'), domainName) == -1) {
return true;
}
        }
    }
    return false;
};

module.exports._hasBadPath = function(pathChuncks) {
    for (let i=0; i<pathChuncks.length; i++) {
        if (_.indexOf(BAD_CHUNKS, pathChuncks[i]) != -1) {
            return true;
        }
    }
    return false;
};
module.exports._hasGoodPath = function(pathChuncks) {
    for (let i=0; i<pathChuncks.length; i++) {
        if (_.indexOf(GOOD_PATHS, pathChuncks[i]) != -1) {
            return true;
        }
    }
    return false;
};

module.exports._hasUrlQuery = function(url) {
    let parsedUrl = urlPaser.parse(url);
    if (parsedUrl.search == null) {
        return false;
    }
    return true;
};

module.exports._removeArgs = function(url, keep_params=[]) {
    let parsedUrl = urlPaser.parse(url, true);
    let filtered_query = ((query)=>{
        if (!Array.isArray(keep_params)) {
            throw new TypeError('Array expected');
        }
        if (keep_params.length < 1) {
            return null;
        }
        return _.pick(query, keep_params);
    })(parsedUrl.query);
    return urlPaser.format({
        protocol: parsedUrl.protocol,
        slashes: parsedUrl.slashes,
        auth: parsedUrl.auth,
        host: parsedUrl.host,
        port: parsedUrl.port,
        hash: parsedUrl.hash,
        query: filtered_query,
        pathname: parsedUrl.pathname
    });
};

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
*/
function occurrences(string, subString, allowOverlapping) {
    string += '';
    subString += '';
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

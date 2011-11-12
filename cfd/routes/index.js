/*
 * GET home page.
 */

var index = function(req, res) {
    console.log('toot');
    res.render('index', { title: 'CloudFull' });
};

exports.index = index;

/*
 * Performing Twitter OAuth
 */

var util = require('util');

var twitter = function(req, res) {
    util.log('twitter: ' + util.inspect(req.params));    
    res.render('index', { title: 'CloudFull' });
};

exports.twitter = twitter;

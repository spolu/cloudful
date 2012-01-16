// Copyright Stanislas Polu
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * xdr.js
 *
 * Provides CF.xdr for all cross-domain requests (XMLHttpRequest)
 * addressed to an domain potentially different than the one serving
 * the page.
 *
 * At this time, we consider 3 different 'transports' to perform
 * cross-domain calls: JSONP, CORS, Flash [crossdomain.xml].
 * 
 * The success of each of these transports depends on both the client and
 * the server supporting it:
 *
 * [CORS] 
 * - client: browser support required              
 *           [http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing]
 *           [https://developer.mozilla.org/En/HTTP_access_control]             
 * - server: CORS header support required on server code
 *           [https://developer.mozilla.org/En/Server-Side_Access_Control]
 *           
 * [JSONP] (only supports GET, less than 2000 bytes input)
 * - client: works everywhere
 *           [http://en.wikipedia.org/wiki/JSONP]
 * - server: support for JSON and callback parameter required
 *           [http://www.json-p.org/]
 *
 * [FLASH]
 * - client: flash required
 * - server: crossdomain.xml file needed
 * 
 * Client side support can be dynamically detected, but server-side
 * support should be hinted when the request is made ordered by
 * preferability by the remote API provider (This information will be
 * part of the description of an API).
 */

/**
 * remote origin query call
 * @param options for the query
 *        { transports {Array}      the XD Channel to use
 *          method {String}       the HTTP method
 *          url {String}          the URL
 *          params {Object}       the params added to url
 *          data {Object|String}  the data to be sent [$.ajax behavior]
 *          processData {Boolean} Whether to process Data [see $.ajax]
 *          params {Object}       the parameters for the query
 *          complete {Function}   the callback on complete
 *          error {Function}      the callback on error }
 */
CF.ns('xdr.call', function() {
	if(!CF.xdr._caller) {
	    CF.ns('xdr._caller', CF.xdr.caller({}));
	}
	CF.xdr._caller.call.apply(this, arguments);	
    });

CF.ns('xdr.caller', function(spec, my) {
	my = my || {};
	var _super = {};

	my.TRANSPORTS = ['CORS', 'JSONP'/*, 'FLASH'*/];
	my.METHODS = ['get', 'post', 'delete', 'put'];
	my.support = {}; // dynamically filled support object

	// public
	var call; /* call(options); */

	// private;
	var cors;
	var jsonp;
	var flash;

	var that = {};
	
	/**
	 * performs a remote-origin query call
	 * @param options for the query
	 *        { transports {Array}    the XD Channel to use
	 *          method {String}       the HTTP method
	 *          server {String}       the url server
	 *          path {String}         the url path
	 *          params {Object}       the parameters for the query
	 *          data {Object|String}  the data to be sent [$.ajax behavior]
	 *          processData {Boolean} whether to process Data [see $.ajax]
	 *          complete {Function}   the callback on complete
	 *          error {Function}      the callback on error }
	 */
	call = function(options) {
	    // defaults
	    options = CF.copy(options, { method: 'GET' });	    
	    // validation and routing
	    if(!Array.isArray(options.transports) ||
	       options.transports.length == 0) 
		throw new Error('CF.xdr.call: at least one channel must be specified');	    
	    if(CF.Array.indexOf(my.METHODS, options.method))
		throw new Error('CF.xdr.call: unknown method ' + options.method);		
	    if(typeof options.url != 'string')
		throw new Error('CF.xdr.call: incorrect url ' + options.url);
	    if(typeof options.url != 'string')
		throw new Error('CF.xdr.call: incorrect url ' + options.url);
		

	    for(var i = 0; i < options.transports.length; i ++) {
		var performed = false;
		if(CF.Array.indexOf(my.TRANSPORTS, options.transports[i])) {
		    switch(options.transports[i]) {
		    case 'CORS':
			performed = cors(options);
		    case 'JSONP':
			performed = jsonp(options);
		    case 'FLASH':
			performed = flash(options);
		    default:
			throw new Error('CF.xdr.call: unknown transport ' + options.transports[i]);
		    }
		}
		if(performed)
		    return;
	    }
	    throw new Error('CF.xdr.call: not supported transport found: ' + JSON.stringify(options.transports));
	};

	cors = function(options) {
	    if(typeof my.support.cors === 'undefined') {
		my.support.cors = $.support.cors;
	    }
	    else if(my.support.cors) {
	    }
	    else {
		return false;
	    }
	};

	jsonp = function(options) {
	    if(typeof my.support.jsonp === 'undefined') {
		my.support.jsonp = $.support.ajax;
	    }
	    else if(my.support.jsonp) {
	    }
	    else {
		return false;
	    }	    
	};

	flash = options(options) {
	    
	};

	CF.method(that, 'call', call);

	return that;
    });
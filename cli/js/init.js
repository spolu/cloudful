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
 * init.js
 *
 * provides CF.init in charge of initialization for the entire CF
 * library. Typical initialization is done as follow:
 *
 *  CF.init({ appId: 'YOUR APP ID' });
 *      
 */

/**
 * initialize the library and its components
 * @param options {Object}
 *         { appId {String}    application ID
 *           logging {Boolean} [optional:true] logging enabled
 * 
 */ 
CF.ns('init', function(options) {
	options = CF.copy(options || {}, { logging: true });

	// disable logging if told to do so, but only if the url doesnt have the
	// token to turn it on. this allows for easier debugging of third party
	// sites even if logging has been turned off.
	if(!options.logging &&
	   window.location.toString().indexOf('cf_debug=1') < 0) {
	    CF._logging = false;
	}
	

	// JQuery Dependency	
	if(typeof $ === 'undefined' ||
	   typeof $.fn === 'undefined' ||
	   CF.Helper.vcomp('1.7', $.fn.jquery)) {
	    throw new Error('CF.init: jQuery >= 1.7 required');
	}
	
	// TODO: add user initialization	
    });


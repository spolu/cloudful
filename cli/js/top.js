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
 * ns.js
 * 
 * This the toplevel namespace housekeeping code. Inspired by Facebook
 * JS SDK namespace handling. The main method to take away is the ns
 * method which works as follow:
 *
 *   CF.ns('user.login', function() {...});
 *   CF.ns('user.logout', function() {...});
 * 
 * Similar to writing:
 *
 *  CF.user = {
 *     login: function() {...},
 *     logout: function() {...}
 *  };
 *
 * Additional method are provided to handle functional inheritance:
 * CF.method, CF.getter, CF.setter
 *
 * Finally, some utilities such as CF.$ and CF.guid
 *
 */
if (!window.CF) {
    CF = {	
	
	_logging: true,
	
	
	/** 
	 * copies things from source into target. (borrowed from FB)
	 * @param target {Object}      the target object
	 * @param source {Object}      the source object
	 * @param overwrite {Boolean}  [optional] should overwrite
	 * @param transform {Function} [optional] transformation function
	 */
	copy: function(target, source, overwrite, transform) {
	    var key;
	    for (key in source) {
		if (overwrite || typeof target[key] === 'undefined') {
		    target[key] = transform ? transform(source[key]) : source[key];
		}
	    }
	    return target;
	},
	
	/**
	 * set obj to the specified namespace
	 * @param path {String}        qualified path
	 * @param obj {Object}         the oject to set
	 * @param overwirte {Boolean}  [optional] should overwrite
	 * @return {Object} the created namespaced object
	 */
	ns: function(path, obj, overwrite) {
	    var parts = path ? path.split('.') : [];
	    if(parts[0] === 'CF')
		parts = parts.slice(1);
	    if(parts.length === 0 ||
	       (parts.length === 1 && parts[0] === ''))
		throw new Error("CF: can't provide CF itself");
	    var node = window.CF;
	    for(var i = 0; i < parts.length - 1; i ++) {
		var n = {}; n[parts[i]] = {};	
		CF.copy(node, n, false);
		node = node[parts[i]];
	    }
	    var n = {};	n[parts[i]] = obj;  
	    CF.copy(node, n, overwrite);
	    return node[parts[i]];
	},
	    
	/**
	 * add method to the object denoted by that while
	 * preserving _super implementation
	 * @param that {Object}      the receiver object
	 * @param name {String}      name of the method
	 * @param method {Function}  the actual method
	 */
	method: function(that, name, method, _super) {
	    if(_super) {
		var m = that[name];
		_super[name] = function() {
		    return m.apply(that, arguments);
		};
	    }
	    that[name] = method;
	},

	/**
	 * generates a getter for obj[prop] on the object denoted
	 * by that
	 * @param that {Object}  the augmented object
	 * @param name {String}  name of the getter
	 * @param obj {Object}   the source object
	 * @param prop {String}  the property of obj ot be get
	 */
	getter: function(that, name, obj, prop) {
	    var getter = function() {
		return obj[prop];
	    };
	    that[name] = getter;
	},
	
	/**
	 * generates a setter for obj[prop] on the object denoted
	 * by that
	 * @param that {Object}  the augmented object
	 * @param name {String}  name of the getter
	 * @param obj {Object}   the source object
	 * @param prop {String}  the property of obj ot be set
	 */
	setter: function(that, name, obj, prop) {
	    var setter = function (arg) {
		obj[prop] = arg;
		return that;
	    };
	    that['set' + name.substring(0, 1).toUpperCase() + name.substring(1)] = setter;
	},

	/**
	 * informs whether an object responds to a give method
	 * @param that {Object} the object
	 * @param name {String} the method name
	 * @return {Boolean} whether it responds
	 */
	responds: function(that, name) {
	    return (that[name] && typeof that[name] === 'function');
	},	
	
	/**
	 * jQuery style shortcut for document.getElementById
	 * @param {String} DOM id
	 * @return {DOMElement} the DOM element
	 */
	$: function(id) {
	    return document.getElementById(id);
	},

	/**
	 * weak random unique ID
	 * @return {String} random unique ID
	 */
	guid: function () {
	    var res = '', i, j;
	    for(j = 0; j < 32; j++) {
		i = Math.floor(Math.random()*16).toString(16).toUpperCase();
		res += i;
	    }
	    return res;
	},
	
	/**
	 * conditional [local] log of a string (if possible)
	 * @param {String} message
	 */
	log: function(str) {
	    if(CF._logging &&
	       typeof console !== 'undefined' &&
	       typeof console.log !== 'undefined') {
		console.log(str);
	    }	    
	}		
    }	
}
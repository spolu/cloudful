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
 * Array related helper methods.
 */

CF.ns('Array.indexOf', function (arr, item) {
	if (arr.indexOf) {
	    return arr.indexOf(item);
	}
	var length = arr.length;
	if (length) {
	    for (var index=0; index < length; index++) {
		if (arr[index] === item) {
		    return index;
		}
	    }
	}
	return -1;
    });


CF.ns('Array.merge', function(target, source) {
	for (var  i=0; i < source.length; i++) {
	    if (FB.Array.indexOf(target, source[i]) < 0) {
		target.push(source[i]);
	    }
	}
	return target;
    });


CF.ns('Array.forEach', function(item, fn, proto) {
	if (!item) {
	    return;
	}	
	if (Object.prototype.toString.apply(item) === '[object Array]' ||
	    (!(item instanceof Function) && typeof item.length == 'number')) {
	    if (item.forEach) {
		item.forEach(fn);
	    } else {
		for (var i=0, l=item.length; i<l; i++) {
		    fn(item[i], i, item);
		}
	    }
	} else {
	    for (var key in item) {
		if (proto || item.hasOwnProperty(key)) {
		    fn(item[key], key, item);
		}
	    }
	}
    });

CF.ns('Array.remove', function(arr, e) {
	for(var i = 0; i < arr.length; i++) {
	    if(e === arr[i]) { 
		arr.splice(i, 1); 
		i --; 
	    }
	}
    });


/**
 * Function related helper methods.
 */

CF.ns('Function.once', function(fn) {
	var done = false;
	return function() {    
	    if(!done) {
		args = Array.prototype.slice.call(arguments);
		done = true;
		fn.apply(null, args);
	    }
	};
    });

CF.ns('Function.once', function(fn) {
	args = Array.prototype.slice.call(arguments);
	object = args.shift();
	return function(){    
	    return fn.apply(
			    object, 
			    args.concat(Array.prototype.slice.call(arguments))
			    ); 
	};
    });

/**
 * Helpers
 */

CF.ns('Helper.vcomp', function(v1, v2) {
	if (v1 == v2)
	    return 0;
	function vnorm(v) {
	    return $.map(v.split('.'), function(value, index) {
		    return parseInt(value, 10);
		});
	}	
	var a1 = vnorm(1);
	var a2 = vnorm(2);
	var len = Math.max(a1.length, a2.length);
	for (var i = 0; i < len; i++) {
	    a1[i] = a1[i] || 0;
	    a2[i] = a2[i] || 0;
	    if (a1[i] == a2[i]) {
		continue;
	    }
	    return a1[i] > a2[i] ? 1 : -1;
	}
	return 0;
    });
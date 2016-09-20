/**
 * @param {string} path
 * @return {?}
 */
function require(path) {
    var module = require.modules[path];
    if (!module) {
        throw new Error('failed to require "' + path + '"');
    }
    return "exports" in module || ("function" != typeof module.definition || (module.client = module.component = true, module.definition.call(this, module.exports = {}, module), delete module.definition)), module.exports;
}
require.loader = "component", require.helper = {}, require.helper.semVerSort = function(m, data) {
    var codeSegments = m.version.split(".");
    var a = data.version.split(".");
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;++i) {
        /** @type {number} */
        var x = parseInt(codeSegments[i], 10);
        /** @type {number} */
        var y = parseInt(a[i], 10);
        if (x !== y) {
            return x > y ? 1 : -1;
        }
        var lastUrlChar = codeSegments[i].substr(("" + x).length);
        var last4UrlChars = a[i].substr(("" + y).length);
        if ("" === lastUrlChar && "" !== last4UrlChars) {
            return 1;
        }
        if ("" !== lastUrlChar && "" === last4UrlChars) {
            return-1;
        }
        if ("" !== lastUrlChar && "" !== last4UrlChars) {
            return lastUrlChar > last4UrlChars ? 1 : -1;
        }
    }
    return 0;
}, require.latest = function(qualifier, shouldTypecast) {
    /**
     * @param {string} str
     * @return {?}
     */
    function parseError(str) {
        throw new Error('failed to find latest module of "' + str + '"');
    }
    /** @type {RegExp} */
    var current = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;
    /** @type {RegExp} */
    var isSimple = /(.*)~(.*)/;
    if (!isSimple.test(qualifier)) {
        parseError(qualifier);
    }
    /** @type {Array.<string>} */
    var codeSegments = Object.keys(require.modules);
    /** @type {Array} */
    var matches = [];
    /** @type {Array} */
    var results = [];
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
        /** @type {string} */
        var file = codeSegments[i];
        if ((new RegExp(qualifier + "@")).test(file)) {
            /** @type {string} */
            var CORDOVA_JS_BUILD_LABEL = file.substr(qualifier.length + 1);
            /** @type {(Array.<string>|null)} */
            var readStream = current.exec(file);
            if (null != readStream) {
                matches.push({
                    version : CORDOVA_JS_BUILD_LABEL,
                    name : file
                });
            } else {
                results.push({
                    version : CORDOVA_JS_BUILD_LABEL,
                    name : file
                });
            }
        }
    }
    if (0 === matches.concat(results).length && parseError(qualifier), matches.length > 0) {
        var val = matches.sort(require.helper.semVerSort).pop().name;
        return shouldTypecast === true ? val : require(val);
    }
    val = results.sort(function(a, b) {
        return a.name > b.name;
    })[0].name;
    return shouldTypecast === true ? val : require(val);
}, require.modules = {}, require.register = function(path, definition) {
    require.modules[path] = {
        /** @type {Function} */
        definition : definition
    };
}, require.define = function(id, exports) {
    require.modules[id] = {
        exports : exports
    };
}, require.register("./lib/underscore", function(exports, module) {
    (function() {
        var root = this;
        var previousUnderscore = root._;
        var ArrayProto = Array.prototype;
        var ObjProto = Object.prototype;
        var FuncProto = Function.prototype;
        /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
        var push = ArrayProto.push;
        /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
        var slice = ArrayProto.slice;
        /** @type {function (this:*, ...[*]): Array} */
        var concat = ArrayProto.concat;
        /** @type {function (this:*): string} */
        var toString = ObjProto.toString;
        /** @type {function (this:Object, *): boolean} */
        var hasOwnProperty = ObjProto.hasOwnProperty;
        /** @type {function (*): boolean} */
        var nativeIsArray = Array.isArray;
        /** @type {function (Object): Array.<string>} */
        var nativeKeys = Object.keys;
        /** @type {function (this:Function, (Object|null|undefined), ...[*]): Function} */
        var nativeBind = FuncProto.bind;
        /**
         * @param {?} obj
         * @return {?}
         */
        var _ = function(obj) {
            return obj instanceof _ ? obj : this instanceof _ ? void(this._wrapped = obj) : new _(obj);
        };
        if ("undefined" != typeof exports) {
            if ("undefined" != typeof module) {
                if (module.exports) {
                    /** @type {function (?): ?} */
                    exports = module.exports = _;
                }
            }
            /** @type {function (?): ?} */
            exports._ = _;
        } else {
            /** @type {function (?): ?} */
            root._ = _;
        }
        /** @type {string} */
        _.VERSION = "1.7.0";
        /**
         * @param {Function} fn
         * @param {number} thisArg
         * @param {number} expectedNumberOfNonCommentArgs
         * @return {?}
         */
        var bind = function(fn, thisArg, expectedNumberOfNonCommentArgs) {
            if (void 0 === thisArg) {
                return fn;
            }
            switch(null == expectedNumberOfNonCommentArgs ? 3 : expectedNumberOfNonCommentArgs) {
                case 1:
                    return function(Class) {
                        return fn.call(thisArg, Class);
                    };
                case 2:
                    return function(Class, index) {
                        return fn.call(thisArg, Class, index);
                    };
                case 3:
                    return function(Class, index, computed) {
                        return fn.call(thisArg, Class, index, computed);
                    };
                case 4:
                    return function(Class, index, computed, arr) {
                        return fn.call(thisArg, Class, index, computed, arr);
                    };
            }
            return function() {
                return fn.apply(thisArg, arguments);
            };
        };
        /**
         * @param {Object} func
         * @param {string} thisArg
         * @param {number} expectedNumberOfNonCommentArgs
         * @return {?}
         */
        _.iteratee = function(func, thisArg, expectedNumberOfNonCommentArgs) {
            return null == func ? _.identity : _.isFunction(func) ? bind(func, thisArg, expectedNumberOfNonCommentArgs) : _.isObject(func) ? _.matches(func) : _.property(func);
        };
        /** @type {function (Function, Function, number): ?} */
        _.each = _.forEach = function(obj, callback, thisArg) {
            if (null == obj) {
                return obj;
            }
            callback = bind(callback, thisArg);
            var i;
            var l = obj.length;
            if (l === +l) {
                /** @type {number} */
                i = 0;
                for (;l > i;i++) {
                    callback(obj[i], i, obj);
                }
            } else {
                var items = _.keys(obj);
                /** @type {number} */
                i = 0;
                l = items.length;
                for (;l > i;i++) {
                    callback(obj[items[i]], items[i], obj);
                }
            }
            return obj;
        };
        /** @type {function (Object, Function, string): ?} */
        _.map = _.collect = function(obj, callback, thisArg) {
            if (null == obj) {
                return[];
            }
            callback = _.iteratee(callback, thisArg);
            var value;
            var list = obj.length !== +obj.length && _.keys(obj);
            var length = (list || obj).length;
            /** @type {Array} */
            var results = Array(length);
            /** @type {number} */
            var index = 0;
            for (;length > index;index++) {
                value = list ? list[index] : index;
                results[index] = callback(obj[value], value, obj);
            }
            return results;
        };
        /** @type {string} */
        var reduceError = "Reduce of empty array with no initial value";
        /** @type {function (Object, ?, Text, number): ?} */
        _.reduce = _.foldl = _.inject = function(obj, callback, memo, thisArg) {
            if (null == obj) {
                /** @type {Array} */
                obj = [];
            }
            callback = bind(callback, thisArg, 4);
            var i;
            var list = obj.length !== +obj.length && _.keys(obj);
            var cnl = (list || obj).length;
            /** @type {number} */
            var value = 0;
            if (arguments.length < 3) {
                if (!cnl) {
                    throw new TypeError(reduceError);
                }
                memo = obj[list ? list[value++] : value++];
            }
            for (;cnl > value;value++) {
                i = list ? list[value] : value;
                memo = callback(memo, obj[i], i, obj);
            }
            return memo;
        };
        /** @type {function (Object, ?, Text, number): ?} */
        _.reduceRight = _.foldr = function(obj, callback, r, thisArg) {
            if (null == obj) {
                /** @type {Array} */
                obj = [];
            }
            callback = bind(callback, thisArg, 4);
            var i;
            var props = obj.length !== +obj.length && _.keys(obj);
            var length = (props || obj).length;
            if (arguments.length < 3) {
                if (!length) {
                    throw new TypeError(reduceError);
                }
                r = obj[props ? props[--length] : --length];
            }
            for (;length--;) {
                i = props ? props[length] : length;
                r = callback(r, obj[i], i, obj);
            }
            return r;
        };
        /** @type {function (?, Error, string): ?} */
        _.find = _.detect = function(array, iterator, context) {
            var msg;
            return iterator = _.iteratee(iterator, context), _.some(array, function(type, x, list) {
                return iterator(type, x, list) ? (msg = type, true) : void 0;
            }), msg;
        };
        /** @type {function (?, Function, string): ?} */
        _.filter = _.select = function(obj, callback, thisArg) {
            /** @type {Array} */
            var arr = [];
            return null == obj ? arr : (callback = _.iteratee(callback, thisArg), _.each(obj, function(chunk, mongoObject, arg) {
                if (callback(chunk, mongoObject, arg)) {
                    arr.push(chunk);
                }
            }), arr);
        };
        /**
         * @param {?} qualifier
         * @param {Object} obj
         * @param {string} thisArg
         * @return {?}
         */
        _.reject = function(qualifier, obj, thisArg) {
            return _.filter(qualifier, _.negate(_.iteratee(obj)), thisArg);
        };
        /** @type {function (Object, Object, string): ?} */
        _.every = _.all = function(array, callback, thisArg) {
            if (null == array) {
                return true;
            }
            callback = _.iteratee(callback, thisArg);
            var value;
            var index;
            var list = array.length !== +array.length && _.keys(array);
            var cnl = (list || array).length;
            /** @type {number} */
            value = 0;
            for (;cnl > value;value++) {
                if (index = list ? list[value] : value, !callback(array[index], index, array)) {
                    return false;
                }
            }
            return true;
        };
        /** @type {function (Object, Object, string): ?} */
        _.some = _.any = function(array, callback, thisArg) {
            if (null == array) {
                return false;
            }
            callback = _.iteratee(callback, thisArg);
            var value;
            var index;
            var list = array.length !== +array.length && _.keys(array);
            var cnl = (list || array).length;
            /** @type {number} */
            value = 0;
            for (;cnl > value;value++) {
                if (index = list ? list[value] : value, callback(array[index], index, array)) {
                    return true;
                }
            }
            return false;
        };
        /** @type {function (?, Object): ?} */
        _.contains = _.include = function(val, item) {
            return null == val ? false : (val.length !== +val.length && (val = _.values(val)), _.indexOf(val, item) >= 0);
        };
        /**
         * @param {?} obj
         * @param {?} method
         * @return {?}
         */
        _.invoke = function(obj, method) {
            /** @type {Array.<?>} */
            var args = slice.call(arguments, 2);
            var isFunc = _.isFunction(method);
            return _.map(obj, function(value) {
                return(isFunc ? method : value[method]).apply(value, args);
            });
        };
        /**
         * @param {Object} obj
         * @param {(number|string)} key
         * @return {?}
         */
        _.pluck = function(obj, key) {
            return _.map(obj, _.property(key));
        };
        /**
         * @param {?} qualifier
         * @param {Object} attrs
         * @return {?}
         */
        _.where = function(qualifier, attrs) {
            return _.filter(qualifier, _.matches(attrs));
        };
        /**
         * @param {?} parts
         * @param {Object} attrs
         * @return {?}
         */
        _.findWhere = function(parts, attrs) {
            return _.find(parts, _.matches(attrs));
        };
        /**
         * @param {Object} a
         * @param {number} callback
         * @param {string} thisArg
         * @return {?}
         */
        _.max = function(a, callback, thisArg) {
            var next;
            var ret;
            /** @type {number} */
            var max = -(1 / 0);
            /** @type {number} */
            var val = -(1 / 0);
            if (null == callback && null != a) {
                a = a.length === +a.length ? a : _.values(a);
                /** @type {number} */
                var idx = 0;
                var al = a.length;
                for (;al > idx;idx++) {
                    next = a[idx];
                    if (next > max) {
                        max = next;
                    }
                }
            } else {
                callback = _.iteratee(callback, thisArg);
                _.each(a, function(a, value, stat) {
                    ret = callback(a, value, stat);
                    if (ret > val || ret === -(1 / 0) && max === -(1 / 0)) {
                        /** @type {number} */
                        max = a;
                        val = ret;
                    }
                });
            }
            return max;
        };
        /**
         * @param {?} a
         * @param {number} iterator
         * @param {string} context
         * @return {?}
         */
        _.min = function(a, iterator, context) {
            var max;
            var i;
            /** @type {number} */
            var value = 1 / 0;
            /** @type {number} */
            var min = 1 / 0;
            if (null == iterator && null != a) {
                a = a.length === +a.length ? a : _.values(a);
                /** @type {number} */
                var count = 0;
                var al = a.length;
                for (;al > count;count++) {
                    max = a[count];
                    if (value > max) {
                        value = max;
                    }
                }
            } else {
                iterator = _.iteratee(iterator, context);
                _.each(a, function(x, opt_obj2, capture) {
                    i = iterator(x, opt_obj2, capture);
                    if (min > i || i === 1 / 0 && value === 1 / 0) {
                        /** @type {number} */
                        value = x;
                        min = i;
                    }
                });
            }
            return value;
        };
        /**
         * @param {string} obj
         * @return {?}
         */
        _.shuffle = function(obj) {
            var j;
            var values = obj && obj.length === +obj.length ? obj : _.values(obj);
            var n = values.length;
            /** @type {Array} */
            var result = Array(n);
            /** @type {number} */
            var i = 0;
            for (;n > i;i++) {
                j = _.random(0, i);
                if (j !== i) {
                    result[i] = result[j];
                }
                result[j] = values[i];
            }
            return result;
        };
        /**
         * @param {string} obj
         * @param {number} n
         * @param {boolean} guard
         * @return {?}
         */
        _.sample = function(obj, n, guard) {
            return null == n || guard ? (obj.length !== +obj.length && (obj = _.values(obj)), obj[_.random(obj.length - 1)]) : _.shuffle(obj).slice(0, Math.max(0, n));
        };
        /**
         * @param {Object} obj
         * @param {Error} iterator
         * @param {string} context
         * @return {?}
         */
        _.sortBy = function(obj, iterator, context) {
            return iterator = _.iteratee(iterator, context), _.pluck(_.map(obj, function(value, index, i) {
                return{
                    value : value,
                    index : index,
                    criteria : iterator(value, index, i)
                };
            }).sort(function(left, right) {
                var a = left.criteria;
                var b = right.criteria;
                if (a !== b) {
                    if (a > b || void 0 === a) {
                        return 1;
                    }
                    if (b > a || void 0 === b) {
                        return-1;
                    }
                }
                return left.index - right.index;
            }), "value");
        };
        /**
         * @param {Function} behavior
         * @return {?}
         */
        var group = function(behavior) {
            return function(which, callback, thisArg) {
                var result = {};
                return callback = _.iteratee(callback, thisArg), _.each(which, function(key, i) {
                    var value = callback(key, i, which);
                    behavior(result, key, value);
                }), result;
            };
        };
        _.groupBy = group(function(result, value, key) {
            if (_.has(result, key)) {
                result[key].push(value);
            } else {
                /** @type {Array} */
                result[key] = [value];
            }
        });
        _.indexBy = group(function(qs, val, i) {
            qs[i] = val;
        });
        _.countBy = group(function(result, dataAndEvents, key) {
            if (_.has(result, key)) {
                result[key]++;
            } else {
                /** @type {number} */
                result[key] = 1;
            }
        });
        /**
         * @param {Array} array
         * @param {Object} obj
         * @param {Error} callback
         * @param {string} thisArg
         * @return {?}
         */
        _.sortedIndex = function(array, obj, callback, thisArg) {
            callback = _.iteratee(callback, thisArg, 1);
            var value = callback(obj);
            /** @type {number} */
            var low = 0;
            var high = array.length;
            for (;high > low;) {
                /** @type {number} */
                var mid = low + high >>> 1;
                if (callback(array[mid]) < value) {
                    /** @type {number} */
                    low = mid + 1;
                } else {
                    /** @type {number} */
                    high = mid;
                }
            }
            return low;
        };
        /**
         * @param {string} obj
         * @return {?}
         */
        _.toArray = function(obj) {
            return obj ? _.isArray(obj) ? slice.call(obj) : obj.length === +obj.length ? _.map(obj, _.identity) : _.values(obj) : [];
        };
        /**
         * @param {string} obj
         * @return {?}
         */
        _.size = function(obj) {
            return null == obj ? 0 : obj.length === +obj.length ? obj.length : _.keys(obj).length;
        };
        /**
         * @param {Function} which
         * @param {Error} iterator
         * @param {string} context
         * @return {?}
         */
        _.partition = function(which, iterator, context) {
            iterator = _.iteratee(iterator, context);
            /** @type {Array} */
            var trues = [];
            /** @type {Array} */
            var falses = [];
            return _.each(which, function(value, index, list) {
                (iterator(value, index, list) ? trues : falses).push(value);
            }), [trues, falses];
        };
        /** @type {function (?, number, boolean): ?} */
        _.first = _.head = _.take = function(array, n, guard) {
            return null == array ? void 0 : null == n || guard ? array[0] : 0 > n ? [] : slice.call(array, 0, n);
        };
        /**
         * @param {Array} array
         * @param {number} t
         * @param {boolean} r
         * @return {?}
         */
        _.initial = function(array, t, r) {
            return slice.call(array, 0, Math.max(0, array.length - (null == t || r ? 1 : t)));
        };
        /**
         * @param {string} array
         * @param {number} n
         * @param {Object} guard
         * @return {?}
         */
        _.last = function(array, n, guard) {
            return null == array ? void 0 : null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0));
        };
        /** @type {function (?, number, boolean): ?} */
        _.rest = _.tail = _.drop = function(array, t, r) {
            return slice.call(array, null == t || r ? 1 : t);
        };
        /**
         * @param {?} array
         * @return {?}
         */
        _.compact = function(array) {
            return _.filter(array, _.identity);
        };
        /**
         * @param {Object} input
         * @param {boolean} shallow
         * @param {boolean} recurring
         * @param {Array} output
         * @return {?}
         */
        var flatten = function(input, shallow, recurring, output) {
            if (shallow && _.every(input, _.isArray)) {
                return concat.apply(output, input);
            }
            /** @type {number} */
            var b = 0;
            var i = input.length;
            for (;i > b;b++) {
                var value = input[b];
                if (_.isArray(value) || _.isArguments(value)) {
                    if (shallow) {
                        push.apply(output, value);
                    } else {
                        flatten(value, shallow, recurring, output);
                    }
                } else {
                    if (!recurring) {
                        output.push(value);
                    }
                }
            }
            return output;
        };
        /**
         * @param {Object} array
         * @param {boolean} shallow
         * @return {?}
         */
        _.flatten = function(array, shallow) {
            return flatten(array, shallow, false, []);
        };
        /**
         * @param {?} array
         * @return {?}
         */
        _.without = function(array) {
            return _.difference(array, slice.call(arguments, 1));
        };
        /** @type {function (Object, string, string, string): ?} */
        _.uniq = _.unique = function(array, isSorted, iterator, context) {
            if (null == array) {
                return[];
            }
            if (!_.isBoolean(isSorted)) {
                /** @type {string} */
                context = iterator;
                /** @type {string} */
                iterator = isSorted;
                /** @type {boolean} */
                isSorted = false;
            }
            if (null != iterator) {
                iterator = _.iteratee(iterator, context);
            }
            /** @type {Array} */
            var results = [];
            /** @type {Array} */
            var seen = [];
            /** @type {number} */
            var i = 0;
            var l = array.length;
            for (;l > i;i++) {
                var value = array[i];
                if (isSorted) {
                    if (!(i && seen === value)) {
                        results.push(value);
                    }
                    seen = value;
                } else {
                    if (iterator) {
                        var key = iterator(value, i, array);
                        if (_.indexOf(seen, key) < 0) {
                            seen.push(key);
                            results.push(value);
                        }
                    } else {
                        if (_.indexOf(results, value) < 0) {
                            results.push(value);
                        }
                    }
                }
            }
            return results;
        };
        /**
         * @return {?}
         */
        _.union = function() {
            return _.uniq(flatten(arguments, true, true, []));
        };
        /**
         * @param {Object} array
         * @return {?}
         */
        _.intersection = function(array) {
            if (null == array) {
                return[];
            }
            /** @type {Array} */
            var result = [];
            /** @type {number} */
            var l = arguments.length;
            /** @type {number} */
            var randomIndex = 0;
            var array_length = array.length;
            for (;array_length > randomIndex;randomIndex++) {
                var value = array[randomIndex];
                if (!_.contains(result, value)) {
                    /** @type {number} */
                    var i = 1;
                    for (;l > i && _.contains(arguments[i], value);i++) {
                    }
                    if (i === l) {
                        result.push(value);
                    }
                }
            }
            return result;
        };
        /**
         * @param {?} array
         * @return {?}
         */
        _.difference = function(array) {
            var content = flatten(slice.call(arguments, 1), true, true, []);
            return _.filter(array, function(item) {
                return!_.contains(content, item);
            });
        };
        /**
         * @param {number} var_args
         * @return {?}
         */
        _.zip = function(var_args) {
            if (null == var_args) {
                return[];
            }
            var indents = _.max(arguments, "length").length;
            /** @type {Array} */
            var result = Array(indents);
            /** @type {number} */
            var key = 0;
            for (;indents > key;key++) {
                result[key] = _.pluck(arguments, key);
            }
            return result;
        };
        /**
         * @param {Object} list
         * @param {Array} values
         * @return {?}
         */
        _.object = function(list, values) {
            if (null == list) {
                return{};
            }
            var result = {};
            /** @type {number} */
            var i = 0;
            var len = list.length;
            for (;len > i;i++) {
                if (values) {
                    result[list[i]] = values[i];
                } else {
                    result[list[i][0]] = list[i][1];
                }
            }
            return result;
        };
        /**
         * @param {?} arr
         * @param {Object} item
         * @param {number} from
         * @return {?}
         */
        _.indexOf = function(arr, item, from) {
            if (null == arr) {
                return-1;
            }
            /** @type {number} */
            var i = 0;
            var len = arr.length;
            if (from) {
                if ("number" != typeof from) {
                    return i = _.sortedIndex(arr, item), arr[i] === item ? i : -1;
                }
                /** @type {number} */
                i = 0 > from ? Math.max(0, len + from) : from;
            }
            for (;len > i;i++) {
                if (arr[i] === item) {
                    return i;
                }
            }
            return-1;
        };
        /**
         * @param {string} haystack
         * @param {?} needle
         * @param {number} index
         * @return {?}
         */
        _.lastIndexOf = function(haystack, needle, index) {
            if (null == haystack) {
                return-1;
            }
            var i = haystack.length;
            if ("number" == typeof index) {
                i = 0 > index ? i + index + 1 : Math.min(i, index + 1);
            }
            for (;--i >= 0;) {
                if (haystack[i] === needle) {
                    return i;
                }
            }
            return-1;
        };
        /**
         * @param {number} start
         * @param {number} stop
         * @param {number} step
         * @return {?}
         */
        _.range = function(start, stop, step) {
            if (arguments.length <= 1) {
                stop = start || 0;
                /** @type {number} */
                start = 0;
            }
            step = step || 1;
            /** @type {number} */
            var length = Math.max(Math.ceil((stop - start) / step), 0);
            /** @type {Array} */
            var result = Array(length);
            /** @type {number} */
            var i = 0;
            for (;length > i;i++, start += step) {
                /** @type {number} */
                result[i] = start;
            }
            return result;
        };
        /**
         * @return {undefined}
         */
        var noop = function() {
        };
        /**
         * @param {Function} func
         * @param {Function=} callback
         * @return {function (...[?]): ?}
         */
        _.bind = function(func, callback) {
            var args;
            var bound;
            if (nativeBind && func.bind === nativeBind) {
                return nativeBind.apply(func, slice.call(arguments, 1));
            }
            if (!_.isFunction(func)) {
                throw new TypeError("Bind must be called on a function");
            }
            return args = slice.call(arguments, 2), bound = function() {
                if (!(this instanceof bound)) {
                    return func.apply(callback, args.concat(slice.call(arguments)));
                }
                noop.prototype = func.prototype;
                var thisBinding = new noop;
                /** @type {null} */
                noop.prototype = null;
                var result = func.apply(thisBinding, args.concat(slice.call(arguments)));
                return _.isObject(result) ? result : thisBinding;
            };
        };
        /**
         * @param {Function} func
         * @return {?}
         */
        _.partial = function(func) {
            /** @type {Array.<?>} */
            var funcs = slice.call(arguments, 1);
            return function() {
                /** @type {number} */
                var x = 0;
                /** @type {Array.<?>} */
                var args = funcs.slice();
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var len = args.length;
                for (;len > i;i++) {
                    if (args[i] === _) {
                        args[i] = arguments[x++];
                    }
                }
                for (;x < arguments.length;) {
                    args.push(arguments[x++]);
                }
                return func.apply(this, args);
            };
        };
        /**
         * @param {Object} obj
         * @return {?}
         */
        _.bindAll = function(obj) {
            var i;
            var f;
            /** @type {number} */
            var l = arguments.length;
            if (1 >= l) {
                throw new Error("bindAll must be passed function names");
            }
            /** @type {number} */
            i = 1;
            for (;l > i;i++) {
                f = arguments[i];
                obj[f] = _.bind(obj[f], obj);
            }
            return obj;
        };
        /**
         * @param {Function} matcherFunction
         * @param {(Function|string)} resolver
         * @return {?}
         */
        _.memoize = function(matcherFunction, resolver) {
            /**
             * @param {(Function|string)} success
             * @return {?}
             */
            var require = function(success) {
                var cache = require.cache;
                var key = resolver ? resolver.apply(this, arguments) : success;
                return _.has(cache, key) || (cache[key] = matcherFunction.apply(this, arguments)), cache[key];
            };
            return require.cache = {}, require;
        };
        /**
         * @param {Function} func
         * @param {?} wait
         * @return {?}
         */
        _.delay = function(func, wait) {
            /** @type {Array.<?>} */
            var args = slice.call(arguments, 2);
            return setTimeout(function() {
                return func.apply(null, args);
            }, wait);
        };
        /**
         * @param {?} fnc
         * @return {?}
         */
        _.defer = function(fnc) {
            return _.delay.apply(_, [fnc, 1].concat(slice.call(arguments, 1)));
        };
        /**
         * @param {Function} func
         * @param {number} wait
         * @param {Object} options
         * @return {?}
         */
        _.throttle = function(func, wait, options) {
            var context;
            var args;
            var result;
            /** @type {null} */
            var timeout = null;
            /** @type {number} */
            var previous = 0;
            if (!options) {
                options = {};
            }
            /**
             * @return {undefined}
             */
            var later = function() {
                /** @type {number} */
                previous = options.leading === false ? 0 : _.now();
                /** @type {null} */
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) {
                    /** @type {null} */
                    context = args = null;
                }
            };
            return function() {
                /** @type {number} */
                var now = _.now();
                if (!previous) {
                    if (!(options.leading !== false)) {
                        /** @type {number} */
                        previous = now;
                    }
                }
                /** @type {number} */
                var remaining = wait - (now - previous);
                return context = this, args = arguments, 0 >= remaining || remaining > wait ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args), timeout || (context = args = null)) : timeout || (options.trailing === false || (timeout = setTimeout(later, remaining))), result;
            };
        };
        /**
         * @param {Function} func
         * @param {number} wait
         * @param {boolean} immediate
         * @return {?}
         */
        _.debounce = function(func, wait, immediate) {
            var timeout;
            var args;
            var context;
            var lastAnimationTime;
            var result;
            /**
             * @return {undefined}
             */
            var delayed = function() {
                /** @type {number} */
                var timeDiff = _.now() - lastAnimationTime;
                if (wait > timeDiff && timeDiff > 0) {
                    /** @type {number} */
                    timeout = setTimeout(delayed, wait - timeDiff);
                } else {
                    /** @type {null} */
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                        if (!timeout) {
                            /** @type {null} */
                            context = args = null;
                        }
                    }
                }
            };
            return function() {
                context = this;
                /** @type {Arguments} */
                args = arguments;
                /** @type {number} */
                lastAnimationTime = _.now();
                var callNow = immediate && !timeout;
                return timeout || (timeout = setTimeout(delayed, wait)), callNow && (result = func.apply(context, args), context = args = null), result;
            };
        };
        /**
         * @param {?} func
         * @param {Function} wrapper
         * @return {?}
         */
        _.wrap = function(func, wrapper) {
            return _.partial(wrapper, func);
        };
        /**
         * @param {Function} matcherFunction
         * @return {?}
         */
        _.negate = function(matcherFunction) {
            return function() {
                return!matcherFunction.apply(this, arguments);
            };
        };
        /**
         * @return {?}
         */
        _.compose = function() {
            /** @type {Arguments} */
            var functions = arguments;
            /** @type {number} */
            var i = functions.length - 1;
            return function() {
                /** @type {number} */
                var k = i;
                var result = functions[i].apply(this, arguments);
                for (;k--;) {
                    result = functions[k].call(this, result);
                }
                return result;
            };
        };
        /**
         * @param {?} times
         * @param {Function} matcherFunction
         * @return {?}
         */
        _.after = function(times, matcherFunction) {
            return function() {
                return--times < 1 ? matcherFunction.apply(this, arguments) : void 0;
            };
        };
        /**
         * @param {?} object
         * @param {(Function|number)} matcherFunction
         * @return {?}
         */
        _.before = function(object, matcherFunction) {
            var returnValue;
            return function() {
                return--object > 0 ? returnValue = matcherFunction.apply(this, arguments) : matcherFunction = null, returnValue;
            };
        };
        _.once = _.partial(_.before, 2);
        /**
         * @param {Function} obj
         * @return {?}
         */
        _.keys = function(obj) {
            if (!_.isObject(obj)) {
                return[];
            }
            if (nativeKeys) {
                return nativeKeys(obj);
            }
            /** @type {Array} */
            var ret = [];
            var key;
            for (key in obj) {
                if (_.has(obj, key)) {
                    ret.push(key);
                }
            }
            return ret;
        };
        /**
         * @param {?} obj
         * @return {?}
         */
        _.values = function(obj) {
            var keys = _.keys(obj);
            var length = keys.length;
            /** @type {Array} */
            var result = Array(length);
            /** @type {number} */
            var i = 0;
            for (;length > i;i++) {
                result[i] = obj[keys[i]];
            }
            return result;
        };
        /**
         * @param {Function} obj
         * @return {?}
         */
        _.pairs = function(obj) {
            var keys = _.keys(obj);
            var length = keys.length;
            /** @type {Array} */
            var result = Array(length);
            /** @type {number} */
            var i = 0;
            for (;length > i;i++) {
                /** @type {Array} */
                result[i] = [keys[i], obj[keys[i]]];
            }
            return result;
        };
        /**
         * @param {Function} obj
         * @return {?}
         */
        _.invert = function(obj) {
            var result = {};
            var keys = _.keys(obj);
            /** @type {number} */
            var i = 0;
            var len = keys.length;
            for (;len > i;i++) {
                result[obj[keys[i]]] = keys[i];
            }
            return result;
        };
        /** @type {function (Object): ?} */
        _.functions = _.methods = function(obj) {
            /** @type {Array} */
            var keys = [];
            var key;
            for (key in obj) {
                if (_.isFunction(obj[key])) {
                    keys.push(key);
                }
            }
            return keys.sort();
        };
        /**
         * @param {?} obj
         * @return {?}
         */
        _.extend = function(obj) {
            if (!_.isObject(obj)) {
                return obj;
            }
            var source;
            var key;
            /** @type {number} */
            var i = 1;
            /** @type {number} */
            var l = arguments.length;
            for (;l > i;i++) {
                source = arguments[i];
                for (key in source) {
                    if (hasOwnProperty.call(source, key)) {
                        obj[key] = source[key];
                    }
                }
            }
            return obj;
        };
        /**
         * @param {Object} obj
         * @param {Function} callback
         * @param {number} thisArg
         * @return {?}
         */
        _.pick = function(obj, callback, thisArg) {
            var key;
            var copy = {};
            if (null == obj) {
                return copy;
            }
            if (_.isFunction(callback)) {
                callback = bind(callback, thisArg);
                for (key in obj) {
                    var val = obj[key];
                    if (callback(val, key, obj)) {
                        copy[key] = val;
                    }
                }
            } else {
                /** @type {Array} */
                var tmp_keys = concat.apply([], slice.call(arguments, 1));
                /** @type {Object} */
                obj = new Object(obj);
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var l = tmp_keys.length;
                for (;l > i;i++) {
                    key = tmp_keys[i];
                    if (key in obj) {
                        copy[key] = obj[key];
                    }
                }
            }
            return copy;
        };
        /**
         * @param {Object} obj
         * @param {Function} callback
         * @param {number} thisArg
         * @return {?}
         */
        _.omit = function(obj, callback, thisArg) {
            if (_.isFunction(callback)) {
                callback = _.negate(callback);
            } else {
                var type = _.map(concat.apply([], slice.call(arguments, 1)), String);
                /**
                 * @param {?} __
                 * @param {Object} key
                 * @return {?}
                 */
                callback = function(__, key) {
                    return!_.contains(type, key);
                };
            }
            return _.pick(obj, callback, thisArg);
        };
        /**
         * @param {Object} object
         * @return {?}
         */
        _.defaults = function(object) {
            if (!_.isObject(object)) {
                return object;
            }
            /** @type {number} */
            var argsIndex = 1;
            /** @type {number} */
            var argLength = arguments.length;
            for (;argLength > argsIndex;argsIndex++) {
                var iterable = arguments[argsIndex];
                var key;
                for (key in iterable) {
                    if (void 0 === object[key]) {
                        object[key] = iterable[key];
                    }
                }
            }
            return object;
        };
        /**
         * @param {Object} obj
         * @return {?}
         */
        _.clone = function(obj) {
            return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj;
        };
        /**
         * @param {?} n
         * @param {?} t
         * @return {?}
         */
        _.tap = function(n, t) {
            return t(n), n;
        };
        /**
         * @param {?} a
         * @param {?} b
         * @param {Array} aStack
         * @param {Array} bStack
         * @return {?}
         */
        var eq = function(a, b, aStack, bStack) {
            if (a === b) {
                return 0 !== a || 1 / a === 1 / b;
            }
            if (null == a || null == b) {
                return a === b;
            }
            if (a instanceof _) {
                a = a._wrapped;
            }
            if (b instanceof _) {
                b = b._wrapped;
            }
            /** @type {string} */
            var aArray = toString.call(a);
            if (aArray !== toString.call(b)) {
                return false;
            }
            switch(aArray) {
                case "[object RegExp]":
                    ;
                case "[object String]":
                    return "" + a == "" + b;
                case "[object Number]":
                    return+a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
                case "[object Date]":
                    ;
                case "[object Boolean]":
                    return+a === +b;
            }
            if ("object" != typeof a || "object" != typeof b) {
                return false;
            }
            var length = aStack.length;
            for (;length--;) {
                if (aStack[length] === a) {
                    return bStack[length] === b;
                }
            }
            var aCtor = a.constructor;
            var bCtor = b.constructor;
            if (aCtor !== bCtor && ("constructor" in a && ("constructor" in b && !(_.isFunction(aCtor) && (aCtor instanceof aCtor && (_.isFunction(bCtor) && bCtor instanceof bCtor)))))) {
                return false;
            }
            aStack.push(a);
            bStack.push(b);
            var i;
            var result;
            if ("[object Array]" === aArray) {
                if (i = a.length, result = i === b.length) {
                    for (;i-- && (result = eq(a[i], b[i], aStack, bStack));) {
                    }
                }
            } else {
                var key;
                var keys = _.keys(a);
                if (i = keys.length, result = _.keys(b).length === i) {
                    for (;i-- && (key = keys[i], result = _.has(b, key) && eq(a[key], b[key], aStack, bStack));) {
                    }
                }
            }
            return aStack.pop(), bStack.pop(), result;
        };
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        _.isEqual = function(a, b) {
            return eq(a, b, [], []);
        };
        /**
         * @param {?} obj
         * @return {?}
         */
        _.isEmpty = function(obj) {
            if (null == obj) {
                return true;
            }
            if (_.isArray(obj) || (_.isString(obj) || _.isArguments(obj))) {
                return 0 === obj.length;
            }
            var key;
            for (key in obj) {
                if (_.has(obj, key)) {
                    return false;
                }
            }
            return true;
        };
        /**
         * @param {Object} obj
         * @return {?}
         */
        _.isElement = function(obj) {
            return!(!obj || 1 !== obj.nodeType);
        };
        /** @type {function (*): boolean} */
        _.isArray = nativeIsArray || function(obj) {
                return "[object Array]" === toString.call(obj);
            };
        /**
         * @param {Function} obj
         * @return {?}
         */
        _.isObject = function(obj) {
            /** @type {string} */
            var type = typeof obj;
            return "function" === type || "object" === type && !!obj;
        };
        _.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(name) {
            /**
             * @param {?} checkSet
             * @return {?}
             */
            _["is" + name] = function(checkSet) {
                return toString.call(checkSet) === "[object " + name + "]";
            };
        });
        if (!_.isArguments(arguments)) {
            /**
             * @param {Object} obj
             * @return {?}
             */
            _.isArguments = function(obj) {
                return _.has(obj, "callee");
            };
        }
        if ("function" != typeof/./) {
            /**
             * @param {Function} value
             * @return {?}
             */
            _.isFunction = function(value) {
                return "function" == typeof value || false;
            };
        }
        /**
         * @param {?} obj
         * @return {?}
         */
        _.isFinite = function(obj) {
            return isFinite(obj) && !isNaN(parseFloat(obj));
        };
        /**
         * @param {number} i
         * @return {?}
         */
        _.isNaN = function(i) {
            return _.isNumber(i) && i !== +i;
        };
        /**
         * @param {boolean} obj
         * @return {?}
         */
        _.isBoolean = function(obj) {
            return obj === true || (obj === false || "[object Boolean]" === toString.call(obj));
        };
        /**
         * @param {number} obj
         * @return {?}
         */
        _.isNull = function(obj) {
            return null === obj;
        };
        /**
         * @param {number} obj
         * @return {?}
         */
        _.isUndefined = function(obj) {
            return void 0 === obj;
        };
        /**
         * @param {Object} obj
         * @param {string} key
         * @return {?}
         */
        _.has = function(obj, key) {
            return null != obj && hasOwnProperty.call(obj, key);
        };
        /**
         * @return {?}
         */
        _.noConflict = function() {
            return root._ = previousUnderscore, this;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        _.identity = function(value) {
            return value;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        _.constant = function(value) {
            return function() {
                return value;
            };
        };
        /**
         * @return {undefined}
         */
        _.noop = function() {
        };
        /**
         * @param {string} key
         * @return {?}
         */
        _.property = function(key) {
            return function($cookies) {
                return $cookies[key];
            };
        };
        /**
         * @param {Object} obj
         * @return {?}
         */
        _.matches = function(obj) {
            var serialized = _.pairs(obj);
            var len = serialized.length;
            return function(obj) {
                if (null == obj) {
                    return!len;
                }
                /** @type {Object} */
                obj = new Object(obj);
                /** @type {number} */
                var i = 0;
                for (;len > i;i++) {
                    var attrs = serialized[i];
                    var key = attrs[0];
                    if (attrs[1] !== obj[key] || !(key in obj)) {
                        return false;
                    }
                }
                return true;
            };
        };
        /**
         * @param {number} n
         * @param {?} callback
         * @param {number} thisArg
         * @return {?}
         */
        _.times = function(n, callback, thisArg) {
            /** @type {Array} */
            var result = Array(Math.max(0, n));
            callback = bind(callback, thisArg, 1);
            /** @type {number} */
            var i = 0;
            for (;n > i;i++) {
                result[i] = callback(i);
            }
            return result;
        };
        /**
         * @param {number} min
         * @param {number} max
         * @return {?}
         */
        _.random = function(min, max) {
            return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1));
        };
        /** @type {function (): number} */
        _.now = Date.now || function() {
                return(new Date).getTime();
            };
        var i = {
            "&" : "&amp;",
            "<" : "&lt;",
            ">" : "&gt;",
            '"' : "&quot;",
            "'" : "&#x27;",
            "`" : "&#x60;"
        };
        var a = _.invert(i);
        /**
         * @param {Object} result
         * @return {?}
         */
        var process = function(result) {
            /**
             * @param {string} axis
             * @return {?}
             */
            var next = function(axis) {
                return result[axis];
            };
            /** @type {string} */
            var keyword1 = "(?:" + _.keys(result).join("|") + ")";
            /** @type {RegExp} */
            var hChars = RegExp(keyword1);
            /** @type {RegExp} */
            var r20 = RegExp(keyword1, "g");
            return function(s) {
                return s = null == s ? "" : "" + s, hChars.test(s) ? s.replace(r20, next) : s;
            };
        };
        _.escape = process(i);
        _.unescape = process(a);
        /**
         * @param {Object} object
         * @param {string} property
         * @return {?}
         */
        _.result = function(object, property) {
            if (null == object) {
                return void 0;
            }
            var value = object[property];
            return _.isFunction(value) ? object[property]() : value;
        };
        /** @type {number} */
        var idCounter = 0;
        /**
         * @param {?} prefix
         * @return {?}
         */
        _.uniqueId = function(prefix) {
            /** @type {string} */
            var id = ++idCounter + "";
            return prefix ? prefix + id : id;
        };
        _.templateSettings = {
            evaluate : /<%([\s\S]+?)%>/g,
            interpolate : /<%=([\s\S]+?)%>/g,
            escape : /<%-([\s\S]+?)%>/g
        };
        /** @type {RegExp} */
        var noMatch = /(.)^/;
        var escapes = {
            "'" : "'",
            "\\" : "\\",
            "\r" : "r",
            "\n" : "n",
            "\u2028" : "u2028",
            "\u2029" : "u2029"
        };
        /** @type {RegExp} */
        var r20 = /\\|'|\r|\n|\u2028|\u2029/g;
        /**
         * @param {?} match
         * @return {?}
         */
        var escapeStringChar = function(match) {
            return "\\" + escapes[match];
        };
        /**
         * @param {string} text
         * @param {Object} settings
         * @param {Object} data
         * @return {?}
         */
        _.template = function(text, settings, data) {
            if (!settings) {
                if (data) {
                    /** @type {Object} */
                    settings = data;
                }
            }
            settings = _.defaults({}, settings, _.templateSettings);
            /** @type {RegExp} */
            var reDelimiters = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g");
            /** @type {number} */
            var index = 0;
            /** @type {string} */
            var source = "__p+='";
            text.replace(reDelimiters, function(match, dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist, offset) {
                return source += text.slice(index, offset).replace(r20, escapeStringChar), index = offset + match.length, dataAndEvents ? source += "'+\n((__t=(" + dataAndEvents + "))==null?'':_.escape(__t))+\n'" : deepDataAndEvents ? source += "'+\n((__t=(" + deepDataAndEvents + "))==null?'':__t)+\n'" : ignoreMethodDoesntExist && (source += "';\n" + ignoreMethodDoesntExist + "\n__p+='"), match;
            });
            source += "';\n";
            if (!settings.variable) {
                /** @type {string} */
                source = "with(obj||{}){\n" + source + "}\n";
            }
            /** @type {string} */
            source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
            try {
                /** @type {Function} */
                var render = new Function(settings.variable || "obj", "_", source);
            } catch (details) {
                throw details.source = source, details;
            }
            /**
             * @param {?} data
             * @return {?}
             */
            var template = function(data) {
                return render.call(this, data, _);
            };
            var obj = settings.variable || "obj";
            return template.source = "function(" + obj + "){\n" + source + "}", template;
        };
        /**
         * @param {Object} options
         * @return {?}
         */
        _.chain = function(options) {
            var args = _(options);
            return args._chain = true, args;
        };
        /**
         * @param {Object} obj
         * @return {?}
         */
        var result = function(obj) {
            return this._chain ? _(obj).chain() : obj;
        };
        /**
         * @param {Object} obj
         * @return {undefined}
         */
        _.mixin = function(obj) {
            _.each(_.functions(obj), function(name) {
                var wrapper = _[name] = obj[name];
                /**
                 * @return {?}
                 */
                _.prototype[name] = function() {
                    /** @type {Array} */
                    var args = [this._wrapped];
                    return push.apply(args, arguments), result.call(this, wrapper.apply(_, args));
                };
            });
        };
        _.mixin(_);
        _.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
            var method = ArrayProto[name];
            /**
             * @return {?}
             */
            _.prototype[name] = function() {
                var obj = this._wrapped;
                return method.apply(obj, arguments), "shift" !== name && "splice" !== name || (0 !== obj.length || delete obj[0]), result.call(this, obj);
            };
        });
        _.each(["concat", "join", "slice"], function(name) {
            var method = ArrayProto[name];
            /**
             * @return {?}
             */
            _.prototype[name] = function() {
                return result.call(this, method.apply(this._wrapped, arguments));
            };
        });
        /**
         * @return {?}
         */
        _.prototype.value = function() {
            return this._wrapped;
        };
        if ("function" == typeof define) {
            if (define.amd) {
                define("underscore", [], function() {
                    return _;
                });
            }
        }
    }).call(this);
}), require.register("./lib/zepto", function(dataAndEvents, module) {
    var factory = require("./lib/zepto/touch.js");
    var Zepto = function() {
        /**
         * @param {Object} obj
         * @return {?}
         */
        function type(obj) {
            return null == obj ? String(obj) : class2type[core_toString.call(obj)] || "object";
        }
        /**
         * @param {Function} value
         * @return {?}
         */
        function isFunction(value) {
            return "function" == type(value);
        }
        /**
         * @param {Object} obj
         * @return {?}
         */
        function isWindow(obj) {
            return null != obj && obj == obj.window;
        }
        /**
         * @param {Object} obj
         * @return {?}
         */
        function isDocument(obj) {
            return null != obj && obj.nodeType == obj.DOCUMENT_NODE;
        }
        /**
         * @param {Object} obj
         * @return {?}
         */
        function isObject(obj) {
            return "object" == type(obj);
        }
        /**
         * @param {?} obj
         * @return {?}
         */
        function isPlainObject(obj) {
            return isObject(obj) && (!isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype);
        }
        /**
         * @param {string} obj
         * @return {?}
         */
        function likeArray(obj) {
            return "number" == typeof obj.length;
        }
        /**
         * @param {?} array
         * @return {?}
         */
        function compact(array) {
            return filter.call(array, function(dataAndEvents) {
                return null != dataAndEvents;
            });
        }
        /**
         * @param {?} array
         * @return {?}
         */
        function flatten(array) {
            return array.length > 0 ? $.fn.concat.apply([], array) : array;
        }
        /**
         * @param {string} str
         * @return {?}
         */
        function dasherize(str) {
            return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
        }
        /**
         * @param {string} name
         * @return {?}
         */
        function classRE(name) {
            return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)");
        }
        /**
         * @param {string} name
         * @param {number} value
         * @return {?}
         */
        function maybeAddPx(name, value) {
            return "number" != typeof value || cssNumber[dasherize(name)] ? value : value + "px";
        }
        /**
         * @param {?} nodeName
         * @return {?}
         */
        function defaultDisplay(nodeName) {
            var element;
            var display;
            return elementDisplay[nodeName] || (element = doc.createElement(nodeName), doc.body.appendChild(element), display = getComputedStyle(element, "").getPropertyValue("display"), element.parentNode.removeChild(element), "none" == display && (display = "block"), elementDisplay[nodeName] = display), elementDisplay[nodeName];
        }
        /**
         * @param {Element} element
         * @return {?}
         */
        function children(element) {
            return "children" in element ? slice.call(element.children) : $.map(element.childNodes, function(dest) {
                return 1 == dest.nodeType ? dest : void 0;
            });
        }
        /**
         * @param {Object} obj
         * @param {Object} source
         * @param {?} deep
         * @return {undefined}
         */
        function extend(obj, source, deep) {
            for (key in source) {
                if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                    if (isPlainObject(source[key])) {
                        if (!isPlainObject(obj[key])) {
                            obj[key] = {};
                        }
                    }
                    if (isArray(source[key])) {
                        if (!isArray(obj[key])) {
                            /** @type {Array} */
                            obj[key] = [];
                        }
                    }
                    extend(obj[key], source[key], deep);
                } else {
                    if (source[key] !== target) {
                        obj[key] = source[key];
                    }
                }
            }
        }
        /**
         * @param {?} nodes
         * @param {Object} selector
         * @return {?}
         */
        function filtered(nodes, selector) {
            return null == selector ? $(nodes) : $(nodes).filter(selector);
        }
        /**
         * @param {?} context
         * @param {Function} arg
         * @param {?} idx
         * @param {?} payload
         * @return {?}
         */
        function funcArg(context, arg, idx, payload) {
            return isFunction(arg) ? arg.call(context, idx, payload) : arg;
        }
        /**
         * @param {Element} node
         * @param {?} name
         * @param {number} value
         * @return {undefined}
         */
        function setAttribute(node, name, value) {
            if (null == value) {
                node.removeAttribute(name);
            } else {
                node.setAttribute(name, value);
            }
        }
        /**
         * @param {Element} element
         * @param {string} value
         * @return {?}
         */
        function className(element, value) {
            var elem = element.className || "";
            var isParentListItem = elem && elem.baseVal !== target;
            return value === target ? isParentListItem ? elem.baseVal : elem : void(isParentListItem ? elem.baseVal = value : element.className = value);
        }
        /**
         * @param {string} data
         * @return {?}
         */
        function deserializeValue(data) {
            try {
                return data ? "true" == data || ("false" == data ? false : "null" == data ? null : +data + "" == data ? +data : /^[\[\{]/.test(data) ? $.parseJSON(data) : data) : data;
            } catch (e) {
                return data;
            }
        }
        /**
         * @param {Element} node
         * @param {Function} fun
         * @return {undefined}
         */
        function traverseNode(node, fun) {
            fun(node);
            /** @type {number} */
            var key = 0;
            var cnl = node.childNodes.length;
            for (;cnl > key;key++) {
                traverseNode(node.childNodes[key], fun);
            }
        }
        var target;
        var key;
        var $;
        var classList;
        var camelize;
        var uniq;
        /** @type {Array} */
        var emptyArray = [];
        /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
        var slice = emptyArray.slice;
        /** @type {function (this:(Array.<T>|string|{length: number}), (function (this:S, T, number, Array.<T>): ?|null), S=): Array.<T>} */
        var filter = emptyArray.filter;
        /** @type {Document} */
        var doc = window.document;
        var elementDisplay = {};
        var classCache = {};
        var cssNumber = {
            "column-count" : 1,
            columns : 1,
            "font-weight" : 1,
            "line-height" : 1,
            opacity : 1,
            "z-index" : 1,
            zoom : 1
        };
        /** @type {RegExp} */
        var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
        /** @type {RegExp} */
        var BEGIN_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
        /** @type {RegExp} */
        var matchAll = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
        /** @type {RegExp} */
        var rootNodeRE = /^(?:body|html)$/i;
        /** @type {RegExp} */
        var r20 = /([A-Z])/g;
        /** @type {Array} */
        var methodAttributes = ["val", "css", "html", "text", "data", "width", "height", "offset"];
        /** @type {Array} */
        var adjacencyOperators = ["after", "prepend", "before", "append"];
        /** @type {Element} */
        var table = doc.createElement("table");
        /** @type {Element} */
        var tableRow = doc.createElement("tr");
        var containers = {
            tr : doc.createElement("tbody"),
            tbody : table,
            thead : table,
            tfoot : table,
            td : tableRow,
            th : tableRow,
            "*" : doc.createElement("div")
        };
        /** @type {RegExp} */
        var rxReady = /complete|loaded|interactive/;
        /** @type {RegExp} */
        var simpleSelectorRE = /^[\w-]*$/;
        var class2type = {};
        /** @type {function (this:*): string} */
        var core_toString = class2type.toString;
        var zepto = {};
        /** @type {Element} */
        var tempParent = doc.createElement("div");
        var propMap = {
            tabindex : "tabIndex",
            readonly : "readOnly",
            "for" : "htmlFor",
            "class" : "className",
            maxlength : "maxLength",
            cellspacing : "cellSpacing",
            cellpadding : "cellPadding",
            rowspan : "rowSpan",
            colspan : "colSpan",
            usemap : "useMap",
            frameborder : "frameBorder",
            contenteditable : "contentEditable"
        };
        /** @type {function (*): boolean} */
        var isArray = Array.isArray || function(obj) {
                return obj instanceof Array;
            };
        return zepto.matches = function(element, selector) {
            if (!selector || (!element || 1 !== element.nodeType)) {
                return false;
            }
            var matchesSelector = element.webkitMatchesSelector || (element.mozMatchesSelector || (element.oMatchesSelector || element.matchesSelector));
            if (matchesSelector) {
                return matchesSelector.call(element, selector);
            }
            var r;
            var parent = element.parentNode;
            /** @type {boolean} */
            var previousStatus = !parent;
            return previousStatus && (parent = tempParent).appendChild(element), r = ~zepto.qsa(parent, selector).indexOf(element), previousStatus && tempParent.removeChild(element), r;
        }, camelize = function(str) {
            return str.replace(/-+(.)?/g, function(dataAndEvents, chr) {
                return chr ? chr.toUpperCase() : "";
            });
        }, uniq = function(array) {
            return filter.call(array, function(item, index) {
                return array.indexOf(item) == index;
            });
        }, zepto.fragment = function(html, name, properties) {
            var sel;
            var nodes;
            var container;
            return BEGIN_TAG_REGEXP.test(html) && (sel = $(doc.createElement(RegExp.$1))), sel || (html.replace && (html = html.replace(matchAll, "<$1></$2>")), name === target && (name = fragmentRE.test(html) && RegExp.$1), name in containers || (name = "*"), container = containers[name], container.innerHTML = "" + html, sel = $.each(slice.call(container.childNodes), function() {
                container.removeChild(this);
            })), isPlainObject(properties) && (nodes = $(sel), $.each(properties, function(key, value) {
                if (methodAttributes.indexOf(key) > -1) {
                    nodes[key](value);
                } else {
                    nodes.attr(key, value);
                }
            })), sel;
        }, zepto.Z = function(dom, selector) {
            return dom = dom || [], dom.__proto__ = $.fn, dom.selector = selector || "", dom;
        }, zepto.isZ = function(object) {
            return object instanceof zepto.Z;
        }, zepto.init = function(selector, context) {
            var dom;
            if (!selector) {
                return zepto.Z();
            }
            if ("string" == typeof selector) {
                if (selector = selector.trim(), "<" == selector[0] && fragmentRE.test(selector)) {
                    dom = zepto.fragment(selector, RegExp.$1, context);
                    /** @type {null} */
                    selector = null;
                } else {
                    if (context !== target) {
                        return $(context).find(selector);
                    }
                    dom = zepto.qsa(doc, selector);
                }
            } else {
                if (isFunction(selector)) {
                    return $(doc).ready(selector);
                }
                if (zepto.isZ(selector)) {
                    return selector;
                }
                if (isArray(selector)) {
                    dom = compact(selector);
                } else {
                    if (isObject(selector)) {
                        /** @type {Array} */
                        dom = [selector];
                        /** @type {null} */
                        selector = null;
                    } else {
                        if (fragmentRE.test(selector)) {
                            dom = zepto.fragment(selector.trim(), RegExp.$1, context);
                            /** @type {null} */
                            selector = null;
                        } else {
                            if (context !== target) {
                                return $(context).find(selector);
                            }
                            dom = zepto.qsa(doc, selector);
                        }
                    }
                }
            }
            return zepto.Z(dom, selector);
        }, $ = function(selector, context) {
            return zepto.init(selector, context);
        }, $.extend = function(opt_attributes) {
            var deep;
            /** @type {Array.<?>} */
            var fns = slice.call(arguments, 1);
            return "boolean" == typeof opt_attributes && (deep = opt_attributes, opt_attributes = fns.shift()), fns.forEach(function(params) {
                extend(opt_attributes, params, deep);
            }), opt_attributes;
        }, zepto.qsa = function(element, selector) {
            var found;
            /** @type {boolean} */
            var maybeID = "#" == selector[0];
            /** @type {boolean} */
            var maybeClass = !maybeID && "." == selector[0];
            var nameOnly = maybeID || maybeClass ? selector.slice(1) : selector;
            /** @type {boolean} */
            var isSimple = simpleSelectorRE.test(nameOnly);
            return isDocument(element) && (isSimple && maybeID) ? (found = element.getElementById(nameOnly)) ? [found] : [] : 1 !== element.nodeType && 9 !== element.nodeType ? [] : slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : element.getElementsByTagName(selector) : element.querySelectorAll(selector));
        }, $.contains = doc.documentElement.contains ? function(parent, node) {
            return parent !== node && parent.contains(node);
        } : function(object, element) {
            for (;element && (element = element.parentNode);) {
                if (element === object) {
                    return true;
                }
            }
            return false;
        }, $.type = type, $.isFunction = isFunction, $.isWindow = isWindow, $.isArray = isArray, $.isPlainObject = isPlainObject, $.isEmptyObject = function(obj) {
            var prop;
            for (prop in obj) {
                return false;
            }
            return true;
        }, $.inArray = function(i, array, elem) {
            return emptyArray.indexOf.call(array, i, elem);
        }, $.camelCase = camelize, $.trim = function(s) {
            return null == s ? "" : String.prototype.trim.call(s);
        }, $.uuid = 0, $.support = {}, $.expr = {}, $.map = function(elements, callback) {
            var value;
            var i;
            var key;
            /** @type {Array} */
            var values = [];
            if (likeArray(elements)) {
                /** @type {number} */
                i = 0;
                for (;i < elements.length;i++) {
                    value = callback(elements[i], i);
                    if (null != value) {
                        values.push(value);
                    }
                }
            } else {
                for (key in elements) {
                    value = callback(elements[key], key);
                    if (null != value) {
                        values.push(value);
                    }
                }
            }
            return flatten(values);
        }, $.each = function(object, callback) {
            var i;
            var name;
            if (likeArray(object)) {
                /** @type {number} */
                i = 0;
                for (;i < object.length;i++) {
                    if (callback.call(object[i], i, object[i]) === false) {
                        return object;
                    }
                }
            } else {
                for (name in object) {
                    if (callback.call(object[name], name, object[name]) === false) {
                        return object;
                    }
                }
            }
            return object;
        }, $.grep = function(str, callback) {
            return filter.call(str, callback);
        }, window.JSON && ($.parseJSON = JSON.parse), $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(dataAndEvents, m3) {
            class2type["[object " + m3 + "]"] = m3.toLowerCase();
        }), $.fn = {
            /** @type {function (this:(Array.<T>|string|{length: number}), (function (this:S, T, number, Array.<T>): ?|null), S=): ?} */
            forEach : emptyArray.forEach,
            /** @type {function (this:(Array.<T>|string|{length: number}), (function (?, T, number, Array.<T>): R|null), *=): R} */
            reduce : emptyArray.reduce,
            /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
            push : emptyArray.push,
            /** @type {function (this:(Array.<T>|{length: number}), function (T, T): number=): ?} */
            sort : emptyArray.sort,
            /** @type {function (this:(Array.<T>|string|{length: number}), T, number=): number} */
            indexOf : emptyArray.indexOf,
            /** @type {function (this:*, ...[*]): Array} */
            concat : emptyArray.concat,
            /**
             * @param {Function} callback
             * @return {?}
             */
            map : function(callback) {
                return $($.map(this, function(el, operation) {
                    return callback.call(el, operation, el);
                }));
            },
            /**
             * @return {?}
             */
            slice : function() {
                return $(slice.apply(this, arguments));
            },
            /**
             * @param {Function} callback
             * @return {?}
             */
            ready : function(callback) {
                return rxReady.test(doc.readyState) && doc.body ? callback($) : doc.addEventListener("DOMContentLoaded", function() {
                    callback($);
                }, false), this;
            },
            /**
             * @param {number} idx
             * @return {?}
             */
            get : function(idx) {
                return idx === target ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
            },
            /**
             * @return {?}
             */
            toArray : function() {
                return this.get();
            },
            /**
             * @return {?}
             */
            size : function() {
                return this.length;
            },
            /**
             * @return {?}
             */
            remove : function() {
                return this.each(function() {
                    if (null != this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                });
            },
            /**
             * @param {Function} object
             * @return {?}
             */
            each : function(object) {
                return emptyArray.every.call(this, function(deep, handler) {
                    return object.call(deep, handler, deep) !== false;
                }), this;
            },
            /**
             * @param {Function} selector
             * @return {?}
             */
            filter : function(selector) {
                return isFunction(selector) ? this.not(this.not(selector)) : $(filter.call(this, function(element) {
                    return zepto.matches(element, selector);
                }));
            },
            /**
             * @param {?} selector
             * @param {string} context
             * @return {?}
             */
            add : function(selector, context) {
                return $(uniq(this.concat($(selector, context))));
            },
            /**
             * @param {Function} selector
             * @return {?}
             */
            is : function(selector) {
                return this.length > 0 && zepto.matches(this[0], selector);
            },
            /**
             * @param {Function} selector
             * @return {?}
             */
            not : function(selector) {
                /** @type {Array} */
                var dest = [];
                if (isFunction(selector) && selector.call !== target) {
                    this.each(function($1) {
                        if (!selector.call(this, $1)) {
                            dest.push(this);
                        }
                    });
                } else {
                    var arr = "string" == typeof selector ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? slice.call(selector) : $(selector);
                    this.forEach(function(chunk) {
                        if (arr.indexOf(chunk) < 0) {
                            dest.push(chunk);
                        }
                    });
                }
                return $(dest);
            },
            /**
             * @param {Object} obj
             * @return {?}
             */
            has : function(obj) {
                return this.filter(function() {
                    return isObject(obj) ? $.contains(this, obj) : $(this).find(obj).size();
                });
            },
            /**
             * @param {number} i
             * @return {?}
             */
            eq : function(i) {
                return-1 === i ? this.slice(i) : this.slice(i, +i + 1);
            },
            /**
             * @return {?}
             */
            first : function() {
                var el = this[0];
                return el && !isObject(el) ? el : $(el);
            },
            /**
             * @return {?}
             */
            last : function() {
                var el = this[this.length - 1];
                return el && !isObject(el) ? el : $(el);
            },
            /**
             * @param {?} selector
             * @return {?}
             */
            find : function(selector) {
                var str;
                var uniqs = this;
                return str = selector ? "object" == typeof selector ? $(selector).filter(function() {
                    var related = this;
                    return emptyArray.some.call(uniqs, function(child) {
                        return $.contains(child, related);
                    });
                }) : 1 == this.length ? $(zepto.qsa(this[0], selector)) : this.map(function() {
                    return zepto.qsa(this, selector);
                }) : $();
            },
            /**
             * @param {Function} selector
             * @param {Object} context
             * @return {?}
             */
            closest : function(selector, context) {
                var node = this[0];
                /** @type {boolean} */
                var collection = false;
                if ("object" == typeof selector) {
                    collection = $(selector);
                }
                for (;node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector));) {
                    node = node !== context && (!isDocument(node) && node.parentNode);
                }
                return $(node);
            },
            /**
             * @param {Object} selector
             * @return {?}
             */
            parents : function(selector) {
                /** @type {Array} */
                var ancestors = [];
                var nodes = this;
                for (;nodes.length > 0;) {
                    nodes = $.map(nodes, function(node) {
                        return(node = node.parentNode) && (!isDocument(node) && ancestors.indexOf(node) < 0) ? (ancestors.push(node), node) : void 0;
                    });
                }
                return filtered(ancestors, selector);
            },
            /**
             * @param {Object} selector
             * @return {?}
             */
            parent : function(selector) {
                return filtered(uniq(this.pluck("parentNode")), selector);
            },
            /**
             * @param {Object} selector
             * @return {?}
             */
            children : function(selector) {
                return filtered(this.map(function() {
                    return children(this);
                }), selector);
            },
            /**
             * @return {?}
             */
            contents : function() {
                return this.map(function() {
                    return slice.call(this.childNodes);
                });
            },
            /**
             * @param {Object} selector
             * @return {?}
             */
            siblings : function(selector) {
                return filtered(this.map(function(dataAndEvents, el) {
                    return filter.call(children(el.parentNode), function(child) {
                        return child !== el;
                    });
                }), selector);
            },
            /**
             * @return {?}
             */
            empty : function() {
                return this.each(function() {
                    /** @type {string} */
                    this.innerHTML = "";
                });
            },
            /**
             * @param {string} property
             * @return {?}
             */
            pluck : function(property) {
                return $.map(this, function(to_instance) {
                    return to_instance[property];
                });
            },
            /**
             * @return {?}
             */
            show : function() {
                return this.each(function() {
                    if ("none" == this.style.display) {
                        /** @type {string} */
                        this.style.display = "";
                    }
                    if ("none" == getComputedStyle(this, "").getPropertyValue("display")) {
                        this.style.display = defaultDisplay(this.nodeName);
                    }
                });
            },
            /**
             * @param {?} newContent
             * @return {?}
             */
            replaceWith : function(newContent) {
                return this.before(newContent).remove();
            },
            /**
             * @param {Function} structure
             * @return {?}
             */
            wrap : function(structure) {
                var func = isFunction(structure);
                if (this[0] && !func) {
                    var dom = $(structure).get(0);
                    var clone = dom.parentNode || this.length > 1;
                }
                return this.each(function(index) {
                    $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
                });
            },
            /**
             * @param {Element} structure
             * @return {?}
             */
            wrapAll : function(structure) {
                if (this[0]) {
                    $(this[0]).before(structure = $(structure));
                    var children;
                    for (;(children = structure.children()).length;) {
                        structure = children.first();
                    }
                    $(structure).append(this);
                }
                return this;
            },
            /**
             * @param {Function} value
             * @return {?}
             */
            wrapInner : function(value) {
                var iterator = isFunction(value);
                return this.each(function(j) {
                    var token = $(this);
                    var contents = token.contents();
                    var html = iterator ? value.call(this, j) : value;
                    if (contents.length) {
                        contents.wrapAll(html);
                    } else {
                        token.append(html);
                    }
                });
            },
            /**
             * @return {?}
             */
            unwrap : function() {
                return this.parent().each(function() {
                    $(this).replaceWith($(this).children());
                }), this;
            },
            /**
             * @return {?}
             */
            clone : function() {
                return this.map(function() {
                    return this.cloneNode(true);
                });
            },
            /**
             * @return {?}
             */
            hide : function() {
                return this.css("display", "none");
            },
            /**
             * @param {boolean} value
             * @return {?}
             */
            toggle : function(value) {
                return this.each(function() {
                    var removeButton = $(this);
                    if (value === target ? "none" == removeButton.css("display") : value) {
                        removeButton.show();
                    } else {
                        removeButton.hide();
                    }
                });
            },
            /**
             * @param {string} selector
             * @return {?}
             */
            prev : function(selector) {
                return $(this.pluck("previousElementSibling")).filter(selector || "*");
            },
            /**
             * @param {string} selector
             * @return {?}
             */
            next : function(selector) {
                return $(this.pluck("nextElementSibling")).filter(selector || "*");
            },
            /**
             * @param {Function} html
             * @return {?}
             */
            html : function(html) {
                return 0 in arguments ? this.each(function(idx) {
                    var originHtml = this.innerHTML;
                    $(this).empty().append(funcArg(this, html, idx, originHtml));
                }) : 0 in this ? this[0].innerHTML : null;
            },
            /**
             * @param {Function} name
             * @return {?}
             */
            text : function(name) {
                return 0 in arguments ? this.each(function(idx) {
                    var newName = funcArg(this, name, idx, this.textContent);
                    /** @type {string} */
                    this.textContent = null == newName ? "" : "" + newName;
                }) : 0 in this ? this[0].textContent : null;
            },
            /**
             * @param {Object} name
             * @param {Function} value
             * @return {?}
             */
            attr : function(name, value) {
                var isLengthProperty;
                return "string" != typeof name || 1 in arguments ? this.each(function(idx) {
                    if (1 === this.nodeType) {
                        if (isObject(name)) {
                            for (key in name) {
                                setAttribute(this, key, name[key]);
                            }
                        } else {
                            setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
                        }
                    }
                }) : this.length && 1 === this[0].nodeType ? !(isLengthProperty = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : isLengthProperty : target;
            },
            /**
             * @param {string} value
             * @return {?}
             */
            removeAttr : function(value) {
                return this.each(function() {
                    if (1 === this.nodeType) {
                        value.split(" ").forEach(function(name) {
                            setAttribute(this, name);
                        }, this);
                    }
                });
            },
            /**
             * @param {Text} name
             * @param {Function} value
             * @return {?}
             */
            prop : function(name, value) {
                return name = propMap[name] || name, 1 in arguments ? this.each(function(idx) {
                    this[name] = funcArg(this, value, idx, this[name]);
                }) : this[0] && this[0][name];
            },
            /**
             * @param {string} key
             * @param {Function} value
             * @return {?}
             */
            data : function(key, value) {
                var match = "data-" + key.replace(r20, "-$1").toLowerCase();
                var pdataCur = 1 in arguments ? this.attr(match, value) : this.attr(match);
                return null !== pdataCur ? deserializeValue(pdataCur) : target;
            },
            /**
             * @param {Function} value
             * @return {?}
             */
            val : function(value) {
                return 0 in arguments ? this.each(function(idx) {
                    this.value = funcArg(this, value, idx, this.value);
                }) : this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function() {
                    return this.selected;
                }).pluck("value") : this[0].value);
            },
            /**
             * @param {Function} coordinates
             * @return {?}
             */
            offset : function(coordinates) {
                if (coordinates) {
                    return this.each(function(index) {
                        var elem = $(this);
                        var coords = funcArg(this, coordinates, index, elem.offset());
                        var parentOffset = elem.offsetParent().offset();
                        var styles = {
                            top : coords.top - parentOffset.top,
                            left : coords.left - parentOffset.left
                        };
                        if ("static" == elem.css("position")) {
                            /** @type {string} */
                            styles.position = "relative";
                        }
                        elem.css(styles);
                    });
                }
                if (!this.length) {
                    return null;
                }
                var obj = this[0].getBoundingClientRect();
                return{
                    left : obj.left + window.pageXOffset,
                    top : obj.top + window.pageYOffset,
                    width : Math.round(obj.width),
                    height : Math.round(obj.height)
                };
            },
            /**
             * @param {string} property
             * @param {boolean} value
             * @return {?}
             */
            css : function(property, value) {
                if (arguments.length < 2) {
                    var cs;
                    var element = this[0];
                    if (!element) {
                        return;
                    }
                    if (cs = getComputedStyle(element, ""), "string" == typeof property) {
                        return element.style[camelize(property)] || cs.getPropertyValue(property);
                    }
                    if (isArray(property)) {
                        var originalEvent = {};
                        return $.each(property, function(dataAndEvents, prop) {
                            originalEvent[prop] = element.style[camelize(prop)] || cs.getPropertyValue(prop);
                        }), originalEvent;
                    }
                }
                /** @type {string} */
                var css = "";
                if ("string" == type(property)) {
                    if (value || 0 === value) {
                        /** @type {string} */
                        css = dasherize(property) + ":" + maybeAddPx(property, value);
                    } else {
                        this.each(function() {
                            this.style.removeProperty(dasherize(property));
                        });
                    }
                } else {
                    for (key in property) {
                        if (property[key] || 0 === property[key]) {
                            css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";";
                        } else {
                            this.each(function() {
                                this.style.removeProperty(dasherize(key));
                            });
                        }
                    }
                }
                return this.each(function() {
                    this.style.cssText += ";" + css;
                });
            },
            /**
             * @param {?} element
             * @return {?}
             */
            index : function(element) {
                return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
            },
            /**
             * @param {Object} name
             * @return {?}
             */
            hasClass : function(name) {
                return name ? emptyArray.some.call(this, function(el) {
                    return this.test(className(el));
                }, classRE(name)) : false;
            },
            /**
             * @param {Function} name
             * @return {?}
             */
            addClass : function(name) {
                return name ? this.each(function(idx) {
                    if ("className" in this) {
                        /** @type {Array} */
                        classList = [];
                        var cls = className(this);
                        var newName = funcArg(this, name, idx, cls);
                        newName.split(/\s+/g).forEach(function(klass) {
                            if (!$(this).hasClass(klass)) {
                                classList.push(klass);
                            }
                        }, this);
                        if (classList.length) {
                            className(this, cls + (cls ? " " : "") + classList.join(" "));
                        }
                    }
                }) : this;
            },
            /**
             * @param {Function} name
             * @return {?}
             */
            removeClass : function(name) {
                return this.each(function(idx) {
                    if ("className" in this) {
                        if (name === target) {
                            return className(this, "");
                        }
                        classList = className(this);
                        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
                            classList = classList.replace(classRE(klass), " ");
                        });
                        className(this, classList.trim());
                    }
                });
            },
            /**
             * @param {Function} name
             * @param {boolean} value
             * @return {?}
             */
            toggleClass : function(name, value) {
                return name ? this.each(function(idx) {
                    var $this = $(this);
                    var names = funcArg(this, name, idx, className(this));
                    names.split(/\s+/g).forEach(function(klass) {
                        if (value === target ? !$this.hasClass(klass) : value) {
                            $this.addClass(klass);
                        } else {
                            $this.removeClass(klass);
                        }
                    });
                }) : this;
            },
            /**
             * @param {string} value
             * @return {?}
             */
            scrollTop : function(value) {
                if (this.length) {
                    /** @type {boolean} */
                    var hasScrollTop = "scrollTop" in this[0];
                    return value === target ? hasScrollTop ? this[0].scrollTop : this[0].pageYOffset : this.each(hasScrollTop ? function() {
                        /** @type {string} */
                        this.scrollTop = value;
                    } : function() {
                        this.scrollTo(this.scrollX, value);
                    });
                }
            },
            /**
             * @param {number} value
             * @return {?}
             */
            scrollLeft : function(value) {
                if (this.length) {
                    /** @type {boolean} */
                    var hasScrollLeft = "scrollLeft" in this[0];
                    return value === target ? hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset : this.each(hasScrollLeft ? function() {
                        /** @type {number} */
                        this.scrollLeft = value;
                    } : function() {
                        this.scrollTo(value, this.scrollY);
                    });
                }
            },
            /**
             * @return {?}
             */
            position : function() {
                if (this.length) {
                    var sel = this[0];
                    var offsetParent = this.offsetParent();
                    var offset = this.offset();
                    var parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
                        top : 0,
                        left : 0
                    } : offsetParent.offset();
                    return offset.top -= parseFloat($(sel).css("margin-top")) || 0, offset.left -= parseFloat($(sel).css("margin-left")) || 0, parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0, parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0, {
                        top : offset.top - parentOffset.top,
                        left : offset.left - parentOffset.left
                    };
                }
            },
            /**
             * @return {?}
             */
            offsetParent : function() {
                return this.map(function() {
                    var parent = this.offsetParent || doc.body;
                    for (;parent && (!rootNodeRE.test(parent.nodeName) && "static" == $(parent).css("position"));) {
                        parent = parent.offsetParent;
                    }
                    return parent;
                });
            }
        }, $.fn.detach = $.fn.remove, ["width", "height"].forEach(function(dimension) {
            var dimensionProperty = dimension.replace(/./, function(m) {
                return m[0].toUpperCase();
            });
            /**
             * @param {Function} value
             * @return {?}
             */
            $.fn[dimension] = function(value) {
                var offset;
                var el = this[0];
                return value === target ? isWindow(el) ? el["inner" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : (offset = this.offset()) && offset[dimension] : this.each(function(idx) {
                    el = $(this);
                    el.css(dimension, funcArg(this, value, idx, el[dimension]()));
                });
            };
        }), adjacencyOperators.forEach(function(operator, operatorIndex) {
            /** @type {number} */
            var inside = operatorIndex % 2;
            /**
             * @return {?}
             */
            $.fn[operator] = function() {
                var result;
                var target;
                var resolveValues = $.map(arguments, function(arg) {
                    return result = type(arg), "object" == result || ("array" == result || null == arg) ? arg : zepto.fragment(arg);
                });
                /** @type {boolean} */
                var copyByClone = this.length > 1;
                return resolveValues.length < 1 ? this : this.each(function(dataAndEvents, ref) {
                    target = inside ? ref : ref.parentNode;
                    ref = 0 == operatorIndex ? ref.nextSibling : 1 == operatorIndex ? ref.firstChild : 2 == operatorIndex ? ref : null;
                    var options = $.contains(doc.documentElement, target);
                    resolveValues.forEach(function(node) {
                        if (copyByClone) {
                            node = node.cloneNode(true);
                        } else {
                            if (!target) {
                                return $(node).remove();
                            }
                        }
                        target.insertBefore(node, ref);
                        if (options) {
                            traverseNode(node, function(src) {
                                if (!(null == src.nodeName)) {
                                    if (!("SCRIPT" !== src.nodeName.toUpperCase())) {
                                        if (!(src.type && "text/javascript" !== src.type)) {
                                            if (!src.src) {
                                                window.eval.call(window, src.innerHTML);
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                });
            };
            /**
             * @param {?} html
             * @return {?}
             */
            $.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function(html) {
                return $(html)[operator](this), this;
            };
        }), zepto.Z.prototype = $.fn, zepto.uniq = uniq, zepto.deserializeValue = deserializeValue, $.zepto = zepto, $;
    }();
    window.Zepto = Zepto;
    module.exports = void 0 === window.$ && (window.$ = Zepto);
    (function($) {
        /**
         * @param {Function} element
         * @return {?}
         */
        function zid(element) {
            return element._zid || (element._zid = _zid++);
        }
        /**
         * @param {Object} fn
         * @param {string} event
         * @param {string} element
         * @param {boolean} selector
         * @return {?}
         */
        function findHandlers(fn, event, element, selector) {
            if (event = parse(event), event.ns) {
                var matcher = matcherFor(event.ns)
            }
            return(handlers[zid(fn)] || []).filter(function(handler) {
                return!(!handler || (event.e && handler.e != event.e || (event.ns && !matcher.test(handler.ns) || (element && zid(handler.fn) !== zid(element) || selector && handler.sel != selector))));
            });
        }
        /**
         * @param {string} event
         * @return {?}
         */
        function parse(event) {
            /** @type {Array.<string>} */
            var parts = ("" + event).split(".");
            return{
                e : parts[0],
                ns : parts.slice(1).sort().join(" ")
            };
        }
        /**
         * @param {string} ns
         * @return {?}
         */
        function matcherFor(ns) {
            return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
        }
        /**
         * @param {Object} handler
         * @param {?} captureSetting
         * @return {?}
         */
        function eventCapture(handler, captureSetting) {
            return handler.del && (!focusinSupported && handler.e in focus) || !!captureSetting;
        }
        /**
         * @param {(Array|string)} type
         * @return {?}
         */
        function realEvent(type) {
            return hover[type] || (focusinSupported && focus[type] || type);
        }
        /**
         * @param {Object} element
         * @param {string} events
         * @param {Object} fn
         * @param {Function} data
         * @param {string} selector
         * @param {Object} delegator
         * @param {?} capture
         * @return {undefined}
         */
        function add(element, events, fn, data, selector, delegator, capture) {
            var id = zid(element);
            var set = handlers[id] || (handlers[id] = []);
            events.split(/\s/).forEach(function(event) {
                if ("ready" == event) {
                    return $(document).ready(fn);
                }
                var handler = parse(event);
                handler.fn = fn;
                /** @type {string} */
                handler.sel = selector;
                if (handler.e in hover) {
                    /**
                     * @param {Object} event
                     * @return {?}
                     */
                    fn = function(event) {
                        var related = event.relatedTarget;
                        return!related || related !== this && !$.contains(this, related) ? handler.fn.apply(this, arguments) : void 0;
                    };
                }
                /** @type {Object} */
                handler.del = delegator;
                var callback = delegator || fn;
                /**
                 * @param {Object} e
                 * @return {?}
                 */
                handler.proxy = function(e) {
                    if (e = compatible(e), !e.isImmediatePropagationStopped()) {
                        /** @type {Function} */
                        e.data = data;
                        var elementRect = callback.apply(element, e._args == _ ? [e] : [e].concat(e._args));
                        return elementRect === false && (e.preventDefault(), e.stopPropagation()), elementRect;
                    }
                };
                handler.i = set.length;
                set.push(handler);
                if ("addEventListener" in element) {
                    element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
                }
            });
        }
        /**
         * @param {Object} element
         * @param {string} classNames
         * @param {Function} fn
         * @param {Object} selector
         * @param {?} capture
         * @return {undefined}
         */
        function remove(element, classNames, fn, selector, capture) {
            var id = zid(element);
            (classNames || "").split(/\s/).forEach(function(event) {
                findHandlers(element, event, fn, selector).forEach(function(handler) {
                    delete handlers[id][handler.i];
                    if ("removeEventListener" in element) {
                        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
                    }
                });
            });
        }
        /**
         * @param {Object} event
         * @param {Object} source
         * @return {?}
         */
        function compatible(event, source) {
            return(source || !event.isDefaultPrevented) && (source || (source = event), $.each(which, function(name, predicate) {
                var sourceMethod = source[name];
                /**
                 * @return {?}
                 */
                event[name] = function() {
                    return this[predicate] = returnTrue, sourceMethod && sourceMethod.apply(source, arguments);
                };
                /** @type {function (): ?} */
                event[predicate] = returnFalse;
            }), (source.defaultPrevented !== _ ? source.defaultPrevented : "returnValue" in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) && (event.isDefaultPrevented = returnTrue)), event;
        }
        /**
         * @param {Object} event
         * @return {?}
         */
        function createProxy(event) {
            var key;
            var proxy = {
                originalEvent : event
            };
            for (key in event) {
                if (!isint.test(key)) {
                    if (!(event[key] === _)) {
                        proxy[key] = event[key];
                    }
                }
            }
            return compatible(proxy, event);
        }
        var _;
        /** @type {number} */
        var _zid = 1;
        /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
        var __slice = Array.prototype.slice;
        var isFunction = $.isFunction;
        /**
         * @param {Function} value
         * @return {?}
         */
        var isString = function(value) {
            return "string" == typeof value;
        };
        var handlers = {};
        var specialEvents = {};
        /** @type {boolean} */
        var focusinSupported = "onfocusin" in window;
        var focus = {
            focus : "focusin",
            blur : "focusout"
        };
        var hover = {
            mouseenter : "mouseover",
            mouseleave : "mouseout"
        };
        /** @type {string} */
        specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents";
        $.event = {
            /** @type {function (Object, string, Object, Function, string, Object, ?): undefined} */
            add : add,
            /** @type {function (Object, string, Function, Object, ?): undefined} */
            remove : remove
        };
        /**
         * @param {Function} fn
         * @param {Function} context
         * @return {?}
         */
        $.proxy = function(fn, context) {
            /** @type {(Array.<?>|boolean)} */
            var args = 2 in arguments && __slice.call(arguments, 2);
            if (isFunction(fn)) {
                /**
                 * @return {?}
                 */
                var proxyFn = function() {
                    return fn.apply(context, args ? args.concat(__slice.call(arguments)) : arguments);
                };
                return proxyFn._zid = zid(fn), proxyFn;
            }
            if (isString(context)) {
                return args ? (args.unshift(fn[context], fn), $.proxy.apply(null, args)) : $.proxy(fn[context], fn);
            }
            throw new TypeError("expected function");
        };
        /**
         * @param {string} event
         * @param {Function} callback
         * @param {Function} data
         * @return {?}
         */
        $.fn.bind = function(event, callback, data) {
            return this.on(event, callback, data);
        };
        /**
         * @param {string} type
         * @param {Function} callback
         * @return {?}
         */
        $.fn.unbind = function(type, callback) {
            return this.off(type, callback);
        };
        /**
         * @param {string} types
         * @param {Function} selector
         * @param {Function} data
         * @param {Function} callback
         * @return {?}
         */
        $.fn.one = function(types, selector, data, callback) {
            return this.on(types, selector, data, callback, 1);
        };
        /**
         * @return {?}
         */
        var returnTrue = function() {
            return true;
        };
        /**
         * @return {?}
         */
        var returnFalse = function() {
            return false;
        };
        /** @type {RegExp} */
        var isint = /^([A-Z]|returnValue$|layer[XY]$)/;
        var which = {
            preventDefault : "isDefaultPrevented",
            stopImmediatePropagation : "isImmediatePropagationStopped",
            stopPropagation : "isPropagationStopped"
        };
        /**
         * @param {Function} selector
         * @param {string} types
         * @param {?} data
         * @return {?}
         */
        $.fn.delegate = function(selector, types, data) {
            return this.on(types, selector, data);
        };
        /**
         * @param {Function} selector
         * @param {?} types
         * @param {?} fn
         * @return {?}
         */
        $.fn.undelegate = function(selector, types, fn) {
            return this.off(types, selector, fn);
        };
        /**
         * @param {string} event
         * @param {?} callback
         * @return {?}
         */
        $.fn.live = function(event, callback) {
            return $(document.body).delegate(this.selector, event, callback), this;
        };
        /**
         * @param {?} event
         * @param {?} callback
         * @return {?}
         */
        $.fn.die = function(event, callback) {
            return $(document.body).undelegate(this.selector, event, callback), this;
        };
        /**
         * @param {string} event
         * @param {Function} selector
         * @param {Function} data
         * @param {Function} callback
         * @param {number} one
         * @return {?}
         */
        $.fn.on = function(event, selector, data, callback, one) {
            var autoRemove;
            var delegator;
            var _t = this;
            return event && !isString(event) ? ($.each(event, function(v, callback) {
                _t.on(v, selector, data, callback, one);
            }), _t) : (isString(selector) || (isFunction(callback) || (callback === false || (callback = data, data = selector, selector = _))), (isFunction(data) || data === false) && (callback = data, data = _), callback === false && (callback = returnFalse), _t.each(function(dataAndEvents, element) {
                if (one) {
                    /**
                     * @param {Event} e
                     * @return {?}
                     */
                    autoRemove = function(e) {
                        return remove(element, e.type, callback), callback.apply(this, arguments);
                    };
                }
                if (selector) {
                    /**
                     * @param {Object} e
                     * @return {?}
                     */
                    delegator = function(e) {
                        var context;
                        var match = $(e.target).closest(selector, element).get(0);
                        return match && match !== element ? (context = $.extend(createProxy(e), {
                            currentTarget : match,
                            liveFired : element
                        }), (autoRemove || callback).apply(match, [context].concat(__slice.call(arguments, 1)))) : void 0;
                    };
                }
                add(element, event, callback, data, selector, delegator || autoRemove);
            }));
        };
        /**
         * @param {Function} type
         * @param {Function} selector
         * @param {Function} fn
         * @return {?}
         */
        $.fn.off = function(type, selector, fn) {
            var $this = this;
            return type && !isString(type) ? ($.each(type, function(type, fn) {
                $this.off(type, selector, fn);
            }), $this) : (isString(selector) || (isFunction(fn) || (fn === false || (fn = selector, selector = _))), fn === false && (fn = returnFalse), $this.each(function() {
                remove(this, type, fn, selector);
            }));
        };
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        $.fn.trigger = function(event, args) {
            return event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event), event._args = args, this.each(function() {
                if (event.type in focus && "function" == typeof this[event.type]) {
                    this[event.type]();
                } else {
                    if ("dispatchEvent" in this) {
                        this.dispatchEvent(event);
                    } else {
                        $(this).triggerHandler(event, args);
                    }
                }
            });
        };
        /**
         * @param {Function} event
         * @param {?} args
         * @return {?}
         */
        $.fn.triggerHandler = function(event, args) {
            var e;
            var $col;
            return this.each(function(dataAndEvents, element) {
                e = createProxy(isString(event) ? $.Event(event) : event);
                e._args = args;
                /** @type {Object} */
                e.target = element;
                $.each(findHandlers(element, event.type || event), function(dataAndEvents, handler) {
                    return $col = handler.proxy(e), e.isImmediatePropagationStopped() ? false : void 0;
                });
            }), $col;
        };
        "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(name) {
            /**
             * @param {Function} callbackOrParams
             * @return {?}
             */
            $.fn[name] = function(callbackOrParams) {
                return 0 in arguments ? this.bind(name, callbackOrParams) : this.trigger(name);
            };
        });
        /**
         * @param {Function} type
         * @param {Function} props
         * @return {?}
         */
        $.Event = function(type, props) {
            if (!isString(type)) {
                /** @type {Function} */
                props = type;
                type = props.type;
            }
            /** @type {(Event|null)} */
            var event = document.createEvent(specialEvents[type] || "Events");
            /** @type {boolean} */
            var bubbles = true;
            if (props) {
                var i;
                for (i in props) {
                    if ("bubbles" == i) {
                        /** @type {boolean} */
                        bubbles = !!props[i];
                    } else {
                        event[i] = props[i];
                    }
                }
            }
            return event.initEvent(type, bubbles, true), compatible(event);
        };
    })(Zepto);
    (function($) {
        /**
         * @param {?} context
         * @param {?} eventName
         * @param {Array} data
         * @return {?}
         */
        function triggerAndReturn(context, eventName, data) {
            var event = $.Event(eventName);
            return $(context).trigger(event, data), !event.isDefaultPrevented();
        }
        /**
         * @param {Object} settings
         * @param {Element} context
         * @param {string} eventName
         * @param {Array} data
         * @return {?}
         */
        function triggerGlobal(settings, context, eventName, data) {
            return settings.global ? triggerAndReturn(context || doc, eventName, data) : void 0;
        }
        /**
         * @param {Object} settings
         * @return {undefined}
         */
        function ajaxStart(settings) {
            if (settings.global) {
                if (0 === $.active++) {
                    triggerGlobal(settings, null, "ajaxStart");
                }
            }
        }
        /**
         * @param {Object} settings
         * @return {undefined}
         */
        function ajaxStop(settings) {
            if (settings.global) {
                if (!--$.active) {
                    triggerGlobal(settings, null, "ajaxStop");
                }
            }
        }
        /**
         * @param {?} xhr
         * @param {Object} settings
         * @return {?}
         */
        function ajaxBeforeSend(xhr, settings) {
            var context = settings.context;
            return settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, "ajaxBeforeSend", [xhr, settings]) === false ? false : void triggerGlobal(settings, context, "ajaxSend", [xhr, settings]);
        }
        /**
         * @param {?} data
         * @param {?} xhr
         * @param {Object} settings
         * @param {?} deferred
         * @return {undefined}
         */
        function ajaxSuccess(data, xhr, settings, deferred) {
            var context = settings.context;
            /** @type {string} */
            var status = "success";
            settings.success.call(context, data, status, xhr);
            if (deferred) {
                deferred.resolveWith(context, [data, status, xhr]);
            }
            triggerGlobal(settings, context, "ajaxSuccess", [xhr, settings, data]);
            ajaxComplete(status, xhr, settings);
        }
        /**
         * @param {Object} error
         * @param {string} type
         * @param {?} xhr
         * @param {Object} settings
         * @param {?} deferred
         * @return {undefined}
         */
        function ajaxError(error, type, xhr, settings, deferred) {
            var context = settings.context;
            settings.error.call(context, xhr, type, error);
            if (deferred) {
                deferred.rejectWith(context, [xhr, type, error]);
            }
            triggerGlobal(settings, context, "ajaxError", [xhr, settings, error || type]);
            ajaxComplete(type, xhr, settings);
        }
        /**
         * @param {string} status
         * @param {?} xhr
         * @param {Object} settings
         * @return {undefined}
         */
        function ajaxComplete(status, xhr, settings) {
            var context = settings.context;
            settings.complete.call(context, xhr, status);
            triggerGlobal(settings, context, "ajaxComplete", [xhr, settings]);
            ajaxStop(settings);
        }
        /**
         * @return {undefined}
         */
        function empty() {
        }
        /**
         * @param {string} mime
         * @return {?}
         */
        function mimeToDataType(mime) {
            return mime && (mime = mime.split(";", 2)[0]), mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : rchecked.test(mime) ? "script" : exclude.test(mime) && "xml") || "text";
        }
        /**
         * @param {string} label
         * @param {string} str
         * @return {?}
         */
        function appendQuery(label, str) {
            return "" == str ? label : (label + "&" + str).replace(/[&?]{1,2}/, "?");
        }
        /**
         * @param {Object} options
         * @return {undefined}
         */
        function serializeData(options) {
            if (options.processData) {
                if (options.data) {
                    if ("string" != $.type(options.data)) {
                        options.data = $.param(options.data, options.traditional);
                    }
                }
            }
            if (!!options.data) {
                if (!(options.type && "GET" != options.type.toUpperCase())) {
                    options.url = appendQuery(options.url, options.data);
                    options.data = void 0;
                }
            }
        }
        /**
         * @param {string} url
         * @param {Object} data
         * @param {Function} success
         * @param {Function} dataType
         * @return {?}
         */
        function parseArguments(url, data, success, dataType) {
            return $.isFunction(data) && (dataType = success, success = data, data = void 0), $.isFunction(success) || (dataType = success, success = void 0), {
                url : url,
                data : data,
                /** @type {Function} */
                success : success,
                /** @type {Function} */
                dataType : dataType
            };
        }
        /**
         * @param {Object} params
         * @param {?} a
         * @param {boolean} traditional
         * @param {string} scope
         * @return {undefined}
         */
        function serialize(params, a, traditional, scope) {
            var $clone_type;
            var array = $.isArray(a);
            var hash = $.isPlainObject(a);
            $.each(a, function(key, value) {
                $clone_type = $.type(value);
                if (scope) {
                    key = traditional ? scope : scope + "[" + (hash || ("object" == $clone_type || "array" == $clone_type) ? key : "") + "]";
                }
                if (!scope && array) {
                    params.add(value.name, value.value);
                } else {
                    if ("array" == $clone_type || !traditional && "object" == $clone_type) {
                        serialize(params, value, traditional, key);
                    } else {
                        params.add(key, value);
                    }
                }
            });
        }
        var key;
        var name;
        /** @type {number} */
        var jsonpID = 0;
        /** @type {Document} */
        var doc = window.document;
        /** @type {RegExp} */
        var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        /** @type {RegExp} */
        var rchecked = /^(?:text|application)\/javascript/i;
        /** @type {RegExp} */
        var exclude = /^(?:text|application)\/xml/i;
        /** @type {string} */
        var jsonType = "application/json";
        /** @type {string} */
        var htmlType = "text/html";
        /** @type {RegExp} */
        var blankRE = /^\s*$/;
        /** @type {Element} */
        var l = doc.createElement("a");
        /** @type {string} */
        l.href = window.location.href;
        /** @type {number} */
        $.active = 0;
        /**
         * @param {Object} options
         * @param {?} deferred
         * @return {?}
         */
        $.ajaxJSONP = function(options, deferred) {
            if (!("type" in options)) {
                return $.ajax(options);
            }
            var responseData;
            var tref;
            var _callbackName = options.jsonpCallback;
            var name = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || "jsonp" + ++jsonpID;
            /** @type {Element} */
            var script = doc.createElement("script");
            var method = window[name];
            /**
             * @param {string} errorType
             * @return {undefined}
             */
            var abort = function(errorType) {
                $(script).triggerHandler("error", errorType || "abort");
            };
            var xhr = {
                /** @type {function (string): undefined} */
                abort : abort
            };
            return deferred && deferred.promise(xhr), $(script).on("load error", function(error, errorType) {
                clearTimeout(tref);
                $(script).off().remove();
                if ("error" != error.type && responseData) {
                    ajaxSuccess(responseData[0], xhr, options, deferred);
                } else {
                    ajaxError(null, errorType || "error", xhr, options, deferred);
                }
                window[name] = method;
                if (responseData) {
                    if ($.isFunction(method)) {
                        method(responseData[0]);
                    }
                }
                method = responseData = void 0;
            }), ajaxBeforeSend(xhr, options) === false ? (abort("abort"), xhr) : (window[name] = function() {
                /** @type {Arguments} */
                responseData = arguments;
            }, script.src = options.url.replace(/\?(.+)=\?/, "?$1=" + name), doc.head.appendChild(script), options.timeout > 0 && (tref = setTimeout(function() {
                abort("timeout");
            }, options.timeout)), xhr);
        };
        $.ajaxSettings = {
            type : "GET",
            /** @type {function (): undefined} */
            beforeSend : empty,
            /** @type {function (): undefined} */
            success : empty,
            /** @type {function (): undefined} */
            error : empty,
            /** @type {function (): undefined} */
            complete : empty,
            context : null,
            global : true,
            /**
             * @return {?}
             */
            xhr : function() {
                return new window.XMLHttpRequest;
            },
            accepts : {
                script : "text/javascript, application/javascript, application/x-javascript",
                json : jsonType,
                xml : "application/xml, text/xml",
                html : htmlType,
                text : "text/plain"
            },
            crossDomain : false,
            timeout : 0,
            processData : true,
            cache : true
        };
        /**
         * @param {Object} options
         * @return {?}
         */
        $.ajax = function(options) {
            var config;
            var settings = $.extend({}, options || {});
            var deferred = $.Deferred && $.Deferred();
            for (key in $.ajaxSettings) {
                if (void 0 === settings[key]) {
                    settings[key] = $.ajaxSettings[key];
                }
            }
            ajaxStart(settings);
            if (!settings.crossDomain) {
                /** @type {Element} */
                config = doc.createElement("a");
                config.href = settings.url;
                config.href = config.href;
                /** @type {boolean} */
                settings.crossDomain = l.protocol + "//" + l.host != config.protocol + "//" + config.host;
            }
            if (!settings.url) {
                /** @type {string} */
                settings.url = window.location.toString();
            }
            serializeData(settings);
            var dataType = settings.dataType;
            /** @type {boolean} */
            var d = /\?.+=\?/.test(settings.url);
            if (d && (dataType = "jsonp"), settings.cache !== false && (options && options.cache === true || "script" != dataType && "jsonp" != dataType) || (settings.url = appendQuery(settings.url, "_=" + Date.now())), "jsonp" == dataType) {
                return d || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === false ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
            }
            var tref;
            var mime = settings.accepts[dataType];
            var headers = {};
            /**
             * @param {string} name
             * @param {string} value
             * @return {undefined}
             */
            var setHeader = function(name, value) {
                /** @type {Array} */
                headers[name.toLowerCase()] = [name, value];
            };
            /** @type {string} */
            var E = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
            var xhr = settings.xhr();
            var nativeSetHeader = xhr.setRequestHeader;
            if (deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*"), (mime = settings.mimeType || mime) && (mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime)), (settings.contentType || settings.contentType !== false && (settings.data && "GET" != settings.type.toUpperCase())) && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded"),
                    settings.headers) {
                for (name in settings.headers) {
                    setHeader(name, settings.headers[name]);
                }
            }
            if (xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function() {
                    if (4 == xhr.readyState) {
                        /** @type {function (): undefined} */
                        xhr.onreadystatechange = empty;
                        clearTimeout(tref);
                        var result;
                        /** @type {boolean} */
                        var error = false;
                        if (xhr.status >= 200 && xhr.status < 300 || (304 == xhr.status || 0 == xhr.status && "file:" == E)) {
                            dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type"));
                            result = xhr.responseText;
                            try {
                                if ("script" == dataType) {
                                    (1, eval)(result);
                                } else {
                                    if ("xml" == dataType) {
                                        result = xhr.responseXML;
                                    } else {
                                        if ("json" == dataType) {
                                            result = blankRE.test(result) ? null : $.parseJSON(result);
                                        }
                                    }
                                }
                            } catch (err) {
                                error = err;
                            }
                            if (error) {
                                ajaxError(error, "parsererror", xhr, settings, deferred);
                            } else {
                                ajaxSuccess(result, xhr, settings, deferred);
                            }
                        } else {
                            ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred);
                        }
                    }
                }, ajaxBeforeSend(xhr, settings) === false) {
                return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
            }
            if (settings.xhrFields) {
                for (name in settings.xhrFields) {
                    xhr[name] = settings.xhrFields[name];
                }
            }
            var async = "async" in settings ? settings.async : true;
            xhr.open(settings.type, settings.url, async, settings.username, settings.password);
            for (name in headers) {
                nativeSetHeader.apply(xhr, headers[name]);
            }
            return settings.timeout > 0 && (tref = setTimeout(function() {
                /** @type {function (): undefined} */
                xhr.onreadystatechange = empty;
                xhr.abort();
                ajaxError(null, "timeout", xhr, settings, deferred);
            }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr;
        };
        /**
         * @return {?}
         */
        $.get = function() {
            return $.ajax(parseArguments.apply(null, arguments));
        };
        /**
         * @return {?}
         */
        $.post = function() {
            var options = parseArguments.apply(null, arguments);
            return options.type = "POST", $.ajax(options);
        };
        /**
         * @return {?}
         */
        $.getJSON = function() {
            var options = parseArguments.apply(null, arguments);
            return options.dataType = "json", $.ajax(options);
        };
        /**
         * @param {string} url
         * @param {Object} data
         * @param {Function} success
         * @return {?}
         */
        $.fn.load = function(url, data, success) {
            if (!this.length) {
                return this;
            }
            var selector;
            var self = this;
            var parts = url.split(/\s/);
            var options = parseArguments(url, data, success);
            /** @type {function (string): undefined} */
            var callback = options.success;
            return parts.length > 1 && (options.url = parts[0], selector = parts[1]), options.success = function(response) {
                self.html(selector ? $("<div>").html(response.replace(rscript, "")).find(selector) : response);
                if (callback) {
                    callback.apply(self, arguments);
                }
            }, $.ajax(options), this;
        };
        /** @type {function (string): string} */
        var enc = encodeURIComponent;
        /**
         * @param {?} obj
         * @param {boolean} traditional
         * @return {?}
         */
        $.param = function(obj, traditional) {
            /** @type {Array} */
            var params = [];
            return params.add = function(key, value) {
                if ($.isFunction(value)) {
                    value = value();
                }
                if (null == value) {
                    /** @type {string} */
                    value = "";
                }
                this.push(enc(key) + "=" + enc(value));
            }, serialize(params, obj, traditional), params.join("&").replace(/%20/g, "+");
        };
    })(Zepto);
    (function($) {
        /**
         * @return {?}
         */
        $.fn.serializeArray = function() {
            var ret;
            var type;
            /** @type {Array} */
            var sorted = [];
            /**
             * @param {string} obj
             * @return {?}
             */
            var iterator = function(obj) {
                return obj.forEach ? obj.forEach(iterator) : void sorted.push({
                    name : ret,
                    value : obj
                });
            };
            return this[0] && $.each(this[0].elements, function(dataAndEvents, elem) {
                type = elem.type;
                ret = elem.name;
                if (ret) {
                    if ("fieldset" != elem.nodeName.toLowerCase()) {
                        if (!elem.disabled) {
                            if ("submit" != type) {
                                if ("reset" != type) {
                                    if ("button" != type) {
                                        if ("file" != type) {
                                            if ("radio" != type && "checkbox" != type || elem.checked) {
                                                iterator($(elem).val());
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }), sorted;
        };
        /**
         * @return {?}
         */
        $.fn.serialize = function() {
            /** @type {Array} */
            var tagNameArr = [];
            return this.serializeArray().forEach(function(elm) {
                tagNameArr.push(encodeURIComponent(elm.name) + "=" + encodeURIComponent(elm.value));
            }), tagNameArr.join("&");
        };
        /**
         * @param {Function} callbackOrParams
         * @return {?}
         */
        $.fn.submit = function(callbackOrParams) {
            if (0 in arguments) {
                this.bind("submit", callbackOrParams);
            } else {
                if (this.length) {
                    var event = $.Event("submit");
                    this.eq(0).trigger(event);
                    if (!event.isDefaultPrevented()) {
                        this.get(0).submit();
                    }
                }
            }
            return this;
        };
    })(Zepto);
    (function($) {
        if (!("__proto__" in {})) {
            $.extend($.zepto, {
                /**
                 * @param {Object} dom
                 * @param {string} selector
                 * @return {?}
                 */
                Z : function(dom, selector) {
                    return dom = dom || [], $.extend(dom, $.fn), dom.selector = selector || "", dom.__Z = true, dom;
                },
                /**
                 * @param {Object} array
                 * @return {?}
                 */
                isZ : function(array) {
                    return "array" === $.type(array) && "__Z" in array;
                }
            });
        }
        try {
            getComputedStyle(void 0);
        } catch (e) {
            var nativeGetComputedStyle = getComputedStyle;
            /**
             * @param {(Element|null)} element
             * @return {(CSSStyleDeclaration|null)}
             */
            window.getComputedStyle = function(element) {
                try {
                    return nativeGetComputedStyle(element);
                } catch (e) {
                    return null;
                }
            };
        }
    })(Zepto);
    factory(Zepto);
}), require.register("./lib/zepto/touch.js", function(dataAndEvents, module) {
    /**
     * @param {Object} $
     * @return {undefined}
     */
    module.exports = function($) {
        /**
         * @param {number} y1
         * @param {number} y2
         * @param {number} x1
         * @param {number} x2
         * @return {?}
         */
        function swipeDirection(y1, y2, x1, x2) {
            return Math.abs(y1 - y2) >= Math.abs(x1 - x2) ? y1 - y2 > 0 ? "Left" : "Right" : x1 - x2 > 0 ? "Up" : "Down";
        }
        /**
         * @return {undefined}
         */
        function longTap() {
            /** @type {null} */
            longTapTimeout = null;
            if (touch.last) {
                touch.el.trigger("longTap");
                touch = {};
            }
        }
        /**
         * @return {undefined}
         */
        function blur() {
            if (longTapTimeout) {
                clearTimeout(longTapTimeout);
            }
            /** @type {null} */
            longTapTimeout = null;
        }
        /**
         * @return {undefined}
         */
        function cancelAll() {
            if (to) {
                clearTimeout(to);
            }
            if (going) {
                clearTimeout(going);
            }
            if (tref) {
                clearTimeout(tref);
            }
            if (longTapTimeout) {
                clearTimeout(longTapTimeout);
            }
            /** @type {null} */
            to = going = tref = longTapTimeout = null;
            touch = {};
        }
        /**
         * @param {Object} event
         * @return {?}
         */
        function isPrimaryTouch(event) {
            return("touch" == event.pointerType || event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
        }
        /**
         * @param {Object} e
         * @param {string} type
         * @return {?}
         */
        function isPointerEventType(e, type) {
            return e.type == "pointer" + type || e.type.toLowerCase() == "mspointer" + type;
        }
        var to;
        var going;
        var tref;
        var longTapTimeout;
        var gesture;
        var touch = {};
        /** @type {number} */
        var longTapDelay = 750;
        $(document).ready(function() {
            var now;
            var duration;
            var firstTouch;
            var _isPointerType;
            /** @type {number} */
            var r = 0;
            /** @type {number} */
            var g = 0;
            if ("MSGesture" in window) {
                /** @type {MSGesture} */
                gesture = new MSGesture;
                /** @type {(HTMLElement|null)} */
                gesture.target = document.body;
            }
            $(document).bind("MSGestureEnd", function(e) {
                /** @type {(null|string)} */
                var swipeDirectionFromVelocity = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
                if (swipeDirectionFromVelocity) {
                    touch.el.trigger("swipe");
                    touch.el.trigger("swipe" + swipeDirectionFromVelocity);
                }
            }).on("touchstart MSPointerDown pointerdown", function(e) {
                if (!(_isPointerType = isPointerEventType(e, "down")) || isPrimaryTouch(e)) {
                    firstTouch = _isPointerType ? e : e.touches[0];
                    if (e.touches) {
                        if (1 === e.touches.length) {
                            if (touch.x2) {
                                touch.x2 = void 0;
                                touch.y2 = void 0;
                            }
                        }
                    }
                    /** @type {number} */
                    now = Date.now();
                    /** @type {number} */
                    duration = now - (touch.last || now);
                    touch.el = $("tagName" in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);
                    if (to) {
                        clearTimeout(to);
                    }
                    touch.x1 = firstTouch.pageX;
                    touch.y1 = firstTouch.pageY;
                    if (duration > 0) {
                        if (250 >= duration) {
                            /** @type {boolean} */
                            touch.isDoubleTap = true;
                        }
                    }
                    /** @type {number} */
                    touch.last = now;
                    /** @type {number} */
                    longTapTimeout = setTimeout(longTap, longTapDelay);
                    if (gesture) {
                        if (_isPointerType) {
                            gesture.addPointer(e.pointerId);
                        }
                    }
                }
            }).on("touchmove MSPointerMove pointermove", function(e) {
                if (!(_isPointerType = isPointerEventType(e, "move")) || isPrimaryTouch(e)) {
                    firstTouch = _isPointerType ? e : e.touches[0];
                    blur();
                    touch.x2 = firstTouch.pageX;
                    touch.y2 = firstTouch.pageY;
                    r += Math.abs(touch.x1 - touch.x2);
                    g += Math.abs(touch.y1 - touch.y2);
                }
            }).on("touchend MSPointerUp pointerup", function(e) {
                if (!(_isPointerType = isPointerEventType(e, "up")) || isPrimaryTouch(e)) {
                    blur();
                    if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {
                        /** @type {number} */
                        tref = setTimeout(function() {
                            touch.el.trigger("swipe");
                            touch.el.trigger("swipe" + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
                            touch = {};
                        }, 0);
                    } else {
                        if ("last" in touch) {
                            if (30 > r && 30 > g) {
                                /** @type {number} */
                                going = setTimeout(function() {
                                    var event = $.Event("tap");
                                    /** @type {function (): undefined} */
                                    event.cancelTouch = cancelAll;
                                    touch.el.trigger(event);
                                    if (touch.isDoubleTap) {
                                        if (touch.el) {
                                            touch.el.trigger("doubleTap");
                                        }
                                        touch = {};
                                    } else {
                                        /** @type {number} */
                                        to = setTimeout(function() {
                                            /** @type {null} */
                                            to = null;
                                            if (touch.el) {
                                                touch.el.trigger("singleTap");
                                            }
                                            touch = {};
                                        }, 250);
                                    }
                                }, 0);
                            } else {
                                touch = {};
                            }
                        }
                    }
                    /** @type {number} */
                    r = g = 0;
                }
            }).on("touchcancel MSPointerCancel pointercancel", cancelAll);
            $(window).on("scroll", cancelAll);
        });
        ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(name) {
            /**
             * @param {Function} selector
             * @return {?}
             */
            $.fn[name] = function(selector) {
                return this.on(name, selector);
            };
        });
    };
}), require.register("./lib/analytics", function(dataAndEvents, module) {
    /**
     * @param {Object} config
     * @return {undefined}
     */
    function init(config) {
        /** @type {Object} */
        this.config = config;
        var _this = document.getElementsByTagName("head")[0] || document.documentElement;
        /** @type {Element} */
        var tag = document.createElement("script");
        /** @type {string} */
        tag.async = "true";
        /** @type {string} */
        tag.src = "";
        /** @type {boolean} */
        var r = false;
        /** @type {function (): undefined} */
        tag.onload = tag.onreadystatechange = function() {
            if (!(r || this.readyState && ("loaded" !== this.readyState && "complete" !== this.readyState))) {
                /** @type {boolean} */
                r = true;
                try {
                    pgvMain();
                } catch (t) {
                }
                /** @type {null} */
                tag.onload = tag.onreadystatechange = null;
            }
        };
        _this.insertBefore(tag, _this.firstChild);
    }
    /**
     * @param {Object} obj
     * @param {Object} g
     * @return {undefined}
     */
    init.prototype.sendEvent = function(obj, g) {
        if ("function" == typeof pgvSendClick) {
            if ("" !== obj) {
                if ("" !== g) {
                    pgvSendClick({
                        hottag : "WXM." + this.config.projectName + "." + obj + "." + g
                    });
                }
            }
        }
    };
    /** @type {function (Object): undefined} */
    module.exports = init;
}), require.register("./lib/loader", function(dataAndEvents, module) {
    /**
     * @param {Object} settings
     * @return {undefined}
     */
    function PxLoader(settings) {
        settings = settings || {};
        /** @type {Object} */
        this.settings = settings;
        if (null == settings.statusInterval) {
            /** @type {number} */
            settings.statusInterval = 5E3;
        }
        if (null == settings.loggingDelay) {
            /** @type {number} */
            settings.loggingDelay = 2E4;
        }
        if (null == settings.noProgressTimeout) {
            /** @type {number} */
            settings.noProgressTimeout = 1 / 0;
        }
        var e;
        /** @type {Array} */
        var entries = [];
        /** @type {Array} */
        var progressListeners = [];
        /** @type {number} */
        var progressChanged = Date.now();
        var ResourceState = {
            QUEUED : 0,
            WAITING : 1,
            LOADED : 2,
            ERROR : 3,
            TIMEOUT : 4
        };
        /**
         * @param {Object} val
         * @return {?}
         */
        var ensureArray = function(val) {
            return null == val ? [] : Array.isArray(val) ? val : [val];
        };
        /**
         * @param {Object} resource
         * @return {undefined}
         */
        this.add = function(resource) {
            resource.tags = new PxLoaderTags(resource.tags);
            if (null == resource.priority) {
                /** @type {number} */
                resource.priority = 1 / 0;
            }
            entries.push({
                resource : resource,
                status : ResourceState.QUEUED
            });
        };
        /**
         * @param {Function} callback
         * @param {?} tags
         * @return {undefined}
         */
        this.addProgressListener = function(callback, tags) {
            progressListeners.push({
                /** @type {Function} */
                callback : callback,
                tags : new PxLoaderTags(tags)
            });
        };
        /**
         * @param {?} done
         * @param {?} tags
         * @return {undefined}
         */
        this.addCompletionListener = function(done, tags) {
            progressListeners.push({
                tags : new PxLoaderTags(tags),
                /**
                 * @param {?} e
                 * @return {undefined}
                 */
                callback : function(e) {
                    if (e.completedCount === e.totalCount) {
                        done(e);
                    }
                }
            });
        };
        /**
         * @param {?} orderedTags
         * @return {?}
         */
        var getResourceSort = function(orderedTags) {
            orderedTags = ensureArray(orderedTags);
            /**
             * @param {Object} entry
             * @return {?}
             */
            var getTagOrder = function(entry) {
                var resource = entry.resource;
                /** @type {number} */
                var bestIndex = 1 / 0;
                /** @type {number} */
                var i = 0;
                for (;i < resource.tags.length;i++) {
                    /** @type {number} */
                    var j = 0;
                    for (;j < Math.min(orderedTags.length, bestIndex) && (!(resource.tags.all[i] === orderedTags[j] && (bestIndex > j && (bestIndex = j, 0 === bestIndex))) && 0 !== bestIndex);j++) {
                    }
                }
                return bestIndex;
            };
            return function(a, b) {
                var av = getTagOrder(a);
                var bv = getTagOrder(b);
                return bv > av ? -1 : av > bv ? 1 : a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
            };
        };
        /**
         * @param {?} orderedTags
         * @return {undefined}
         */
        this.start = function(orderedTags) {
            /** @type {number} */
            e = Date.now();
            var compareResources = getResourceSort(orderedTags);
            entries.sort(compareResources);
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var l = entries.length;
            for (;l > i;i++) {
                var entry = entries[i];
                /** @type {number} */
                entry.status = ResourceState.WAITING;
                entry.resource.start(this);
            }
            setTimeout(statusCheck, 100);
        };
        /**
         * @return {undefined}
         */
        var statusCheck = function() {
            /** @type {boolean} */
            var e = false;
            /** @type {number} */
            var noProgressTime = Date.now() - progressChanged;
            /** @type {boolean} */
            var timedOut = noProgressTime >= settings.noProgressTimeout;
            /** @type {boolean} */
            var shouldLog = noProgressTime >= settings.loggingDelay;
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var l = entries.length;
            for (;l > i;i++) {
                var entry = entries[i];
                if (entry.status === ResourceState.WAITING) {
                    if (entry.resource.checkStatus) {
                        entry.resource.checkStatus();
                    }
                    if (entry.status === ResourceState.WAITING) {
                        if (timedOut) {
                            entry.resource.onTimeout();
                        } else {
                            /** @type {boolean} */
                            e = true;
                        }
                    }
                }
            }
            if (shouldLog) {
                if (e) {
                    log();
                }
            }
            if (e) {
                setTimeout(statusCheck, settings.statusInterval);
            }
        };
        /**
         * @return {?}
         */
        this.isBusy = function() {
            /** @type {number} */
            var index = 0;
            /** @type {number} */
            var length = entries.length;
            for (;length > index;index++) {
                if (entries[index].status === ResourceState.QUEUED || entries[index].status === ResourceState.WAITING) {
                    return true;
                }
            }
            return false;
        };
        /**
         * @param {Object} resource
         * @param {(number|string)} statusType
         * @return {undefined}
         */
        var onProgress = function(resource, statusType) {
            var i;
            var len;
            var valsLength;
            var listener;
            var l;
            /** @type {null} */
            var entry = null;
            /** @type {number} */
            i = 0;
            /** @type {number} */
            len = entries.length;
            for (;len > i;i++) {
                if (entries[i].resource === resource) {
                    entry = entries[i];
                    break;
                }
            }
            if (null != entry && entry.status === ResourceState.WAITING) {
                /** @type {(number|string)} */
                entry.status = statusType;
                /** @type {number} */
                progressChanged = Date.now();
                valsLength = resource.tags.length;
                /** @type {number} */
                i = 0;
                /** @type {number} */
                len = progressListeners.length;
                for (;len > i;i++) {
                    listener = progressListeners[i];
                    l = 0 === listener.tags.length ? true : resource.tags.intersects(listener.tags);
                    if (l) {
                        sendProgress(entry, listener);
                    }
                }
            }
        };
        /**
         * @param {Object} resource
         * @return {undefined}
         */
        this.onLoad = function(resource) {
            onProgress(resource, ResourceState.LOADED);
        };
        /**
         * @param {Object} resource
         * @return {undefined}
         */
        this.onError = function(resource) {
            onProgress(resource, ResourceState.ERROR);
        };
        /**
         * @param {Object} resource
         * @return {undefined}
         */
        this.onTimeout = function(resource) {
            onProgress(resource, ResourceState.TIMEOUT);
        };
        /**
         * @param {Object} updatedEntry
         * @param {Object} listener
         * @return {undefined}
         */
        var sendProgress = function(updatedEntry, listener) {
            var i;
            var l;
            var entry;
            var s;
            /** @type {number} */
            var completed = 0;
            /** @type {number} */
            var totalCount = 0;
            /** @type {number} */
            i = 0;
            /** @type {number} */
            l = entries.length;
            for (;l > i;i++) {
                entry = entries[i];
                /** @type {boolean} */
                s = false;
                s = 0 === listener.tags.length ? true : entry.resource.tags.intersects(listener.tags);
                if (s) {
                    totalCount++;
                    if (entry.status === ResourceState.LOADED || (entry.status === ResourceState.ERROR || entry.status === ResourceState.TIMEOUT)) {
                        completed++;
                    }
                }
            }
            listener.callback({
                resource : updatedEntry.resource,
                loaded : updatedEntry.status === ResourceState.LOADED,
                error : updatedEntry.status === ResourceState.ERROR,
                timeout : updatedEntry.status === ResourceState.TIMEOUT,
                completedCount : completed,
                totalCount : totalCount
            });
        };
        /** @type {function ((Object|boolean|number|string)): undefined} */
        var log = this.log = function(val) {
            if (window.console) {
                /** @type {number} */
                var r = Math.round((Date.now() - e) / 1E3);
                window.console.log("PxLoader elapsed: " + r + " sec");
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var l = entries.length;
                for (;l > i;i++) {
                    var entry = entries[i];
                    if (val || entry.status === ResourceState.WAITING) {
                        var fmt = "PxLoader: #" + i + " " + entry.resource.getName();
                        switch(entry.status) {
                            case ResourceState.QUEUED:
                                fmt += " (Not Started)";
                                break;
                            case ResourceState.WAITING:
                                fmt += " (Waiting)";
                                break;
                            case ResourceState.LOADED:
                                fmt += " (Loaded)";
                                break;
                            case ResourceState.ERROR:
                                fmt += " (Error)";
                                break;
                            case ResourceState.TIMEOUT:
                                fmt += " (Timeout)";
                        }
                        if (entry.resource.tags.length > 0) {
                            fmt += " Tags: [" + entry.resource.tags.all.join(",") + "]";
                        }
                        window.console.log(fmt);
                    }
                }
            }
        };
    }
    /**
     * @param {Object} prop
     * @return {undefined}
     */
    function PxLoaderTags(prop) {
        if (this.all = [], this.first = null, this.length = 0, this.lookup = {}, prop) {
            if (Array.isArray(prop)) {
                this.all = prop.slice(0);
            } else {
                if ("object" == typeof prop) {
                    var name;
                    for (name in prop) {
                        if (prop.hasOwnProperty(name)) {
                            this.all.push(name);
                        }
                    }
                } else {
                    this.all.push(prop);
                }
            }
            this.length = this.all.length;
            if (this.length > 0) {
                this.first = this.all[0];
            }
            /** @type {number} */
            var i = 0;
            for (;i < this.length;i++) {
                /** @type {boolean} */
                this.lookup[this.all[i]] = true;
            }
        }
    }
    var Image = require("./lib/loader/PxLoaderImage.js");
    /**
     * @param {Node} other
     * @return {?}
     */
    PxLoaderTags.prototype.intersects = function(other) {
        if (0 === this.length || 0 === other.length) {
            return false;
        }
        if (1 === this.length && 1 === other.length) {
            return this.first === other.first;
        }
        if (other.length < this.length) {
            return other.intersects(this);
        }
        var key;
        for (key in this.lookup) {
            if (other.lookup[key]) {
                return true;
            }
        }
        return false;
    };
    if ("function" == typeof define) {
        if (define.amd) {
            define("PxLoader", [], function() {
                return PxLoader;
            });
        }
    }
    /**
     * @param {?} key
     * @param {?} name
     * @param {?} time
     * @param {?} invert
     * @return {?}
     */
    PxLoader.prototype.addImage = function(key, name, time, invert) {
        var node = new Image(key, name, time, invert);
        return this.add(node), node.img;
    };
    /** @type {function (Object): undefined} */
    module.exports = PxLoader;
}), require.register("./lib/loader/PxLoaderImage.js", function(dataAndEvents, module) {
    /**
     * @param {string} name
     * @param {Object} var_args
     * @param {number} priority
     * @param {Object} href
     * @return {undefined}
     */
    function create(name, var_args, priority, href) {
        var self = this;
        /** @type {null} */
        var loader = null;
        /** @type {Image} */
        this.img = new Image;
        if (void 0 !== href) {
            /** @type {Object} */
            this.img.crossOrigin = href;
        }
        /** @type {Object} */
        this.tags = var_args;
        /** @type {number} */
        this.priority = priority;
        /**
         * @return {undefined}
         */
        var callback = function() {
            if ("complete" === self.img.readyState) {
                removeEventHandlers();
                loader.onLoad(self);
            }
        };
        /**
         * @return {undefined}
         */
        var onLoad = function() {
            removeEventHandlers();
            loader.onLoad(self);
        };
        /**
         * @return {undefined}
         */
        var which = function() {
            removeEventHandlers();
            loader.onError(self);
        };
        /**
         * @return {undefined}
         */
        var removeEventHandlers = function() {
            self.unbind("load", onLoad);
            self.unbind("readystatechange", callback);
            self.unbind("error", which);
        };
        /**
         * @param {Object} pxLoader
         * @return {undefined}
         */
        this.start = function(pxLoader) {
            /** @type {Object} */
            loader = pxLoader;
            self.bind("load", onLoad);
            self.bind("readystatechange", callback);
            self.bind("error", which);
            /** @type {string} */
            self.img.src = name;
        };
        /**
         * @return {undefined}
         */
        this.checkStatus = function() {
            if (self.img.complete) {
                removeEventHandlers();
                loader.onLoad(self);
            }
        };
        /**
         * @return {undefined}
         */
        this.onTimeout = function() {
            removeEventHandlers();
            if (self.img.complete) {
                loader.onLoad(self);
            } else {
                loader.onTimeout(self);
            }
        };
        /**
         * @return {?}
         */
        this.getName = function() {
            return name;
        };
        /**
         * @param {string} event
         * @param {Function} callback
         * @return {undefined}
         */
        this.bind = function(event, callback) {
            if (self.img.addEventListener) {
                self.img.addEventListener(event, callback, false);
            } else {
                if (self.img.attachEvent) {
                    self.img.attachEvent("on" + event, callback);
                }
            }
        };
        /**
         * @param {string} type
         * @param {Function} callback
         * @return {undefined}
         */
        this.unbind = function(type, callback) {
            if (self.img.removeEventListener) {
                self.img.removeEventListener(type, callback, false);
            } else {
                if (self.img.detachEvent) {
                    self.img.detachEvent("on" + type, callback);
                }
            }
        };
    }
    /** @type {function (string, Object, number, Object): undefined} */
    module.exports = create;
}), require.register("./lib/orientation-tip", function(dataAndEvents, module) {
    var getActual = require("./lib/zepto");
    var nodes = require("./lib/orientation-tip/template.html");
    /**
     * @return {undefined}
     */
    module.exports = function() {
        getActual("body").append(nodes);
    };
}), require.define("./lib/orientation-tip/template.html", '<style type="text/css">\n@-webkit-keyframes rotation {\n    10% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    50%, 60% {\n        transform: rotate(0deg);\n        -webkit-transform: rotate(0deg)\n    }\n    90% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    100% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n}\n\n@keyframes rotation {\n    10% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    50%, 60% {\n        transform: rotate(0deg);\n        -webkit-transform: rotate(0deg)\n    }\n    90% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    100% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n}\n\n#orientLayer {\n    display: none;\n}\n\n@media screen and (min-aspect-ratio: 13/8) {\n    #orientLayer {\n        display: block;\n    }\n}\n\n.mod-orient-layer {\n    display: none;\n    position: fixed;\n    height: 100%;\n    width: 100%;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    background: #000;\n    z-index: 9997\n}\n\n.mod-orient-layer__content {\n    position: absolute;\n    width: 100%;\n    top: 45%;\n    margin-top: -75px;\n    text-align: center\n}\n\n.mod-orient-layer__icon-orient {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC");\n    display: inline-block;\n    width: 67px;\n    height: 109px;\n    transform: rotate(90deg);\n    -webkit-transform: rotate(90deg);\n    -webkit-animation: rotation infinite 1.5s ease-in-out;\n    animation: rotation infinite 1.5s ease-in-out;\n    -webkit-background-size: 67px;\n    background-size: 67px\n}\n\n.mod-orient-layer__desc {\n    margin-top: 20px;\n    font-size: 15px;\n    color: #fff\n} </style>\n<div id="orientLayer" class="mod-orient-layer">\n    <div class="mod-orient-layer__content"><i class="icon mod-orient-layer__icon-orient"></i>\n\n        <div class="mod-orient-layer__desc">\u00e4\u00b8\u00ba\u00e4\u00ba\u2020\u00e6\u203a\u00b4\u00e5\u00a5\u00bd\u00e7\u0161\u201e\u00e4\u00bd\u201c\u00e9\u00aa\u0152\u00ef\u00bc\u0152\u00e8\u00af\u00b7\u00e4\u00bd\u00bf\u00e7\u201d\u00a8\u00e7\u00ab\u2013\u00e5\u00b1\u008f\u00e6\u00b5\u008f\u00e8\u00a7\u02c6</div>\n    </div>\n</div>'),
    require.register("./lib/page-slider", function(dataAndEvents, context) {
        /**
         * @param {Object} options
         * @return {undefined}
         */
        function start(options) {
            this.pages = options.pages;
            this.length = this.pages.length;
            if (!(this.length <= 1)) {
                this.toggleClass = options.toggleClass || "current";
                this.swipe = options.swipe ? options.swipe.toUpperCase() : "Y";
                this.animateFn = options.animateFn || "ease-in-out";
                /** @type {number} */
                this.speed = options.speed ? options.speed / 1E3 : 0.5;
                this.control = options.control || false;
                this.controlClass = options.controlClass || "page-control";
                this.bubble = options.bubble || false;
                this.preLoad = options.preLoad || false;
                this.loading = options.loading;
                this.onComplete = options.onComplete || function() {
                    };
                this.onBefore = options.onBefore || function() {
                    };
                /** @type {number} */
                this.index = 0;
                this.curPage = this.pages[this.index];
                this.wraper = this.curPage.parentNode;
                /** @type {number} */
                this.width = document.documentElement.clientWidth;
                /** @type {number} */
                this.height = document.documentElement.clientHeight;
                /** @type {null} */
                this.flag = null;
                /** @type {string} */
                this._swipe = "up";
                /** @type {null} */
                this.controls = null;
                this._init();
            }
        }
        var classList = {
            /**
             * @param {Node} element
             * @param {string} className
             * @return {undefined}
             */
            addClass : function(element, className) {
                /** @type {RegExp} */
                var regExp = new RegExp("(^| )" + className + "( |$)");
                if (!regExp.test(element.className)) {
                    element.className = element.className.split(/\s+/).concat(className).join(" ");
                }
            },
            /**
             * @param {Node} element
             * @param {string} classNames
             * @return {undefined}
             */
            removeClass : function(element, classNames) {
                /** @type {RegExp} */
                var reg = new RegExp("(^|\\s)" + classNames + "(\\s|$)", "g");
                element.className = element.className.replace(reg, "");
            }
        };
        start.prototype = {
            /**
             * @return {undefined}
             */
            _init : function() {
                var cvs = this;
                /** @type {string} */
                this.wraper.style.webkitTransition = "-webkit-transform " + this.speed + "s " + this.animateFn;
                /** @type {number} */
                var i = 0;
                for (;i < this.length;i++) {
                    if ("X" === this.swipe) {
                        /** @type {string} */
                        this.pages[i].style["float"] = "left";
                    }
                }
                if (this.control) {
                    this._control();
                }
                this.resizeSet();
                window.addEventListener("resize", function() {
                    /** @type {number} */
                    cvs.width = document.documentElement.clientWidth;
                    /** @type {number} */
                    cvs.height = document.documentElement.clientHeight;
                    cvs.resizeSet();
                }, false);
                this.wraper.addEventListener("touchstart", function(type) {
                    cvs._startHandle(type);
                }, false);
                this.wraper.addEventListener("touchmove", function(deepDataAndEvents) {
                    cvs._moveHandle(deepDataAndEvents);
                }, false);
                this.wraper.addEventListener("touchend", function(deepDataAndEvents) {
                    cvs._endHandle(deepDataAndEvents);
                }, false);
                this.run(this.index);
            },
            /**
             * @return {undefined}
             */
            _control : function() {
                var parent = this.wraper.parentNode;
                /** @type {Element} */
                var element = document.createElement("div");
                /** @type {string} */
                var xhtml = "";
                /** @type {number} */
                var i = 0;
                for (;i < this.length;i++) {
                    xhtml += "<span>" + (i + 1) + "</span>";
                }
                /** @type {string} */
                element.innerHTML = xhtml;
                element.className = this.controlClass;
                /** @type {number} */
                element.style.zIndex = 9999;
                parent.appendChild(element);
                this.controls = parent.getElementsByTagName("span");
            },
            /**
             * @param {Object} event
             * @return {undefined}
             */
            _startHandle : function(event) {
                var touch = event.touches[0];
                if (this.bubble) {
                    event.stopPropagation();
                }
                this.startX = touch.clientX;
                this.startY = touch.clientY;
            },
            /**
             * @param {Event} deepDataAndEvents
             * @return {undefined}
             */
            _moveHandle : function(deepDataAndEvents) {
                deepDataAndEvents.preventDefault();
            },
            /**
             * @param {Event} deepDataAndEvents
             * @return {undefined}
             */
            _endHandle : function(deepDataAndEvents) {
                var touch = deepDataAndEvents.changedTouches[0];
                /** @type {number} */
                var deltaX = touch.clientX - this.startX;
                /** @type {number} */
                var deltaY = touch.clientY - this.startY;
                /** @type {string} */
                this.flag = Math.abs(deltaX) > Math.abs(deltaY) ? "X" : "Y";
                if (this.flag === this.swipe) {
                    if ("X" === this.swipe) {
                        if (deltaX > 20) {
                            this.prev();
                        } else {
                            if (-20 > deltaX) {
                                this.next();
                            }
                        }
                    } else {
                        if ("Y" === this.swipe) {
                            if (deltaY > 20) {
                                this.prev();
                            } else {
                                if (-20 > deltaY) {
                                    this.next();
                                }
                            }
                        }
                    }
                }
            },
            /**
             * @return {undefined}
             */
            prev : function() {
                this.run(this.index - 1);
            },
            /**
             * @return {undefined}
             */
            next : function() {
                this.run(this.index + 1);
            },
            /**
             * @param {number} i
             * @return {undefined}
             */
            run : function(i) {
                var toSize;
                if (!(i >= this.length || 0 > i)) {
                    if (this.onBefore) {
                        this.onBefore.call(this);
                    }
                    if ("X" === this.swipe) {
                        /** @type {string} */
                        toSize = -this.width * i + "px";
                        /** @type {string} */
                        this.wraper.style.webkitTransform = "translate(" + toSize + ", 0)";
                    } else {
                        if ("Y" === this.swipe) {
                            /** @type {string} */
                            toSize = -this.height * i + "px";
                            /** @type {string} */
                            this.wraper.style.webkitTransform = "translate(0, " + toSize + ")";
                        }
                    }
                    this._toggleClassFn(this.pages, this.index, i);
                    if (this.control) {
                        this._toggleClassFn(this.controls, this.index, i);
                    }
                    /** @type {number} */
                    this.index = i;
                    if (this.onComplete) {
                        this.onComplete.call(this);
                    }
                    var node = this.pages[this.index];
                    if (this.preLoad) {
                        if (node) {
                            if (!node.parsed) {
                                this._preLoadFn(node);
                            }
                        }
                    }
                }
            },
            /**
             * @param {Array} classes
             * @param {number} i
             * @param {number} index
             * @return {undefined}
             */
            _toggleClassFn : function(classes, i, index) {
                var klass = classes[i];
                var className = classes[index];
                var node = this;
                setTimeout(function() {
                    if (klass) {
                        classList.removeClass(klass, node.toggleClass);
                    }
                    if (className) {
                        classList.addClass(className, node.toggleClass);
                    }
                }, 500);
            },
            /**
             * @param {Object} node
             * @return {undefined}
             */
            _preLoadFn : function(node) {
                var o = node.getElementsByTagName("textarea")[0];
                if (o) {
                    node.innerHTML = o.value;
                    /** @type {boolean} */
                    node.parsed = true;
                }
            },
            /**
             * @return {undefined}
             */
            resizeSet : function() {
                if ("X" === this.swipe) {
                    /** @type {string} */
                    this.wraper.style.width = this.width * this.length + "px";
                    /** @type {string} */
                    this.wraper.style.height = this.height + "px";
                }
                if ("Y" === this.swipe) {
                    /** @type {string} */
                    this.wraper.style.width = this.width + "px";
                    /** @type {string} */
                    this.wraper.style.height = this.height * this.length + "px";
                }
                /** @type {number} */
                var i = 0;
                for (;i < this.length;i++) {
                    /** @type {string} */
                    this.pages[i].style.width = this.width + "px";
                    /** @type {string} */
                    this.pages[i].style.height = this.height + "px";
                }
                this.run(this.index);
            }
        };
        /** @type {function (Object): undefined} */
        context.exports = start;
    }), require.register("./lib/share", function(dataAndEvents, module) {
    /**
     * @param {?} options
     * @return {undefined}
     */
    function Animation(options) {
        this.init(options);
    }
    /**
     * @param {string} msg
     * @return {?}
     */
    function init(msg) {
        return 1 == document.getElementsByName("wxm:" + msg).length ? document.getElementsByName("wxm:" + msg)[0].getAttribute("content") : "undefined";
    }
    var lang = require("./lib/underscore");
    /**
     * @param {?} options
     * @return {undefined}
     */
    Animation.prototype.init = function(options) {
        this.config = {
            timeline : {
                title : init("timeline_title"),
                desc : init("timeline_title")
            },
            appmessage : {
                title : init("appmessage_title"),
                desc : init("appmessage_desc")
            },
            global : {
                img_url : init("img_url"),
                link : init("link")
            }
        };
        this.config = lang.extend({}, options, this.config);
        this.config.timeline = lang.extend({}, this.config.global, this.config.timeline);
        this.config.appmessage = lang.extend({}, this.config.global, this.config.appmessage);
        var app = this;
        /**
         * @return {undefined}
         */
        var run = function() {
            WeixinJSBridge.on("menu:share:appmessage", function() {
                WeixinJSBridge.invoke("sendAppMessage", app.config.appmessage, function(dataAndEvents) {
                    if ("send_app_msg:cancel" !== dataAndEvents.err_msg && lang.isFunction(app.config.appmessage.success)) {
                        app.config.appmessage.success();
                    } else {
                        if (lang.isFunction(app.config.appmessage.cancel)) {
                            app.config.appmessage.success();
                        }
                    }
                });
            });
            WeixinJSBridge.on("menu:share:timeline", function() {
                WeixinJSBridge.invoke("shareTimeline", app.config.timeline, function(dataAndEvents) {
                    if ("share_timeline:cancel" !== dataAndEvents.err_msg && lang.isFunction(app.config.timeline.success)) {
                        app.config.timeline.success();
                    } else {
                        if (lang.isFunction(__this._this.config.timeline.success)) {
                            app.config.timeline.success();
                        }
                    }
                });
            });
        };
        if ("undefined" == typeof window.WeixinJSBridge) {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", run, false);
            } else {
                if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", run);
                    document.attachEvent("onWeixinJSBridgeReady", run);
                }
            }
        } else {
            run();
        }
    };
    /**
     * @return {undefined}
     */
    Animation.prototype.set = function() {
        if (3 === arguments.length && (lang.isString(arguments[0]) && lang.isString(arguments[1]))) {
            this.config[arguments[0]][arguments[1]] = arguments[2];
        } else {
            console.log("[WxMoment Share] set \u00e5\u2021\u00bd\u00e6\u2022\u00b0\u00e5\u008f\u201a\u00e6\u2022\u00b0\u00e9\u201d\u2122\u00e8\u00af\u00af");
        }
    };
    /** @type {function (?): undefined} */
    module.exports = Animation;
}), require.register("./lib/video", function(dataAndEvents, module) {
    /**
     * @param {Object} opts
     * @param {?} allBindingsAccessor
     * @return {?}
     */
    function init(opts, allBindingsAccessor) {
        return obj = $.extend({
            vid : null,
            width : "100%",
            height : "100%",
            modId : "WxMomentVideo",
            isHtml5ControlAlwaysShow : false,
            isHtml5UseUI : true,
            html5LiveUIFeature : false,
            isHtml5UseFakeFullScreen : true,
            playerType : "html5",
            noLimitBtn : true,
            isiPhoneShowPosterOnPause : false,
            vodFlashExtVars : {
                share : 0,
                follow : 0,
                showlogo : 0,
                clientbar : 0
            },
            plugins : {
                AppBanner : 0,
                AppRecommend : 0
            },
            autoplay : false,
            /**
             * @return {undefined}
             */
            oninited : function() {
            },
            /**
             * @return {undefined}
             */
            onplaying : function() {
            },
            /**
             * @return {undefined}
             */
            onpause : function() {
            },
            /**
             * @return {undefined}
             */
            onresume : function() {
            },
            /**
             * @return {undefined}
             */
            onallended : function() {
            },
            /**
             * @param {?} dataAndEvents
             * @return {undefined}
             */
            onfullscreen : function(dataAndEvents) {
            }
        }, opts), obj.vid ? (loadScript(), game) : void console.log("\u00e8\u00af\u00b7\u00e8\u00ae\u00be\u00e7\u00bd\u00ae\u00e8\u00a7\u2020\u00e9\u00a2\u2018 vid");
    }
    /**
     * @return {undefined}
     */
    function loadScript() {
        var _this = document.getElementsByTagName("head")[0] || document.documentElement;
        /** @type {Element} */
        var tag = document.createElement("script");
        /** @type {string} */
        tag.async = "true";
        /** @type {string} */
        tag.src = "";
        /** @type {boolean} */
        var n = false;
        /** @type {function (): undefined} */
        tag.onload = tag.onreadystatechange = function() {
            if (!(n || this.readyState && ("loaded" !== this.readyState && "complete" !== this.readyState))) {
                /** @type {boolean} */
                n = true;
                try {
                    Game();
                } catch (t) {
                }
                /** @type {null} */
                tag.onload = tag.onreadystatechange = null;
            }
        };
        _this.insertBefore(tag, _this.firstChild);
    }
    /**
     * @return {undefined}
     */
    function Game() {
        _ = new tvp.VideoInfo;
        game = new tvp.Player;
        _.setVid(obj.vid);
        obj.video = _;
        game.create(obj);
    }
    var _;
    var game;
    var obj;
    var $ = require("./lib/underscore");
    /**
     * @return {?}
     */
    init.prototype.getPlayer = function() {
        return game.getPlayer();
    };
    /** @type {function (Object, ?): ?} */
    module.exports = init;
}), require.register("./lib/wxmoment", function(dataAndEvents, module) {
    var util = require("./lib/underscore");
    var Block = require("./lib/analytics");
    var nodes = require("./lib/loader");
    var helper = require("./lib/orientation-tip");
    var inspect = require("./lib/page-slider");
    var selfClosing = require("./lib/share");
    var getActual = require("./lib/video");
    /**
     * @param {?} options
     * @return {undefined}
     */
    var setup = function(options) {
        /** @type {string} */
        this.version = "0.0.1";
        this.options = {};
        this.options = util.extend(this.options, options);
        this.Loader = nodes;
        this.Analytics = Block;
        this.PageSlider = inspect;
        this.Share = selfClosing;
        this.OrientationTip = helper;
        this.Video = getActual;
    };
    if (!Date.now) {
        /**
         * @return {number}
         */
        Date.now = function() {
            return(new Date).getTime();
        };
    }
    if (!Array.isArray) {
        /**
         * @param {*} obj
         * @return {boolean}
         */
        Array.isArray = function(obj) {
            return "[object Array]" === Object.prototype.toString.call(obj);
        };
    }
    module.exports = window.WxMoment = new setup;
}), require("./lib/wxmoment");

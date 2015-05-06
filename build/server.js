module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(93);
  
  var _lodash = __webpack_require__(98);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _fs = __webpack_require__(97);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(99);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(96);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _react = __webpack_require__(21);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _coreDatabase = __webpack_require__(92);
  
  var _coreDatabase2 = _interopRequireDefault(_coreDatabase);
  
  var _componentsApp = __webpack_require__(90);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var server = _express2['default']();
  
  server.set('port', process.env.PORT || 5000);
  server.use(_express2['default']['static'](_path2['default'].join(__dirname)));
  
  var templateFile = _path2['default'].join(__dirname, 'templates/index.html');
  var template = _lodash2['default'].template(_fs2['default'].readFileSync(templateFile, 'utf8'));
  
  server.get('*', function (req, res, next) {
    try {
      (function () {
        var uri = req.path;
        var notFound = false;
        var data = {
          description: ''
        };
        var app = _react2['default'].createElement(_componentsApp2['default'], {
          path: req.path,
          onSetTitle: function (title) {
            data.title = title;
          },
          onPageNotFound: function () {
            notFound = true;
          } });
  
        data.body = _react2['default'].renderToString(app);
        if (notFound) {
          res.status(404).send();
        } else {
          var html = template(data);
          res.send(html);
        }
      })();
    } catch (err) {
      next(err);
    }
  });
  
  server.listen(server.get('port'), function () {
    if (process.send) {
      process.send('online');
    } else {
      console.log('The server is running at http://localhost:' + server.get('port'));
    }
  });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')()
    , core   = {}
    , defineProperty = Object.defineProperty
    , hasOwnProperty = {}.hasOwnProperty
    , ceil  = Math.ceil
    , floor = Math.floor
    , max   = Math.max
    , min   = Math.min;
  // The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
  var DESC = !!function(){
    try {
      return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
    } catch(e){ /* empty */ }
  }();
  var hide = createDefiner(1);
  // 7.1.4 ToInteger
  function toInteger(it){
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value){
    return {
      enumerable  : !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable    : !(bitmap & 4),
      value       : value
    };
  }
  function simpleSet(object, key, value){
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap){
    return DESC ? function(object, key, value){
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  
  function isObject(it){
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it){
    return typeof it == 'function';
  }
  function assertDefined(it){
    if(it == undefined)throw TypeError("Can't call method on  " + it);
    return it;
  }
  
  var $ = module.exports = __webpack_require__(37)({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    // http://jsperf.com/core-js-isobject
    isObject:   isObject,
    isFunction: isFunction,
    it: function(it){
      return it;
    },
    that: function(){
      return this;
    },
    // 7.1.4 ToInteger
    toInteger: toInteger,
    // 7.1.15 ToLength
    toLength: function(it){
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    },
    toIndex: function(index, length){
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key){
      return hasOwnProperty.call(it, key);
    },
    create:     Object.create,
    getProto:   Object.getPrototypeOf,
    DESC:       DESC,
    desc:       desc,
    getDesc:    Object.getOwnPropertyDescriptor,
    setDesc:    defineProperty,
    setDescs:   Object.defineProperties,
    getKeys:    Object.keys,
    getNames:   Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    // Dummy, fix for not array-like ES3 string in es5 module
    ES5Object: Object,
    toObject: function(it){
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    mix: function(target, src){
      for(var key in src)hide(target, key, src[key]);
      return target;
    },
    each: [].forEach
  });
  /* eslint-disable no-undef */
  if(typeof __e != 'undefined')__e = core;
  if(typeof __g != 'undefined')__g = global;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  var $          = __webpack_require__(1)
    , global     = $.g
    , core       = $.core
    , isFunction = $.isFunction;
  function ctx(fn, that){
    return function(){
      return fn.apply(that, arguments);
    };
  }
  global.core = core;
  // type bitmap
  $def.F = 1;  // forced
  $def.G = 2;  // global
  $def.S = 4;  // static
  $def.P = 8;  // proto
  $def.B = 16; // bind
  $def.W = 32; // wrap
  function $def(type, name, source){
    var key, own, out, exp
      , isGlobal = type & $def.G
      , target   = isGlobal ? global : type & $def.S
          ? global[name] : (global[name] || {}).prototype
      , exports  = isGlobal ? core : core[name] || (core[name] = {});
    if(isGlobal)source = name;
    for(key in source){
      // contains in native
      own = !(type & $def.F) && target && key in target;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      if(type & $def.B && own)exp = ctx(out, global);
      else exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
      // extend global
      if(target && !own){
        if(isGlobal)target[key] = out;
        else delete target[key] && $.hide(target, key, out);
      }
      // export
      if(exports[key] != out)$.hide(exports, key, exp);
    }
  }
  module.exports = $def;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  function assert(condition, msg1, msg2){
    if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
  }
  assert.def = $.assertDefined;
  assert.fn = function(it){
    if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
    return it;
  };
  assert.obj = function(it){
    if(!$.isObject(it))throw TypeError(it + ' is not an object!');
    return it;
  };
  assert.inst = function(it, Constructor, name){
    if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  module.exports = assert;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , TAG      = __webpack_require__(5)('toStringTag')
    , toString = {}.toString;
  function cof(it){
    return toString.call(it).slice(8, -1);
  }
  cof.classof = function(it){
    var O, T;
    return it == undefined ? it === undefined ? 'Undefined' : 'Null'
      : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
  };
  cof.set = function(it, tag, stat){
    if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
  };
  module.exports = cof;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  var global = __webpack_require__(1).g
    , store  = {};
  module.exports = function(name){
    return store[name] || (store[name] =
      global.Symbol && global.Symbol[name] || __webpack_require__(7).safe('Symbol.' + name));
  };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $                 = __webpack_require__(1)
    , cof               = __webpack_require__(4)
    , assertObject      = __webpack_require__(3).obj
    , SYMBOL_ITERATOR   = __webpack_require__(5)('iterator')
    , FF_ITERATOR       = '@@iterator'
    , Iterators         = {}
    , IteratorPrototype = {};
  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  setIterator(IteratorPrototype, $.that);
  function setIterator(O, value){
    $.hide(O, SYMBOL_ITERATOR, value);
    // Add iterator for FF iterator protocol
    if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
  }
  
  module.exports = {
    // Safari has buggy iterators w/o `next`
    BUGGY: 'keys' in [] && !('next' in [].keys()),
    Iterators: Iterators,
    step: function(done, value){
      return {value: value, done: !!done};
    },
    is: function(it){
      var O      = Object(it)
        , Symbol = $.g.Symbol
        , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
      return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
    },
    get: function(it){
      var Symbol  = $.g.Symbol
        , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
        , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
      return assertObject(getIter.call(it));
    },
    set: setIterator,
    create: function(Constructor, NAME, next, proto){
      Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
      cof.set(Constructor, NAME + ' Iterator');
    }
  };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  var sid = 0;
  function uid(key){
    return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
  }
  uid.safe = __webpack_require__(1).g.Symbol || uid;
  module.exports = uid;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  // Optional / simple context binding
  var assertFunction = __webpack_require__(3).fn;
  module.exports = function(fn, that, length){
    assertFunction(fn);
    if(~length && that === undefined)return fn;
    switch(length){
      case 1: return function(a){
        return fn.call(that, a);
      };
      case 2: return function(a, b){
        return fn.call(that, a, b);
      };
      case 3: return function(a, b, c){
        return fn.call(that, a, b, c);
      };
    } return function(/* ...args */){
        return fn.apply(that, arguments);
      };
  };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  // 22.1.3.31 Array.prototype[@@unscopables]
  var $           = __webpack_require__(1)
    , UNSCOPABLES = __webpack_require__(5)('unscopables');
  if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key){
    if($.FW)[][UNSCOPABLES][key] = true;
  };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  var ctx  = __webpack_require__(8)
    , get  = __webpack_require__(6).get
    , call = __webpack_require__(28);
  module.exports = function(iterable, entries, fn, that){
    var iterator = get(iterable)
      , f        = ctx(fn, that, entries ? 2 : 1)
      , step;
    while(!(step = iterator.next()).done){
      if(call(iterator, f, step.value, entries) === false){
        return call.close(iterator);
      }
    }
  };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex
  var $   = __webpack_require__(1)
    , ctx = __webpack_require__(8);
  module.exports = function(TYPE){
    var IS_MAP        = TYPE == 1
      , IS_FILTER     = TYPE == 2
      , IS_SOME       = TYPE == 3
      , IS_EVERY      = TYPE == 4
      , IS_FIND_INDEX = TYPE == 6
      , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that){
      var O      = Object($.assertDefined($this))
        , self   = $.ES5Object(O)
        , f      = ctx(callbackfn, that, 3)
        , length = $.toLength(self.length)
        , index  = 0
        , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
        , val, res;
      for(;length > index; index++)if(NO_HOLES || index in self){
        val = self[index];
        res = f(val, index, O);
        if(TYPE){
          if(IS_MAP)result[index] = res;            // map
          else if(res)switch(TYPE){
            case 3: return true;                    // some
            case 5: return val;                     // find
            case 6: return index;                   // findIndex
            case 2: result.push(val);               // filter
          } else if(IS_EVERY)return false;          // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $     = __webpack_require__(1)
    , $def  = __webpack_require__(2)
    , BUGGY = __webpack_require__(6).BUGGY
    , forOf = __webpack_require__(10)
    , species = __webpack_require__(14)
    , assertInstance = __webpack_require__(3).inst;
  
  module.exports = function(NAME, methods, common, IS_MAP, IS_WEAK){
    var Base  = $.g[NAME]
      , C     = Base
      , ADDER = IS_MAP ? 'set' : 'add'
      , proto = C && C.prototype
      , O     = {};
    function fixMethod(KEY, CHAIN){
      var method = proto[KEY];
      if($.FW)proto[KEY] = function(a, b){
        var result = method.call(this, a === 0 ? 0 : a, b);
        return CHAIN ? this : result;
      };
    }
    if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
      // create collection constructor
      C = common.getConstructor(NAME, IS_MAP, ADDER);
      $.mix(C.prototype, methods);
    } else {
      var inst  = new C
        , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
        , buggyZero;
      // wrap for init collections from iterable
      if(!__webpack_require__(16)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
        C = function(){
          assertInstance(this, C, NAME);
          var that     = new Base
            , iterable = arguments[0];
          if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        };
        C.prototype = proto;
        if($.FW)proto.constructor = C;
      }
      IS_WEAK || inst.forEach(function(val, key){
        buggyZero = 1 / key === -Infinity;
      });
      // fix converting -0 key to +0
      if(buggyZero){
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      // + fix .add & .set for chaining
      if(buggyZero || chain !== inst)fixMethod(ADDER, true);
    }
  
    __webpack_require__(4).set(C, NAME);
  
    O[NAME] = C;
    $def($def.G + $def.W + $def.F * (C != Base), O);
    species(C);
    species($.core[NAME]); // for wrapper
  
    if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);
  
    return C;
  };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  // Fast apply
  // http://jsperf.lnkit.com/fast-apply/5
  module.exports = function(fn, args, that){
    var un = that === undefined;
    switch(args.length){
      case 0: return un ? fn()
                        : fn.call(that);
      case 1: return un ? fn(args[0])
                        : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
                        : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
                        : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
                        : fn.call(that, args[0], args[1], args[2], args[3]);
      case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                        : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
    } return              fn.apply(that, args);
  };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  var $       = __webpack_require__(1)
    , SPECIES = __webpack_require__(5)('species');
  module.exports = function(C){
    if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
      configurable: true,
      get: $.that
    });
  };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  var $def            = __webpack_require__(2)
    , $               = __webpack_require__(1)
    , cof             = __webpack_require__(4)
    , $iter           = __webpack_require__(6)
    , SYMBOL_ITERATOR = __webpack_require__(5)('iterator')
    , FF_ITERATOR     = '@@iterator'
    , KEYS            = 'keys'
    , VALUES          = 'values'
    , Iterators       = $iter.Iterators;
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
    $iter.create(Constructor, NAME, next);
    function createMethod(kind){
      function $$(that){
        return new Constructor(that, kind);
      }
      switch(kind){
        case KEYS: return function keys(){ return $$(this); };
        case VALUES: return function values(){ return $$(this); };
      } return function entries(){ return $$(this); };
    }
    var TAG      = NAME + ' Iterator'
      , proto    = Base.prototype
      , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
      , _default = _native || createMethod(DEFAULT)
      , methods, key;
    // Fix native
    if(_native){
      var IteratorPrototype = $.getProto(_default.call(new Base));
      // Set @@toStringTag to native iterators
      cof.set(IteratorPrototype, TAG, true);
      // FF fix
      if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
    }
    // Define iterator
    if($.FW)$iter.set(proto, _default);
    // Plug for library
    Iterators[NAME] = _default;
    Iterators[TAG]  = $.that;
    if(DEFAULT){
      methods = {
        keys:    IS_SET            ? _default : createMethod(KEYS),
        values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if(FORCE)for(key in methods){
        if(!(key in proto))$.hide(proto, key, methods[key]);
      } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
    }
  };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  var SYMBOL_ITERATOR = __webpack_require__(5)('iterator')
    , SAFE_CLOSING    = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function(){ SAFE_CLOSING = true; };
    Array.from(riter, function(){ throw 2; });
  } catch(e){ /* empty */ }
  module.exports = function(exec){
    if(!SAFE_CLOSING)return false;
    var safe = false;
    try {
      var arr  = [7]
        , iter = arr[SYMBOL_ITERATOR]();
      iter.next = function(){ safe = true; };
      arr[SYMBOL_ITERATOR] = function(){ return iter; };
      exec(arr);
    } catch(e){ /* empty */ }
    return safe;
  };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  module.exports = function(regExp, replace, isStatic){
    var replacer = replace === Object(replace) ? function(part){
      return replace[part];
    } : replace;
    return function(it){
      return String(isStatic ? it : this).replace(regExp, replacer);
    };
  };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var $      = __webpack_require__(1)
    , assert = __webpack_require__(3);
  function check(O, proto){
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
      ? function(buggy, set){
          try {
            set = __webpack_require__(8)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
            set({}, []);
          } catch(e){ buggy = true; }
          return function setPrototypeOf(O, proto){
            check(O, proto);
            if(buggy)O.__proto__ = proto;
            else set(O, proto);
            return O;
          };
        }()
      : undefined),
    check: check
  };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  // true  -> String#at
  // false -> String#codePointAt
  var $ = __webpack_require__(1);
  module.exports = function(TO_STRING){
    return function(that, pos){
      var s = String($.assertDefined(that))
        , i = $.toInteger(pos)
        , l = s.length
        , a, b;
      if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l
        || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
          ? TO_STRING ? s.charAt(i) : a
          : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = function(exec){
    try {
      exec();
      return false;
    } catch(e){
      return true;
    }
  };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("react");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  // false -> Array#indexOf
  // true  -> Array#includes
  var $ = __webpack_require__(1);
  module.exports = function(IS_INCLUDES){
    return function($this, el, fromIndex){
      var O      = $.toObject($this)
        , length = $.toLength(O.length)
        , index  = $.toIndex(fromIndex, length)
        , value;
      if(IS_INCLUDES && el != el)while(length > index){
        value = O[index++];
        if(value != value)return true;
      } else for(;length > index; index++)if(IS_INCLUDES || index in O){
        if(O[index] === el)return IS_INCLUDES || index;
      } return !IS_INCLUDES && -1;
    };
  };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $        = __webpack_require__(1)
    , ctx      = __webpack_require__(8)
    , safe     = __webpack_require__(7).safe
    , assert   = __webpack_require__(3)
    , forOf    = __webpack_require__(10)
    , step     = __webpack_require__(6).step
    , has      = $.has
    , set      = $.set
    , isObject = $.isObject
    , hide     = $.hide
    , isFrozen = Object.isFrozen || $.core.Object.isFrozen
    , ID       = safe('id')
    , O1       = safe('O1')
    , LAST     = safe('last')
    , FIRST    = safe('first')
    , ITER     = safe('iter')
    , SIZE     = $.DESC ? safe('size') : 'size'
    , id       = 0;
  
  function fastKey(it, create){
    // return primitive with prefix
    if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
    // can't set id to frozen object
    if(isFrozen(it))return 'F';
    if(!has(it, ID)){
      // not necessary to add id
      if(!create)return 'E';
      // add missing object id
      hide(it, ID, ++id);
    // return object id with prefix
    } return 'O' + it[ID];
  }
  
  function getEntry(that, key){
    // fast case
    var index = fastKey(key), entry;
    if(index != 'F')return that[O1][index];
    // frozen object case
    for(entry = that[FIRST]; entry; entry = entry.n){
      if(entry.k == key)return entry;
    }
  }
  
  module.exports = {
    getConstructor: function(NAME, IS_MAP, ADDER){
      function C(){
        var that     = assert.inst(this, C, NAME)
          , iterable = arguments[0];
        set(that, O1, $.create(null));
        set(that, SIZE, 0);
        set(that, LAST, undefined);
        set(that, FIRST, undefined);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
      }
      $.mix(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear(){
          for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
            entry.r = true;
            if(entry.p)entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that[FIRST] = that[LAST] = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function(key){
          var that  = this
            , entry = getEntry(that, key);
          if(entry){
            var next = entry.n
              , prev = entry.p;
            delete that[O1][entry.i];
            entry.r = true;
            if(prev)prev.n = next;
            if(next)next.p = prev;
            if(that[FIRST] == entry)that[FIRST] = next;
            if(that[LAST] == entry)that[LAST] = prev;
            that[SIZE]--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /*, that = undefined */){
          var f = ctx(callbackfn, arguments[1], 3)
            , entry;
          while(entry = entry ? entry.n : this[FIRST]){
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while(entry && entry.r)entry = entry.p;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key){
          return !!getEntry(this, key);
        }
      });
      if($.DESC)$.setDesc(C.prototype, 'size', {
        get: function(){
          return assert.def(this[SIZE]);
        }
      });
      return C;
    },
    def: function(that, key, value){
      var entry = getEntry(that, key)
        , prev, index;
      // change existing entry
      if(entry){
        entry.v = value;
      // create new entry
      } else {
        that[LAST] = entry = {
          i: index = fastKey(key, true), // <- index
          k: key,                        // <- key
          v: value,                      // <- value
          p: prev = that[LAST],          // <- previous entry
          n: undefined,                  // <- next entry
          r: false                       // <- removed
        };
        if(!that[FIRST])that[FIRST] = entry;
        if(prev)prev.n = entry;
        that[SIZE]++;
        // add to index
        if(index != 'F')that[O1][index] = entry;
      } return that;
    },
    getEntry: getEntry,
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    setIter: function(C, NAME, IS_MAP){
      __webpack_require__(15)(C, NAME, function(iterated, kind){
        set(this, ITER, {o: iterated, k: kind});
      }, function(){
        var iter  = this[ITER]
          , kind  = iter.k
          , entry = iter.l;
        // revert to the last existing entry
        while(entry && entry.r)entry = entry.p;
        // get next entry
        if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
          // or finish the iteration
          iter.o = undefined;
          return step(1);
        }
        // return step by kind
        if(kind == 'keys'  )return step(0, entry.k);
        if(kind == 'values')return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
    }
  };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $def  = __webpack_require__(2)
    , forOf = __webpack_require__(10);
  module.exports = function(NAME){
    $def($def.P, NAME, {
      toJSON: function toJSON(){
        var arr = [];
        forOf(this, false, arr.push, arr);
        return arr;
      }
    });
  };

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $         = __webpack_require__(1)
    , safe      = __webpack_require__(7).safe
    , assert    = __webpack_require__(3)
    , forOf     = __webpack_require__(10)
    , _has      = $.has
    , isObject  = $.isObject
    , hide      = $.hide
    , isFrozen  = Object.isFrozen || $.core.Object.isFrozen
    , id        = 0
    , ID        = safe('id')
    , WEAK      = safe('weak')
    , LEAK      = safe('leak')
    , method    = __webpack_require__(11)
    , find      = method(5)
    , findIndex = method(6);
  function findFrozen(store, key){
    return find(store.array, function(it){
      return it[0] === key;
    });
  }
  // fallback for frozen keys
  function leakStore(that){
    return that[LEAK] || hide(that, LEAK, {
      array: [],
      get: function(key){
        var entry = findFrozen(this, key);
        if(entry)return entry[1];
      },
      has: function(key){
        return !!findFrozen(this, key);
      },
      set: function(key, value){
        var entry = findFrozen(this, key);
        if(entry)entry[1] = value;
        else this.array.push([key, value]);
      },
      'delete': function(key){
        var index = findIndex(this.array, function(it){
          return it[0] === key;
        });
        if(~index)this.array.splice(index, 1);
        return !!~index;
      }
    })[LEAK];
  }
  
  module.exports = {
    getConstructor: function(NAME, IS_MAP, ADDER){
      function C(){
        $.set(assert.inst(this, C, NAME), ID, id++);
        var iterable = arguments[0];
        if(iterable != undefined)forOf(iterable, IS_MAP, this[ADDER], this);
      }
      $.mix(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function(key){
          if(!isObject(key))return false;
          if(isFrozen(key))return leakStore(this)['delete'](key);
          return _has(key, WEAK) && _has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key){
          if(!isObject(key))return false;
          if(isFrozen(key))return leakStore(this).has(key);
          return _has(key, WEAK) && _has(key[WEAK], this[ID]);
        }
      });
      return C;
    },
    def: function(that, key, value){
      if(isFrozen(assert.obj(key))){
        leakStore(that).set(key, value);
      } else {
        _has(key, WEAK) || hide(key, WEAK, {});
        key[WEAK][that[ID]] = value;
      } return that;
    },
    leakStore: leakStore,
    WEAK: WEAK,
    ID: ID
  };

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , document = $.g.document
    , isObject = $.isObject
    // in old IE typeof document.createElement is 'object'
    , is = isObject(document) && isObject(document.createElement);
  module.exports = function(it){
    return is ? document.createElement(it) : {};
  };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  module.exports = function(it){
    var keys       = $.getKeys(it)
      , getDesc    = $.getDesc
      , getSymbols = $.getSymbols;
    if(getSymbols)$.each.call(getSymbols(it), function(key){
      if(getDesc(it, key).enumerable)keys.push(key);
    });
    return keys;
  };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  var assertObject = __webpack_require__(3).obj;
  function close(iterator){
    var ret = iterator['return'];
    if(ret !== undefined)assertObject(ret.call(iterator));
  }
  function call(iterator, fn, value, entries){
    try {
      return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
    } catch(e){
      close(iterator);
      throw e;
    }
  }
  call.close = close;
  module.exports = call;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  var $            = __webpack_require__(1)
    , assertObject = __webpack_require__(3).obj;
  module.exports = function ownKeys(it){
    assertObject(it);
    var keys       = $.getNames(it)
      , getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  // http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
  var $      = __webpack_require__(1)
    , repeat = __webpack_require__(31);
  
  module.exports = function(that, minLength, fillChar, left){
    // 1. Let O be CheckObjectCoercible(this value).
    // 2. Let S be ToString(O).
    var S = String($.assertDefined(that));
    // 4. If intMinLength is undefined, return S.
    if(minLength === undefined)return S;
    // 4. Let intMinLength be ToInteger(minLength).
    var intMinLength = $.toInteger(minLength);
    // 5. Let fillLen be the number of characters in S minus intMinLength.
    var fillLen = intMinLength - S.length;
    // 6. If fillLen < 0, then throw a RangeError exception.
    // 7. If fillLen is +∞, then throw a RangeError exception.
    if(fillLen < 0 || fillLen === Infinity){
      throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
    }
    // 8. Let sFillStr be the string represented by fillStr.
    // 9. If sFillStr is undefined, let sFillStr be a space character.
    var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
    // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
    var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
    // truncate if we overflowed
    if(sFillVal.length > fillLen)sFillVal = left
      ? sFillVal.slice(sFillVal.length - fillLen)
      : sFillVal.slice(0, fillLen);
    // 11. Return a string made from sFillVal, followed by S.
    // 11. Return a String made from S, followed by sFillVal.
    return left ? sFillVal.concat(S) : S.concat(sFillVal);
  };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $ = __webpack_require__(1);
  
  module.exports = function repeat(count){
    var str = String($.assertDefined(this))
      , res = ''
      , n   = $.toInteger(count);
    if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
    for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
    return res;
  };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $      = __webpack_require__(1)
    , ctx    = __webpack_require__(8)
    , cof    = __webpack_require__(4)
    , invoke = __webpack_require__(13)
    , cel    = __webpack_require__(26)
    , global             = $.g
    , isFunction         = $.isFunction
    , html               = $.html
    , process            = global.process
    , setTask            = global.setImmediate
    , clearTask          = global.clearImmediate
    , postMessage        = global.postMessage
    , addEventListener   = global.addEventListener
    , MessageChannel     = global.MessageChannel
    , counter            = 0
    , queue              = {}
    , ONREADYSTATECHANGE = 'onreadystatechange'
    , defer, channel, port;
  function run(){
    var id = +this;
    if($.has(queue, id)){
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  }
  function listner(event){
    run.call(event.data);
  }
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if(!isFunction(setTask) || !isFunction(clearTask)){
    setTask = function(fn){
      var args = [], i = 1;
      while(arguments.length > i)args.push(arguments[i++]);
      queue[++counter] = function(){
        invoke(isFunction(fn) ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function(id){
      delete queue[id];
    };
    // Node.js 0.8-
    if(cof(process) == 'process'){
      defer = function(id){
        process.nextTick(ctx(run, id, 1));
      };
    // Modern browsers, skip implementation for WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is object
    } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
      defer = function(id){
        postMessage(id, '*');
      };
      addEventListener('message', listner, false);
    // WebWorkers
    } else if(isFunction(MessageChannel)){
      channel = new MessageChannel;
      port    = channel.port2;
      channel.port1.onmessage = listner;
      defer = ctx(port.postMessage, port, 1);
    // IE8-
    } else if(ONREADYSTATECHANGE in cel('script')){
      defer = function(id){
        html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
          html.removeChild(this);
          run.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function(id){
        setTimeout(ctx(run, id, 1), 0);
      };
    }
  }
  module.exports = {
    set:   setTask,
    clear: clearTask
  };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  var $          = __webpack_require__(1)
    , setUnscope = __webpack_require__(9)
    , ITER       = __webpack_require__(7).safe('iter')
    , $iter      = __webpack_require__(6)
    , step       = $iter.step
    , Iterators  = $iter.Iterators;
  
  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  __webpack_require__(15)(Array, 'Array', function(iterated, kind){
    $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , kind  = iter.k
      , index = iter.i++;
    if(!O || index >= O.length){
      iter.o = undefined;
      return step(1);
    }
    if(kind == 'keys'  )return step(0, index);
    if(kind == 'values')return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  
  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments = Iterators.Array;
  
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  __webpack_require__(87);
  
  __webpack_require__(88);
  
  if (global._babelPolyfill) {
    throw new Error("only one instance of babel/polyfill is allowed");
  }
  global._babelPolyfill = true;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , enumKeys = __webpack_require__(27);
  // 19.1.2.1 Object.assign(target, source, ...)
  /* eslint-disable no-unused-vars */
  module.exports = Object.assign || function assign(target, source){
  /* eslint-enable no-unused-vars */
    var T = Object($.assertDefined(target))
      , l = arguments.length
      , i = 1;
    while(l > i){
      var S      = $.ES5Object(arguments[i++])
        , keys   = enumKeys(S)
        , length = keys.length
        , j      = 0
        , key;
      while(length > j)T[key = keys[j++]] = S[key];
    }
    return T;
  };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = function($){
    $.FW   = true;
    $.path = $.g;
    return $;
  };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  module.exports = function(object, el){
    var O      = $.toObject(object)
      , keys   = $.getKeys(O)
      , length = keys.length
      , index  = 0
      , key;
    while(length > index)if(O[key = keys[index++]] === el)return key;
  };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $      = __webpack_require__(1)
    , invoke = __webpack_require__(13)
    , assertFunction = __webpack_require__(3).fn;
  module.exports = function(/* ...pargs */){
    var fn     = assertFunction(this)
      , length = arguments.length
      , pargs  = Array(length)
      , i      = 0
      , _      = $.path._
      , holder = false;
    while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
    return function(/* ...args */){
      var that    = this
        , _length = arguments.length
        , j = 0, k = 0, args;
      if(!holder && !_length)return invoke(fn, pargs, that);
      args = pargs.slice();
      if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
      while(_length > k)args.push(arguments[k++]);
      return invoke(fn, args, that);
    };
  };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  var $                = __webpack_require__(1)
    , cel              = __webpack_require__(26)
    , cof              = __webpack_require__(4)
    , $def             = __webpack_require__(2)
    , invoke           = __webpack_require__(13)
    , arrayMethod      = __webpack_require__(11)
    , IE_PROTO         = __webpack_require__(7).safe('__proto__')
    , assert           = __webpack_require__(3)
    , assertObject     = assert.obj
    , ObjectProto      = Object.prototype
    , A                = []
    , slice            = A.slice
    , indexOf          = A.indexOf
    , classof          = cof.classof
    , has              = $.has
    , defineProperty   = $.setDesc
    , getOwnDescriptor = $.getDesc
    , defineProperties = $.setDescs
    , isFunction       = $.isFunction
    , toObject         = $.toObject
    , toLength         = $.toLength
    , IE8_DOM_DEFINE   = false
    , $indexOf         = __webpack_require__(22)(false)
    , $forEach         = arrayMethod(0)
    , $map             = arrayMethod(1)
    , $filter          = arrayMethod(2)
    , $some            = arrayMethod(3)
    , $every           = arrayMethod(4);
  
  if(!$.DESC){
    try {
      IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
        {get: function(){ return 8; }}
      ).x == 8;
    } catch(e){ /* empty */ }
    $.setDesc = function(O, P, Attributes){
      if(IE8_DOM_DEFINE)try {
        return defineProperty(O, P, Attributes);
      } catch(e){ /* empty */ }
      if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
      if('value' in Attributes)assertObject(O)[P] = Attributes.value;
      return O;
    };
    $.getDesc = function(O, P){
      if(IE8_DOM_DEFINE)try {
        return getOwnDescriptor(O, P);
      } catch(e){ /* empty */ }
      if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
    };
    $.setDescs = defineProperties = function(O, Properties){
      assertObject(O);
      var keys   = $.getKeys(Properties)
        , length = keys.length
        , i = 0
        , P;
      while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
      return O;
    };
  }
  $def($def.S + $def.F * !$.DESC, 'Object', {
    // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $.getDesc,
    // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
    defineProperty: $.setDesc,
    // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
    defineProperties: defineProperties
  });
  
    // IE 8- don't enum bug keys
  var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
              'toLocaleString,toString,valueOf').split(',')
    // Additional keys for getOwnPropertyNames
    , keys2 = keys1.concat('length', 'prototype')
    , keysLen1 = keys1.length;
  
  // Create object with `null` prototype: use iframe Object with cleared prototype
  var createDict = function(){
    // Thrash, waste and sodomy: IE GC bug
    var iframe = cel('iframe')
      , i      = keysLen1
      , gt     = '>'
      , iframeDocument;
    iframe.style.display = 'none';
    $.html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write('<script>document.F=Object</script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while(i--)delete createDict.prototype[keys1[i]];
    return createDict();
  };
  function createGetKeys(names, length){
    return function(object){
      var O      = toObject(object)
        , i      = 0
        , result = []
        , key;
      for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while(length > i)if(has(O, key = names[i++])){
        ~indexOf.call(result, key) || result.push(key);
      }
      return result;
    };
  }
  function isPrimitive(it){ return !$.isObject(it); }
  function Empty(){}
  $def($def.S, 'Object', {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    getPrototypeOf: $.getProto = $.getProto || function(O){
      O = Object(assert.def(O));
      if(has(O, IE_PROTO))return O[IE_PROTO];
      if(isFunction(O.constructor) && O instanceof O.constructor){
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectProto : null;
    },
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    create: $.create = $.create || function(O, /*?*/Properties){
      var result;
      if(O !== null){
        Empty.prototype = assertObject(O);
        result = new Empty();
        Empty.prototype = null;
        // add "__proto__" for Object.getPrototypeOf shim
        result[IE_PROTO] = O;
      } else result = createDict();
      return Properties === undefined ? result : defineProperties(result, Properties);
    },
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
    // 19.1.2.17 / 15.2.3.8 Object.seal(O)
    seal: $.it, // <- cap
    // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
    freeze: $.it, // <- cap
    // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
    preventExtensions: $.it, // <- cap
    // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
    isSealed: isPrimitive, // <- cap
    // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
    isFrozen: isPrimitive, // <- cap
    // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
    isExtensible: $.isObject // <- cap
  });
  
  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
  $def($def.P, 'Function', {
    bind: function(that /*, args... */){
      var fn       = assert.fn(this)
        , partArgs = slice.call(arguments, 1);
      function bound(/* args... */){
        var args = partArgs.concat(slice.call(arguments));
        return invoke(fn, args, this instanceof bound ? $.create(fn.prototype) : that);
      }
      if(fn.prototype)bound.prototype = fn.prototype;
      return bound;
    }
  });
  
  // Fix for not array-like ES3 string
  function arrayMethodFix(fn){
    return function(){
      return fn.apply($.ES5Object(this), arguments);
    };
  }
  if(!(0 in Object('z') && 'z'[0] == 'z')){
    $.ES5Object = function(it){
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }
  $def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
    slice: arrayMethodFix(slice),
    join: arrayMethodFix(A.join)
  });
  
  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
  $def($def.S, 'Array', {
    isArray: function(arg){
      return cof(arg) == 'Array';
    }
  });
  function createArrayReduce(isRight){
    return function(callbackfn, memo){
      assert.fn(callbackfn);
      var O      = toObject(this)
        , length = toLength(O.length)
        , index  = isRight ? length - 1 : 0
        , i      = isRight ? -1 : 1;
      if(arguments.length < 2)for(;;){
        if(index in O){
          memo = O[index];
          index += i;
          break;
        }
        index += i;
        assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
      }
      for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
        memo = callbackfn(memo, O[index], index, this);
      }
      return memo;
    };
  }
  $def($def.P, 'Array', {
    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
      return $forEach(this, callbackfn, arguments[1]);
    },
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn/*, that = undefined */){
      return $map(this, callbackfn, arguments[1]);
    },
    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: function filter(callbackfn/*, that = undefined */){
      return $filter(this, callbackfn, arguments[1]);
    },
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn/*, that = undefined */){
      return $some(this, callbackfn, arguments[1]);
    },
    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
    every: function every(callbackfn/*, that = undefined */){
      return $every(this, callbackfn, arguments[1]);
    },
    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
    reduce: createArrayReduce(false),
    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
    reduceRight: createArrayReduce(true),
    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: indexOf = indexOf || function indexOf(el /*, fromIndex = 0 */){
      return $indexOf(this, el, arguments[1]);
    },
    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
    lastIndexOf: function(el, fromIndex /* = @[*-1] */){
      var O      = toObject(this)
        , length = toLength(O.length)
        , index  = length - 1;
      if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
      if(index < 0)index = toLength(length + index);
      for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
      return -1;
    }
  });
  
  // 21.1.3.25 / 15.5.4.20 String.prototype.trim()
  $def($def.P, 'String', {trim: __webpack_require__(17)(/^\s*([\s\S]*\S)?\s*$/, '$1')});
  
  // 20.3.3.1 / 15.9.4.4 Date.now()
  $def($def.S, 'Date', {now: function(){
    return +new Date;
  }});
  
  function lz(num){
    return num > 9 ? num : '0' + num;
  }
  
  // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
  // PhantomJS and old webkit had a broken Date implementation.
  var date       = new Date(-5e13 - 1)
    , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
        && __webpack_require__(20)(function(){ new Date(NaN).toISOString(); }));
  $def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }});
  
  if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
    var tag = classof(it);
    return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
  };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , toIndex = $.toIndex;
  $def($def.P, 'Array', {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
      var O     = Object($.assertDefined(this))
        , len   = $.toLength(O.length)
        , to    = toIndex(target, len)
        , from  = toIndex(start, len)
        , end   = arguments[2]
        , fin   = end === undefined ? len : toIndex(end, len)
        , count = Math.min(fin - from, len - to)
        , inc   = 1;
      if(from < to && to < from + count){
        inc  = -1;
        from = from + count - 1;
        to   = to   + count - 1;
      }
      while(count-- > 0){
        if(from in O)O[to] = O[from];
        else delete O[to];
        to   += inc;
        from += inc;
      } return O;
    }
  });
  __webpack_require__(9)('copyWithin');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , toIndex = $.toIndex;
  $def($def.P, 'Array', {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    fill: function fill(value /*, start = 0, end = @length */){
      var O      = Object($.assertDefined(this))
        , length = $.toLength(O.length)
        , index  = toIndex(arguments[1], length)
        , end    = arguments[2]
        , endPos = end === undefined ? length : toIndex(end, length);
      while(endPos > index)O[index++] = value;
      return O;
    }
  });
  __webpack_require__(9)('fill');

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
  var KEY    = 'findIndex'
    , $def   = __webpack_require__(2)
    , forced = true
    , $find  = __webpack_require__(11)(6);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    findIndex: function findIndex(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(9)(KEY);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  var KEY    = 'find'
    , $def   = __webpack_require__(2)
    , forced = true
    , $find  = __webpack_require__(11)(5);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    find: function find(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(9)(KEY);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  var $     = __webpack_require__(1)
    , ctx   = __webpack_require__(8)
    , $def  = __webpack_require__(2)
    , $iter = __webpack_require__(6)
    , call  = __webpack_require__(28);
  $def($def.S + $def.F * !__webpack_require__(16)(function(iter){ Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
      var O       = Object($.assertDefined(arrayLike))
        , mapfn   = arguments[1]
        , mapping = mapfn !== undefined
        , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
        , index   = 0
        , length, result, step, iterator;
      if($iter.is(O)){
        iterator = $iter.get(O);
        // strange IE quirks mode bug -> use typeof instead of isFunction
        result   = new (typeof this == 'function' ? this : Array);
        for(; !(step = iterator.next()).done; index++){
          result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
        }
      } else {
        // strange IE quirks mode bug -> use typeof instead of isFunction
        result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
        for(; length > index; index++){
          result[index] = mapping ? f(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }
  });

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  var $def = __webpack_require__(2);
  $def($def.S, 'Array', {
    // 22.1.2.3 Array.of( ...items)
    of: function of(/* ...args */){
      var index  = 0
        , length = arguments.length
        // strange IE quirks mode bug -> use typeof instead of isFunction
        , result = new (typeof this == 'function' ? this : Array)(length);
      while(length > index)result[index] = arguments[index++];
      result.length = length;
      return result;
    }
  });

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(14)(Array);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  var $             = __webpack_require__(1)
    , HAS_INSTANCE  = __webpack_require__(5)('hasInstance')
    , FunctionProto = Function.prototype;
  // 19.2.3.6 Function.prototype[@@hasInstance](V)
  if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
    if(!$.isFunction(this) || !$.isObject(O))return false;
    if(!$.isObject(this.prototype))return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while(O = $.getProto(O))if(this.prototype === O)return true;
    return false;
  }});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , NAME = 'name'
    , setDesc = $.setDesc
    , FunctionProto = Function.prototype;
  // 19.2.4.2 name
  NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
    configurable: true,
    get: function(){
      var match = String(this).match(/^\s*function ([^ (]*)/)
        , name  = match ? match[1] : '';
      $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
      return name;
    },
    set: function(value){
      $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
    }
  });

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(23);
  
  // 23.1 Map Objects
  __webpack_require__(12)('Map', {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key){
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value){
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  var Infinity = 1 / 0
    , $def  = __webpack_require__(2)
    , E     = Math.E
    , pow   = Math.pow
    , abs   = Math.abs
    , exp   = Math.exp
    , log   = Math.log
    , sqrt  = Math.sqrt
    , ceil  = Math.ceil
    , floor = Math.floor
    , EPSILON   = pow(2, -52)
    , EPSILON32 = pow(2, -23)
    , MAX32     = pow(2, 127) * (2 - EPSILON32)
    , MIN32     = pow(2, -126);
  function roundTiesToEven(n){
    return n + 1 / EPSILON - 1 / EPSILON;
  }
  
  // 20.2.2.28 Math.sign(x)
  function sign(x){
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  }
  // 20.2.2.5 Math.asinh(x)
  function asinh(x){
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
  }
  // 20.2.2.14 Math.expm1(x)
  function expm1(x){
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
  }
  
  $def($def.S, 'Math', {
    // 20.2.2.3 Math.acosh(x)
    acosh: function acosh(x){
      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
    },
    // 20.2.2.5 Math.asinh(x)
    asinh: asinh,
    // 20.2.2.7 Math.atanh(x)
    atanh: function atanh(x){
      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
    },
    // 20.2.2.9 Math.cbrt(x)
    cbrt: function cbrt(x){
      return sign(x = +x) * pow(abs(x), 1 / 3);
    },
    // 20.2.2.11 Math.clz32(x)
    clz32: function clz32(x){
      return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
    },
    // 20.2.2.12 Math.cosh(x)
    cosh: function cosh(x){
      return (exp(x = +x) + exp(-x)) / 2;
    },
    // 20.2.2.14 Math.expm1(x)
    expm1: expm1,
    // 20.2.2.16 Math.fround(x)
    fround: function fround(x){
      var $abs  = abs(x)
        , $sign = sign(x)
        , a, result;
      if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      if(result > MAX32 || result != result)return $sign * Infinity;
      return $sign * result;
    },
    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
    hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
      var sum  = 0
        , len1 = arguments.length
        , len2 = len1
        , args = Array(len1)
        , larg = -Infinity
        , arg;
      while(len1--){
        arg = args[len1] = +arguments[len1];
        if(arg == Infinity || arg == -Infinity)return Infinity;
        if(arg > larg)larg = arg;
      }
      larg = arg || 1;
      while(len2--)sum += pow(args[len2] / larg, 2);
      return larg * sqrt(sum);
    },
    // 20.2.2.18 Math.imul(x, y)
    imul: function imul(x, y){
      var UInt16 = 0xffff
        , xn = +x
        , yn = +y
        , xl = UInt16 & xn
        , yl = UInt16 & yn;
      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
    },
    // 20.2.2.20 Math.log1p(x)
    log1p: function log1p(x){
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
    },
    // 20.2.2.21 Math.log10(x)
    log10: function log10(x){
      return log(x) / Math.LN10;
    },
    // 20.2.2.22 Math.log2(x)
    log2: function log2(x){
      return log(x) / Math.LN2;
    },
    // 20.2.2.28 Math.sign(x)
    sign: sign,
    // 20.2.2.30 Math.sinh(x)
    sinh: function sinh(x){
      return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
    },
    // 20.2.2.33 Math.tanh(x)
    tanh: function tanh(x){
      var a = expm1(x = +x)
        , b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    },
    // 20.2.2.34 Math.trunc(x)
    trunc: function trunc(it){
      return (it > 0 ? floor : ceil)(it);
    }
  });

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $          = __webpack_require__(1)
    , isObject   = $.isObject
    , isFunction = $.isFunction
    , NUMBER     = 'Number'
    , $Number    = $.g[NUMBER]
    , Base       = $Number
    , proto      = $Number.prototype;
  function toPrimitive(it){
    var fn, val;
    if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
    if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
    throw TypeError("Can't convert object to number");
  }
  function toNumber(it){
    if(isObject(it))it = toPrimitive(it);
    if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
      var binary = false;
      switch(it.charCodeAt(1)){
        case 66 : case 98  : binary = true;
        case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
      }
    } return +it;
  }
  if($.FW && !($Number('0o1') && $Number('0b1'))){
    $Number = function Number(it){
      return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
    };
    $.each.call($.DESC ? $.getNames(Base) : (
        // ES3:
        'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
        // ES6 (in case, if modules with ES6 Number statics required before):
        'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
        'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
      ).split(','), function(key){
        if($.has(Base, key) && !$.has($Number, key)){
          $.setDesc($Number, key, $.getDesc(Base, key));
        }
      }
    );
    $Number.prototype = proto;
    proto.constructor = $Number;
    $.hide($.g, NUMBER, $Number);
  }

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  var $     = __webpack_require__(1)
    , $def  = __webpack_require__(2)
    , abs   = Math.abs
    , floor = Math.floor
    , _isFinite = $.g.isFinite
    , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
  function isInteger(it){
    return !$.isObject(it) && _isFinite(it) && floor(it) === it;
  }
  $def($def.S, 'Number', {
    // 20.1.2.1 Number.EPSILON
    EPSILON: Math.pow(2, -52),
    // 20.1.2.2 Number.isFinite(number)
    isFinite: function isFinite(it){
      return typeof it == 'number' && _isFinite(it);
    },
    // 20.1.2.3 Number.isInteger(number)
    isInteger: isInteger,
    // 20.1.2.4 Number.isNaN(number)
    isNaN: function isNaN(number){
      return number != number;
    },
    // 20.1.2.5 Number.isSafeInteger(number)
    isSafeInteger: function isSafeInteger(number){
      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
    },
    // 20.1.2.6 Number.MAX_SAFE_INTEGER
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    // 20.1.2.10 Number.MIN_SAFE_INTEGER
    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
    // 20.1.2.12 Number.parseFloat(string)
    parseFloat: parseFloat,
    // 20.1.2.13 Number.parseInt(string, radix)
    parseInt: parseInt
  });

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.1 Object.assign(target, source)
  var $def = __webpack_require__(2);
  $def($def.S, 'Object', {assign: __webpack_require__(36)});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.10 Object.is(value1, value2)
  var $def = __webpack_require__(2);
  $def($def.S, 'Object', {
    is: function is(x, y){
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    }
  });

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $def = __webpack_require__(2);
  $def($def.S, 'Object', {setPrototypeOf: __webpack_require__(18).set});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , $def     = __webpack_require__(2)
    , isObject = $.isObject
    , toObject = $.toObject;
  function wrapObjectMethod(METHOD, MODE){
    var fn  = ($.core.Object || {})[METHOD] || Object[METHOD]
      , f   = 0
      , o   = {};
    o[METHOD] = MODE == 1 ? function(it){
      return isObject(it) ? fn(it) : it;
    } : MODE == 2 ? function(it){
      return isObject(it) ? fn(it) : true;
    } : MODE == 3 ? function(it){
      return isObject(it) ? fn(it) : false;
    } : MODE == 4 ? function getOwnPropertyDescriptor(it, key){
      return fn(toObject(it), key);
    } : MODE == 5 ? function getPrototypeOf(it){
      return fn(Object($.assertDefined(it)));
    } : function(it){
      return fn(toObject(it));
    };
    try {
      fn('z');
    } catch(e){
      f = 1;
    }
    $def($def.S + $def.F * f, 'Object', o);
  }
  wrapObjectMethod('freeze', 1);
  wrapObjectMethod('seal', 1);
  wrapObjectMethod('preventExtensions', 1);
  wrapObjectMethod('isFrozen', 2);
  wrapObjectMethod('isSealed', 2);
  wrapObjectMethod('isExtensible', 3);
  wrapObjectMethod('getOwnPropertyDescriptor', 4);
  wrapObjectMethod('getPrototypeOf', 5);
  wrapObjectMethod('keys');
  wrapObjectMethod('getOwnPropertyNames');

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 19.1.3.6 Object.prototype.toString()
  var $   = __webpack_require__(1)
    , cof = __webpack_require__(4)
    , tmp = {};
  tmp[__webpack_require__(5)('toStringTag')] = 'z';
  if($.FW && cof(tmp) != 'z')$.hide(Object.prototype, 'toString', function toString(){
    return '[object ' + cof.classof(this) + ']';
  });

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $        = __webpack_require__(1)
    , ctx      = __webpack_require__(8)
    , cof      = __webpack_require__(4)
    , $def     = __webpack_require__(2)
    , assert   = __webpack_require__(3)
    , forOf    = __webpack_require__(10)
    , setProto = __webpack_require__(18).set
    , species  = __webpack_require__(14)
    , SPECIES  = __webpack_require__(5)('species')
    , RECORD   = __webpack_require__(7).safe('record')
    , PROMISE  = 'Promise'
    , global   = $.g
    , process  = global.process
    , asap     = process && process.nextTick || __webpack_require__(32).set
    , P        = global[PROMISE]
    , isFunction     = $.isFunction
    , isObject       = $.isObject
    , assertFunction = assert.fn
    , assertObject   = assert.obj;
  
  var useNative = function(){
    var test, works = false;
    function P2(x){
      var self = new P(x);
      setProto(self, P2.prototype);
      return self;
    }
    try {
      works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function(){})) == test;
      setProto(P2, P);
      P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
      // actual Firefox has broken subclass support, test that
      if(!(P2.resolve(5).then(function(){}) instanceof P2)){
        works = false;
      }
    } catch(e){ works = false; }
    return works;
  }();
  
  // helpers
  function getConstructor(C){
    var S = assertObject(C)[SPECIES];
    return S != undefined ? S : C;
  }
  function isThenable(it){
    var then;
    if(isObject(it))then = it.then;
    return isFunction(then) ? then : false;
  }
  function notify(record){
    var chain = record.c;
    if(chain.length)asap(function(){
      var value = record.v
        , ok    = record.s == 1
        , i     = 0;
      function run(react){
        var cb = ok ? react.ok : react.fail
          , ret, then;
        try {
          if(cb){
            if(!ok)record.h = true;
            ret = cb === true ? value : cb(value);
            if(ret === react.P){
              react.rej(TypeError('Promise-chain cycle'));
            } else if(then = isThenable(ret)){
              then.call(ret, react.res, react.rej);
            } else react.res(ret);
          } else react.rej(value);
        } catch(err){
          react.rej(err);
        }
      }
      while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
      chain.length = 0;
    });
  }
  function isUnhandled(promise){
    var record = promise[RECORD]
      , chain  = record.a || record.c
      , i      = 0
      , react;
    if(record.h)return false;
    while(chain.length > i){
      react = chain[i++];
      if(react.fail || !isUnhandled(react.P))return false;
    } return true;
  }
  function $reject(value){
    var record = this
      , promise;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    record.v = value;
    record.s = 2;
    record.a = record.c.slice();
    setTimeout(function(){
      asap(function(){
        if(isUnhandled(promise = record.p)){
          if(cof(process) == 'process'){
            process.emit('unhandledRejection', value, promise);
          } else if(global.console && isFunction(console.error)){
            console.error('Unhandled promise rejection', value);
          }
        }
        record.a = undefined;
      });
    }, 1);
    notify(record);
  }
  function $resolve(value){
    var record = this
      , then, wrapper;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    try {
      if(then = isThenable(value)){
        wrapper = {r: record, d: false}; // wrap
        then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
      } else {
        record.v = value;
        record.s = 1;
        notify(record);
      }
    } catch(err){
      $reject.call(wrapper || {r: record, d: false}, err); // wrap
    }
  }
  
  // constructor polyfill
  if(!useNative){
    // 25.4.3.1 Promise(executor)
    P = function Promise(executor){
      assertFunction(executor);
      var record = {
        p: assert.inst(this, P, PROMISE),       // <- promise
        c: [],                                  // <- awaiting reactions
        a: undefined,                           // <- checked in isUnhandled reactions
        s: 0,                                   // <- state
        d: false,                               // <- done
        v: undefined,                           // <- value
        h: false                                // <- handled rejection
      };
      $.hide(this, RECORD, record);
      try {
        executor(ctx($resolve, record, 1), ctx($reject, record, 1));
      } catch(err){
        $reject.call(record, err);
      }
    };
    $.mix(P.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected){
        var S = assertObject(assertObject(this).constructor)[SPECIES];
        var react = {
          ok:   isFunction(onFulfilled) ? onFulfilled : true,
          fail: isFunction(onRejected)  ? onRejected  : false
        };
        var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
          react.res = assertFunction(res);
          react.rej = assertFunction(rej);
        });
        var record = this[RECORD];
        record.c.push(react);
        if(record.a)record.a.push(react);
        record.s && notify(record);
        return promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function(onRejected){
        return this.then(undefined, onRejected);
      }
    });
  }
  
  // export
  $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
  cof.set(P, PROMISE);
  species(P);
  species($.core[PROMISE]); // for wrapper
  
  // statics
  $def($def.S + $def.F * !useNative, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r){
      return new (getConstructor(this))(function(res, rej){
        rej(r);
      });
    },
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x){
      return isObject(x) && RECORD in x && $.getProto(x) === this.prototype
        ? x : new (getConstructor(this))(function(res){
          res(x);
        });
    }
  });
  $def($def.S + $def.F * !(useNative && __webpack_require__(16)(function(iter){
    P.all(iter)['catch'](function(){});
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable){
      var C      = getConstructor(this)
        , values = [];
      return new C(function(res, rej){
        forOf(iterable, false, values.push, values);
        var remaining = values.length
          , results   = Array(remaining);
        if(remaining)$.each.call(values, function(promise, index){
          C.resolve(promise).then(function(value){
            results[index] = value;
            --remaining || res(results);
          }, rej);
        });
        else res(results);
      });
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable){
      var C = getConstructor(this);
      return new C(function(res, rej){
        forOf(iterable, false, function(promise){
          C.resolve(promise).then(res, rej);
        });
      });
    }
  });

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  var $         = __webpack_require__(1)
    , $def      = __webpack_require__(2)
    , setProto  = __webpack_require__(18)
    , $iter     = __webpack_require__(6)
    , ITERATOR  = __webpack_require__(5)('iterator')
    , ITER      = __webpack_require__(7).safe('iter')
    , step      = $iter.step
    , assert    = __webpack_require__(3)
    , isObject  = $.isObject
    , getProto  = $.getProto
    , $Reflect  = $.g.Reflect
    , _apply    = Function.apply
    , assertObject = assert.obj
    , _isExtensible = Object.isExtensible || $.isObject
    , _preventExtensions = Object.preventExtensions || $.it
    // IE TP has broken Reflect.enumerate
    , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));
  
  function Enumerate(iterated){
    $.set(this, ITER, {o: iterated, k: undefined, i: 0});
  }
  $iter.create(Enumerate, 'Object', function(){
    var iter = this[ITER]
      , keys = iter.k
      , key;
    if(keys == undefined){
      iter.k = keys = [];
      for(key in iter.o)keys.push(key);
    }
    do {
      if(iter.i >= keys.length)return step(1);
    } while(!((key = keys[iter.i++]) in iter.o));
    return step(0, key);
  });
  
  var reflect = {
    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
    apply: function apply(target, thisArgument, argumentsList){
      return _apply.call(target, thisArgument, argumentsList);
    },
    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
    construct: function construct(target, argumentsList /*, newTarget*/){
      var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
        , instance = $.create(isObject(proto) ? proto : Object.prototype)
        , result   = _apply.call(target, instance, argumentsList);
      return isObject(result) ? result : instance;
    },
    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
    defineProperty: function defineProperty(target, propertyKey, attributes){
      assertObject(target);
      try {
        $.setDesc(target, propertyKey, attributes);
        return true;
      } catch(e){
        return false;
      }
    },
    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
    deleteProperty: function deleteProperty(target, propertyKey){
      var desc = $.getDesc(assertObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
    get: function get(target, propertyKey/*, receiver*/){
      var receiver = arguments.length < 3 ? target : arguments[2]
        , desc = $.getDesc(assertObject(target), propertyKey), proto;
      if(desc)return $.has(desc, 'value')
        ? desc.value
        : desc.get === undefined
          ? undefined
          : desc.get.call(receiver);
      return isObject(proto = getProto(target))
        ? get(proto, propertyKey, receiver)
        : undefined;
    },
    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
      return $.getDesc(assertObject(target), propertyKey);
    },
    // 26.1.8 Reflect.getPrototypeOf(target)
    getPrototypeOf: function getPrototypeOf(target){
      return getProto(assertObject(target));
    },
    // 26.1.9 Reflect.has(target, propertyKey)
    has: function has(target, propertyKey){
      return propertyKey in target;
    },
    // 26.1.10 Reflect.isExtensible(target)
    isExtensible: function isExtensible(target){
      return _isExtensible(assertObject(target));
    },
    // 26.1.11 Reflect.ownKeys(target)
    ownKeys: __webpack_require__(29),
    // 26.1.12 Reflect.preventExtensions(target)
    preventExtensions: function preventExtensions(target){
      assertObject(target);
      try {
        _preventExtensions(target);
        return true;
      } catch(e){
        return false;
      }
    },
    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
    set: function set(target, propertyKey, V/*, receiver*/){
      var receiver = arguments.length < 4 ? target : arguments[3]
        , ownDesc  = $.getDesc(assertObject(target), propertyKey)
        , existingDescriptor, proto;
      if(!ownDesc){
        if(isObject(proto = getProto(target))){
          return set(proto, propertyKey, V, receiver);
        }
        ownDesc = $.desc(0);
      }
      if($.has(ownDesc, 'value')){
        if(ownDesc.writable === false || !isObject(receiver))return false;
        existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
        existingDescriptor.value = V;
        $.setDesc(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }
  };
  // 26.1.14 Reflect.setPrototypeOf(target, proto)
  if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  };
  
  $def($def.G, {Reflect: {}});
  
  $def($def.S + $def.F * buggyEnumerate, 'Reflect', {
    // 26.1.5 Reflect.enumerate(target)
    enumerate: function enumerate(target){
      return new Enumerate(assertObject(target));
    }
  });
  
  $def($def.S, 'Reflect', reflect);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  var $       = __webpack_require__(1)
    , cof     = __webpack_require__(4)
    , $RegExp = $.g.RegExp
    , Base    = $RegExp
    , proto   = $RegExp.prototype
    , re      = /a/g
    // "new" creates a new object
    , CORRECT_NEW = new $RegExp(re) !== re
    // RegExp allows a regex with flags as the pattern
    , ALLOWS_RE_WITH_FLAGS = function(){
      try {
        return $RegExp(re, 'i') == '/a/i';
      } catch(e){ /* empty */ }
    }();
  if($.FW && $.DESC){
    if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
      $RegExp = function RegExp(pattern, flags){
        var patternIsRegExp  = cof(pattern) == 'RegExp'
          , flagsIsUndefined = flags === undefined;
        if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
        return CORRECT_NEW
          ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
          : new Base(patternIsRegExp ? pattern.source : pattern
            , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
      };
      $.each.call($.getNames(Base), function(key){
        key in $RegExp || $.setDesc($RegExp, key, {
          configurable: true,
          get: function(){ return Base[key]; },
          set: function(it){ Base[key] = it; }
        });
      });
      proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      $.hide($.g, 'RegExp', $RegExp);
    }
    // 21.2.5.3 get RegExp.prototype.flags()
    if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
      configurable: true,
      get: __webpack_require__(17)(/^.*\/(\w*)$/, '$1')
    });
  }
  __webpack_require__(14)($RegExp);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(23);
  
  // 23.2 Set Objects
  __webpack_require__(12)('Set', {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value){
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }
  }, strong);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(2)
    , $at  = __webpack_require__(19)(false);
  $def($def.P, 'String', {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(4)
    , $def = __webpack_require__(2)
    , toLength = $.toLength;
  
  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(20)(function(){ 'q'.endsWith(/./); }), 'String', {
    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
    endsWith: function endsWith(searchString /*, endPosition = @length */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      var that = String($.assertDefined(this))
        , endPosition = arguments[1]
        , len = toLength(that.length)
        , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
      searchString += '';
      return that.slice(end - searchString.length, end) === searchString;
    }
  });

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  var $def    = __webpack_require__(2)
    , toIndex = __webpack_require__(1).toIndex
    , fromCharCode = String.fromCharCode
    , $fromCodePoint = String.fromCodePoint;
  
  // length should be 1, old FF problem
  $def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
      var res = []
        , len = arguments.length
        , i   = 0
        , code;
      while(len > i){
        code = +arguments[i++];
        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000
          ? fromCharCode(code)
          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
      } return res.join('');
    }
  });

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(4)
    , $def = __webpack_require__(2);
  
  $def($def.P, 'String', {
    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
    includes: function includes(searchString /*, position = 0 */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
    }
  });

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  var set   = __webpack_require__(1).set
    , $at   = __webpack_require__(19)(true)
    , ITER  = __webpack_require__(7).safe('iter')
    , $iter = __webpack_require__(6)
    , step  = $iter.step;
  
  // 21.1.3.27 String.prototype[@@iterator]()
  __webpack_require__(15)(String, 'String', function(iterated){
    set(this, ITER, {o: String(iterated), i: 0});
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , index = iter.i
      , point;
    if(index >= O.length)return step(1);
    point = $at(O, index);
    iter.i += point.length;
    return step(0, point);
  });

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  var $    = __webpack_require__(1)
    , $def = __webpack_require__(2);
  
  $def($def.S, 'String', {
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite){
      var tpl = $.toObject(callSite.raw)
        , len = $.toLength(tpl.length)
        , sln = arguments.length
        , res = []
        , i   = 0;
      while(len > i){
        res.push(String(tpl[i++]));
        if(i < sln)res.push(String(arguments[i]));
      } return res.join('');
    }
  });

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  var $def = __webpack_require__(2);
  
  $def($def.P, 'String', {
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: __webpack_require__(31)
  });

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(4)
    , $def = __webpack_require__(2);
  
  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(20)(function(){ 'q'.startsWith(/./); }), 'String', {
    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
    startsWith: function startsWith(searchString /*, position = 0 */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      var that  = String($.assertDefined(this))
        , index = $.toLength(Math.min(arguments[1], that.length));
      searchString += '';
      return that.slice(index, index + searchString.length) === searchString;
    }
  });

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // ECMAScript 6 symbols shim
  var $        = __webpack_require__(1)
    , setTag   = __webpack_require__(4).set
    , uid      = __webpack_require__(7)
    , $def     = __webpack_require__(2)
    , keyOf    = __webpack_require__(38)
    , enumKeys = __webpack_require__(27)
    , assertObject = __webpack_require__(3).obj
    , has      = $.has
    , $create  = $.create
    , getDesc  = $.getDesc
    , setDesc  = $.setDesc
    , desc     = $.desc
    , getNames = $.getNames
    , toObject = $.toObject
    , $Symbol  = $.g.Symbol
    , setter   = false
    , TAG      = uid('tag')
    , HIDDEN   = uid('hidden')
    , SymbolRegistry = {}
    , AllSymbols = {}
    , useNative = $.isFunction($Symbol);
  
  function wrap(tag){
    var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
    $.DESC && setter && setDesc(Object.prototype, tag, {
      configurable: true,
      set: function(value){
        if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
        setDesc(this, tag, desc(1, value));
      }
    });
    return sym;
  }
  
  function defineProperty(it, key, D){
    if(D && has(AllSymbols, key)){
      if(!D.enumerable){
        if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
        D.enumerable = false;
      }
    } return setDesc(it, key, D);
  }
  function defineProperties(it, P){
    assertObject(it);
    var keys = enumKeys(P = toObject(P))
      , i    = 0
      , l = keys.length
      , key;
    while(l > i)defineProperty(it, key = keys[i++], P[key]);
    return it;
  }
  function create(it, P){
    return P === undefined ? $create(it) : defineProperties($create(it), P);
  }
  function getOwnPropertyDescriptor(it, key){
    var D = getDesc(it = toObject(it), key);
    if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
    return D;
  }
  function getOwnPropertyNames(it){
    var names  = getNames(toObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
    return result;
  }
  function getOwnPropertySymbols(it){
    var names  = getNames(toObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
    return result;
  }
  
  // 19.4.1.1 Symbol([description])
  if(!useNative){
    $Symbol = function Symbol(description){
      if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
      return wrap(uid(description));
    };
    $.hide($Symbol.prototype, 'toString', function(){
      return this[TAG];
    });
  
    $.create     = create;
    $.setDesc    = defineProperty;
    $.getDesc    = getOwnPropertyDescriptor;
    $.setDescs   = defineProperties;
    $.getNames   = getOwnPropertyNames;
    $.getSymbols = getOwnPropertySymbols;
  }
  
  var symbolStatics = {
    // 19.4.2.1 Symbol.for(key)
    'for': function(key){
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(key){
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function(){ setter = true; },
    useSimple: function(){ setter = false; }
  };
  // 19.4.2.2 Symbol.hasInstance
  // 19.4.2.3 Symbol.isConcatSpreadable
  // 19.4.2.4 Symbol.iterator
  // 19.4.2.6 Symbol.match
  // 19.4.2.8 Symbol.replace
  // 19.4.2.9 Symbol.search
  // 19.4.2.10 Symbol.species
  // 19.4.2.11 Symbol.split
  // 19.4.2.12 Symbol.toPrimitive
  // 19.4.2.13 Symbol.toStringTag
  // 19.4.2.14 Symbol.unscopables
  $.each.call((
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
      'species,split,toPrimitive,toStringTag,unscopables'
    ).split(','), function(it){
      var sym = __webpack_require__(5)(it);
      symbolStatics[it] = useNative ? sym : wrap(sym);
    }
  );
  
  setter = true;
  
  $def($def.G + $def.W, {Symbol: $Symbol});
  
  $def($def.S, 'Symbol', symbolStatics);
  
  $def($def.S + $def.F * !useNative, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: getOwnPropertySymbols
  });
  
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  setTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  setTag($.g.JSON, 'JSON', true);

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $         = __webpack_require__(1)
    , weak      = __webpack_require__(25)
    , leakStore = weak.leakStore
    , ID        = weak.ID
    , WEAK      = weak.WEAK
    , has       = $.has
    , isObject  = $.isObject
    , isFrozen  = Object.isFrozen || $.core.Object.isFrozen
    , tmp       = {};
  
  // 23.3 WeakMap Objects
  var WeakMap = __webpack_require__(12)('WeakMap', {
    // 23.3.3.3 WeakMap.prototype.get(key)
    get: function get(key){
      if(isObject(key)){
        if(isFrozen(key))return leakStore(this).get(key);
        if(has(key, WEAK))return key[WEAK][this[ID]];
      }
    },
    // 23.3.3.5 WeakMap.prototype.set(key, value)
    set: function set(key, value){
      return weak.def(this, key, value);
    }
  }, weak, true, true);
  
  // IE11 WeakMap frozen keys fix
  if($.FW && new WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
    $.each.call(['delete', 'has', 'get', 'set'], function(key){
      var method = WeakMap.prototype[key];
      WeakMap.prototype[key] = function(a, b){
        // store frozen objects on leaky map
        if(isObject(a) && isFrozen(a)){
          var result = leakStore(this)[key](a, b);
          return key == 'set' ? this : result;
        // store all the rest on native weakmap
        } return method.call(this, a, b);
      };
    });
  }

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var weak = __webpack_require__(25);
  
  // 23.4 WeakSet Objects
  __webpack_require__(12)('WeakSet', {
    // 23.4.3.1 WeakSet.prototype.add(value)
    add: function add(value){
      return weak.def(this, value, true);
    }
  }, weak, false, true);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/domenic/Array.prototype.includes
  var $def      = __webpack_require__(2)
    , $includes = __webpack_require__(22)(true);
  $def($def.P, 'Array', {
    includes: function includes(el /*, fromIndex = 0 */){
      return $includes(this, el, arguments[1]);
    }
  });
  __webpack_require__(9)('includes');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  __webpack_require__(24)('Map');

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  // https://gist.github.com/WebReflection/9353781
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , ownKeys = __webpack_require__(29);
  
  $def($def.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
      var O      = $.toObject(object)
        , result = {};
      $.each.call(ownKeys(O), function(key){
        $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
      });
      return result;
    }
  });

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  // http://goo.gl/XkBrjD
  var $    = __webpack_require__(1)
    , $def = __webpack_require__(2);
  function createObjectToArray(isEntries){
    return function(object){
      var O      = $.toObject(object)
        , keys   = $.getKeys(O)
        , length = keys.length
        , i      = 0
        , result = Array(length)
        , key;
      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
      else while(length > i)result[i] = O[keys[i++]];
      return result;
    };
  }
  $def($def.S, 'Object', {
    values:  createObjectToArray(false),
    entries: createObjectToArray(true)
  });

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  // https://gist.github.com/kangax/9698100
  var $def = __webpack_require__(2);
  $def($def.S, 'RegExp', {
    escape: __webpack_require__(17)(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
  });

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  __webpack_require__(24)('Set');

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/mathiasbynens/String.prototype.at
  'use strict';
  var $def = __webpack_require__(2)
    , $at  = __webpack_require__(19)(true);
  $def($def.P, 'String', {
    at: function at(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(2)
    , $pad = __webpack_require__(30);
  $def($def.P, 'String', {
    lpad: function lpad(n){
      return $pad(this, n, arguments[1], true);
    }
  });

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(2)
    , $pad = __webpack_require__(30);
  $def($def.P, 'String', {
    rpad: function rpad(n){
      return $pad(this, n, arguments[1], false);
    }
  });

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  // JavaScript 1.6 / Strawman array statics shim
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , $Array  = $.core.Array || Array
    , statics = {};
  function setStatics(keys, length){
    $.each.call(keys.split(','), function(key){
      if(length == undefined && key in $Array)statics[key] = $Array[key];
      else if(key in [])statics[key] = __webpack_require__(8)(Function.call, [][key], length);
    });
  }
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
             'reduce,reduceRight,copyWithin,fill,turn');
  $def($def.S, 'Array', statics);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(33);
  var $           = __webpack_require__(1)
    , Iterators   = __webpack_require__(6).Iterators
    , ITERATOR    = __webpack_require__(5)('iterator')
    , ArrayValues = Iterators.Array
    , NodeList    = $.g.NodeList;
  if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
    $.hide(NodeList.prototype, ITERATOR, ArrayValues);
  }
  Iterators.NodeList = ArrayValues;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  var $def  = __webpack_require__(2)
    , $task = __webpack_require__(32);
  $def($def.G + $def.B, {
    setImmediate:   $task.set,
    clearImmediate: $task.clear
  });

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  // ie9- setTimeout & setInterval additional parameters fix
  var $         = __webpack_require__(1)
    , $def      = __webpack_require__(2)
    , invoke    = __webpack_require__(13)
    , partial   = __webpack_require__(39)
    , navigator = $.g.navigator
    , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
  function wrap(set){
    return MSIE ? function(fn, time /*, ...args */){
      return set(invoke(
        partial,
        [].slice.call(arguments, 2),
        $.isFunction(fn) ? fn : Function(fn)
      ), time);
    } : set;
  }
  $def($def.G + $def.B + $def.F * MSIE, {
    setTimeout:  wrap($.g.setTimeout),
    setInterval: wrap($.g.setInterval)
  });

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(40);
  __webpack_require__(71);
  __webpack_require__(54);
  __webpack_require__(55);
  __webpack_require__(56);
  __webpack_require__(58);
  __webpack_require__(57);
  __webpack_require__(49);
  __webpack_require__(48);
  __webpack_require__(52);
  __webpack_require__(53);
  __webpack_require__(51);
  __webpack_require__(65);
  __webpack_require__(68);
  __webpack_require__(67);
  __webpack_require__(63);
  __webpack_require__(64);
  __webpack_require__(66);
  __webpack_require__(69);
  __webpack_require__(70);
  __webpack_require__(45);
  __webpack_require__(46);
  __webpack_require__(33);
  __webpack_require__(47);
  __webpack_require__(41);
  __webpack_require__(42);
  __webpack_require__(44);
  __webpack_require__(43);
  __webpack_require__(61);
  __webpack_require__(59);
  __webpack_require__(50);
  __webpack_require__(62);
  __webpack_require__(72);
  __webpack_require__(73);
  __webpack_require__(60);
  __webpack_require__(74);
  __webpack_require__(80);
  __webpack_require__(81);
  __webpack_require__(82);
  __webpack_require__(78);
  __webpack_require__(76);
  __webpack_require__(77);
  __webpack_require__(75);
  __webpack_require__(79);
  __webpack_require__(83);
  __webpack_require__(86);
  __webpack_require__(85);
  __webpack_require__(84);
  module.exports = __webpack_require__(1).core;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  
  !(function(global) {
    "use strict";
  
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol =
      typeof Symbol === "function" && Symbol.iterator || "@@iterator";
  
    var inModule = typeof module === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }
  
    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = Object.create((outerFn || Generator).prototype);
  
      generator._invoke = makeInvokeMethod(
        innerFn, self || null,
        new Context(tryLocsList || [])
      );
  
      return generator;
    }
    runtime.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";
  
    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };
  
    runtime.mark = function(genFun) {
      genFun.__proto__ = GeneratorFunctionPrototype;
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
  
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      return new Promise(function(resolve, reject) {
        var generator = wrap(innerFn, outerFn, self, tryLocsList);
        var callNext = step.bind(generator, "next");
        var callThrow = step.bind(generator, "throw");
  
        function step(method, arg) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
            return;
          }
  
          var info = record.arg;
          if (info.done) {
            resolve(info.value);
          } else {
            Promise.resolve(info.value).then(callNext, callThrow);
          }
        }
  
        callNext();
      });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" ||
                (method === "throw" && delegate.iterator[method] === undefined)) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;
  
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }
  
              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }
  
            var record = tryCatch(
              delegate.iterator[method],
              delegate.iterator,
              arg
            );
  
            if (record.type === "throw") {
              context.delegate = null;
  
              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }
  
            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;
  
            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }
  
            context.delegate = null;
          }
  
          if (method === "next") {
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              delete context.sent;
            }
  
          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }
  
            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }
  
          } else if (method === "return") {
            context.abrupt("return", arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;
  
            var info = {
              value: record.arg,
              done: context.done
            };
  
            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }
  
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }
  
    function defineGeneratorMethod(method) {
      Gp[method] = function(arg) {
        return this._invoke(method, arg);
      };
    }
    defineGeneratorMethod("next");
    defineGeneratorMethod("throw");
    defineGeneratorMethod("return");
  
    Gp[iteratorSymbol] = function() {
      return this;
    };
  
    Gp.toString = function() {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset();
    }
  
    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function() {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.tryEntries.forEach(resetTryEntry);
  
        // Pre-initialize at least 20 temporary variables to enable hidden
        // class optimizations for simple generators.
        for (var tempIndex = 0, tempName;
             hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
             ++tempIndex) {
          this[tempName] = null;
        }
      },
  
      stop: function() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
  
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }
  
        return ContinueSentinel;
      },
  
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
  
        return ContinueSentinel;
      },
  
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            return this.complete(entry.completion, entry.afterLoc);
          }
        }
      },
  
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        return ContinueSentinel;
      }
    };
  })(
    // Among the various tricks for obtaining a reference to the global
    // object, this seems to be the most reliable technique that does not
    // use indirect eval (which violates Content Security Policy).
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this
  );


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(35);


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  __webpack_require__(94);
  
  var _react = __webpack_require__(21);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LoginPage = __webpack_require__(91);
  
  var _LoginPage2 = _interopRequireDefault(_LoginPage);
  
  var App = (function () {
    function App() {
      _classCallCheck(this, App);
    }
  
    _createClass(App, [{
      key: 'render',
      value: function render() {
        switch (this.props.path) {
  
          case '/':
          case '/login':
            this.props.onSetTitle(_LoginPage2['default'].title);
            this.component = _react2['default'].createElement(_LoginPage2['default'], null);
            break;
  
          default:
        }
        return _react2['default'].createElement(
          'div',
          null,
          this.component
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        path: _react.PropTypes.string.isRequired,
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    return App;
  })();
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _react = __webpack_require__(21);
  
  var _react2 = _interopRequireDefault(_react);
  
  // eslint-disable-line no-unused-vars
  
  __webpack_require__(95);
  
  var LoginPage = (function () {
    function LoginPage() {
      _classCallCheck(this, LoginPage);
    }
  
    _createClass(LoginPage, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: 'LoginPage' },
          'Login123',
          _react2['default'].createElement(
            'a',
            { href: '#' },
            _react2['default'].createElement('span', { className: 'glyphicon glyphicon-star' }),
            ' Star'
          )
        );
      }
    }], [{
      key: 'title',
      value: '登录1',
      enumerable: true
    }]);
  
    return LoginPage;
  })();
  
  exports['default'] = LoginPage;
  module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(89);


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(34)();
  exports.push([module.id, "/*! normalize.css v3.0.2 | MIT License | git.io/normalize */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden],\ntemplate {\n  display: none;\n}\na {\n  background-color: transparent;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nmark {\n  background: #ff0;\n  color: #000;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 1em 40px;\n}\nhr {\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\npre {\n  overflow: auto;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\nbutton {\n  overflow: visible;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\ninput {\n  line-height: normal;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0;\n}\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\nlegend {\n  border: 0;\n  padding: 0;\n}\ntextarea {\n  overflow: auto;\n}\noptgroup {\n  font-weight: bold;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd,\nth {\n  padding: 0;\n}\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important;\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  select {\n    background: #fff !important;\n  }\n  .navbar {\n    display: none;\n  }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n  .label {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url('/fonts/glyphicons-halflings-regular.eot');\n  src: url('/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('/fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('/fonts/glyphicons-halflings-regular.woff') format('woff'), url('/fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');\n}\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.glyphicon-asterisk:before {\n  content: \"\\2a\";\n}\n.glyphicon-plus:before {\n  content: \"\\2b\";\n}\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20ac\";\n}\n.glyphicon-minus:before {\n  content: \"\\2212\";\n}\n.glyphicon-cloud:before {\n  content: \"\\2601\";\n}\n.glyphicon-envelope:before {\n  content: \"\\2709\";\n}\n.glyphicon-pencil:before {\n  content: \"\\270f\";\n}\n.glyphicon-glass:before {\n  content: \"\\e001\";\n}\n.glyphicon-music:before {\n  content: \"\\e002\";\n}\n.glyphicon-search:before {\n  content: \"\\e003\";\n}\n.glyphicon-heart:before {\n  content: \"\\e005\";\n}\n.glyphicon-star:before {\n  content: \"\\e006\";\n}\n.glyphicon-star-empty:before {\n  content: \"\\e007\";\n}\n.glyphicon-user:before {\n  content: \"\\e008\";\n}\n.glyphicon-film:before {\n  content: \"\\e009\";\n}\n.glyphicon-th-large:before {\n  content: \"\\e010\";\n}\n.glyphicon-th:before {\n  content: \"\\e011\";\n}\n.glyphicon-th-list:before {\n  content: \"\\e012\";\n}\n.glyphicon-ok:before {\n  content: \"\\e013\";\n}\n.glyphicon-remove:before {\n  content: \"\\e014\";\n}\n.glyphicon-zoom-in:before {\n  content: \"\\e015\";\n}\n.glyphicon-zoom-out:before {\n  content: \"\\e016\";\n}\n.glyphicon-off:before {\n  content: \"\\e017\";\n}\n.glyphicon-signal:before {\n  content: \"\\e018\";\n}\n.glyphicon-cog:before {\n  content: \"\\e019\";\n}\n.glyphicon-trash:before {\n  content: \"\\e020\";\n}\n.glyphicon-home:before {\n  content: \"\\e021\";\n}\n.glyphicon-file:before {\n  content: \"\\e022\";\n}\n.glyphicon-time:before {\n  content: \"\\e023\";\n}\n.glyphicon-road:before {\n  content: \"\\e024\";\n}\n.glyphicon-download-alt:before {\n  content: \"\\e025\";\n}\n.glyphicon-download:before {\n  content: \"\\e026\";\n}\n.glyphicon-upload:before {\n  content: \"\\e027\";\n}\n.glyphicon-inbox:before {\n  content: \"\\e028\";\n}\n.glyphicon-play-circle:before {\n  content: \"\\e029\";\n}\n.glyphicon-repeat:before {\n  content: \"\\e030\";\n}\n.glyphicon-refresh:before {\n  content: \"\\e031\";\n}\n.glyphicon-list-alt:before {\n  content: \"\\e032\";\n}\n.glyphicon-lock:before {\n  content: \"\\e033\";\n}\n.glyphicon-flag:before {\n  content: \"\\e034\";\n}\n.glyphicon-headphones:before {\n  content: \"\\e035\";\n}\n.glyphicon-volume-off:before {\n  content: \"\\e036\";\n}\n.glyphicon-volume-down:before {\n  content: \"\\e037\";\n}\n.glyphicon-volume-up:before {\n  content: \"\\e038\";\n}\n.glyphicon-qrcode:before {\n  content: \"\\e039\";\n}\n.glyphicon-barcode:before {\n  content: \"\\e040\";\n}\n.glyphicon-tag:before {\n  content: \"\\e041\";\n}\n.glyphicon-tags:before {\n  content: \"\\e042\";\n}\n.glyphicon-book:before {\n  content: \"\\e043\";\n}\n.glyphicon-bookmark:before {\n  content: \"\\e044\";\n}\n.glyphicon-print:before {\n  content: \"\\e045\";\n}\n.glyphicon-camera:before {\n  content: \"\\e046\";\n}\n.glyphicon-font:before {\n  content: \"\\e047\";\n}\n.glyphicon-bold:before {\n  content: \"\\e048\";\n}\n.glyphicon-italic:before {\n  content: \"\\e049\";\n}\n.glyphicon-text-height:before {\n  content: \"\\e050\";\n}\n.glyphicon-text-width:before {\n  content: \"\\e051\";\n}\n.glyphicon-align-left:before {\n  content: \"\\e052\";\n}\n.glyphicon-align-center:before {\n  content: \"\\e053\";\n}\n.glyphicon-align-right:before {\n  content: \"\\e054\";\n}\n.glyphicon-align-justify:before {\n  content: \"\\e055\";\n}\n.glyphicon-list:before {\n  content: \"\\e056\";\n}\n.glyphicon-indent-left:before {\n  content: \"\\e057\";\n}\n.glyphicon-indent-right:before {\n  content: \"\\e058\";\n}\n.glyphicon-facetime-video:before {\n  content: \"\\e059\";\n}\n.glyphicon-picture:before {\n  content: \"\\e060\";\n}\n.glyphicon-map-marker:before {\n  content: \"\\e062\";\n}\n.glyphicon-adjust:before {\n  content: \"\\e063\";\n}\n.glyphicon-tint:before {\n  content: \"\\e064\";\n}\n.glyphicon-edit:before {\n  content: \"\\e065\";\n}\n.glyphicon-share:before {\n  content: \"\\e066\";\n}\n.glyphicon-check:before {\n  content: \"\\e067\";\n}\n.glyphicon-move:before {\n  content: \"\\e068\";\n}\n.glyphicon-step-backward:before {\n  content: \"\\e069\";\n}\n.glyphicon-fast-backward:before {\n  content: \"\\e070\";\n}\n.glyphicon-backward:before {\n  content: \"\\e071\";\n}\n.glyphicon-play:before {\n  content: \"\\e072\";\n}\n.glyphicon-pause:before {\n  content: \"\\e073\";\n}\n.glyphicon-stop:before {\n  content: \"\\e074\";\n}\n.glyphicon-forward:before {\n  content: \"\\e075\";\n}\n.glyphicon-fast-forward:before {\n  content: \"\\e076\";\n}\n.glyphicon-step-forward:before {\n  content: \"\\e077\";\n}\n.glyphicon-eject:before {\n  content: \"\\e078\";\n}\n.glyphicon-chevron-left:before {\n  content: \"\\e079\";\n}\n.glyphicon-chevron-right:before {\n  content: \"\\e080\";\n}\n.glyphicon-plus-sign:before {\n  content: \"\\e081\";\n}\n.glyphicon-minus-sign:before {\n  content: \"\\e082\";\n}\n.glyphicon-remove-sign:before {\n  content: \"\\e083\";\n}\n.glyphicon-ok-sign:before {\n  content: \"\\e084\";\n}\n.glyphicon-question-sign:before {\n  content: \"\\e085\";\n}\n.glyphicon-info-sign:before {\n  content: \"\\e086\";\n}\n.glyphicon-screenshot:before {\n  content: \"\\e087\";\n}\n.glyphicon-remove-circle:before {\n  content: \"\\e088\";\n}\n.glyphicon-ok-circle:before {\n  content: \"\\e089\";\n}\n.glyphicon-ban-circle:before {\n  content: \"\\e090\";\n}\n.glyphicon-arrow-left:before {\n  content: \"\\e091\";\n}\n.glyphicon-arrow-right:before {\n  content: \"\\e092\";\n}\n.glyphicon-arrow-up:before {\n  content: \"\\e093\";\n}\n.glyphicon-arrow-down:before {\n  content: \"\\e094\";\n}\n.glyphicon-share-alt:before {\n  content: \"\\e095\";\n}\n.glyphicon-resize-full:before {\n  content: \"\\e096\";\n}\n.glyphicon-resize-small:before {\n  content: \"\\e097\";\n}\n.glyphicon-exclamation-sign:before {\n  content: \"\\e101\";\n}\n.glyphicon-gift:before {\n  content: \"\\e102\";\n}\n.glyphicon-leaf:before {\n  content: \"\\e103\";\n}\n.glyphicon-fire:before {\n  content: \"\\e104\";\n}\n.glyphicon-eye-open:before {\n  content: \"\\e105\";\n}\n.glyphicon-eye-close:before {\n  content: \"\\e106\";\n}\n.glyphicon-warning-sign:before {\n  content: \"\\e107\";\n}\n.glyphicon-plane:before {\n  content: \"\\e108\";\n}\n.glyphicon-calendar:before {\n  content: \"\\e109\";\n}\n.glyphicon-random:before {\n  content: \"\\e110\";\n}\n.glyphicon-comment:before {\n  content: \"\\e111\";\n}\n.glyphicon-magnet:before {\n  content: \"\\e112\";\n}\n.glyphicon-chevron-up:before {\n  content: \"\\e113\";\n}\n.glyphicon-chevron-down:before {\n  content: \"\\e114\";\n}\n.glyphicon-retweet:before {\n  content: \"\\e115\";\n}\n.glyphicon-shopping-cart:before {\n  content: \"\\e116\";\n}\n.glyphicon-folder-close:before {\n  content: \"\\e117\";\n}\n.glyphicon-folder-open:before {\n  content: \"\\e118\";\n}\n.glyphicon-resize-vertical:before {\n  content: \"\\e119\";\n}\n.glyphicon-resize-horizontal:before {\n  content: \"\\e120\";\n}\n.glyphicon-hdd:before {\n  content: \"\\e121\";\n}\n.glyphicon-bullhorn:before {\n  content: \"\\e122\";\n}\n.glyphicon-bell:before {\n  content: \"\\e123\";\n}\n.glyphicon-certificate:before {\n  content: \"\\e124\";\n}\n.glyphicon-thumbs-up:before {\n  content: \"\\e125\";\n}\n.glyphicon-thumbs-down:before {\n  content: \"\\e126\";\n}\n.glyphicon-hand-right:before {\n  content: \"\\e127\";\n}\n.glyphicon-hand-left:before {\n  content: \"\\e128\";\n}\n.glyphicon-hand-up:before {\n  content: \"\\e129\";\n}\n.glyphicon-hand-down:before {\n  content: \"\\e130\";\n}\n.glyphicon-circle-arrow-right:before {\n  content: \"\\e131\";\n}\n.glyphicon-circle-arrow-left:before {\n  content: \"\\e132\";\n}\n.glyphicon-circle-arrow-up:before {\n  content: \"\\e133\";\n}\n.glyphicon-circle-arrow-down:before {\n  content: \"\\e134\";\n}\n.glyphicon-globe:before {\n  content: \"\\e135\";\n}\n.glyphicon-wrench:before {\n  content: \"\\e136\";\n}\n.glyphicon-tasks:before {\n  content: \"\\e137\";\n}\n.glyphicon-filter:before {\n  content: \"\\e138\";\n}\n.glyphicon-briefcase:before {\n  content: \"\\e139\";\n}\n.glyphicon-fullscreen:before {\n  content: \"\\e140\";\n}\n.glyphicon-dashboard:before {\n  content: \"\\e141\";\n}\n.glyphicon-paperclip:before {\n  content: \"\\e142\";\n}\n.glyphicon-heart-empty:before {\n  content: \"\\e143\";\n}\n.glyphicon-link:before {\n  content: \"\\e144\";\n}\n.glyphicon-phone:before {\n  content: \"\\e145\";\n}\n.glyphicon-pushpin:before {\n  content: \"\\e146\";\n}\n.glyphicon-usd:before {\n  content: \"\\e148\";\n}\n.glyphicon-gbp:before {\n  content: \"\\e149\";\n}\n.glyphicon-sort:before {\n  content: \"\\e150\";\n}\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\e151\";\n}\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\e152\";\n}\n.glyphicon-sort-by-order:before {\n  content: \"\\e153\";\n}\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\e154\";\n}\n.glyphicon-sort-by-attributes:before {\n  content: \"\\e155\";\n}\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\e156\";\n}\n.glyphicon-unchecked:before {\n  content: \"\\e157\";\n}\n.glyphicon-expand:before {\n  content: \"\\e158\";\n}\n.glyphicon-collapse-down:before {\n  content: \"\\e159\";\n}\n.glyphicon-collapse-up:before {\n  content: \"\\e160\";\n}\n.glyphicon-log-in:before {\n  content: \"\\e161\";\n}\n.glyphicon-flash:before {\n  content: \"\\e162\";\n}\n.glyphicon-log-out:before {\n  content: \"\\e163\";\n}\n.glyphicon-new-window:before {\n  content: \"\\e164\";\n}\n.glyphicon-record:before {\n  content: \"\\e165\";\n}\n.glyphicon-save:before {\n  content: \"\\e166\";\n}\n.glyphicon-open:before {\n  content: \"\\e167\";\n}\n.glyphicon-saved:before {\n  content: \"\\e168\";\n}\n.glyphicon-import:before {\n  content: \"\\e169\";\n}\n.glyphicon-export:before {\n  content: \"\\e170\";\n}\n.glyphicon-send:before {\n  content: \"\\e171\";\n}\n.glyphicon-floppy-disk:before {\n  content: \"\\e172\";\n}\n.glyphicon-floppy-saved:before {\n  content: \"\\e173\";\n}\n.glyphicon-floppy-remove:before {\n  content: \"\\e174\";\n}\n.glyphicon-floppy-save:before {\n  content: \"\\e175\";\n}\n.glyphicon-floppy-open:before {\n  content: \"\\e176\";\n}\n.glyphicon-credit-card:before {\n  content: \"\\e177\";\n}\n.glyphicon-transfer:before {\n  content: \"\\e178\";\n}\n.glyphicon-cutlery:before {\n  content: \"\\e179\";\n}\n.glyphicon-header:before {\n  content: \"\\e180\";\n}\n.glyphicon-compressed:before {\n  content: \"\\e181\";\n}\n.glyphicon-earphone:before {\n  content: \"\\e182\";\n}\n.glyphicon-phone-alt:before {\n  content: \"\\e183\";\n}\n.glyphicon-tower:before {\n  content: \"\\e184\";\n}\n.glyphicon-stats:before {\n  content: \"\\e185\";\n}\n.glyphicon-sd-video:before {\n  content: \"\\e186\";\n}\n.glyphicon-hd-video:before {\n  content: \"\\e187\";\n}\n.glyphicon-subtitles:before {\n  content: \"\\e188\";\n}\n.glyphicon-sound-stereo:before {\n  content: \"\\e189\";\n}\n.glyphicon-sound-dolby:before {\n  content: \"\\e190\";\n}\n.glyphicon-sound-5-1:before {\n  content: \"\\e191\";\n}\n.glyphicon-sound-6-1:before {\n  content: \"\\e192\";\n}\n.glyphicon-sound-7-1:before {\n  content: \"\\e193\";\n}\n.glyphicon-copyright-mark:before {\n  content: \"\\e194\";\n}\n.glyphicon-registration-mark:before {\n  content: \"\\e195\";\n}\n.glyphicon-cloud-download:before {\n  content: \"\\e197\";\n}\n.glyphicon-cloud-upload:before {\n  content: \"\\e198\";\n}\n.glyphicon-tree-conifer:before {\n  content: \"\\e199\";\n}\n.glyphicon-tree-deciduous:before {\n  content: \"\\e200\";\n}\n.glyphicon-cd:before {\n  content: \"\\e201\";\n}\n.glyphicon-save-file:before {\n  content: \"\\e202\";\n}\n.glyphicon-open-file:before {\n  content: \"\\e203\";\n}\n.glyphicon-level-up:before {\n  content: \"\\e204\";\n}\n.glyphicon-copy:before {\n  content: \"\\e205\";\n}\n.glyphicon-paste:before {\n  content: \"\\e206\";\n}\n.glyphicon-alert:before {\n  content: \"\\e209\";\n}\n.glyphicon-equalizer:before {\n  content: \"\\e210\";\n}\n.glyphicon-king:before {\n  content: \"\\e211\";\n}\n.glyphicon-queen:before {\n  content: \"\\e212\";\n}\n.glyphicon-pawn:before {\n  content: \"\\e213\";\n}\n.glyphicon-bishop:before {\n  content: \"\\e214\";\n}\n.glyphicon-knight:before {\n  content: \"\\e215\";\n}\n.glyphicon-baby-formula:before {\n  content: \"\\e216\";\n}\n.glyphicon-tent:before {\n  content: \"\\26fa\";\n}\n.glyphicon-blackboard:before {\n  content: \"\\e218\";\n}\n.glyphicon-bed:before {\n  content: \"\\e219\";\n}\n.glyphicon-apple:before {\n  content: \"\\f8ff\";\n}\n.glyphicon-erase:before {\n  content: \"\\e221\";\n}\n.glyphicon-hourglass:before {\n  content: \"\\231b\";\n}\n.glyphicon-lamp:before {\n  content: \"\\e223\";\n}\n.glyphicon-duplicate:before {\n  content: \"\\e224\";\n}\n.glyphicon-piggy-bank:before {\n  content: \"\\e225\";\n}\n.glyphicon-scissors:before {\n  content: \"\\e226\";\n}\n.glyphicon-bitcoin:before {\n  content: \"\\e227\";\n}\n.glyphicon-btc:before {\n  content: \"\\e227\";\n}\n.glyphicon-xbt:before {\n  content: \"\\e227\";\n}\n.glyphicon-yen:before {\n  content: \"\\00a5\";\n}\n.glyphicon-jpy:before {\n  content: \"\\00a5\";\n}\n.glyphicon-ruble:before {\n  content: \"\\20bd\";\n}\n.glyphicon-rub:before {\n  content: \"\\20bd\";\n}\n.glyphicon-scale:before {\n  content: \"\\e230\";\n}\n.glyphicon-ice-lolly:before {\n  content: \"\\e231\";\n}\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\e232\";\n}\n.glyphicon-education:before {\n  content: \"\\e233\";\n}\n.glyphicon-option-horizontal:before {\n  content: \"\\e234\";\n}\n.glyphicon-option-vertical:before {\n  content: \"\\e235\";\n}\n.glyphicon-menu-hamburger:before {\n  content: \"\\e236\";\n}\n.glyphicon-modal-window:before {\n  content: \"\\e237\";\n}\n.glyphicon-oil:before {\n  content: \"\\e238\";\n}\n.glyphicon-grain:before {\n  content: \"\\e239\";\n}\n.glyphicon-sunglasses:before {\n  content: \"\\e240\";\n}\n.glyphicon-text-size:before {\n  content: \"\\e241\";\n}\n.glyphicon-text-color:before {\n  content: \"\\e242\";\n}\n.glyphicon-text-background:before {\n  content: \"\\e243\";\n}\n.glyphicon-object-align-top:before {\n  content: \"\\e244\";\n}\n.glyphicon-object-align-bottom:before {\n  content: \"\\e245\";\n}\n.glyphicon-object-align-horizontal:before {\n  content: \"\\e246\";\n}\n.glyphicon-object-align-left:before {\n  content: \"\\e247\";\n}\n.glyphicon-object-align-vertical:before {\n  content: \"\\e248\";\n}\n.glyphicon-object-align-right:before {\n  content: \"\\e249\";\n}\n.glyphicon-triangle-right:before {\n  content: \"\\e250\";\n}\n.glyphicon-triangle-left:before {\n  content: \"\\e251\";\n}\n.glyphicon-triangle-bottom:before {\n  content: \"\\e252\";\n}\n.glyphicon-triangle-top:before {\n  content: \"\\e253\";\n}\n.glyphicon-console:before {\n  content: \"\\e254\";\n}\n.glyphicon-superscript:before {\n  content: \"\\e255\";\n}\n.glyphicon-subscript:before {\n  content: \"\\e256\";\n}\n.glyphicon-menu-left:before {\n  content: \"\\e257\";\n}\n.glyphicon-menu-right:before {\n  content: \"\\e258\";\n}\n.glyphicon-menu-down:before {\n  content: \"\\e259\";\n}\n.glyphicon-menu-up:before {\n  content: \"\\e260\";\n}\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #333333;\n  background-color: #ffffff;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\na {\n  color: #337ab7;\n  text-decoration: none;\n}\na:hover,\na:focus {\n  color: #23527c;\n  text-decoration: underline;\n}\na:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\nfigure {\n  margin: 0;\n}\nimg {\n  vertical-align: middle;\n}\n.img-responsive,\n.thumbnail > img,\n.thumbnail a > img,\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n.img-rounded {\n  border-radius: 6px;\n}\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857143;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\n.img-circle {\n  border-radius: 50%;\n}\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n[role=\"button\"] {\n  cursor: pointer;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit;\n}\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small,\n.h1 small,\n.h2 small,\n.h3 small,\n.h4 small,\n.h5 small,\n.h6 small,\nh1 .small,\nh2 .small,\nh3 .small,\nh4 .small,\nh5 .small,\nh6 .small,\n.h1 .small,\n.h2 .small,\n.h3 .small,\n.h4 .small,\n.h5 .small,\n.h6 .small {\n  font-weight: normal;\n  line-height: 1;\n  color: #777777;\n}\nh1,\n.h1,\nh2,\n.h2,\nh3,\n.h3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\nh1 small,\n.h1 small,\nh2 small,\n.h2 small,\nh3 small,\n.h3 small,\nh1 .small,\n.h1 .small,\nh2 .small,\n.h2 .small,\nh3 .small,\n.h3 .small {\n  font-size: 65%;\n}\nh4,\n.h4,\nh5,\n.h5,\nh6,\n.h6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nh4 small,\n.h4 small,\nh5 small,\n.h5 small,\nh6 small,\n.h6 small,\nh4 .small,\n.h4 .small,\nh5 .small,\n.h5 .small,\nh6 .small,\n.h6 .small {\n  font-size: 75%;\n}\nh1,\n.h1 {\n  font-size: 36px;\n}\nh2,\n.h2 {\n  font-size: 30px;\n}\nh3,\n.h3 {\n  font-size: 24px;\n}\nh4,\n.h4 {\n  font-size: 18px;\n}\nh5,\n.h5 {\n  font-size: 14px;\n}\nh6,\n.h6 {\n  font-size: 12px;\n}\np {\n  margin: 0 0 10px;\n}\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\nsmall,\n.small {\n  font-size: 85%;\n}\nmark,\n.mark {\n  background-color: #fcf8e3;\n  padding: .2em;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\n.text-justify {\n  text-align: justify;\n}\n.text-nowrap {\n  white-space: nowrap;\n}\n.text-lowercase {\n  text-transform: lowercase;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-muted {\n  color: #777777;\n}\n.text-primary {\n  color: #337ab7;\n}\na.text-primary:hover {\n  color: #286090;\n}\n.text-success {\n  color: #3c763d;\n}\na.text-success:hover {\n  color: #2b542c;\n}\n.text-info {\n  color: #31708f;\n}\na.text-info:hover {\n  color: #245269;\n}\n.text-warning {\n  color: #8a6d3b;\n}\na.text-warning:hover {\n  color: #66512c;\n}\n.text-danger {\n  color: #a94442;\n}\na.text-danger:hover {\n  color: #843534;\n}\n.bg-primary {\n  color: #fff;\n  background-color: #337ab7;\n}\na.bg-primary:hover {\n  background-color: #286090;\n}\n.bg-success {\n  background-color: #dff0d8;\n}\na.bg-success:hover {\n  background-color: #c1e2b3;\n}\n.bg-info {\n  background-color: #d9edf7;\n}\na.bg-info:hover {\n  background-color: #afd9ee;\n}\n.bg-warning {\n  background-color: #fcf8e3;\n}\na.bg-warning:hover {\n  background-color: #f7ecb5;\n}\n.bg-danger {\n  background-color: #f2dede;\n}\na.bg-danger:hover {\n  background-color: #e4b9b9;\n}\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eeeeee;\n}\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-bottom: 0;\n}\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n  margin-left: -5px;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-left: 5px;\n  padding-right: 5px;\n}\ndl {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\ndt,\ndd {\n  line-height: 1.42857143;\n}\ndt {\n  font-weight: bold;\n}\ndd {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    clear: left;\n    text-align: right;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .dl-horizontal dd {\n    margin-left: 180px;\n  }\n}\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #777777;\n}\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eeeeee;\n}\nblockquote p:last-child,\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\nblockquote footer,\nblockquote small,\nblockquote .small {\n  display: block;\n  font-size: 80%;\n  line-height: 1.42857143;\n  color: #777777;\n}\nblockquote footer:before,\nblockquote small:before,\nblockquote .small:before {\n  content: '\\2014 \\00A0';\n}\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0;\n  text-align: right;\n}\n.blockquote-reverse footer:before,\nblockquote.pull-right footer:before,\n.blockquote-reverse small:before,\nblockquote.pull-right small:before,\n.blockquote-reverse .small:before,\nblockquote.pull-right .small:before {\n  content: '';\n}\n.blockquote-reverse footer:after,\nblockquote.pull-right footer:after,\n.blockquote-reverse small:after,\nblockquote.pull-right small:after,\n.blockquote-reverse .small:after,\nblockquote.pull-right .small:after {\n  content: '\\00A0 \\2014';\n}\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857143;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px;\n}\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #ffffff;\n  background-color: #333333;\n  border-radius: 3px;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857143;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border-radius: 0;\n}\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    width: 970px;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    width: 1170px;\n  }\n}\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left;\n}\n.col-xs-12 {\n  width: 100%;\n}\n.col-xs-11 {\n  width: 91.66666667%;\n}\n.col-xs-10 {\n  width: 83.33333333%;\n}\n.col-xs-9 {\n  width: 75%;\n}\n.col-xs-8 {\n  width: 66.66666667%;\n}\n.col-xs-7 {\n  width: 58.33333333%;\n}\n.col-xs-6 {\n  width: 50%;\n}\n.col-xs-5 {\n  width: 41.66666667%;\n}\n.col-xs-4 {\n  width: 33.33333333%;\n}\n.col-xs-3 {\n  width: 25%;\n}\n.col-xs-2 {\n  width: 16.66666667%;\n}\n.col-xs-1 {\n  width: 8.33333333%;\n}\n.col-xs-pull-12 {\n  right: 100%;\n}\n.col-xs-pull-11 {\n  right: 91.66666667%;\n}\n.col-xs-pull-10 {\n  right: 83.33333333%;\n}\n.col-xs-pull-9 {\n  right: 75%;\n}\n.col-xs-pull-8 {\n  right: 66.66666667%;\n}\n.col-xs-pull-7 {\n  right: 58.33333333%;\n}\n.col-xs-pull-6 {\n  right: 50%;\n}\n.col-xs-pull-5 {\n  right: 41.66666667%;\n}\n.col-xs-pull-4 {\n  right: 33.33333333%;\n}\n.col-xs-pull-3 {\n  right: 25%;\n}\n.col-xs-pull-2 {\n  right: 16.66666667%;\n}\n.col-xs-pull-1 {\n  right: 8.33333333%;\n}\n.col-xs-pull-0 {\n  right: auto;\n}\n.col-xs-push-12 {\n  left: 100%;\n}\n.col-xs-push-11 {\n  left: 91.66666667%;\n}\n.col-xs-push-10 {\n  left: 83.33333333%;\n}\n.col-xs-push-9 {\n  left: 75%;\n}\n.col-xs-push-8 {\n  left: 66.66666667%;\n}\n.col-xs-push-7 {\n  left: 58.33333333%;\n}\n.col-xs-push-6 {\n  left: 50%;\n}\n.col-xs-push-5 {\n  left: 41.66666667%;\n}\n.col-xs-push-4 {\n  left: 33.33333333%;\n}\n.col-xs-push-3 {\n  left: 25%;\n}\n.col-xs-push-2 {\n  left: 16.66666667%;\n}\n.col-xs-push-1 {\n  left: 8.33333333%;\n}\n.col-xs-push-0 {\n  left: auto;\n}\n.col-xs-offset-12 {\n  margin-left: 100%;\n}\n.col-xs-offset-11 {\n  margin-left: 91.66666667%;\n}\n.col-xs-offset-10 {\n  margin-left: 83.33333333%;\n}\n.col-xs-offset-9 {\n  margin-left: 75%;\n}\n.col-xs-offset-8 {\n  margin-left: 66.66666667%;\n}\n.col-xs-offset-7 {\n  margin-left: 58.33333333%;\n}\n.col-xs-offset-6 {\n  margin-left: 50%;\n}\n.col-xs-offset-5 {\n  margin-left: 41.66666667%;\n}\n.col-xs-offset-4 {\n  margin-left: 33.33333333%;\n}\n.col-xs-offset-3 {\n  margin-left: 25%;\n}\n.col-xs-offset-2 {\n  margin-left: 16.66666667%;\n}\n.col-xs-offset-1 {\n  margin-left: 8.33333333%;\n}\n.col-xs-offset-0 {\n  margin-left: 0%;\n}\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-sm-11 {\n    width: 91.66666667%;\n  }\n  .col-sm-10 {\n    width: 83.33333333%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-8 {\n    width: 66.66666667%;\n  }\n  .col-sm-7 {\n    width: 58.33333333%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-5 {\n    width: 41.66666667%;\n  }\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-2 {\n    width: 16.66666667%;\n  }\n  .col-sm-1 {\n    width: 8.33333333%;\n  }\n  .col-sm-pull-12 {\n    right: 100%;\n  }\n  .col-sm-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-sm-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-sm-pull-9 {\n    right: 75%;\n  }\n  .col-sm-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-sm-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-sm-pull-6 {\n    right: 50%;\n  }\n  .col-sm-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-sm-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-sm-pull-3 {\n    right: 25%;\n  }\n  .col-sm-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-sm-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-sm-pull-0 {\n    right: auto;\n  }\n  .col-sm-push-12 {\n    left: 100%;\n  }\n  .col-sm-push-11 {\n    left: 91.66666667%;\n  }\n  .col-sm-push-10 {\n    left: 83.33333333%;\n  }\n  .col-sm-push-9 {\n    left: 75%;\n  }\n  .col-sm-push-8 {\n    left: 66.66666667%;\n  }\n  .col-sm-push-7 {\n    left: 58.33333333%;\n  }\n  .col-sm-push-6 {\n    left: 50%;\n  }\n  .col-sm-push-5 {\n    left: 41.66666667%;\n  }\n  .col-sm-push-4 {\n    left: 33.33333333%;\n  }\n  .col-sm-push-3 {\n    left: 25%;\n  }\n  .col-sm-push-2 {\n    left: 16.66666667%;\n  }\n  .col-sm-push-1 {\n    left: 8.33333333%;\n  }\n  .col-sm-push-0 {\n    left: auto;\n  }\n  .col-sm-offset-12 {\n    margin-left: 100%;\n  }\n  .col-sm-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-sm-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-sm-offset-9 {\n    margin-left: 75%;\n  }\n  .col-sm-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-sm-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-sm-offset-6 {\n    margin-left: 50%;\n  }\n  .col-sm-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-sm-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-sm-offset-3 {\n    margin-left: 25%;\n  }\n  .col-sm-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-sm-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-sm-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n  .col-md-12 {\n    width: 100%;\n  }\n  .col-md-11 {\n    width: 91.66666667%;\n  }\n  .col-md-10 {\n    width: 83.33333333%;\n  }\n  .col-md-9 {\n    width: 75%;\n  }\n  .col-md-8 {\n    width: 66.66666667%;\n  }\n  .col-md-7 {\n    width: 58.33333333%;\n  }\n  .col-md-6 {\n    width: 50%;\n  }\n  .col-md-5 {\n    width: 41.66666667%;\n  }\n  .col-md-4 {\n    width: 33.33333333%;\n  }\n  .col-md-3 {\n    width: 25%;\n  }\n  .col-md-2 {\n    width: 16.66666667%;\n  }\n  .col-md-1 {\n    width: 8.33333333%;\n  }\n  .col-md-pull-12 {\n    right: 100%;\n  }\n  .col-md-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-md-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-md-pull-9 {\n    right: 75%;\n  }\n  .col-md-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-md-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-md-pull-6 {\n    right: 50%;\n  }\n  .col-md-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-md-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-md-pull-3 {\n    right: 25%;\n  }\n  .col-md-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-md-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-md-pull-0 {\n    right: auto;\n  }\n  .col-md-push-12 {\n    left: 100%;\n  }\n  .col-md-push-11 {\n    left: 91.66666667%;\n  }\n  .col-md-push-10 {\n    left: 83.33333333%;\n  }\n  .col-md-push-9 {\n    left: 75%;\n  }\n  .col-md-push-8 {\n    left: 66.66666667%;\n  }\n  .col-md-push-7 {\n    left: 58.33333333%;\n  }\n  .col-md-push-6 {\n    left: 50%;\n  }\n  .col-md-push-5 {\n    left: 41.66666667%;\n  }\n  .col-md-push-4 {\n    left: 33.33333333%;\n  }\n  .col-md-push-3 {\n    left: 25%;\n  }\n  .col-md-push-2 {\n    left: 16.66666667%;\n  }\n  .col-md-push-1 {\n    left: 8.33333333%;\n  }\n  .col-md-push-0 {\n    left: auto;\n  }\n  .col-md-offset-12 {\n    margin-left: 100%;\n  }\n  .col-md-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-md-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-md-offset-9 {\n    margin-left: 75%;\n  }\n  .col-md-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-md-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-md-offset-6 {\n    margin-left: 50%;\n  }\n  .col-md-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-md-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-md-offset-3 {\n    margin-left: 25%;\n  }\n  .col-md-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-md-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-md-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-lg-11 {\n    width: 91.66666667%;\n  }\n  .col-lg-10 {\n    width: 83.33333333%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-8 {\n    width: 66.66666667%;\n  }\n  .col-lg-7 {\n    width: 58.33333333%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-5 {\n    width: 41.66666667%;\n  }\n  .col-lg-4 {\n    width: 33.33333333%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-2 {\n    width: 16.66666667%;\n  }\n  .col-lg-1 {\n    width: 8.33333333%;\n  }\n  .col-lg-pull-12 {\n    right: 100%;\n  }\n  .col-lg-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-lg-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-lg-pull-9 {\n    right: 75%;\n  }\n  .col-lg-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-lg-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-lg-pull-6 {\n    right: 50%;\n  }\n  .col-lg-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-lg-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-lg-pull-3 {\n    right: 25%;\n  }\n  .col-lg-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-lg-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-lg-pull-0 {\n    right: auto;\n  }\n  .col-lg-push-12 {\n    left: 100%;\n  }\n  .col-lg-push-11 {\n    left: 91.66666667%;\n  }\n  .col-lg-push-10 {\n    left: 83.33333333%;\n  }\n  .col-lg-push-9 {\n    left: 75%;\n  }\n  .col-lg-push-8 {\n    left: 66.66666667%;\n  }\n  .col-lg-push-7 {\n    left: 58.33333333%;\n  }\n  .col-lg-push-6 {\n    left: 50%;\n  }\n  .col-lg-push-5 {\n    left: 41.66666667%;\n  }\n  .col-lg-push-4 {\n    left: 33.33333333%;\n  }\n  .col-lg-push-3 {\n    left: 25%;\n  }\n  .col-lg-push-2 {\n    left: 16.66666667%;\n  }\n  .col-lg-push-1 {\n    left: 8.33333333%;\n  }\n  .col-lg-push-0 {\n    left: auto;\n  }\n  .col-lg-offset-12 {\n    margin-left: 100%;\n  }\n  .col-lg-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-lg-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-lg-offset-9 {\n    margin-left: 75%;\n  }\n  .col-lg-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-lg-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-lg-offset-6 {\n    margin-left: 50%;\n  }\n  .col-lg-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-lg-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-lg-offset-3 {\n    margin-left: 25%;\n  }\n  .col-lg-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-lg-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-lg-offset-0 {\n    margin-left: 0%;\n  }\n}\ntable {\n  background-color: transparent;\n}\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #777777;\n  text-align: left;\n}\nth {\n  text-align: left;\n}\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px;\n}\n.table > thead > tr > th,\n.table > tbody > tr > th,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > td,\n.table > tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.42857143;\n  vertical-align: top;\n  border-top: 1px solid #dddddd;\n}\n.table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #dddddd;\n}\n.table > caption + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > th,\n.table > thead:first-child > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n.table > tbody + tbody {\n  border-top: 2px solid #dddddd;\n}\n.table .table {\n  background-color: #ffffff;\n}\n.table-condensed > thead > tr > th,\n.table-condensed > tbody > tr > th,\n.table-condensed > tfoot > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > td {\n  padding: 5px;\n}\n.table-bordered {\n  border: 1px solid #dddddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #dddddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9;\n}\n.table-hover > tbody > tr:hover {\n  background-color: #f5f5f5;\n}\ntable col[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-column;\n}\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-cell;\n}\n.table > thead > tr > td.active,\n.table > tbody > tr > td.active,\n.table > tfoot > tr > td.active,\n.table > thead > tr > th.active,\n.table > tbody > tr > th.active,\n.table > tfoot > tr > th.active,\n.table > thead > tr.active > td,\n.table > tbody > tr.active > td,\n.table > tfoot > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr.active > th,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5;\n}\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8;\n}\n.table > thead > tr > td.success,\n.table > tbody > tr > td.success,\n.table > tfoot > tr > td.success,\n.table > thead > tr > th.success,\n.table > tbody > tr > th.success,\n.table > tfoot > tr > th.success,\n.table > thead > tr.success > td,\n.table > tbody > tr.success > td,\n.table > tfoot > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr.success > th,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n}\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6;\n}\n.table > thead > tr > td.info,\n.table > tbody > tr > td.info,\n.table > tfoot > tr > td.info,\n.table > thead > tr > th.info,\n.table > tbody > tr > th.info,\n.table > tfoot > tr > th.info,\n.table > thead > tr.info > td,\n.table > tbody > tr.info > td,\n.table > tfoot > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr.info > th,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7;\n}\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3;\n}\n.table > thead > tr > td.warning,\n.table > tbody > tr > td.warning,\n.table > tfoot > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > tbody > tr > th.warning,\n.table > tfoot > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > tbody > tr.warning > td,\n.table > tfoot > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n}\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc;\n}\n.table > thead > tr > td.danger,\n.table > tbody > tr > td.danger,\n.table > tfoot > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > tbody > tr > th.danger,\n.table > tfoot > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > tbody > tr.danger > td,\n.table > tfoot > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n}\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc;\n}\n.table-responsive {\n  overflow-x: auto;\n  min-height: 0.01%;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive {\n    width: 100%;\n    margin-bottom: 15px;\n    overflow-y: hidden;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    border: 1px solid #dddddd;\n  }\n  .table-responsive > .table {\n    margin-bottom: 0;\n  }\n  .table-responsive > .table > thead > tr > th,\n  .table-responsive > .table > tbody > tr > th,\n  .table-responsive > .table > tfoot > tr > th,\n  .table-responsive > .table > thead > tr > td,\n  .table-responsive > .table > tbody > tr > td,\n  .table-responsive > .table > tfoot > tr > td {\n    white-space: nowrap;\n  }\n  .table-responsive > .table-bordered {\n    border: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0;\n  }\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n    border-bottom: 0;\n  }\n}\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0;\n}\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal;\n}\ninput[type=\"file\"] {\n  display: block;\n}\ninput[type=\"range\"] {\n  display: block;\n  width: 100%;\n}\nselect[multiple],\nselect[size] {\n  height: auto;\n}\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555555;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555555;\n  background-color: #ffffff;\n  background-image: none;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;\n  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.form-control:focus {\n  border-color: #66afe9;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n}\n.form-control::-moz-placeholder {\n  color: #999999;\n  opacity: 1;\n}\n.form-control:-ms-input-placeholder {\n  color: #999999;\n}\n.form-control::-webkit-input-placeholder {\n  color: #999999;\n}\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  background-color: #eeeeee;\n  opacity: 1;\n}\n.form-control[disabled],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n}\ntextarea.form-control {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"],\n  input[type=\"time\"],\n  input[type=\"datetime-local\"],\n  input[type=\"month\"] {\n    line-height: 34px;\n  }\n  input[type=\"date\"].input-sm,\n  input[type=\"time\"].input-sm,\n  input[type=\"datetime-local\"].input-sm,\n  input[type=\"month\"].input-sm,\n  .input-group-sm input[type=\"date\"],\n  .input-group-sm input[type=\"time\"],\n  .input-group-sm input[type=\"datetime-local\"],\n  .input-group-sm input[type=\"month\"] {\n    line-height: 30px;\n  }\n  input[type=\"date\"].input-lg,\n  input[type=\"time\"].input-lg,\n  input[type=\"datetime-local\"].input-lg,\n  input[type=\"month\"].input-lg,\n  .input-group-lg input[type=\"date\"],\n  .input-group-lg input[type=\"time\"],\n  .input-group-lg input[type=\"datetime-local\"],\n  .input-group-lg input[type=\"month\"] {\n    line-height: 46px;\n  }\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.radio label,\n.checkbox label {\n  min-height: 20px;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9;\n}\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\ninput[type=\"radio\"][disabled],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"radio\"].disabled,\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\nfieldset[disabled] input[type=\"checkbox\"] {\n  cursor: not-allowed;\n}\n.radio-inline.disabled,\n.checkbox-inline.disabled,\nfieldset[disabled] .radio-inline,\nfieldset[disabled] .checkbox-inline {\n  cursor: not-allowed;\n}\n.radio.disabled label,\n.checkbox.disabled label,\nfieldset[disabled] .radio label,\nfieldset[disabled] .checkbox label {\n  cursor: not-allowed;\n}\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n  min-height: 34px;\n}\n.form-control-static.input-lg,\n.form-control-static.input-sm {\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-sm {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-sm {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-sm,\nselect[multiple].input-sm {\n  height: auto;\n}\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.form-group-sm .form-control {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.form-group-sm .form-control,\nselect[multiple].form-group-sm .form-control {\n  height: auto;\n}\n.form-group-sm .form-control-static {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  min-height: 32px;\n}\n.input-lg {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-lg {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-lg,\nselect[multiple].input-lg {\n  height: auto;\n}\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.form-group-lg .form-control {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.form-group-lg .form-control,\nselect[multiple].form-group-lg .form-control {\n  height: auto;\n}\n.form-group-lg .form-control-static {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  min-height: 38px;\n}\n.has-feedback {\n  position: relative;\n}\n.has-feedback .form-control {\n  padding-right: 42.5px;\n}\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none;\n}\n.input-lg + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px;\n}\n.input-sm + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d;\n}\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-success .form-control:focus {\n  border-color: #2b542c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n}\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8;\n}\n.has-success .form-control-feedback {\n  color: #3c763d;\n}\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b;\n}\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-warning .form-control:focus {\n  border-color: #66512c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n}\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3;\n}\n.has-warning .form-control-feedback {\n  color: #8a6d3b;\n}\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442;\n}\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-error .form-control:focus {\n  border-color: #843534;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n}\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede;\n}\n.has-error .form-control-feedback {\n  color: #a94442;\n}\n.has-feedback label ~ .form-control-feedback {\n  top: 25px;\n}\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0;\n}\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373;\n}\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .form-control-static {\n    display: inline-block;\n  }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .form-inline .input-group .input-group-addon,\n  .form-inline .input-group .input-group-btn,\n  .form-inline .input-group .form-control {\n    width: auto;\n  }\n  .form-inline .input-group > .form-control {\n    width: 100%;\n  }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio label,\n  .form-inline .checkbox label {\n    padding-left: 0;\n  }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px;\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px;\n}\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px;\n  }\n}\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 14.333333px;\n  }\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n  }\n}\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.btn:focus,\n.btn:active:focus,\n.btn.active:focus,\n.btn.focus,\n.btn:active.focus,\n.btn.active.focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover,\n.btn:focus,\n.btn.focus {\n  color: #333333;\n  text-decoration: none;\n}\n.btn:active,\n.btn.active {\n  outline: 0;\n  background-image: none;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: not-allowed;\n  pointer-events: none;\n  opacity: 0.65;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-default {\n  color: #333333;\n  background-color: #ffffff;\n  border-color: #cccccc;\n}\n.btn-default:hover,\n.btn-default:focus,\n.btn-default.focus,\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  color: #333333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  background-image: none;\n}\n.btn-default.disabled,\n.btn-default[disabled],\nfieldset[disabled] .btn-default,\n.btn-default.disabled:hover,\n.btn-default[disabled]:hover,\nfieldset[disabled] .btn-default:hover,\n.btn-default.disabled:focus,\n.btn-default[disabled]:focus,\nfieldset[disabled] .btn-default:focus,\n.btn-default.disabled.focus,\n.btn-default[disabled].focus,\nfieldset[disabled] .btn-default.focus,\n.btn-default.disabled:active,\n.btn-default[disabled]:active,\nfieldset[disabled] .btn-default:active,\n.btn-default.disabled.active,\n.btn-default[disabled].active,\nfieldset[disabled] .btn-default.active {\n  background-color: #ffffff;\n  border-color: #cccccc;\n}\n.btn-default .badge {\n  color: #ffffff;\n  background-color: #333333;\n}\n.btn-primary {\n  color: #ffffff;\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n.btn-primary:hover,\n.btn-primary:focus,\n.btn-primary.focus,\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  color: #ffffff;\n  background-color: #286090;\n  border-color: #204d74;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  background-image: none;\n}\n.btn-primary.disabled,\n.btn-primary[disabled],\nfieldset[disabled] .btn-primary,\n.btn-primary.disabled:hover,\n.btn-primary[disabled]:hover,\nfieldset[disabled] .btn-primary:hover,\n.btn-primary.disabled:focus,\n.btn-primary[disabled]:focus,\nfieldset[disabled] .btn-primary:focus,\n.btn-primary.disabled.focus,\n.btn-primary[disabled].focus,\nfieldset[disabled] .btn-primary.focus,\n.btn-primary.disabled:active,\n.btn-primary[disabled]:active,\nfieldset[disabled] .btn-primary:active,\n.btn-primary.disabled.active,\n.btn-primary[disabled].active,\nfieldset[disabled] .btn-primary.active {\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n.btn-primary .badge {\n  color: #337ab7;\n  background-color: #ffffff;\n}\n.btn-success {\n  color: #ffffff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success:hover,\n.btn-success:focus,\n.btn-success.focus,\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  color: #ffffff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  background-image: none;\n}\n.btn-success.disabled,\n.btn-success[disabled],\nfieldset[disabled] .btn-success,\n.btn-success.disabled:hover,\n.btn-success[disabled]:hover,\nfieldset[disabled] .btn-success:hover,\n.btn-success.disabled:focus,\n.btn-success[disabled]:focus,\nfieldset[disabled] .btn-success:focus,\n.btn-success.disabled.focus,\n.btn-success[disabled].focus,\nfieldset[disabled] .btn-success.focus,\n.btn-success.disabled:active,\n.btn-success[disabled]:active,\nfieldset[disabled] .btn-success:active,\n.btn-success.disabled.active,\n.btn-success[disabled].active,\nfieldset[disabled] .btn-success.active {\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success .badge {\n  color: #5cb85c;\n  background-color: #ffffff;\n}\n.btn-info {\n  color: #ffffff;\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info:hover,\n.btn-info:focus,\n.btn-info.focus,\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  color: #ffffff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  background-image: none;\n}\n.btn-info.disabled,\n.btn-info[disabled],\nfieldset[disabled] .btn-info,\n.btn-info.disabled:hover,\n.btn-info[disabled]:hover,\nfieldset[disabled] .btn-info:hover,\n.btn-info.disabled:focus,\n.btn-info[disabled]:focus,\nfieldset[disabled] .btn-info:focus,\n.btn-info.disabled.focus,\n.btn-info[disabled].focus,\nfieldset[disabled] .btn-info.focus,\n.btn-info.disabled:active,\n.btn-info[disabled]:active,\nfieldset[disabled] .btn-info:active,\n.btn-info.disabled.active,\n.btn-info[disabled].active,\nfieldset[disabled] .btn-info.active {\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info .badge {\n  color: #5bc0de;\n  background-color: #ffffff;\n}\n.btn-warning {\n  color: #ffffff;\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning:hover,\n.btn-warning:focus,\n.btn-warning.focus,\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  color: #ffffff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  background-image: none;\n}\n.btn-warning.disabled,\n.btn-warning[disabled],\nfieldset[disabled] .btn-warning,\n.btn-warning.disabled:hover,\n.btn-warning[disabled]:hover,\nfieldset[disabled] .btn-warning:hover,\n.btn-warning.disabled:focus,\n.btn-warning[disabled]:focus,\nfieldset[disabled] .btn-warning:focus,\n.btn-warning.disabled.focus,\n.btn-warning[disabled].focus,\nfieldset[disabled] .btn-warning.focus,\n.btn-warning.disabled:active,\n.btn-warning[disabled]:active,\nfieldset[disabled] .btn-warning:active,\n.btn-warning.disabled.active,\n.btn-warning[disabled].active,\nfieldset[disabled] .btn-warning.active {\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning .badge {\n  color: #f0ad4e;\n  background-color: #ffffff;\n}\n.btn-danger {\n  color: #ffffff;\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger:hover,\n.btn-danger:focus,\n.btn-danger.focus,\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  color: #ffffff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  background-image: none;\n}\n.btn-danger.disabled,\n.btn-danger[disabled],\nfieldset[disabled] .btn-danger,\n.btn-danger.disabled:hover,\n.btn-danger[disabled]:hover,\nfieldset[disabled] .btn-danger:hover,\n.btn-danger.disabled:focus,\n.btn-danger[disabled]:focus,\nfieldset[disabled] .btn-danger:focus,\n.btn-danger.disabled.focus,\n.btn-danger[disabled].focus,\nfieldset[disabled] .btn-danger.focus,\n.btn-danger.disabled:active,\n.btn-danger[disabled]:active,\nfieldset[disabled] .btn-danger:active,\n.btn-danger.disabled.active,\n.btn-danger[disabled].active,\nfieldset[disabled] .btn-danger.active {\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger .badge {\n  color: #d9534f;\n  background-color: #ffffff;\n}\n.btn-link {\n  color: #337ab7;\n  font-weight: normal;\n  border-radius: 0;\n}\n.btn-link,\n.btn-link:active,\n.btn-link.active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover,\n.btn-link:focus {\n  color: #23527c;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover,\nfieldset[disabled] .btn-link:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:focus {\n  color: #777777;\n  text-decoration: none;\n}\n.btn-lg,\n.btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.btn-sm,\n.btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-xs,\n.btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-block {\n  display: block;\n  width: 100%;\n}\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\ntr.collapse.in {\n  display: table-row;\n}\ntbody.collapse.in {\n  display: table-row-group;\n}\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-property: height, visibility;\n  -o-transition-property: height, visibility;\n     transition-property: height, visibility;\n  -webkit-transition-duration: 0.35s;\n  -o-transition-duration: 0.35s;\n     transition-duration: 0.35s;\n  -webkit-transition-timing-function: ease;\n  -o-transition-timing-function: ease;\n     transition-timing-function: ease;\n}\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n.dropup,\n.dropdown {\n  position: relative;\n}\n.dropdown-toggle:focus {\n  outline: 0;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  text-align: left;\n  background-color: #ffffff;\n  border: 1px solid #cccccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.42857143;\n  color: #333333;\n  white-space: nowrap;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #262626;\n  background-color: #f5f5f5;\n}\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #ffffff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #337ab7;\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #777777;\n}\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed;\n}\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.dropdown-menu-right {\n  left: auto;\n  right: 0;\n}\n.dropdown-menu-left {\n  left: 0;\n  right: auto;\n}\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857143;\n  color: #777777;\n  white-space: nowrap;\n}\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990;\n}\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px solid;\n  content: \"\";\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px;\n}\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    left: auto;\n    right: 0;\n  }\n  .navbar-right .dropdown-menu-left {\n    left: 0;\n    right: auto;\n  }\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group-vertical > .btn:focus,\n.btn-group > .btn:active,\n.btn-group-vertical > .btn:active,\n.btn-group > .btn.active,\n.btn-group-vertical > .btn.active {\n  z-index: 2;\n}\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n.btn-toolbar {\n  margin-left: -5px;\n}\n.btn-toolbar .btn-group,\n.btn-toolbar .input-group {\n  float: left;\n}\n.btn-toolbar > .btn,\n.btn-toolbar > .btn-group,\n.btn-toolbar > .input-group {\n  margin-left: 5px;\n}\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.btn-group > .btn-lg + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn-group.open .dropdown-toggle.btn-link {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn .caret {\n  margin-left: 0;\n}\n.btn-lg .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0;\n}\n.dropup .btn-lg .caret {\n  border-width: 0 5px 5px;\n}\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn-group > .btn {\n  float: none;\n}\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-bottom-left-radius: 4px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate;\n}\n.btn-group-justified > .btn,\n.btn-group-justified > .btn-group {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.btn-group-justified > .btn-group .btn {\n  width: 100%;\n}\n.btn-group-justified > .btn-group .dropdown-menu {\n  left: auto;\n}\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n.input-group[class*=\"col-\"] {\n  float: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n}\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-group-lg > .form-control,\nselect.input-group-lg > .input-group-addon,\nselect.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-group-lg > .form-control,\ntextarea.input-group-lg > .input-group-addon,\ntextarea.input-group-lg > .input-group-btn > .btn,\nselect[multiple].input-group-lg > .form-control,\nselect[multiple].input-group-lg > .input-group-addon,\nselect[multiple].input-group-lg > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-group-sm > .form-control,\nselect.input-group-sm > .input-group-addon,\nselect.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-group-sm > .form-control,\ntextarea.input-group-sm > .input-group-addon,\ntextarea.input-group-sm > .input-group-btn > .btn,\nselect[multiple].input-group-sm > .form-control,\nselect[multiple].input-group-sm > .input-group-addon,\nselect[multiple].input-group-sm > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\n.input-group-addon.input-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-lg {\n  padding: 10px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.input-group-addon:first-child {\n  border-right: 0;\n}\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n.input-group-btn > .btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn {\n  margin-left: -1px;\n}\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:focus,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group {\n  margin-right: -1px;\n}\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group {\n  margin-left: -1px;\n}\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n.nav > li.disabled > a {\n  color: #777777;\n}\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #777777;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n.nav .open > a,\n.nav .open > a:hover,\n.nav .open > a:focus {\n  background-color: #eeeeee;\n  border-color: #337ab7;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav > li > a > img {\n  max-width: none;\n}\n.nav-tabs {\n  border-bottom: 1px solid #dddddd;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.42857143;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n.nav-tabs > li > a:hover {\n  border-color: #eeeeee #eeeeee #dddddd;\n}\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  color: #555555;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-bottom-color: transparent;\n  cursor: default;\n}\n.nav-tabs.nav-justified {\n  width: 100%;\n  border-bottom: 0;\n}\n.nav-tabs.nav-justified > li {\n  float: none;\n}\n.nav-tabs.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n.nav-tabs.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-tabs.nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs.nav-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs.nav-justified > .active > a,\n.nav-tabs.nav-justified > .active > a:hover,\n.nav-tabs.nav-justified > .active > a:focus {\n  border: 1px solid #dddddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li > a {\n    border-bottom: 1px solid #dddddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs.nav-justified > .active > a,\n  .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs.nav-justified > .active > a:focus {\n    border-bottom-color: #ffffff;\n  }\n}\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 4px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #ffffff;\n  background-color: #337ab7;\n}\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li {\n  margin-top: 2px;\n  margin-left: 0;\n}\n.nav-justified {\n  width: 100%;\n}\n.nav-justified > li {\n  float: none;\n}\n.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs-justified > .active > a,\n.nav-tabs-justified > .active > a:hover,\n.nav-tabs-justified > .active > a:focus {\n  border: 1px solid #dddddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs-justified > li > a {\n    border-bottom: 1px solid #dddddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus {\n    border-bottom-color: #ffffff;\n  }\n}\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n}\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 4px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left;\n  }\n}\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 15px;\n  padding-left: 15px;\n  border-top: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  -webkit-overflow-scrolling: touch;\n}\n.navbar-collapse.in {\n  overflow-y: auto;\n}\n@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px;\n}\n@media (max-device-width: 480px) and (orientation: landscape) {\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    max-height: 200px;\n  }\n}\n.container > .navbar-header,\n.container-fluid > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container-fluid > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-collapse {\n    margin-right: 0;\n    margin-left: 0;\n  }\n}\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px;\n}\n@media (min-width: 768px) {\n  .navbar-static-top {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n@media (min-width: 768px) {\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px;\n}\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0;\n}\n.navbar-brand {\n  float: left;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n  height: 50px;\n}\n.navbar-brand:hover,\n.navbar-brand:focus {\n  text-decoration: none;\n}\n.navbar-brand > img {\n  display: block;\n}\n@media (min-width: 768px) {\n  .navbar > .container .navbar-brand,\n  .navbar > .container-fluid .navbar-brand {\n    margin-left: -15px;\n  }\n}\n.navbar-toggle {\n  position: relative;\n  float: right;\n  margin-right: 15px;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.navbar-toggle:focus {\n  outline: 0;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n@media (min-width: 768px) {\n  .navbar-toggle {\n    display: none;\n  }\n}\n.navbar-nav {\n  margin: 7.5px -15px;\n}\n.navbar-nav > li > a {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 20px;\n}\n@media (max-width: 767px) {\n  .navbar-nav .open .dropdown-menu {\n    position: static;\n    float: none;\n    width: auto;\n    margin-top: 0;\n    background-color: transparent;\n    border: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n  .navbar-nav .open .dropdown-menu > li > a,\n  .navbar-nav .open .dropdown-menu .dropdown-header {\n    padding: 5px 15px 5px 25px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a {\n    line-height: 20px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-nav .open .dropdown-menu > li > a:focus {\n    background-image: none;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-nav {\n    float: left;\n    margin: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    padding-top: 15px;\n    padding-bottom: 15px;\n  }\n}\n.navbar-form {\n  margin-left: -15px;\n  margin-right: -15px;\n  padding: 10px 15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n@media (min-width: 768px) {\n  .navbar-form .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control-static {\n    display: inline-block;\n  }\n  .navbar-form .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .navbar-form .input-group .input-group-addon,\n  .navbar-form .input-group .input-group-btn,\n  .navbar-form .input-group .form-control {\n    width: auto;\n  }\n  .navbar-form .input-group > .form-control {\n    width: 100%;\n  }\n  .navbar-form .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio,\n  .navbar-form .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio label,\n  .navbar-form .checkbox label {\n    padding-left: 0;\n  }\n  .navbar-form .radio input[type=\"radio\"],\n  .navbar-form .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .navbar-form .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n@media (max-width: 767px) {\n  .navbar-form .form-group {\n    margin-bottom: 5px;\n  }\n  .navbar-form .form-group:last-child {\n    margin-bottom: 0;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-form {\n    width: auto;\n    border: 0;\n    margin-left: 0;\n    margin-right: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n  }\n}\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n.navbar-btn.btn-sm {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.navbar-btn.btn-xs {\n  margin-top: 14px;\n  margin-bottom: 14px;\n}\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media (min-width: 768px) {\n  .navbar-text {\n    float: left;\n    margin-left: 15px;\n    margin-right: 15px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important;\n  }\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px;\n  }\n  .navbar-right ~ .navbar-right {\n    margin-right: 0;\n  }\n}\n.navbar-default {\n  background-color: #f8f8f8;\n  border-color: #e7e7e7;\n}\n.navbar-default .navbar-brand {\n  color: #777777;\n}\n.navbar-default .navbar-brand:hover,\n.navbar-default .navbar-brand:focus {\n  color: #5e5e5e;\n  background-color: transparent;\n}\n.navbar-default .navbar-text {\n  color: #777777;\n}\n.navbar-default .navbar-nav > li > a {\n  color: #777777;\n}\n.navbar-default .navbar-nav > li > a:hover,\n.navbar-default .navbar-nav > li > a:focus {\n  color: #333333;\n  background-color: transparent;\n}\n.navbar-default .navbar-nav > .active > a,\n.navbar-default .navbar-nav > .active > a:hover,\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #555555;\n  background-color: #e7e7e7;\n}\n.navbar-default .navbar-nav > .disabled > a,\n.navbar-default .navbar-nav > .disabled > a:hover,\n.navbar-default .navbar-nav > .disabled > a:focus {\n  color: #cccccc;\n  background-color: transparent;\n}\n.navbar-default .navbar-toggle {\n  border-color: #dddddd;\n}\n.navbar-default .navbar-toggle:hover,\n.navbar-default .navbar-toggle:focus {\n  background-color: #dddddd;\n}\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: #888888;\n}\n.navbar-default .navbar-collapse,\n.navbar-default .navbar-form {\n  border-color: #e7e7e7;\n}\n.navbar-default .navbar-nav > .open > a,\n.navbar-default .navbar-nav > .open > a:hover,\n.navbar-default .navbar-nav > .open > a:focus {\n  background-color: #e7e7e7;\n  color: #555555;\n}\n@media (max-width: 767px) {\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n    color: #777777;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #333333;\n    background-color: transparent;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #555555;\n    background-color: #e7e7e7;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #cccccc;\n    background-color: transparent;\n  }\n}\n.navbar-default .navbar-link {\n  color: #777777;\n}\n.navbar-default .navbar-link:hover {\n  color: #333333;\n}\n.navbar-default .btn-link {\n  color: #777777;\n}\n.navbar-default .btn-link:hover,\n.navbar-default .btn-link:focus {\n  color: #333333;\n}\n.navbar-default .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-default .btn-link:hover,\n.navbar-default .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-default .btn-link:focus {\n  color: #cccccc;\n}\n.navbar-inverse {\n  background-color: #222222;\n  border-color: #080808;\n}\n.navbar-inverse .navbar-brand {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #ffffff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #ffffff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #ffffff;\n  background-color: #080808;\n}\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444444;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #333333;\n}\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #333333;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #ffffff;\n}\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #101010;\n}\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  background-color: #080808;\n  color: #ffffff;\n}\n@media (max-width: 767px) {\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n    border-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n    color: #9d9d9d;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #ffffff;\n    background-color: transparent;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #ffffff;\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #444444;\n    background-color: transparent;\n  }\n}\n.navbar-inverse .navbar-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #ffffff;\n}\n.navbar-inverse .btn-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link:focus {\n  color: #ffffff;\n}\n.navbar-inverse .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-inverse .btn-link:focus {\n  color: #444444;\n}\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  content: \"/\\00a0\";\n  padding: 0 5px;\n  color: #cccccc;\n}\n.breadcrumb > .active {\n  color: #777777;\n}\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  line-height: 1.42857143;\n  text-decoration: none;\n  color: #337ab7;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  margin-left: -1px;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  margin-left: 0;\n  border-bottom-left-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-bottom-right-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.pagination > li > a:hover,\n.pagination > li > span:hover,\n.pagination > li > a:focus,\n.pagination > li > span:focus {\n  color: #23527c;\n  background-color: #eeeeee;\n  border-color: #dddddd;\n}\n.pagination > .active > a,\n.pagination > .active > span,\n.pagination > .active > a:hover,\n.pagination > .active > span:hover,\n.pagination > .active > a:focus,\n.pagination > .active > span:focus {\n  z-index: 2;\n  color: #ffffff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n  cursor: default;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > span:hover,\n.pagination > .disabled > span:focus,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #777777;\n  background-color: #ffffff;\n  border-color: #dddddd;\n  cursor: not-allowed;\n}\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n}\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px;\n}\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px;\n}\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n}\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #777777;\n  background-color: #ffffff;\n  cursor: not-allowed;\n}\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #ffffff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em;\n}\na.label:hover,\na.label:focus {\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.label:empty {\n  display: none;\n}\n.btn .label {\n  position: relative;\n  top: -1px;\n}\n.label-default {\n  background-color: #777777;\n}\n.label-default[href]:hover,\n.label-default[href]:focus {\n  background-color: #5e5e5e;\n}\n.label-primary {\n  background-color: #337ab7;\n}\n.label-primary[href]:hover,\n.label-primary[href]:focus {\n  background-color: #286090;\n}\n.label-success {\n  background-color: #5cb85c;\n}\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #449d44;\n}\n.label-info {\n  background-color: #5bc0de;\n}\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #31b0d5;\n}\n.label-warning {\n  background-color: #f0ad4e;\n}\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #ec971f;\n}\n.label-danger {\n  background-color: #d9534f;\n}\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #c9302c;\n}\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #ffffff;\n  line-height: 1;\n  vertical-align: baseline;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n.btn-xs .badge,\n.btn-group-xs > .btn .badge {\n  top: 0;\n  padding: 1px 5px;\n}\na.badge:hover,\na.badge:focus {\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #337ab7;\n  background-color: #ffffff;\n}\n.list-group-item > .badge {\n  float: right;\n}\n.list-group-item > .badge + .badge {\n  margin-right: 5px;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n.jumbotron {\n  padding: 30px 15px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eeeeee;\n}\n.jumbotron h1,\n.jumbotron .h1 {\n  color: inherit;\n}\n.jumbotron p {\n  margin-bottom: 15px;\n  font-size: 21px;\n  font-weight: 200;\n}\n.jumbotron > hr {\n  border-top-color: #d5d5d5;\n}\n.container .jumbotron,\n.container-fluid .jumbotron {\n  border-radius: 6px;\n}\n.jumbotron .container {\n  max-width: 100%;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding: 48px 0;\n  }\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    padding-left: 60px;\n    padding-right: 60px;\n  }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    font-size: 63px;\n  }\n}\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857143;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-radius: 4px;\n  -webkit-transition: border 0.2s ease-in-out;\n  -o-transition: border 0.2s ease-in-out;\n  transition: border 0.2s ease-in-out;\n}\n.thumbnail > img,\n.thumbnail a > img {\n  margin-left: auto;\n  margin-right: auto;\n}\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #337ab7;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #333333;\n}\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert .alert-link {\n  font-weight: bold;\n}\n.alert > p,\n.alert > ul {\n  margin-bottom: 0;\n}\n.alert > p + p {\n  margin-top: 5px;\n}\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px;\n}\n.alert-dismissable .close,\n.alert-dismissible .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #3c763d;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #2b542c;\n}\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #31708f;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #245269;\n}\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n  color: #8a6d3b;\n}\n.alert-warning hr {\n  border-top-color: #f7e1b5;\n}\n.alert-warning .alert-link {\n  color: #66512c;\n}\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebccd1;\n  color: #a94442;\n}\n.alert-danger hr {\n  border-top-color: #e4b9c0;\n}\n.alert-danger .alert-link {\n  color: #843534;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-o-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #ffffff;\n  text-align: center;\n  background-color: #337ab7;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  -webkit-background-size: 40px 40px;\n          background-size: 40px 40px;\n}\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n}\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n.progress-striped .progress-bar-success {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-info {\n  background-color: #5bc0de;\n}\n.progress-striped .progress-bar-info {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n.progress-striped .progress-bar-warning {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n.progress-striped .progress-bar-danger {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.media {\n  margin-top: 15px;\n}\n.media:first-child {\n  margin-top: 0;\n}\n.media,\n.media-body {\n  zoom: 1;\n  overflow: hidden;\n}\n.media-body {\n  width: 10000px;\n}\n.media-object {\n  display: block;\n}\n.media-right,\n.media > .pull-right {\n  padding-left: 10px;\n}\n.media-left,\n.media > .pull-left {\n  padding-right: 10px;\n}\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top;\n}\n.media-middle {\n  vertical-align: middle;\n}\n.media-bottom {\n  vertical-align: bottom;\n}\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0;\n}\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n}\n.list-group-item:first-child {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\na.list-group-item {\n  color: #555555;\n}\na.list-group-item .list-group-item-heading {\n  color: #333333;\n}\na.list-group-item:hover,\na.list-group-item:focus {\n  text-decoration: none;\n  color: #555555;\n  background-color: #f5f5f5;\n}\n.list-group-item.disabled,\n.list-group-item.disabled:hover,\n.list-group-item.disabled:focus {\n  background-color: #eeeeee;\n  color: #777777;\n  cursor: not-allowed;\n}\n.list-group-item.disabled .list-group-item-heading,\n.list-group-item.disabled:hover .list-group-item-heading,\n.list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit;\n}\n.list-group-item.disabled .list-group-item-text,\n.list-group-item.disabled:hover .list-group-item-text,\n.list-group-item.disabled:focus .list-group-item-text {\n  color: #777777;\n}\n.list-group-item.active,\n.list-group-item.active:hover,\n.list-group-item.active:focus {\n  z-index: 2;\n  color: #ffffff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small,\n.list-group-item.active:hover .list-group-item-heading > .small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit;\n}\n.list-group-item.active .list-group-item-text,\n.list-group-item.active:hover .list-group-item-text,\n.list-group-item.active:focus .list-group-item-text {\n  color: #c7ddef;\n}\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n}\na.list-group-item-success {\n  color: #3c763d;\n}\na.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-success:hover,\na.list-group-item-success:focus {\n  color: #3c763d;\n  background-color: #d0e9c6;\n}\na.list-group-item-success.active,\na.list-group-item-success.active:hover,\na.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d;\n}\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7;\n}\na.list-group-item-info {\n  color: #31708f;\n}\na.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-info:hover,\na.list-group-item-info:focus {\n  color: #31708f;\n  background-color: #c4e3f3;\n}\na.list-group-item-info.active,\na.list-group-item-info.active:hover,\na.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f;\n}\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n}\na.list-group-item-warning {\n  color: #8a6d3b;\n}\na.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-warning:hover,\na.list-group-item-warning:focus {\n  color: #8a6d3b;\n  background-color: #faf2cc;\n}\na.list-group-item-warning.active,\na.list-group-item-warning.active:hover,\na.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b;\n}\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede;\n}\na.list-group-item-danger {\n  color: #a94442;\n}\na.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-danger:hover,\na.list-group-item-danger:focus {\n  color: #a94442;\n  background-color: #ebcccc;\n}\na.list-group-item-danger.active,\na.list-group-item-danger.active:hover,\na.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442;\n}\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n.panel {\n  margin-bottom: 20px;\n  background-color: #ffffff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.panel-body {\n  padding: 15px;\n}\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit;\n}\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit;\n}\n.panel-title > a,\n.panel-title > small,\n.panel-title > .small,\n.panel-title > small > a,\n.panel-title > .small > a {\n  color: inherit;\n}\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #dddddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0;\n}\n.panel > .list-group .list-group-item,\n.panel > .panel-collapse > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0;\n}\n.panel > .list-group:first-child .list-group-item:first-child,\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .list-group:last-child .list-group-item:last-child,\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0;\n}\n.list-group + .panel-footer {\n  border-top-width: 0;\n}\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0;\n}\n.panel > .table caption,\n.panel > .table-responsive > .table caption,\n.panel > .panel-collapse > .table caption {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n  border-bottom-right-radius: 3px;\n}\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #dddddd;\n}\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0;\n}\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0;\n}\n.panel > .table-bordered > thead > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n.panel > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-bordered > thead > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n.panel > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-bordered > tfoot > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n  border-left: 0;\n}\n.panel > .table-bordered > thead > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n.panel > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-bordered > thead > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n.panel > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-bordered > tfoot > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n  border-right: 0;\n}\n.panel > .table-bordered > thead > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n.panel > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-bordered > thead > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n.panel > .table-bordered > tbody > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n  border-bottom: 0;\n}\n.panel > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-bordered > tfoot > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n  border-bottom: 0;\n}\n.panel > .table-responsive {\n  border: 0;\n  margin-bottom: 0;\n}\n.panel-group {\n  margin-bottom: 20px;\n}\n.panel-group .panel {\n  margin-bottom: 0;\n  border-radius: 4px;\n}\n.panel-group .panel + .panel {\n  margin-top: 5px;\n}\n.panel-group .panel-heading {\n  border-bottom: 0;\n}\n.panel-group .panel-heading + .panel-collapse > .panel-body,\n.panel-group .panel-heading + .panel-collapse > .list-group {\n  border-top: 1px solid #dddddd;\n}\n.panel-group .panel-footer {\n  border-top: 0;\n}\n.panel-group .panel-footer + .panel-collapse .panel-body {\n  border-bottom: 1px solid #dddddd;\n}\n.panel-default {\n  border-color: #dddddd;\n}\n.panel-default > .panel-heading {\n  color: #333333;\n  background-color: #f5f5f5;\n  border-color: #dddddd;\n}\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #dddddd;\n}\n.panel-default > .panel-heading .badge {\n  color: #f5f5f5;\n  background-color: #333333;\n}\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #dddddd;\n}\n.panel-primary {\n  border-color: #337ab7;\n}\n.panel-primary > .panel-heading {\n  color: #ffffff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #337ab7;\n}\n.panel-primary > .panel-heading .badge {\n  color: #337ab7;\n  background-color: #ffffff;\n}\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #337ab7;\n}\n.panel-success {\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #d6e9c6;\n}\n.panel-success > .panel-heading .badge {\n  color: #dff0d8;\n  background-color: #3c763d;\n}\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #d6e9c6;\n}\n.panel-info {\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #bce8f1;\n}\n.panel-info > .panel-heading .badge {\n  color: #d9edf7;\n  background-color: #31708f;\n}\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #bce8f1;\n}\n.panel-warning {\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #faebcc;\n}\n.panel-warning > .panel-heading .badge {\n  color: #fcf8e3;\n  background-color: #8a6d3b;\n}\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #faebcc;\n}\n.panel-danger {\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ebccd1;\n}\n.panel-danger > .panel-heading .badge {\n  color: #f2dede;\n  background-color: #a94442;\n}\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ebccd1;\n}\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden;\n}\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object,\n.embed-responsive video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  border: 0;\n}\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%;\n}\n.embed-responsive-4by3 {\n  padding-bottom: 75%;\n}\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.well-lg {\n  padding: 24px;\n  border-radius: 6px;\n}\n.well-sm {\n  padding: 9px;\n  border-radius: 3px;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000000;\n  text-shadow: 0 1px 0 #ffffff;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n}\n.close:hover,\n.close:focus {\n  color: #000000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n.modal-open {\n  overflow: hidden;\n}\n.modal {\n  display: none;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.modal.fade .modal-dialog {\n  -webkit-transform: translate(0, -25%);\n  -ms-transform: translate(0, -25%);\n  -o-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n.modal.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n  -ms-transform: translate(0, 0);\n  -o-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n.modal-content {\n  position: relative;\n  background-color: #ffffff;\n  border: 1px solid #999999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  outline: 0;\n}\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000000;\n}\n.modal-backdrop.fade {\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.modal-backdrop.in {\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n  min-height: 16.42857143px;\n}\n.modal-header .close {\n  margin-top: -2px;\n}\n.modal-title {\n  margin: 0;\n  line-height: 1.42857143;\n}\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer .btn + .btn {\n  margin-left: 5px;\n  margin-bottom: 0;\n}\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto;\n  }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  }\n  .modal-sm {\n    width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 1.4;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.tooltip.in {\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.tooltip.top {\n  margin-top: -3px;\n  padding: 5px 0;\n}\n.tooltip.right {\n  margin-left: 3px;\n  padding: 0 5px;\n}\n.tooltip.bottom {\n  margin-top: 3px;\n  padding: 5px 0;\n}\n.tooltip.left {\n  margin-left: -3px;\n  padding: 0 5px;\n}\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #ffffff;\n  text-align: center;\n  text-decoration: none;\n  background-color: #000000;\n  border-radius: 4px;\n}\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000000;\n}\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000000;\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000000;\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000000;\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000000;\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000000;\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000000;\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000000;\n}\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1.42857143;\n  text-align: left;\n  background-color: #ffffff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid #cccccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  white-space: normal;\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n.popover-content {\n  padding: 9px 14px;\n}\n.popover > .arrow,\n.popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.popover > .arrow {\n  border-width: 11px;\n}\n.popover > .arrow:after {\n  border-width: 10px;\n  content: \"\";\n}\n.popover.top > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px;\n}\n.popover.top > .arrow:after {\n  content: \" \";\n  bottom: 1px;\n  margin-left: -10px;\n  border-bottom-width: 0;\n  border-top-color: #ffffff;\n}\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.popover.right > .arrow:after {\n  content: \" \";\n  left: 1px;\n  bottom: -10px;\n  border-left-width: 0;\n  border-right-color: #ffffff;\n}\n.popover.bottom > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px;\n}\n.popover.bottom > .arrow:after {\n  content: \" \";\n  top: 1px;\n  margin-left: -10px;\n  border-top-width: 0;\n  border-bottom-color: #ffffff;\n}\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.popover.left > .arrow:after {\n  content: \" \";\n  right: 1px;\n  border-right-width: 0;\n  border-left-color: #ffffff;\n  bottom: -10px;\n}\n.carousel {\n  position: relative;\n}\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n.carousel-inner > .item {\n  display: none;\n  position: relative;\n  -webkit-transition: 0.6s ease-in-out left;\n  -o-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  line-height: 1;\n}\n@media all and (transform-3d), (-webkit-transform-3d) {\n  .carousel-inner > .item {\n    -webkit-transition: -webkit-transform 0.6s ease-in-out;\n    -o-transition: -o-transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-perspective: 1000;\n    perspective: 1000;\n  }\n  .carousel-inner > .item.next,\n  .carousel-inner > .item.active.right {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    left: 0;\n  }\n  .carousel-inner > .item.prev,\n  .carousel-inner > .item.active.left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    left: 0;\n  }\n  .carousel-inner > .item.next.left,\n  .carousel-inner > .item.prev.right,\n  .carousel-inner > .item.active {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    left: 0;\n  }\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #ffffff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-control.left {\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.0001)));\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n}\n.carousel-control.right {\n  left: auto;\n  right: 0;\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.0001)), to(rgba(0, 0, 0, 0.5)));\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n}\n.carousel-control:hover,\n.carousel-control:focus {\n  outline: 0;\n  color: #ffffff;\n  text-decoration: none;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-left,\n.carousel-control .glyphicon-chevron-right {\n  position: absolute;\n  top: 50%;\n  z-index: 5;\n  display: inline-block;\n}\n.carousel-control .icon-prev,\n.carousel-control .glyphicon-chevron-left {\n  left: 50%;\n  margin-left: -10px;\n}\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-right {\n  right: 50%;\n  margin-right: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  line-height: 1;\n  font-family: serif;\n}\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n.carousel-control .icon-next:before {\n  content: '\\203a';\n}\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  margin-left: -30%;\n  padding-left: 0;\n  list-style: none;\n  text-align: center;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  border: 1px solid #ffffff;\n  border-radius: 10px;\n  cursor: pointer;\n  background-color: #000 \\9;\n  background-color: rgba(0, 0, 0, 0);\n}\n.carousel-indicators .active {\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  background-color: #ffffff;\n}\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #ffffff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-caption .btn {\n  text-shadow: none;\n}\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    font-size: 30px;\n  }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -15px;\n  }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -15px;\n  }\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px;\n  }\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.clearfix:before,\n.clearfix:after,\n.dl-horizontal dd:before,\n.dl-horizontal dd:after,\n.container:before,\n.container:after,\n.container-fluid:before,\n.container-fluid:after,\n.row:before,\n.row:after,\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after,\n.btn-toolbar:before,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after,\n.nav:before,\n.nav:after,\n.navbar:before,\n.navbar:after,\n.navbar-header:before,\n.navbar-header:after,\n.navbar-collapse:before,\n.navbar-collapse:after,\n.pager:before,\n.pager:after,\n.panel-body:before,\n.panel-body:after,\n.modal-footer:before,\n.modal-footer:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after,\n.dl-horizontal dd:after,\n.container:after,\n.container-fluid:after,\n.row:after,\n.form-horizontal .form-group:after,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:after,\n.nav:after,\n.navbar:after,\n.navbar-header:after,\n.navbar-collapse:after,\n.pager:after,\n.panel-body:after,\n.modal-footer:after {\n  clear: both;\n}\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.pull-right {\n  float: right !important;\n}\n.pull-left {\n  float: left !important;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.hidden {\n  display: none !important;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n.visible-xs,\n.visible-sm,\n.visible-md,\n.visible-lg {\n  display: none !important;\n}\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n  table.visible-xs {\n    display: table;\n  }\n  tr.visible-xs {\n    display: table-row !important;\n  }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n  table.visible-sm {\n    display: table;\n  }\n  tr.visible-sm {\n    display: table-row !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n  table.visible-md {\n    display: table;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n  table.visible-lg {\n    display: table;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n  table.visible-print {\n    display: table;\n  }\n  tr.visible-print {\n    display: table-row !important;\n  }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n}\n.visible-print-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n.visible-print-inline {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n.visible-print-inline-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n", ""]);

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(34)();
  exports.push([module.id, "", ""]);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("express");

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("fs");

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("lodash");

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("path");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTNiZjJkNDQzZmY0YWJkZjE5M2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5kZWYuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYXNzZXJ0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmNvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC53a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC51aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY3R4LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnVuc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZm9yLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmFycmF5LW1ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5yZXBsYWNlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnRocm93cy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmFycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24tc3Ryb25nLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24tdG8tanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLXdlYWsuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm93bi1rZXlzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnN0cmluZy1wYWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXJlcGVhdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC50YXNrLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvbGliL2JhYmVsL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5mdy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5rZXlvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5wYXJ0aWFsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5jb3B5LXdpdGhpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5uYW1lLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWFwLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5zdGF0aWNzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZnJvbS1jb2RlLXBvaW50LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJhdy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3RhcnRzLXdpdGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LndlYWstc2V0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LnRvLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcucmVnZXhwLmVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLmF0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLmxwYWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucnBhZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvanMuYXJyYXkuc3RhdGljcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvd2ViLmltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvd2ViLnRpbWVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vcmVnZW5lcmF0b3IvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Mb2dpblBhZ2UvTG9naW5QYWdlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5sZXNzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xvZ2luUGFnZS9Mb2dpblBhZ2UubGVzcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztzQkN0Q08sRUFBZ0I7O29DQUNULEVBQVE7Ozs7Z0NBQ1AsRUFBSTs7OztrQ0FDRixFQUFNOzs7O3FDQUNILEVBQVM7Ozs7bUNBQ1gsRUFBTzs7OzswQ0FDVixF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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQUs7QUFDTCxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF1QixxQkFBcUI7QUFDNUMsT0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQUs7QUFDTDtBQUNBLEk7Ozs7OztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSCxJOzs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBSztBQUNMO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE9BQUs7QUFDTCw2Q0FBMkM7QUFDM0M7QUFDQSxPQUFLO0FBQ0wsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEk7Ozs7OztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0EsSTs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTs7Ozs7O0FDUEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7Ozs7OztBQy9CQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFPLE1BQU07QUFDYjtBQUNBLEk7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFxQix1Q0FBdUM7QUFDNUQ7QUFDQSxHQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQSwwQ0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUMsRTs7Ozs7O0FDekhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QSxXQUFTO0FBQ1QsU0FBTztBQUNQO0FBQ0EsT0FBSztBQUNMLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFPO0FBQ1AsT0FBSztBQUNMO0FBQ0EsR0FBQyxFOzs7Ozs7QUNwT0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBMEY7O0FBRTFGO0FBQ0EsdUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0EsR0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxnQkFBYyxZQUFZOztBQUUxQjtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBQyxFOzs7Ozs7QUNQRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUMsRTs7Ozs7O0FDUEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFDLEU7Ozs7OztBQ0xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFvRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUMsRTs7Ozs7O0FDbkJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFjO0FBQ2QsT0FBSztBQUNMLGdCQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVc7QUFDWDtBQUNBOztBQUVBLFdBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBVztBQUNYO0FBQ0E7O0FBRUEsV0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLGNBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBOEMsUUFBUTtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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LDZCQUE2QixHQUFHLGdCQUFnQixvQkFBb0IsZ0NBQWdDLEtBQUsseUJBQXlCLHFCQUFxQixLQUFLLHNCQUFzQixvQ0FBb0MsS0FBSywyQ0FBMkMscUNBQXFDLEtBQUssR0FBRyx3QkFBd0IsNkJBQTZCLEdBQUcsZ0JBQWdCLDBCQUEwQixnQ0FBZ0MsS0FBSyxHQUFHLHlCQUF5Qiw2QkFBNkIsR0FBRyxnQkFBZ0IsMkJBQTJCLGlDQUFpQyxLQUFLLEdBQUcsK0JBQStCLDZCQUE2QixHQUFHLGdCQUFnQixpQ0FBaUMsdUNBQXVDLEtBQUssR0FBRyxnQkFBZ0IsbUJBQW1CLCtCQUErQixLQUFLLEdBQUcsVTs7Ozs7O0FDRDVvako7QUFDQSxvQzs7Ozs7O0FDREEsc0M7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEsbUMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGEzYmYyZDQ0M2ZmNGFiZGYxOTNmXG4gKiovIiwiaW1wb3J0ICdiYWJlbC9wb2x5ZmlsbCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGRiIGZyb20gJy4vY29yZS9EYXRhYmFzZSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9BcHAnO1xuXG5jb25zdCBzZXJ2ZXIgPSBleHByZXNzKCk7XG5cbnNlcnZlci5zZXQoJ3BvcnQnLCAocHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwKSk7XG5zZXJ2ZXIudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUpKSk7XG5cbmNvbnN0IHRlbXBsYXRlRmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICd0ZW1wbGF0ZXMvaW5kZXguaHRtbCcpO1xuY29uc3QgdGVtcGxhdGUgPSBfLnRlbXBsYXRlKGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZUZpbGUsICd1dGY4JykpO1xuXG5zZXJ2ZXIuZ2V0KCcqJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgbGV0IHVyaSA9IHJlcS5wYXRoO1xuICAgIGxldCBub3RGb3VuZCA9IGZhbHNlO1xuICAgIGxldCBkYXRhID0ge1xuICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgfTtcbiAgICBsZXQgYXBwID0gPEFwcFxuICAgICAgcGF0aCA9IHsgcmVxLnBhdGggfVxuICAgICAgb25TZXRUaXRsZSA9IHsgKHRpdGxlKSA9PiB7IGRhdGEudGl0bGUgPSB0aXRsZTsgfSB9XG4gICAgICBvblBhZ2VOb3RGb3VuZCA9IHsgKCkgPT4geyBub3RGb3VuZCA9IHRydWU7IH19Lz47XG5cbiAgICBkYXRhLmJvZHkgPSBSZWFjdC5yZW5kZXJUb1N0cmluZyhhcHApO1xuICAgIGlmIChub3RGb3VuZCkge1xuICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGh0bWwgPSB0ZW1wbGF0ZShkYXRhKTtcbiAgICAgIHJlcy5zZW5kKGh0bWwpO1xuICAgIH1cbiAgfSBjYXRjaChlcnIpIHtcbiAgICBuZXh0KGVycik7XG4gIH1cbn0pO1xuXG5zZXJ2ZXIubGlzdGVuKHNlcnZlci5nZXQoJ3BvcnQnKSwgKCkgPT4ge1xuICBpZiAocHJvY2Vzcy5zZW5kKSB7XG4gICAgcHJvY2Vzcy5zZW5kKCdvbmxpbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JyArXG4gICAgICBzZXJ2ZXIuZ2V0KCdwb3J0JykpO1xuICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3NlcnZlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKClcclxuICAsIGNvcmUgICA9IHt9XHJcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxyXG4gICwgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eVxyXG4gICwgY2VpbCAgPSBNYXRoLmNlaWxcclxuICAsIGZsb29yID0gTWF0aC5mbG9vclxyXG4gICwgbWF4ICAgPSBNYXRoLm1heFxyXG4gICwgbWluICAgPSBNYXRoLm1pbjtcclxuLy8gVGhlIGVuZ2luZSB3b3JrcyBmaW5lIHdpdGggZGVzY3JpcHRvcnM/IFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHkuXHJcbnZhciBERVNDID0gISFmdW5jdGlvbigpe1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDI7IH19KS5hID09IDI7XHJcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxyXG59KCk7XHJcbnZhciBoaWRlID0gY3JlYXRlRGVmaW5lcigxKTtcclxuLy8gNy4xLjQgVG9JbnRlZ2VyXHJcbmZ1bmN0aW9uIHRvSW50ZWdlcihpdCl7XHJcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XHJcbn1cclxuZnVuY3Rpb24gZGVzYyhiaXRtYXAsIHZhbHVlKXtcclxuICByZXR1cm4ge1xyXG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxyXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxyXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxyXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gc2ltcGxlU2V0KG9iamVjdCwga2V5LCB2YWx1ZSl7XHJcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcclxuICByZXR1cm4gb2JqZWN0O1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZURlZmluZXIoYml0bWFwKXtcclxuICByZXR1cm4gREVTQyA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XHJcbiAgICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBkZXNjKGJpdG1hcCwgdmFsdWUpKTtcclxuICB9IDogc2ltcGxlU2V0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc09iamVjdChpdCl7XHJcbiAgcmV0dXJuIGl0ICE9PSBudWxsICYmICh0eXBlb2YgaXQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGl0ID09ICdmdW5jdGlvbicpO1xyXG59XHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oaXQpe1xyXG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJztcclxufVxyXG5mdW5jdGlvbiBhc3NlcnREZWZpbmVkKGl0KXtcclxuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xyXG4gIHJldHVybiBpdDtcclxufVxyXG5cclxudmFyICQgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5mdycpKHtcclxuICBnOiBnbG9iYWwsXHJcbiAgY29yZTogY29yZSxcclxuICBodG1sOiBnbG9iYWwuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG4gIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2NvcmUtanMtaXNvYmplY3RcclxuICBpc09iamVjdDogICBpc09iamVjdCxcclxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxyXG4gIGl0OiBmdW5jdGlvbihpdCl7XHJcbiAgICByZXR1cm4gaXQ7XHJcbiAgfSxcclxuICB0aGF0OiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuICAvLyA3LjEuNCBUb0ludGVnZXJcclxuICB0b0ludGVnZXI6IHRvSW50ZWdlcixcclxuICAvLyA3LjEuMTUgVG9MZW5ndGhcclxuICB0b0xlbmd0aDogZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcclxuICB9LFxyXG4gIHRvSW5kZXg6IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xyXG4gICAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xyXG4gICAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XHJcbiAgfSxcclxuICBoYXM6IGZ1bmN0aW9uKGl0LCBrZXkpe1xyXG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XHJcbiAgfSxcclxuICBjcmVhdGU6ICAgICBPYmplY3QuY3JlYXRlLFxyXG4gIGdldFByb3RvOiAgIE9iamVjdC5nZXRQcm90b3R5cGVPZixcclxuICBERVNDOiAgICAgICBERVNDLFxyXG4gIGRlc2M6ICAgICAgIGRlc2MsXHJcbiAgZ2V0RGVzYzogICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcclxuICBzZXREZXNjOiAgICBkZWZpbmVQcm9wZXJ0eSxcclxuICBzZXREZXNjczogICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcclxuICBnZXRLZXlzOiAgICBPYmplY3Qua2V5cyxcclxuICBnZXROYW1lczogICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcclxuICBnZXRTeW1ib2xzOiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxyXG4gIGFzc2VydERlZmluZWQ6IGFzc2VydERlZmluZWQsXHJcbiAgLy8gRHVtbXksIGZpeCBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZyBpbiBlczUgbW9kdWxlXHJcbiAgRVM1T2JqZWN0OiBPYmplY3QsXHJcbiAgdG9PYmplY3Q6IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiAkLkVTNU9iamVjdChhc3NlcnREZWZpbmVkKGl0KSk7XHJcbiAgfSxcclxuICBoaWRlOiBoaWRlLFxyXG4gIGRlZjogY3JlYXRlRGVmaW5lcigwKSxcclxuICBzZXQ6IGdsb2JhbC5TeW1ib2wgPyBzaW1wbGVTZXQgOiBoaWRlLFxyXG4gIG1peDogZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xyXG4gICAgZm9yKHZhciBrZXkgaW4gc3JjKWhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgfSxcclxuICBlYWNoOiBbXS5mb3JFYWNoXHJcbn0pO1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5pZih0eXBlb2YgX19lICE9ICd1bmRlZmluZWQnKV9fZSA9IGNvcmU7XHJcbmlmKHR5cGVvZiBfX2cgIT0gJ3VuZGVmaW5lZCcpX19nID0gZ2xvYmFsO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGdsb2JhbCAgICAgPSAkLmdcclxuICAsIGNvcmUgICAgICAgPSAkLmNvcmVcclxuICAsIGlzRnVuY3Rpb24gPSAkLmlzRnVuY3Rpb247XHJcbmZ1bmN0aW9uIGN0eChmbiwgdGhhdCl7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICB9O1xyXG59XHJcbmdsb2JhbC5jb3JlID0gY29yZTtcclxuLy8gdHlwZSBiaXRtYXBcclxuJGRlZi5GID0gMTsgIC8vIGZvcmNlZFxyXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXHJcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcclxuJGRlZi5QID0gODsgIC8vIHByb3RvXHJcbiRkZWYuQiA9IDE2OyAvLyBiaW5kXHJcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXHJcbmZ1bmN0aW9uICRkZWYodHlwZSwgbmFtZSwgc291cmNlKXtcclxuICB2YXIga2V5LCBvd24sIG91dCwgZXhwXHJcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xyXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xyXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSkucHJvdG90eXBlXHJcbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcclxuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xyXG4gIGZvcihrZXkgaW4gc291cmNlKXtcclxuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxyXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcclxuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXHJcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xyXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcclxuICAgIGlmKHR5cGUgJiAkZGVmLkIgJiYgb3duKWV4cCA9IGN0eChvdXQsIGdsb2JhbCk7XHJcbiAgICBlbHNlIGV4cCA9IHR5cGUgJiAkZGVmLlAgJiYgaXNGdW5jdGlvbihvdXQpID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XHJcbiAgICAvLyBleHRlbmQgZ2xvYmFsXHJcbiAgICBpZih0YXJnZXQgJiYgIW93bil7XHJcbiAgICAgIGlmKGlzR2xvYmFsKXRhcmdldFtrZXldID0gb3V0O1xyXG4gICAgICBlbHNlIGRlbGV0ZSB0YXJnZXRba2V5XSAmJiAkLmhpZGUodGFyZ2V0LCBrZXksIG91dCk7XHJcbiAgICB9XHJcbiAgICAvLyBleHBvcnRcclxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpJC5oaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSAkZGVmO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5kZWYuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xyXG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtc2cxLCBtc2cyKXtcclxuICBpZighY29uZGl0aW9uKXRocm93IFR5cGVFcnJvcihtc2cyID8gbXNnMSArIG1zZzIgOiBtc2cxKTtcclxufVxyXG5hc3NlcnQuZGVmID0gJC5hc3NlcnREZWZpbmVkO1xyXG5hc3NlcnQuZm4gPSBmdW5jdGlvbihpdCl7XHJcbiAgaWYoISQuaXNGdW5jdGlvbihpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcclxuICByZXR1cm4gaXQ7XHJcbn07XHJcbmFzc2VydC5vYmogPSBmdW5jdGlvbihpdCl7XHJcbiAgaWYoISQuaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcclxuICByZXR1cm4gaXQ7XHJcbn07XHJcbmFzc2VydC5pbnN0ID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcclxuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXRocm93IFR5cGVFcnJvcihuYW1lICsgXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpO1xyXG4gIHJldHVybiBpdDtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBhc3NlcnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmFzc2VydC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBUQUcgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxyXG4gICwgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcclxuZnVuY3Rpb24gY29mKGl0KXtcclxuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xyXG59XHJcbmNvZi5jbGFzc29mID0gZnVuY3Rpb24oaXQpe1xyXG4gIHZhciBPLCBUO1xyXG4gIHJldHVybiBpdCA9PSB1bmRlZmluZWQgPyBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiAnTnVsbCdcclxuICAgIDogdHlwZW9mIChUID0gKE8gPSBPYmplY3QoaXQpKVtUQUddKSA9PSAnc3RyaW5nJyA/IFQgOiBjb2YoTyk7XHJcbn07XHJcbmNvZi5zZXQgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcclxuICBpZihpdCAmJiAhJC5oYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpJC5oaWRlKGl0LCBUQUcsIHRhZyk7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gY29mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kJykuZ1xyXG4gICwgc3RvcmUgID0ge307XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XHJcbiAgICBnbG9iYWwuU3ltYm9sICYmIGdsb2JhbC5TeW1ib2xbbmFtZV0gfHwgcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ1N5bWJvbC4nICsgbmFtZSkpO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC53a3MuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciAkICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBjb2YgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxyXG4gICwgYXNzZXJ0T2JqZWN0ICAgICAgPSByZXF1aXJlKCcuLyQuYXNzZXJ0Jykub2JqXHJcbiAgLCBTWU1CT0xfSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxyXG4gICwgRkZfSVRFUkFUT1IgICAgICAgPSAnQEBpdGVyYXRvcidcclxuICAsIEl0ZXJhdG9ycyAgICAgICAgID0ge31cclxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XHJcbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXHJcbnNldEl0ZXJhdG9yKEl0ZXJhdG9yUHJvdG90eXBlLCAkLnRoYXQpO1xyXG5mdW5jdGlvbiBzZXRJdGVyYXRvcihPLCB2YWx1ZSl7XHJcbiAgJC5oaWRlKE8sIFNZTUJPTF9JVEVSQVRPUiwgdmFsdWUpO1xyXG4gIC8vIEFkZCBpdGVyYXRvciBmb3IgRkYgaXRlcmF0b3IgcHJvdG9jb2xcclxuICBpZihGRl9JVEVSQVRPUiBpbiBbXSkkLmhpZGUoTywgRkZfSVRFUkFUT1IsIHZhbHVlKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxyXG4gIEJVR0dZOiAna2V5cycgaW4gW10gJiYgISgnbmV4dCcgaW4gW10ua2V5cygpKSxcclxuICBJdGVyYXRvcnM6IEl0ZXJhdG9ycyxcclxuICBzdGVwOiBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XHJcbiAgICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcclxuICB9LFxyXG4gIGlzOiBmdW5jdGlvbihpdCl7XHJcbiAgICB2YXIgTyAgICAgID0gT2JqZWN0KGl0KVxyXG4gICAgICAsIFN5bWJvbCA9ICQuZy5TeW1ib2xcclxuICAgICAgLCBTWU0gICAgPSBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SO1xyXG4gICAgcmV0dXJuIFNZTSBpbiBPIHx8IFNZTUJPTF9JVEVSQVRPUiBpbiBPIHx8ICQuaGFzKEl0ZXJhdG9ycywgY29mLmNsYXNzb2YoTykpO1xyXG4gIH0sXHJcbiAgZ2V0OiBmdW5jdGlvbihpdCl7XHJcbiAgICB2YXIgU3ltYm9sICA9ICQuZy5TeW1ib2xcclxuICAgICAgLCBleHQgICAgID0gaXRbU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvciB8fCBGRl9JVEVSQVRPUl1cclxuICAgICAgLCBnZXRJdGVyID0gZXh0IHx8IGl0W1NZTUJPTF9JVEVSQVRPUl0gfHwgSXRlcmF0b3JzW2NvZi5jbGFzc29mKGl0KV07XHJcbiAgICByZXR1cm4gYXNzZXJ0T2JqZWN0KGdldEl0ZXIuY2FsbChpdCkpO1xyXG4gIH0sXHJcbiAgc2V0OiBzZXRJdGVyYXRvcixcclxuICBjcmVhdGU6IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0LCBwcm90byl7XHJcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShwcm90byB8fCBJdGVyYXRvclByb3RvdHlwZSwge25leHQ6ICQuZGVzYygxLCBuZXh0KX0pO1xyXG4gICAgY29mLnNldChDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcclxuICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLml0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2lkID0gMDtcclxuZnVuY3Rpb24gdWlkKGtleSl7XHJcbiAgcmV0dXJuICdTeW1ib2woJyArIGtleSArICcpXycgKyAoKytzaWQgKyBNYXRoLnJhbmRvbSgpKS50b1N0cmluZygzNik7XHJcbn1cclxudWlkLnNhZmUgPSByZXF1aXJlKCcuLyQnKS5nLlN5bWJvbCB8fCB1aWQ7XHJcbm1vZHVsZS5leHBvcnRzID0gdWlkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC51aWQuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBPcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcclxudmFyIGFzc2VydEZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLmZuO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xyXG4gIGFzc2VydEZ1bmN0aW9uKGZuKTtcclxuICBpZih+bGVuZ3RoICYmIHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XHJcbiAgc3dpdGNoKGxlbmd0aCl7XHJcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcclxuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XHJcbiAgICB9O1xyXG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xyXG4gICAgfTtcclxuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xyXG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcclxuICAgIH07XHJcbiAgfSByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XHJcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY3R4LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxyXG52YXIgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3Vuc2NvcGFibGVzJyk7XHJcbmlmKCQuRlcgJiYgIShVTlNDT1BBQkxFUyBpbiBbXSkpJC5oaWRlKEFycmF5LnByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHt9KTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xyXG4gIGlmKCQuRlcpW11bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC51bnNjb3BlLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGN0eCAgPSByZXF1aXJlKCcuLyQuY3R4JylcclxuICAsIGdldCAgPSByZXF1aXJlKCcuLyQuaXRlcicpLmdldFxyXG4gICwgY2FsbCA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xyXG4gIHZhciBpdGVyYXRvciA9IGdldChpdGVyYWJsZSlcclxuICAgICwgZiAgICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcclxuICAgICwgc3RlcDtcclxuICB3aGlsZSghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpe1xyXG4gICAgaWYoY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcykgPT09IGZhbHNlKXtcclxuICAgICAgcmV0dXJuIGNhbGwuY2xvc2UoaXRlcmF0b3IpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZm9yLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxyXG4vLyAxIC0+IEFycmF5I21hcFxyXG4vLyAyIC0+IEFycmF5I2ZpbHRlclxyXG4vLyAzIC0+IEFycmF5I3NvbWVcclxuLy8gNCAtPiBBcnJheSNldmVyeVxyXG4vLyA1IC0+IEFycmF5I2ZpbmRcclxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcclxudmFyICQgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBjdHggPSByZXF1aXJlKCcuLyQuY3R4Jyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSl7XHJcbiAgdmFyIElTX01BUCAgICAgICAgPSBUWVBFID09IDFcclxuICAgICwgSVNfRklMVEVSICAgICA9IFRZUEUgPT0gMlxyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXHJcbiAgICAsIElTX0VWRVJZICAgICAgPSBUWVBFID09IDRcclxuICAgICwgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNlxyXG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcclxuICAgIHZhciBPICAgICAgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKCR0aGlzKSlcclxuICAgICAgLCBzZWxmICAgPSAkLkVTNU9iamVjdChPKVxyXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxyXG4gICAgICAsIGxlbmd0aCA9ICQudG9MZW5ndGgoc2VsZi5sZW5ndGgpXHJcbiAgICAgICwgaW5kZXggID0gMFxyXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IEFycmF5KGxlbmd0aCkgOiBJU19GSUxURVIgPyBbXSA6IHVuZGVmaW5lZFxyXG4gICAgICAsIHZhbCwgcmVzO1xyXG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcclxuICAgICAgdmFsID0gc2VsZltpbmRleF07XHJcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XHJcbiAgICAgIGlmKFRZUEUpe1xyXG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxyXG4gICAgICAgIGVsc2UgaWYocmVzKXN3aXRjaChUWVBFKXtcclxuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXHJcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxyXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxyXG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XHJcbiAgfTtcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktbWV0aG9kcy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciAkICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgQlVHR1kgPSByZXF1aXJlKCcuLyQuaXRlcicpLkJVR0dZXHJcbiAgLCBmb3JPZiA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxyXG4gICwgc3BlY2llcyA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcclxuICAsIGFzc2VydEluc3RhbmNlID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLmluc3Q7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIG1ldGhvZHMsIGNvbW1vbiwgSVNfTUFQLCBJU19XRUFLKXtcclxuICB2YXIgQmFzZSAgPSAkLmdbTkFNRV1cclxuICAgICwgQyAgICAgPSBCYXNlXHJcbiAgICAsIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJ1xyXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcclxuICAgICwgTyAgICAgPSB7fTtcclxuICBmdW5jdGlvbiBmaXhNZXRob2QoS0VZLCBDSEFJTil7XHJcbiAgICB2YXIgbWV0aG9kID0gcHJvdG9bS0VZXTtcclxuICAgIGlmKCQuRlcpcHJvdG9bS0VZXSA9IGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICB2YXIgcmVzdWx0ID0gbWV0aG9kLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhLCBiKTtcclxuICAgICAgcmV0dXJuIENIQUlOID8gdGhpcyA6IHJlc3VsdDtcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmKCEkLmlzRnVuY3Rpb24oQykgfHwgIShJU19XRUFLIHx8ICFCVUdHWSAmJiBwcm90by5mb3JFYWNoICYmIHByb3RvLmVudHJpZXMpKXtcclxuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXHJcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKE5BTUUsIElTX01BUCwgQURERVIpO1xyXG4gICAgJC5taXgoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgaW5zdCAgPSBuZXcgQ1xyXG4gICAgICAsIGNoYWluID0gaW5zdFtBRERFUl0oSVNfV0VBSyA/IHt9IDogLTAsIDEpXHJcbiAgICAgICwgYnVnZ3laZXJvO1xyXG4gICAgLy8gd3JhcCBmb3IgaW5pdCBjb2xsZWN0aW9ucyBmcm9tIGl0ZXJhYmxlXHJcbiAgICBpZighcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IG5ldyBDKGl0ZXIpOyB9KSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XHJcbiAgICAgIEMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFzc2VydEluc3RhbmNlKHRoaXMsIEMsIE5BTUUpO1xyXG4gICAgICAgIHZhciB0aGF0ICAgICA9IG5ldyBCYXNlXHJcbiAgICAgICAgICAsIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgIH07XHJcbiAgICAgIEMucHJvdG90eXBlID0gcHJvdG87XHJcbiAgICAgIGlmKCQuRlcpcHJvdG8uY29uc3RydWN0b3IgPSBDO1xyXG4gICAgfVxyXG4gICAgSVNfV0VBSyB8fCBpbnN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXkpe1xyXG4gICAgICBidWdneVplcm8gPSAxIC8ga2V5ID09PSAtSW5maW5pdHk7XHJcbiAgICB9KTtcclxuICAgIC8vIGZpeCBjb252ZXJ0aW5nIC0wIGtleSB0byArMFxyXG4gICAgaWYoYnVnZ3laZXJvKXtcclxuICAgICAgZml4TWV0aG9kKCdkZWxldGUnKTtcclxuICAgICAgZml4TWV0aG9kKCdoYXMnKTtcclxuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XHJcbiAgICB9XHJcbiAgICAvLyArIGZpeCAuYWRkICYgLnNldCBmb3IgY2hhaW5pbmdcclxuICAgIGlmKGJ1Z2d5WmVybyB8fCBjaGFpbiAhPT0gaW5zdClmaXhNZXRob2QoQURERVIsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcmVxdWlyZSgnLi8kLmNvZicpLnNldChDLCBOQU1FKTtcclxuXHJcbiAgT1tOQU1FXSA9IEM7XHJcbiAgJGRlZigkZGVmLkcgKyAkZGVmLlcgKyAkZGVmLkYgKiAoQyAhPSBCYXNlKSwgTyk7XHJcbiAgc3BlY2llcyhDKTtcclxuICBzcGVjaWVzKCQuY29yZVtOQU1FXSk7IC8vIGZvciB3cmFwcGVyXHJcblxyXG4gIGlmKCFJU19XRUFLKWNvbW1vbi5zZXRJdGVyKEMsIE5BTUUsIElTX01BUCk7XHJcblxyXG4gIHJldHVybiBDO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIEZhc3QgYXBwbHlcclxuLy8gaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xyXG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcclxuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xyXG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XHJcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XHJcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XHJcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XHJcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XHJcbiAgICBjYXNlIDU6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSk7XHJcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pbnZva2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEMpe1xyXG4gIGlmKCQuREVTQyAmJiAhKFNQRUNJRVMgaW4gQykpJC5zZXREZXNjKEMsIFNQRUNJRVMsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldDogJC50aGF0XHJcbiAgfSk7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnNwZWNpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgJCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGNvZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxyXG4gICwgJGl0ZXIgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKVxyXG4gICwgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXHJcbiAgLCBGRl9JVEVSQVRPUiAgICAgPSAnQEBpdGVyYXRvcidcclxuICAsIEtFWVMgICAgICAgICAgICA9ICdrZXlzJ1xyXG4gICwgVkFMVUVTICAgICAgICAgID0gJ3ZhbHVlcydcclxuICAsIEl0ZXJhdG9ycyAgICAgICA9ICRpdGVyLkl0ZXJhdG9ycztcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRSl7XHJcbiAgJGl0ZXIuY3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcclxuICBmdW5jdGlvbiBjcmVhdGVNZXRob2Qoa2luZCl7XHJcbiAgICBmdW5jdGlvbiAkJCh0aGF0KXtcclxuICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGF0LCBraW5kKTtcclxuICAgIH1cclxuICAgIHN3aXRjaChraW5kKXtcclxuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gJCQodGhpcyk7IH07XHJcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkJCh0aGlzKTsgfTtcclxuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuICQkKHRoaXMpOyB9O1xyXG4gIH1cclxuICB2YXIgVEFHICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcclxuICAgICwgcHJvdG8gICAgPSBCYXNlLnByb3RvdHlwZVxyXG4gICAgLCBfbmF0aXZlICA9IHByb3RvW1NZTUJPTF9JVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cclxuICAgICwgX2RlZmF1bHQgPSBfbmF0aXZlIHx8IGNyZWF0ZU1ldGhvZChERUZBVUxUKVxyXG4gICAgLCBtZXRob2RzLCBrZXk7XHJcbiAgLy8gRml4IG5hdGl2ZVxyXG4gIGlmKF9uYXRpdmUpe1xyXG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gJC5nZXRQcm90byhfZGVmYXVsdC5jYWxsKG5ldyBCYXNlKSk7XHJcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXHJcbiAgICBjb2Yuc2V0KEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xyXG4gICAgLy8gRkYgZml4XHJcbiAgICBpZigkLkZXICYmICQuaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpJGl0ZXIuc2V0KEl0ZXJhdG9yUHJvdG90eXBlLCAkLnRoYXQpO1xyXG4gIH1cclxuICAvLyBEZWZpbmUgaXRlcmF0b3JcclxuICBpZigkLkZXKSRpdGVyLnNldChwcm90bywgX2RlZmF1bHQpO1xyXG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcclxuICBJdGVyYXRvcnNbTkFNRV0gPSBfZGVmYXVsdDtcclxuICBJdGVyYXRvcnNbVEFHXSAgPSAkLnRoYXQ7XHJcbiAgaWYoREVGQVVMVCl7XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxyXG4gICAgICB2YWx1ZXM6ICBERUZBVUxUID09IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKFZBTFVFUyksXHJcbiAgICAgIGVudHJpZXM6IERFRkFVTFQgIT0gVkFMVUVTID8gX2RlZmF1bHQgOiBjcmVhdGVNZXRob2QoJ2VudHJpZXMnKVxyXG4gICAgfTtcclxuICAgIGlmKEZPUkNFKWZvcihrZXkgaW4gbWV0aG9kcyl7XHJcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSkkLmhpZGUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcclxuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqICRpdGVyLkJVR0dZLCBOQU1FLCBtZXRob2RzKTtcclxuICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcclxuICAsIFNBRkVfQ0xPU0lORyAgICA9IGZhbHNlO1xyXG50cnkge1xyXG4gIHZhciByaXRlciA9IFs3XVtTWU1CT0xfSVRFUkFUT1JdKCk7XHJcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcclxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcclxufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xyXG4gIGlmKCFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xyXG4gIHZhciBzYWZlID0gZmFsc2U7XHJcbiAgdHJ5IHtcclxuICAgIHZhciBhcnIgID0gWzddXHJcbiAgICAgICwgaXRlciA9IGFycltTWU1CT0xfSVRFUkFUT1JdKCk7XHJcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyBzYWZlID0gdHJ1ZTsgfTtcclxuICAgIGFycltTWU1CT0xfSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XHJcbiAgICBleGVjKGFycik7XHJcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxyXG4gIHJldHVybiBzYWZlO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRldGVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmVnRXhwLCByZXBsYWNlLCBpc1N0YXRpYyl7XHJcbiAgdmFyIHJlcGxhY2VyID0gcmVwbGFjZSA9PT0gT2JqZWN0KHJlcGxhY2UpID8gZnVuY3Rpb24ocGFydCl7XHJcbiAgICByZXR1cm4gcmVwbGFjZVtwYXJ0XTtcclxuICB9IDogcmVwbGFjZTtcclxuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIFN0cmluZyhpc1N0YXRpYyA/IGl0IDogdGhpcykucmVwbGFjZShyZWdFeHAsIHJlcGxhY2VyKTtcclxuICB9O1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5yZXBsYWNlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cclxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cclxudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBhc3NlcnQgPSByZXF1aXJlKCcuLyQuYXNzZXJ0Jyk7XHJcbmZ1bmN0aW9uIGNoZWNrKE8sIHByb3RvKXtcclxuICBhc3NlcnQub2JqKE8pO1xyXG4gIGFzc2VydChwcm90byA9PT0gbnVsbCB8fCAkLmlzT2JqZWN0KHByb3RvKSwgcHJvdG8sIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgPyBmdW5jdGlvbihidWdneSwgc2V0KXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi8kLmN0eCcpKEZ1bmN0aW9uLmNhbGwsICQuZ2V0RGVzYyhPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcclxuICAgICAgICAgIHNldCh7fSwgW10pO1xyXG4gICAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XHJcbiAgICAgICAgICBjaGVjayhPLCBwcm90byk7XHJcbiAgICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xyXG4gICAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xyXG4gICAgICAgICAgcmV0dXJuIE87XHJcbiAgICAgICAgfTtcclxuICAgICAgfSgpXHJcbiAgICA6IHVuZGVmaW5lZCksXHJcbiAgY2hlY2s6IGNoZWNrXHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnNldC1wcm90by5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyB0cnVlICAtPiBTdHJpbmcjYXRcclxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XHJcbnZhciAkID0gcmVxdWlyZSgnLi8kJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcclxuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcclxuICAgIHZhciBzID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGF0KSlcclxuICAgICAgLCBpID0gJC50b0ludGVnZXIocG9zKVxyXG4gICAgICAsIGwgPSBzLmxlbmd0aFxyXG4gICAgICAsIGEsIGI7XHJcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xyXG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcclxuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGxcclxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXHJcbiAgICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcclxuICAgICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcclxuICB9O1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctYXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcclxuICB0cnkge1xyXG4gICAgZXhlYygpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gY2F0Y2goZSl7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnRocm93cy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXHJcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXHJcbnZhciAkID0gcmVxdWlyZSgnLi8kJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xyXG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XHJcbiAgICB2YXIgTyAgICAgID0gJC50b09iamVjdCgkdGhpcylcclxuICAgICAgLCBsZW5ndGggPSAkLnRvTGVuZ3RoKE8ubGVuZ3RoKVxyXG4gICAgICAsIGluZGV4ICA9ICQudG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcclxuICAgICAgLCB2YWx1ZTtcclxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcclxuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xyXG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xyXG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xyXG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xyXG4gIH07XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmFycmF5LWluY2x1ZGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXHJcbiAgLCBzYWZlICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlXHJcbiAgLCBhc3NlcnQgICA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKVxyXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcclxuICAsIHN0ZXAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKS5zdGVwXHJcbiAgLCBoYXMgICAgICA9ICQuaGFzXHJcbiAgLCBzZXQgICAgICA9ICQuc2V0XHJcbiAgLCBpc09iamVjdCA9ICQuaXNPYmplY3RcclxuICAsIGhpZGUgICAgID0gJC5oaWRlXHJcbiAgLCBpc0Zyb3plbiA9IE9iamVjdC5pc0Zyb3plbiB8fCAkLmNvcmUuT2JqZWN0LmlzRnJvemVuXHJcbiAgLCBJRCAgICAgICA9IHNhZmUoJ2lkJylcclxuICAsIE8xICAgICAgID0gc2FmZSgnTzEnKVxyXG4gICwgTEFTVCAgICAgPSBzYWZlKCdsYXN0JylcclxuICAsIEZJUlNUICAgID0gc2FmZSgnZmlyc3QnKVxyXG4gICwgSVRFUiAgICAgPSBzYWZlKCdpdGVyJylcclxuICAsIFNJWkUgICAgID0gJC5ERVNDID8gc2FmZSgnc2l6ZScpIDogJ3NpemUnXHJcbiAgLCBpZCAgICAgICA9IDA7XHJcblxyXG5mdW5jdGlvbiBmYXN0S2V5KGl0LCBjcmVhdGUpe1xyXG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcclxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xyXG4gIC8vIGNhbid0IHNldCBpZCB0byBmcm96ZW4gb2JqZWN0XHJcbiAgaWYoaXNGcm96ZW4oaXQpKXJldHVybiAnRic7XHJcbiAgaWYoIWhhcyhpdCwgSUQpKXtcclxuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIGlkXHJcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XHJcbiAgICAvLyBhZGQgbWlzc2luZyBvYmplY3QgaWRcclxuICAgIGhpZGUoaXQsIElELCArK2lkKTtcclxuICAvLyByZXR1cm4gb2JqZWN0IGlkIHdpdGggcHJlZml4XHJcbiAgfSByZXR1cm4gJ08nICsgaXRbSURdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFbnRyeSh0aGF0LCBrZXkpe1xyXG4gIC8vIGZhc3QgY2FzZVxyXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XHJcbiAgaWYoaW5kZXggIT0gJ0YnKXJldHVybiB0aGF0W08xXVtpbmRleF07XHJcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXHJcbiAgZm9yKGVudHJ5ID0gdGhhdFtGSVJTVF07IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xyXG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKE5BTUUsIElTX01BUCwgQURERVIpe1xyXG4gICAgZnVuY3Rpb24gQygpe1xyXG4gICAgICB2YXIgdGhhdCAgICAgPSBhc3NlcnQuaW5zdCh0aGlzLCBDLCBOQU1FKVxyXG4gICAgICAgICwgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgIHNldCh0aGF0LCBPMSwgJC5jcmVhdGUobnVsbCkpO1xyXG4gICAgICBzZXQodGhhdCwgU0laRSwgMCk7XHJcbiAgICAgIHNldCh0aGF0LCBMQVNULCB1bmRlZmluZWQpO1xyXG4gICAgICBzZXQodGhhdCwgRklSU1QsIHVuZGVmaW5lZCk7XHJcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XHJcbiAgICB9XHJcbiAgICAkLm1peChDLnByb3RvdHlwZSwge1xyXG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcclxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXHJcbiAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpe1xyXG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0W08xXSwgZW50cnkgPSB0aGF0W0ZJUlNUXTsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XHJcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcclxuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0W0ZJUlNUXSA9IHRoYXRbTEFTVF0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIDIzLjEuMy4zIE1hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcclxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXHJcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHZhciB0aGF0ICA9IHRoaXNcclxuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xyXG4gICAgICAgIGlmKGVudHJ5KXtcclxuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkublxyXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xyXG4gICAgICAgICAgZGVsZXRlIHRoYXRbTzFdW2VudHJ5LmldO1xyXG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XHJcbiAgICAgICAgICBpZihwcmV2KXByZXYubiA9IG5leHQ7XHJcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XHJcbiAgICAgICAgICBpZih0aGF0W0ZJUlNUXSA9PSBlbnRyeSl0aGF0W0ZJUlNUXSA9IG5leHQ7XHJcbiAgICAgICAgICBpZih0aGF0W0xBU1RdID09IGVudHJ5KXRoYXRbTEFTVF0gPSBwcmV2O1xyXG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xyXG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxyXG4gICAgICAvLyAyMy4xLjMuNSBNYXAucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcclxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcclxuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0sIDMpXHJcbiAgICAgICAgICAsIGVudHJ5O1xyXG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpc1tGSVJTVF0pe1xyXG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcclxuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxyXG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXHJcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxyXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xyXG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYoJC5ERVNDKSQuc2V0RGVzYyhDLnByb3RvdHlwZSwgJ3NpemUnLCB7XHJcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gYXNzZXJ0LmRlZih0aGlzW1NJWkVdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQztcclxuICB9LFxyXG4gIGRlZjogZnVuY3Rpb24odGhhdCwga2V5LCB2YWx1ZSl7XHJcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXHJcbiAgICAgICwgcHJldiwgaW5kZXg7XHJcbiAgICAvLyBjaGFuZ2UgZXhpc3RpbmcgZW50cnlcclxuICAgIGlmKGVudHJ5KXtcclxuICAgICAgZW50cnkudiA9IHZhbHVlO1xyXG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhhdFtMQVNUXSA9IGVudHJ5ID0ge1xyXG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxyXG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcclxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcclxuICAgICAgICBwOiBwcmV2ID0gdGhhdFtMQVNUXSwgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcclxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxyXG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXHJcbiAgICAgIH07XHJcbiAgICAgIGlmKCF0aGF0W0ZJUlNUXSl0aGF0W0ZJUlNUXSA9IGVudHJ5O1xyXG4gICAgICBpZihwcmV2KXByZXYubiA9IGVudHJ5O1xyXG4gICAgICB0aGF0W1NJWkVdKys7XHJcbiAgICAgIC8vIGFkZCB0byBpbmRleFxyXG4gICAgICBpZihpbmRleCAhPSAnRicpdGhhdFtPMV1baW5kZXhdID0gZW50cnk7XHJcbiAgICB9IHJldHVybiB0aGF0O1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxyXG4gIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxyXG4gIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcclxuICBzZXRJdGVyOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xyXG4gICAgcmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xyXG4gICAgICBzZXQodGhpcywgSVRFUiwge286IGl0ZXJhdGVkLCBrOiBraW5kfSk7XHJcbiAgICB9LCBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgaXRlciAgPSB0aGlzW0lURVJdXHJcbiAgICAgICAgLCBraW5kICA9IGl0ZXIua1xyXG4gICAgICAgICwgZW50cnkgPSBpdGVyLmw7XHJcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxyXG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcclxuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcclxuICAgICAgaWYoIWl0ZXIubyB8fCAhKGl0ZXIubCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogaXRlci5vW0ZJUlNUXSkpe1xyXG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXHJcbiAgICAgICAgaXRlci5vID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcclxuICAgICAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcclxuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcclxuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcclxuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnICwgIUlTX01BUCwgdHJ1ZSk7XHJcbiAgfVxyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLXN0cm9uZy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXHJcbnZhciAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgZm9yT2YgPSByZXF1aXJlKCcuLyQuZm9yLW9mJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XHJcbiAgJGRlZigkZGVmLlAsIE5BTUUsIHtcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCl7XHJcbiAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgZm9yT2YodGhpcywgZmFsc2UsIGFyci5wdXNoLCBhcnIpO1xyXG4gICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLXRvLWpzb24uanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJCAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIHNhZmUgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlXHJcbiAgLCBhc3NlcnQgICAgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JylcclxuICAsIGZvck9mICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxyXG4gICwgX2hhcyAgICAgID0gJC5oYXNcclxuICAsIGlzT2JqZWN0ICA9ICQuaXNPYmplY3RcclxuICAsIGhpZGUgICAgICA9ICQuaGlkZVxyXG4gICwgaXNGcm96ZW4gID0gT2JqZWN0LmlzRnJvemVuIHx8ICQuY29yZS5PYmplY3QuaXNGcm96ZW5cclxuICAsIGlkICAgICAgICA9IDBcclxuICAsIElEICAgICAgICA9IHNhZmUoJ2lkJylcclxuICAsIFdFQUsgICAgICA9IHNhZmUoJ3dlYWsnKVxyXG4gICwgTEVBSyAgICAgID0gc2FmZSgnbGVhaycpXHJcbiAgLCBtZXRob2QgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXHJcbiAgLCBmaW5kICAgICAgPSBtZXRob2QoNSlcclxuICAsIGZpbmRJbmRleCA9IG1ldGhvZCg2KTtcclxuZnVuY3Rpb24gZmluZEZyb3plbihzdG9yZSwga2V5KXtcclxuICByZXR1cm4gZmluZChzdG9yZS5hcnJheSwgZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XHJcbiAgfSk7XHJcbn1cclxuLy8gZmFsbGJhY2sgZm9yIGZyb3plbiBrZXlzXHJcbmZ1bmN0aW9uIGxlYWtTdG9yZSh0aGF0KXtcclxuICByZXR1cm4gdGhhdFtMRUFLXSB8fCBoaWRlKHRoYXQsIExFQUssIHtcclxuICAgIGFycmF5OiBbXSxcclxuICAgIGdldDogZnVuY3Rpb24oa2V5KXtcclxuICAgICAgdmFyIGVudHJ5ID0gZmluZEZyb3plbih0aGlzLCBrZXkpO1xyXG4gICAgICBpZihlbnRyeSlyZXR1cm4gZW50cnlbMV07XHJcbiAgICB9LFxyXG4gICAgaGFzOiBmdW5jdGlvbihrZXkpe1xyXG4gICAgICByZXR1cm4gISFmaW5kRnJvemVuKHRoaXMsIGtleSk7XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgdmFyIGVudHJ5ID0gZmluZEZyb3plbih0aGlzLCBrZXkpO1xyXG4gICAgICBpZihlbnRyeSllbnRyeVsxXSA9IHZhbHVlO1xyXG4gICAgICBlbHNlIHRoaXMuYXJyYXkucHVzaChba2V5LCB2YWx1ZV0pO1xyXG4gICAgfSxcclxuICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xyXG4gICAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgodGhpcy5hcnJheSwgZnVuY3Rpb24oaXQpe1xyXG4gICAgICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xyXG4gICAgICB9KTtcclxuICAgICAgaWYofmluZGV4KXRoaXMuYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgcmV0dXJuICEhfmluZGV4O1xyXG4gICAgfVxyXG4gIH0pW0xFQUtdO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24oTkFNRSwgSVNfTUFQLCBBRERFUil7XHJcbiAgICBmdW5jdGlvbiBDKCl7XHJcbiAgICAgICQuc2V0KGFzc2VydC5pbnN0KHRoaXMsIEMsIE5BTUUpLCBJRCwgaWQrKyk7XHJcbiAgICAgIHZhciBpdGVyYWJsZSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoaXNbQURERVJdLCB0aGlzKTtcclxuICAgIH1cclxuICAgICQubWl4KEMucHJvdG90eXBlLCB7XHJcbiAgICAgIC8vIDIzLjMuMy4yIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXHJcbiAgICAgIC8vIDIzLjQuMy4zIFdlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcclxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKGlzRnJvemVuKGtleSkpcmV0dXJuIGxlYWtTdG9yZSh0aGlzKVsnZGVsZXRlJ10oa2V5KTtcclxuICAgICAgICByZXR1cm4gX2hhcyhrZXksIFdFQUspICYmIF9oYXMoa2V5W1dFQUtdLCB0aGlzW0lEXSkgJiYgZGVsZXRlIGtleVtXRUFLXVt0aGlzW0lEXV07XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIDIzLjMuMy40IFdlYWtNYXAucHJvdG90eXBlLmhhcyhrZXkpXHJcbiAgICAgIC8vIDIzLjQuMy40IFdlYWtTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcclxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcclxuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYoaXNGcm96ZW4oa2V5KSlyZXR1cm4gbGVha1N0b3JlKHRoaXMpLmhhcyhrZXkpO1xyXG4gICAgICAgIHJldHVybiBfaGFzKGtleSwgV0VBSykgJiYgX2hhcyhrZXlbV0VBS10sIHRoaXNbSURdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQztcclxuICB9LFxyXG4gIGRlZjogZnVuY3Rpb24odGhhdCwga2V5LCB2YWx1ZSl7XHJcbiAgICBpZihpc0Zyb3plbihhc3NlcnQub2JqKGtleSkpKXtcclxuICAgICAgbGVha1N0b3JlKHRoYXQpLnNldChrZXksIHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9oYXMoa2V5LCBXRUFLKSB8fCBoaWRlKGtleSwgV0VBSywge30pO1xyXG4gICAgICBrZXlbV0VBS11bdGhhdFtJRF1dID0gdmFsdWU7XHJcbiAgICB9IHJldHVybiB0aGF0O1xyXG4gIH0sXHJcbiAgbGVha1N0b3JlOiBsZWFrU3RvcmUsXHJcbiAgV0VBSzogV0VBSyxcclxuICBJRDogSURcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi13ZWFrLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBkb2N1bWVudCA9ICQuZy5kb2N1bWVudFxyXG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XHJcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXHJcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XHJcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcclxuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0S2V5cyhpdClcclxuICAgICwgZ2V0RGVzYyAgICA9ICQuZ2V0RGVzY1xyXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzO1xyXG4gIGlmKGdldFN5bWJvbHMpJC5lYWNoLmNhbGwoZ2V0U3ltYm9scyhpdCksIGZ1bmN0aW9uKGtleSl7XHJcbiAgICBpZihnZXREZXNjKGl0LCBrZXkpLmVudW1lcmFibGUpa2V5cy5wdXNoKGtleSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGtleXM7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmVudW0ta2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXNzZXJ0T2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLm9iajtcclxuZnVuY3Rpb24gY2xvc2UoaXRlcmF0b3Ipe1xyXG4gIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XHJcbiAgaWYocmV0ICE9PSB1bmRlZmluZWQpYXNzZXJ0T2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XHJcbn1cclxuZnVuY3Rpb24gY2FsbChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhc3NlcnRPYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XHJcbiAgfSBjYXRjaChlKXtcclxuICAgIGNsb3NlKGl0ZXJhdG9yKTtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59XHJcbmNhbGwuY2xvc2UgPSBjbG9zZTtcclxubW9kdWxlLmV4cG9ydHMgPSBjYWxsO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBhc3NlcnRPYmplY3QgPSByZXF1aXJlKCcuLyQuYXNzZXJ0Jykub2JqO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG93bktleXMoaXQpe1xyXG4gIGFzc2VydE9iamVjdChpdCk7XHJcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldE5hbWVzKGl0KVxyXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzO1xyXG4gIHJldHVybiBnZXRTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0U3ltYm9scyhpdCkpIDoga2V5cztcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQub3duLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9c3RyYXdtYW46c3RyaW5nX3BhZGRpbmdcclxudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCByZXBlYXQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXJlcGVhdCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBtaW5MZW5ndGgsIGZpbGxDaGFyLCBsZWZ0KXtcclxuICAvLyAxLiBMZXQgTyBiZSBDaGVja09iamVjdENvZXJjaWJsZSh0aGlzIHZhbHVlKS5cclxuICAvLyAyLiBMZXQgUyBiZSBUb1N0cmluZyhPKS5cclxuICB2YXIgUyA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhhdCkpO1xyXG4gIC8vIDQuIElmIGludE1pbkxlbmd0aCBpcyB1bmRlZmluZWQsIHJldHVybiBTLlxyXG4gIGlmKG1pbkxlbmd0aCA9PT0gdW5kZWZpbmVkKXJldHVybiBTO1xyXG4gIC8vIDQuIExldCBpbnRNaW5MZW5ndGggYmUgVG9JbnRlZ2VyKG1pbkxlbmd0aCkuXHJcbiAgdmFyIGludE1pbkxlbmd0aCA9ICQudG9JbnRlZ2VyKG1pbkxlbmd0aCk7XHJcbiAgLy8gNS4gTGV0IGZpbGxMZW4gYmUgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIFMgbWludXMgaW50TWluTGVuZ3RoLlxyXG4gIHZhciBmaWxsTGVuID0gaW50TWluTGVuZ3RoIC0gUy5sZW5ndGg7XHJcbiAgLy8gNi4gSWYgZmlsbExlbiA8IDAsIHRoZW4gdGhyb3cgYSBSYW5nZUVycm9yIGV4Y2VwdGlvbi5cclxuICAvLyA3LiBJZiBmaWxsTGVuIGlzICviiJ4sIHRoZW4gdGhyb3cgYSBSYW5nZUVycm9yIGV4Y2VwdGlvbi5cclxuICBpZihmaWxsTGVuIDwgMCB8fCBmaWxsTGVuID09PSBJbmZpbml0eSl7XHJcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ2Fubm90IHNhdGlzZnkgc3RyaW5nIGxlbmd0aCAnICsgbWluTGVuZ3RoICsgJyBmb3Igc3RyaW5nOiAnICsgUyk7XHJcbiAgfVxyXG4gIC8vIDguIExldCBzRmlsbFN0ciBiZSB0aGUgc3RyaW5nIHJlcHJlc2VudGVkIGJ5IGZpbGxTdHIuXHJcbiAgLy8gOS4gSWYgc0ZpbGxTdHIgaXMgdW5kZWZpbmVkLCBsZXQgc0ZpbGxTdHIgYmUgYSBzcGFjZSBjaGFyYWN0ZXIuXHJcbiAgdmFyIHNGaWxsU3RyID0gZmlsbENoYXIgPT09IHVuZGVmaW5lZCA/ICcgJyA6IFN0cmluZyhmaWxsQ2hhcik7XHJcbiAgLy8gMTAuIExldCBzRmlsbFZhbCBiZSBhIFN0cmluZyBtYWRlIG9mIHNGaWxsU3RyLCByZXBlYXRlZCB1bnRpbCBmaWxsTGVuIGlzIG1ldC5cclxuICB2YXIgc0ZpbGxWYWwgPSByZXBlYXQuY2FsbChzRmlsbFN0ciwgTWF0aC5jZWlsKGZpbGxMZW4gLyBzRmlsbFN0ci5sZW5ndGgpKTtcclxuICAvLyB0cnVuY2F0ZSBpZiB3ZSBvdmVyZmxvd2VkXHJcbiAgaWYoc0ZpbGxWYWwubGVuZ3RoID4gZmlsbExlbilzRmlsbFZhbCA9IGxlZnRcclxuICAgID8gc0ZpbGxWYWwuc2xpY2Uoc0ZpbGxWYWwubGVuZ3RoIC0gZmlsbExlbilcclxuICAgIDogc0ZpbGxWYWwuc2xpY2UoMCwgZmlsbExlbik7XHJcbiAgLy8gMTEuIFJldHVybiBhIHN0cmluZyBtYWRlIGZyb20gc0ZpbGxWYWwsIGZvbGxvd2VkIGJ5IFMuXHJcbiAgLy8gMTEuIFJldHVybiBhIFN0cmluZyBtYWRlIGZyb20gUywgZm9sbG93ZWQgYnkgc0ZpbGxWYWwuXHJcbiAgcmV0dXJuIGxlZnQgPyBzRmlsbFZhbC5jb25jYXQoUykgOiBTLmNvbmNhdChzRmlsbFZhbCk7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnN0cmluZy1wYWQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXBlYXQoY291bnQpe1xyXG4gIHZhciBzdHIgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxyXG4gICAgLCByZXMgPSAnJ1xyXG4gICAgLCBuICAgPSAkLnRvSW50ZWdlcihjb3VudCk7XHJcbiAgaWYobiA8IDAgfHwgbiA9PSBJbmZpbml0eSl0aHJvdyBSYW5nZUVycm9yKFwiQ291bnQgY2FuJ3QgYmUgbmVnYXRpdmVcIik7XHJcbiAgZm9yKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpaWYobiAmIDEpcmVzICs9IHN0cjtcclxuICByZXR1cm4gcmVzO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcmVwZWF0LmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBjdHggICAgPSByZXF1aXJlKCcuLyQuY3R4JylcclxuICAsIGNvZiAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxyXG4gICwgaW52b2tlID0gcmVxdWlyZSgnLi8kLmludm9rZScpXHJcbiAgLCBjZWwgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXHJcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSAkLmdcclxuICAsIGlzRnVuY3Rpb24gICAgICAgICA9ICQuaXNGdW5jdGlvblxyXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gJC5odG1sXHJcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xyXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxyXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXHJcbiAgLCBwb3N0TWVzc2FnZSAgICAgICAgPSBnbG9iYWwucG9zdE1lc3NhZ2VcclxuICAsIGFkZEV2ZW50TGlzdGVuZXIgICA9IGdsb2JhbC5hZGRFdmVudExpc3RlbmVyXHJcbiAgLCBNZXNzYWdlQ2hhbm5lbCAgICAgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWxcclxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcclxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XHJcbiAgLCBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xyXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIHZhciBpZCA9ICt0aGlzO1xyXG4gIGlmKCQuaGFzKHF1ZXVlLCBpZCkpe1xyXG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xyXG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcclxuICAgIGZuKCk7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGxpc3RuZXIoZXZlbnQpe1xyXG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xyXG59XHJcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcclxuaWYoIWlzRnVuY3Rpb24oc2V0VGFzaykgfHwgIWlzRnVuY3Rpb24oY2xlYXJUYXNrKSl7XHJcbiAgc2V0VGFzayA9IGZ1bmN0aW9uKGZuKXtcclxuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xyXG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcclxuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xyXG4gICAgICBpbnZva2UoaXNGdW5jdGlvbihmbikgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XHJcbiAgICB9O1xyXG4gICAgZGVmZXIoY291bnRlcik7XHJcbiAgICByZXR1cm4gY291bnRlcjtcclxuICB9O1xyXG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uKGlkKXtcclxuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XHJcbiAgfTtcclxuICAvLyBOb2RlLmpzIDAuOC1cclxuICBpZihjb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcclxuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XHJcbiAgICB9O1xyXG4gIC8vIE1vZGVybiBicm93c2Vycywgc2tpcCBpbXBsZW1lbnRhdGlvbiBmb3IgV2ViV29ya2Vyc1xyXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzIG9iamVjdFxyXG4gIH0gZWxzZSBpZihhZGRFdmVudExpc3RlbmVyICYmIGlzRnVuY3Rpb24ocG9zdE1lc3NhZ2UpICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XHJcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgcG9zdE1lc3NhZ2UoaWQsICcqJyk7XHJcbiAgICB9O1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RuZXIsIGZhbHNlKTtcclxuICAvLyBXZWJXb3JrZXJzXHJcbiAgfSBlbHNlIGlmKGlzRnVuY3Rpb24oTWVzc2FnZUNoYW5uZWwpKXtcclxuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XHJcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcclxuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcclxuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xyXG4gIC8vIElFOC1cclxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xyXG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XHJcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICBydW4uY2FsbChpZCk7XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXHJcbiAgfSBlbHNlIHtcclxuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzZXQ6ICAgc2V0VGFzayxcclxuICBjbGVhcjogY2xlYXJUYXNrXHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnRhc2suanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgc2V0VW5zY29wZSA9IHJlcXVpcmUoJy4vJC51bnNjb3BlJylcclxuICAsIElURVIgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgnaXRlcicpXHJcbiAgLCAkaXRlciAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKVxyXG4gICwgc3RlcCAgICAgICA9ICRpdGVyLnN0ZXBcclxuICAsIEl0ZXJhdG9ycyAgPSAkaXRlci5JdGVyYXRvcnM7XHJcblxyXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXHJcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXHJcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcclxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXHJcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XHJcbiAgJC5zZXQodGhpcywgSVRFUiwge286ICQudG9PYmplY3QoaXRlcmF0ZWQpLCBpOiAwLCBrOiBraW5kfSk7XHJcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxyXG59LCBmdW5jdGlvbigpe1xyXG4gIHZhciBpdGVyICA9IHRoaXNbSVRFUl1cclxuICAgICwgTyAgICAgPSBpdGVyLm9cclxuICAgICwga2luZCAgPSBpdGVyLmtcclxuICAgICwgaW5kZXggPSBpdGVyLmkrKztcclxuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XHJcbiAgICBpdGVyLm8gPSB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gc3RlcCgxKTtcclxuICB9XHJcbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XHJcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XHJcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xyXG59LCAndmFsdWVzJyk7XHJcblxyXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXHJcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XHJcblxyXG5zZXRVbnNjb3BlKCdrZXlzJyk7XHJcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xyXG5zZXRVbnNjb3BlKCdlbnRyaWVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5yZXF1aXJlKFwiY29yZS1qcy9zaGltXCIpO1xuXG5yZXF1aXJlKFwicmVnZW5lcmF0b3IvcnVudGltZVwiKTtcblxuaWYgKGdsb2JhbC5fYmFiZWxQb2x5ZmlsbCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJvbmx5IG9uZSBpbnN0YW5jZSBvZiBiYWJlbC9wb2x5ZmlsbCBpcyBhbGxvd2VkXCIpO1xufVxuZ2xvYmFsLl9iYWJlbFBvbHlmaWxsID0gdHJ1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL2xpYi9iYWJlbC9wb2x5ZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgZW51bUtleXMgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJyk7XHJcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuICB2YXIgVCA9IE9iamVjdCgkLmFzc2VydERlZmluZWQodGFyZ2V0KSlcclxuICAgICwgbCA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgICwgaSA9IDE7XHJcbiAgd2hpbGUobCA+IGkpe1xyXG4gICAgdmFyIFMgICAgICA9ICQuRVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKVxyXG4gICAgICAsIGtleXMgICA9IGVudW1LZXlzKFMpXHJcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcclxuICAgICAgLCBqICAgICAgPSAwXHJcbiAgICAgICwga2V5O1xyXG4gICAgd2hpbGUobGVuZ3RoID4gailUW2tleSA9IGtleXNbaisrXV0gPSBTW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBUO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkKXtcclxuICAkLkZXICAgPSB0cnVlO1xyXG4gICQucGF0aCA9ICQuZztcclxuICByZXR1cm4gJDtcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZncuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgPSByZXF1aXJlKCcuLyQnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcclxuICB2YXIgTyAgICAgID0gJC50b09iamVjdChvYmplY3QpXHJcbiAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxyXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxyXG4gICAgLCBpbmRleCAgPSAwXHJcbiAgICAsIGtleTtcclxuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5rZXlvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciAkICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgaW52b2tlID0gcmVxdWlyZSgnLi8kLmludm9rZScpXHJcbiAgLCBhc3NlcnRGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5mbjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigvKiAuLi5wYXJncyAqLyl7XHJcbiAgdmFyIGZuICAgICA9IGFzc2VydEZ1bmN0aW9uKHRoaXMpXHJcbiAgICAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgICwgcGFyZ3MgID0gQXJyYXkobGVuZ3RoKVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIF8gICAgICA9ICQucGF0aC5fXHJcbiAgICAsIGhvbGRlciA9IGZhbHNlO1xyXG4gIHdoaWxlKGxlbmd0aCA+IGkpaWYoKHBhcmdzW2ldID0gYXJndW1lbnRzW2krK10pID09PSBfKWhvbGRlciA9IHRydWU7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xyXG4gICAgdmFyIHRoYXQgICAgPSB0aGlzXHJcbiAgICAgICwgX2xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgICAgLCBqID0gMCwgayA9IDAsIGFyZ3M7XHJcbiAgICBpZighaG9sZGVyICYmICFfbGVuZ3RoKXJldHVybiBpbnZva2UoZm4sIHBhcmdzLCB0aGF0KTtcclxuICAgIGFyZ3MgPSBwYXJncy5zbGljZSgpO1xyXG4gICAgaWYoaG9sZGVyKWZvcig7bGVuZ3RoID4gajsgaisrKWlmKGFyZ3Nbal0gPT09IF8pYXJnc1tqXSA9IGFyZ3VtZW50c1trKytdO1xyXG4gICAgd2hpbGUoX2xlbmd0aCA+IGspYXJncy5wdXNoKGFyZ3VtZW50c1trKytdKTtcclxuICAgIHJldHVybiBpbnZva2UoZm4sIGFyZ3MsIHRoYXQpO1xyXG4gIH07XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnBhcnRpYWwuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgY2VsICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kb20tY3JlYXRlJylcclxuICAsIGNvZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcclxuICAsICRkZWYgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsIGludm9rZSAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcclxuICAsIGFycmF5TWV0aG9kICAgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXHJcbiAgLCBJRV9QUk9UTyAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ19fcHJvdG9fXycpXHJcbiAgLCBhc3NlcnQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXHJcbiAgLCBhc3NlcnRPYmplY3QgICAgID0gYXNzZXJ0Lm9ialxyXG4gICwgT2JqZWN0UHJvdG8gICAgICA9IE9iamVjdC5wcm90b3R5cGVcclxuICAsIEEgICAgICAgICAgICAgICAgPSBbXVxyXG4gICwgc2xpY2UgICAgICAgICAgICA9IEEuc2xpY2VcclxuICAsIGluZGV4T2YgICAgICAgICAgPSBBLmluZGV4T2ZcclxuICAsIGNsYXNzb2YgICAgICAgICAgPSBjb2YuY2xhc3NvZlxyXG4gICwgaGFzICAgICAgICAgICAgICA9ICQuaGFzXHJcbiAgLCBkZWZpbmVQcm9wZXJ0eSAgID0gJC5zZXREZXNjXHJcbiAgLCBnZXRPd25EZXNjcmlwdG9yID0gJC5nZXREZXNjXHJcbiAgLCBkZWZpbmVQcm9wZXJ0aWVzID0gJC5zZXREZXNjc1xyXG4gICwgaXNGdW5jdGlvbiAgICAgICA9ICQuaXNGdW5jdGlvblxyXG4gICwgdG9PYmplY3QgICAgICAgICA9ICQudG9PYmplY3RcclxuICAsIHRvTGVuZ3RoICAgICAgICAgPSAkLnRvTGVuZ3RoXHJcbiAgLCBJRThfRE9NX0RFRklORSAgID0gZmFsc2VcclxuICAsICRpbmRleE9mICAgICAgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcclxuICAsICRmb3JFYWNoICAgICAgICAgPSBhcnJheU1ldGhvZCgwKVxyXG4gICwgJG1hcCAgICAgICAgICAgICA9IGFycmF5TWV0aG9kKDEpXHJcbiAgLCAkZmlsdGVyICAgICAgICAgID0gYXJyYXlNZXRob2QoMilcclxuICAsICRzb21lICAgICAgICAgICAgPSBhcnJheU1ldGhvZCgzKVxyXG4gICwgJGV2ZXJ5ICAgICAgICAgICA9IGFycmF5TWV0aG9kKDQpO1xyXG5cclxuaWYoISQuREVTQyl7XHJcbiAgdHJ5IHtcclxuICAgIElFOF9ET01fREVGSU5FID0gZGVmaW5lUHJvcGVydHkoY2VsKCdkaXYnKSwgJ3gnLFxyXG4gICAgICB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gODsgfX1cclxuICAgICkueCA9PSA4O1xyXG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cclxuICAkLnNldERlc2MgPSBmdW5jdGlvbihPLCBQLCBBdHRyaWJ1dGVzKXtcclxuICAgIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XHJcbiAgICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcclxuICAgIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cclxuICAgIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xyXG4gICAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKWFzc2VydE9iamVjdChPKVtQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XHJcbiAgICByZXR1cm4gTztcclxuICB9O1xyXG4gICQuZ2V0RGVzYyA9IGZ1bmN0aW9uKE8sIFApe1xyXG4gICAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcclxuICAgICAgcmV0dXJuIGdldE93bkRlc2NyaXB0b3IoTywgUCk7XHJcbiAgICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XHJcbiAgICBpZihoYXMoTywgUCkpcmV0dXJuICQuZGVzYyghT2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChPLCBQKSwgT1tQXSk7XHJcbiAgfTtcclxuICAkLnNldERlc2NzID0gZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uKE8sIFByb3BlcnRpZXMpe1xyXG4gICAgYXNzZXJ0T2JqZWN0KE8pO1xyXG4gICAgdmFyIGtleXMgICA9ICQuZ2V0S2V5cyhQcm9wZXJ0aWVzKVxyXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXHJcbiAgICAgICwgaSA9IDBcclxuICAgICAgLCBQO1xyXG4gICAgd2hpbGUobGVuZ3RoID4gaSkkLnNldERlc2MoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XHJcbiAgICByZXR1cm4gTztcclxuICB9O1xyXG59XHJcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogISQuREVTQywgJ09iamVjdCcsIHtcclxuICAvLyAxOS4xLjIuNiAvIDE1LjIuMy4zIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcclxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICQuZ2V0RGVzYyxcclxuICAvLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxyXG4gIGRlZmluZVByb3BlcnR5OiAkLnNldERlc2MsXHJcbiAgLy8gMTkuMS4yLjMgLyAxNS4yLjMuNyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxyXG4gIGRlZmluZVByb3BlcnRpZXM6IGRlZmluZVByb3BlcnRpZXNcclxufSk7XHJcblxyXG4gIC8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcclxudmFyIGtleXMxID0gKCdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLCcgK1xyXG4gICAgICAgICAgICAndG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZicpLnNwbGl0KCcsJylcclxuICAvLyBBZGRpdGlvbmFsIGtleXMgZm9yIGdldE93blByb3BlcnR5TmFtZXNcclxuICAsIGtleXMyID0ga2V5czEuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJylcclxuICAsIGtleXNMZW4xID0ga2V5czEubGVuZ3RoO1xyXG5cclxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcclxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXHJcbiAgdmFyIGlmcmFtZSA9IGNlbCgnaWZyYW1lJylcclxuICAgICwgaSAgICAgID0ga2V5c0xlbjFcclxuICAgICwgZ3QgICAgID0gJz4nXHJcbiAgICAsIGlmcmFtZURvY3VtZW50O1xyXG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICQuaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcclxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xyXG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcclxuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcclxuICBpZnJhbWVEb2N1bWVudC53cml0ZSgnPHNjcmlwdD5kb2N1bWVudC5GPU9iamVjdDwvc2NyaXB0JyArIGd0KTtcclxuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xyXG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xyXG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdC5wcm90b3R5cGVba2V5czFbaV1dO1xyXG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XHJcbn07XHJcbmZ1bmN0aW9uIGNyZWF0ZUdldEtleXMobmFtZXMsIGxlbmd0aCl7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3Qob2JqZWN0KVxyXG4gICAgICAsIGkgICAgICA9IDBcclxuICAgICAgLCByZXN1bHQgPSBbXVxyXG4gICAgICAsIGtleTtcclxuICAgIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcclxuICAgIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcclxuICAgIHdoaWxlKGxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgICAgfmluZGV4T2YuY2FsbChyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxufVxyXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShpdCl7IHJldHVybiAhJC5pc09iamVjdChpdCk7IH1cclxuZnVuY3Rpb24gRW1wdHkoKXt9XHJcbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xyXG4gIC8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXHJcbiAgZ2V0UHJvdG90eXBlT2Y6ICQuZ2V0UHJvdG8gPSAkLmdldFByb3RvIHx8IGZ1bmN0aW9uKE8pe1xyXG4gICAgTyA9IE9iamVjdChhc3NlcnQuZGVmKE8pKTtcclxuICAgIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xyXG4gICAgaWYoaXNGdW5jdGlvbihPLmNvbnN0cnVjdG9yKSAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XHJcbiAgICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxuICAgIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XHJcbiAgfSxcclxuICAvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXHJcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJC5nZXROYW1lcyA9ICQuZ2V0TmFtZXMgfHwgY3JlYXRlR2V0S2V5cyhrZXlzMiwga2V5czIubGVuZ3RoLCB0cnVlKSxcclxuICAvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcclxuICBjcmVhdGU6ICQuY3JlYXRlID0gJC5jcmVhdGUgfHwgZnVuY3Rpb24oTywgLyo/Ki9Qcm9wZXJ0aWVzKXtcclxuICAgIHZhciByZXN1bHQ7XHJcbiAgICBpZihPICE9PSBudWxsKXtcclxuICAgICAgRW1wdHkucHJvdG90eXBlID0gYXNzZXJ0T2JqZWN0KE8pO1xyXG4gICAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcclxuICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcclxuICAgICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBzaGltXHJcbiAgICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xyXG4gICAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcclxuICAgIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XHJcbiAgfSxcclxuICAvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcclxuICBrZXlzOiAkLmdldEtleXMgPSAkLmdldEtleXMgfHwgY3JlYXRlR2V0S2V5cyhrZXlzMSwga2V5c0xlbjEsIGZhbHNlKSxcclxuICAvLyAxOS4xLjIuMTcgLyAxNS4yLjMuOCBPYmplY3Quc2VhbChPKVxyXG4gIHNlYWw6ICQuaXQsIC8vIDwtIGNhcFxyXG4gIC8vIDE5LjEuMi41IC8gMTUuMi4zLjkgT2JqZWN0LmZyZWV6ZShPKVxyXG4gIGZyZWV6ZTogJC5pdCwgLy8gPC0gY2FwXHJcbiAgLy8gMTkuMS4yLjE1IC8gMTUuMi4zLjEwIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhPKVxyXG4gIHByZXZlbnRFeHRlbnNpb25zOiAkLml0LCAvLyA8LSBjYXBcclxuICAvLyAxOS4xLjIuMTMgLyAxNS4yLjMuMTEgT2JqZWN0LmlzU2VhbGVkKE8pXHJcbiAgaXNTZWFsZWQ6IGlzUHJpbWl0aXZlLCAvLyA8LSBjYXBcclxuICAvLyAxOS4xLjIuMTIgLyAxNS4yLjMuMTIgT2JqZWN0LmlzRnJvemVuKE8pXHJcbiAgaXNGcm96ZW46IGlzUHJpbWl0aXZlLCAvLyA8LSBjYXBcclxuICAvLyAxOS4xLjIuMTEgLyAxNS4yLjMuMTMgT2JqZWN0LmlzRXh0ZW5zaWJsZShPKVxyXG4gIGlzRXh0ZW5zaWJsZTogJC5pc09iamVjdCAvLyA8LSBjYXBcclxufSk7XHJcblxyXG4vLyAxOS4yLjMuMiAvIDE1LjMuNC41IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKHRoaXNBcmcsIGFyZ3MuLi4pXHJcbiRkZWYoJGRlZi5QLCAnRnVuY3Rpb24nLCB7XHJcbiAgYmluZDogZnVuY3Rpb24odGhhdCAvKiwgYXJncy4uLiAqLyl7XHJcbiAgICB2YXIgZm4gICAgICAgPSBhc3NlcnQuZm4odGhpcylcclxuICAgICAgLCBwYXJ0QXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgIGZ1bmN0aW9uIGJvdW5kKC8qIGFyZ3MuLi4gKi8pe1xyXG4gICAgICB2YXIgYXJncyA9IHBhcnRBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpO1xyXG4gICAgICByZXR1cm4gaW52b2tlKGZuLCBhcmdzLCB0aGlzIGluc3RhbmNlb2YgYm91bmQgPyAkLmNyZWF0ZShmbi5wcm90b3R5cGUpIDogdGhhdCk7XHJcbiAgICB9XHJcbiAgICBpZihmbi5wcm90b3R5cGUpYm91bmQucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xyXG4gICAgcmV0dXJuIGJvdW5kO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBGaXggZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdcclxuZnVuY3Rpb24gYXJyYXlNZXRob2RGaXgoZm4pe1xyXG4gIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIGZuLmFwcGx5KCQuRVM1T2JqZWN0KHRoaXMpLCBhcmd1bWVudHMpO1xyXG4gIH07XHJcbn1cclxuaWYoISgwIGluIE9iamVjdCgneicpICYmICd6J1swXSA9PSAneicpKXtcclxuICAkLkVTNU9iamVjdCA9IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcclxuICB9O1xyXG59XHJcbiRkZWYoJGRlZi5QICsgJGRlZi5GICogKCQuRVM1T2JqZWN0ICE9IE9iamVjdCksICdBcnJheScsIHtcclxuICBzbGljZTogYXJyYXlNZXRob2RGaXgoc2xpY2UpLFxyXG4gIGpvaW46IGFycmF5TWV0aG9kRml4KEEuam9pbilcclxufSk7XHJcblxyXG4vLyAyMi4xLjIuMiAvIDE1LjQuMy4yIEFycmF5LmlzQXJyYXkoYXJnKVxyXG4kZGVmKCRkZWYuUywgJ0FycmF5Jywge1xyXG4gIGlzQXJyYXk6IGZ1bmN0aW9uKGFyZyl7XHJcbiAgICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5JztcclxuICB9XHJcbn0pO1xyXG5mdW5jdGlvbiBjcmVhdGVBcnJheVJlZHVjZShpc1JpZ2h0KXtcclxuICByZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2tmbiwgbWVtbyl7XHJcbiAgICBhc3NlcnQuZm4oY2FsbGJhY2tmbik7XHJcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QodGhpcylcclxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcclxuICAgICAgLCBpbmRleCAgPSBpc1JpZ2h0ID8gbGVuZ3RoIC0gMSA6IDBcclxuICAgICAgLCBpICAgICAgPSBpc1JpZ2h0ID8gLTEgOiAxO1xyXG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA8IDIpZm9yKDs7KXtcclxuICAgICAgaWYoaW5kZXggaW4gTyl7XHJcbiAgICAgICAgbWVtbyA9IE9baW5kZXhdO1xyXG4gICAgICAgIGluZGV4ICs9IGk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXggKz0gaTtcclxuICAgICAgYXNzZXJ0KGlzUmlnaHQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXgsICdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XHJcbiAgICB9XHJcbiAgICBmb3IoO2lzUmlnaHQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpaWYoaW5kZXggaW4gTyl7XHJcbiAgICAgIG1lbW8gPSBjYWxsYmFja2ZuKG1lbW8sIE9baW5kZXhdLCBpbmRleCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVtbztcclxuICB9O1xyXG59XHJcbiRkZWYoJGRlZi5QLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjEwIC8gMTUuNC40LjE4IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXHJcbiAgZm9yRWFjaDogJC5lYWNoID0gJC5lYWNoIHx8IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcclxuICAgIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH0sXHJcbiAgLy8gMjIuMS4zLjE1IC8gMTUuNC40LjE5IEFycmF5LnByb3RvdHlwZS5tYXAoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xyXG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9LFxyXG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xyXG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9LFxyXG4gIC8vIDIyLjEuMy4yMyAvIDE1LjQuNC4xNyBBcnJheS5wcm90b3R5cGUuc29tZShjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxyXG4gIHNvbWU6IGZ1bmN0aW9uIHNvbWUoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcclxuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH0sXHJcbiAgLy8gMjIuMS4zLjUgLyAxNS40LjQuMTYgQXJyYXkucHJvdG90eXBlLmV2ZXJ5KGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXHJcbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XHJcbiAgICByZXR1cm4gJGV2ZXJ5KHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XHJcbiAgfSxcclxuICAvLyAyMi4xLjMuMTggLyAxNS40LjQuMjEgQXJyYXkucHJvdG90eXBlLnJlZHVjZShjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXHJcbiAgcmVkdWNlOiBjcmVhdGVBcnJheVJlZHVjZShmYWxzZSksXHJcbiAgLy8gMjIuMS4zLjE5IC8gMTUuNC40LjIyIEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodChjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXHJcbiAgcmVkdWNlUmlnaHQ6IGNyZWF0ZUFycmF5UmVkdWNlKHRydWUpLFxyXG4gIC8vIDIyLjEuMy4xMSAvIDE1LjQuNC4xNCBBcnJheS5wcm90b3R5cGUuaW5kZXhPZihzZWFyY2hFbGVtZW50IFssIGZyb21JbmRleF0pXHJcbiAgaW5kZXhPZjogaW5kZXhPZiA9IGluZGV4T2YgfHwgZnVuY3Rpb24gaW5kZXhPZihlbCAvKiwgZnJvbUluZGV4ID0gMCAqLyl7XHJcbiAgICByZXR1cm4gJGluZGV4T2YodGhpcywgZWwsIGFyZ3VtZW50c1sxXSk7XHJcbiAgfSxcclxuICAvLyAyMi4xLjMuMTQgLyAxNS40LjQuMTUgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcclxuICBsYXN0SW5kZXhPZjogZnVuY3Rpb24oZWwsIGZyb21JbmRleCAvKiA9IEBbKi0xXSAqLyl7XHJcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QodGhpcylcclxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcclxuICAgICAgLCBpbmRleCAgPSBsZW5ndGggLSAxO1xyXG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpaW5kZXggPSBNYXRoLm1pbihpbmRleCwgJC50b0ludGVnZXIoZnJvbUluZGV4KSk7XHJcbiAgICBpZihpbmRleCA8IDApaW5kZXggPSB0b0xlbmd0aChsZW5ndGggKyBpbmRleCk7XHJcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIGluZGV4O1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyAyMS4xLjMuMjUgLyAxNS41LjQuMjAgU3RyaW5nLnByb3RvdHlwZS50cmltKClcclxuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7dHJpbTogcmVxdWlyZSgnLi8kLnJlcGxhY2VyJykoL15cXHMqKFtcXHNcXFNdKlxcUyk/XFxzKiQvLCAnJDEnKX0pO1xyXG5cclxuLy8gMjAuMy4zLjEgLyAxNS45LjQuNCBEYXRlLm5vdygpXHJcbiRkZWYoJGRlZi5TLCAnRGF0ZScsIHtub3c6IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuICtuZXcgRGF0ZTtcclxufX0pO1xyXG5cclxuZnVuY3Rpb24gbHoobnVtKXtcclxuICByZXR1cm4gbnVtID4gOSA/IG51bSA6ICcwJyArIG51bTtcclxufVxyXG5cclxuLy8gMjAuMy40LjM2IC8gMTUuOS41LjQzIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKClcclxuLy8gUGhhbnRvbUpTIGFuZCBvbGQgd2Via2l0IGhhZCBhIGJyb2tlbiBEYXRlIGltcGxlbWVudGF0aW9uLlxyXG52YXIgZGF0ZSAgICAgICA9IG5ldyBEYXRlKC01ZTEzIC0gMSlcclxuICAsIGJyb2tlbkRhdGUgPSAhKGRhdGUudG9JU09TdHJpbmcgJiYgZGF0ZS50b0lTT1N0cmluZygpID09ICcwMzg1LTA3LTI1VDA3OjA2OjM5Ljk5OVonXHJcbiAgICAgICYmIHJlcXVpcmUoJy4vJC50aHJvd3MnKShmdW5jdGlvbigpeyBuZXcgRGF0ZShOYU4pLnRvSVNPU3RyaW5nKCk7IH0pKTtcclxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiBicm9rZW5EYXRlLCAnRGF0ZScsIHt0b0lTT1N0cmluZzogZnVuY3Rpb24oKXtcclxuICBpZighaXNGaW5pdGUodGhpcykpdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XHJcbiAgdmFyIGQgPSB0aGlzXHJcbiAgICAsIHkgPSBkLmdldFVUQ0Z1bGxZZWFyKClcclxuICAgICwgbSA9IGQuZ2V0VVRDTWlsbGlzZWNvbmRzKClcclxuICAgICwgcyA9IHkgPCAwID8gJy0nIDogeSA+IDk5OTkgPyAnKycgOiAnJztcclxuICByZXR1cm4gcyArICgnMDAwMDAnICsgTWF0aC5hYnMoeSkpLnNsaWNlKHMgPyAtNiA6IC00KSArXHJcbiAgICAnLScgKyBseihkLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArIGx6KGQuZ2V0VVRDRGF0ZSgpKSArXHJcbiAgICAnVCcgKyBseihkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgbHooZC5nZXRVVENNaW51dGVzKCkpICtcclxuICAgICc6JyArIGx6KGQuZ2V0VVRDU2Vjb25kcygpKSArICcuJyArIChtID4gOTkgPyBtIDogJzAnICsgbHoobSkpICsgJ1onO1xyXG59fSk7XHJcblxyXG5pZihjbGFzc29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ09iamVjdCcpY29mLmNsYXNzb2YgPSBmdW5jdGlvbihpdCl7XHJcbiAgdmFyIHRhZyA9IGNsYXNzb2YoaXQpO1xyXG4gIHJldHVybiB0YWcgPT0gJ09iamVjdCcgJiYgaXNGdW5jdGlvbihpdC5jYWxsZWUpID8gJ0FyZ3VtZW50cycgOiB0YWc7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczUuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCB0b0luZGV4ID0gJC50b0luZGV4O1xyXG4kZGVmKCRkZWYuUCwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxyXG4gIGNvcHlXaXRoaW46IGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0LyogPSAwICovLCBzdGFydCAvKiA9IDAsIGVuZCA9IEBsZW5ndGggKi8pe1xyXG4gICAgdmFyIE8gICAgID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcclxuICAgICAgLCBsZW4gICA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXHJcbiAgICAgICwgdG8gICAgPSB0b0luZGV4KHRhcmdldCwgbGVuKVxyXG4gICAgICAsIGZyb20gID0gdG9JbmRleChzdGFydCwgbGVuKVxyXG4gICAgICAsIGVuZCAgID0gYXJndW1lbnRzWzJdXHJcbiAgICAgICwgZmluICAgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IHRvSW5kZXgoZW5kLCBsZW4pXHJcbiAgICAgICwgY291bnQgPSBNYXRoLm1pbihmaW4gLSBmcm9tLCBsZW4gLSB0bylcclxuICAgICAgLCBpbmMgICA9IDE7XHJcbiAgICBpZihmcm9tIDwgdG8gJiYgdG8gPCBmcm9tICsgY291bnQpe1xyXG4gICAgICBpbmMgID0gLTE7XHJcbiAgICAgIGZyb20gPSBmcm9tICsgY291bnQgLSAxO1xyXG4gICAgICB0byAgID0gdG8gICArIGNvdW50IC0gMTtcclxuICAgIH1cclxuICAgIHdoaWxlKGNvdW50LS0gPiAwKXtcclxuICAgICAgaWYoZnJvbSBpbiBPKU9bdG9dID0gT1tmcm9tXTtcclxuICAgICAgZWxzZSBkZWxldGUgT1t0b107XHJcbiAgICAgIHRvICAgKz0gaW5jO1xyXG4gICAgICBmcm9tICs9IGluYztcclxuICAgIH0gcmV0dXJuIE87XHJcbiAgfVxyXG59KTtcclxucmVxdWlyZSgnLi8kLnVuc2NvcGUnKSgnY29weVdpdGhpbicpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgJGRlZiAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgdG9JbmRleCA9ICQudG9JbmRleDtcclxuJGRlZigkZGVmLlAsICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuNiBBcnJheS5wcm90b3R5cGUuZmlsbCh2YWx1ZSwgc3RhcnQgPSAwLCBlbmQgPSB0aGlzLmxlbmd0aClcclxuICBmaWxsOiBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qLCBzdGFydCA9IDAsIGVuZCA9IEBsZW5ndGggKi8pe1xyXG4gICAgdmFyIE8gICAgICA9IE9iamVjdCgkLmFzc2VydERlZmluZWQodGhpcykpXHJcbiAgICAgICwgbGVuZ3RoID0gJC50b0xlbmd0aChPLmxlbmd0aClcclxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGFyZ3VtZW50c1sxXSwgbGVuZ3RoKVxyXG4gICAgICAsIGVuZCAgICA9IGFyZ3VtZW50c1syXVxyXG4gICAgICAsIGVuZFBvcyA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbmRleChlbmQsIGxlbmd0aCk7XHJcbiAgICB3aGlsZShlbmRQb3MgPiBpbmRleClPW2luZGV4KytdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gTztcclxuICB9XHJcbn0pO1xyXG5yZXF1aXJlKCcuLyQudW5zY29wZScpKCdmaWxsJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8vIDIyLjEuMy45IEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxyXG52YXIgS0VZICAgID0gJ2ZpbmRJbmRleCdcclxuICAsICRkZWYgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgZm9yY2VkID0gdHJ1ZVxyXG4gICwgJGZpbmQgID0gcmVxdWlyZSgnLi8kLmFycmF5LW1ldGhvZHMnKSg2KTtcclxuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcclxuaWYoS0VZIGluIFtdKUFycmF5KDEpW0tFWV0oZnVuY3Rpb24oKXsgZm9yY2VkID0gZmFsc2U7IH0pO1xyXG4kZGVmKCRkZWYuUCArICRkZWYuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xyXG4gIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XHJcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9XHJcbn0pO1xyXG5yZXF1aXJlKCcuLyQudW5zY29wZScpKEtFWSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8vIDIyLjEuMy44IEFycmF5LnByb3RvdHlwZS5maW5kKHByZWRpY2F0ZSwgdGhpc0FyZyA9IHVuZGVmaW5lZClcclxudmFyIEtFWSAgICA9ICdmaW5kJ1xyXG4gICwgJGRlZiAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCBmb3JjZWQgPSB0cnVlXHJcbiAgLCAkZmluZCAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpKDUpO1xyXG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xyXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XHJcbiRkZWYoJGRlZi5QICsgJGRlZi5GICogZm9yY2VkLCAnQXJyYXknLCB7XHJcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xyXG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XHJcbiAgfVxyXG59KTtcclxucmVxdWlyZSgnLi8kLnVuc2NvcGUnKShLRVkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbmQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGN0eCAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXHJcbiAgLCAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgJGl0ZXIgPSByZXF1aXJlKCcuLyQuaXRlcicpXHJcbiAgLCBjYWxsICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKTtcclxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxyXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xyXG4gICAgdmFyIE8gICAgICAgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKGFycmF5TGlrZSkpXHJcbiAgICAgICwgbWFwZm4gICA9IGFyZ3VtZW50c1sxXVxyXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICwgZiAgICAgICA9IG1hcHBpbmcgPyBjdHgobWFwZm4sIGFyZ3VtZW50c1syXSwgMikgOiB1bmRlZmluZWRcclxuICAgICAgLCBpbmRleCAgID0gMFxyXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcclxuICAgIGlmKCRpdGVyLmlzKE8pKXtcclxuICAgICAgaXRlcmF0b3IgPSAkaXRlci5nZXQoTyk7XHJcbiAgICAgIC8vIHN0cmFuZ2UgSUUgcXVpcmtzIG1vZGUgYnVnIC0+IHVzZSB0eXBlb2YgaW5zdGVhZCBvZiBpc0Z1bmN0aW9uXHJcbiAgICAgIHJlc3VsdCAgID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KTtcclxuICAgICAgZm9yKDsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcclxuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIGYsIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc3RyYW5nZSBJRSBxdWlya3MgbW9kZSBidWcgLT4gdXNlIHR5cGVvZiBpbnN0ZWFkIG9mIGlzRnVuY3Rpb25cclxuICAgICAgcmVzdWx0ID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KShsZW5ndGggPSAkLnRvTGVuZ3RoKE8ubGVuZ3RoKSk7XHJcbiAgICAgIGZvcig7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcclxuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGYoT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcclxuJGRlZigkZGVmLlMsICdBcnJheScsIHtcclxuICAvLyAyMi4xLjIuMyBBcnJheS5vZiggLi4uaXRlbXMpXHJcbiAgb2Y6IGZ1bmN0aW9uIG9mKC8qIC4uLmFyZ3MgKi8pe1xyXG4gICAgdmFyIGluZGV4ICA9IDBcclxuICAgICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXHJcbiAgICAgIC8vIHN0cmFuZ2UgSUUgcXVpcmtzIG1vZGUgYnVnIC0+IHVzZSB0eXBlb2YgaW5zdGVhZCBvZiBpc0Z1bmN0aW9uXHJcbiAgICAgICwgcmVzdWx0ID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KShsZW5ndGgpO1xyXG4gICAgd2hpbGUobGVuZ3RoID4gaW5kZXgpcmVzdWx0W2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleCsrXTtcclxuICAgIHJlc3VsdC5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkub2YuanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi8kLnNwZWNpZXMnKShBcnJheSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBIQVNfSU5TVEFOQ0UgID0gcmVxdWlyZSgnLi8kLndrcycpKCdoYXNJbnN0YW5jZScpXHJcbiAgLCBGdW5jdGlvblByb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG4vLyAxOS4yLjMuNiBGdW5jdGlvbi5wcm90b3R5cGVbQEBoYXNJbnN0YW5jZV0oVilcclxuaWYoIShIQVNfSU5TVEFOQ0UgaW4gRnVuY3Rpb25Qcm90bykpJC5zZXREZXNjKEZ1bmN0aW9uUHJvdG8sIEhBU19JTlNUQU5DRSwge3ZhbHVlOiBmdW5jdGlvbihPKXtcclxuICBpZighJC5pc0Z1bmN0aW9uKHRoaXMpIHx8ICEkLmlzT2JqZWN0KE8pKXJldHVybiBmYWxzZTtcclxuICBpZighJC5pc09iamVjdCh0aGlzLnByb3RvdHlwZSkpcmV0dXJuIE8gaW5zdGFuY2VvZiB0aGlzO1xyXG4gIC8vIGZvciBlbnZpcm9ubWVudCB3L28gbmF0aXZlIGBAQGhhc0luc3RhbmNlYCBsb2dpYyBlbm91Z2ggYGluc3RhbmNlb2ZgLCBidXQgYWRkIHRoaXM6XHJcbiAgd2hpbGUoTyA9ICQuZ2V0UHJvdG8oTykpaWYodGhpcy5wcm90b3R5cGUgPT09IE8pcmV0dXJuIHRydWU7XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59fSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyICQgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgTkFNRSA9ICduYW1lJ1xyXG4gICwgc2V0RGVzYyA9ICQuc2V0RGVzY1xyXG4gICwgRnVuY3Rpb25Qcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcclxuLy8gMTkuMi40LjIgbmFtZVxyXG5OQU1FIGluIEZ1bmN0aW9uUHJvdG8gfHwgJC5GVyAmJiAkLkRFU0MgJiYgc2V0RGVzYyhGdW5jdGlvblByb3RvLCBOQU1FLCB7XHJcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBtYXRjaCA9IFN0cmluZyh0aGlzKS5tYXRjaCgvXlxccypmdW5jdGlvbiAoW14gKF0qKS8pXHJcbiAgICAgICwgbmFtZSAgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XHJcbiAgICAkLmhhcyh0aGlzLCBOQU1FKSB8fCBzZXREZXNjKHRoaXMsIE5BTUUsICQuZGVzYyg1LCBuYW1lKSk7XHJcbiAgICByZXR1cm4gbmFtZTtcclxuICB9LFxyXG4gIHNldDogZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgJC5oYXModGhpcywgTkFNRSkgfHwgc2V0RGVzYyh0aGlzLCBOQU1FLCAkLmRlc2MoMCwgdmFsdWUpKTtcclxuICB9XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tc3Ryb25nJyk7XHJcblxyXG4vLyAyMy4xIE1hcCBPYmplY3RzXHJcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ01hcCcsIHtcclxuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXHJcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcclxuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh0aGlzLCBrZXkpO1xyXG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XHJcbiAgfSxcclxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxyXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xyXG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xyXG4gIH1cclxufSwgc3Ryb25nLCB0cnVlKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIEluZmluaXR5ID0gMSAvIDBcclxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCBFICAgICA9IE1hdGguRVxyXG4gICwgcG93ICAgPSBNYXRoLnBvd1xyXG4gICwgYWJzICAgPSBNYXRoLmFic1xyXG4gICwgZXhwICAgPSBNYXRoLmV4cFxyXG4gICwgbG9nICAgPSBNYXRoLmxvZ1xyXG4gICwgc3FydCAgPSBNYXRoLnNxcnRcclxuICAsIGNlaWwgID0gTWF0aC5jZWlsXHJcbiAgLCBmbG9vciA9IE1hdGguZmxvb3JcclxuICAsIEVQU0lMT04gICA9IHBvdygyLCAtNTIpXHJcbiAgLCBFUFNJTE9OMzIgPSBwb3coMiwgLTIzKVxyXG4gICwgTUFYMzIgICAgID0gcG93KDIsIDEyNykgKiAoMiAtIEVQU0lMT04zMilcclxuICAsIE1JTjMyICAgICA9IHBvdygyLCAtMTI2KTtcclxuZnVuY3Rpb24gcm91bmRUaWVzVG9FdmVuKG4pe1xyXG4gIHJldHVybiBuICsgMSAvIEVQU0lMT04gLSAxIC8gRVBTSUxPTjtcclxufVxyXG5cclxuLy8gMjAuMi4yLjI4IE1hdGguc2lnbih4KVxyXG5mdW5jdGlvbiBzaWduKHgpe1xyXG4gIHJldHVybiAoeCA9ICt4KSA9PSAwIHx8IHggIT0geCA/IHggOiB4IDwgMCA/IC0xIDogMTtcclxufVxyXG4vLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXHJcbmZ1bmN0aW9uIGFzaW5oKHgpe1xyXG4gIHJldHVybiAhaXNGaW5pdGUoeCA9ICt4KSB8fCB4ID09IDAgPyB4IDogeCA8IDAgPyAtYXNpbmgoLXgpIDogbG9nKHggKyBzcXJ0KHggKiB4ICsgMSkpO1xyXG59XHJcbi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXHJcbmZ1bmN0aW9uIGV4cG0xKHgpe1xyXG4gIHJldHVybiAoeCA9ICt4KSA9PSAwID8geCA6IHggPiAtMWUtNiAmJiB4IDwgMWUtNiA/IHggKyB4ICogeCAvIDIgOiBleHAoeCkgLSAxO1xyXG59XHJcblxyXG4kZGVmKCRkZWYuUywgJ01hdGgnLCB7XHJcbiAgLy8gMjAuMi4yLjMgTWF0aC5hY29zaCh4KVxyXG4gIGFjb3NoOiBmdW5jdGlvbiBhY29zaCh4KXtcclxuICAgIHJldHVybiAoeCA9ICt4KSA8IDEgPyBOYU4gOiBpc0Zpbml0ZSh4KSA/IGxvZyh4IC8gRSArIHNxcnQoeCArIDEpICogc3FydCh4IC0gMSkgLyBFKSArIDEgOiB4O1xyXG4gIH0sXHJcbiAgLy8gMjAuMi4yLjUgTWF0aC5hc2luaCh4KVxyXG4gIGFzaW5oOiBhc2luaCxcclxuICAvLyAyMC4yLjIuNyBNYXRoLmF0YW5oKHgpXHJcbiAgYXRhbmg6IGZ1bmN0aW9uIGF0YW5oKHgpe1xyXG4gICAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogbG9nKCgxICsgeCkgLyAoMSAtIHgpKSAvIDI7XHJcbiAgfSxcclxuICAvLyAyMC4yLjIuOSBNYXRoLmNicnQoeClcclxuICBjYnJ0OiBmdW5jdGlvbiBjYnJ0KHgpe1xyXG4gICAgcmV0dXJuIHNpZ24oeCA9ICt4KSAqIHBvdyhhYnMoeCksIDEgLyAzKTtcclxuICB9LFxyXG4gIC8vIDIwLjIuMi4xMSBNYXRoLmNsejMyKHgpXHJcbiAgY2x6MzI6IGZ1bmN0aW9uIGNsejMyKHgpe1xyXG4gICAgcmV0dXJuICh4ID4+Pj0gMCkgPyAzMSAtIGZsb29yKGxvZyh4ICsgMC41KSAqIE1hdGguTE9HMkUpIDogMzI7XHJcbiAgfSxcclxuICAvLyAyMC4yLjIuMTIgTWF0aC5jb3NoKHgpXHJcbiAgY29zaDogZnVuY3Rpb24gY29zaCh4KXtcclxuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XHJcbiAgfSxcclxuICAvLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxyXG4gIGV4cG0xOiBleHBtMSxcclxuICAvLyAyMC4yLjIuMTYgTWF0aC5mcm91bmQoeClcclxuICBmcm91bmQ6IGZ1bmN0aW9uIGZyb3VuZCh4KXtcclxuICAgIHZhciAkYWJzICA9IGFicyh4KVxyXG4gICAgICAsICRzaWduID0gc2lnbih4KVxyXG4gICAgICAsIGEsIHJlc3VsdDtcclxuICAgIGlmKCRhYnMgPCBNSU4zMilyZXR1cm4gJHNpZ24gKiByb3VuZFRpZXNUb0V2ZW4oJGFicyAvIE1JTjMyIC8gRVBTSUxPTjMyKSAqIE1JTjMyICogRVBTSUxPTjMyO1xyXG4gICAgYSA9ICgxICsgRVBTSUxPTjMyIC8gRVBTSUxPTikgKiAkYWJzO1xyXG4gICAgcmVzdWx0ID0gYSAtIChhIC0gJGFicyk7XHJcbiAgICBpZihyZXN1bHQgPiBNQVgzMiB8fCByZXN1bHQgIT0gcmVzdWx0KXJldHVybiAkc2lnbiAqIEluZmluaXR5O1xyXG4gICAgcmV0dXJuICRzaWduICogcmVzdWx0O1xyXG4gIH0sXHJcbiAgLy8gMjAuMi4yLjE3IE1hdGguaHlwb3QoW3ZhbHVlMVssIHZhbHVlMlssIOKApiBdXV0pXHJcbiAgaHlwb3Q6IGZ1bmN0aW9uIGh5cG90KHZhbHVlMSwgdmFsdWUyKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgdmFyIHN1bSAgPSAwXHJcbiAgICAgICwgbGVuMSA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgICAgLCBsZW4yID0gbGVuMVxyXG4gICAgICAsIGFyZ3MgPSBBcnJheShsZW4xKVxyXG4gICAgICAsIGxhcmcgPSAtSW5maW5pdHlcclxuICAgICAgLCBhcmc7XHJcbiAgICB3aGlsZShsZW4xLS0pe1xyXG4gICAgICBhcmcgPSBhcmdzW2xlbjFdID0gK2FyZ3VtZW50c1tsZW4xXTtcclxuICAgICAgaWYoYXJnID09IEluZmluaXR5IHx8IGFyZyA9PSAtSW5maW5pdHkpcmV0dXJuIEluZmluaXR5O1xyXG4gICAgICBpZihhcmcgPiBsYXJnKWxhcmcgPSBhcmc7XHJcbiAgICB9XHJcbiAgICBsYXJnID0gYXJnIHx8IDE7XHJcbiAgICB3aGlsZShsZW4yLS0pc3VtICs9IHBvdyhhcmdzW2xlbjJdIC8gbGFyZywgMik7XHJcbiAgICByZXR1cm4gbGFyZyAqIHNxcnQoc3VtKTtcclxuICB9LFxyXG4gIC8vIDIwLjIuMi4xOCBNYXRoLmltdWwoeCwgeSlcclxuICBpbXVsOiBmdW5jdGlvbiBpbXVsKHgsIHkpe1xyXG4gICAgdmFyIFVJbnQxNiA9IDB4ZmZmZlxyXG4gICAgICAsIHhuID0gK3hcclxuICAgICAgLCB5biA9ICt5XHJcbiAgICAgICwgeGwgPSBVSW50MTYgJiB4blxyXG4gICAgICAsIHlsID0gVUludDE2ICYgeW47XHJcbiAgICByZXR1cm4gMCB8IHhsICogeWwgKyAoKFVJbnQxNiAmIHhuID4+PiAxNikgKiB5bCArIHhsICogKFVJbnQxNiAmIHluID4+PiAxNikgPDwgMTYgPj4+IDApO1xyXG4gIH0sXHJcbiAgLy8gMjAuMi4yLjIwIE1hdGgubG9nMXAoeClcclxuICBsb2cxcDogZnVuY3Rpb24gbG9nMXAoeCl7XHJcbiAgICByZXR1cm4gKHggPSAreCkgPiAtMWUtOCAmJiB4IDwgMWUtOCA/IHggLSB4ICogeCAvIDIgOiBsb2coMSArIHgpO1xyXG4gIH0sXHJcbiAgLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcclxuICBsb2cxMDogZnVuY3Rpb24gbG9nMTAoeCl7XHJcbiAgICByZXR1cm4gbG9nKHgpIC8gTWF0aC5MTjEwO1xyXG4gIH0sXHJcbiAgLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxyXG4gIGxvZzI6IGZ1bmN0aW9uIGxvZzIoeCl7XHJcbiAgICByZXR1cm4gbG9nKHgpIC8gTWF0aC5MTjI7XHJcbiAgfSxcclxuICAvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXHJcbiAgc2lnbjogc2lnbixcclxuICAvLyAyMC4yLjIuMzAgTWF0aC5zaW5oKHgpXHJcbiAgc2luaDogZnVuY3Rpb24gc2luaCh4KXtcclxuICAgIHJldHVybiBhYnMoeCA9ICt4KSA8IDEgPyAoZXhwbTEoeCkgLSBleHBtMSgteCkpIC8gMiA6IChleHAoeCAtIDEpIC0gZXhwKC14IC0gMSkpICogKEUgLyAyKTtcclxuICB9LFxyXG4gIC8vIDIwLjIuMi4zMyBNYXRoLnRhbmgoeClcclxuICB0YW5oOiBmdW5jdGlvbiB0YW5oKHgpe1xyXG4gICAgdmFyIGEgPSBleHBtMSh4ID0gK3gpXHJcbiAgICAgICwgYiA9IGV4cG0xKC14KTtcclxuICAgIHJldHVybiBhID09IEluZmluaXR5ID8gMSA6IGIgPT0gSW5maW5pdHkgPyAtMSA6IChhIC0gYikgLyAoZXhwKHgpICsgZXhwKC14KSk7XHJcbiAgfSxcclxuICAvLyAyMC4yLjIuMzQgTWF0aC50cnVuYyh4KVxyXG4gIHRydW5jOiBmdW5jdGlvbiB0cnVuYyhpdCl7XHJcbiAgICByZXR1cm4gKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xyXG4gIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGlzT2JqZWN0ICAgPSAkLmlzT2JqZWN0XHJcbiAgLCBpc0Z1bmN0aW9uID0gJC5pc0Z1bmN0aW9uXHJcbiAgLCBOVU1CRVIgICAgID0gJ051bWJlcidcclxuICAsICROdW1iZXIgICAgPSAkLmdbTlVNQkVSXVxyXG4gICwgQmFzZSAgICAgICA9ICROdW1iZXJcclxuICAsIHByb3RvICAgICAgPSAkTnVtYmVyLnByb3RvdHlwZTtcclxuZnVuY3Rpb24gdG9QcmltaXRpdmUoaXQpe1xyXG4gIHZhciBmbiwgdmFsO1xyXG4gIGlmKGlzRnVuY3Rpb24oZm4gPSBpdC52YWx1ZU9mKSAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XHJcbiAgaWYoaXNGdW5jdGlvbihmbiA9IGl0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XHJcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gbnVtYmVyXCIpO1xyXG59XHJcbmZ1bmN0aW9uIHRvTnVtYmVyKGl0KXtcclxuICBpZihpc09iamVjdChpdCkpaXQgPSB0b1ByaW1pdGl2ZShpdCk7XHJcbiAgaWYodHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIGl0Lmxlbmd0aCA+IDIgJiYgaXQuY2hhckNvZGVBdCgwKSA9PSA0OCl7XHJcbiAgICB2YXIgYmluYXJ5ID0gZmFsc2U7XHJcbiAgICBzd2l0Y2goaXQuY2hhckNvZGVBdCgxKSl7XHJcbiAgICAgIGNhc2UgNjYgOiBjYXNlIDk4ICA6IGJpbmFyeSA9IHRydWU7XHJcbiAgICAgIGNhc2UgNzkgOiBjYXNlIDExMSA6IHJldHVybiBwYXJzZUludChpdC5zbGljZSgyKSwgYmluYXJ5ID8gMiA6IDgpO1xyXG4gICAgfVxyXG4gIH0gcmV0dXJuICtpdDtcclxufVxyXG5pZigkLkZXICYmICEoJE51bWJlcignMG8xJykgJiYgJE51bWJlcignMGIxJykpKXtcclxuICAkTnVtYmVyID0gZnVuY3Rpb24gTnVtYmVyKGl0KXtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgJE51bWJlciA/IG5ldyBCYXNlKHRvTnVtYmVyKGl0KSkgOiB0b051bWJlcihpdCk7XHJcbiAgfTtcclxuICAkLmVhY2guY2FsbCgkLkRFU0MgPyAkLmdldE5hbWVzKEJhc2UpIDogKFxyXG4gICAgICAvLyBFUzM6XHJcbiAgICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcclxuICAgICAgLy8gRVM2IChpbiBjYXNlLCBpZiBtb2R1bGVzIHdpdGggRVM2IE51bWJlciBzdGF0aWNzIHJlcXVpcmVkIGJlZm9yZSk6XHJcbiAgICAgICdFUFNJTE9OLGlzRmluaXRlLGlzSW50ZWdlcixpc05hTixpc1NhZmVJbnRlZ2VyLE1BWF9TQUZFX0lOVEVHRVIsJyArXHJcbiAgICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyJ1xyXG4gICAgKS5zcGxpdCgnLCcpLCBmdW5jdGlvbihrZXkpe1xyXG4gICAgICBpZigkLmhhcyhCYXNlLCBrZXkpICYmICEkLmhhcygkTnVtYmVyLCBrZXkpKXtcclxuICAgICAgICAkLnNldERlc2MoJE51bWJlciwga2V5LCAkLmdldERlc2MoQmFzZSwga2V5KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApO1xyXG4gICROdW1iZXIucHJvdG90eXBlID0gcHJvdG87XHJcbiAgcHJvdG8uY29uc3RydWN0b3IgPSAkTnVtYmVyO1xyXG4gICQuaGlkZSgkLmcsIE5VTUJFUiwgJE51bWJlcik7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuY29uc3RydWN0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCBhYnMgICA9IE1hdGguYWJzXHJcbiAgLCBmbG9vciA9IE1hdGguZmxvb3JcclxuICAsIF9pc0Zpbml0ZSA9ICQuZy5pc0Zpbml0ZVxyXG4gICwgTUFYX1NBRkVfSU5URUdFUiA9IDB4MWZmZmZmZmZmZmZmZmY7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTE7XHJcbmZ1bmN0aW9uIGlzSW50ZWdlcihpdCl7XHJcbiAgcmV0dXJuICEkLmlzT2JqZWN0KGl0KSAmJiBfaXNGaW5pdGUoaXQpICYmIGZsb29yKGl0KSA9PT0gaXQ7XHJcbn1cclxuJGRlZigkZGVmLlMsICdOdW1iZXInLCB7XHJcbiAgLy8gMjAuMS4yLjEgTnVtYmVyLkVQU0lMT05cclxuICBFUFNJTE9OOiBNYXRoLnBvdygyLCAtNTIpLFxyXG4gIC8vIDIwLjEuMi4yIE51bWJlci5pc0Zpbml0ZShudW1iZXIpXHJcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcclxuICAgIHJldHVybiB0eXBlb2YgaXQgPT0gJ251bWJlcicgJiYgX2lzRmluaXRlKGl0KTtcclxuICB9LFxyXG4gIC8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxyXG4gIGlzSW50ZWdlcjogaXNJbnRlZ2VyLFxyXG4gIC8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXHJcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcil7XHJcbiAgICByZXR1cm4gbnVtYmVyICE9IG51bWJlcjtcclxuICB9LFxyXG4gIC8vIDIwLjEuMi41IE51bWJlci5pc1NhZmVJbnRlZ2VyKG51bWJlcilcclxuICBpc1NhZmVJbnRlZ2VyOiBmdW5jdGlvbiBpc1NhZmVJbnRlZ2VyKG51bWJlcil7XHJcbiAgICByZXR1cm4gaXNJbnRlZ2VyKG51bWJlcikgJiYgYWJzKG51bWJlcikgPD0gTUFYX1NBRkVfSU5URUdFUjtcclxuICB9LFxyXG4gIC8vIDIwLjEuMi42IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXHJcbiAgTUFYX1NBRkVfSU5URUdFUjogTUFYX1NBRkVfSU5URUdFUixcclxuICAvLyAyMC4xLjIuMTAgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVJcclxuICBNSU5fU0FGRV9JTlRFR0VSOiAtTUFYX1NBRkVfSU5URUdFUixcclxuICAvLyAyMC4xLjIuMTIgTnVtYmVyLnBhcnNlRmxvYXQoc3RyaW5nKVxyXG4gIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXHJcbiAgLy8gMjAuMS4yLjEzIE51bWJlci5wYXJzZUludChzdHJpbmcsIHJhZGl4KVxyXG4gIHBhcnNlSW50OiBwYXJzZUludFxyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuc3RhdGljcy5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxyXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcclxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDE5LjEuMy4xMCBPYmplY3QuaXModmFsdWUxLCB2YWx1ZTIpXHJcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xyXG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHtcclxuICBpczogZnVuY3Rpb24gaXMoeCwgeSl7XHJcbiAgICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcclxuICB9XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxyXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcclxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXR9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsIGlzT2JqZWN0ID0gJC5pc09iamVjdFxyXG4gICwgdG9PYmplY3QgPSAkLnRvT2JqZWN0O1xyXG5mdW5jdGlvbiB3cmFwT2JqZWN0TWV0aG9kKE1FVEhPRCwgTU9ERSl7XHJcbiAgdmFyIGZuICA9ICgkLmNvcmUuT2JqZWN0IHx8IHt9KVtNRVRIT0RdIHx8IE9iamVjdFtNRVRIT0RdXHJcbiAgICAsIGYgICA9IDBcclxuICAgICwgbyAgID0ge307XHJcbiAgb1tNRVRIT0RdID0gTU9ERSA9PSAxID8gZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xyXG4gIH0gOiBNT0RFID09IDIgPyBmdW5jdGlvbihpdCl7XHJcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogdHJ1ZTtcclxuICB9IDogTU9ERSA9PSAzID8gZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGZhbHNlO1xyXG4gIH0gOiBNT0RFID09IDQgPyBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XHJcbiAgICByZXR1cm4gZm4odG9PYmplY3QoaXQpLCBrZXkpO1xyXG4gIH0gOiBNT0RFID09IDUgPyBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XHJcbiAgICByZXR1cm4gZm4oT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZChpdCkpKTtcclxuICB9IDogZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGZuKHRvT2JqZWN0KGl0KSk7XHJcbiAgfTtcclxuICB0cnkge1xyXG4gICAgZm4oJ3onKTtcclxuICB9IGNhdGNoKGUpe1xyXG4gICAgZiA9IDE7XHJcbiAgfVxyXG4gICRkZWYoJGRlZi5TICsgJGRlZi5GICogZiwgJ09iamVjdCcsIG8pO1xyXG59XHJcbndyYXBPYmplY3RNZXRob2QoJ2ZyZWV6ZScsIDEpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdzZWFsJywgMSk7XHJcbndyYXBPYmplY3RNZXRob2QoJ3ByZXZlbnRFeHRlbnNpb25zJywgMSk7XHJcbndyYXBPYmplY3RNZXRob2QoJ2lzRnJvemVuJywgMik7XHJcbndyYXBPYmplY3RNZXRob2QoJ2lzU2VhbGVkJywgMik7XHJcbndyYXBPYmplY3RNZXRob2QoJ2lzRXh0ZW5zaWJsZScsIDMpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCA0KTtcclxud3JhcE9iamVjdE1ldGhvZCgnZ2V0UHJvdG90eXBlT2YnLCA1KTtcclxud3JhcE9iamVjdE1ldGhvZCgna2V5cycpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdnZXRPd25Qcm9wZXJ0eU5hbWVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcclxudmFyICQgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcclxuICAsIHRtcCA9IHt9O1xyXG50bXBbcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXSA9ICd6JztcclxuaWYoJC5GVyAmJiBjb2YodG1wKSAhPSAneicpJC5oaWRlKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XHJcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjb2YuY2xhc3NvZih0aGlzKSArICddJztcclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBjdHggICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxyXG4gICwgY29mICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcclxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCBhc3NlcnQgICA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKVxyXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcclxuICAsIHNldFByb3RvID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldFxyXG4gICwgc3BlY2llcyAgPSByZXF1aXJlKCcuLyQuc3BlY2llcycpXHJcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXHJcbiAgLCBSRUNPUkQgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdyZWNvcmQnKVxyXG4gICwgUFJPTUlTRSAgPSAnUHJvbWlzZSdcclxuICAsIGdsb2JhbCAgID0gJC5nXHJcbiAgLCBwcm9jZXNzICA9IGdsb2JhbC5wcm9jZXNzXHJcbiAgLCBhc2FwICAgICA9IHByb2Nlc3MgJiYgcHJvY2Vzcy5uZXh0VGljayB8fCByZXF1aXJlKCcuLyQudGFzaycpLnNldFxyXG4gICwgUCAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cclxuICAsIGlzRnVuY3Rpb24gICAgID0gJC5pc0Z1bmN0aW9uXHJcbiAgLCBpc09iamVjdCAgICAgICA9ICQuaXNPYmplY3RcclxuICAsIGFzc2VydEZ1bmN0aW9uID0gYXNzZXJ0LmZuXHJcbiAgLCBhc3NlcnRPYmplY3QgICA9IGFzc2VydC5vYmo7XHJcblxyXG52YXIgdXNlTmF0aXZlID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdGVzdCwgd29ya3MgPSBmYWxzZTtcclxuICBmdW5jdGlvbiBQMih4KXtcclxuICAgIHZhciBzZWxmID0gbmV3IFAoeCk7XHJcbiAgICBzZXRQcm90byhzZWxmLCBQMi5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIHNlbGY7XHJcbiAgfVxyXG4gIHRyeSB7XHJcbiAgICB3b3JrcyA9IGlzRnVuY3Rpb24oUCkgJiYgaXNGdW5jdGlvbihQLnJlc29sdmUpICYmIFAucmVzb2x2ZSh0ZXN0ID0gbmV3IFAoZnVuY3Rpb24oKXt9KSkgPT0gdGVzdDtcclxuICAgIHNldFByb3RvKFAyLCBQKTtcclxuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XHJcbiAgICAvLyBhY3R1YWwgRmlyZWZveCBoYXMgYnJva2VuIHN1YmNsYXNzIHN1cHBvcnQsIHRlc3QgdGhhdFxyXG4gICAgaWYoIShQMi5yZXNvbHZlKDUpLnRoZW4oZnVuY3Rpb24oKXt9KSBpbnN0YW5jZW9mIFAyKSl7XHJcbiAgICAgIHdvcmtzID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSBjYXRjaChlKXsgd29ya3MgPSBmYWxzZTsgfVxyXG4gIHJldHVybiB3b3JrcztcclxufSgpO1xyXG5cclxuLy8gaGVscGVyc1xyXG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvcihDKXtcclxuICB2YXIgUyA9IGFzc2VydE9iamVjdChDKVtTUEVDSUVTXTtcclxuICByZXR1cm4gUyAhPSB1bmRlZmluZWQgPyBTIDogQztcclxufVxyXG5mdW5jdGlvbiBpc1RoZW5hYmxlKGl0KXtcclxuICB2YXIgdGhlbjtcclxuICBpZihpc09iamVjdChpdCkpdGhlbiA9IGl0LnRoZW47XHJcbiAgcmV0dXJuIGlzRnVuY3Rpb24odGhlbikgPyB0aGVuIDogZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gbm90aWZ5KHJlY29yZCl7XHJcbiAgdmFyIGNoYWluID0gcmVjb3JkLmM7XHJcbiAgaWYoY2hhaW4ubGVuZ3RoKWFzYXAoZnVuY3Rpb24oKXtcclxuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XHJcbiAgICAgICwgb2sgICAgPSByZWNvcmQucyA9PSAxXHJcbiAgICAgICwgaSAgICAgPSAwO1xyXG4gICAgZnVuY3Rpb24gcnVuKHJlYWN0KXtcclxuICAgICAgdmFyIGNiID0gb2sgPyByZWFjdC5vayA6IHJlYWN0LmZhaWxcclxuICAgICAgICAsIHJldCwgdGhlbjtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xyXG4gICAgICAgICAgcmV0ID0gY2IgPT09IHRydWUgPyB2YWx1ZSA6IGNiKHZhbHVlKTtcclxuICAgICAgICAgIGlmKHJldCA9PT0gcmVhY3QuUCl7XHJcbiAgICAgICAgICAgIHJlYWN0LnJlaihUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmV0KSl7XHJcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXQsIHJlYWN0LnJlcywgcmVhY3QucmVqKTtcclxuICAgICAgICAgIH0gZWxzZSByZWFjdC5yZXMocmV0KTtcclxuICAgICAgICB9IGVsc2UgcmVhY3QucmVqKHZhbHVlKTtcclxuICAgICAgfSBjYXRjaChlcnIpe1xyXG4gICAgICAgIHJlYWN0LnJlaihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcclxuICAgIGNoYWluLmxlbmd0aCA9IDA7XHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaXNVbmhhbmRsZWQocHJvbWlzZSl7XHJcbiAgdmFyIHJlY29yZCA9IHByb21pc2VbUkVDT1JEXVxyXG4gICAgLCBjaGFpbiAgPSByZWNvcmQuYSB8fCByZWNvcmQuY1xyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlYWN0O1xyXG4gIGlmKHJlY29yZC5oKXJldHVybiBmYWxzZTtcclxuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcclxuICAgIHJlYWN0ID0gY2hhaW5baSsrXTtcclxuICAgIGlmKHJlYWN0LmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0LlApKXJldHVybiBmYWxzZTtcclxuICB9IHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uICRyZWplY3QodmFsdWUpe1xyXG4gIHZhciByZWNvcmQgPSB0aGlzXHJcbiAgICAsIHByb21pc2U7XHJcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xyXG4gIHJlY29yZC5kID0gdHJ1ZTtcclxuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxyXG4gIHJlY29yZC52ID0gdmFsdWU7XHJcbiAgcmVjb3JkLnMgPSAyO1xyXG4gIHJlY29yZC5hID0gcmVjb3JkLmMuc2xpY2UoKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBhc2FwKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UgPSByZWNvcmQucCkpe1xyXG4gICAgICAgIGlmKGNvZihwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xyXG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGdsb2JhbC5jb25zb2xlICYmIGlzRnVuY3Rpb24oY29uc29sZS5lcnJvcikpe1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZWNvcmQuYSA9IHVuZGVmaW5lZDtcclxuICAgIH0pO1xyXG4gIH0sIDEpO1xyXG4gIG5vdGlmeShyZWNvcmQpO1xyXG59XHJcbmZ1bmN0aW9uICRyZXNvbHZlKHZhbHVlKXtcclxuICB2YXIgcmVjb3JkID0gdGhpc1xyXG4gICAgLCB0aGVuLCB3cmFwcGVyO1xyXG4gIGlmKHJlY29yZC5kKXJldHVybjtcclxuICByZWNvcmQuZCA9IHRydWU7XHJcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcclxuICB0cnkge1xyXG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcclxuICAgICAgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxyXG4gICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xyXG4gICAgICByZWNvcmQucyA9IDE7XHJcbiAgICAgIG5vdGlmeShyZWNvcmQpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2goZXJyKXtcclxuICAgICRyZWplY3QuY2FsbCh3cmFwcGVyIHx8IHtyOiByZWNvcmQsIGQ6IGZhbHNlfSwgZXJyKTsgLy8gd3JhcFxyXG4gIH1cclxufVxyXG5cclxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcclxuaWYoIXVzZU5hdGl2ZSl7XHJcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcclxuICBQID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XHJcbiAgICBhc3NlcnRGdW5jdGlvbihleGVjdXRvcik7XHJcbiAgICB2YXIgcmVjb3JkID0ge1xyXG4gICAgICBwOiBhc3NlcnQuaW5zdCh0aGlzLCBQLCBQUk9NSVNFKSwgICAgICAgLy8gPC0gcHJvbWlzZVxyXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXHJcbiAgICAgIGE6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xyXG4gICAgICBzOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcclxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcclxuICAgICAgdjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXHJcbiAgICAgIGg6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBoYW5kbGVkIHJlamVjdGlvblxyXG4gICAgfTtcclxuICAgICQuaGlkZSh0aGlzLCBSRUNPUkQsIHJlY29yZCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcclxuICAgIH0gY2F0Y2goZXJyKXtcclxuICAgICAgJHJlamVjdC5jYWxsKHJlY29yZCwgZXJyKTtcclxuICAgIH1cclxuICB9O1xyXG4gICQubWl4KFAucHJvdG90eXBlLCB7XHJcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxyXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XHJcbiAgICAgIHZhciBTID0gYXNzZXJ0T2JqZWN0KGFzc2VydE9iamVjdCh0aGlzKS5jb25zdHJ1Y3RvcilbU1BFQ0lFU107XHJcbiAgICAgIHZhciByZWFjdCA9IHtcclxuICAgICAgICBvazogICBpc0Z1bmN0aW9uKG9uRnVsZmlsbGVkKSA/IG9uRnVsZmlsbGVkIDogdHJ1ZSxcclxuICAgICAgICBmYWlsOiBpc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpICA/IG9uUmVqZWN0ZWQgIDogZmFsc2VcclxuICAgICAgfTtcclxuICAgICAgdmFyIHByb21pc2UgPSByZWFjdC5QID0gbmV3IChTICE9IHVuZGVmaW5lZCA/IFMgOiBQKShmdW5jdGlvbihyZXMsIHJlail7XHJcbiAgICAgICAgcmVhY3QucmVzID0gYXNzZXJ0RnVuY3Rpb24ocmVzKTtcclxuICAgICAgICByZWFjdC5yZWogPSBhc3NlcnRGdW5jdGlvbihyZWopO1xyXG4gICAgICB9KTtcclxuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcclxuICAgICAgcmVjb3JkLmMucHVzaChyZWFjdCk7XHJcbiAgICAgIGlmKHJlY29yZC5hKXJlY29yZC5hLnB1c2gocmVhY3QpO1xyXG4gICAgICByZWNvcmQucyAmJiBub3RpZnkocmVjb3JkKTtcclxuICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9LFxyXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcclxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xyXG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGV4cG9ydFxyXG4kZGVmKCRkZWYuRyArICRkZWYuVyArICRkZWYuRiAqICF1c2VOYXRpdmUsIHtQcm9taXNlOiBQfSk7XHJcbmNvZi5zZXQoUCwgUFJPTUlTRSk7XHJcbnNwZWNpZXMoUCk7XHJcbnNwZWNpZXMoJC5jb3JlW1BST01JU0VdKTsgLy8gZm9yIHdyYXBwZXJcclxuXHJcbi8vIHN0YXRpY3NcclxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCBQUk9NSVNFLCB7XHJcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcclxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcclxuICAgIHJldHVybiBuZXcgKGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXMsIHJlail7XHJcbiAgICAgIHJlaihyKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXHJcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KXtcclxuICAgIHJldHVybiBpc09iamVjdCh4KSAmJiBSRUNPUkQgaW4geCAmJiAkLmdldFByb3RvKHgpID09PSB0aGlzLnByb3RvdHlwZVxyXG4gICAgICA/IHggOiBuZXcgKGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHJlcyh4KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59KTtcclxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhKHVzZU5hdGl2ZSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcclxuICBQLmFsbChpdGVyKVsnY2F0Y2gnXShmdW5jdGlvbigpe30pO1xyXG59KSksIFBST01JU0UsIHtcclxuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcclxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XHJcbiAgICB2YXIgQyAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcclxuICAgICAgLCB2YWx1ZXMgPSBbXTtcclxuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XHJcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XHJcbiAgICAgIHZhciByZW1haW5pbmcgPSB2YWx1ZXMubGVuZ3RoXHJcbiAgICAgICAgLCByZXN1bHRzICAgPSBBcnJheShyZW1haW5pbmcpO1xyXG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XHJcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlcyhyZXN1bHRzKTtcclxuICAgICAgICB9LCByZWopO1xyXG4gICAgICB9KTtcclxuICAgICAgZWxzZSByZXMocmVzdWx0cyk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcclxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcclxuICAgIHZhciBDID0gZ2V0Q29uc3RydWN0b3IodGhpcyk7XHJcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xyXG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xyXG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKHJlcywgcmVqKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCAkZGVmICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsIHNldFByb3RvICA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKVxyXG4gICwgJGl0ZXIgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKVxyXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXHJcbiAgLCBJVEVSICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgnaXRlcicpXHJcbiAgLCBzdGVwICAgICAgPSAkaXRlci5zdGVwXHJcbiAgLCBhc3NlcnQgICAgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JylcclxuICAsIGlzT2JqZWN0ICA9ICQuaXNPYmplY3RcclxuICAsIGdldFByb3RvICA9ICQuZ2V0UHJvdG9cclxuICAsICRSZWZsZWN0ICA9ICQuZy5SZWZsZWN0XHJcbiAgLCBfYXBwbHkgICAgPSBGdW5jdGlvbi5hcHBseVxyXG4gICwgYXNzZXJ0T2JqZWN0ID0gYXNzZXJ0Lm9ialxyXG4gICwgX2lzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgJC5pc09iamVjdFxyXG4gICwgX3ByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zIHx8ICQuaXRcclxuICAvLyBJRSBUUCBoYXMgYnJva2VuIFJlZmxlY3QuZW51bWVyYXRlXHJcbiAgLCBidWdneUVudW1lcmF0ZSA9ICEoJFJlZmxlY3QgJiYgJFJlZmxlY3QuZW51bWVyYXRlICYmIElURVJBVE9SIGluICRSZWZsZWN0LmVudW1lcmF0ZSh7fSkpO1xyXG5cclxuZnVuY3Rpb24gRW51bWVyYXRlKGl0ZXJhdGVkKXtcclxuICAkLnNldCh0aGlzLCBJVEVSLCB7bzogaXRlcmF0ZWQsIGs6IHVuZGVmaW5lZCwgaTogMH0pO1xyXG59XHJcbiRpdGVyLmNyZWF0ZShFbnVtZXJhdGUsICdPYmplY3QnLCBmdW5jdGlvbigpe1xyXG4gIHZhciBpdGVyID0gdGhpc1tJVEVSXVxyXG4gICAgLCBrZXlzID0gaXRlci5rXHJcbiAgICAsIGtleTtcclxuICBpZihrZXlzID09IHVuZGVmaW5lZCl7XHJcbiAgICBpdGVyLmsgPSBrZXlzID0gW107XHJcbiAgICBmb3Ioa2V5IGluIGl0ZXIubylrZXlzLnB1c2goa2V5KTtcclxuICB9XHJcbiAgZG8ge1xyXG4gICAgaWYoaXRlci5pID49IGtleXMubGVuZ3RoKXJldHVybiBzdGVwKDEpO1xyXG4gIH0gd2hpbGUoISgoa2V5ID0ga2V5c1tpdGVyLmkrK10pIGluIGl0ZXIubykpO1xyXG4gIHJldHVybiBzdGVwKDAsIGtleSk7XHJcbn0pO1xyXG5cclxudmFyIHJlZmxlY3QgPSB7XHJcbiAgLy8gMjYuMS4xIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpXHJcbiAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KXtcclxuICAgIHJldHVybiBfYXBwbHkuY2FsbCh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdCk7XHJcbiAgfSxcclxuICAvLyAyNi4xLjIgUmVmbGVjdC5jb25zdHJ1Y3QodGFyZ2V0LCBhcmd1bWVudHNMaXN0IFssIG5ld1RhcmdldF0pXHJcbiAgY29uc3RydWN0OiBmdW5jdGlvbiBjb25zdHJ1Y3QodGFyZ2V0LCBhcmd1bWVudHNMaXN0IC8qLCBuZXdUYXJnZXQqLyl7XHJcbiAgICB2YXIgcHJvdG8gICAgPSBhc3NlcnQuZm4oYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB0YXJnZXQgOiBhcmd1bWVudHNbMl0pLnByb3RvdHlwZVxyXG4gICAgICAsIGluc3RhbmNlID0gJC5jcmVhdGUoaXNPYmplY3QocHJvdG8pID8gcHJvdG8gOiBPYmplY3QucHJvdG90eXBlKVxyXG4gICAgICAsIHJlc3VsdCAgID0gX2FwcGx5LmNhbGwodGFyZ2V0LCBpbnN0YW5jZSwgYXJndW1lbnRzTGlzdCk7XHJcbiAgICByZXR1cm4gaXNPYmplY3QocmVzdWx0KSA/IHJlc3VsdCA6IGluc3RhbmNlO1xyXG4gIH0sXHJcbiAgLy8gMjYuMS4zIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcylcclxuICBkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyl7XHJcbiAgICBhc3NlcnRPYmplY3QodGFyZ2V0KTtcclxuICAgIHRyeSB7XHJcbiAgICAgICQuc2V0RGVzYyh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoKGUpe1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyAyNi4xLjQgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KVxyXG4gIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KXtcclxuICAgIHZhciBkZXNjID0gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XHJcbiAgICByZXR1cm4gZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUgPyBmYWxzZSA6IGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlLZXldO1xyXG4gIH0sXHJcbiAgLy8gMjYuMS42IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkgWywgcmVjZWl2ZXJdKVxyXG4gIGdldDogZnVuY3Rpb24gZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkvKiwgcmVjZWl2ZXIqLyl7XHJcbiAgICB2YXIgcmVjZWl2ZXIgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHRhcmdldCA6IGFyZ3VtZW50c1syXVxyXG4gICAgICAsIGRlc2MgPSAkLmdldERlc2MoYXNzZXJ0T2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KSwgcHJvdG87XHJcbiAgICBpZihkZXNjKXJldHVybiAkLmhhcyhkZXNjLCAndmFsdWUnKVxyXG4gICAgICA/IGRlc2MudmFsdWVcclxuICAgICAgOiBkZXNjLmdldCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICA6IGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpO1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG8odGFyZ2V0KSlcclxuICAgICAgPyBnZXQocHJvdG8sIHByb3BlcnR5S2V5LCByZWNlaXZlcilcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgfSxcclxuICAvLyAyNi4xLjcgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSlcclxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KXtcclxuICAgIHJldHVybiAkLmdldERlc2MoYXNzZXJ0T2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KTtcclxuICB9LFxyXG4gIC8vIDI2LjEuOCBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClcclxuICBnZXRQcm90b3R5cGVPZjogZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KXtcclxuICAgIHJldHVybiBnZXRQcm90byhhc3NlcnRPYmplY3QodGFyZ2V0KSk7XHJcbiAgfSxcclxuICAvLyAyNi4xLjkgUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eUtleSlcclxuICBoYXM6IGZ1bmN0aW9uIGhhcyh0YXJnZXQsIHByb3BlcnR5S2V5KXtcclxuICAgIHJldHVybiBwcm9wZXJ0eUtleSBpbiB0YXJnZXQ7XHJcbiAgfSxcclxuICAvLyAyNi4xLjEwIFJlZmxlY3QuaXNFeHRlbnNpYmxlKHRhcmdldClcclxuICBpc0V4dGVuc2libGU6IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZSh0YXJnZXQpe1xyXG4gICAgcmV0dXJuIF9pc0V4dGVuc2libGUoYXNzZXJ0T2JqZWN0KHRhcmdldCkpO1xyXG4gIH0sXHJcbiAgLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxyXG4gIG93bktleXM6IHJlcXVpcmUoJy4vJC5vd24ta2V5cycpLFxyXG4gIC8vIDI2LjEuMTIgUmVmbGVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpXHJcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCl7XHJcbiAgICBhc3NlcnRPYmplY3QodGFyZ2V0KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIF9wcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIDI2LjEuMTMgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgViBbLCByZWNlaXZlcl0pXHJcbiAgc2V0OiBmdW5jdGlvbiBzZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgVi8qLCByZWNlaXZlciovKXtcclxuICAgIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCA0ID8gdGFyZ2V0IDogYXJndW1lbnRzWzNdXHJcbiAgICAgICwgb3duRGVzYyAgPSAkLmdldERlc2MoYXNzZXJ0T2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KVxyXG4gICAgICAsIGV4aXN0aW5nRGVzY3JpcHRvciwgcHJvdG87XHJcbiAgICBpZighb3duRGVzYyl7XHJcbiAgICAgIGlmKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG8odGFyZ2V0KSkpe1xyXG4gICAgICAgIHJldHVybiBzZXQocHJvdG8sIHByb3BlcnR5S2V5LCBWLCByZWNlaXZlcik7XHJcbiAgICAgIH1cclxuICAgICAgb3duRGVzYyA9ICQuZGVzYygwKTtcclxuICAgIH1cclxuICAgIGlmKCQuaGFzKG93bkRlc2MsICd2YWx1ZScpKXtcclxuICAgICAgaWYob3duRGVzYy53cml0YWJsZSA9PT0gZmFsc2UgfHwgIWlzT2JqZWN0KHJlY2VpdmVyKSlyZXR1cm4gZmFsc2U7XHJcbiAgICAgIGV4aXN0aW5nRGVzY3JpcHRvciA9ICQuZ2V0RGVzYyhyZWNlaXZlciwgcHJvcGVydHlLZXkpIHx8ICQuZGVzYygwKTtcclxuICAgICAgZXhpc3RpbmdEZXNjcmlwdG9yLnZhbHVlID0gVjtcclxuICAgICAgJC5zZXREZXNjKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSwgZXhpc3RpbmdEZXNjcmlwdG9yKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3duRGVzYy5zZXQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogKG93bkRlc2Muc2V0LmNhbGwocmVjZWl2ZXIsIFYpLCB0cnVlKTtcclxuICB9XHJcbn07XHJcbi8vIDI2LjEuMTQgUmVmbGVjdC5zZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKVxyXG5pZihzZXRQcm90bylyZWZsZWN0LnNldFByb3RvdHlwZU9mID0gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90byl7XHJcbiAgc2V0UHJvdG8uY2hlY2sodGFyZ2V0LCBwcm90byk7XHJcbiAgdHJ5IHtcclxuICAgIHNldFByb3RvLnNldCh0YXJnZXQsIHByb3RvKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gY2F0Y2goZSl7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuJGRlZigkZGVmLkcsIHtSZWZsZWN0OiB7fX0pO1xyXG5cclxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiBidWdneUVudW1lcmF0ZSwgJ1JlZmxlY3QnLCB7XHJcbiAgLy8gMjYuMS41IFJlZmxlY3QuZW51bWVyYXRlKHRhcmdldClcclxuICBlbnVtZXJhdGU6IGZ1bmN0aW9uIGVudW1lcmF0ZSh0YXJnZXQpe1xyXG4gICAgcmV0dXJuIG5ldyBFbnVtZXJhdGUoYXNzZXJ0T2JqZWN0KHRhcmdldCkpO1xyXG4gIH1cclxufSk7XHJcblxyXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCByZWZsZWN0KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGNvZiAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcclxuICAsICRSZWdFeHAgPSAkLmcuUmVnRXhwXHJcbiAgLCBCYXNlICAgID0gJFJlZ0V4cFxyXG4gICwgcHJvdG8gICA9ICRSZWdFeHAucHJvdG90eXBlXHJcbiAgLCByZSAgICAgID0gL2EvZ1xyXG4gIC8vIFwibmV3XCIgY3JlYXRlcyBhIG5ldyBvYmplY3RcclxuICAsIENPUlJFQ1RfTkVXID0gbmV3ICRSZWdFeHAocmUpICE9PSByZVxyXG4gIC8vIFJlZ0V4cCBhbGxvd3MgYSByZWdleCB3aXRoIGZsYWdzIGFzIHRoZSBwYXR0ZXJuXHJcbiAgLCBBTExPV1NfUkVfV0lUSF9GTEFHUyA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gJFJlZ0V4cChyZSwgJ2knKSA9PSAnL2EvaSc7XHJcbiAgICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XHJcbiAgfSgpO1xyXG5pZigkLkZXICYmICQuREVTQyl7XHJcbiAgaWYoIUNPUlJFQ1RfTkVXIHx8ICFBTExPV1NfUkVfV0lUSF9GTEFHUyl7XHJcbiAgICAkUmVnRXhwID0gZnVuY3Rpb24gUmVnRXhwKHBhdHRlcm4sIGZsYWdzKXtcclxuICAgICAgdmFyIHBhdHRlcm5Jc1JlZ0V4cCAgPSBjb2YocGF0dGVybikgPT0gJ1JlZ0V4cCdcclxuICAgICAgICAsIGZsYWdzSXNVbmRlZmluZWQgPSBmbGFncyA9PT0gdW5kZWZpbmVkO1xyXG4gICAgICBpZighKHRoaXMgaW5zdGFuY2VvZiAkUmVnRXhwKSAmJiBwYXR0ZXJuSXNSZWdFeHAgJiYgZmxhZ3NJc1VuZGVmaW5lZClyZXR1cm4gcGF0dGVybjtcclxuICAgICAgcmV0dXJuIENPUlJFQ1RfTkVXXHJcbiAgICAgICAgPyBuZXcgQmFzZShwYXR0ZXJuSXNSZWdFeHAgJiYgIWZsYWdzSXNVbmRlZmluZWQgPyBwYXR0ZXJuLnNvdXJjZSA6IHBhdHRlcm4sIGZsYWdzKVxyXG4gICAgICAgIDogbmV3IEJhc2UocGF0dGVybklzUmVnRXhwID8gcGF0dGVybi5zb3VyY2UgOiBwYXR0ZXJuXHJcbiAgICAgICAgICAsIHBhdHRlcm5Jc1JlZ0V4cCAmJiBmbGFnc0lzVW5kZWZpbmVkID8gcGF0dGVybi5mbGFncyA6IGZsYWdzKTtcclxuICAgIH07XHJcbiAgICAkLmVhY2guY2FsbCgkLmdldE5hbWVzKEJhc2UpLCBmdW5jdGlvbihrZXkpe1xyXG4gICAgICBrZXkgaW4gJFJlZ0V4cCB8fCAkLnNldERlc2MoJFJlZ0V4cCwga2V5LCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIEJhc2Vba2V5XTsgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGl0KXsgQmFzZVtrZXldID0gaXQ7IH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gJFJlZ0V4cDtcclxuICAgICRSZWdFeHAucHJvdG90eXBlID0gcHJvdG87XHJcbiAgICAkLmhpZGUoJC5nLCAnUmVnRXhwJywgJFJlZ0V4cCk7XHJcbiAgfVxyXG4gIC8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzKClcclxuICBpZigvLi9nLmZsYWdzICE9ICdnJykkLnNldERlc2MocHJvdG8sICdmbGFncycsIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldDogcmVxdWlyZSgnLi8kLnJlcGxhY2VyJykoL14uKlxcLyhcXHcqKSQvLCAnJDEnKVxyXG4gIH0pO1xyXG59XHJcbnJlcXVpcmUoJy4vJC5zcGVjaWVzJykoJFJlZ0V4cCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXN0cm9uZycpO1xyXG5cclxuLy8gMjMuMiBTZXQgT2JqZWN0c1xyXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdTZXQnLCB7XHJcbiAgLy8gMjMuMi4zLjEgU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXHJcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpe1xyXG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xyXG4gIH1cclxufSwgc3Ryb25nKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zZXQuanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKShmYWxzZSk7XHJcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xyXG4gIC8vIDIxLjEuMy4zIFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQocG9zKVxyXG4gIGNvZGVQb2ludEF0OiBmdW5jdGlvbiBjb2RlUG9pbnRBdChwb3Mpe1xyXG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xyXG4gIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBjb2YgID0gcmVxdWlyZSgnLi8kLmNvZicpXHJcbiAgLCAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCB0b0xlbmd0aCA9ICQudG9MZW5ndGg7XHJcblxyXG4vLyBzaG91bGQgdGhyb3cgZXJyb3Igb24gcmVnZXhcclxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLnRocm93cycpKGZ1bmN0aW9uKCl7ICdxJy5lbmRzV2l0aCgvLi8pOyB9KSwgJ1N0cmluZycsIHtcclxuICAvLyAyMS4xLjMuNiBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKHNlYXJjaFN0cmluZyBbLCBlbmRQb3NpdGlvbl0pXHJcbiAgZW5kc1dpdGg6IGZ1bmN0aW9uIGVuZHNXaXRoKHNlYXJjaFN0cmluZyAvKiwgZW5kUG9zaXRpb24gPSBAbGVuZ3RoICovKXtcclxuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xyXG4gICAgdmFyIHRoYXQgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxyXG4gICAgICAsIGVuZFBvc2l0aW9uID0gYXJndW1lbnRzWzFdXHJcbiAgICAgICwgbGVuID0gdG9MZW5ndGgodGhhdC5sZW5ndGgpXHJcbiAgICAgICwgZW5kID0gZW5kUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IGxlbiA6IE1hdGgubWluKHRvTGVuZ3RoKGVuZFBvc2l0aW9uKSwgbGVuKTtcclxuICAgIHNlYXJjaFN0cmluZyArPSAnJztcclxuICAgIHJldHVybiB0aGF0LnNsaWNlKGVuZCAtIHNlYXJjaFN0cmluZy5sZW5ndGgsIGVuZCkgPT09IHNlYXJjaFN0cmluZztcclxuICB9XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRkZWYgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsIHRvSW5kZXggPSByZXF1aXJlKCcuLyQnKS50b0luZGV4XHJcbiAgLCBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlXHJcbiAgLCAkZnJvbUNvZGVQb2ludCA9IFN0cmluZy5mcm9tQ29kZVBvaW50O1xyXG5cclxuLy8gbGVuZ3RoIHNob3VsZCBiZSAxLCBvbGQgRkYgcHJvYmxlbVxyXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICghISRmcm9tQ29kZVBvaW50ICYmICRmcm9tQ29kZVBvaW50Lmxlbmd0aCAhPSAxKSwgJ1N0cmluZycsIHtcclxuICAvLyAyMS4xLjIuMiBTdHJpbmcuZnJvbUNvZGVQb2ludCguLi5jb2RlUG9pbnRzKVxyXG4gIGZyb21Db2RlUG9pbnQ6IGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoeCl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgIHZhciByZXMgPSBbXVxyXG4gICAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgICAgLCBpICAgPSAwXHJcbiAgICAgICwgY29kZTtcclxuICAgIHdoaWxlKGxlbiA+IGkpe1xyXG4gICAgICBjb2RlID0gK2FyZ3VtZW50c1tpKytdO1xyXG4gICAgICBpZih0b0luZGV4KGNvZGUsIDB4MTBmZmZmKSAhPT0gY29kZSl0aHJvdyBSYW5nZUVycm9yKGNvZGUgKyAnIGlzIG5vdCBhIHZhbGlkIGNvZGUgcG9pbnQnKTtcclxuICAgICAgcmVzLnB1c2goY29kZSA8IDB4MTAwMDBcclxuICAgICAgICA/IGZyb21DaGFyQ29kZShjb2RlKVxyXG4gICAgICAgIDogZnJvbUNoYXJDb2RlKCgoY29kZSAtPSAweDEwMDAwKSA+PiAxMCkgKyAweGQ4MDAsIGNvZGUgJSAweDQwMCArIDB4ZGMwMClcclxuICAgICAgKTtcclxuICAgIH0gcmV0dXJuIHJlcy5qb2luKCcnKTtcclxuICB9XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBjb2YgID0gcmVxdWlyZSgnLi8kLmNvZicpXHJcbiAgLCAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xyXG5cclxuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XHJcbiAgLy8gMjEuMS4zLjcgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcsIHBvc2l0aW9uID0gMClcclxuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xyXG4gICAgaWYoY29mKHNlYXJjaFN0cmluZykgPT0gJ1JlZ0V4cCcpdGhyb3cgVHlwZUVycm9yKCk7XHJcbiAgICByZXR1cm4gISF+U3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSkuaW5kZXhPZihzZWFyY2hTdHJpbmcsIGFyZ3VtZW50c1sxXSk7XHJcbiAgfVxyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaW5jbHVkZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNldCAgID0gcmVxdWlyZSgnLi8kJykuc2V0XHJcbiAgLCAkYXQgICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKVxyXG4gICwgSVRFUiAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgnaXRlcicpXHJcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJylcclxuICAsIHN0ZXAgID0gJGl0ZXIuc3RlcDtcclxuXHJcbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcclxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xyXG4gIHNldCh0aGlzLCBJVEVSLCB7bzogU3RyaW5nKGl0ZXJhdGVkKSwgaTogMH0pO1xyXG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXHJcbn0sIGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGl0ZXIgID0gdGhpc1tJVEVSXVxyXG4gICAgLCBPICAgICA9IGl0ZXIub1xyXG4gICAgLCBpbmRleCA9IGl0ZXIuaVxyXG4gICAgLCBwb2ludDtcclxuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4gc3RlcCgxKTtcclxuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XHJcbiAgaXRlci5pICs9IHBvaW50Lmxlbmd0aDtcclxuICByZXR1cm4gc3RlcCgwLCBwb2ludCk7XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xyXG5cclxuJGRlZigkZGVmLlMsICdTdHJpbmcnLCB7XHJcbiAgLy8gMjEuMS4yLjQgU3RyaW5nLnJhdyhjYWxsU2l0ZSwgLi4uc3Vic3RpdHV0aW9ucylcclxuICByYXc6IGZ1bmN0aW9uIHJhdyhjYWxsU2l0ZSl7XHJcbiAgICB2YXIgdHBsID0gJC50b09iamVjdChjYWxsU2l0ZS5yYXcpXHJcbiAgICAgICwgbGVuID0gJC50b0xlbmd0aCh0cGwubGVuZ3RoKVxyXG4gICAgICAsIHNsbiA9IGFyZ3VtZW50cy5sZW5ndGhcclxuICAgICAgLCByZXMgPSBbXVxyXG4gICAgICAsIGkgICA9IDA7XHJcbiAgICB3aGlsZShsZW4gPiBpKXtcclxuICAgICAgcmVzLnB1c2goU3RyaW5nKHRwbFtpKytdKSk7XHJcbiAgICAgIGlmKGkgPCBzbG4pcmVzLnB1c2goU3RyaW5nKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xyXG4gIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJhdy5qc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcclxuXHJcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xyXG4gIC8vIDIxLjEuMy4xMyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdChjb3VudClcclxuICByZXBlYXQ6IHJlcXVpcmUoJy4vJC5zdHJpbmctcmVwZWF0JylcclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdC5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciAkICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGNvZiAgPSByZXF1aXJlKCcuLyQuY29mJylcclxuICAsICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XHJcblxyXG4vLyBzaG91bGQgdGhyb3cgZXJyb3Igb24gcmVnZXhcclxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLnRocm93cycpKGZ1bmN0aW9uKCl7ICdxJy5zdGFydHNXaXRoKC8uLyk7IH0pLCAnU3RyaW5nJywge1xyXG4gIC8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXHJcbiAgc3RhcnRzV2l0aDogZnVuY3Rpb24gc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcgLyosIHBvc2l0aW9uID0gMCAqLyl7XHJcbiAgICBpZihjb2Yoc2VhcmNoU3RyaW5nKSA9PSAnUmVnRXhwJyl0aHJvdyBUeXBlRXJyb3IoKTtcclxuICAgIHZhciB0aGF0ICA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhpcykpXHJcbiAgICAgICwgaW5kZXggPSAkLnRvTGVuZ3RoKE1hdGgubWluKGFyZ3VtZW50c1sxXSwgdGhhdC5sZW5ndGgpKTtcclxuICAgIHNlYXJjaFN0cmluZyArPSAnJztcclxuICAgIHJldHVybiB0aGF0LnNsaWNlKGluZGV4LCBpbmRleCArIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XHJcbiAgfVxyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3RhcnRzLXdpdGguanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXHJcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBzZXRUYWcgICA9IHJlcXVpcmUoJy4vJC5jb2YnKS5zZXRcclxuICAsIHVpZCAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpXHJcbiAgLCAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwga2V5T2YgICAgPSByZXF1aXJlKCcuLyQua2V5b2YnKVxyXG4gICwgZW51bUtleXMgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJylcclxuICAsIGFzc2VydE9iamVjdCA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmpcclxuICAsIGhhcyAgICAgID0gJC5oYXNcclxuICAsICRjcmVhdGUgID0gJC5jcmVhdGVcclxuICAsIGdldERlc2MgID0gJC5nZXREZXNjXHJcbiAgLCBzZXREZXNjICA9ICQuc2V0RGVzY1xyXG4gICwgZGVzYyAgICAgPSAkLmRlc2NcclxuICAsIGdldE5hbWVzID0gJC5nZXROYW1lc1xyXG4gICwgdG9PYmplY3QgPSAkLnRvT2JqZWN0XHJcbiAgLCAkU3ltYm9sICA9ICQuZy5TeW1ib2xcclxuICAsIHNldHRlciAgID0gZmFsc2VcclxuICAsIFRBRyAgICAgID0gdWlkKCd0YWcnKVxyXG4gICwgSElEREVOICAgPSB1aWQoJ2hpZGRlbicpXHJcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHt9XHJcbiAgLCBBbGxTeW1ib2xzID0ge31cclxuICAsIHVzZU5hdGl2ZSA9ICQuaXNGdW5jdGlvbigkU3ltYm9sKTtcclxuXHJcbmZ1bmN0aW9uIHdyYXAodGFnKXtcclxuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gJC5zZXQoJGNyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSksIFRBRywgdGFnKTtcclxuICAkLkRFU0MgJiYgc2V0dGVyICYmIHNldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgdGFnLCB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xyXG4gICAgICBzZXREZXNjKHRoaXMsIHRhZywgZGVzYygxLCB2YWx1ZSkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBzeW07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xyXG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xyXG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XHJcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpc2V0RGVzYyhpdCwgSElEREVOLCBkZXNjKDEsIHt9KSk7XHJcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xyXG4gICAgICBELmVudW1lcmFibGUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9IHJldHVybiBzZXREZXNjKGl0LCBrZXksIEQpO1xyXG59XHJcbmZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xyXG4gIGFzc2VydE9iamVjdChpdCk7XHJcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9PYmplY3QoUCkpXHJcbiAgICAsIGkgICAgPSAwXHJcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxyXG4gICAgLCBrZXk7XHJcbiAgd2hpbGUobCA+IGkpZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcclxuICByZXR1cm4gaXQ7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcclxuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gJGNyZWF0ZShpdCkgOiBkZWZpbmVQcm9wZXJ0aWVzKCRjcmVhdGUoaXQpLCBQKTtcclxufVxyXG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XHJcbiAgdmFyIEQgPSBnZXREZXNjKGl0ID0gdG9PYmplY3QoaXQpLCBrZXkpO1xyXG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xyXG4gIHJldHVybiBEO1xyXG59XHJcbmZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xyXG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b09iamVjdChpdCkpXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGkgICAgICA9IDBcclxuICAgICwga2V5O1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOKXJlc3VsdC5wdXNoKGtleSk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xyXG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b09iamVjdChpdCkpXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGkgICAgICA9IDBcclxuICAgICwga2V5O1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXHJcbmlmKCF1c2VOYXRpdmUpe1xyXG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pe1xyXG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcclxuICAgIHJldHVybiB3cmFwKHVpZChkZXNjcmlwdGlvbikpO1xyXG4gIH07XHJcbiAgJC5oaWRlKCRTeW1ib2wucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXNbVEFHXTtcclxuICB9KTtcclxuXHJcbiAgJC5jcmVhdGUgICAgID0gY3JlYXRlO1xyXG4gICQuc2V0RGVzYyAgICA9IGRlZmluZVByb3BlcnR5O1xyXG4gICQuZ2V0RGVzYyAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcclxuICAkLnNldERlc2NzICAgPSBkZWZpbmVQcm9wZXJ0aWVzO1xyXG4gICQuZ2V0TmFtZXMgICA9IGdldE93blByb3BlcnR5TmFtZXM7XHJcbiAgJC5nZXRTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xyXG59XHJcblxyXG52YXIgc3ltYm9sU3RhdGljcyA9IHtcclxuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcclxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcclxuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcclxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXHJcbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcclxuICB9LFxyXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxyXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XHJcbiAgICByZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XHJcbiAgfSxcclxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXHJcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxyXG59O1xyXG4vLyAxOS40LjIuMiBTeW1ib2wuaGFzSW5zdGFuY2VcclxuLy8gMTkuNC4yLjMgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZVxyXG4vLyAxOS40LjIuNCBTeW1ib2wuaXRlcmF0b3JcclxuLy8gMTkuNC4yLjYgU3ltYm9sLm1hdGNoXHJcbi8vIDE5LjQuMi44IFN5bWJvbC5yZXBsYWNlXHJcbi8vIDE5LjQuMi45IFN5bWJvbC5zZWFyY2hcclxuLy8gMTkuNC4yLjEwIFN5bWJvbC5zcGVjaWVzXHJcbi8vIDE5LjQuMi4xMSBTeW1ib2wuc3BsaXRcclxuLy8gMTkuNC4yLjEyIFN5bWJvbC50b1ByaW1pdGl2ZVxyXG4vLyAxOS40LjIuMTMgU3ltYm9sLnRvU3RyaW5nVGFnXHJcbi8vIDE5LjQuMi4xNCBTeW1ib2wudW5zY29wYWJsZXNcclxuJC5lYWNoLmNhbGwoKFxyXG4gICAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCwnICtcclxuICAgICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xyXG4gICkuc3BsaXQoJywnKSwgZnVuY3Rpb24oaXQpe1xyXG4gICAgdmFyIHN5bSA9IHJlcXVpcmUoJy4vJC53a3MnKShpdCk7XHJcbiAgICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcclxuICB9XHJcbik7XHJcblxyXG5zZXR0ZXIgPSB0cnVlO1xyXG5cclxuJGRlZigkZGVmLkcgKyAkZGVmLlcsIHtTeW1ib2w6ICRTeW1ib2x9KTtcclxuXHJcbiRkZWYoJGRlZi5TLCAnU3ltYm9sJywgc3ltYm9sU3RhdGljcyk7XHJcblxyXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICF1c2VOYXRpdmUsICdPYmplY3QnLCB7XHJcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxyXG4gIGNyZWF0ZTogY3JlYXRlLFxyXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxyXG4gIGRlZmluZVByb3BlcnR5OiBkZWZpbmVQcm9wZXJ0eSxcclxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxyXG4gIGRlZmluZVByb3BlcnRpZXM6IGRlZmluZVByb3BlcnRpZXMsXHJcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxyXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxyXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXHJcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogZ2V0T3duUHJvcGVydHlOYW1lcyxcclxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXHJcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcclxufSk7XHJcblxyXG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXHJcbnNldFRhZygkU3ltYm9sLCAnU3ltYm9sJyk7XHJcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cclxuc2V0VGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XHJcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXHJcbnNldFRhZygkLmcuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbiAqKiBtb2R1bGUgaWQgPSA3MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJCAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIHdlYWsgICAgICA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXdlYWsnKVxyXG4gICwgbGVha1N0b3JlID0gd2Vhay5sZWFrU3RvcmVcclxuICAsIElEICAgICAgICA9IHdlYWsuSURcclxuICAsIFdFQUsgICAgICA9IHdlYWsuV0VBS1xyXG4gICwgaGFzICAgICAgID0gJC5oYXNcclxuICAsIGlzT2JqZWN0ICA9ICQuaXNPYmplY3RcclxuICAsIGlzRnJvemVuICA9IE9iamVjdC5pc0Zyb3plbiB8fCAkLmNvcmUuT2JqZWN0LmlzRnJvemVuXHJcbiAgLCB0bXAgICAgICAgPSB7fTtcclxuXHJcbi8vIDIzLjMgV2Vha01hcCBPYmplY3RzXHJcbnZhciBXZWFrTWFwID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24nKSgnV2Vha01hcCcsIHtcclxuICAvLyAyMy4zLjMuMyBXZWFrTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxyXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XHJcbiAgICBpZihpc09iamVjdChrZXkpKXtcclxuICAgICAgaWYoaXNGcm96ZW4oa2V5KSlyZXR1cm4gbGVha1N0b3JlKHRoaXMpLmdldChrZXkpO1xyXG4gICAgICBpZihoYXMoa2V5LCBXRUFLKSlyZXR1cm4ga2V5W1dFQUtdW3RoaXNbSURdXTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxyXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xyXG4gICAgcmV0dXJuIHdlYWsuZGVmKHRoaXMsIGtleSwgdmFsdWUpO1xyXG4gIH1cclxufSwgd2VhaywgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XHJcbmlmKCQuRlcgJiYgbmV3IFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcclxuICAkLmVhY2guY2FsbChbJ2RlbGV0ZScsICdoYXMnLCAnZ2V0JywgJ3NldCddLCBmdW5jdGlvbihrZXkpe1xyXG4gICAgdmFyIG1ldGhvZCA9IFdlYWtNYXAucHJvdG90eXBlW2tleV07XHJcbiAgICBXZWFrTWFwLnByb3RvdHlwZVtrZXldID0gZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgIC8vIHN0b3JlIGZyb3plbiBvYmplY3RzIG9uIGxlYWt5IG1hcFxyXG4gICAgICBpZihpc09iamVjdChhKSAmJiBpc0Zyb3plbihhKSl7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGxlYWtTdG9yZSh0aGlzKVtrZXldKGEsIGIpO1xyXG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xyXG4gICAgICAvLyBzdG9yZSBhbGwgdGhlIHJlc3Qgb24gbmF0aXZlIHdlYWttYXBcclxuICAgICAgfSByZXR1cm4gbWV0aG9kLmNhbGwodGhpcywgYSwgYik7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1tYXAuanNcbiAqKiBtb2R1bGUgaWQgPSA3MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgd2VhayA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXdlYWsnKTtcclxuXHJcbi8vIDIzLjQgV2Vha1NldCBPYmplY3RzXHJcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ1dlYWtTZXQnLCB7XHJcbiAgLy8gMjMuNC4zLjEgV2Vha1NldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxyXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcclxuICAgIHJldHVybiB3ZWFrLmRlZih0aGlzLCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgfVxyXG59LCB3ZWFrLCBmYWxzZSwgdHJ1ZSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1zZXQuanNcbiAqKiBtb2R1bGUgaWQgPSA3M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2RvbWVuaWMvQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXHJcbnZhciAkZGVmICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4vJC5hcnJheS1pbmNsdWRlcycpKHRydWUpO1xyXG4kZGVmKCRkZWYuUCwgJ0FycmF5Jywge1xyXG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiwgZnJvbUluZGV4ID0gMCAqLyl7XHJcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHNbMV0pO1xyXG4gIH1cclxufSk7XHJcbnJlcXVpcmUoJy4vJC51bnNjb3BlJykoJ2luY2x1ZGVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA3NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxyXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzXG4gKiogbW9kdWxlIGlkID0gNzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vOTM1Mzc4MVxyXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCBvd25LZXlzID0gcmVxdWlyZSgnLi8kLm93bi1rZXlzJyk7XHJcblxyXG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHtcclxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iamVjdCl7XHJcbiAgICB2YXIgTyAgICAgID0gJC50b09iamVjdChvYmplY3QpXHJcbiAgICAgICwgcmVzdWx0ID0ge307XHJcbiAgICAkLmVhY2guY2FsbChvd25LZXlzKE8pLCBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAkLnNldERlc2MocmVzdWx0LCBrZXksICQuZGVzYygwLCAkLmdldERlc2MoTywga2V5KSkpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSA3NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cDovL2dvby5nbC9Ya0JyakRcclxudmFyICQgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcclxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0VG9BcnJheShpc0VudHJpZXMpe1xyXG4gIHJldHVybiBmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgdmFyIE8gICAgICA9ICQudG9PYmplY3Qob2JqZWN0KVxyXG4gICAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxyXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXHJcbiAgICAgICwgaSAgICAgID0gMFxyXG4gICAgICAsIHJlc3VsdCA9IEFycmF5KGxlbmd0aClcclxuICAgICAgLCBrZXk7XHJcbiAgICBpZihpc0VudHJpZXMpd2hpbGUobGVuZ3RoID4gaSlyZXN1bHRbaV0gPSBba2V5ID0ga2V5c1tpKytdLCBPW2tleV1dO1xyXG4gICAgZWxzZSB3aGlsZShsZW5ndGggPiBpKXJlc3VsdFtpXSA9IE9ba2V5c1tpKytdXTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxufVxyXG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHtcclxuICB2YWx1ZXM6ICBjcmVhdGVPYmplY3RUb0FycmF5KGZhbHNlKSxcclxuICBlbnRyaWVzOiBjcmVhdGVPYmplY3RUb0FycmF5KHRydWUpXHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC50by1hcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDc3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9rYW5nYXgvOTY5ODEwMFxyXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcclxuJGRlZigkZGVmLlMsICdSZWdFeHAnLCB7XHJcbiAgZXNjYXBlOiByZXF1aXJlKCcuLyQucmVwbGFjZXInKSgvKFtcXFxcXFwtW1xcXXt9KCkqKz8uLF4kfF0pL2csICdcXFxcJDEnLCB0cnVlKVxyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5yZWdleHAuZXNjYXBlLmpzXG4gKiogbW9kdWxlIGlkID0gNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cclxucmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zZXQudG8tanNvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDc5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XHJcbid1c2Ugc3RyaWN0JztcclxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XHJcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xyXG4gIGF0OiBmdW5jdGlvbiBhdChwb3Mpe1xyXG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xyXG4gIH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLmF0LmpzXG4gKiogbW9kdWxlIGlkID0gODBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsICRwYWQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xyXG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcclxuICBscGFkOiBmdW5jdGlvbiBscGFkKG4pe1xyXG4gICAgcmV0dXJuICRwYWQodGhpcywgbiwgYXJndW1lbnRzWzFdLCB0cnVlKTtcclxuICB9XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5scGFkLmpzXG4gKiogbW9kdWxlIGlkID0gODFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsICRwYWQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xyXG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcclxuICBycGFkOiBmdW5jdGlvbiBycGFkKG4pe1xyXG4gICAgcmV0dXJuICRwYWQodGhpcywgbiwgYXJndW1lbnRzWzFdLCBmYWxzZSk7XHJcbiAgfVxyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucnBhZC5qc1xuICoqIG1vZHVsZSBpZCA9IDgyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBKYXZhU2NyaXB0IDEuNiAvIFN0cmF3bWFuIGFycmF5IHN0YXRpY3Mgc2hpbVxyXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCAkQXJyYXkgID0gJC5jb3JlLkFycmF5IHx8IEFycmF5XHJcbiAgLCBzdGF0aWNzID0ge307XHJcbmZ1bmN0aW9uIHNldFN0YXRpY3Moa2V5cywgbGVuZ3RoKXtcclxuICAkLmVhY2guY2FsbChrZXlzLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGtleSl7XHJcbiAgICBpZihsZW5ndGggPT0gdW5kZWZpbmVkICYmIGtleSBpbiAkQXJyYXkpc3RhdGljc1trZXldID0gJEFycmF5W2tleV07XHJcbiAgICBlbHNlIGlmKGtleSBpbiBbXSlzdGF0aWNzW2tleV0gPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgW11ba2V5XSwgbGVuZ3RoKTtcclxuICB9KTtcclxufVxyXG5zZXRTdGF0aWNzKCdwb3AscmV2ZXJzZSxzaGlmdCxrZXlzLHZhbHVlcyxlbnRyaWVzJywgMSk7XHJcbnNldFN0YXRpY3MoJ2luZGV4T2YsZXZlcnksc29tZSxmb3JFYWNoLG1hcCxmaWx0ZXIsZmluZCxmaW5kSW5kZXgsaW5jbHVkZXMnLCAzKTtcclxuc2V0U3RhdGljcygnam9pbixzbGljZSxjb25jYXQscHVzaCxzcGxpY2UsdW5zaGlmdCxzb3J0LGxhc3RJbmRleE9mLCcgK1xyXG4gICAgICAgICAgICdyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsLHR1cm4nKTtcclxuJGRlZigkZGVmLlMsICdBcnJheScsIHN0YXRpY3MpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvanMuYXJyYXkuc3RhdGljcy5qc1xuICoqIG1vZHVsZSBpZCA9IDgzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xyXG52YXIgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgSXRlcmF0b3JzICAgPSByZXF1aXJlKCcuLyQuaXRlcicpLkl0ZXJhdG9yc1xyXG4gICwgSVRFUkFUT1IgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcclxuICAsIEFycmF5VmFsdWVzID0gSXRlcmF0b3JzLkFycmF5XHJcbiAgLCBOb2RlTGlzdCAgICA9ICQuZy5Ob2RlTGlzdDtcclxuaWYoJC5GVyAmJiBOb2RlTGlzdCAmJiAhKElURVJBVE9SIGluIE5vZGVMaXN0LnByb3RvdHlwZSkpe1xyXG4gICQuaGlkZShOb2RlTGlzdC5wcm90b3R5cGUsIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XHJcbn1cclxuSXRlcmF0b3JzLk5vZGVMaXN0ID0gQXJyYXlWYWx1ZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gODRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxyXG4gICwgJHRhc2sgPSByZXF1aXJlKCcuLyQudGFzaycpO1xyXG4kZGVmKCRkZWYuRyArICRkZWYuQiwge1xyXG4gIHNldEltbWVkaWF0ZTogICAkdGFzay5zZXQsXHJcbiAgY2xlYXJJbW1lZGlhdGU6ICR0YXNrLmNsZWFyXHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvd2ViLmltbWVkaWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDg1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBpZTktIHNldFRpbWVvdXQgJiBzZXRJbnRlcnZhbCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZml4XHJcbnZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgJGRlZiAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCBpbnZva2UgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcclxuICAsIHBhcnRpYWwgICA9IHJlcXVpcmUoJy4vJC5wYXJ0aWFsJylcclxuICAsIG5hdmlnYXRvciA9ICQuZy5uYXZpZ2F0b3JcclxuICAsIE1TSUUgICAgICA9ICEhbmF2aWdhdG9yICYmIC9NU0lFIC5cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7IC8vIDwtIGRpcnR5IGllOS0gY2hlY2tcclxuZnVuY3Rpb24gd3JhcChzZXQpe1xyXG4gIHJldHVybiBNU0lFID8gZnVuY3Rpb24oZm4sIHRpbWUgLyosIC4uLmFyZ3MgKi8pe1xyXG4gICAgcmV0dXJuIHNldChpbnZva2UoXHJcbiAgICAgIHBhcnRpYWwsXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcclxuICAgICAgJC5pc0Z1bmN0aW9uKGZuKSA/IGZuIDogRnVuY3Rpb24oZm4pXHJcbiAgICApLCB0aW1lKTtcclxuICB9IDogc2V0O1xyXG59XHJcbiRkZWYoJGRlZi5HICsgJGRlZi5CICsgJGRlZi5GICogTVNJRSwge1xyXG4gIHNldFRpbWVvdXQ6ICB3cmFwKCQuZy5zZXRUaW1lb3V0KSxcclxuICBzZXRJbnRlcnZhbDogd3JhcCgkLmcuc2V0SW50ZXJ2YWwpXHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvd2ViLnRpbWVycy5qc1xuICoqIG1vZHVsZSBpZCA9IDg2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL21vZHVsZXMvZXM1Jyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcycpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5zdGF0aWNzLWFjY2VwdC1wcmltaXRpdmVzJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZScpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmhhcy1pbnN0YW5jZScpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3RvcicpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5zdGF0aWNzJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aCcpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQnKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmF3Jyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQnKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdCcpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aCcpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5vZicpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcycpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmlsbCcpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbmQnKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maW5kLWluZGV4Jyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hcCcpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnNldCcpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LndlYWstbWFwJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYud2Vhay1zZXQnKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0Jyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMnKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcuYXQnKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcubHBhZCcpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5ycGFkJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVnZXhwLmVzY2FwZScpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzJyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LnRvLWFycmF5Jyk7XHJcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcclxucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvanMuYXJyYXkuc3RhdGljcycpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLnRpbWVycycpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmltbWVkaWF0ZScpO1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbW9kdWxlcy8kJykuY29yZTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvc2hpbS5qc1xuICoqIG1vZHVsZSBpZCA9IDg3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciBpdGVyYXRvclN5bWJvbCA9XG4gICAgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKChvdXRlckZuIHx8IEdlbmVyYXRvcikucHJvdG90eXBlKTtcblxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChcbiAgICAgIGlubmVyRm4sIHNlbGYgfHwgbnVsbCxcbiAgICAgIG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKVxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuZXJhdG9yID0gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCk7XG4gICAgICB2YXIgY2FsbE5leHQgPSBzdGVwLmJpbmQoZ2VuZXJhdG9yLCBcIm5leHRcIik7XG4gICAgICB2YXIgY2FsbFRocm93ID0gc3RlcC5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcblxuICAgICAgZnVuY3Rpb24gc3RlcChtZXRob2QsIGFyZykge1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgcmVzb2x2ZShpbmZvLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoaW5mby52YWx1ZSkudGhlbihjYWxsTmV4dCwgY2FsbFRocm93KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjYWxsTmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8XG4gICAgICAgICAgICAgIChtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3IsXG4gICAgICAgICAgICBhcmdcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkWWllbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGFyZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbnRleHQuc2VudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZGVsZWdhdGUgJiYgbWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUdlbmVyYXRvck1ldGhvZChtZXRob2QpIHtcbiAgICBHcFttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICB9O1xuICB9XG4gIGRlZmluZUdlbmVyYXRvck1ldGhvZChcIm5leHRcIik7XG4gIGRlZmluZUdlbmVyYXRvck1ldGhvZChcInRocm93XCIpO1xuICBkZWZpbmVHZW5lcmF0b3JNZXRob2QoXCJyZXR1cm5cIik7XG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIHRoaXMuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICAvLyBQcmUtaW5pdGlhbGl6ZSBhdCBsZWFzdCAyMCB0ZW1wb3JhcnkgdmFyaWFibGVzIHRvIGVuYWJsZSBoaWRkZW5cbiAgICAgIC8vIGNsYXNzIG9wdGltaXphdGlvbnMgZm9yIHNpbXBsZSBnZW5lcmF0b3JzLlxuICAgICAgZm9yICh2YXIgdGVtcEluZGV4ID0gMCwgdGVtcE5hbWU7XG4gICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIHRlbXBOYW1lID0gXCJ0XCIgKyB0ZW1wSW5kZXgpIHx8IHRlbXBJbmRleCA8IDIwO1xuICAgICAgICAgICArK3RlbXBJbmRleCkge1xuICAgICAgICB0aGlzW3RlbXBOYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEFtb25nIHRoZSB2YXJpb3VzIHRyaWNrcyBmb3Igb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWxcbiAgLy8gb2JqZWN0LCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBtb3N0IHJlbGlhYmxlIHRlY2huaXF1ZSB0aGF0IGRvZXMgbm90XG4gIC8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpc1xuKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9yZWdlbmVyYXRvci9ydW50aW1lLmpzXG4gKiogbW9kdWxlIGlkID0gODhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL2JhYmVsL3BvbHlmaWxsXCIpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9wb2x5ZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDg5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgJy4vQXBwLmxlc3MnO1xuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMb2dpblBhZ2UgZnJvbSAnLi4vTG9naW5QYWdlJztcblxuY2xhc3MgQXBwIHtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvblNldFRpdGxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uUGFnZU5vdEZvdW5kOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH07XG5cblxuICByZW5kZXIoKSB7XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLnBhdGgpIHtcblxuICAgICAgY2FzZSAnLyc6XG4gICAgICBjYXNlICcvbG9naW4nOlxuICAgICAgICB0aGlzLnByb3BzLm9uU2V0VGl0bGUoTG9naW5QYWdlLnRpdGxlKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSA8TG9naW5QYWdlIC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLmNvbXBvbmVudH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0ICcuL0xvZ2luUGFnZS5sZXNzJztcblxuY2xhc3MgTG9naW5QYWdlIHtcbiAgc3RhdGljIHRpdGxlID0gXCLnmbvlvZUxXCI7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxvZ2luUGFnZVwiPlxuICAgICAgICBMb2dpbjEyM1xuICAgICAgICA8YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tc3RhclwiPjwvc3Bhbj4gU3RhcjwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9naW5QYWdlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvY29tcG9uZW50cy9Mb2dpblBhZ2UvTG9naW5QYWdlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtY29yZS9wb2x5ZmlsbFwiKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsL3BvbHlmaWxsLmpzXG4gKiogbW9kdWxlIGlkID0gOTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjMuMC4yIHwgTUlUIExpY2Vuc2UgfCBnaXQuaW8vbm9ybWFsaXplICovXFxuaHRtbCB7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xcbn1cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuYXJ0aWNsZSxcXG5hc2lkZSxcXG5kZXRhaWxzLFxcbmZpZ2NhcHRpb24sXFxuZmlndXJlLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxuaGdyb3VwLFxcbm1haW4sXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbixcXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5hdWRpbyxcXG5jYW52YXMsXFxucHJvZ3Jlc3MsXFxudmlkZW8ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5hdWRpbzpub3QoW2NvbnRyb2xzXSkge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGhlaWdodDogMDtcXG59XFxuW2hpZGRlbl0sXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuYTphY3RpdmUsXFxuYTpob3ZlciB7XFxuICBvdXRsaW5lOiAwO1xcbn1cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggZG90dGVkO1xcbn1cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuZGZuIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5tYXJrIHtcXG4gIGJhY2tncm91bmQ6ICNmZjA7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5pbWcge1xcbiAgYm9yZGVyOiAwO1xcbn1cXG5zdmc6bm90KDpyb290KSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5maWd1cmUge1xcbiAgbWFyZ2luOiAxZW0gNDBweDtcXG59XFxuaHIge1xcbiAgLW1vei1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gIC13ZWJraXQtYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG5wcmUge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcbmNvZGUsXFxua2JkLFxcbnByZSxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbn1cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIG1hcmdpbjogMDtcXG59XFxuYnV0dG9uIHtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5idXR0b24sXFxuc2VsZWN0IHtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5idXR0b24sXFxuaHRtbCBpbnB1dFt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5pbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdLFxcbmlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5idXR0b25bZGlzYWJsZWRdLFxcbmh0bWwgaW5wdXRbZGlzYWJsZWRdIHtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcbmlucHV0OjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbmlucHV0IHtcXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxufVxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5pbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbmlucHV0W3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbiAgLW1vei1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gIC13ZWJraXQtYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG59XFxuaW5wdXRbdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24sXFxuaW5wdXRbdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5maWVsZHNldCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYzBjMGMwO1xcbiAgbWFyZ2luOiAwIDJweDtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjYyNWVtIDAuNzVlbTtcXG59XFxubGVnZW5kIHtcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5vcHRncm91cCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG50ZCxcXG50aCB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG4vKiEgU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vaDVicC9odG1sNS1ib2lsZXJwbGF0ZS9ibG9iL21hc3Rlci9zcmMvY3NzL21haW4uY3NzICovXFxuQG1lZGlhIHByaW50IHtcXG4gICosXFxuICAqOmJlZm9yZSxcXG4gICo6YWZ0ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICAgIHRleHQtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxuICBhLFxcbiAgYTp2aXNpdGVkIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICB9XFxuICBhW2hyZWZdOmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIiAoXFxcIiBhdHRyKGhyZWYpIFxcXCIpXFxcIjtcXG4gIH1cXG4gIGFiYnJbdGl0bGVdOmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIiAoXFxcIiBhdHRyKHRpdGxlKSBcXFwiKVxcXCI7XFxuICB9XFxuICBhW2hyZWZePVxcXCIjXFxcIl06YWZ0ZXIsXFxuICBhW2hyZWZePVxcXCJqYXZhc2NyaXB0OlxcXCJdOmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICB9XFxuICBwcmUsXFxuICBibG9ja3F1b3RlIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzk5OTtcXG4gICAgcGFnZS1icmVhay1pbnNpZGU6IGF2b2lkO1xcbiAgfVxcbiAgdGhlYWQge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1oZWFkZXItZ3JvdXA7XFxuICB9XFxuICB0cixcXG4gIGltZyB7XFxuICAgIHBhZ2UtYnJlYWstaW5zaWRlOiBhdm9pZDtcXG4gIH1cXG4gIGltZyB7XFxuICAgIG1heC13aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAgfVxcbiAgcCxcXG4gIGgyLFxcbiAgaDMge1xcbiAgICBvcnBoYW5zOiAzO1xcbiAgICB3aWRvd3M6IDM7XFxuICB9XFxuICBoMixcXG4gIGgzIHtcXG4gICAgcGFnZS1icmVhay1hZnRlcjogYXZvaWQ7XFxuICB9XFxuICBzZWxlY3Qge1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmICFpbXBvcnRhbnQ7XFxuICB9XFxuICAubmF2YmFyIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG4gIC5idG4gPiAuY2FyZXQsXFxuICAuZHJvcHVwID4gLmJ0biA+IC5jYXJldCB7XFxuICAgIGJvcmRlci10b3AtY29sb3I6ICMwMDAgIWltcG9ydGFudDtcXG4gIH1cXG4gIC5sYWJlbCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxuICB9XFxuICAudGFibGUge1xcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlICFpbXBvcnRhbnQ7XFxuICB9XFxuICAudGFibGUgdGQsXFxuICAudGFibGUgdGgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XFxuICB9XFxuICAudGFibGUtYm9yZGVyZWQgdGgsXFxuICAudGFibGUtYm9yZGVyZWQgdGQge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdHbHlwaGljb25zIEhhbGZsaW5ncyc7XFxuICBzcmM6IHVybCgnL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIuZW90Jyk7XFxuICBzcmM6IHVybCgnL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIuZW90PyNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSwgdXJsKCcvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgdXJsKCcvZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci53b2ZmJykgZm9ybWF0KCd3b2ZmJyksIHVybCgnL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIudHRmJykgZm9ybWF0KCd0cnVldHlwZScpLCB1cmwoJy9mb250cy9nbHlwaGljb25zLWhhbGZsaW5ncy1yZWd1bGFyLnN2ZyNnbHlwaGljb25zX2hhbGZsaW5nc3JlZ3VsYXInKSBmb3JtYXQoJ3N2ZycpO1xcbn1cXG4uZ2x5cGhpY29uIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogMXB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1mYW1pbHk6ICdHbHlwaGljb25zIEhhbGZsaW5ncyc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxufVxcbi5nbHlwaGljb24tYXN0ZXJpc2s6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcMmFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXBsdXM6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcMmJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWV1cm86YmVmb3JlLFxcbi5nbHlwaGljb24tZXVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDIwYWNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1pbnVzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDIyMTJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNsb3VkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDI2MDFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWVudmVsb3BlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDI3MDlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXBlbmNpbDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFwyNzBmXFxcIjtcXG59XFxuLmdseXBoaWNvbi1nbGFzczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDAxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1tdXNpYzpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDAyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zZWFyY2g6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAwM1xcXCI7XFxufVxcbi5nbHlwaGljb24taGVhcnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAwNVxcXCI7XFxufVxcbi5nbHlwaGljb24tc3RhcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDA2XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zdGFyLWVtcHR5OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMDdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXVzZXI6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAwOFxcXCI7XFxufVxcbi5nbHlwaGljb24tZmlsbTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDA5XFxcIjtcXG59XFxuLmdseXBoaWNvbi10aC1sYXJnZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDEwXFxcIjtcXG59XFxuLmdseXBoaWNvbi10aDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDExXFxcIjtcXG59XFxuLmdseXBoaWNvbi10aC1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMTJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9rOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMTNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJlbW92ZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDE0XFxcIjtcXG59XFxuLmdseXBoaWNvbi16b29tLWluOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMTVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXpvb20tb3V0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9mZjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDE3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaWduYWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAxOFxcXCI7XFxufVxcbi5nbHlwaGljb24tY29nOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMTlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRyYXNoOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMjBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhvbWU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAyMVxcXCI7XFxufVxcbi5nbHlwaGljb24tZmlsZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDIyXFxcIjtcXG59XFxuLmdseXBoaWNvbi10aW1lOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMjNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJvYWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAyNFxcXCI7XFxufVxcbi5nbHlwaGljb24tZG93bmxvYWQtYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMjVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWRvd25sb2FkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXVwbG9hZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDI3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1pbmJveDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDI4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1wbGF5LWNpcmNsZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDI5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yZXBlYXQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAzMFxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVmcmVzaDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDMxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1saXN0LWFsdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDMyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sb2NrOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMzNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsYWc6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAzNFxcXCI7XFxufVxcbi5nbHlwaGljb24taGVhZHBob25lczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDM1XFxcIjtcXG59XFxuLmdseXBoaWNvbi12b2x1bWUtb2ZmOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMzZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXZvbHVtZS1kb3duOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwMzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXZvbHVtZS11cDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDM4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1xcmNvZGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTAzOVxcXCI7XFxufVxcbi5nbHlwaGljb24tYmFyY29kZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDQwXFxcIjtcXG59XFxuLmdseXBoaWNvbi10YWc6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA0MVxcXCI7XFxufVxcbi5nbHlwaGljb24tdGFnczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDQyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1ib29rOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJvb2ttYXJrOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNDRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXByaW50OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNDVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNhbWVyYTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDQ2XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mb250OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNDdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJvbGQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA0OFxcXCI7XFxufVxcbi5nbHlwaGljb24taXRhbGljOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNDlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRleHQtaGVpZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNTBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRleHQtd2lkdGg6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA1MVxcXCI7XFxufVxcbi5nbHlwaGljb24tYWxpZ24tbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDUyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1hbGlnbi1jZW50ZXI6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA1M1xcXCI7XFxufVxcbi5nbHlwaGljb24tYWxpZ24tcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA1NFxcXCI7XFxufVxcbi5nbHlwaGljb24tYWxpZ24tanVzdGlmeTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDU1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWluZGVudC1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNTdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWluZGVudC1yaWdodDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDU4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mYWNldGltZS12aWRlbzpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDU5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1waWN0dXJlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNjBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1hcC1tYXJrZXI6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA2MlxcXCI7XFxufVxcbi5nbHlwaGljb24tYWRqdXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNjNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRpbnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA2NFxcXCI7XFxufVxcbi5nbHlwaGljb24tZWRpdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDY1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaGFyZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDY2XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaGVjazpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDY3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1tb3ZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNjhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN0ZXAtYmFja3dhcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA2OVxcXCI7XFxufVxcbi5nbHlwaGljb24tZmFzdC1iYWNrd2FyZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDcwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1iYWNrd2FyZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDcxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1wbGF5OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNzJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXBhdXNlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNzNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN0b3A6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA3NFxcXCI7XFxufVxcbi5nbHlwaGljb24tZm9yd2FyZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDc1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mYXN0LWZvcndhcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA3NlxcXCI7XFxufVxcbi5nbHlwaGljb24tc3RlcC1mb3J3YXJkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWVqZWN0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwNzhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNoZXZyb24tbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDc5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwODBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXBsdXMtc2lnbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDgxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1taW51cy1zaWduOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwODJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJlbW92ZS1zaWduOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwODNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9rLXNpZ246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA4NFxcXCI7XFxufVxcbi5nbHlwaGljb24tcXVlc3Rpb24tc2lnbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDg1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1pbmZvLXNpZ246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA4NlxcXCI7XFxufVxcbi5nbHlwaGljb24tc2NyZWVuc2hvdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDg3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yZW1vdmUtY2lyY2xlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwODhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9rLWNpcmNsZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDg5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1iYW4tY2lyY2xlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwOTBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWFycm93LWxlZnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA5MVxcXCI7XFxufVxcbi5nbHlwaGljb24tYXJyb3ctcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA5MlxcXCI7XFxufVxcbi5nbHlwaGljb24tYXJyb3ctdXA6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA5M1xcXCI7XFxufVxcbi5nbHlwaGljb24tYXJyb3ctZG93bjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMDk0XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaGFyZS1hbHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA5NVxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVzaXplLWZ1bGw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTA5NlxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVzaXplLXNtYWxsOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUwOTdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEwMVxcXCI7XFxufVxcbi5nbHlwaGljb24tZ2lmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTAyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sZWFmOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZpcmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEwNFxcXCI7XFxufVxcbi5nbHlwaGljb24tZXllLW9wZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEwNVxcXCI7XFxufVxcbi5nbHlwaGljb24tZXllLWNsb3NlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMDZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXdhcm5pbmctc2lnbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTA3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1wbGFuZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTA4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jYWxlbmRhcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTA5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yYW5kb206YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTExMFxcXCI7XFxufVxcbi5nbHlwaGljb24tY29tbWVudDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTExXFxcIjtcXG59XFxuLmdseXBoaWNvbi1tYWduZXQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTExMlxcXCI7XFxufVxcbi5nbHlwaGljb24tY2hldnJvbi11cDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTEzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaGV2cm9uLWRvd246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTExNFxcXCI7XFxufVxcbi5nbHlwaGljb24tcmV0d2VldDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTE1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zaG9wcGluZy1jYXJ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZvbGRlci1jbG9zZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTE3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1mb2xkZXItb3BlbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTE4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1yZXNpemUtdmVydGljYWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTExOVxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVzaXplLWhvcml6b250YWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEyMFxcXCI7XFxufVxcbi5nbHlwaGljb24taGRkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMjFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJ1bGxob3JuOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMjJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJlbGw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEyM1xcXCI7XFxufVxcbi5nbHlwaGljb24tY2VydGlmaWNhdGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEyNFxcXCI7XFxufVxcbi5nbHlwaGljb24tdGh1bWJzLXVwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMjVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRodW1icy1kb3duOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhhbmQtcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEyN1xcXCI7XFxufVxcbi5nbHlwaGljb24taGFuZC1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMjhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhhbmQtdXA6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEyOVxcXCI7XFxufVxcbi5nbHlwaGljb24taGFuZC1kb3duOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMzBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1yaWdodDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTMxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaXJjbGUtYXJyb3ctbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTMyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jaXJjbGUtYXJyb3ctdXA6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEzM1xcXCI7XFxufVxcbi5nbHlwaGljb24tY2lyY2xlLWFycm93LWRvd246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEzNFxcXCI7XFxufVxcbi5nbHlwaGljb24tZ2xvYmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEzNVxcXCI7XFxufVxcbi5nbHlwaGljb24td3JlbmNoOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMzZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRhc2tzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxMzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZpbHRlcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTM4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1icmllZmNhc2U6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTEzOVxcXCI7XFxufVxcbi5nbHlwaGljb24tZnVsbHNjcmVlbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTQwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1kYXNoYm9hcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE0MVxcXCI7XFxufVxcbi5nbHlwaGljb24tcGFwZXJjbGlwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNDJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhlYXJ0LWVtcHR5OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWxpbms6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE0NFxcXCI7XFxufVxcbi5nbHlwaGljb24tcGhvbmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE0NVxcXCI7XFxufVxcbi5nbHlwaGljb24tcHVzaHBpbjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTQ2XFxcIjtcXG59XFxuLmdseXBoaWNvbi11c2Q6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE0OFxcXCI7XFxufVxcbi5nbHlwaGljb24tZ2JwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNDlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvcnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE1MFxcXCI7XFxufVxcbi5nbHlwaGljb24tc29ydC1ieS1hbHBoYWJldDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTUxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTUyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3J0LWJ5LW9yZGVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNTNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvcnQtYnktb3JkZXItYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNTRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvcnQtYnktYXR0cmlidXRlczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTU1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3J0LWJ5LWF0dHJpYnV0ZXMtYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXVuY2hlY2tlZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTU3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1leHBhbmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE1OFxcXCI7XFxufVxcbi5nbHlwaGljb24tY29sbGFwc2UtZG93bjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTU5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1jb2xsYXBzZS11cDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTYwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sb2ctaW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE2MVxcXCI7XFxufVxcbi5nbHlwaGljb24tZmxhc2g6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE2MlxcXCI7XFxufVxcbi5nbHlwaGljb24tbG9nLW91dDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTYzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1uZXctd2luZG93OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNjRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJlY29yZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTY1XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zYXZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9wZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE2N1xcXCI7XFxufVxcbi5nbHlwaGljb24tc2F2ZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE2OFxcXCI7XFxufVxcbi5nbHlwaGljb24taW1wb3J0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNjlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWV4cG9ydDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTcwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zZW5kOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNzFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1kaXNrOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNzJcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1zYXZlZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTczXFxcIjtcXG59XFxuLmdseXBoaWNvbi1mbG9wcHktcmVtb3ZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNzRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1zYXZlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNzVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWZsb3BweS1vcGVuOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNzZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNyZWRpdC1jYXJkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNzdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRyYW5zZmVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxNzhcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWN1dGxlcnk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE3OVxcXCI7XFxufVxcbi5nbHlwaGljb24taGVhZGVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxODBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNvbXByZXNzZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE4MVxcXCI7XFxufVxcbi5nbHlwaGljb24tZWFycGhvbmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE4MlxcXCI7XFxufVxcbi5nbHlwaGljb24tcGhvbmUtYWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxODNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRvd2VyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxODRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN0YXRzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxODVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNkLXZpZGVvOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxODZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhkLXZpZGVvOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxODdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXN1YnRpdGxlczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTg4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3VuZC1zdGVyZW86YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE4OVxcXCI7XFxufVxcbi5nbHlwaGljb24tc291bmQtZG9sYnk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE5MFxcXCI7XFxufVxcbi5nbHlwaGljb24tc291bmQtNS0xOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxOTFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNvdW5kLTYtMTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTkyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zb3VuZC03LTE6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE5M1xcXCI7XFxufVxcbi5nbHlwaGljb24tY29weXJpZ2h0LW1hcms6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE5NFxcXCI7XFxufVxcbi5nbHlwaGljb24tcmVnaXN0cmF0aW9uLW1hcms6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE5NVxcXCI7XFxufVxcbi5nbHlwaGljb24tY2xvdWQtZG93bmxvYWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTE5N1xcXCI7XFxufVxcbi5nbHlwaGljb24tY2xvdWQtdXBsb2FkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUxOThcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXRyZWUtY29uaWZlcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMTk5XFxcIjtcXG59XFxuLmdseXBoaWNvbi10cmVlLWRlY2lkdW91czpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjAwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1jZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjAxXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zYXZlLWZpbGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIwMlxcXCI7XFxufVxcbi5nbHlwaGljb24tb3Blbi1maWxlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMDNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWxldmVsLXVwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMDRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNvcHk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIwNVxcXCI7XFxufVxcbi5nbHlwaGljb24tcGFzdGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIwNlxcXCI7XFxufVxcbi5nbHlwaGljb24tYWxlcnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIwOVxcXCI7XFxufVxcbi5nbHlwaGljb24tZXF1YWxpemVyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMTBcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWtpbmc6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIxMVxcXCI7XFxufVxcbi5nbHlwaGljb24tcXVlZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIxMlxcXCI7XFxufVxcbi5nbHlwaGljb24tcGF3bjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjEzXFxcIjtcXG59XFxuLmdseXBoaWNvbi1iaXNob3A6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIxNFxcXCI7XFxufVxcbi5nbHlwaGljb24ta25pZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMTVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJhYnktZm9ybXVsYTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjE2XFxcIjtcXG59XFxuLmdseXBoaWNvbi10ZW50OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDI2ZmFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJsYWNrYm9hcmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIxOFxcXCI7XFxufVxcbi5nbHlwaGljb24tYmVkOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMTlcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWFwcGxlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGY4ZmZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWVyYXNlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMjFcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWhvdXJnbGFzczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFwyMzFiXFxcIjtcXG59XFxuLmdseXBoaWNvbi1sYW1wOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMjNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWR1cGxpY2F0ZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjI0XFxcIjtcXG59XFxuLmdseXBoaWNvbi1waWdneS1iYW5rOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMjVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXNjaXNzb3JzOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMjZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWJpdGNvaW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIyN1xcXCI7XFxufVxcbi5nbHlwaGljb24tYnRjOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMjdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXhidDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjI3XFxcIjtcXG59XFxuLmdseXBoaWNvbi15ZW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcMDBhNVxcXCI7XFxufVxcbi5nbHlwaGljb24tanB5OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDAwYTVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJ1YmxlOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXDIwYmRcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLXJ1YjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFwyMGJkXFxcIjtcXG59XFxuLmdseXBoaWNvbi1zY2FsZTpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjMwXFxcIjtcXG59XFxuLmdseXBoaWNvbi1pY2UtbG9sbHk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIzMVxcXCI7XFxufVxcbi5nbHlwaGljb24taWNlLWxvbGx5LXRhc3RlZDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjMyXFxcIjtcXG59XFxuLmdseXBoaWNvbi1lZHVjYXRpb246YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIzM1xcXCI7XFxufVxcbi5nbHlwaGljb24tb3B0aW9uLWhvcml6b250YWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIzNFxcXCI7XFxufVxcbi5nbHlwaGljb24tb3B0aW9uLXZlcnRpY2FsOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMzVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1lbnUtaGFtYnVyZ2VyOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyMzZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1vZGFsLXdpbmRvdzpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjM3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1vaWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIzOFxcXCI7XFxufVxcbi5nbHlwaGljb24tZ3JhaW46YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTIzOVxcXCI7XFxufVxcbi5nbHlwaGljb24tc3VuZ2xhc3NlczpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjQwXFxcIjtcXG59XFxuLmdseXBoaWNvbi10ZXh0LXNpemU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTI0MVxcXCI7XFxufVxcbi5nbHlwaGljb24tdGV4dC1jb2xvcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjQyXFxcIjtcXG59XFxuLmdseXBoaWNvbi10ZXh0LWJhY2tncm91bmQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTI0M1xcXCI7XFxufVxcbi5nbHlwaGljb24tb2JqZWN0LWFsaWduLXRvcDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjQ0XFxcIjtcXG59XFxuLmdseXBoaWNvbi1vYmplY3QtYWxpZ24tYm90dG9tOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyNDVcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9iamVjdC1hbGlnbi1ob3Jpem9udGFsOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyNDZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9iamVjdC1hbGlnbi1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyNDdcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW9iamVjdC1hbGlnbi12ZXJ0aWNhbDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjQ4XFxcIjtcXG59XFxuLmdseXBoaWNvbi1vYmplY3QtYWxpZ24tcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTI0OVxcXCI7XFxufVxcbi5nbHlwaGljb24tdHJpYW5nbGUtcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTI1MFxcXCI7XFxufVxcbi5nbHlwaGljb24tdHJpYW5nbGUtbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjUxXFxcIjtcXG59XFxuLmdseXBoaWNvbi10cmlhbmdsZS1ib3R0b206YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTI1MlxcXCI7XFxufVxcbi5nbHlwaGljb24tdHJpYW5nbGUtdG9wOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyNTNcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLWNvbnNvbGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTI1NFxcXCI7XFxufVxcbi5nbHlwaGljb24tc3VwZXJzY3JpcHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcZTI1NVxcXCI7XFxufVxcbi5nbHlwaGljb24tc3Vic2NyaXB0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyNTZcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1lbnUtbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjU3XFxcIjtcXG59XFxuLmdseXBoaWNvbi1tZW51LXJpZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyNThcXFwiO1xcbn1cXG4uZ2x5cGhpY29uLW1lbnUtZG93bjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxlMjU5XFxcIjtcXG59XFxuLmdseXBoaWNvbi1tZW51LXVwOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXGUyNjBcXFwiO1xcbn1cXG4qIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbio6YmVmb3JlLFxcbio6YWZ0ZXIge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuaHRtbCB7XFxuICBmb250LXNpemU6IDEwcHg7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxufVxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuaW5wdXQsXFxuYnV0dG9uLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbn1cXG5hIHtcXG4gIGNvbG9yOiAjMzM3YWI3O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5hOmhvdmVyLFxcbmE6Zm9jdXMge1xcbiAgY29sb3I6ICMyMzUyN2M7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuYTpmb2N1cyB7XFxuICBvdXRsaW5lOiB0aGluIGRvdHRlZDtcXG4gIG91dGxpbmU6IDVweCBhdXRvIC13ZWJraXQtZm9jdXMtcmluZy1jb2xvcjtcXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xcbn1cXG5maWd1cmUge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5pbWcge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuLmltZy1yZXNwb25zaXZlLFxcbi50aHVtYm5haWwgPiBpbWcsXFxuLnRodW1ibmFpbCBhID4gaW1nLFxcbi5jYXJvdXNlbC1pbm5lciA+IC5pdGVtID4gaW1nLFxcbi5jYXJvdXNlbC1pbm5lciA+IC5pdGVtID4gYSA+IGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuLmltZy1yb3VuZGVkIHtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuLmltZy10aHVtYm5haWwge1xcbiAgcGFkZGluZzogNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG4uaW1nLWNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbmhyIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWVlZWU7XFxufVxcbi5zci1vbmx5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxcHg7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogLTFweDtcXG4gIHBhZGRpbmc6IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcXG4gIGJvcmRlcjogMDtcXG59XFxuLnNyLW9ubHktZm9jdXNhYmxlOmFjdGl2ZSxcXG4uc3Itb25seS1mb2N1c2FibGU6Zm9jdXMge1xcbiAgcG9zaXRpb246IHN0YXRpYztcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBjbGlwOiBhdXRvO1xcbn1cXG5bcm9sZT1cXFwiYnV0dG9uXFxcIl0ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNixcXG4uaDEsXFxuLmgyLFxcbi5oMyxcXG4uaDQsXFxuLmg1LFxcbi5oNiB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMS4xO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbmgxIHNtYWxsLFxcbmgyIHNtYWxsLFxcbmgzIHNtYWxsLFxcbmg0IHNtYWxsLFxcbmg1IHNtYWxsLFxcbmg2IHNtYWxsLFxcbi5oMSBzbWFsbCxcXG4uaDIgc21hbGwsXFxuLmgzIHNtYWxsLFxcbi5oNCBzbWFsbCxcXG4uaDUgc21hbGwsXFxuLmg2IHNtYWxsLFxcbmgxIC5zbWFsbCxcXG5oMiAuc21hbGwsXFxuaDMgLnNtYWxsLFxcbmg0IC5zbWFsbCxcXG5oNSAuc21hbGwsXFxuaDYgLnNtYWxsLFxcbi5oMSAuc21hbGwsXFxuLmgyIC5zbWFsbCxcXG4uaDMgLnNtYWxsLFxcbi5oNCAuc21hbGwsXFxuLmg1IC5zbWFsbCxcXG4uaDYgLnNtYWxsIHtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGNvbG9yOiAjNzc3Nzc3O1xcbn1cXG5oMSxcXG4uaDEsXFxuaDIsXFxuLmgyLFxcbmgzLFxcbi5oMyB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuaDEgc21hbGwsXFxuLmgxIHNtYWxsLFxcbmgyIHNtYWxsLFxcbi5oMiBzbWFsbCxcXG5oMyBzbWFsbCxcXG4uaDMgc21hbGwsXFxuaDEgLnNtYWxsLFxcbi5oMSAuc21hbGwsXFxuaDIgLnNtYWxsLFxcbi5oMiAuc21hbGwsXFxuaDMgLnNtYWxsLFxcbi5oMyAuc21hbGwge1xcbiAgZm9udC1zaXplOiA2NSU7XFxufVxcbmg0LFxcbi5oNCxcXG5oNSxcXG4uaDUsXFxuaDYsXFxuLmg2IHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5oNCBzbWFsbCxcXG4uaDQgc21hbGwsXFxuaDUgc21hbGwsXFxuLmg1IHNtYWxsLFxcbmg2IHNtYWxsLFxcbi5oNiBzbWFsbCxcXG5oNCAuc21hbGwsXFxuLmg0IC5zbWFsbCxcXG5oNSAuc21hbGwsXFxuLmg1IC5zbWFsbCxcXG5oNiAuc21hbGwsXFxuLmg2IC5zbWFsbCB7XFxuICBmb250LXNpemU6IDc1JTtcXG59XFxuaDEsXFxuLmgxIHtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuaDIsXFxuLmgyIHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG59XFxuaDMsXFxuLmgzIHtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG59XFxuaDQsXFxuLmg0IHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG59XFxuaDUsXFxuLmg1IHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuaDYsXFxuLmg2IHtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxucCB7XFxuICBtYXJnaW46IDAgMCAxMHB4O1xcbn1cXG4ubGVhZCB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmxlYWQge1xcbiAgICBmb250LXNpemU6IDIxcHg7XFxuICB9XFxufVxcbnNtYWxsLFxcbi5zbWFsbCB7XFxuICBmb250LXNpemU6IDg1JTtcXG59XFxubWFyayxcXG4ubWFyayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmOGUzO1xcbiAgcGFkZGluZzogLjJlbTtcXG59XFxuLnRleHQtbGVmdCB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG4udGV4dC1yaWdodCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuLnRleHQtY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLnRleHQtanVzdGlmeSB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG4udGV4dC1ub3dyYXAge1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuLnRleHQtbG93ZXJjYXNlIHtcXG4gIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7XFxufVxcbi50ZXh0LXVwcGVyY2FzZSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG4udGV4dC1jYXBpdGFsaXplIHtcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbn1cXG4udGV4dC1tdXRlZCB7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuLnRleHQtcHJpbWFyeSB7XFxuICBjb2xvcjogIzMzN2FiNztcXG59XFxuYS50ZXh0LXByaW1hcnk6aG92ZXIge1xcbiAgY29sb3I6ICMyODYwOTA7XFxufVxcbi50ZXh0LXN1Y2Nlc3Mge1xcbiAgY29sb3I6ICMzYzc2M2Q7XFxufVxcbmEudGV4dC1zdWNjZXNzOmhvdmVyIHtcXG4gIGNvbG9yOiAjMmI1NDJjO1xcbn1cXG4udGV4dC1pbmZvIHtcXG4gIGNvbG9yOiAjMzE3MDhmO1xcbn1cXG5hLnRleHQtaW5mbzpob3ZlciB7XFxuICBjb2xvcjogIzI0NTI2OTtcXG59XFxuLnRleHQtd2FybmluZyB7XFxuICBjb2xvcjogIzhhNmQzYjtcXG59XFxuYS50ZXh0LXdhcm5pbmc6aG92ZXIge1xcbiAgY29sb3I6ICM2NjUxMmM7XFxufVxcbi50ZXh0LWRhbmdlciB7XFxuICBjb2xvcjogI2E5NDQ0MjtcXG59XFxuYS50ZXh0LWRhbmdlcjpob3ZlciB7XFxuICBjb2xvcjogIzg0MzUzNDtcXG59XFxuLmJnLXByaW1hcnkge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcbn1cXG5hLmJnLXByaW1hcnk6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjA5MDtcXG59XFxuLmJnLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RmZjBkODtcXG59XFxuYS5iZy1zdWNjZXNzOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjMWUyYjM7XFxufVxcbi5iZy1pbmZvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7XFxufVxcbmEuYmctaW5mbzpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZkOWVlO1xcbn1cXG4uYmctd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmOGUzO1xcbn1cXG5hLmJnLXdhcm5pbmc6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZWNiNTtcXG59XFxuLmJnLWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkZWRlO1xcbn1cXG5hLmJnLWRhbmdlcjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTRiOWI5O1xcbn1cXG4ucGFnZS1oZWFkZXIge1xcbiAgcGFkZGluZy1ib3R0b206IDlweDtcXG4gIG1hcmdpbjogNDBweCAwIDIwcHg7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZWVlZTtcXG59XFxudWwsXFxub2wge1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcbnVsIHVsLFxcbm9sIHVsLFxcbnVsIG9sLFxcbm9sIG9sIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5saXN0LXVuc3R5bGVkIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbi5saXN0LWlubGluZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XFxufVxcbi5saXN0LWlubGluZSA+IGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgcGFkZGluZy1yaWdodDogNXB4O1xcbn1cXG5kbCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuZHQsXFxuZGQge1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxufVxcbmR0IHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5kZCB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuZGwtaG9yaXpvbnRhbCBkdCB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogMTYwcHg7XFxuICAgIGNsZWFyOiBsZWZ0O1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB9XFxuICAuZGwtaG9yaXpvbnRhbCBkZCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxODBweDtcXG4gIH1cXG59XFxuYWJiclt0aXRsZV0sXFxuYWJicltkYXRhLW9yaWdpbmFsLXRpdGxlXSB7XFxuICBjdXJzb3I6IGhlbHA7XFxuICBib3JkZXItYm90dG9tOiAxcHggZG90dGVkICM3Nzc3Nzc7XFxufVxcbi5pbml0aWFsaXNtIHtcXG4gIGZvbnQtc2l6ZTogOTAlO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuYmxvY2txdW90ZSB7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBtYXJnaW46IDAgMCAyMHB4O1xcbiAgZm9udC1zaXplOiAxNy41cHg7XFxuICBib3JkZXItbGVmdDogNXB4IHNvbGlkICNlZWVlZWU7XFxufVxcbmJsb2NrcXVvdGUgcDpsYXN0LWNoaWxkLFxcbmJsb2NrcXVvdGUgdWw6bGFzdC1jaGlsZCxcXG5ibG9ja3F1b3RlIG9sOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG59XFxuYmxvY2txdW90ZSBmb290ZXIsXFxuYmxvY2txdW90ZSBzbWFsbCxcXG5ibG9ja3F1b3RlIC5zbWFsbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogODAlO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuYmxvY2txdW90ZSBmb290ZXI6YmVmb3JlLFxcbmJsb2NrcXVvdGUgc21hbGw6YmVmb3JlLFxcbmJsb2NrcXVvdGUgLnNtYWxsOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIwMTQgXFxcXDAwQTAnO1xcbn1cXG4uYmxvY2txdW90ZS1yZXZlcnNlLFxcbmJsb2NrcXVvdGUucHVsbC1yaWdodCB7XFxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgI2VlZWVlZTtcXG4gIGJvcmRlci1sZWZ0OiAwO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcbi5ibG9ja3F1b3RlLXJldmVyc2UgZm9vdGVyOmJlZm9yZSxcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgZm9vdGVyOmJlZm9yZSxcXG4uYmxvY2txdW90ZS1yZXZlcnNlIHNtYWxsOmJlZm9yZSxcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgc21hbGw6YmVmb3JlLFxcbi5ibG9ja3F1b3RlLXJldmVyc2UgLnNtYWxsOmJlZm9yZSxcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgLnNtYWxsOmJlZm9yZSB7XFxuICBjb250ZW50OiAnJztcXG59XFxuLmJsb2NrcXVvdGUtcmV2ZXJzZSBmb290ZXI6YWZ0ZXIsXFxuYmxvY2txdW90ZS5wdWxsLXJpZ2h0IGZvb3RlcjphZnRlcixcXG4uYmxvY2txdW90ZS1yZXZlcnNlIHNtYWxsOmFmdGVyLFxcbmJsb2NrcXVvdGUucHVsbC1yaWdodCBzbWFsbDphZnRlcixcXG4uYmxvY2txdW90ZS1yZXZlcnNlIC5zbWFsbDphZnRlcixcXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQgLnNtYWxsOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMDBBMCBcXFxcMjAxNCc7XFxufVxcbmFkZHJlc3Mge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbn1cXG5jb2RlLFxcbmtiZCxcXG5wcmUsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFxcXCJDb3VyaWVyIE5ld1xcXCIsIG1vbm9zcGFjZTtcXG59XFxuY29kZSB7XFxuICBwYWRkaW5nOiAycHggNHB4O1xcbiAgZm9udC1zaXplOiA5MCU7XFxuICBjb2xvcjogI2M3MjU0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWYyZjQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbmtiZCB7XFxuICBwYWRkaW5nOiAycHggNHB4O1xcbiAgZm9udC1zaXplOiA5MCU7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgLTFweCAwIHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgLTFweCAwIHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxufVxcbmtiZCBrYmQge1xcbiAgcGFkZGluZzogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcbiAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xcbn1cXG5wcmUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiA5LjVweDtcXG4gIG1hcmdpbjogMCAwIDEwcHg7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcXG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2NjY2M7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbnByZSBjb2RlIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLnByZS1zY3JvbGxhYmxlIHtcXG4gIG1heC1oZWlnaHQ6IDM0MHB4O1xcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcbn1cXG4uY29udGFpbmVyIHtcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDc1MHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcXG4gIC5jb250YWluZXIge1xcbiAgICB3aWR0aDogOTcwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpIHtcXG4gIC5jb250YWluZXIge1xcbiAgICB3aWR0aDogMTE3MHB4O1xcbiAgfVxcbn1cXG4uY29udGFpbmVyLWZsdWlkIHtcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG59XFxuLnJvdyB7XFxuICBtYXJnaW4tbGVmdDogLTE1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xcbn1cXG4uY29sLXhzLTEsIC5jb2wtc20tMSwgLmNvbC1tZC0xLCAuY29sLWxnLTEsIC5jb2wteHMtMiwgLmNvbC1zbS0yLCAuY29sLW1kLTIsIC5jb2wtbGctMiwgLmNvbC14cy0zLCAuY29sLXNtLTMsIC5jb2wtbWQtMywgLmNvbC1sZy0zLCAuY29sLXhzLTQsIC5jb2wtc20tNCwgLmNvbC1tZC00LCAuY29sLWxnLTQsIC5jb2wteHMtNSwgLmNvbC1zbS01LCAuY29sLW1kLTUsIC5jb2wtbGctNSwgLmNvbC14cy02LCAuY29sLXNtLTYsIC5jb2wtbWQtNiwgLmNvbC1sZy02LCAuY29sLXhzLTcsIC5jb2wtc20tNywgLmNvbC1tZC03LCAuY29sLWxnLTcsIC5jb2wteHMtOCwgLmNvbC1zbS04LCAuY29sLW1kLTgsIC5jb2wtbGctOCwgLmNvbC14cy05LCAuY29sLXNtLTksIC5jb2wtbWQtOSwgLmNvbC1sZy05LCAuY29sLXhzLTEwLCAuY29sLXNtLTEwLCAuY29sLW1kLTEwLCAuY29sLWxnLTEwLCAuY29sLXhzLTExLCAuY29sLXNtLTExLCAuY29sLW1kLTExLCAuY29sLWxnLTExLCAuY29sLXhzLTEyLCAuY29sLXNtLTEyLCAuY29sLW1kLTEyLCAuY29sLWxnLTEyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDFweDtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XFxufVxcbi5jb2wteHMtMSwgLmNvbC14cy0yLCAuY29sLXhzLTMsIC5jb2wteHMtNCwgLmNvbC14cy01LCAuY29sLXhzLTYsIC5jb2wteHMtNywgLmNvbC14cy04LCAuY29sLXhzLTksIC5jb2wteHMtMTAsIC5jb2wteHMtMTEsIC5jb2wteHMtMTIge1xcbiAgZmxvYXQ6IGxlZnQ7XFxufVxcbi5jb2wteHMtMTIge1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5jb2wteHMtMTEge1xcbiAgd2lkdGg6IDkxLjY2NjY2NjY3JTtcXG59XFxuLmNvbC14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLTkge1xcbiAgd2lkdGg6IDc1JTtcXG59XFxuLmNvbC14cy04IHtcXG4gIHdpZHRoOiA2Ni42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtNyB7XFxuICB3aWR0aDogNTguMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLTYge1xcbiAgd2lkdGg6IDUwJTtcXG59XFxuLmNvbC14cy01IHtcXG4gIHdpZHRoOiA0MS42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtNCB7XFxuICB3aWR0aDogMzMuMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLTMge1xcbiAgd2lkdGg6IDI1JTtcXG59XFxuLmNvbC14cy0yIHtcXG4gIHdpZHRoOiAxNi42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtcHVsbC0xMiB7XFxuICByaWdodDogMTAwJTtcXG59XFxuLmNvbC14cy1wdWxsLTExIHtcXG4gIHJpZ2h0OiA5MS42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtcHVsbC0xMCB7XFxuICByaWdodDogODMuMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLXB1bGwtOSB7XFxuICByaWdodDogNzUlO1xcbn1cXG4uY29sLXhzLXB1bGwtOCB7XFxuICByaWdodDogNjYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLXB1bGwtNyB7XFxuICByaWdodDogNTguMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLXB1bGwtNiB7XFxuICByaWdodDogNTAlO1xcbn1cXG4uY29sLXhzLXB1bGwtNSB7XFxuICByaWdodDogNDEuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLXB1bGwtNCB7XFxuICByaWdodDogMzMuMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLXB1bGwtMyB7XFxuICByaWdodDogMjUlO1xcbn1cXG4uY29sLXhzLXB1bGwtMiB7XFxuICByaWdodDogMTYuNjY2NjY2NjclO1xcbn1cXG4uY29sLXhzLXB1bGwtMSB7XFxuICByaWdodDogOC4zMzMzMzMzMyU7XFxufVxcbi5jb2wteHMtcHVsbC0wIHtcXG4gIHJpZ2h0OiBhdXRvO1xcbn1cXG4uY29sLXhzLXB1c2gtMTIge1xcbiAgbGVmdDogMTAwJTtcXG59XFxuLmNvbC14cy1wdXNoLTExIHtcXG4gIGxlZnQ6IDkxLjY2NjY2NjY3JTtcXG59XFxuLmNvbC14cy1wdXNoLTEwIHtcXG4gIGxlZnQ6IDgzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1wdXNoLTkge1xcbiAgbGVmdDogNzUlO1xcbn1cXG4uY29sLXhzLXB1c2gtOCB7XFxuICBsZWZ0OiA2Ni42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtcHVzaC03IHtcXG4gIGxlZnQ6IDU4LjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1wdXNoLTYge1xcbiAgbGVmdDogNTAlO1xcbn1cXG4uY29sLXhzLXB1c2gtNSB7XFxuICBsZWZ0OiA0MS42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtcHVzaC00IHtcXG4gIGxlZnQ6IDMzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1wdXNoLTMge1xcbiAgbGVmdDogMjUlO1xcbn1cXG4uY29sLXhzLXB1c2gtMiB7XFxuICBsZWZ0OiAxNi42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtcHVzaC0xIHtcXG4gIGxlZnQ6IDguMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLXB1c2gtMCB7XFxuICBsZWZ0OiBhdXRvO1xcbn1cXG4uY29sLXhzLW9mZnNldC0xMiB7XFxuICBtYXJnaW4tbGVmdDogMTAwJTtcXG59XFxuLmNvbC14cy1vZmZzZXQtMTEge1xcbiAgbWFyZ2luLWxlZnQ6IDkxLjY2NjY2NjY3JTtcXG59XFxuLmNvbC14cy1vZmZzZXQtMTAge1xcbiAgbWFyZ2luLWxlZnQ6IDgzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1vZmZzZXQtOSB7XFxuICBtYXJnaW4tbGVmdDogNzUlO1xcbn1cXG4uY29sLXhzLW9mZnNldC04IHtcXG4gIG1hcmdpbi1sZWZ0OiA2Ni42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTcge1xcbiAgbWFyZ2luLWxlZnQ6IDU4LjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1vZmZzZXQtNiB7XFxuICBtYXJnaW4tbGVmdDogNTAlO1xcbn1cXG4uY29sLXhzLW9mZnNldC01IHtcXG4gIG1hcmdpbi1sZWZ0OiA0MS42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTQge1xcbiAgbWFyZ2luLWxlZnQ6IDMzLjMzMzMzMzMzJTtcXG59XFxuLmNvbC14cy1vZmZzZXQtMyB7XFxuICBtYXJnaW4tbGVmdDogMjUlO1xcbn1cXG4uY29sLXhzLW9mZnNldC0yIHtcXG4gIG1hcmdpbi1sZWZ0OiAxNi42NjY2NjY2NyU7XFxufVxcbi5jb2wteHMtb2Zmc2V0LTEge1xcbiAgbWFyZ2luLWxlZnQ6IDguMzMzMzMzMzMlO1xcbn1cXG4uY29sLXhzLW9mZnNldC0wIHtcXG4gIG1hcmdpbi1sZWZ0OiAwJTtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuY29sLXNtLTEsIC5jb2wtc20tMiwgLmNvbC1zbS0zLCAuY29sLXNtLTQsIC5jb2wtc20tNSwgLmNvbC1zbS02LCAuY29sLXNtLTcsIC5jb2wtc20tOCwgLmNvbC1zbS05LCAuY29sLXNtLTEwLCAuY29sLXNtLTExLCAuY29sLXNtLTEyIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICB9XFxuICAuY29sLXNtLTEyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxuICAuY29sLXNtLTExIHtcXG4gICAgd2lkdGg6IDkxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtc20tMTAge1xcbiAgICB3aWR0aDogODMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS05IHtcXG4gICAgd2lkdGg6IDc1JTtcXG4gIH1cXG4gIC5jb2wtc20tOCB7XFxuICAgIHdpZHRoOiA2Ni42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLTcge1xcbiAgICB3aWR0aDogNTguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS02IHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gIH1cXG4gIC5jb2wtc20tNSB7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLTQge1xcbiAgICB3aWR0aDogMzMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS0zIHtcXG4gICAgd2lkdGg6IDI1JTtcXG4gIH1cXG4gIC5jb2wtc20tMiB7XFxuICAgIHdpZHRoOiAxNi42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLTEge1xcbiAgICB3aWR0aDogOC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLXB1bGwtMTIge1xcbiAgICByaWdodDogMTAwJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVsbC0xMSB7XFxuICAgIHJpZ2h0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLXB1bGwtMTAge1xcbiAgICByaWdodDogODMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTkge1xcbiAgICByaWdodDogNzUlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTgge1xcbiAgICByaWdodDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTcge1xcbiAgICByaWdodDogNTguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTYge1xcbiAgICByaWdodDogNTAlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTUge1xcbiAgICByaWdodDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTQge1xcbiAgICByaWdodDogMzMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTMge1xcbiAgICByaWdodDogMjUlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTIge1xcbiAgICByaWdodDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1zbS1wdWxsLTEge1xcbiAgICByaWdodDogOC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLXNtLXB1bGwtMCB7XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTEyIHtcXG4gICAgbGVmdDogMTAwJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC0xMSB7XFxuICAgIGxlZnQ6IDkxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC0xMCB7XFxuICAgIGxlZnQ6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC05IHtcXG4gICAgbGVmdDogNzUlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTgge1xcbiAgICBsZWZ0OiA2Ni42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtNyB7XFxuICAgIGxlZnQ6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC02IHtcXG4gICAgbGVmdDogNTAlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTUge1xcbiAgICBsZWZ0OiA0MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtNCB7XFxuICAgIGxlZnQ6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tcHVzaC0zIHtcXG4gICAgbGVmdDogMjUlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTIge1xcbiAgICBsZWZ0OiAxNi42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLXB1c2gtMSB7XFxuICAgIGxlZnQ6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS1wdXNoLTAge1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtMTIge1xcbiAgICBtYXJnaW4tbGVmdDogMTAwJTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTExIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDkxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTEwIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTkge1xcbiAgICBtYXJnaW4tbGVmdDogNzUlO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtOCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA2Ni42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC03IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTYge1xcbiAgICBtYXJnaW4tbGVmdDogNTAlO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtNSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA0MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC00IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtc20tb2Zmc2V0LTMge1xcbiAgICBtYXJnaW4tbGVmdDogMjUlO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtMiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxNi42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLXNtLW9mZnNldC0xIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1zbS1vZmZzZXQtMCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XFxuICAuY29sLW1kLTEsIC5jb2wtbWQtMiwgLmNvbC1tZC0zLCAuY29sLW1kLTQsIC5jb2wtbWQtNSwgLmNvbC1tZC02LCAuY29sLW1kLTcsIC5jb2wtbWQtOCwgLmNvbC1tZC05LCAuY29sLW1kLTEwLCAuY29sLW1kLTExLCAuY29sLW1kLTEyIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICB9XFxuICAuY29sLW1kLTEyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxuICAuY29sLW1kLTExIHtcXG4gICAgd2lkdGg6IDkxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbWQtMTAge1xcbiAgICB3aWR0aDogODMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC05IHtcXG4gICAgd2lkdGg6IDc1JTtcXG4gIH1cXG4gIC5jb2wtbWQtOCB7XFxuICAgIHdpZHRoOiA2Ni42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLTcge1xcbiAgICB3aWR0aDogNTguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC02IHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gIH1cXG4gIC5jb2wtbWQtNSB7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLTQge1xcbiAgICB3aWR0aDogMzMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC0zIHtcXG4gICAgd2lkdGg6IDI1JTtcXG4gIH1cXG4gIC5jb2wtbWQtMiB7XFxuICAgIHdpZHRoOiAxNi42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLTEge1xcbiAgICB3aWR0aDogOC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLXB1bGwtMTIge1xcbiAgICByaWdodDogMTAwJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVsbC0xMSB7XFxuICAgIHJpZ2h0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLXB1bGwtMTAge1xcbiAgICByaWdodDogODMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTkge1xcbiAgICByaWdodDogNzUlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTgge1xcbiAgICByaWdodDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTcge1xcbiAgICByaWdodDogNTguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTYge1xcbiAgICByaWdodDogNTAlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTUge1xcbiAgICByaWdodDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTQge1xcbiAgICByaWdodDogMzMuMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTMge1xcbiAgICByaWdodDogMjUlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTIge1xcbiAgICByaWdodDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1tZC1wdWxsLTEge1xcbiAgICByaWdodDogOC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLW1kLXB1bGwtMCB7XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTEyIHtcXG4gICAgbGVmdDogMTAwJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC0xMSB7XFxuICAgIGxlZnQ6IDkxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC0xMCB7XFxuICAgIGxlZnQ6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC05IHtcXG4gICAgbGVmdDogNzUlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTgge1xcbiAgICBsZWZ0OiA2Ni42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtNyB7XFxuICAgIGxlZnQ6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC02IHtcXG4gICAgbGVmdDogNTAlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTUge1xcbiAgICBsZWZ0OiA0MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtNCB7XFxuICAgIGxlZnQ6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtcHVzaC0zIHtcXG4gICAgbGVmdDogMjUlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTIge1xcbiAgICBsZWZ0OiAxNi42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLXB1c2gtMSB7XFxuICAgIGxlZnQ6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC1wdXNoLTAge1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtMTIge1xcbiAgICBtYXJnaW4tbGVmdDogMTAwJTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTExIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDkxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTEwIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTkge1xcbiAgICBtYXJnaW4tbGVmdDogNzUlO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtOCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA2Ni42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC03IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTYge1xcbiAgICBtYXJnaW4tbGVmdDogNTAlO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtNSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA0MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC00IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbWQtb2Zmc2V0LTMge1xcbiAgICBtYXJnaW4tbGVmdDogMjUlO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtMiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxNi42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLW1kLW9mZnNldC0xIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1tZC1vZmZzZXQtMCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLmNvbC1sZy0xLCAuY29sLWxnLTIsIC5jb2wtbGctMywgLmNvbC1sZy00LCAuY29sLWxnLTUsIC5jb2wtbGctNiwgLmNvbC1sZy03LCAuY29sLWxnLTgsIC5jb2wtbGctOSwgLmNvbC1sZy0xMCwgLmNvbC1sZy0xMSwgLmNvbC1sZy0xMiB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgfVxcbiAgLmNvbC1sZy0xMiB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgLmNvbC1sZy0xMSB7XFxuICAgIHdpZHRoOiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLWxnLTEwIHtcXG4gICAgd2lkdGg6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctOSB7XFxuICAgIHdpZHRoOiA3NSU7XFxuICB9XFxuICAuY29sLWxnLTgge1xcbiAgICB3aWR0aDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy03IHtcXG4gICAgd2lkdGg6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctNiB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICB9XFxuICAuY29sLWxnLTUge1xcbiAgICB3aWR0aDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy00IHtcXG4gICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctMyB7XFxuICAgIHdpZHRoOiAyNSU7XFxuICB9XFxuICAuY29sLWxnLTIge1xcbiAgICB3aWR0aDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy0xIHtcXG4gICAgd2lkdGg6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1wdWxsLTEyIHtcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICB9XFxuICAuY29sLWxnLXB1bGwtMTEge1xcbiAgICByaWdodDogOTEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1wdWxsLTEwIHtcXG4gICAgcmlnaHQ6IDgzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC05IHtcXG4gICAgcmlnaHQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC04IHtcXG4gICAgcmlnaHQ6IDY2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC03IHtcXG4gICAgcmlnaHQ6IDU4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC02IHtcXG4gICAgcmlnaHQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC01IHtcXG4gICAgcmlnaHQ6IDQxLjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC00IHtcXG4gICAgcmlnaHQ6IDMzLjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC0zIHtcXG4gICAgcmlnaHQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC0yIHtcXG4gICAgcmlnaHQ6IDE2LjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVsbC0xIHtcXG4gICAgcmlnaHQ6IDguMzMzMzMzMzMlO1xcbiAgfVxcbiAgLmNvbC1sZy1wdWxsLTAge1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC0xMiB7XFxuICAgIGxlZnQ6IDEwMCU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtMTEge1xcbiAgICBsZWZ0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtMTAge1xcbiAgICBsZWZ0OiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtOSB7XFxuICAgIGxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC04IHtcXG4gICAgbGVmdDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTcge1xcbiAgICBsZWZ0OiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtNiB7XFxuICAgIGxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC01IHtcXG4gICAgbGVmdDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTQge1xcbiAgICBsZWZ0OiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLXB1c2gtMyB7XFxuICAgIGxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC0yIHtcXG4gICAgbGVmdDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1wdXNoLTEge1xcbiAgICBsZWZ0OiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctcHVzaC0wIHtcXG4gICAgbGVmdDogYXV0bztcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTEyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwMCU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC0xMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA5MS42NjY2NjY2NyU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC0xMCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4My4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC05IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTgge1xcbiAgICBtYXJnaW4tbGVmdDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtNyB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1OC4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC02IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTUge1xcbiAgICBtYXJnaW4tbGVmdDogNDEuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtNCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMy4zMzMzMzMzMyU7XFxuICB9XFxuICAuY29sLWxnLW9mZnNldC0zIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTIge1xcbiAgICBtYXJnaW4tbGVmdDogMTYuNjY2NjY2NjclO1xcbiAgfVxcbiAgLmNvbC1sZy1vZmZzZXQtMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4LjMzMzMzMzMzJTtcXG4gIH1cXG4gIC5jb2wtbGctb2Zmc2V0LTAge1xcbiAgICBtYXJnaW4tbGVmdDogMCU7XFxuICB9XFxufVxcbnRhYmxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5jYXB0aW9uIHtcXG4gIHBhZGRpbmctdG9wOiA4cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcbiAgY29sb3I6ICM3Nzc3Nzc7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG50aCB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG4udGFibGUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGgsXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0aCxcXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGQsXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRkLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0ZCB7XFxuICBwYWRkaW5nOiA4cHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZGRkZDtcXG59XFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2RkZGRkZDtcXG59XFxuLnRhYmxlID4gY2FwdGlvbiArIHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCxcXG4udGFibGUgPiBjb2xncm91cCArIHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCxcXG4udGFibGUgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgsXFxuLnRhYmxlID4gY2FwdGlvbiArIHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCxcXG4udGFibGUgPiBjb2xncm91cCArIHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCxcXG4udGFibGUgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkID4gdGQge1xcbiAgYm9yZGVyLXRvcDogMDtcXG59XFxuLnRhYmxlID4gdGJvZHkgKyB0Ym9keSB7XFxuICBib3JkZXItdG9wOiAycHggc29saWQgI2RkZGRkZDtcXG59XFxuLnRhYmxlIC50YWJsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG4udGFibGUtY29uZGVuc2VkID4gdGhlYWQgPiB0ciA+IHRoLFxcbi50YWJsZS1jb25kZW5zZWQgPiB0Ym9keSA+IHRyID4gdGgsXFxuLnRhYmxlLWNvbmRlbnNlZCA+IHRmb290ID4gdHIgPiB0aCxcXG4udGFibGUtY29uZGVuc2VkID4gdGhlYWQgPiB0ciA+IHRkLFxcbi50YWJsZS1jb25kZW5zZWQgPiB0Ym9keSA+IHRyID4gdGQsXFxuLnRhYmxlLWNvbmRlbnNlZCA+IHRmb290ID4gdHIgPiB0ZCB7XFxuICBwYWRkaW5nOiA1cHg7XFxufVxcbi50YWJsZS1ib3JkZXJlZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xcbn1cXG4udGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGgsXFxuLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRoLFxcbi50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0aCxcXG4udGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGQsXFxuLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRkLFxcbi50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0ZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xcbn1cXG4udGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGgsXFxuLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRkIHtcXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDJweDtcXG59XFxuLnRhYmxlLXN0cmlwZWQgPiB0Ym9keSA+IHRyOm50aC1vZi10eXBlKG9kZCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcXG59XFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0cjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbn1cXG50YWJsZSBjb2xbY2xhc3MqPVxcXCJjb2wtXFxcIl0ge1xcbiAgcG9zaXRpb246IHN0YXRpYztcXG4gIGZsb2F0OiBub25lO1xcbiAgZGlzcGxheTogdGFibGUtY29sdW1uO1xcbn1cXG50YWJsZSB0ZFtjbGFzcyo9XFxcImNvbC1cXFwiXSxcXG50YWJsZSB0aFtjbGFzcyo9XFxcImNvbC1cXFwiXSB7XFxuICBwb3NpdGlvbjogc3RhdGljO1xcbiAgZmxvYXQ6IG5vbmU7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbn1cXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGQuYWN0aXZlLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZC5hY3RpdmUsXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRkLmFjdGl2ZSxcXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGguYWN0aXZlLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0aC5hY3RpdmUsXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRoLmFjdGl2ZSxcXG4udGFibGUgPiB0aGVhZCA+IHRyLmFjdGl2ZSA+IHRkLFxcbi50YWJsZSA+IHRib2R5ID4gdHIuYWN0aXZlID4gdGQsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci5hY3RpdmUgPiB0ZCxcXG4udGFibGUgPiB0aGVhZCA+IHRyLmFjdGl2ZSA+IHRoLFxcbi50YWJsZSA+IHRib2R5ID4gdHIuYWN0aXZlID4gdGgsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci5hY3RpdmUgPiB0aCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbn1cXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyID4gdGQuYWN0aXZlOmhvdmVyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIgPiB0aC5hY3RpdmU6aG92ZXIsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ci5hY3RpdmU6aG92ZXIgPiB0ZCxcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyOmhvdmVyID4gLmFjdGl2ZSxcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyLmFjdGl2ZTpob3ZlciA+IHRoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGU4ZTg7XFxufVxcbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0ZC5zdWNjZXNzLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZC5zdWNjZXNzLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0ZC5zdWNjZXNzLFxcbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0aC5zdWNjZXNzLFxcbi50YWJsZSA+IHRib2R5ID4gdHIgPiB0aC5zdWNjZXNzLFxcbi50YWJsZSA+IHRmb290ID4gdHIgPiB0aC5zdWNjZXNzLFxcbi50YWJsZSA+IHRoZWFkID4gdHIuc3VjY2VzcyA+IHRkLFxcbi50YWJsZSA+IHRib2R5ID4gdHIuc3VjY2VzcyA+IHRkLFxcbi50YWJsZSA+IHRmb290ID4gdHIuc3VjY2VzcyA+IHRkLFxcbi50YWJsZSA+IHRoZWFkID4gdHIuc3VjY2VzcyA+IHRoLFxcbi50YWJsZSA+IHRib2R5ID4gdHIuc3VjY2VzcyA+IHRoLFxcbi50YWJsZSA+IHRmb290ID4gdHIuc3VjY2VzcyA+IHRoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZmYwZDg7XFxufVxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIgPiB0ZC5zdWNjZXNzOmhvdmVyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIgPiB0aC5zdWNjZXNzOmhvdmVyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIuc3VjY2Vzczpob3ZlciA+IHRkLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHI6aG92ZXIgPiAuc3VjY2VzcyxcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyLnN1Y2Nlc3M6aG92ZXIgPiB0aCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBlOWM2O1xcbn1cXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGQuaW5mbyxcXG4udGFibGUgPiB0Ym9keSA+IHRyID4gdGQuaW5mbyxcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGQuaW5mbyxcXG4udGFibGUgPiB0aGVhZCA+IHRyID4gdGguaW5mbyxcXG4udGFibGUgPiB0Ym9keSA+IHRyID4gdGguaW5mbyxcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGguaW5mbyxcXG4udGFibGUgPiB0aGVhZCA+IHRyLmluZm8gPiB0ZCxcXG4udGFibGUgPiB0Ym9keSA+IHRyLmluZm8gPiB0ZCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyLmluZm8gPiB0ZCxcXG4udGFibGUgPiB0aGVhZCA+IHRyLmluZm8gPiB0aCxcXG4udGFibGUgPiB0Ym9keSA+IHRyLmluZm8gPiB0aCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyLmluZm8gPiB0aCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDllZGY3O1xcbn1cXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyID4gdGQuaW5mbzpob3ZlcixcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyID4gdGguaW5mbzpob3ZlcixcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyLmluZm86aG92ZXIgPiB0ZCxcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyOmhvdmVyID4gLmluZm8sXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ci5pbmZvOmhvdmVyID4gdGgge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M0ZTNmMztcXG59XFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLndhcm5pbmcsXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRkLndhcm5pbmcsXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRkLndhcm5pbmcsXFxuLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLndhcm5pbmcsXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLndhcm5pbmcsXFxuLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRoLndhcm5pbmcsXFxuLnRhYmxlID4gdGhlYWQgPiB0ci53YXJuaW5nID4gdGQsXFxuLnRhYmxlID4gdGJvZHkgPiB0ci53YXJuaW5nID4gdGQsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci53YXJuaW5nID4gdGQsXFxuLnRhYmxlID4gdGhlYWQgPiB0ci53YXJuaW5nID4gdGgsXFxuLnRhYmxlID4gdGJvZHkgPiB0ci53YXJuaW5nID4gdGgsXFxuLnRhYmxlID4gdGZvb3QgPiB0ci53YXJuaW5nID4gdGgge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZjhlMztcXG59XFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ciA+IHRkLndhcm5pbmc6aG92ZXIsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ciA+IHRoLndhcm5pbmc6aG92ZXIsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ci53YXJuaW5nOmhvdmVyID4gdGQsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0cjpob3ZlciA+IC53YXJuaW5nLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIud2FybmluZzpob3ZlciA+IHRoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWYyY2M7XFxufVxcbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0ZC5kYW5nZXIsXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRkLmRhbmdlcixcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGQuZGFuZ2VyLFxcbi50YWJsZSA+IHRoZWFkID4gdHIgPiB0aC5kYW5nZXIsXFxuLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLmRhbmdlcixcXG4udGFibGUgPiB0Zm9vdCA+IHRyID4gdGguZGFuZ2VyLFxcbi50YWJsZSA+IHRoZWFkID4gdHIuZGFuZ2VyID4gdGQsXFxuLnRhYmxlID4gdGJvZHkgPiB0ci5kYW5nZXIgPiB0ZCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyLmRhbmdlciA+IHRkLFxcbi50YWJsZSA+IHRoZWFkID4gdHIuZGFuZ2VyID4gdGgsXFxuLnRhYmxlID4gdGJvZHkgPiB0ci5kYW5nZXIgPiB0aCxcXG4udGFibGUgPiB0Zm9vdCA+IHRyLmRhbmdlciA+IHRoIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmRlZGU7XFxufVxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIgPiB0ZC5kYW5nZXI6aG92ZXIsXFxuLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ciA+IHRoLmRhbmdlcjpob3ZlcixcXG4udGFibGUtaG92ZXIgPiB0Ym9keSA+IHRyLmRhbmdlcjpob3ZlciA+IHRkLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHI6aG92ZXIgPiAuZGFuZ2VyLFxcbi50YWJsZS1ob3ZlciA+IHRib2R5ID4gdHIuZGFuZ2VyOmhvdmVyID4gdGgge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ViY2NjYztcXG59XFxuLnRhYmxlLXJlc3BvbnNpdmUge1xcbiAgb3ZlcmZsb3cteDogYXV0bztcXG4gIG1pbi1oZWlnaHQ6IDAuMDElO1xcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLnRhYmxlLXJlc3BvbnNpdmUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgICAtbXMtb3ZlcmZsb3ctc3R5bGU6IC1tcy1hdXRvaGlkaW5nLXNjcm9sbGJhcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcXG4gIH1cXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIH1cXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUgPiB0Ym9keSA+IHRyID4gdGgsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZSA+IHRmb290ID4gdHIgPiB0aCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUgPiB0Ym9keSA+IHRyID4gdGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZSA+IHRmb290ID4gdHIgPiB0ZCB7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB9XFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCB7XFxuICAgIGJvcmRlcjogMDtcXG4gIH1cXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRoOmZpcnN0LWNoaWxkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGg6Zmlyc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0aDpmaXJzdC1jaGlsZCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRkOmZpcnN0LWNoaWxkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGQ6Zmlyc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0ZDpmaXJzdC1jaGlsZCB7XFxuICAgIGJvcmRlci1sZWZ0OiAwO1xcbiAgfVxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGg6bGFzdC1jaGlsZCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRoOmxhc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0aDpsYXN0LWNoaWxkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGQ6bGFzdC1jaGlsZCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRkOmxhc3QtY2hpbGQsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0ZDpsYXN0LWNoaWxkIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xcbiAgfVxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmxhc3QtY2hpbGQgPiB0aCxcXG4gIC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0cjpsYXN0LWNoaWxkID4gdGgsXFxuICAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6bGFzdC1jaGlsZCA+IHRkLFxcbiAgLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyOmxhc3QtY2hpbGQgPiB0ZCB7XFxuICAgIGJvcmRlci1ib3R0b206IDA7XFxuICB9XFxufVxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3JkZXI6IDA7XFxuICBtaW4td2lkdGg6IDA7XFxufVxcbmxlZ2VuZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDIxcHg7XFxuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU1ZTU7XFxufVxcbmxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdLFxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgbWFyZ2luOiA0cHggMCAwO1xcbiAgbWFyZ2luLXRvcDogMXB4IFxcXFw5O1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG59XFxuaW5wdXRbdHlwZT1cXFwiZmlsZVxcXCJdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJyYW5nZVxcXCJdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbnNlbGVjdFttdWx0aXBsZV0sXFxuc2VsZWN0W3NpemVdIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuaW5wdXRbdHlwZT1cXFwiZmlsZVxcXCJdOmZvY3VzLFxcbmlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Zm9jdXMsXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpmb2N1cyB7XFxuICBvdXRsaW5lOiB0aGluIGRvdHRlZDtcXG4gIG91dGxpbmU6IDVweCBhdXRvIC13ZWJraXQtZm9jdXMtcmluZy1jb2xvcjtcXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xcbn1cXG5vdXRwdXQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nLXRvcDogN3B4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICBjb2xvcjogIzU1NTU1NTtcXG59XFxuLmZvcm0tY29udHJvbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzNHB4O1xcbiAgcGFkZGluZzogNnB4IDEycHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGNvbG9yOiAjNTU1NTU1O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGJvcmRlci1jb2xvciBlYXNlLWluLW91dCAuMTVzLCAtd2Via2l0LWJveC1zaGFkb3cgZWFzZS1pbi1vdXQgLjE1cztcXG4gIC1vLXRyYW5zaXRpb246IGJvcmRlci1jb2xvciBlYXNlLWluLW91dCAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IC4xNXM7XFxuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgLjE1cywgYm94LXNoYWRvdyBlYXNlLWluLW91dCAuMTVzO1xcbn1cXG4uZm9ybS1jb250cm9sOmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogIzY2YWZlOTtcXG4gIG91dGxpbmU6IDA7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpLCAwIDAgOHB4IHJnYmEoMTAyLCAxNzUsIDIzMywgMC42KTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpLCAwIDAgOHB4IHJnYmEoMTAyLCAxNzUsIDIzMywgMC42KTtcXG59XFxuLmZvcm0tY29udHJvbDo6LW1vei1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogIzk5OTk5OTtcXG4gIG9wYWNpdHk6IDE7XFxufVxcbi5mb3JtLWNvbnRyb2w6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjOTk5OTk5O1xcbn1cXG4uZm9ybS1jb250cm9sOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjOTk5OTk5O1xcbn1cXG4uZm9ybS1jb250cm9sW2Rpc2FibGVkXSxcXG4uZm9ybS1jb250cm9sW3JlYWRvbmx5XSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmZvcm0tY29udHJvbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xcbiAgb3BhY2l0eTogMTtcXG59XFxuLmZvcm0tY29udHJvbFtkaXNhYmxlZF0sXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5mb3JtLWNvbnRyb2wge1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxudGV4dGFyZWEuZm9ybS1jb250cm9sIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuaW5wdXRbdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAwKSB7XFxuICBpbnB1dFt0eXBlPVxcXCJkYXRlXFxcIl0sXFxuICBpbnB1dFt0eXBlPVxcXCJ0aW1lXFxcIl0sXFxuICBpbnB1dFt0eXBlPVxcXCJkYXRldGltZS1sb2NhbFxcXCJdLFxcbiAgaW5wdXRbdHlwZT1cXFwibW9udGhcXFwiXSB7XFxuICAgIGxpbmUtaGVpZ2h0OiAzNHB4O1xcbiAgfVxcbiAgaW5wdXRbdHlwZT1cXFwiZGF0ZVxcXCJdLmlucHV0LXNtLFxcbiAgaW5wdXRbdHlwZT1cXFwidGltZVxcXCJdLmlucHV0LXNtLFxcbiAgaW5wdXRbdHlwZT1cXFwiZGF0ZXRpbWUtbG9jYWxcXFwiXS5pbnB1dC1zbSxcXG4gIGlucHV0W3R5cGU9XFxcIm1vbnRoXFxcIl0uaW5wdXQtc20sXFxuICAuaW5wdXQtZ3JvdXAtc20gaW5wdXRbdHlwZT1cXFwiZGF0ZVxcXCJdLFxcbiAgLmlucHV0LWdyb3VwLXNtIGlucHV0W3R5cGU9XFxcInRpbWVcXFwiXSxcXG4gIC5pbnB1dC1ncm91cC1zbSBpbnB1dFt0eXBlPVxcXCJkYXRldGltZS1sb2NhbFxcXCJdLFxcbiAgLmlucHV0LWdyb3VwLXNtIGlucHV0W3R5cGU9XFxcIm1vbnRoXFxcIl0ge1xcbiAgICBsaW5lLWhlaWdodDogMzBweDtcXG4gIH1cXG4gIGlucHV0W3R5cGU9XFxcImRhdGVcXFwiXS5pbnB1dC1sZyxcXG4gIGlucHV0W3R5cGU9XFxcInRpbWVcXFwiXS5pbnB1dC1sZyxcXG4gIGlucHV0W3R5cGU9XFxcImRhdGV0aW1lLWxvY2FsXFxcIl0uaW5wdXQtbGcsXFxuICBpbnB1dFt0eXBlPVxcXCJtb250aFxcXCJdLmlucHV0LWxnLFxcbiAgLmlucHV0LWdyb3VwLWxnIGlucHV0W3R5cGU9XFxcImRhdGVcXFwiXSxcXG4gIC5pbnB1dC1ncm91cC1sZyBpbnB1dFt0eXBlPVxcXCJ0aW1lXFxcIl0sXFxuICAuaW5wdXQtZ3JvdXAtbGcgaW5wdXRbdHlwZT1cXFwiZGF0ZXRpbWUtbG9jYWxcXFwiXSxcXG4gIC5pbnB1dC1ncm91cC1sZyBpbnB1dFt0eXBlPVxcXCJtb250aFxcXCJdIHtcXG4gICAgbGluZS1oZWlnaHQ6IDQ2cHg7XFxuICB9XFxufVxcbi5mb3JtLWdyb3VwIHtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxufVxcbi5yYWRpbyxcXG4uY2hlY2tib3gge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuLnJhZGlvIGxhYmVsLFxcbi5jaGVja2JveCBsYWJlbCB7XFxuICBtaW4taGVpZ2h0OiAyMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5yYWRpbyBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdLFxcbi5yYWRpby1pbmxpbmUgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSxcXG4uY2hlY2tib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG4uY2hlY2tib3gtaW5saW5lIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xcbiAgbWFyZ2luLXRvcDogNHB4IFxcXFw5O1xcbn1cXG4ucmFkaW8gKyAucmFkaW8sXFxuLmNoZWNrYm94ICsgLmNoZWNrYm94IHtcXG4gIG1hcmdpbi10b3A6IC01cHg7XFxufVxcbi5yYWRpby1pbmxpbmUsXFxuLmNoZWNrYm94LWlubGluZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5yYWRpby1pbmxpbmUgKyAucmFkaW8taW5saW5lLFxcbi5jaGVja2JveC1pbmxpbmUgKyAuY2hlY2tib3gtaW5saW5lIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXVtkaXNhYmxlZF0sXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXVtkaXNhYmxlZF0sXFxuaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXS5kaXNhYmxlZCxcXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdLmRpc2FibGVkLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcbi5yYWRpby1pbmxpbmUuZGlzYWJsZWQsXFxuLmNoZWNrYm94LWlubGluZS5kaXNhYmxlZCxcXG5maWVsZHNldFtkaXNhYmxlZF0gLnJhZGlvLWlubGluZSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmNoZWNrYm94LWlubGluZSB7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG4ucmFkaW8uZGlzYWJsZWQgbGFiZWwsXFxuLmNoZWNrYm94LmRpc2FibGVkIGxhYmVsLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAucmFkaW8gbGFiZWwsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5jaGVja2JveCBsYWJlbCB7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG4uZm9ybS1jb250cm9sLXN0YXRpYyB7XFxuICBwYWRkaW5nLXRvcDogN3B4O1xcbiAgcGFkZGluZy1ib3R0b206IDdweDtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxuICBtaW4taGVpZ2h0OiAzNHB4O1xcbn1cXG4uZm9ybS1jb250cm9sLXN0YXRpYy5pbnB1dC1sZyxcXG4uZm9ybS1jb250cm9sLXN0YXRpYy5pbnB1dC1zbSB7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxuICBwYWRkaW5nLXJpZ2h0OiAwO1xcbn1cXG4uaW5wdXQtc20ge1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG5zZWxlY3QuaW5wdXQtc20ge1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxufVxcbnRleHRhcmVhLmlucHV0LXNtLFxcbnNlbGVjdFttdWx0aXBsZV0uaW5wdXQtc20ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG4uZm9ybS1ncm91cC1zbSAuZm9ybS1jb250cm9sIHtcXG4gIGhlaWdodDogMzBweDtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuc2VsZWN0LmZvcm0tZ3JvdXAtc20gLmZvcm0tY29udHJvbCB7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBsaW5lLWhlaWdodDogMzBweDtcXG59XFxudGV4dGFyZWEuZm9ybS1ncm91cC1zbSAuZm9ybS1jb250cm9sLFxcbnNlbGVjdFttdWx0aXBsZV0uZm9ybS1ncm91cC1zbSAuZm9ybS1jb250cm9sIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuLmZvcm0tZ3JvdXAtc20gLmZvcm0tY29udHJvbC1zdGF0aWMge1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgbWluLWhlaWdodDogMzJweDtcXG59XFxuLmlucHV0LWxnIHtcXG4gIGhlaWdodDogNDZweDtcXG4gIHBhZGRpbmc6IDEwcHggMTZweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjMzMzMzMzM7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbnNlbGVjdC5pbnB1dC1sZyB7XFxuICBoZWlnaHQ6IDQ2cHg7XFxuICBsaW5lLWhlaWdodDogNDZweDtcXG59XFxudGV4dGFyZWEuaW5wdXQtbGcsXFxuc2VsZWN0W211bHRpcGxlXS5pbnB1dC1sZyB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5mb3JtLWdyb3VwLWxnIC5mb3JtLWNvbnRyb2wge1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgcGFkZGluZzogMTBweCAxNnB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuMzMzMzMzMztcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuc2VsZWN0LmZvcm0tZ3JvdXAtbGcgLmZvcm0tY29udHJvbCB7XFxuICBoZWlnaHQ6IDQ2cHg7XFxuICBsaW5lLWhlaWdodDogNDZweDtcXG59XFxudGV4dGFyZWEuZm9ybS1ncm91cC1sZyAuZm9ybS1jb250cm9sLFxcbnNlbGVjdFttdWx0aXBsZV0uZm9ybS1ncm91cC1sZyAuZm9ybS1jb250cm9sIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuLmZvcm0tZ3JvdXAtbGcgLmZvcm0tY29udHJvbC1zdGF0aWMge1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgcGFkZGluZzogMTBweCAxNnB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuMzMzMzMzMztcXG4gIG1pbi1oZWlnaHQ6IDM4cHg7XFxufVxcbi5oYXMtZmVlZGJhY2sge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uaGFzLWZlZWRiYWNrIC5mb3JtLWNvbnRyb2wge1xcbiAgcGFkZGluZy1yaWdodDogNDIuNXB4O1xcbn1cXG4uZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgei1pbmRleDogMjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDM0cHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxuICBsaW5lLWhlaWdodDogMzRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uaW5wdXQtbGcgKyAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIHdpZHRoOiA0NnB4O1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ2cHg7XFxufVxcbi5pbnB1dC1zbSArIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBsaW5lLWhlaWdodDogMzBweDtcXG59XFxuLmhhcy1zdWNjZXNzIC5oZWxwLWJsb2NrLFxcbi5oYXMtc3VjY2VzcyAuY29udHJvbC1sYWJlbCxcXG4uaGFzLXN1Y2Nlc3MgLnJhZGlvLFxcbi5oYXMtc3VjY2VzcyAuY2hlY2tib3gsXFxuLmhhcy1zdWNjZXNzIC5yYWRpby1pbmxpbmUsXFxuLmhhcy1zdWNjZXNzIC5jaGVja2JveC1pbmxpbmUsXFxuLmhhcy1zdWNjZXNzLnJhZGlvIGxhYmVsLFxcbi5oYXMtc3VjY2Vzcy5jaGVja2JveCBsYWJlbCxcXG4uaGFzLXN1Y2Nlc3MucmFkaW8taW5saW5lIGxhYmVsLFxcbi5oYXMtc3VjY2Vzcy5jaGVja2JveC1pbmxpbmUgbGFiZWwge1xcbiAgY29sb3I6ICMzYzc2M2Q7XFxufVxcbi5oYXMtc3VjY2VzcyAuZm9ybS1jb250cm9sIHtcXG4gIGJvcmRlci1jb2xvcjogIzNjNzYzZDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbn1cXG4uaGFzLXN1Y2Nlc3MgLmZvcm0tY29udHJvbDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICMyYjU0MmM7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjNjdiMTY4O1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpLCAwIDAgNnB4ICM2N2IxNjg7XFxufVxcbi5oYXMtc3VjY2VzcyAuaW5wdXQtZ3JvdXAtYWRkb24ge1xcbiAgY29sb3I6ICMzYzc2M2Q7XFxuICBib3JkZXItY29sb3I6ICMzYzc2M2Q7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGZmMGQ4O1xcbn1cXG4uaGFzLXN1Y2Nlc3MgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICBjb2xvcjogIzNjNzYzZDtcXG59XFxuLmhhcy13YXJuaW5nIC5oZWxwLWJsb2NrLFxcbi5oYXMtd2FybmluZyAuY29udHJvbC1sYWJlbCxcXG4uaGFzLXdhcm5pbmcgLnJhZGlvLFxcbi5oYXMtd2FybmluZyAuY2hlY2tib3gsXFxuLmhhcy13YXJuaW5nIC5yYWRpby1pbmxpbmUsXFxuLmhhcy13YXJuaW5nIC5jaGVja2JveC1pbmxpbmUsXFxuLmhhcy13YXJuaW5nLnJhZGlvIGxhYmVsLFxcbi5oYXMtd2FybmluZy5jaGVja2JveCBsYWJlbCxcXG4uaGFzLXdhcm5pbmcucmFkaW8taW5saW5lIGxhYmVsLFxcbi5oYXMtd2FybmluZy5jaGVja2JveC1pbmxpbmUgbGFiZWwge1xcbiAgY29sb3I6ICM4YTZkM2I7XFxufVxcbi5oYXMtd2FybmluZyAuZm9ybS1jb250cm9sIHtcXG4gIGJvcmRlci1jb2xvcjogIzhhNmQzYjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbn1cXG4uaGFzLXdhcm5pbmcgLmZvcm0tY29udHJvbDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICM2NjUxMmM7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjYzBhMTZiO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpLCAwIDAgNnB4ICNjMGExNmI7XFxufVxcbi5oYXMtd2FybmluZyAuaW5wdXQtZ3JvdXAtYWRkb24ge1xcbiAgY29sb3I6ICM4YTZkM2I7XFxuICBib3JkZXItY29sb3I6ICM4YTZkM2I7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmOGUzO1xcbn1cXG4uaGFzLXdhcm5pbmcgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICBjb2xvcjogIzhhNmQzYjtcXG59XFxuLmhhcy1lcnJvciAuaGVscC1ibG9jayxcXG4uaGFzLWVycm9yIC5jb250cm9sLWxhYmVsLFxcbi5oYXMtZXJyb3IgLnJhZGlvLFxcbi5oYXMtZXJyb3IgLmNoZWNrYm94LFxcbi5oYXMtZXJyb3IgLnJhZGlvLWlubGluZSxcXG4uaGFzLWVycm9yIC5jaGVja2JveC1pbmxpbmUsXFxuLmhhcy1lcnJvci5yYWRpbyBsYWJlbCxcXG4uaGFzLWVycm9yLmNoZWNrYm94IGxhYmVsLFxcbi5oYXMtZXJyb3IucmFkaW8taW5saW5lIGxhYmVsLFxcbi5oYXMtZXJyb3IuY2hlY2tib3gtaW5saW5lIGxhYmVsIHtcXG4gIGNvbG9yOiAjYTk0NDQyO1xcbn1cXG4uaGFzLWVycm9yIC5mb3JtLWNvbnRyb2wge1xcbiAgYm9yZGVyLWNvbG9yOiAjYTk0NDQyO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxufVxcbi5oYXMtZXJyb3IgLmZvcm0tY29udHJvbDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICM4NDM1MzQ7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KSwgMCAwIDZweCAjY2U4NDgzO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpLCAwIDAgNnB4ICNjZTg0ODM7XFxufVxcbi5oYXMtZXJyb3IgLmlucHV0LWdyb3VwLWFkZG9uIHtcXG4gIGNvbG9yOiAjYTk0NDQyO1xcbiAgYm9yZGVyLWNvbG9yOiAjYTk0NDQyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZGVkZTtcXG59XFxuLmhhcy1lcnJvciAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gIGNvbG9yOiAjYTk0NDQyO1xcbn1cXG4uaGFzLWZlZWRiYWNrIGxhYmVsIH4gLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICB0b3A6IDI1cHg7XFxufVxcbi5oYXMtZmVlZGJhY2sgbGFiZWwuc3Itb25seSB+IC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgdG9wOiAwO1xcbn1cXG4uaGVscC1ibG9jayB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi10b3A6IDVweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBjb2xvcjogIzczNzM3MztcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuZm9ybS1pbmxpbmUgLmZvcm0tZ3JvdXAge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLmZvcm0tY29udHJvbCB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLmZvcm0tY29udHJvbC1zdGF0aWMge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLmlucHV0LWdyb3VwIHtcXG4gICAgZGlzcGxheTogaW5saW5lLXRhYmxlO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtYWRkb24sXFxuICAuZm9ybS1pbmxpbmUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1idG4sXFxuICAuZm9ybS1pbmxpbmUgLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2wge1xcbiAgICB3aWR0aDogYXV0bztcXG4gIH1cXG4gIC5mb3JtLWlubGluZSAuaW5wdXQtZ3JvdXAgPiAuZm9ybS1jb250cm9sIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLmNvbnRyb2wtbGFiZWwge1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLmZvcm0taW5saW5lIC5yYWRpbyxcXG4gIC5mb3JtLWlubGluZSAuY2hlY2tib3gge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLnJhZGlvIGxhYmVsLFxcbiAgLmZvcm0taW5saW5lIC5jaGVja2JveCBsYWJlbCB7XFxuICAgIHBhZGRpbmctbGVmdDogMDtcXG4gIH1cXG4gIC5mb3JtLWlubGluZSAucmFkaW8gaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSxcXG4gIC5mb3JtLWlubGluZSAuY2hlY2tib3ggaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICB9XFxuICAuZm9ybS1pbmxpbmUgLmhhcy1mZWVkYmFjayAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcXG4gICAgdG9wOiAwO1xcbiAgfVxcbn1cXG4uZm9ybS1ob3Jpem9udGFsIC5yYWRpbyxcXG4uZm9ybS1ob3Jpem9udGFsIC5jaGVja2JveCxcXG4uZm9ybS1ob3Jpem9udGFsIC5yYWRpby1pbmxpbmUsXFxuLmZvcm0taG9yaXpvbnRhbCAuY2hlY2tib3gtaW5saW5lIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgcGFkZGluZy10b3A6IDdweDtcXG59XFxuLmZvcm0taG9yaXpvbnRhbCAucmFkaW8sXFxuLmZvcm0taG9yaXpvbnRhbCAuY2hlY2tib3gge1xcbiAgbWluLWhlaWdodDogMjdweDtcXG59XFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cCB7XFxuICBtYXJnaW4tbGVmdDogLTE1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5mb3JtLWhvcml6b250YWwgLmNvbnRyb2wtbGFiZWwge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgcGFkZGluZy10b3A6IDdweDtcXG4gIH1cXG59XFxuLmZvcm0taG9yaXpvbnRhbCAuaGFzLWZlZWRiYWNrIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xcbiAgcmlnaHQ6IDE1cHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cC1sZyAuY29udHJvbC1sYWJlbCB7XFxuICAgIHBhZGRpbmctdG9wOiAxNC4zMzMzMzNweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuZm9ybS1ob3Jpem9udGFsIC5mb3JtLWdyb3VwLXNtIC5jb250cm9sLWxhYmVsIHtcXG4gICAgcGFkZGluZy10b3A6IDZweDtcXG4gIH1cXG59XFxuLmJ0biB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAtbXMtdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XFxuICAgICAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgcGFkZGluZzogNnB4IDEycHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5idG46Zm9jdXMsXFxuLmJ0bjphY3RpdmU6Zm9jdXMsXFxuLmJ0bi5hY3RpdmU6Zm9jdXMsXFxuLmJ0bi5mb2N1cyxcXG4uYnRuOmFjdGl2ZS5mb2N1cyxcXG4uYnRuLmFjdGl2ZS5mb2N1cyB7XFxuICBvdXRsaW5lOiB0aGluIGRvdHRlZDtcXG4gIG91dGxpbmU6IDVweCBhdXRvIC13ZWJraXQtZm9jdXMtcmluZy1jb2xvcjtcXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xcbn1cXG4uYnRuOmhvdmVyLFxcbi5idG46Zm9jdXMsXFxuLmJ0bi5mb2N1cyB7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuLmJ0bjphY3RpdmUsXFxuLmJ0bi5hY3RpdmUge1xcbiAgb3V0bGluZTogMDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcXG59XFxuLmJ0bi5kaXNhYmxlZCxcXG4uYnRuW2Rpc2FibGVkXSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0biB7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvcGFjaXR5OiAwLjY1O1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTY1KTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcbi5idG4tZGVmYXVsdCB7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXItY29sb3I6ICNjY2NjY2M7XFxufVxcbi5idG4tZGVmYXVsdDpob3ZlcixcXG4uYnRuLWRlZmF1bHQ6Zm9jdXMsXFxuLmJ0bi1kZWZhdWx0LmZvY3VzLFxcbi5idG4tZGVmYXVsdDphY3RpdmUsXFxuLmJ0bi1kZWZhdWx0LmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWRlZmF1bHQge1xcbiAgY29sb3I6ICMzMzMzMzM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmU2O1xcbiAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xcbn1cXG4uYnRuLWRlZmF1bHQ6YWN0aXZlLFxcbi5idG4tZGVmYXVsdC5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxufVxcbi5idG4tZGVmYXVsdC5kaXNhYmxlZCxcXG4uYnRuLWRlZmF1bHRbZGlzYWJsZWRdLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRlZmF1bHQsXFxuLmJ0bi1kZWZhdWx0LmRpc2FibGVkOmhvdmVyLFxcbi5idG4tZGVmYXVsdFtkaXNhYmxlZF06aG92ZXIsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGVmYXVsdDpob3ZlcixcXG4uYnRuLWRlZmF1bHQuZGlzYWJsZWQ6Zm9jdXMsXFxuLmJ0bi1kZWZhdWx0W2Rpc2FibGVkXTpmb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kZWZhdWx0OmZvY3VzLFxcbi5idG4tZGVmYXVsdC5kaXNhYmxlZC5mb2N1cyxcXG4uYnRuLWRlZmF1bHRbZGlzYWJsZWRdLmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRlZmF1bHQuZm9jdXMsXFxuLmJ0bi1kZWZhdWx0LmRpc2FibGVkOmFjdGl2ZSxcXG4uYnRuLWRlZmF1bHRbZGlzYWJsZWRdOmFjdGl2ZSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kZWZhdWx0OmFjdGl2ZSxcXG4uYnRuLWRlZmF1bHQuZGlzYWJsZWQuYWN0aXZlLFxcbi5idG4tZGVmYXVsdFtkaXNhYmxlZF0uYWN0aXZlLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRlZmF1bHQuYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXItY29sb3I6ICNjY2NjY2M7XFxufVxcbi5idG4tZGVmYXVsdCAuYmFkZ2Uge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzMzO1xcbn1cXG4uYnRuLXByaW1hcnkge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcbiAgYm9yZGVyLWNvbG9yOiAjMmU2ZGE0O1xcbn1cXG4uYnRuLXByaW1hcnk6aG92ZXIsXFxuLmJ0bi1wcmltYXJ5OmZvY3VzLFxcbi5idG4tcHJpbWFyeS5mb2N1cyxcXG4uYnRuLXByaW1hcnk6YWN0aXZlLFxcbi5idG4tcHJpbWFyeS5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1wcmltYXJ5IHtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjA5MDtcXG4gIGJvcmRlci1jb2xvcjogIzIwNGQ3NDtcXG59XFxuLmJ0bi1wcmltYXJ5OmFjdGl2ZSxcXG4uYnRuLXByaW1hcnkuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tcHJpbWFyeSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbn1cXG4uYnRuLXByaW1hcnkuZGlzYWJsZWQsXFxuLmJ0bi1wcmltYXJ5W2Rpc2FibGVkXSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1wcmltYXJ5LFxcbi5idG4tcHJpbWFyeS5kaXNhYmxlZDpob3ZlcixcXG4uYnRuLXByaW1hcnlbZGlzYWJsZWRdOmhvdmVyLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXByaW1hcnk6aG92ZXIsXFxuLmJ0bi1wcmltYXJ5LmRpc2FibGVkOmZvY3VzLFxcbi5idG4tcHJpbWFyeVtkaXNhYmxlZF06Zm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tcHJpbWFyeTpmb2N1cyxcXG4uYnRuLXByaW1hcnkuZGlzYWJsZWQuZm9jdXMsXFxuLmJ0bi1wcmltYXJ5W2Rpc2FibGVkXS5mb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1wcmltYXJ5LmZvY3VzLFxcbi5idG4tcHJpbWFyeS5kaXNhYmxlZDphY3RpdmUsXFxuLmJ0bi1wcmltYXJ5W2Rpc2FibGVkXTphY3RpdmUsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tcHJpbWFyeTphY3RpdmUsXFxuLmJ0bi1wcmltYXJ5LmRpc2FibGVkLmFjdGl2ZSxcXG4uYnRuLXByaW1hcnlbZGlzYWJsZWRdLmFjdGl2ZSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1wcmltYXJ5LmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcbiAgYm9yZGVyLWNvbG9yOiAjMmU2ZGE0O1xcbn1cXG4uYnRuLXByaW1hcnkgLmJhZGdlIHtcXG4gIGNvbG9yOiAjMzM3YWI3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuLmJ0bi1zdWNjZXNzIHtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVjYjg1YztcXG4gIGJvcmRlci1jb2xvcjogIzRjYWU0YztcXG59XFxuLmJ0bi1zdWNjZXNzOmhvdmVyLFxcbi5idG4tc3VjY2Vzczpmb2N1cyxcXG4uYnRuLXN1Y2Nlc3MuZm9jdXMsXFxuLmJ0bi1zdWNjZXNzOmFjdGl2ZSxcXG4uYnRuLXN1Y2Nlc3MuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tc3VjY2VzcyB7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NDlkNDQ7XFxuICBib3JkZXItY29sb3I6ICMzOTg0Mzk7XFxufVxcbi5idG4tc3VjY2VzczphY3RpdmUsXFxuLmJ0bi1zdWNjZXNzLmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG59XFxuLmJ0bi1zdWNjZXNzLmRpc2FibGVkLFxcbi5idG4tc3VjY2Vzc1tkaXNhYmxlZF0sXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tc3VjY2VzcyxcXG4uYnRuLXN1Y2Nlc3MuZGlzYWJsZWQ6aG92ZXIsXFxuLmJ0bi1zdWNjZXNzW2Rpc2FibGVkXTpob3ZlcixcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1zdWNjZXNzOmhvdmVyLFxcbi5idG4tc3VjY2Vzcy5kaXNhYmxlZDpmb2N1cyxcXG4uYnRuLXN1Y2Nlc3NbZGlzYWJsZWRdOmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXN1Y2Nlc3M6Zm9jdXMsXFxuLmJ0bi1zdWNjZXNzLmRpc2FibGVkLmZvY3VzLFxcbi5idG4tc3VjY2Vzc1tkaXNhYmxlZF0uZm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tc3VjY2Vzcy5mb2N1cyxcXG4uYnRuLXN1Y2Nlc3MuZGlzYWJsZWQ6YWN0aXZlLFxcbi5idG4tc3VjY2Vzc1tkaXNhYmxlZF06YWN0aXZlLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXN1Y2Nlc3M6YWN0aXZlLFxcbi5idG4tc3VjY2Vzcy5kaXNhYmxlZC5hY3RpdmUsXFxuLmJ0bi1zdWNjZXNzW2Rpc2FibGVkXS5hY3RpdmUsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tc3VjY2Vzcy5hY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVjYjg1YztcXG4gIGJvcmRlci1jb2xvcjogIzRjYWU0YztcXG59XFxuLmJ0bi1zdWNjZXNzIC5iYWRnZSB7XFxuICBjb2xvcjogIzVjYjg1YztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxufVxcbi5idG4taW5mbyB7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YmMwZGU7XFxuICBib3JkZXItY29sb3I6ICM0NmI4ZGE7XFxufVxcbi5idG4taW5mbzpob3ZlcixcXG4uYnRuLWluZm86Zm9jdXMsXFxuLmJ0bi1pbmZvLmZvY3VzLFxcbi5idG4taW5mbzphY3RpdmUsXFxuLmJ0bi1pbmZvLmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWluZm8ge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzFiMGQ1O1xcbiAgYm9yZGVyLWNvbG9yOiAjMjY5YWJjO1xcbn1cXG4uYnRuLWluZm86YWN0aXZlLFxcbi5idG4taW5mby5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1pbmZvIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxufVxcbi5idG4taW5mby5kaXNhYmxlZCxcXG4uYnRuLWluZm9bZGlzYWJsZWRdLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWluZm8sXFxuLmJ0bi1pbmZvLmRpc2FibGVkOmhvdmVyLFxcbi5idG4taW5mb1tkaXNhYmxlZF06aG92ZXIsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4taW5mbzpob3ZlcixcXG4uYnRuLWluZm8uZGlzYWJsZWQ6Zm9jdXMsXFxuLmJ0bi1pbmZvW2Rpc2FibGVkXTpmb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1pbmZvOmZvY3VzLFxcbi5idG4taW5mby5kaXNhYmxlZC5mb2N1cyxcXG4uYnRuLWluZm9bZGlzYWJsZWRdLmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWluZm8uZm9jdXMsXFxuLmJ0bi1pbmZvLmRpc2FibGVkOmFjdGl2ZSxcXG4uYnRuLWluZm9bZGlzYWJsZWRdOmFjdGl2ZSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1pbmZvOmFjdGl2ZSxcXG4uYnRuLWluZm8uZGlzYWJsZWQuYWN0aXZlLFxcbi5idG4taW5mb1tkaXNhYmxlZF0uYWN0aXZlLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWluZm8uYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YmMwZGU7XFxuICBib3JkZXItY29sb3I6ICM0NmI4ZGE7XFxufVxcbi5idG4taW5mbyAuYmFkZ2Uge1xcbiAgY29sb3I6ICM1YmMwZGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG4uYnRuLXdhcm5pbmcge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBhZDRlO1xcbiAgYm9yZGVyLWNvbG9yOiAjZWVhMjM2O1xcbn1cXG4uYnRuLXdhcm5pbmc6aG92ZXIsXFxuLmJ0bi13YXJuaW5nOmZvY3VzLFxcbi5idG4td2FybmluZy5mb2N1cyxcXG4uYnRuLXdhcm5pbmc6YWN0aXZlLFxcbi5idG4td2FybmluZy5hY3RpdmUsXFxuLm9wZW4gPiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi13YXJuaW5nIHtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjOTcxZjtcXG4gIGJvcmRlci1jb2xvcjogI2Q1ODUxMjtcXG59XFxuLmJ0bi13YXJuaW5nOmFjdGl2ZSxcXG4uYnRuLXdhcm5pbmcuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4td2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbn1cXG4uYnRuLXdhcm5pbmcuZGlzYWJsZWQsXFxuLmJ0bi13YXJuaW5nW2Rpc2FibGVkXSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi13YXJuaW5nLFxcbi5idG4td2FybmluZy5kaXNhYmxlZDpob3ZlcixcXG4uYnRuLXdhcm5pbmdbZGlzYWJsZWRdOmhvdmVyLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXdhcm5pbmc6aG92ZXIsXFxuLmJ0bi13YXJuaW5nLmRpc2FibGVkOmZvY3VzLFxcbi5idG4td2FybmluZ1tkaXNhYmxlZF06Zm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4td2FybmluZzpmb2N1cyxcXG4uYnRuLXdhcm5pbmcuZGlzYWJsZWQuZm9jdXMsXFxuLmJ0bi13YXJuaW5nW2Rpc2FibGVkXS5mb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi13YXJuaW5nLmZvY3VzLFxcbi5idG4td2FybmluZy5kaXNhYmxlZDphY3RpdmUsXFxuLmJ0bi13YXJuaW5nW2Rpc2FibGVkXTphY3RpdmUsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4td2FybmluZzphY3RpdmUsXFxuLmJ0bi13YXJuaW5nLmRpc2FibGVkLmFjdGl2ZSxcXG4uYnRuLXdhcm5pbmdbZGlzYWJsZWRdLmFjdGl2ZSxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi13YXJuaW5nLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBhZDRlO1xcbiAgYm9yZGVyLWNvbG9yOiAjZWVhMjM2O1xcbn1cXG4uYnRuLXdhcm5pbmcgLmJhZGdlIHtcXG4gIGNvbG9yOiAjZjBhZDRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuLmJ0bi1kYW5nZXIge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDk1MzRmO1xcbiAgYm9yZGVyLWNvbG9yOiAjZDQzZjNhO1xcbn1cXG4uYnRuLWRhbmdlcjpob3ZlcixcXG4uYnRuLWRhbmdlcjpmb2N1cyxcXG4uYnRuLWRhbmdlci5mb2N1cyxcXG4uYnRuLWRhbmdlcjphY3RpdmUsXFxuLmJ0bi1kYW5nZXIuYWN0aXZlLFxcbi5vcGVuID4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tZGFuZ2VyIHtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M5MzAyYztcXG4gIGJvcmRlci1jb2xvcjogI2FjMjkyNTtcXG59XFxuLmJ0bi1kYW5nZXI6YWN0aXZlLFxcbi5idG4tZGFuZ2VyLmFjdGl2ZSxcXG4ub3BlbiA+IC5kcm9wZG93bi10b2dnbGUuYnRuLWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbn1cXG4uYnRuLWRhbmdlci5kaXNhYmxlZCxcXG4uYnRuLWRhbmdlcltkaXNhYmxlZF0sXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGFuZ2VyLFxcbi5idG4tZGFuZ2VyLmRpc2FibGVkOmhvdmVyLFxcbi5idG4tZGFuZ2VyW2Rpc2FibGVkXTpob3ZlcixcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kYW5nZXI6aG92ZXIsXFxuLmJ0bi1kYW5nZXIuZGlzYWJsZWQ6Zm9jdXMsXFxuLmJ0bi1kYW5nZXJbZGlzYWJsZWRdOmZvY3VzLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRhbmdlcjpmb2N1cyxcXG4uYnRuLWRhbmdlci5kaXNhYmxlZC5mb2N1cyxcXG4uYnRuLWRhbmdlcltkaXNhYmxlZF0uZm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGFuZ2VyLmZvY3VzLFxcbi5idG4tZGFuZ2VyLmRpc2FibGVkOmFjdGl2ZSxcXG4uYnRuLWRhbmdlcltkaXNhYmxlZF06YWN0aXZlLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRhbmdlcjphY3RpdmUsXFxuLmJ0bi1kYW5nZXIuZGlzYWJsZWQuYWN0aXZlLFxcbi5idG4tZGFuZ2VyW2Rpc2FibGVkXS5hY3RpdmUsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGFuZ2VyLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDk1MzRmO1xcbiAgYm9yZGVyLWNvbG9yOiAjZDQzZjNhO1xcbn1cXG4uYnRuLWRhbmdlciAuYmFkZ2Uge1xcbiAgY29sb3I6ICNkOTUzNGY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG4uYnRuLWxpbmsge1xcbiAgY29sb3I6ICMzMzdhYjc7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLmJ0bi1saW5rLFxcbi5idG4tbGluazphY3RpdmUsXFxuLmJ0bi1saW5rLmFjdGl2ZSxcXG4uYnRuLWxpbmtbZGlzYWJsZWRdLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWxpbmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICBib3gtc2hhZG93OiBub25lO1xcbn1cXG4uYnRuLWxpbmssXFxuLmJ0bi1saW5rOmhvdmVyLFxcbi5idG4tbGluazpmb2N1cyxcXG4uYnRuLWxpbms6YWN0aXZlIHtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5idG4tbGluazpob3ZlcixcXG4uYnRuLWxpbms6Zm9jdXMge1xcbiAgY29sb3I6ICMyMzUyN2M7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uYnRuLWxpbmtbZGlzYWJsZWRdOmhvdmVyLFxcbmZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWxpbms6aG92ZXIsXFxuLmJ0bi1saW5rW2Rpc2FibGVkXTpmb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1saW5rOmZvY3VzIHtcXG4gIGNvbG9yOiAjNzc3Nzc3O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG4uYnRuLWxnLFxcbi5idG4tZ3JvdXAtbGcgPiAuYnRuIHtcXG4gIHBhZGRpbmc6IDEwcHggMTZweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjMzMzMzMzM7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbi5idG4tc20sXFxuLmJ0bi1ncm91cC1zbSA+IC5idG4ge1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG4uYnRuLXhzLFxcbi5idG4tZ3JvdXAteHMgPiAuYnRuIHtcXG4gIHBhZGRpbmc6IDFweCA1cHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG4uYnRuLWJsb2NrIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5idG4tYmxvY2sgKyAuYnRuLWJsb2NrIHtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0uYnRuLWJsb2NrLFxcbmlucHV0W3R5cGU9XFxcInJlc2V0XFxcIl0uYnRuLWJsb2NrLFxcbmlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLmJ0bi1ibG9jayB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmZhZGUge1xcbiAgb3BhY2l0eTogMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBsaW5lYXI7XFxuICAtby10cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgbGluZWFyO1xcbn1cXG4uZmFkZS5pbiB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG4uY29sbGFwc2Uge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmNvbGxhcHNlLmluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG50ci5jb2xsYXBzZS5pbiB7XFxuICBkaXNwbGF5OiB0YWJsZS1yb3c7XFxufVxcbnRib2R5LmNvbGxhcHNlLmluIHtcXG4gIGRpc3BsYXk6IHRhYmxlLXJvdy1ncm91cDtcXG59XFxuLmNvbGxhcHNpbmcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogaGVpZ2h0LCB2aXNpYmlsaXR5O1xcbiAgLW8tdHJhbnNpdGlvbi1wcm9wZXJ0eTogaGVpZ2h0LCB2aXNpYmlsaXR5O1xcbiAgICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogaGVpZ2h0LCB2aXNpYmlsaXR5O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjM1cztcXG4gIC1vLXRyYW5zaXRpb24tZHVyYXRpb246IDAuMzVzO1xcbiAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4zNXM7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xcbiAgLW8tdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XFxuICAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcXG59XFxuLmNhcmV0IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgbWFyZ2luLWxlZnQ6IDJweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBib3JkZXItdG9wOiA0cHggZGFzaGVkO1xcbiAgYm9yZGVyLXJpZ2h0OiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG4uZHJvcHVwLFxcbi5kcm9wZG93biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5kcm9wZG93bi10b2dnbGU6Zm9jdXMge1xcbiAgb3V0bGluZTogMDtcXG59XFxuLmRyb3Bkb3duLW1lbnUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMDAlO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtaW4td2lkdGg6IDE2MHB4O1xcbiAgcGFkZGluZzogNXB4IDA7XFxuICBtYXJnaW46IDJweCAwIDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjE1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCA2cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTc1KTtcXG4gIGJveC1zaGFkb3c6IDAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE3NSk7XFxuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICAgICAgICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxufVxcbi5kcm9wZG93bi1tZW51LnB1bGwtcmlnaHQge1xcbiAgcmlnaHQ6IDA7XFxuICBsZWZ0OiBhdXRvO1xcbn1cXG4uZHJvcGRvd24tbWVudSAuZGl2aWRlciB7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogOXB4IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcXG59XFxuLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGEge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAzcHggMjBweDtcXG4gIGNsZWFyOiBib3RoO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbiAgY29sb3I6ICMzMzMzMzM7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG4uZHJvcGRvd24tbWVudSA+IGxpID4gYTpob3ZlcixcXG4uZHJvcGRvd24tbWVudSA+IGxpID4gYTpmb2N1cyB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogIzI2MjYyNjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxufVxcbi5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZSA+IGEsXFxuLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlID4gYTpob3ZlcixcXG4uZHJvcGRvd24tbWVudSA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgb3V0bGluZTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzdhYjc7XFxufVxcbi5kcm9wZG93bi1tZW51ID4gLmRpc2FibGVkID4gYSxcXG4uZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjNzc3Nzc3O1xcbn1cXG4uZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhOmZvY3VzIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KGVuYWJsZWQgPSBmYWxzZSk7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG4ub3BlbiA+IC5kcm9wZG93bi1tZW51IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4ub3BlbiA+IGEge1xcbiAgb3V0bGluZTogMDtcXG59XFxuLmRyb3Bkb3duLW1lbnUtcmlnaHQge1xcbiAgbGVmdDogYXV0bztcXG4gIHJpZ2h0OiAwO1xcbn1cXG4uZHJvcGRvd24tbWVudS1sZWZ0IHtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogYXV0bztcXG59XFxuLmRyb3Bkb3duLWhlYWRlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDNweCAyMHB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICBjb2xvcjogIzc3Nzc3NztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcbi5kcm9wZG93bi1iYWNrZHJvcCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiA5OTA7XFxufVxcbi5wdWxsLXJpZ2h0ID4gLmRyb3Bkb3duLW1lbnUge1xcbiAgcmlnaHQ6IDA7XFxuICBsZWZ0OiBhdXRvO1xcbn1cXG4uZHJvcHVwIC5jYXJldCxcXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSAuZHJvcGRvd24gLmNhcmV0IHtcXG4gIGJvcmRlci10b3A6IDA7XFxuICBib3JkZXItYm90dG9tOiA0cHggc29saWQ7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG59XFxuLmRyb3B1cCAuZHJvcGRvd24tbWVudSxcXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSAuZHJvcGRvd24gLmRyb3Bkb3duLW1lbnUge1xcbiAgdG9wOiBhdXRvO1xcbiAgYm90dG9tOiAxMDAlO1xcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5uYXZiYXItcmlnaHQgLmRyb3Bkb3duLW1lbnUge1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogMDtcXG4gIH1cXG4gIC5uYXZiYXItcmlnaHQgLmRyb3Bkb3duLW1lbnUtbGVmdCB7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbn1cXG4uYnRuLWdyb3VwLFxcbi5idG4tZ3JvdXAtdmVydGljYWwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG4sXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxvYXQ6IGxlZnQ7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuOmhvdmVyLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuOmhvdmVyLFxcbi5idG4tZ3JvdXAgPiAuYnRuOmZvY3VzLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuOmZvY3VzLFxcbi5idG4tZ3JvdXAgPiAuYnRuOmFjdGl2ZSxcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bjphY3RpdmUsXFxuLmJ0bi1ncm91cCA+IC5idG4uYWN0aXZlLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLmFjdGl2ZSB7XFxuICB6LWluZGV4OiAyO1xcbn1cXG4uYnRuLWdyb3VwIC5idG4gKyAuYnRuLFxcbi5idG4tZ3JvdXAgLmJ0biArIC5idG4tZ3JvdXAsXFxuLmJ0bi1ncm91cCAuYnRuLWdyb3VwICsgLmJ0bixcXG4uYnRuLWdyb3VwIC5idG4tZ3JvdXAgKyAuYnRuLWdyb3VwIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMXB4O1xcbn1cXG4uYnRuLXRvb2xiYXIge1xcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XFxufVxcbi5idG4tdG9vbGJhciAuYnRuLWdyb3VwLFxcbi5idG4tdG9vbGJhciAuaW5wdXQtZ3JvdXAge1xcbiAgZmxvYXQ6IGxlZnQ7XFxufVxcbi5idG4tdG9vbGJhciA+IC5idG4sXFxuLmJ0bi10b29sYmFyID4gLmJ0bi1ncm91cCxcXG4uYnRuLXRvb2xiYXIgPiAuaW5wdXQtZ3JvdXAge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG46bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKTpub3QoLmRyb3Bkb3duLXRvZ2dsZSkge1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG46Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCk6bm90KC5kcm9wZG93bi10b2dnbGUpIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuOmxhc3QtY2hpbGQ6bm90KDpmaXJzdC1jaGlsZCksXFxuLmJ0bi1ncm91cCA+IC5kcm9wZG93bi10b2dnbGU6bm90KDpmaXJzdC1jaGlsZCkge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuLWdyb3VwIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbn1cXG4uYnRuLWdyb3VwID4gLmJ0bi1ncm91cDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpID4gLmJ0biB7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uYnRuLWdyb3VwID4gLmJ0bi1ncm91cDpmaXJzdC1jaGlsZDpub3QoOmxhc3QtY2hpbGQpID4gLmJ0bjpsYXN0LWNoaWxkLFxcbi5idG4tZ3JvdXAgPiAuYnRuLWdyb3VwOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCkgPiAuZHJvcGRvd24tdG9nZ2xlIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuLWdyb3VwOmxhc3QtY2hpbGQ6bm90KDpmaXJzdC1jaGlsZCkgPiAuYnRuOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbn1cXG4uYnRuLWdyb3VwIC5kcm9wZG93bi10b2dnbGU6YWN0aXZlLFxcbi5idG4tZ3JvdXAub3BlbiAuZHJvcGRvd24tdG9nZ2xlIHtcXG4gIG91dGxpbmU6IDA7XFxufVxcbi5idG4tZ3JvdXAgPiAuYnRuICsgLmRyb3Bkb3duLXRvZ2dsZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDhweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcXG59XFxuLmJ0bi1ncm91cCA+IC5idG4tbGcgKyAuZHJvcGRvd24tdG9nZ2xlIHtcXG4gIHBhZGRpbmctbGVmdDogMTJweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDEycHg7XFxufVxcbi5idG4tZ3JvdXAub3BlbiAuZHJvcGRvd24tdG9nZ2xlIHtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAzcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xMjUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAzcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xMjUpO1xcbn1cXG4uYnRuLWdyb3VwLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tbGluayB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICBib3gtc2hhZG93OiBub25lO1xcbn1cXG4uYnRuIC5jYXJldCB7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuLmJ0bi1sZyAuY2FyZXQge1xcbiAgYm9yZGVyLXdpZHRoOiA1cHggNXB4IDA7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAwO1xcbn1cXG4uZHJvcHVwIC5idG4tbGcgLmNhcmV0IHtcXG4gIGJvcmRlci13aWR0aDogMCA1cHggNXB4O1xcbn1cXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cCxcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cCA+IC5idG4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmbG9hdDogbm9uZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cCA+IC5idG4ge1xcbiAgZmxvYXQ6IG5vbmU7XFxufVxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuICsgLmJ0bixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0biArIC5idG4tZ3JvdXAsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXAgKyAuYnRuLFxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLWdyb3VwICsgLmJ0bi1ncm91cCB7XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG46Zmlyc3QtY2hpbGQ6bm90KDpsYXN0LWNoaWxkKSB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbn1cXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bjpsYXN0LWNoaWxkOm5vdCg6Zmlyc3QtY2hpbGQpIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKSA+IC5idG4ge1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6Zmlyc3QtY2hpbGQ6bm90KDpsYXN0LWNoaWxkKSA+IC5idG46bGFzdC1jaGlsZCxcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDpmaXJzdC1jaGlsZDpub3QoOmxhc3QtY2hpbGQpID4gLmRyb3Bkb3duLXRvZ2dsZSB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XFxufVxcbi5idG4tZ3JvdXAtdmVydGljYWwgPiAuYnRuLWdyb3VwOmxhc3QtY2hpbGQ6bm90KDpmaXJzdC1jaGlsZCkgPiAuYnRuOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcXG59XFxuLmJ0bi1ncm91cC1qdXN0aWZpZWQge1xcbiAgZGlzcGxheTogdGFibGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xcbn1cXG4uYnRuLWdyb3VwLWp1c3RpZmllZCA+IC5idG4sXFxuLmJ0bi1ncm91cC1qdXN0aWZpZWQgPiAuYnRuLWdyb3VwIHtcXG4gIGZsb2F0OiBub25lO1xcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gIHdpZHRoOiAxJTtcXG59XFxuLmJ0bi1ncm91cC1qdXN0aWZpZWQgPiAuYnRuLWdyb3VwIC5idG4ge1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5idG4tZ3JvdXAtanVzdGlmaWVkID4gLmJ0bi1ncm91cCAuZHJvcGRvd24tbWVudSB7XFxuICBsZWZ0OiBhdXRvO1xcbn1cXG5bZGF0YS10b2dnbGU9XFxcImJ1dHRvbnNcXFwiXSA+IC5idG4gaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSxcXG5bZGF0YS10b2dnbGU9XFxcImJ1dHRvbnNcXFwiXSA+IC5idG4tZ3JvdXAgPiAuYnRuIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuW2RhdGEtdG9nZ2xlPVxcXCJidXR0b25zXFxcIl0gPiAuYnRuIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW2RhdGEtdG9nZ2xlPVxcXCJidXR0b25zXFxcIl0gPiAuYnRuLWdyb3VwID4gLmJ0biBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNsaXA6IHJlY3QoMCwgMCwgMCwgMCk7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLmlucHV0LWdyb3VwIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcXG59XFxuLmlucHV0LWdyb3VwW2NsYXNzKj1cXFwiY29sLVxcXCJdIHtcXG4gIGZsb2F0OiBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgcGFkZGluZy1yaWdodDogMDtcXG59XFxuLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2wge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogMjtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG4uaW5wdXQtZ3JvdXAtbGcgPiAuZm9ybS1jb250cm9sLFxcbi5pbnB1dC1ncm91cC1sZyA+IC5pbnB1dC1ncm91cC1hZGRvbixcXG4uaW5wdXQtZ3JvdXAtbGcgPiAuaW5wdXQtZ3JvdXAtYnRuID4gLmJ0biB7XFxuICBoZWlnaHQ6IDQ2cHg7XFxuICBwYWRkaW5nOiAxMHB4IDE2cHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBsaW5lLWhlaWdodDogMS4zMzMzMzMzO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG5zZWxlY3QuaW5wdXQtZ3JvdXAtbGcgPiAuZm9ybS1jb250cm9sLFxcbnNlbGVjdC5pbnB1dC1ncm91cC1sZyA+IC5pbnB1dC1ncm91cC1hZGRvbixcXG5zZWxlY3QuaW5wdXQtZ3JvdXAtbGcgPiAuaW5wdXQtZ3JvdXAtYnRuID4gLmJ0biB7XFxuICBoZWlnaHQ6IDQ2cHg7XFxuICBsaW5lLWhlaWdodDogNDZweDtcXG59XFxudGV4dGFyZWEuaW5wdXQtZ3JvdXAtbGcgPiAuZm9ybS1jb250cm9sLFxcbnRleHRhcmVhLmlucHV0LWdyb3VwLWxnID4gLmlucHV0LWdyb3VwLWFkZG9uLFxcbnRleHRhcmVhLmlucHV0LWdyb3VwLWxnID4gLmlucHV0LWdyb3VwLWJ0biA+IC5idG4sXFxuc2VsZWN0W211bHRpcGxlXS5pbnB1dC1ncm91cC1sZyA+IC5mb3JtLWNvbnRyb2wsXFxuc2VsZWN0W211bHRpcGxlXS5pbnB1dC1ncm91cC1sZyA+IC5pbnB1dC1ncm91cC1hZGRvbixcXG5zZWxlY3RbbXVsdGlwbGVdLmlucHV0LWdyb3VwLWxnID4gLmlucHV0LWdyb3VwLWJ0biA+IC5idG4ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG4uaW5wdXQtZ3JvdXAtc20gPiAuZm9ybS1jb250cm9sLFxcbi5pbnB1dC1ncm91cC1zbSA+IC5pbnB1dC1ncm91cC1hZGRvbixcXG4uaW5wdXQtZ3JvdXAtc20gPiAuaW5wdXQtZ3JvdXAtYnRuID4gLmJ0biB7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcbnNlbGVjdC5pbnB1dC1ncm91cC1zbSA+IC5mb3JtLWNvbnRyb2wsXFxuc2VsZWN0LmlucHV0LWdyb3VwLXNtID4gLmlucHV0LWdyb3VwLWFkZG9uLFxcbnNlbGVjdC5pbnB1dC1ncm91cC1zbSA+IC5pbnB1dC1ncm91cC1idG4gPiAuYnRuIHtcXG4gIGhlaWdodDogMzBweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbn1cXG50ZXh0YXJlYS5pbnB1dC1ncm91cC1zbSA+IC5mb3JtLWNvbnRyb2wsXFxudGV4dGFyZWEuaW5wdXQtZ3JvdXAtc20gPiAuaW5wdXQtZ3JvdXAtYWRkb24sXFxudGV4dGFyZWEuaW5wdXQtZ3JvdXAtc20gPiAuaW5wdXQtZ3JvdXAtYnRuID4gLmJ0bixcXG5zZWxlY3RbbXVsdGlwbGVdLmlucHV0LWdyb3VwLXNtID4gLmZvcm0tY29udHJvbCxcXG5zZWxlY3RbbXVsdGlwbGVdLmlucHV0LWdyb3VwLXNtID4gLmlucHV0LWdyb3VwLWFkZG9uLFxcbnNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtc20gPiAuaW5wdXQtZ3JvdXAtYnRuID4gLmJ0biB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbixcXG4uaW5wdXQtZ3JvdXAtYnRuLFxcbi5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sIHtcXG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbjpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpLFxcbi5pbnB1dC1ncm91cC1idG46bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKSxcXG4uaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpIHtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbixcXG4uaW5wdXQtZ3JvdXAtYnRuIHtcXG4gIHdpZHRoOiAxJTtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4uaW5wdXQtZ3JvdXAtYWRkb24ge1xcbiAgcGFkZGluZzogNnB4IDEycHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBjb2xvcjogIzU1NTU1NTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWVlZWU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG4uaW5wdXQtZ3JvdXAtYWRkb24uaW5wdXQtc20ge1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1sZyB7XFxuICBwYWRkaW5nOiAxMHB4IDE2cHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbiBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdLFxcbi5pbnB1dC1ncm91cC1hZGRvbiBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxufVxcbi5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sOmZpcnN0LWNoaWxkLFxcbi5pbnB1dC1ncm91cC1hZGRvbjpmaXJzdC1jaGlsZCxcXG4uaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkID4gLmJ0bixcXG4uaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkID4gLmJ0bi1ncm91cCA+IC5idG4sXFxuLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZCA+IC5kcm9wZG93bi10b2dnbGUsXFxuLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkID4gLmJ0bjpub3QoOmxhc3QtY2hpbGQpOm5vdCguZHJvcGRvd24tdG9nZ2xlKSxcXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuYnRuLWdyb3VwOm5vdCg6bGFzdC1jaGlsZCkgPiAuYnRuIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxufVxcbi5pbnB1dC1ncm91cC1hZGRvbjpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXItcmlnaHQ6IDA7XFxufVxcbi5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sOmxhc3QtY2hpbGQsXFxuLmlucHV0LWdyb3VwLWFkZG9uOmxhc3QtY2hpbGQsXFxuLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkID4gLmJ0bixcXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuYnRuLWdyb3VwID4gLmJ0bixcXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuZHJvcGRvd24tdG9nZ2xlLFxcbi5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQgPiAuYnRuOm5vdCg6Zmlyc3QtY2hpbGQpLFxcbi5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQgPiAuYnRuLWdyb3VwOm5vdCg6Zmlyc3QtY2hpbGQpID4gLmJ0biB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcXG59XFxuLmlucHV0LWdyb3VwLWFkZG9uOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLWxlZnQ6IDA7XFxufVxcbi5pbnB1dC1ncm91cC1idG4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZm9udC1zaXplOiAwO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuLmlucHV0LWdyb3VwLWJ0biA+IC5idG4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uaW5wdXQtZ3JvdXAtYnRuID4gLmJ0biArIC5idG4ge1xcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XFxufVxcbi5pbnB1dC1ncm91cC1idG4gPiAuYnRuOmhvdmVyLFxcbi5pbnB1dC1ncm91cC1idG4gPiAuYnRuOmZvY3VzLFxcbi5pbnB1dC1ncm91cC1idG4gPiAuYnRuOmFjdGl2ZSB7XFxuICB6LWluZGV4OiAyO1xcbn1cXG4uaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkID4gLmJ0bixcXG4uaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkID4gLmJ0bi1ncm91cCB7XFxuICBtYXJnaW4tcmlnaHQ6IC0xcHg7XFxufVxcbi5pbnB1dC1ncm91cC1idG46bGFzdC1jaGlsZCA+IC5idG4sXFxuLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkID4gLmJ0bi1ncm91cCB7XFxuICBtYXJnaW4tbGVmdDogLTFweDtcXG59XFxuLm5hdiB7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuLm5hdiA+IGxpIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4ubmF2ID4gbGkgPiBhIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbn1cXG4ubmF2ID4gbGkgPiBhOmhvdmVyLFxcbi5uYXYgPiBsaSA+IGE6Zm9jdXMge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcXG59XFxuLm5hdiA+IGxpLmRpc2FibGVkID4gYSB7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuLm5hdiA+IGxpLmRpc2FibGVkID4gYTpob3ZlcixcXG4ubmF2ID4gbGkuZGlzYWJsZWQgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjNzc3Nzc3O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG4ubmF2IC5vcGVuID4gYSxcXG4ubmF2IC5vcGVuID4gYTpob3ZlcixcXG4ubmF2IC5vcGVuID4gYTpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xcbiAgYm9yZGVyLWNvbG9yOiAjMzM3YWI3O1xcbn1cXG4ubmF2IC5uYXYtZGl2aWRlciB7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogOXB4IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcXG59XFxuLm5hdiA+IGxpID4gYSA+IGltZyB7XFxuICBtYXgtd2lkdGg6IG5vbmU7XFxufVxcbi5uYXYtdGFicyB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZGRkZDtcXG59XFxuLm5hdi10YWJzID4gbGkge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tYm90dG9tOiAtMXB4O1xcbn1cXG4ubmF2LXRhYnMgPiBsaSA+IGEge1xcbiAgbWFyZ2luLXJpZ2h0OiAycHg7XFxuICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7XFxufVxcbi5uYXYtdGFicyA+IGxpID4gYTpob3ZlciB7XFxuICBib3JkZXItY29sb3I6ICNlZWVlZWUgI2VlZWVlZSAjZGRkZGRkO1xcbn1cXG4ubmF2LXRhYnMgPiBsaS5hY3RpdmUgPiBhLFxcbi5uYXYtdGFicyA+IGxpLmFjdGl2ZSA+IGE6aG92ZXIsXFxuLm5hdi10YWJzID4gbGkuYWN0aXZlID4gYTpmb2N1cyB7XFxuICBjb2xvcjogIzU1NTU1NTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbi5uYXYtdGFicy5uYXYtanVzdGlmaWVkIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWJvdHRvbTogMDtcXG59XFxuLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiBsaSB7XFxuICBmbG9hdDogbm9uZTtcXG59XFxuLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiBsaSA+IGEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4ubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IC5kcm9wZG93biAuZHJvcGRvd24tbWVudSB7XFxuICB0b3A6IGF1dG87XFxuICBsZWZ0OiBhdXRvO1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gbGkge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICB3aWR0aDogMSU7XFxuICB9XFxuICAubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IGxpID4gYSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICB9XFxufVxcbi5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiAuYWN0aXZlID4gYSxcXG4ubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbi5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IGxpID4gYSB7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkZGRkO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcXG4gIH1cXG4gIC5uYXYtdGFicy5uYXYtanVzdGlmaWVkID4gLmFjdGl2ZSA+IGEsXFxuICAubmF2LXRhYnMubmF2LWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbiAgLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQgPiAuYWN0aXZlID4gYTpmb2N1cyB7XFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmZmZmZmY7XFxuICB9XFxufVxcbi5uYXYtcGlsbHMgPiBsaSB7XFxuICBmbG9hdDogbGVmdDtcXG59XFxuLm5hdi1waWxscyA+IGxpID4gYSB7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5uYXYtcGlsbHMgPiBsaSArIGxpIHtcXG4gIG1hcmdpbi1sZWZ0OiAycHg7XFxufVxcbi5uYXYtcGlsbHMgPiBsaS5hY3RpdmUgPiBhLFxcbi5uYXYtcGlsbHMgPiBsaS5hY3RpdmUgPiBhOmhvdmVyLFxcbi5uYXYtcGlsbHMgPiBsaS5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcXG59XFxuLm5hdi1zdGFja2VkID4gbGkge1xcbiAgZmxvYXQ6IG5vbmU7XFxufVxcbi5uYXYtc3RhY2tlZCA+IGxpICsgbGkge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5uYXYtanVzdGlmaWVkIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ubmF2LWp1c3RpZmllZCA+IGxpIHtcXG4gIGZsb2F0OiBub25lO1xcbn1cXG4ubmF2LWp1c3RpZmllZCA+IGxpID4gYSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcbi5uYXYtanVzdGlmaWVkID4gLmRyb3Bkb3duIC5kcm9wZG93bi1tZW51IHtcXG4gIHRvcDogYXV0bztcXG4gIGxlZnQ6IGF1dG87XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdi1qdXN0aWZpZWQgPiBsaSB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgIHdpZHRoOiAxJTtcXG4gIH1cXG4gIC5uYXYtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIH1cXG59XFxuLm5hdi10YWJzLWp1c3RpZmllZCB7XFxuICBib3JkZXItYm90dG9tOiAwO1xcbn1cXG4ubmF2LXRhYnMtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gIG1hcmdpbi1yaWdodDogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhLFxcbi5uYXYtdGFicy1qdXN0aWZpZWQgPiAuYWN0aXZlID4gYTpob3ZlcixcXG4ubmF2LXRhYnMtanVzdGlmaWVkID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2LXRhYnMtanVzdGlmaWVkID4gbGkgPiBhIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGRkZGQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xcbiAgfVxcbiAgLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhLFxcbiAgLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbiAgLm5hdi10YWJzLWp1c3RpZmllZCA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2ZmZmZmZjtcXG4gIH1cXG59XFxuLnRhYi1jb250ZW50ID4gLnRhYi1wYW5lIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi50YWItY29udGVudCA+IC5hY3RpdmUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5uYXYtdGFicyAuZHJvcGRvd24tbWVudSB7XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbn1cXG4ubmF2YmFyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDUwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhciB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLWhlYWRlciB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgfVxcbn1cXG4ubmF2YmFyLWNvbGxhcHNlIHtcXG4gIG92ZXJmbG93LXg6IHZpc2libGU7XFxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XFxuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XFxufVxcbi5uYXZiYXItY29sbGFwc2UuaW4ge1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLWNvbGxhcHNlIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGJvcmRlci10b3A6IDA7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xcbiAgfVxcbiAgLm5hdmJhci1jb2xsYXBzZS5jb2xsYXBzZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDtcXG4gIH1cXG4gIC5uYXZiYXItY29sbGFwc2UuaW4ge1xcbiAgICBvdmVyZmxvdy15OiB2aXNpYmxlO1xcbiAgfVxcbiAgLm5hdmJhci1maXhlZC10b3AgLm5hdmJhci1jb2xsYXBzZSxcXG4gIC5uYXZiYXItc3RhdGljLXRvcCAubmF2YmFyLWNvbGxhcHNlLFxcbiAgLm5hdmJhci1maXhlZC1ib3R0b20gLm5hdmJhci1jb2xsYXBzZSB7XFxuICAgIHBhZGRpbmctbGVmdDogMDtcXG4gICAgcGFkZGluZy1yaWdodDogMDtcXG4gIH1cXG59XFxuLm5hdmJhci1maXhlZC10b3AgLm5hdmJhci1jb2xsYXBzZSxcXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSAubmF2YmFyLWNvbGxhcHNlIHtcXG4gIG1heC1oZWlnaHQ6IDM0MHB4O1xcbn1cXG5AbWVkaWEgKG1heC1kZXZpY2Utd2lkdGg6IDQ4MHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcXG4gIC5uYXZiYXItZml4ZWQtdG9wIC5uYXZiYXItY29sbGFwc2UsXFxuICAubmF2YmFyLWZpeGVkLWJvdHRvbSAubmF2YmFyLWNvbGxhcHNlIHtcXG4gICAgbWF4LWhlaWdodDogMjAwcHg7XFxuICB9XFxufVxcbi5jb250YWluZXIgPiAubmF2YmFyLWhlYWRlcixcXG4uY29udGFpbmVyLWZsdWlkID4gLm5hdmJhci1oZWFkZXIsXFxuLmNvbnRhaW5lciA+IC5uYXZiYXItY29sbGFwc2UsXFxuLmNvbnRhaW5lci1mbHVpZCA+IC5uYXZiYXItY29sbGFwc2Uge1xcbiAgbWFyZ2luLXJpZ2h0OiAtMTVweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMTVweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuY29udGFpbmVyID4gLm5hdmJhci1oZWFkZXIsXFxuICAuY29udGFpbmVyLWZsdWlkID4gLm5hdmJhci1oZWFkZXIsXFxuICAuY29udGFpbmVyID4gLm5hdmJhci1jb2xsYXBzZSxcXG4gIC5jb250YWluZXItZmx1aWQgPiAubmF2YmFyLWNvbGxhcHNlIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gIH1cXG59XFxuLm5hdmJhci1zdGF0aWMtdG9wIHtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICBib3JkZXItd2lkdGg6IDAgMCAxcHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1zdGF0aWMtdG9wIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG4gIH1cXG59XFxuLm5hdmJhci1maXhlZC10b3AsXFxuLm5hdmJhci1maXhlZC1ib3R0b20ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgcmlnaHQ6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTAzMDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLWZpeGVkLXRvcCxcXG4gIC5uYXZiYXItZml4ZWQtYm90dG9tIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG4gIH1cXG59XFxuLm5hdmJhci1maXhlZC10b3Age1xcbiAgdG9wOiAwO1xcbiAgYm9yZGVyLXdpZHRoOiAwIDAgMXB4O1xcbn1cXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSB7XFxuICBib3R0b206IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgYm9yZGVyLXdpZHRoOiAxcHggMCAwO1xcbn1cXG4ubmF2YmFyLWJyYW5kIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgcGFkZGluZzogMTVweCAxNXB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxufVxcbi5uYXZiYXItYnJhbmQ6aG92ZXIsXFxuLm5hdmJhci1icmFuZDpmb2N1cyB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcbi5uYXZiYXItYnJhbmQgPiBpbWcge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhciA+IC5jb250YWluZXIgLm5hdmJhci1icmFuZCxcXG4gIC5uYXZiYXIgPiAuY29udGFpbmVyLWZsdWlkIC5uYXZiYXItYnJhbmQge1xcbiAgICBtYXJnaW4tbGVmdDogLTE1cHg7XFxuICB9XFxufVxcbi5uYXZiYXItdG9nZ2xlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogMTVweDtcXG4gIHBhZGRpbmc6IDlweCAxMHB4O1xcbiAgbWFyZ2luLXRvcDogOHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5uYXZiYXItdG9nZ2xlOmZvY3VzIHtcXG4gIG91dGxpbmU6IDA7XFxufVxcbi5uYXZiYXItdG9nZ2xlIC5pY29uLWJhciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAyMnB4O1xcbiAgaGVpZ2h0OiAycHg7XFxuICBib3JkZXItcmFkaXVzOiAxcHg7XFxufVxcbi5uYXZiYXItdG9nZ2xlIC5pY29uLWJhciArIC5pY29uLWJhciB7XFxuICBtYXJnaW4tdG9wOiA0cHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci10b2dnbGUge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG4ubmF2YmFyLW5hdiB7XFxuICBtYXJnaW46IDcuNXB4IC0xNXB4O1xcbn1cXG4ubmF2YmFyLW5hdiA+IGxpID4gYSB7XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUge1xcbiAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICBmbG9hdDogbm9uZTtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xcbiAgfVxcbiAgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGEsXFxuICAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taGVhZGVyIHtcXG4gICAgcGFkZGluZzogNXB4IDE1cHggNXB4IDI1cHg7XFxuICB9XFxuICAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IGxpID4gYSB7XFxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgfVxcbiAgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6aG92ZXIsXFxuICAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IGxpID4gYTpmb2N1cyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1uYXYge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgfVxcbiAgLm5hdmJhci1uYXYgPiBsaSB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgfVxcbiAgLm5hdmJhci1uYXYgPiBsaSA+IGEge1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gICAgcGFkZGluZy1ib3R0b206IDE1cHg7XFxuICB9XFxufVxcbi5uYXZiYXItZm9ybSB7XFxuICBtYXJnaW4tbGVmdDogLTE1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSwgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSwgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XFxuICBtYXJnaW4tdG9wOiA4cHg7XFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1mb3JtIC5mb3JtLWdyb3VwIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5mb3JtLWNvbnRyb2wge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5mb3JtLWNvbnRyb2wtc3RhdGljIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5pbnB1dC1ncm91cCB7XFxuICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIH1cXG4gIC5uYXZiYXItZm9ybSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLWFkZG9uLFxcbiAgLm5hdmJhci1mb3JtIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtYnRuLFxcbiAgLm5hdmJhci1mb3JtIC5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICB9XFxuICAubmF2YmFyLWZvcm0gLmlucHV0LWdyb3VwID4gLmZvcm0tY29udHJvbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5jb250cm9sLWxhYmVsIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIH1cXG4gIC5uYXZiYXItZm9ybSAucmFkaW8sXFxuICAubmF2YmFyLWZvcm0gLmNoZWNrYm94IHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5yYWRpbyBsYWJlbCxcXG4gIC5uYXZiYXItZm9ybSAuY2hlY2tib3ggbGFiZWwge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxuICB9XFxuICAubmF2YmFyLWZvcm0gLnJhZGlvIGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0sXFxuICAubmF2YmFyLWZvcm0gLmNoZWNrYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcbiAgLm5hdmJhci1mb3JtIC5oYXMtZmVlZGJhY2sgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XFxuICAgIHRvcDogMDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAubmF2YmFyLWZvcm0gLmZvcm0tZ3JvdXAge1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxuICAubmF2YmFyLWZvcm0gLmZvcm0tZ3JvdXA6bGFzdC1jaGlsZCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm5hdmJhci1mb3JtIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGJvcmRlcjogMDtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICAgIG1hcmdpbi1yaWdodDogMDtcXG4gICAgcGFkZGluZy10b3A6IDA7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICB9XFxufVxcbi5uYXZiYXItbmF2ID4gbGkgPiAuZHJvcGRvd24tbWVudSB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbn1cXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSAubmF2YmFyLW5hdiA+IGxpID4gLmRyb3Bkb3duLW1lbnUge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XFxufVxcbi5uYXZiYXItYnRuIHtcXG4gIG1hcmdpbi10b3A6IDhweDtcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXG59XFxuLm5hdmJhci1idG4uYnRuLXNtIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG4ubmF2YmFyLWJ0bi5idG4teHMge1xcbiAgbWFyZ2luLXRvcDogMTRweDtcXG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XFxufVxcbi5uYXZiYXItdGV4dCB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLXRleHQge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAubmF2YmFyLWxlZnQge1xcbiAgICBmbG9hdDogbGVmdCAhaW1wb3J0YW50O1xcbiAgfVxcbiAgLm5hdmJhci1yaWdodCB7XFxuICAgIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xcbiAgICBtYXJnaW4tcmlnaHQ6IC0xNXB4O1xcbiAgfVxcbiAgLm5hdmJhci1yaWdodCB+IC5uYXZiYXItcmlnaHQge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XFxuICB9XFxufVxcbi5uYXZiYXItZGVmYXVsdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xcbiAgYm9yZGVyLWNvbG9yOiAjZTdlN2U3O1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1icmFuZCB7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItYnJhbmQ6aG92ZXIsXFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItYnJhbmQ6Zm9jdXMge1xcbiAgY29sb3I6ICM1ZTVlNWU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItdGV4dCB7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2ID4gbGkgPiBhIHtcXG4gIGNvbG9yOiAjNzc3Nzc3O1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiBsaSA+IGE6aG92ZXIsXFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2ID4gbGkgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IC5hY3RpdmUgPiBhLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gIGNvbG9yOiAjNTU1NTU1O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U3ZTdlNztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2ID4gLmRpc2FibGVkID4gYSxcXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiAuZGlzYWJsZWQgPiBhOmhvdmVyLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IC5kaXNhYmxlZCA+IGE6Zm9jdXMge1xcbiAgY29sb3I6ICNjY2NjY2M7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItdG9nZ2xlIHtcXG4gIGJvcmRlci1jb2xvcjogI2RkZGRkZDtcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItdG9nZ2xlOmhvdmVyLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLXRvZ2dsZTpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkZGRkO1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci10b2dnbGUgLmljb24tYmFyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ODg4ODg7XFxufVxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWNvbGxhcHNlLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWZvcm0ge1xcbiAgYm9yZGVyLWNvbG9yOiAjZTdlN2U3O1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgPiAub3BlbiA+IGEsXFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2ID4gLm9wZW4gPiBhOmhvdmVyLFxcbi5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiA+IC5vcGVuID4gYTpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTdlN2U3O1xcbiAgY29sb3I6ICM1NTU1NTU7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhIHtcXG4gICAgY29sb3I6ICM3Nzc3Nzc7XFxuICB9XFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6aG92ZXIsXFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiBsaSA+IGE6Zm9jdXMge1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB9XFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlID4gYSxcXG4gIC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUgPiBhOmhvdmVyLFxcbiAgLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xcbiAgICBjb2xvcjogIzU1NTU1NTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U3ZTdlNztcXG4gIH1cXG4gIC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGEsXFxuICAubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhOmhvdmVyLFxcbiAgLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmRpc2FibGVkID4gYTpmb2N1cyB7XFxuICAgIGNvbG9yOiAjY2NjY2NjO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIH1cXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbGluayB7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbGluazpob3ZlciB7XFxuICBjb2xvcjogIzMzMzMzMztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5idG4tbGluayB7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuLm5hdmJhci1kZWZhdWx0IC5idG4tbGluazpob3ZlcixcXG4ubmF2YmFyLWRlZmF1bHQgLmJ0bi1saW5rOmZvY3VzIHtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbn1cXG4ubmF2YmFyLWRlZmF1bHQgLmJ0bi1saW5rW2Rpc2FibGVkXTpob3ZlcixcXG5maWVsZHNldFtkaXNhYmxlZF0gLm5hdmJhci1kZWZhdWx0IC5idG4tbGluazpob3ZlcixcXG4ubmF2YmFyLWRlZmF1bHQgLmJ0bi1saW5rW2Rpc2FibGVkXTpmb2N1cyxcXG5maWVsZHNldFtkaXNhYmxlZF0gLm5hdmJhci1kZWZhdWx0IC5idG4tbGluazpmb2N1cyB7XFxuICBjb2xvcjogI2NjY2NjYztcXG59XFxuLm5hdmJhci1pbnZlcnNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjIyMjI7XFxuICBib3JkZXItY29sb3I6ICMwODA4MDg7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLWJyYW5kIHtcXG4gIGNvbG9yOiAjOWQ5ZDlkO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1icmFuZDpob3ZlcixcXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1icmFuZDpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci10ZXh0IHtcXG4gIGNvbG9yOiAjOWQ5ZDlkO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgPiBsaSA+IGEge1xcbiAgY29sb3I6ICM5ZDlkOWQ7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IGxpID4gYTpob3ZlcixcXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgPiBsaSA+IGE6Zm9jdXMge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gLmFjdGl2ZSA+IGEsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gLmFjdGl2ZSA+IGE6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDgwODA4O1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgPiAuZGlzYWJsZWQgPiBhLFxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gLmRpc2FibGVkID4gYTpmb2N1cyB7XFxuICBjb2xvcjogIzQ0NDQ0NDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci10b2dnbGUge1xcbiAgYm9yZGVyLWNvbG9yOiAjMzMzMzMzO1xcbn1cXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci10b2dnbGU6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItdG9nZ2xlOmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLXRvZ2dsZSAuaWNvbi1iYXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItY29sbGFwc2UsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItZm9ybSB7XFxuICBib3JkZXItY29sb3I6ICMxMDEwMTA7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiA+IC5vcGVuID4gYSxcXG4ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgPiAub3BlbiA+IGE6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2ID4gLm9wZW4gPiBhOmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwODA4MDg7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuZHJvcGRvd24taGVhZGVyIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDgwODA4O1xcbiAgfVxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51IC5kaXZpZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA4MDgwODtcXG4gIH1cXG4gIC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IGxpID4gYSB7XFxuICAgIGNvbG9yOiAjOWQ5ZDlkO1xcbiAgfVxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhOmhvdmVyLFxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gbGkgPiBhOmZvY3VzIHtcXG4gICAgY29sb3I6ICNmZmZmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZSA+IGEsXFxuICAubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlID4gYTpob3ZlcixcXG4gIC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcXG4gICAgY29sb3I6ICNmZmZmZmY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwODA4MDg7XFxuICB9XFxuICAubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgPiAuZGlzYWJsZWQgPiBhLFxcbiAgLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51ID4gLmRpc2FibGVkID4gYTpob3ZlcixcXG4gIC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGE6Zm9jdXMge1xcbiAgICBjb2xvcjogIzQ0NDQ0NDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB9XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLWxpbmsge1xcbiAgY29sb3I6ICM5ZDlkOWQ7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAubmF2YmFyLWxpbms6aG92ZXIge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAuYnRuLWxpbmsge1xcbiAgY29sb3I6ICM5ZDlkOWQ7XFxufVxcbi5uYXZiYXItaW52ZXJzZSAuYnRuLWxpbms6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5idG4tbGluazpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG59XFxuLm5hdmJhci1pbnZlcnNlIC5idG4tbGlua1tkaXNhYmxlZF06aG92ZXIsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5uYXZiYXItaW52ZXJzZSAuYnRuLWxpbms6aG92ZXIsXFxuLm5hdmJhci1pbnZlcnNlIC5idG4tbGlua1tkaXNhYmxlZF06Zm9jdXMsXFxuZmllbGRzZXRbZGlzYWJsZWRdIC5uYXZiYXItaW52ZXJzZSAuYnRuLWxpbms6Zm9jdXMge1xcbiAgY29sb3I6ICM0NDQ0NDQ7XFxufVxcbi5icmVhZGNydW1iIHtcXG4gIHBhZGRpbmc6IDhweCAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG4uYnJlYWRjcnVtYiA+IGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmJyZWFkY3J1bWIgPiBsaSArIGxpOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiL1xcXFwwMGEwXFxcIjtcXG4gIHBhZGRpbmc6IDAgNXB4O1xcbiAgY29sb3I6ICNjY2NjY2M7XFxufVxcbi5icmVhZGNydW1iID4gLmFjdGl2ZSB7XFxuICBjb2xvcjogIzc3Nzc3NztcXG59XFxuLnBhZ2luYXRpb24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbWFyZ2luOiAyMHB4IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5wYWdpbmF0aW9uID4gbGkge1xcbiAgZGlzcGxheTogaW5saW5lO1xcbn1cXG4ucGFnaW5hdGlvbiA+IGxpID4gYSxcXG4ucGFnaW5hdGlvbiA+IGxpID4gc3BhbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIHBhZGRpbmc6IDZweCAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogIzMzN2FiNztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XFxufVxcbi5wYWdpbmF0aW9uID4gbGk6Zmlyc3QtY2hpbGQgPiBhLFxcbi5wYWdpbmF0aW9uID4gbGk6Zmlyc3QtY2hpbGQgPiBzcGFuIHtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4O1xcbn1cXG4ucGFnaW5hdGlvbiA+IGxpOmxhc3QtY2hpbGQgPiBhLFxcbi5wYWdpbmF0aW9uID4gbGk6bGFzdC1jaGlsZCA+IHNwYW4ge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XFxufVxcbi5wYWdpbmF0aW9uID4gbGkgPiBhOmhvdmVyLFxcbi5wYWdpbmF0aW9uID4gbGkgPiBzcGFuOmhvdmVyLFxcbi5wYWdpbmF0aW9uID4gbGkgPiBhOmZvY3VzLFxcbi5wYWdpbmF0aW9uID4gbGkgPiBzcGFuOmZvY3VzIHtcXG4gIGNvbG9yOiAjMjM1MjdjO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcXG4gIGJvcmRlci1jb2xvcjogI2RkZGRkZDtcXG59XFxuLnBhZ2luYXRpb24gPiAuYWN0aXZlID4gYSxcXG4ucGFnaW5hdGlvbiA+IC5hY3RpdmUgPiBzcGFuLFxcbi5wYWdpbmF0aW9uID4gLmFjdGl2ZSA+IGE6aG92ZXIsXFxuLnBhZ2luYXRpb24gPiAuYWN0aXZlID4gc3Bhbjpob3ZlcixcXG4ucGFnaW5hdGlvbiA+IC5hY3RpdmUgPiBhOmZvY3VzLFxcbi5wYWdpbmF0aW9uID4gLmFjdGl2ZSA+IHNwYW46Zm9jdXMge1xcbiAgei1pbmRleDogMjtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcXG4gIGJvcmRlci1jb2xvcjogIzMzN2FiNztcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuLnBhZ2luYXRpb24gPiAuZGlzYWJsZWQgPiBzcGFuLFxcbi5wYWdpbmF0aW9uID4gLmRpc2FibGVkID4gc3Bhbjpob3ZlcixcXG4ucGFnaW5hdGlvbiA+IC5kaXNhYmxlZCA+IHNwYW46Zm9jdXMsXFxuLnBhZ2luYXRpb24gPiAuZGlzYWJsZWQgPiBhLFxcbi5wYWdpbmF0aW9uID4gLmRpc2FibGVkID4gYTpob3ZlcixcXG4ucGFnaW5hdGlvbiA+IC5kaXNhYmxlZCA+IGE6Zm9jdXMge1xcbiAgY29sb3I6ICM3Nzc3Nzc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkZGRkO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuLnBhZ2luYXRpb24tbGcgPiBsaSA+IGEsXFxuLnBhZ2luYXRpb24tbGcgPiBsaSA+IHNwYW4ge1xcbiAgcGFkZGluZzogMTBweCAxNnB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbn1cXG4ucGFnaW5hdGlvbi1sZyA+IGxpOmZpcnN0LWNoaWxkID4gYSxcXG4ucGFnaW5hdGlvbi1sZyA+IGxpOmZpcnN0LWNoaWxkID4gc3BhbiB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA2cHg7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxufVxcbi5wYWdpbmF0aW9uLWxnID4gbGk6bGFzdC1jaGlsZCA+IGEsXFxuLnBhZ2luYXRpb24tbGcgPiBsaTpsYXN0LWNoaWxkID4gc3BhbiB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNnB4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXG59XFxuLnBhZ2luYXRpb24tc20gPiBsaSA+IGEsXFxuLnBhZ2luYXRpb24tc20gPiBsaSA+IHNwYW4ge1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxufVxcbi5wYWdpbmF0aW9uLXNtID4gbGk6Zmlyc3QtY2hpbGQgPiBhLFxcbi5wYWdpbmF0aW9uLXNtID4gbGk6Zmlyc3QtY2hpbGQgPiBzcGFuIHtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhZ2luYXRpb24tc20gPiBsaTpsYXN0LWNoaWxkID4gYSxcXG4ucGFnaW5hdGlvbi1zbSA+IGxpOmxhc3QtY2hpbGQgPiBzcGFuIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbn1cXG4ucGFnZXIge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbWFyZ2luOiAyMHB4IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4ucGFnZXIgbGkge1xcbiAgZGlzcGxheTogaW5saW5lO1xcbn1cXG4ucGFnZXIgbGkgPiBhLFxcbi5wYWdlciBsaSA+IHNwYW4ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogNXB4IDE0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxufVxcbi5wYWdlciBsaSA+IGE6aG92ZXIsXFxuLnBhZ2VyIGxpID4gYTpmb2N1cyB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xcbn1cXG4ucGFnZXIgLm5leHQgPiBhLFxcbi5wYWdlciAubmV4dCA+IHNwYW4ge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG4ucGFnZXIgLnByZXZpb3VzID4gYSxcXG4ucGFnZXIgLnByZXZpb3VzID4gc3BhbiB7XFxuICBmbG9hdDogbGVmdDtcXG59XFxuLnBhZ2VyIC5kaXNhYmxlZCA+IGEsXFxuLnBhZ2VyIC5kaXNhYmxlZCA+IGE6aG92ZXIsXFxuLnBhZ2VyIC5kaXNhYmxlZCA+IGE6Zm9jdXMsXFxuLnBhZ2VyIC5kaXNhYmxlZCA+IHNwYW4ge1xcbiAgY29sb3I6ICM3Nzc3Nzc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuLmxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZTtcXG4gIHBhZGRpbmc6IC4yZW0gLjZlbSAuM2VtO1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgYm9yZGVyLXJhZGl1czogLjI1ZW07XFxufVxcbmEubGFiZWw6aG92ZXIsXFxuYS5sYWJlbDpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmxhYmVsOmVtcHR5IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5idG4gLmxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogLTFweDtcXG59XFxuLmxhYmVsLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc3Nzc3NztcXG59XFxuLmxhYmVsLWRlZmF1bHRbaHJlZl06aG92ZXIsXFxuLmxhYmVsLWRlZmF1bHRbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlNWU1ZTtcXG59XFxuLmxhYmVsLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzN2FiNztcXG59XFxuLmxhYmVsLXByaW1hcnlbaHJlZl06aG92ZXIsXFxuLmxhYmVsLXByaW1hcnlbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjA5MDtcXG59XFxuLmxhYmVsLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVjYjg1YztcXG59XFxuLmxhYmVsLXN1Y2Nlc3NbaHJlZl06aG92ZXIsXFxuLmxhYmVsLXN1Y2Nlc3NbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ0OWQ0NDtcXG59XFxuLmxhYmVsLWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzViYzBkZTtcXG59XFxuLmxhYmVsLWluZm9baHJlZl06aG92ZXIsXFxuLmxhYmVsLWluZm9baHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMxYjBkNTtcXG59XFxuLmxhYmVsLXdhcm5pbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwYWQ0ZTtcXG59XFxuLmxhYmVsLXdhcm5pbmdbaHJlZl06aG92ZXIsXFxuLmxhYmVsLXdhcm5pbmdbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjOTcxZjtcXG59XFxuLmxhYmVsLWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDk1MzRmO1xcbn1cXG4ubGFiZWwtZGFuZ2VyW2hyZWZdOmhvdmVyLFxcbi5sYWJlbC1kYW5nZXJbaHJlZl06Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M5MzAyYztcXG59XFxuLmJhZGdlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1pbi13aWR0aDogMTBweDtcXG4gIHBhZGRpbmc6IDNweCA3cHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc3Nzc3NztcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcbi5iYWRnZTplbXB0eSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uYnRuIC5iYWRnZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IC0xcHg7XFxufVxcbi5idG4teHMgLmJhZGdlLFxcbi5idG4tZ3JvdXAteHMgPiAuYnRuIC5iYWRnZSB7XFxuICB0b3A6IDA7XFxuICBwYWRkaW5nOiAxcHggNXB4O1xcbn1cXG5hLmJhZGdlOmhvdmVyLFxcbmEuYmFkZ2U6Zm9jdXMge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlID4gLmJhZGdlLFxcbi5uYXYtcGlsbHMgPiAuYWN0aXZlID4gYSA+IC5iYWRnZSB7XFxuICBjb2xvcjogIzMzN2FiNztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0gPiAuYmFkZ2Uge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtID4gLmJhZGdlICsgLmJhZGdlIHtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbn1cXG4ubmF2LXBpbGxzID4gbGkgPiBhID4gLmJhZGdlIHtcXG4gIG1hcmdpbi1sZWZ0OiAzcHg7XFxufVxcbi5qdW1ib3Ryb24ge1xcbiAgcGFkZGluZzogMzBweCAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcXG59XFxuLmp1bWJvdHJvbiBoMSxcXG4uanVtYm90cm9uIC5oMSB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLmp1bWJvdHJvbiBwIHtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBmb250LXNpemU6IDIxcHg7XFxuICBmb250LXdlaWdodDogMjAwO1xcbn1cXG4uanVtYm90cm9uID4gaHIge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2Q1ZDVkNTtcXG59XFxuLmNvbnRhaW5lciAuanVtYm90cm9uLFxcbi5jb250YWluZXItZmx1aWQgLmp1bWJvdHJvbiB7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbi5qdW1ib3Ryb24gLmNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuanVtYm90cm9uIHtcXG4gICAgcGFkZGluZzogNDhweCAwO1xcbiAgfVxcbiAgLmNvbnRhaW5lciAuanVtYm90cm9uLFxcbiAgLmNvbnRhaW5lci1mbHVpZCAuanVtYm90cm9uIHtcXG4gICAgcGFkZGluZy1sZWZ0OiA2MHB4O1xcbiAgICBwYWRkaW5nLXJpZ2h0OiA2MHB4O1xcbiAgfVxcbiAgLmp1bWJvdHJvbiBoMSxcXG4gIC5qdW1ib3Ryb24gLmgxIHtcXG4gICAgZm9udC1zaXplOiA2M3B4O1xcbiAgfVxcbn1cXG4udGh1bWJuYWlsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGJvcmRlciAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgLW8tdHJhbnNpdGlvbjogYm9yZGVyIDAuMnMgZWFzZS1pbi1vdXQ7XFxuICB0cmFuc2l0aW9uOiBib3JkZXIgMC4ycyBlYXNlLWluLW91dDtcXG59XFxuLnRodW1ibmFpbCA+IGltZyxcXG4udGh1bWJuYWlsIGEgPiBpbWcge1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbmEudGh1bWJuYWlsOmhvdmVyLFxcbmEudGh1bWJuYWlsOmZvY3VzLFxcbmEudGh1bWJuYWlsLmFjdGl2ZSB7XFxuICBib3JkZXItY29sb3I6ICMzMzdhYjc7XFxufVxcbi50aHVtYm5haWwgLmNhcHRpb24ge1xcbiAgcGFkZGluZzogOXB4O1xcbiAgY29sb3I6ICMzMzMzMzM7XFxufVxcbi5hbGVydCB7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG4uYWxlcnQgaDQge1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4uYWxlcnQgLmFsZXJ0LWxpbmsge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5hbGVydCA+IHAsXFxuLmFsZXJ0ID4gdWwge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG59XFxuLmFsZXJ0ID4gcCArIHAge1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4uYWxlcnQtZGlzbWlzc2FibGUsXFxuLmFsZXJ0LWRpc21pc3NpYmxlIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDM1cHg7XFxufVxcbi5hbGVydC1kaXNtaXNzYWJsZSAuY2xvc2UsXFxuLmFsZXJ0LWRpc21pc3NpYmxlIC5jbG9zZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IC0ycHg7XFxuICByaWdodDogLTIxcHg7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLmFsZXJ0LXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RmZjBkODtcXG4gIGJvcmRlci1jb2xvcjogI2Q2ZTljNjtcXG4gIGNvbG9yOiAjM2M3NjNkO1xcbn1cXG4uYWxlcnQtc3VjY2VzcyBociB7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjYzllMmIzO1xcbn1cXG4uYWxlcnQtc3VjY2VzcyAuYWxlcnQtbGluayB7XFxuICBjb2xvcjogIzJiNTQyYztcXG59XFxuLmFsZXJ0LWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZWRmNztcXG4gIGJvcmRlci1jb2xvcjogI2JjZThmMTtcXG4gIGNvbG9yOiAjMzE3MDhmO1xcbn1cXG4uYWxlcnQtaW5mbyBociB7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjYTZlMWVjO1xcbn1cXG4uYWxlcnQtaW5mbyAuYWxlcnQtbGluayB7XFxuICBjb2xvcjogIzI0NTI2OTtcXG59XFxuLmFsZXJ0LXdhcm5pbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZjhlMztcXG4gIGJvcmRlci1jb2xvcjogI2ZhZWJjYztcXG4gIGNvbG9yOiAjOGE2ZDNiO1xcbn1cXG4uYWxlcnQtd2FybmluZyBociB7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjZjdlMWI1O1xcbn1cXG4uYWxlcnQtd2FybmluZyAuYWxlcnQtbGluayB7XFxuICBjb2xvcjogIzY2NTEyYztcXG59XFxuLmFsZXJ0LWRhbmdlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkZWRlO1xcbiAgYm9yZGVyLWNvbG9yOiAjZWJjY2QxO1xcbiAgY29sb3I6ICNhOTQ0NDI7XFxufVxcbi5hbGVydC1kYW5nZXIgaHIge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2U0YjljMDtcXG59XFxuLmFsZXJ0LWRhbmdlciAuYWxlcnQtbGluayB7XFxuICBjb2xvcjogIzg0MzUzNDtcXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIHByb2dyZXNzLWJhci1zdHJpcGVzIHtcXG4gIGZyb20ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0MHB4IDA7XFxuICB9XFxuICB0byB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gIH1cXG59XFxuQC1vLWtleWZyYW1lcyBwcm9ncmVzcy1iYXItc3RyaXBlcyB7XFxuICBmcm9tIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNDBweCAwO1xcbiAgfVxcbiAgdG8ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgcHJvZ3Jlc3MtYmFyLXN0cmlwZXMge1xcbiAgZnJvbSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDQwcHggMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgfVxcbn1cXG4ucHJvZ3Jlc3Mge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGhlaWdodDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuLnByb2dyZXNzLWJhciB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIC0xcHggMCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjE1KTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbiAgLW8tdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbiAgdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLFxcbi5wcm9ncmVzcy1iYXItc3RyaXBlZCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiA0MHB4IDQwcHg7XFxuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogNDBweCA0MHB4O1xcbn1cXG4ucHJvZ3Jlc3MuYWN0aXZlIC5wcm9ncmVzcy1iYXIsXFxuLnByb2dyZXNzLWJhci5hY3RpdmUge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHByb2dyZXNzLWJhci1zdHJpcGVzIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gIC1vLWFuaW1hdGlvbjogcHJvZ3Jlc3MtYmFyLXN0cmlwZXMgMnMgbGluZWFyIGluZmluaXRlO1xcbiAgYW5pbWF0aW9uOiBwcm9ncmVzcy1iYXItc3RyaXBlcyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5wcm9ncmVzcy1iYXItc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWNiODVjO1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxufVxcbi5wcm9ncmVzcy1iYXItaW5mbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWJjMGRlO1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLWluZm8ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxufVxcbi5wcm9ncmVzcy1iYXItd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBhZDRlO1xcbn1cXG4ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLXdhcm5pbmcge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxufVxcbi5wcm9ncmVzcy1iYXItZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOTUzNGY7XFxufVxcbi5wcm9ncmVzcy1zdHJpcGVkIC5wcm9ncmVzcy1iYXItZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbn1cXG4ubWVkaWEge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG59XFxuLm1lZGlhOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxufVxcbi5tZWRpYSxcXG4ubWVkaWEtYm9keSB7XFxuICB6b29tOiAxO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLm1lZGlhLWJvZHkge1xcbiAgd2lkdGg6IDEwMDAwcHg7XFxufVxcbi5tZWRpYS1vYmplY3Qge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5tZWRpYS1yaWdodCxcXG4ubWVkaWEgPiAucHVsbC1yaWdodCB7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxufVxcbi5tZWRpYS1sZWZ0LFxcbi5tZWRpYSA+IC5wdWxsLWxlZnQge1xcbiAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuLm1lZGlhLWxlZnQsXFxuLm1lZGlhLXJpZ2h0LFxcbi5tZWRpYS1ib2R5IHtcXG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbn1cXG4ubWVkaWEtbWlkZGxlIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5tZWRpYS1ib3R0b20ge1xcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXG59XFxuLm1lZGlhLWhlYWRpbmcge1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLm1lZGlhLWxpc3Qge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuLmxpc3QtZ3JvdXAge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbTpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4O1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA0cHg7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtIHtcXG4gIGNvbG9yOiAjNTU1NTU1O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbSAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcge1xcbiAgY29sb3I6ICMzMzMzMzM7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtOmhvdmVyLFxcbmEubGlzdC1ncm91cC1pdGVtOmZvY3VzIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjNTU1NTU1O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbS5kaXNhYmxlZCxcXG4ubGlzdC1ncm91cC1pdGVtLmRpc2FibGVkOmhvdmVyLFxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQ6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcXG4gIGNvbG9yOiAjNzc3Nzc3O1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbS5kaXNhYmxlZCAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcsXFxuLmxpc3QtZ3JvdXAtaXRlbS5kaXNhYmxlZDpob3ZlciAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcsXFxuLmxpc3QtZ3JvdXAtaXRlbS5kaXNhYmxlZDpmb2N1cyAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0LFxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQ6aG92ZXIgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0LFxcbi5saXN0LWdyb3VwLWl0ZW0uZGlzYWJsZWQ6Zm9jdXMgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0IHtcXG4gIGNvbG9yOiAjNzc3Nzc3O1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpob3ZlcixcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpmb2N1cyB7XFxuICB6LWluZGV4OiAyO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcbiAgYm9yZGVyLWNvbG9yOiAjMzM3YWI3O1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6aG92ZXIgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nLFxcbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmZvY3VzIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcgPiBzbWFsbCxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpob3ZlciAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcgPiBzbWFsbCxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpmb2N1cyAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcgPiBzbWFsbCxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcgPiAuc21hbGwsXFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6aG92ZXIgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nID4gLnNtYWxsLFxcbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmZvY3VzIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyA+IC5zbWFsbCB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmUgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0LFxcbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmhvdmVyIC5saXN0LWdyb3VwLWl0ZW0tdGV4dCxcXG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpmb2N1cyAubGlzdC1ncm91cC1pdGVtLXRleHQge1xcbiAgY29sb3I6ICNjN2RkZWY7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0tc3VjY2VzcyB7XFxuICBjb2xvcjogIzNjNzYzZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZmYwZDg7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3Mge1xcbiAgY29sb3I6ICMzYzc2M2Q7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3MgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzOmhvdmVyLFxcbmEubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3M6Zm9jdXMge1xcbiAgY29sb3I6ICMzYzc2M2Q7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBlOWM2O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZSxcXG5hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZTpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZTpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzYzc2M2Q7XFxuICBib3JkZXItY29sb3I6ICMzYzc2M2Q7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0taW5mbyB7XFxuICBjb2xvcjogIzMxNzA4ZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLWluZm8ge1xcbiAgY29sb3I6ICMzMTcwOGY7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLWluZm8gLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvOmhvdmVyLFxcbmEubGlzdC1ncm91cC1pdGVtLWluZm86Zm9jdXMge1xcbiAgY29sb3I6ICMzMTcwOGY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzRlM2YzO1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvLmFjdGl2ZSxcXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvLmFjdGl2ZTpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbS1pbmZvLmFjdGl2ZTpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMTcwOGY7XFxuICBib3JkZXItY29sb3I6ICMzMTcwOGY7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0td2FybmluZyB7XFxuICBjb2xvcjogIzhhNmQzYjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmY2Y4ZTM7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmcge1xcbiAgY29sb3I6ICM4YTZkM2I7XFxufVxcbmEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmcgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nOmhvdmVyLFxcbmEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmc6Zm9jdXMge1xcbiAgY29sb3I6ICM4YTZkM2I7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmMmNjO1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nLmFjdGl2ZSxcXG5hLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nLmFjdGl2ZTpob3ZlcixcXG5hLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nLmFjdGl2ZTpmb2N1cyB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YTZkM2I7XFxuICBib3JkZXItY29sb3I6ICM4YTZkM2I7XFxufVxcbi5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyIHtcXG4gIGNvbG9yOiAjYTk0NDQyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZGVkZTtcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyIHtcXG4gIGNvbG9yOiAjYTk0NDQyO1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXIgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5hLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXI6aG92ZXIsXFxuYS5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyOmZvY3VzIHtcXG4gIGNvbG9yOiAjYTk0NDQyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ViY2NjYztcXG59XFxuYS5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyLmFjdGl2ZSxcXG5hLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXIuYWN0aXZlOmhvdmVyLFxcbmEubGlzdC1ncm91cC1pdGVtLWRhbmdlci5hY3RpdmU6Zm9jdXMge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTk0NDQyO1xcbiAgYm9yZGVyLWNvbG9yOiAjYTk0NDQyO1xcbn1cXG4ubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcge1xcbiAgbWFyZ2luLXRvcDogMDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLmxpc3QtZ3JvdXAtaXRlbS10ZXh0IHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxuICBsaW5lLWhlaWdodDogMS4zO1xcbn1cXG4ucGFuZWwge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XFxuICBib3gtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcXG59XFxuLnBhbmVsLWJvZHkge1xcbiAgcGFkZGluZzogMTVweDtcXG59XFxuLnBhbmVsLWhlYWRpbmcge1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsLWhlYWRpbmcgPiAuZHJvcGRvd24gLmRyb3Bkb3duLXRvZ2dsZSB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLnBhbmVsLXRpdGxlIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5wYW5lbC10aXRsZSA+IGEsXFxuLnBhbmVsLXRpdGxlID4gc21hbGwsXFxuLnBhbmVsLXRpdGxlID4gLnNtYWxsLFxcbi5wYW5lbC10aXRsZSA+IHNtYWxsID4gYSxcXG4ucGFuZWwtdGl0bGUgPiAuc21hbGwgPiBhIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4ucGFuZWwtZm9vdGVyIHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZGRkZDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC5saXN0LWdyb3VwLFxcbi5wYW5lbCA+IC5wYW5lbC1jb2xsYXBzZSA+IC5saXN0LWdyb3VwIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5wYW5lbCA+IC5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW0sXFxuLnBhbmVsID4gLnBhbmVsLWNvbGxhcHNlID4gLmxpc3QtZ3JvdXAgLmxpc3QtZ3JvdXAtaXRlbSB7XFxuICBib3JkZXItd2lkdGg6IDFweCAwO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLnBhbmVsID4gLmxpc3QtZ3JvdXA6Zmlyc3QtY2hpbGQgLmxpc3QtZ3JvdXAtaXRlbTpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAucGFuZWwtY29sbGFwc2UgPiAubGlzdC1ncm91cDpmaXJzdC1jaGlsZCAubGlzdC1ncm91cC1pdGVtOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3A6IDA7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xcbn1cXG4ucGFuZWwgPiAubGlzdC1ncm91cDpsYXN0LWNoaWxkIC5saXN0LWdyb3VwLWl0ZW06bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAucGFuZWwtY29sbGFwc2UgPiAubGlzdC1ncm91cDpsYXN0LWNoaWxkIC5saXN0LWdyb3VwLWl0ZW06bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tOiAwO1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsLWhlYWRpbmcgKyAubGlzdC1ncm91cCAubGlzdC1ncm91cC1pdGVtOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3Atd2lkdGg6IDA7XFxufVxcbi5saXN0LWdyb3VwICsgLnBhbmVsLWZvb3RlciB7XFxuICBib3JkZXItdG9wLXdpZHRoOiAwO1xcbn1cXG4ucGFuZWwgPiAudGFibGUsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUsXFxuLnBhbmVsID4gLnBhbmVsLWNvbGxhcHNlID4gLnRhYmxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZSBjYXB0aW9uLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlIGNhcHRpb24sXFxuLnBhbmVsID4gLnBhbmVsLWNvbGxhcHNlID4gLnRhYmxlIGNhcHRpb24ge1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG59XFxuLnBhbmVsID4gLnRhYmxlOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkID4gLnRhYmxlOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpmaXJzdC1jaGlsZCA+IC50YWJsZTpmaXJzdC1jaGlsZCA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQgPiAudGFibGU6Zmlyc3QtY2hpbGQgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGJvZHk6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkID4gLnRhYmxlOmZpcnN0LWNoaWxkID4gdGJvZHk6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0aDpsYXN0LWNoaWxkIHtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQgPiAudGFibGU6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogM3B4O1xcbn1cXG4ucGFuZWwgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRib2R5Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRib2R5Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6bGFzdC1jaGlsZCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDNweDtcXG59XFxuLnBhbmVsID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRmb290Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQgPiAudGFibGU6bGFzdC1jaGlsZCA+IHRmb290Omxhc3QtY2hpbGQgPiB0cjpsYXN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmU6bGFzdC1jaGlsZCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGJvZHk6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Ym9keTpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZTpsYXN0LWNoaWxkID4gdGZvb3Q6bGFzdC1jaGlsZCA+IHRyOmxhc3QtY2hpbGQgdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQgPiB0Zm9vdDpsYXN0LWNoaWxkID4gdHI6bGFzdC1jaGlsZCB0aDpsYXN0LWNoaWxkIHtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzcHg7XFxufVxcbi5wYW5lbCA+IC5wYW5lbC1ib2R5ICsgLnRhYmxlLFxcbi5wYW5lbCA+IC5wYW5lbC1ib2R5ICsgLnRhYmxlLXJlc3BvbnNpdmUsXFxuLnBhbmVsID4gLnRhYmxlICsgLnBhbmVsLWJvZHksXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgKyAucGFuZWwtYm9keSB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZGRkZDtcXG59XFxuLnBhbmVsID4gLnRhYmxlID4gdGJvZHk6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCB0aCxcXG4ucGFuZWwgPiAudGFibGUgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRkIHtcXG4gIGJvcmRlci10b3A6IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCB7XFxuICBib3JkZXI6IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGg6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRoOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRoOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZDpmaXJzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGQ6Zmlyc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRkOmZpcnN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRkOmZpcnN0LWNoaWxkIHtcXG4gIGJvcmRlci1sZWZ0OiAwO1xcbn1cXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0aDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRoOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGg6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGQ6bGFzdC1jaGlsZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0ZDpsYXN0LWNoaWxkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRkOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRkOmxhc3QtY2hpbGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGQ6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItcmlnaHQ6IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmZpcnN0LWNoaWxkID4gdGQsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmZpcnN0LWNoaWxkID4gdGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCB7XFxuICBib3JkZXItYm90dG9tOiAwO1xcbn1cXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmxhc3QtY2hpbGQgPiB0ZCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHI6bGFzdC1jaGlsZCA+IHRkLFxcbi5wYW5lbCA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHI6bGFzdC1jaGlsZCA+IHRkLFxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlID4gLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0cjpsYXN0LWNoaWxkID4gdGQsXFxuLnBhbmVsID4gLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0cjpsYXN0LWNoaWxkID4gdGgsXFxuLnBhbmVsID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyOmxhc3QtY2hpbGQgPiB0aCxcXG4ucGFuZWwgPiAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyOmxhc3QtY2hpbGQgPiB0aCxcXG4ucGFuZWwgPiAudGFibGUtcmVzcG9uc2l2ZSA+IC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHI6bGFzdC1jaGlsZCA+IHRoIHtcXG4gIGJvcmRlci1ib3R0b206IDA7XFxufVxcbi5wYW5lbCA+IC50YWJsZS1yZXNwb25zaXZlIHtcXG4gIGJvcmRlcjogMDtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcbi5wYW5lbC1ncm91cCB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG4ucGFuZWwtZ3JvdXAgLnBhbmVsIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcbi5wYW5lbC1ncm91cCAucGFuZWwgKyAucGFuZWwge1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4ucGFuZWwtZ3JvdXAgLnBhbmVsLWhlYWRpbmcge1xcbiAgYm9yZGVyLWJvdHRvbTogMDtcXG59XFxuLnBhbmVsLWdyb3VwIC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHksXFxuLnBhbmVsLWdyb3VwIC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLmxpc3QtZ3JvdXAge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGRkZGQ7XFxufVxcbi5wYW5lbC1ncm91cCAucGFuZWwtZm9vdGVyIHtcXG4gIGJvcmRlci10b3A6IDA7XFxufVxcbi5wYW5lbC1ncm91cCAucGFuZWwtZm9vdGVyICsgLnBhbmVsLWNvbGxhcHNlIC5wYW5lbC1ib2R5IHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkZGRkO1xcbn1cXG4ucGFuZWwtZGVmYXVsdCB7XFxuICBib3JkZXItY29sb3I6ICNkZGRkZGQ7XFxufVxcbi5wYW5lbC1kZWZhdWx0ID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICMzMzMzMzM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkZGRkO1xcbn1cXG4ucGFuZWwtZGVmYXVsdCA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2RkZGRkZDtcXG59XFxuLnBhbmVsLWRlZmF1bHQgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICNmNWY1ZjU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzMzO1xcbn1cXG4ucGFuZWwtZGVmYXVsdCA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjZGRkZGRkO1xcbn1cXG4ucGFuZWwtcHJpbWFyeSB7XFxuICBib3JkZXItY29sb3I6ICMzMzdhYjc7XFxufVxcbi5wYW5lbC1wcmltYXJ5ID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcbiAgYm9yZGVyLWNvbG9yOiAjMzM3YWI3O1xcbn1cXG4ucGFuZWwtcHJpbWFyeSA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzMzN2FiNztcXG59XFxuLnBhbmVsLXByaW1hcnkgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICMzMzdhYjc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG4ucGFuZWwtcHJpbWFyeSA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjMzM3YWI3O1xcbn1cXG4ucGFuZWwtc3VjY2VzcyB7XFxuICBib3JkZXItY29sb3I6ICNkNmU5YzY7XFxufVxcbi5wYW5lbC1zdWNjZXNzID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICMzYzc2M2Q7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGZmMGQ4O1xcbiAgYm9yZGVyLWNvbG9yOiAjZDZlOWM2O1xcbn1cXG4ucGFuZWwtc3VjY2VzcyA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2Q2ZTljNjtcXG59XFxuLnBhbmVsLXN1Y2Nlc3MgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICNkZmYwZDg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2M3NjNkO1xcbn1cXG4ucGFuZWwtc3VjY2VzcyA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjZDZlOWM2O1xcbn1cXG4ucGFuZWwtaW5mbyB7XFxuICBib3JkZXItY29sb3I6ICNiY2U4ZjE7XFxufVxcbi5wYW5lbC1pbmZvID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICMzMTcwOGY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDllZGY3O1xcbiAgYm9yZGVyLWNvbG9yOiAjYmNlOGYxO1xcbn1cXG4ucGFuZWwtaW5mbyA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2JjZThmMTtcXG59XFxuLnBhbmVsLWluZm8gPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICNkOWVkZjc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzE3MDhmO1xcbn1cXG4ucGFuZWwtaW5mbyA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjYmNlOGYxO1xcbn1cXG4ucGFuZWwtd2FybmluZyB7XFxuICBib3JkZXItY29sb3I6ICNmYWViY2M7XFxufVxcbi5wYW5lbC13YXJuaW5nID4gLnBhbmVsLWhlYWRpbmcge1xcbiAgY29sb3I6ICM4YTZkM2I7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmOGUzO1xcbiAgYm9yZGVyLWNvbG9yOiAjZmFlYmNjO1xcbn1cXG4ucGFuZWwtd2FybmluZyA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2ZhZWJjYztcXG59XFxuLnBhbmVsLXdhcm5pbmcgPiAucGFuZWwtaGVhZGluZyAuYmFkZ2Uge1xcbiAgY29sb3I6ICNmY2Y4ZTM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGE2ZDNiO1xcbn1cXG4ucGFuZWwtd2FybmluZyA+IC5wYW5lbC1mb290ZXIgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjZmFlYmNjO1xcbn1cXG4ucGFuZWwtZGFuZ2VyIHtcXG4gIGJvcmRlci1jb2xvcjogI2ViY2NkMTtcXG59XFxuLnBhbmVsLWRhbmdlciA+IC5wYW5lbC1oZWFkaW5nIHtcXG4gIGNvbG9yOiAjYTk0NDQyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZGVkZTtcXG4gIGJvcmRlci1jb2xvcjogI2ViY2NkMTtcXG59XFxuLnBhbmVsLWRhbmdlciA+IC5wYW5lbC1oZWFkaW5nICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2ViY2NkMTtcXG59XFxuLnBhbmVsLWRhbmdlciA+IC5wYW5lbC1oZWFkaW5nIC5iYWRnZSB7XFxuICBjb2xvcjogI2YyZGVkZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhOTQ0NDI7XFxufVxcbi5wYW5lbC1kYW5nZXIgPiAucGFuZWwtZm9vdGVyICsgLnBhbmVsLWNvbGxhcHNlID4gLnBhbmVsLWJvZHkge1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2ViY2NkMTtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUgLmVtYmVkLXJlc3BvbnNpdmUtaXRlbSxcXG4uZW1iZWQtcmVzcG9uc2l2ZSBpZnJhbWUsXFxuLmVtYmVkLXJlc3BvbnNpdmUgZW1iZWQsXFxuLmVtYmVkLXJlc3BvbnNpdmUgb2JqZWN0LFxcbi5lbWJlZC1yZXNwb25zaXZlIHZpZGVvIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMDtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUtMTZieTkge1xcbiAgcGFkZGluZy1ib3R0b206IDU2LjI1JTtcXG59XFxuLmVtYmVkLXJlc3BvbnNpdmUtNGJ5MyB7XFxuICBwYWRkaW5nLWJvdHRvbTogNzUlO1xcbn1cXG4ud2VsbCB7XFxuICBtaW4taGVpZ2h0OiAyMHB4O1xcbiAgcGFkZGluZzogMTlweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2UzZTNlMztcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcXG59XFxuLndlbGwgYmxvY2txdW90ZSB7XFxuICBib3JkZXItY29sb3I6ICNkZGQ7XFxuICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxufVxcbi53ZWxsLWxnIHtcXG4gIHBhZGRpbmc6IDI0cHg7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbi53ZWxsLXNtIHtcXG4gIHBhZGRpbmc6IDlweDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuLmNsb3NlIHtcXG4gIGZsb2F0OiByaWdodDtcXG4gIGZvbnQtc2l6ZTogMjFweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIHRleHQtc2hhZG93OiAwIDFweCAwICNmZmZmZmY7XFxuICBvcGFjaXR5OiAwLjI7XFxuICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MjApO1xcbn1cXG4uY2xvc2U6aG92ZXIsXFxuLmNsb3NlOmZvY3VzIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgb3BhY2l0eTogMC41O1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTUwKTtcXG59XFxuYnV0dG9uLmNsb3NlIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogMDtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuLm1vZGFsLW9wZW4ge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLm1vZGFsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTA1MDtcXG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcXG4gIG91dGxpbmU6IDA7XFxufVxcbi5tb2RhbC5mYWRlIC5tb2RhbC1kaWFsb2cge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjUlKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjUlKTtcXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNSUpO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1JSk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiAtby10cmFuc2Zvcm0gMC4zcyBlYXNlLW91dDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0O1xcbn1cXG4ubW9kYWwuaW4gLm1vZGFsLWRpYWxvZyB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG59XFxuLm1vZGFsLW9wZW4gLm1vZGFsIHtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxufVxcbi5tb2RhbC1kaWFsb2cge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IGF1dG87XFxuICBtYXJnaW46IDEwcHg7XFxufVxcbi5tb2RhbC1jb250ZW50IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjOTk5OTk5O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDNweCA5cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm94LXNoYWRvdzogMCAzcHggOXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcXG4gIG91dGxpbmU6IDA7XFxufVxcbi5tb2RhbC1iYWNrZHJvcCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiAxMDQwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG59XFxuLm1vZGFsLWJhY2tkcm9wLmZhZGUge1xcbiAgb3BhY2l0eTogMDtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT0wKTtcXG59XFxuLm1vZGFsLWJhY2tkcm9wLmluIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT01MCk7XFxufVxcbi5tb2RhbC1oZWFkZXIge1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlNWU1O1xcbiAgbWluLWhlaWdodDogMTYuNDI4NTcxNDNweDtcXG59XFxuLm1vZGFsLWhlYWRlciAuY2xvc2Uge1xcbiAgbWFyZ2luLXRvcDogLTJweDtcXG59XFxuLm1vZGFsLXRpdGxlIHtcXG4gIG1hcmdpbjogMDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbn1cXG4ubW9kYWwtYm9keSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbn1cXG4ubW9kYWwtZm9vdGVyIHtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTVlNWU1O1xcbn1cXG4ubW9kYWwtZm9vdGVyIC5idG4gKyAuYnRuIHtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG4ubW9kYWwtZm9vdGVyIC5idG4tZ3JvdXAgLmJ0biArIC5idG4ge1xcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XFxufVxcbi5tb2RhbC1mb290ZXIgLmJ0bi1ibG9jayArIC5idG4tYmxvY2sge1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5tb2RhbC1zY3JvbGxiYXItbWVhc3VyZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IC05OTk5cHg7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogNTBweDtcXG4gIG92ZXJmbG93OiBzY3JvbGw7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLm1vZGFsLWRpYWxvZyB7XFxuICAgIHdpZHRoOiA2MDBweDtcXG4gICAgbWFyZ2luOiAzMHB4IGF1dG87XFxuICB9XFxuICAubW9kYWwtY29udGVudCB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCA1cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIGJveC1zaGFkb3c6IDAgNXB4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgfVxcbiAgLm1vZGFsLXNtIHtcXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcXG4gIC5tb2RhbC1sZyB7XFxuICAgIHdpZHRoOiA5MDBweDtcXG4gIH1cXG59XFxuLnRvb2x0aXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogMTA3MDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDtcXG4gIG9wYWNpdHk6IDA7XFxuICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MCk7XFxufVxcbi50b29sdGlwLmluIHtcXG4gIG9wYWNpdHk6IDAuOTtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT05MCk7XFxufVxcbi50b29sdGlwLnRvcCB7XFxuICBtYXJnaW4tdG9wOiAtM3B4O1xcbiAgcGFkZGluZzogNXB4IDA7XFxufVxcbi50b29sdGlwLnJpZ2h0IHtcXG4gIG1hcmdpbi1sZWZ0OiAzcHg7XFxuICBwYWRkaW5nOiAwIDVweDtcXG59XFxuLnRvb2x0aXAuYm90dG9tIHtcXG4gIG1hcmdpbi10b3A6IDNweDtcXG4gIHBhZGRpbmc6IDVweCAwO1xcbn1cXG4udG9vbHRpcC5sZWZ0IHtcXG4gIG1hcmdpbi1sZWZ0OiAtM3B4O1xcbiAgcGFkZGluZzogMCA1cHg7XFxufVxcbi50b29sdGlwLWlubmVyIHtcXG4gIG1heC13aWR0aDogMjAwcHg7XFxuICBwYWRkaW5nOiAzcHggOHB4O1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG4udG9vbHRpcC1hcnJvdyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbn1cXG4udG9vbHRpcC50b3AgLnRvb2x0aXAtYXJyb3cge1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XFxuICBib3JkZXItd2lkdGg6IDVweCA1cHggMDtcXG4gIGJvcmRlci10b3AtY29sb3I6ICMwMDAwMDA7XFxufVxcbi50b29sdGlwLnRvcC1sZWZ0IC50b29sdGlwLWFycm93IHtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiA1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAtNXB4O1xcbiAgYm9yZGVyLXdpZHRoOiA1cHggNXB4IDA7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjMDAwMDAwO1xcbn1cXG4udG9vbHRpcC50b3AtcmlnaHQgLnRvb2x0aXAtYXJyb3cge1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogLTVweDtcXG4gIGJvcmRlci13aWR0aDogNXB4IDVweCAwO1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzAwMDAwMDtcXG59XFxuLnRvb2x0aXAucmlnaHQgLnRvb2x0aXAtYXJyb3cge1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiAwO1xcbiAgbWFyZ2luLXRvcDogLTVweDtcXG4gIGJvcmRlci13aWR0aDogNXB4IDVweCA1cHggMDtcXG4gIGJvcmRlci1yaWdodC1jb2xvcjogIzAwMDAwMDtcXG59XFxuLnRvb2x0aXAubGVmdCAudG9vbHRpcC1hcnJvdyB7XFxuICB0b3A6IDUwJTtcXG4gIHJpZ2h0OiAwO1xcbiAgbWFyZ2luLXRvcDogLTVweDtcXG4gIGJvcmRlci13aWR0aDogNXB4IDAgNXB4IDVweDtcXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiAjMDAwMDAwO1xcbn1cXG4udG9vbHRpcC5ib3R0b20gLnRvb2x0aXAtYXJyb3cge1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XFxuICBib3JkZXItd2lkdGg6IDAgNXB4IDVweDtcXG4gIGJvcmRlci1ib3R0b20tY29sb3I6ICMwMDAwMDA7XFxufVxcbi50b29sdGlwLmJvdHRvbS1sZWZ0IC50b29sdGlwLWFycm93IHtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiA1cHg7XFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcbiAgYm9yZGVyLXdpZHRoOiAwIDVweCA1cHg7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjMDAwMDAwO1xcbn1cXG4udG9vbHRpcC5ib3R0b20tcmlnaHQgLnRvb2x0aXAtYXJyb3cge1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogNXB4O1xcbiAgbWFyZ2luLXRvcDogLTVweDtcXG4gIGJvcmRlci13aWR0aDogMCA1cHggNXB4O1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzAwMDAwMDtcXG59XFxuLnBvcG92ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDEwNjA7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgbWF4LXdpZHRoOiAyNzZweDtcXG4gIHBhZGRpbmc6IDFweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICAgICAgICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIGJveC1zaGFkb3c6IDAgNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcXG59XFxuLnBvcG92ZXIudG9wIHtcXG4gIG1hcmdpbi10b3A6IC0xMHB4O1xcbn1cXG4ucG9wb3Zlci5yaWdodCB7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuLnBvcG92ZXIuYm90dG9tIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcbi5wb3BvdmVyLmxlZnQge1xcbiAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xcbn1cXG4ucG9wb3Zlci10aXRsZSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiA4cHggMTRweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWJlYjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweCA1cHggMCAwO1xcbn1cXG4ucG9wb3Zlci1jb250ZW50IHtcXG4gIHBhZGRpbmc6IDlweCAxNHB4O1xcbn1cXG4ucG9wb3ZlciA+IC5hcnJvdyxcXG4ucG9wb3ZlciA+IC5hcnJvdzphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxufVxcbi5wb3BvdmVyID4gLmFycm93IHtcXG4gIGJvcmRlci13aWR0aDogMTFweDtcXG59XFxuLnBvcG92ZXIgPiAuYXJyb3c6YWZ0ZXIge1xcbiAgYm9yZGVyLXdpZHRoOiAxMHB4O1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxufVxcbi5wb3BvdmVyLnRvcCA+IC5hcnJvdyB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTExcHg7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAwO1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzk5OTk5OTtcXG4gIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICBib3R0b206IC0xMXB4O1xcbn1cXG4ucG9wb3Zlci50b3AgPiAuYXJyb3c6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgYm90dG9tOiAxcHg7XFxuICBtYXJnaW4tbGVmdDogLTEwcHg7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAwO1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuLnBvcG92ZXIucmlnaHQgPiAuYXJyb3cge1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiAtMTFweDtcXG4gIG1hcmdpbi10b3A6IC0xMXB4O1xcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XFxuICBib3JkZXItcmlnaHQtY29sb3I6ICM5OTk5OTk7XFxuICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxufVxcbi5wb3BvdmVyLnJpZ2h0ID4gLmFycm93OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGxlZnQ6IDFweDtcXG4gIGJvdHRvbTogLTEwcHg7XFxuICBib3JkZXItbGVmdC13aWR0aDogMDtcXG4gIGJvcmRlci1yaWdodC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuLnBvcG92ZXIuYm90dG9tID4gLmFycm93IHtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiAtMTFweDtcXG4gIGJvcmRlci10b3Atd2lkdGg6IDA7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjOTk5OTk5O1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHRvcDogLTExcHg7XFxufVxcbi5wb3BvdmVyLmJvdHRvbSA+IC5hcnJvdzphZnRlciB7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICB0b3A6IDFweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMTBweDtcXG4gIGJvcmRlci10b3Atd2lkdGg6IDA7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG4ucG9wb3Zlci5sZWZ0ID4gLmFycm93IHtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IC0xMXB4O1xcbiAgbWFyZ2luLXRvcDogLTExcHg7XFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XFxuICBib3JkZXItbGVmdC1jb2xvcjogIzk5OTk5OTtcXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbn1cXG4ucG9wb3Zlci5sZWZ0ID4gLmFycm93OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIHJpZ2h0OiAxcHg7XFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XFxuICBib3JkZXItbGVmdC1jb2xvcjogI2ZmZmZmZjtcXG4gIGJvdHRvbTogLTEwcHg7XFxufVxcbi5jYXJvdXNlbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5jYXJvdXNlbC1pbm5lciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5jYXJvdXNlbC1pbm5lciA+IC5pdGVtIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IDAuNnMgZWFzZS1pbi1vdXQgbGVmdDtcXG4gIC1vLXRyYW5zaXRpb246IDAuNnMgZWFzZS1pbi1vdXQgbGVmdDtcXG4gIHRyYW5zaXRpb246IDAuNnMgZWFzZS1pbi1vdXQgbGVmdDtcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLml0ZW0gPiBpbWcsXFxuLmNhcm91c2VsLWlubmVyID4gLml0ZW0gPiBhID4gaW1nIHtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5AbWVkaWEgYWxsIGFuZCAodHJhbnNmb3JtLTNkKSwgKC13ZWJraXQtdHJhbnNmb3JtLTNkKSB7XFxuICAuY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbSB7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC42cyBlYXNlLWluLW91dDtcXG4gICAgLW8tdHJhbnNpdGlvbjogLW8tdHJhbnNmb3JtIDAuNnMgZWFzZS1pbi1vdXQ7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjZzIGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAtd2Via2l0LXBlcnNwZWN0aXZlOiAxMDAwO1xcbiAgICBwZXJzcGVjdGl2ZTogMTAwMDtcXG4gIH1cXG4gIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtLm5leHQsXFxuICAuY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbS5hY3RpdmUucmlnaHQge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTAwJSwgMCwgMCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTAwJSwgMCwgMCk7XFxuICAgIGxlZnQ6IDA7XFxuICB9XFxuICAuY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbS5wcmV2LFxcbiAgLmNhcm91c2VsLWlubmVyID4gLml0ZW0uYWN0aXZlLmxlZnQge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xMDAlLCAwLCAwKTtcXG4gICAgbGVmdDogMDtcXG4gIH1cXG4gIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtLm5leHQubGVmdCxcXG4gIC5jYXJvdXNlbC1pbm5lciA+IC5pdGVtLnByZXYucmlnaHQsXFxuICAuY2Fyb3VzZWwtaW5uZXIgPiAuaXRlbS5hY3RpdmUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgIGxlZnQ6IDA7XFxuICB9XFxufVxcbi5jYXJvdXNlbC1pbm5lciA+IC5hY3RpdmUsXFxuLmNhcm91c2VsLWlubmVyID4gLm5leHQsXFxuLmNhcm91c2VsLWlubmVyID4gLnByZXYge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5jYXJvdXNlbC1pbm5lciA+IC5hY3RpdmUge1xcbiAgbGVmdDogMDtcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLm5leHQsXFxuLmNhcm91c2VsLWlubmVyID4gLnByZXYge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5jYXJvdXNlbC1pbm5lciA+IC5uZXh0IHtcXG4gIGxlZnQ6IDEwMCU7XFxufVxcbi5jYXJvdXNlbC1pbm5lciA+IC5wcmV2IHtcXG4gIGxlZnQ6IC0xMDAlO1xcbn1cXG4uY2Fyb3VzZWwtaW5uZXIgPiAubmV4dC5sZWZ0LFxcbi5jYXJvdXNlbC1pbm5lciA+IC5wcmV2LnJpZ2h0IHtcXG4gIGxlZnQ6IDA7XFxufVxcbi5jYXJvdXNlbC1pbm5lciA+IC5hY3RpdmUubGVmdCB7XFxuICBsZWZ0OiAtMTAwJTtcXG59XFxuLmNhcm91c2VsLWlubmVyID4gLmFjdGl2ZS5yaWdodCB7XFxuICBsZWZ0OiAxMDAlO1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDE1JTtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT01MCk7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbC5sZWZ0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMCwgMCwgMCwgMC41KSAwJSwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDEwMCUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMCwgMCwgMCwgMC41KSAwJSwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDEwMCUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCByaWdodCB0b3AsIGZyb20ocmdiYSgwLCAwLCAwLCAwLjUpKSwgdG8ocmdiYSgwLCAwLCAwLCAwLjAwMDEpKSk7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMCwgMCwgMCwgMC41KSAwJSwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDEwMCUpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0nIzgwMDAwMDAwJywgZW5kQ29sb3JzdHI9JyMwMDAwMDAwMCcsIEdyYWRpZW50VHlwZT0xKTtcXG59XFxuLmNhcm91c2VsLWNvbnRyb2wucmlnaHQge1xcbiAgbGVmdDogYXV0bztcXG4gIHJpZ2h0OiAwO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDAlLCByZ2JhKDAsIDAsIDAsIDAuNSkgMTAwJSk7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQobGVmdCwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDAlLCByZ2JhKDAsIDAsIDAsIDAuNSkgMTAwJSk7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIHJpZ2h0IHRvcCwgZnJvbShyZ2JhKDAsIDAsIDAsIDAuMDAwMSkpLCB0byhyZ2JhKDAsIDAsIDAsIDAuNSkpKTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgwLCAwLCAwLCAwLjAwMDEpIDAlLCByZ2JhKDAsIDAsIDAsIDAuNSkgMTAwJSk7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XFxuICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChzdGFydENvbG9yc3RyPScjMDAwMDAwMDAnLCBlbmRDb2xvcnN0cj0nIzgwMDAwMDAwJywgR3JhZGllbnRUeXBlPTEpO1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbDpob3ZlcixcXG4uY2Fyb3VzZWwtY29udHJvbDpmb2N1cyB7XFxuICBvdXRsaW5lOiAwO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBvcGFjaXR5OiAwLjk7XFxuICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9OTApO1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1wcmV2LFxcbi5jYXJvdXNlbC1jb250cm9sIC5pY29uLW5leHQsXFxuLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLWxlZnQsXFxuLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgei1pbmRleDogNTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmNhcm91c2VsLWNvbnRyb2wgLmljb24tcHJldixcXG4uY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tbGVmdCB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTEwcHg7XFxufVxcbi5jYXJvdXNlbC1jb250cm9sIC5pY29uLW5leHQsXFxuLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0IHtcXG4gIHJpZ2h0OiA1MCU7XFxuICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1wcmV2LFxcbi5jYXJvdXNlbC1jb250cm9sIC5pY29uLW5leHQge1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBtYXJnaW4tdG9wOiAtMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgZm9udC1mYW1pbHk6IHNlcmlmO1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1wcmV2OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIwMzknO1xcbn1cXG4uY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1uZXh0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIwM2EnO1xcbn1cXG4uY2Fyb3VzZWwtaW5kaWNhdG9ycyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDEwcHg7XFxuICBsZWZ0OiA1MCU7XFxuICB6LWluZGV4OiAxNTtcXG4gIHdpZHRoOiA2MCU7XFxuICBtYXJnaW4tbGVmdDogLTMwJTtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5jYXJvdXNlbC1pbmRpY2F0b3JzIGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgbWFyZ2luOiAxcHg7XFxuICB0ZXh0LWluZGVudDogLTk5OXB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZmZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwIFxcXFw5O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG59XFxuLmNhcm91c2VsLWluZGljYXRvcnMgLmFjdGl2ZSB7XFxuICBtYXJnaW46IDA7XFxuICB3aWR0aDogMTJweDtcXG4gIGhlaWdodDogMTJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxufVxcbi5jYXJvdXNlbC1jYXB0aW9uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDE1JTtcXG4gIHJpZ2h0OiAxNSU7XFxuICBib3R0b206IDIwcHg7XFxuICB6LWluZGV4OiAxMDtcXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbn1cXG4uY2Fyb3VzZWwtY2FwdGlvbiAuYnRuIHtcXG4gIHRleHQtc2hhZG93OiBub25lO1xcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLWxlZnQsXFxuICAuY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQsXFxuICAuY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1wcmV2LFxcbiAgLmNhcm91c2VsLWNvbnRyb2wgLmljb24tbmV4dCB7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIG1hcmdpbi10b3A6IC0xNXB4O1xcbiAgICBmb250LXNpemU6IDMwcHg7XFxuICB9XFxuICAuY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tbGVmdCxcXG4gIC5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXYge1xcbiAgICBtYXJnaW4tbGVmdDogLTE1cHg7XFxuICB9XFxuICAuY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQsXFxuICAuY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1uZXh0IHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAtMTVweDtcXG4gIH1cXG4gIC5jYXJvdXNlbC1jYXB0aW9uIHtcXG4gICAgbGVmdDogMjAlO1xcbiAgICByaWdodDogMjAlO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcXG4gIH1cXG4gIC5jYXJvdXNlbC1pbmRpY2F0b3JzIHtcXG4gICAgYm90dG9tOiAyMHB4O1xcbiAgfVxcbn1cXG4uY2xlYXJmaXg6YmVmb3JlLFxcbi5jbGVhcmZpeDphZnRlcixcXG4uZGwtaG9yaXpvbnRhbCBkZDpiZWZvcmUsXFxuLmRsLWhvcml6b250YWwgZGQ6YWZ0ZXIsXFxuLmNvbnRhaW5lcjpiZWZvcmUsXFxuLmNvbnRhaW5lcjphZnRlcixcXG4uY29udGFpbmVyLWZsdWlkOmJlZm9yZSxcXG4uY29udGFpbmVyLWZsdWlkOmFmdGVyLFxcbi5yb3c6YmVmb3JlLFxcbi5yb3c6YWZ0ZXIsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDpiZWZvcmUsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDphZnRlcixcXG4uYnRuLXRvb2xiYXI6YmVmb3JlLFxcbi5idG4tdG9vbGJhcjphZnRlcixcXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDpiZWZvcmUsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6YWZ0ZXIsXFxuLm5hdjpiZWZvcmUsXFxuLm5hdjphZnRlcixcXG4ubmF2YmFyOmJlZm9yZSxcXG4ubmF2YmFyOmFmdGVyLFxcbi5uYXZiYXItaGVhZGVyOmJlZm9yZSxcXG4ubmF2YmFyLWhlYWRlcjphZnRlcixcXG4ubmF2YmFyLWNvbGxhcHNlOmJlZm9yZSxcXG4ubmF2YmFyLWNvbGxhcHNlOmFmdGVyLFxcbi5wYWdlcjpiZWZvcmUsXFxuLnBhZ2VyOmFmdGVyLFxcbi5wYW5lbC1ib2R5OmJlZm9yZSxcXG4ucGFuZWwtYm9keTphZnRlcixcXG4ubW9kYWwtZm9vdGVyOmJlZm9yZSxcXG4ubW9kYWwtZm9vdGVyOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG4uY2xlYXJmaXg6YWZ0ZXIsXFxuLmRsLWhvcml6b250YWwgZGQ6YWZ0ZXIsXFxuLmNvbnRhaW5lcjphZnRlcixcXG4uY29udGFpbmVyLWZsdWlkOmFmdGVyLFxcbi5yb3c6YWZ0ZXIsXFxuLmZvcm0taG9yaXpvbnRhbCAuZm9ybS1ncm91cDphZnRlcixcXG4uYnRuLXRvb2xiYXI6YWZ0ZXIsXFxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6YWZ0ZXIsXFxuLm5hdjphZnRlcixcXG4ubmF2YmFyOmFmdGVyLFxcbi5uYXZiYXItaGVhZGVyOmFmdGVyLFxcbi5uYXZiYXItY29sbGFwc2U6YWZ0ZXIsXFxuLnBhZ2VyOmFmdGVyLFxcbi5wYW5lbC1ib2R5OmFmdGVyLFxcbi5tb2RhbC1mb290ZXI6YWZ0ZXIge1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcbi5jZW50ZXItYmxvY2sge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuLnB1bGwtcmlnaHQge1xcbiAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7XFxufVxcbi5wdWxsLWxlZnQge1xcbiAgZmxvYXQ6IGxlZnQgIWltcG9ydGFudDtcXG59XFxuLmhpZGUge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG4uc2hvdyB7XFxuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbn1cXG4uaW52aXNpYmxlIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuLnRleHQtaGlkZSB7XFxuICBmb250OiAwLzAgYTtcXG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIHRleHQtc2hhZG93OiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IDA7XFxufVxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG4uYWZmaXgge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbn1cXG5ALW1zLXZpZXdwb3J0IHtcXG4gIHdpZHRoOiBkZXZpY2Utd2lkdGg7XFxufVxcbi52aXNpYmxlLXhzLFxcbi52aXNpYmxlLXNtLFxcbi52aXNpYmxlLW1kLFxcbi52aXNpYmxlLWxnIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuLnZpc2libGUteHMtYmxvY2ssXFxuLnZpc2libGUteHMtaW5saW5lLFxcbi52aXNpYmxlLXhzLWlubGluZS1ibG9jayxcXG4udmlzaWJsZS1zbS1ibG9jayxcXG4udmlzaWJsZS1zbS1pbmxpbmUsXFxuLnZpc2libGUtc20taW5saW5lLWJsb2NrLFxcbi52aXNpYmxlLW1kLWJsb2NrLFxcbi52aXNpYmxlLW1kLWlubGluZSxcXG4udmlzaWJsZS1tZC1pbmxpbmUtYmxvY2ssXFxuLnZpc2libGUtbGctYmxvY2ssXFxuLnZpc2libGUtbGctaW5saW5lLFxcbi52aXNpYmxlLWxnLWlubGluZS1ibG9jayB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLnZpc2libGUteHMge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGFibGUudmlzaWJsZS14cyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgfVxcbiAgdHIudmlzaWJsZS14cyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLXJvdyAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGgudmlzaWJsZS14cyxcXG4gIHRkLnZpc2libGUteHMge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgLnZpc2libGUteHMtYmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcXG4gIC52aXNpYmxlLXhzLWlubGluZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZSAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcXG4gIC52aXNpYmxlLXhzLWlubGluZS1ibG9jayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiA5OTFweCkge1xcbiAgLnZpc2libGUtc20ge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGFibGUudmlzaWJsZS1zbSB7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgfVxcbiAgdHIudmlzaWJsZS1zbSB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLXJvdyAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGgudmlzaWJsZS1zbSxcXG4gIHRkLnZpc2libGUtc20ge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MXB4KSB7XFxuICAudmlzaWJsZS1zbS1ibG9jayB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MXB4KSB7XFxuICAudmlzaWJsZS1zbS1pbmxpbmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogOTkxcHgpIHtcXG4gIC52aXNpYmxlLXNtLWlubGluZS1ibG9jayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIGFuZCAobWF4LXdpZHRoOiAxMTk5cHgpIHtcXG4gIC52aXNpYmxlLW1kIHtcXG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRhYmxlLnZpc2libGUtbWQge1xcbiAgICBkaXNwbGF5OiB0YWJsZTtcXG4gIH1cXG4gIHRyLnZpc2libGUtbWQge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1yb3cgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRoLnZpc2libGUtbWQsXFxuICB0ZC52aXNpYmxlLW1kIHtcXG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIGFuZCAobWF4LXdpZHRoOiAxMTk5cHgpIHtcXG4gIC52aXNpYmxlLW1kLWJsb2NrIHtcXG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSBhbmQgKG1heC13aWR0aDogMTE5OXB4KSB7XFxuICAudmlzaWJsZS1tZC1pbmxpbmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSBhbmQgKG1heC13aWR0aDogMTE5OXB4KSB7XFxuICAudmlzaWJsZS1tZC1pbmxpbmUtYmxvY2sge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLnZpc2libGUtbGcge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGFibGUudmlzaWJsZS1sZyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgfVxcbiAgdHIudmlzaWJsZS1sZyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLXJvdyAhaW1wb3J0YW50O1xcbiAgfVxcbiAgdGgudmlzaWJsZS1sZyxcXG4gIHRkLnZpc2libGUtbGcge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpIHtcXG4gIC52aXNpYmxlLWxnLWJsb2NrIHtcXG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLnZpc2libGUtbGctaW5saW5lIHtcXG4gICAgZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpIHtcXG4gIC52aXNpYmxlLWxnLWlubGluZS1ibG9jayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcXG4gIC5oaWRkZW4teHMge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MXB4KSB7XFxuICAuaGlkZGVuLXNtIHtcXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIGFuZCAobWF4LXdpZHRoOiAxMTk5cHgpIHtcXG4gIC5oaWRkZW4tbWQge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpIHtcXG4gIC5oaWRkZW4tbGcge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbi52aXNpYmxlLXByaW50IHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuQG1lZGlhIHByaW50IHtcXG4gIC52aXNpYmxlLXByaW50IHtcXG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRhYmxlLnZpc2libGUtcHJpbnQge1xcbiAgICBkaXNwbGF5OiB0YWJsZTtcXG4gIH1cXG4gIHRyLnZpc2libGUtcHJpbnQge1xcbiAgICBkaXNwbGF5OiB0YWJsZS1yb3cgIWltcG9ydGFudDtcXG4gIH1cXG4gIHRoLnZpc2libGUtcHJpbnQsXFxuICB0ZC52aXNpYmxlLXByaW50IHtcXG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG4udmlzaWJsZS1wcmludC1ibG9jayB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcbkBtZWRpYSBwcmludCB7XFxuICAudmlzaWJsZS1wcmludC1ibG9jayB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbi52aXNpYmxlLXByaW50LWlubGluZSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcbkBtZWRpYSBwcmludCB7XFxuICAudmlzaWJsZS1wcmludC1pbmxpbmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuLnZpc2libGUtcHJpbnQtaW5saW5lLWJsb2NrIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuQG1lZGlhIHByaW50IHtcXG4gIC52aXNpYmxlLXByaW50LWlubGluZS1ibG9jayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgcHJpbnQge1xcbiAgLmhpZGRlbi1wcmludCB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuXCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5sZXNzXG4gKiogbW9kdWxlIGlkID0gOTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvTG9naW5QYWdlL0xvZ2luUGFnZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gOTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImV4cHJlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDk2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZnNcIlxuICoqIG1vZHVsZSBpZCA9IDk3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImxvZGFzaFwiXG4gKiogbW9kdWxlIGlkID0gOThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInBhdGhcIlxuICoqIG1vZHVsZSBpZCA9IDk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9
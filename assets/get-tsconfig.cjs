"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = function(cb, mod) {
  return function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
};
var __export = function(target, all) {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = function(to, from, except, desc) {
  if (from && typeof from === "object" || typeof from === "function")
    for (var keys = __getOwnPropNames(from), i2 = 0, n = keys.length, key; i2 < n; i2++) {
      key = keys[i2];
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: function(k) {
          return from[k];
        }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
  return to;
};
var __toESM = function(mod, isNodeMode, target) {
  return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  );
};
var __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: true }), mod);
};

// ../../node_modules/slash/index.js
var require_slash = __commonJS({
  "../../node_modules/slash/index.js": function(exports2, module2) {
    "use strict";
    module2.exports = function(str) {
      var isExtendedLengthPath = /^\\\\\?\\/.test(str);
      var hasNonAscii = /[^\x00-\x80]+/.test(str);
      if (isExtendedLengthPath || hasNonAscii) {
        return str;
      }
      return str.replace(/\\/g, "/");
    };
  }
});

// get-tsconfig/src/index.ts
var index_exports = {};
__export(index_exports, {
  createFilesMatcher: function() {
    return createFilesMatcher;
  },
  createPathsMatcher: function() {
    return createPathsMatcher;
  },
  getTsconfig: function() {
    return getTsconfig;
  },
  parseTsconfig: function() {
    return parseTsconfig;
  }
});
module.exports = __toCommonJS(index_exports);

// get-tsconfig/src/get-tsconfig.ts
var import_slash3 = __toESM(require_slash(), 1);

// get-tsconfig/src/utils/find-up.ts
var import_node_path = __toESM(require("path"), 1);

// get-tsconfig/src/utils/fs-cached.ts
var import_node_fs = __toESM(require("fs"), 1);
var cacheFs = function(name) {
  var method = import_node_fs.default[name];
  return function(cache) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var cacheKey = "".concat(name, ":").concat(args.join(":"));
    var result = cache === null || cache === void 0 ? void 0 : cache.get(cacheKey);
    if (result === void 0) {
      result = Reflect.apply(method, import_node_fs.default, args);
      cache === null || cache === void 0 ? void 0 : cache.set(cacheKey, result);
    }
    return result;
  };
};
var exists = cacheFs("existsSync");
var readFile = cacheFs("readFileSync");
var stat = cacheFs("statSync");

// get-tsconfig/src/utils/find-up.ts
var findUp = function(searchPath, fileName, cache) {
  while (true) {
    var configPath = import_node_path.default.posix.join(searchPath, fileName);
    if (exists(cache, configPath)) {
      return configPath;
    }
    var parentPath = import_node_path.default.dirname(searchPath);
    if (parentPath === searchPath) {
      return;
    }
    searchPath = parentPath;
  }
};

// node_modules/@swc/helpers/esm/_define_property.js
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else obj[key] = value;
  return obj;
}

// node_modules/@swc/helpers/esm/_object_spread.js
function _object_spread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _define_property(target, key, source[key]);
    });
  }
  return target;
}

// node_modules/@swc/helpers/esm/_object_spread_props.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _object_spread_props(target, source) {
  source = source != null ? source : {};
  if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
  else {
    ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

// node_modules/@swc/helpers/esm/_type_of.js
function _type_of(obj) {
  "@swc/helpers - typeof";
  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}

// get-tsconfig/src/parse-tsconfig/index.ts
var import_node_path3 = __toESM(require("path"), 1);
var import_slash2 = __toESM(require_slash(), 1);

// get-tsconfig/src/utils/normalize-relative-path.ts
var import_slash = __toESM(require_slash(), 1);

// get-tsconfig/src/utils/is-relative-path-pattern.ts
var isRelativePathPattern = /^\.{1,2}(\/.*)?$/;

// get-tsconfig/src/utils/normalize-relative-path.ts
var normalizeRelativePath = function(filePath) {
  var normalizedPath = (0, import_slash.default)(filePath);
  return isRelativePathPattern.test(normalizedPath) ? normalizedPath : "./".concat(normalizedPath);
};

// node_modules/jsonc-parser/lib/esm/impl/scanner.js
function createScanner(text) {
  var ignoreTrivia = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var len = text.length;
  var pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    var digits = 0;
    var value2 = 0;
    while (digits < count || !exact) {
      var ch = text.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    var start = pos;
    if (text.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text.length && text.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text.substring(start, pos);
      }
    }
    var end = pos;
    if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text.substring(start, end);
  }
  function scanString() {
    var result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2;
        break;
      }
      var ch = text.charCodeAt(pos);
      if (ch === 34) {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        var ch2 = text.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            var ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token = 17;
    }
    var code = text.charCodeAt(pos);
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token = 15;
    }
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && text.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code) {
      // tokens: []{}:,
      case 123:
        pos++;
        return token = 1;
      case 125:
        pos++;
        return token = 2;
      case 91:
        pos++;
        return token = 3;
      case 93:
        pos++;
        return token = 4;
      case 58:
        pos++;
        return token = 6;
      case 44:
        pos++;
        return token = 5;
      // strings
      case 34:
        pos++;
        value = scanString();
        return token = 10;
      // comments
      case 47:
        var start = pos - 1;
        if (text.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text.substring(start, pos);
          return token = 12;
        }
        if (text.charCodeAt(pos + 1) === 42) {
          pos += 2;
          var safeLength = len - 1;
          var commentClosed = false;
          while (pos < safeLength) {
            var ch = text.charCodeAt(pos);
            if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text.substring(start, pos);
          return token = 13;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
      // numbers
      case 45:
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token = 16;
        }
      // found a minus, followed by a number so
      // we fall through to proceed with scanning
      // numbers
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token = 11;
      // literals and unknown symbols
      default:
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token = 8;
            case "false":
              return token = 9;
            case "null":
              return token = 7;
          }
          return token = 16;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    var result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition: setPosition,
    getPosition: function() {
      return pos;
    },
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: function() {
      return token;
    },
    getTokenValue: function() {
      return value;
    },
    getTokenOffset: function() {
      return tokenOffset;
    },
    getTokenLength: function() {
      return pos - tokenOffset;
    },
    getTokenStartLine: function() {
      return lineStartOffset;
    },
    getTokenStartCharacter: function() {
      return tokenOffset - prevTokenLineStartOffset;
    },
    getTokenError: function() {
      return scanError;
    }
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
  CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
  CharacterCodes2[CharacterCodes2["space"] = 32] = "space";
  CharacterCodes2[CharacterCodes2["_0"] = 48] = "_0";
  CharacterCodes2[CharacterCodes2["_1"] = 49] = "_1";
  CharacterCodes2[CharacterCodes2["_2"] = 50] = "_2";
  CharacterCodes2[CharacterCodes2["_3"] = 51] = "_3";
  CharacterCodes2[CharacterCodes2["_4"] = 52] = "_4";
  CharacterCodes2[CharacterCodes2["_5"] = 53] = "_5";
  CharacterCodes2[CharacterCodes2["_6"] = 54] = "_6";
  CharacterCodes2[CharacterCodes2["_7"] = 55] = "_7";
  CharacterCodes2[CharacterCodes2["_8"] = 56] = "_8";
  CharacterCodes2[CharacterCodes2["_9"] = 57] = "_9";
  CharacterCodes2[CharacterCodes2["a"] = 97] = "a";
  CharacterCodes2[CharacterCodes2["b"] = 98] = "b";
  CharacterCodes2[CharacterCodes2["c"] = 99] = "c";
  CharacterCodes2[CharacterCodes2["d"] = 100] = "d";
  CharacterCodes2[CharacterCodes2["e"] = 101] = "e";
  CharacterCodes2[CharacterCodes2["f"] = 102] = "f";
  CharacterCodes2[CharacterCodes2["g"] = 103] = "g";
  CharacterCodes2[CharacterCodes2["h"] = 104] = "h";
  CharacterCodes2[CharacterCodes2["i"] = 105] = "i";
  CharacterCodes2[CharacterCodes2["j"] = 106] = "j";
  CharacterCodes2[CharacterCodes2["k"] = 107] = "k";
  CharacterCodes2[CharacterCodes2["l"] = 108] = "l";
  CharacterCodes2[CharacterCodes2["m"] = 109] = "m";
  CharacterCodes2[CharacterCodes2["n"] = 110] = "n";
  CharacterCodes2[CharacterCodes2["o"] = 111] = "o";
  CharacterCodes2[CharacterCodes2["p"] = 112] = "p";
  CharacterCodes2[CharacterCodes2["q"] = 113] = "q";
  CharacterCodes2[CharacterCodes2["r"] = 114] = "r";
  CharacterCodes2[CharacterCodes2["s"] = 115] = "s";
  CharacterCodes2[CharacterCodes2["t"] = 116] = "t";
  CharacterCodes2[CharacterCodes2["u"] = 117] = "u";
  CharacterCodes2[CharacterCodes2["v"] = 118] = "v";
  CharacterCodes2[CharacterCodes2["w"] = 119] = "w";
  CharacterCodes2[CharacterCodes2["x"] = 120] = "x";
  CharacterCodes2[CharacterCodes2["y"] = 121] = "y";
  CharacterCodes2[CharacterCodes2["z"] = 122] = "z";
  CharacterCodes2[CharacterCodes2["A"] = 65] = "A";
  CharacterCodes2[CharacterCodes2["B"] = 66] = "B";
  CharacterCodes2[CharacterCodes2["C"] = 67] = "C";
  CharacterCodes2[CharacterCodes2["D"] = 68] = "D";
  CharacterCodes2[CharacterCodes2["E"] = 69] = "E";
  CharacterCodes2[CharacterCodes2["F"] = 70] = "F";
  CharacterCodes2[CharacterCodes2["G"] = 71] = "G";
  CharacterCodes2[CharacterCodes2["H"] = 72] = "H";
  CharacterCodes2[CharacterCodes2["I"] = 73] = "I";
  CharacterCodes2[CharacterCodes2["J"] = 74] = "J";
  CharacterCodes2[CharacterCodes2["K"] = 75] = "K";
  CharacterCodes2[CharacterCodes2["L"] = 76] = "L";
  CharacterCodes2[CharacterCodes2["M"] = 77] = "M";
  CharacterCodes2[CharacterCodes2["N"] = 78] = "N";
  CharacterCodes2[CharacterCodes2["O"] = 79] = "O";
  CharacterCodes2[CharacterCodes2["P"] = 80] = "P";
  CharacterCodes2[CharacterCodes2["Q"] = 81] = "Q";
  CharacterCodes2[CharacterCodes2["R"] = 82] = "R";
  CharacterCodes2[CharacterCodes2["S"] = 83] = "S";
  CharacterCodes2[CharacterCodes2["T"] = 84] = "T";
  CharacterCodes2[CharacterCodes2["U"] = 85] = "U";
  CharacterCodes2[CharacterCodes2["V"] = 86] = "V";
  CharacterCodes2[CharacterCodes2["W"] = 87] = "W";
  CharacterCodes2[CharacterCodes2["X"] = 88] = "X";
  CharacterCodes2[CharacterCodes2["Y"] = 89] = "Y";
  CharacterCodes2[CharacterCodes2["Z"] = 90] = "Z";
  CharacterCodes2[CharacterCodes2["asterisk"] = 42] = "asterisk";
  CharacterCodes2[CharacterCodes2["backslash"] = 92] = "backslash";
  CharacterCodes2[CharacterCodes2["closeBrace"] = 125] = "closeBrace";
  CharacterCodes2[CharacterCodes2["closeBracket"] = 93] = "closeBracket";
  CharacterCodes2[CharacterCodes2["colon"] = 58] = "colon";
  CharacterCodes2[CharacterCodes2["comma"] = 44] = "comma";
  CharacterCodes2[CharacterCodes2["dot"] = 46] = "dot";
  CharacterCodes2[CharacterCodes2["doubleQuote"] = 34] = "doubleQuote";
  CharacterCodes2[CharacterCodes2["minus"] = 45] = "minus";
  CharacterCodes2[CharacterCodes2["openBrace"] = 123] = "openBrace";
  CharacterCodes2[CharacterCodes2["openBracket"] = 91] = "openBracket";
  CharacterCodes2[CharacterCodes2["plus"] = 43] = "plus";
  CharacterCodes2[CharacterCodes2["slash"] = 47] = "slash";
  CharacterCodes2[CharacterCodes2["formFeed"] = 12] = "formFeed";
  CharacterCodes2[CharacterCodes2["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));

// node_modules/jsonc-parser/lib/esm/impl/string-intern.js
var cachedSpaces = new Array(20).fill(0).map(function(_2, index) {
  return " ".repeat(index);
});
var maxCachedValues = 200;
var cachedBreakLinesWithSpaces = {
  " ": {
    "\n": new Array(maxCachedValues).fill(0).map(function(_2, index) {
      return "\n" + " ".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map(function(_2, index) {
      return "\r" + " ".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map(function(_2, index) {
      return "\r\n" + " ".repeat(index);
    })
  },
  "	": {
    "\n": new Array(maxCachedValues).fill(0).map(function(_2, index) {
      return "\n" + "	".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map(function(_2, index) {
      return "\r" + "	".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map(function(_2, index) {
      return "\r\n" + "	".repeat(index);
    })
  }
};

// node_modules/jsonc-parser/lib/esm/impl/parser.js
var ParseOptions;
(function(ParseOptions2) {
  ParseOptions2.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
function parse(text) {
  var errors = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ParseOptions.DEFAULT;
  var currentProperty = null;
  var currentParent = [];
  var previousParents = [];
  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }
  var visitor = {
    onObjectBegin: function() {
      var object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: function(name) {
      currentProperty = name;
    },
    onObjectEnd: function() {
      currentParent = previousParents.pop();
    },
    onArrayBegin: function() {
      var array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: function() {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: function(error, offset, length) {
      errors.push({
        error: error,
        offset: offset,
        length: length
      });
    }
  };
  visit(text, visitor, options);
  return currentParent[0];
}
function visit(text, visitor) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ParseOptions.DEFAULT;
  var _scanner = createScanner(text, false);
  var _jsonPath = [];
  var suppressedCallbacks = 0;
  function toNoArgVisit(visitFunction) {
    return visitFunction ? function() {
      return suppressedCallbacks === 0 && visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function() {
      return true;
    };
  }
  function toOneArgVisit(visitFunction) {
    return visitFunction ? function(arg) {
      return suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function() {
      return true;
    };
  }
  function toOneArgVisitWithPath(visitFunction) {
    return visitFunction ? function(arg) {
      return suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), function() {
        return _jsonPath.slice();
      });
    } : function() {
      return true;
    };
  }
  function toBeginVisit(visitFunction) {
    return visitFunction ? function() {
      if (suppressedCallbacks > 0) {
        suppressedCallbacks++;
      } else {
        var cbReturn = visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), function() {
          return _jsonPath.slice();
        });
        if (cbReturn === false) {
          suppressedCallbacks = 1;
        }
      }
    } : function() {
      return true;
    };
  }
  function toEndVisit(visitFunction) {
    return visitFunction ? function() {
      if (suppressedCallbacks > 0) {
        suppressedCallbacks--;
      }
      if (suppressedCallbacks === 0) {
        visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
      }
    } : function() {
      return true;
    };
  }
  var onObjectBegin = toBeginVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisitWithPath(visitor.onObjectProperty), onObjectEnd = toEndVisit(visitor.onObjectEnd), onArrayBegin = toBeginVisit(visitor.onArrayBegin), onArrayEnd = toEndVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisitWithPath(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
  var disallowComments = options && options.disallowComments;
  var allowTrailingComma = options && options.allowTrailingComma;
  function scanNext() {
    while (true) {
      var token = _scanner.scan();
      switch (_scanner.getTokenError()) {
        case 4:
          handleError(
            14
            /* ParseErrorCode.InvalidUnicode */
          );
          break;
        case 5:
          handleError(
            15
            /* ParseErrorCode.InvalidEscapeCharacter */
          );
          break;
        case 3:
          handleError(
            13
            /* ParseErrorCode.UnexpectedEndOfNumber */
          );
          break;
        case 1:
          if (!disallowComments) {
            handleError(
              11
              /* ParseErrorCode.UnexpectedEndOfComment */
            );
          }
          break;
        case 2:
          handleError(
            12
            /* ParseErrorCode.UnexpectedEndOfString */
          );
          break;
        case 6:
          handleError(
            16
            /* ParseErrorCode.InvalidCharacter */
          );
          break;
      }
      switch (token) {
        case 12:
        case 13:
          if (disallowComments) {
            handleError(
              10
              /* ParseErrorCode.InvalidCommentToken */
            );
          } else {
            onComment();
          }
          break;
        case 16:
          handleError(
            1
            /* ParseErrorCode.InvalidSymbol */
          );
          break;
        case 15:
        case 14:
          break;
        default:
          return token;
      }
    }
  }
  function handleError(error) {
    var skipUntilAfter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], skipUntil = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    onError(error);
    if (skipUntilAfter.length + skipUntil.length > 0) {
      var token = _scanner.getToken();
      while (token !== 17) {
        if (skipUntilAfter.indexOf(token) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token) !== -1) {
          break;
        }
        token = scanNext();
      }
    }
  }
  function parseString(isValue) {
    var value = _scanner.getTokenValue();
    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
      _jsonPath.push(value);
    }
    scanNext();
    return true;
  }
  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11:
        var tokenValue = _scanner.getTokenValue();
        var value = Number(tokenValue);
        if (isNaN(value)) {
          handleError(
            2
            /* ParseErrorCode.InvalidNumberFormat */
          );
          value = 0;
        }
        onLiteralValue(value);
        break;
      case 7:
        onLiteralValue(null);
        break;
      case 8:
        onLiteralValue(true);
        break;
      case 9:
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    scanNext();
    return true;
  }
  function parseProperty() {
    if (_scanner.getToken() !== 10) {
      handleError(3, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
      return false;
    }
    parseString(false);
    if (_scanner.getToken() === 6) {
      onSeparator(":");
      scanNext();
      if (!parseValue()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
    } else {
      handleError(5, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
    }
    _jsonPath.pop();
    return true;
  }
  function parseObject() {
    onObjectBegin();
    scanNext();
    var needsComma = false;
    while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 2 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (!parseProperty()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onObjectEnd();
    if (_scanner.getToken() !== 2) {
      handleError(7, [
        2
        /* SyntaxKind.CloseBraceToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseArray() {
    onArrayBegin();
    scanNext();
    var isFirstElement = true;
    var needsComma = false;
    while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 4 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (isFirstElement) {
        _jsonPath.push(0);
        isFirstElement = false;
      } else {
        _jsonPath[_jsonPath.length - 1]++;
      }
      if (!parseValue()) {
        handleError(4, [], [
          4,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onArrayEnd();
    if (!isFirstElement) {
      _jsonPath.pop();
    }
    if (_scanner.getToken() !== 4) {
      handleError(8, [
        4
        /* SyntaxKind.CloseBracketToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseValue() {
    switch (_scanner.getToken()) {
      case 3:
        return parseArray();
      case 1:
        return parseObject();
      case 10:
        return parseString(true);
      default:
        return parseLiteral();
    }
  }
  scanNext();
  if (_scanner.getToken() === 17) {
    if (options.allowEmptyContent) {
      return true;
    }
    handleError(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, [], []);
    return false;
  }
  if (_scanner.getToken() !== 17) {
    handleError(9, [], []);
  }
  return true;
}

// node_modules/jsonc-parser/lib/esm/main.js
var ScanError;
(function(ScanError2) {
  ScanError2[ScanError2["None"] = 0] = "None";
  ScanError2[ScanError2["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
  ScanError2[ScanError2["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
  ScanError2[ScanError2["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
  ScanError2[ScanError2["InvalidUnicode"] = 4] = "InvalidUnicode";
  ScanError2[ScanError2["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
  ScanError2[ScanError2["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind2) {
  SyntaxKind2[SyntaxKind2["OpenBraceToken"] = 1] = "OpenBraceToken";
  SyntaxKind2[SyntaxKind2["CloseBraceToken"] = 2] = "CloseBraceToken";
  SyntaxKind2[SyntaxKind2["OpenBracketToken"] = 3] = "OpenBracketToken";
  SyntaxKind2[SyntaxKind2["CloseBracketToken"] = 4] = "CloseBracketToken";
  SyntaxKind2[SyntaxKind2["CommaToken"] = 5] = "CommaToken";
  SyntaxKind2[SyntaxKind2["ColonToken"] = 6] = "ColonToken";
  SyntaxKind2[SyntaxKind2["NullKeyword"] = 7] = "NullKeyword";
  SyntaxKind2[SyntaxKind2["TrueKeyword"] = 8] = "TrueKeyword";
  SyntaxKind2[SyntaxKind2["FalseKeyword"] = 9] = "FalseKeyword";
  SyntaxKind2[SyntaxKind2["StringLiteral"] = 10] = "StringLiteral";
  SyntaxKind2[SyntaxKind2["NumericLiteral"] = 11] = "NumericLiteral";
  SyntaxKind2[SyntaxKind2["LineCommentTrivia"] = 12] = "LineCommentTrivia";
  SyntaxKind2[SyntaxKind2["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
  SyntaxKind2[SyntaxKind2["LineBreakTrivia"] = 14] = "LineBreakTrivia";
  SyntaxKind2[SyntaxKind2["Trivia"] = 15] = "Trivia";
  SyntaxKind2[SyntaxKind2["Unknown"] = 16] = "Unknown";
  SyntaxKind2[SyntaxKind2["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
var parse2 = parse;
var ParseErrorCode;
(function(ParseErrorCode2) {
  ParseErrorCode2[ParseErrorCode2["InvalidSymbol"] = 1] = "InvalidSymbol";
  ParseErrorCode2[ParseErrorCode2["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
  ParseErrorCode2[ParseErrorCode2["PropertyNameExpected"] = 3] = "PropertyNameExpected";
  ParseErrorCode2[ParseErrorCode2["ValueExpected"] = 4] = "ValueExpected";
  ParseErrorCode2[ParseErrorCode2["ColonExpected"] = 5] = "ColonExpected";
  ParseErrorCode2[ParseErrorCode2["CommaExpected"] = 6] = "CommaExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBraceExpected"] = 7] = "CloseBraceExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBracketExpected"] = 8] = "CloseBracketExpected";
  ParseErrorCode2[ParseErrorCode2["EndOfFileExpected"] = 9] = "EndOfFileExpected";
  ParseErrorCode2[ParseErrorCode2["InvalidCommentToken"] = 10] = "InvalidCommentToken";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
  ParseErrorCode2[ParseErrorCode2["InvalidUnicode"] = 14] = "InvalidUnicode";
  ParseErrorCode2[ParseErrorCode2["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
  ParseErrorCode2[ParseErrorCode2["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));

// get-tsconfig/src/utils/read-jsonc.ts
var readJsonc = function(jsonPath, cache) {
  return parse2(readFile(cache, jsonPath, "utf8"));
};

// get-tsconfig/src/utils/constants.ts
var implicitBaseUrlSymbol = Symbol("implicitBaseUrl");
var configDirPlaceholder = "${configDir}";

// node_modules/@swc/helpers/esm/_array_with_holes.js
function _array_with_holes(arr) {
  if (Array.isArray(arr)) return arr;
}

// node_modules/@swc/helpers/esm/_iterable_to_array_limit.js
function _iterable_to_array_limit(arr, i2) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

// node_modules/@swc/helpers/esm/_non_iterable_rest.js
function _non_iterable_rest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@swc/helpers/esm/_array_like_to_array.js
function _array_like_to_array(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}

// node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js
function _unsupported_iterable_to_array(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _array_like_to_array(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}

// node_modules/@swc/helpers/esm/_sliced_to_array.js
function _sliced_to_array(arr, i2) {
  return _array_with_holes(arr) || _iterable_to_array_limit(arr, i2) || _unsupported_iterable_to_array(arr, i2) || _non_iterable_rest();
}

// node_modules/@swc/helpers/esm/_iterable_to_array.js
function _iterable_to_array(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
    return Array.from(iter);
  }
}

// node_modules/@swc/helpers/esm/_to_array.js
function _to_array(arr) {
  return _array_with_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_rest();
}

// get-tsconfig/src/parse-tsconfig/resolve-extends-path.ts
var import_node_path2 = __toESM(require("path"), 1);
var import_node_module = __toESM(require("module"), 1);

// node_modules/resolve-pkg-maps/dist/index.mjs
var A = function(r) {
  return r !== null && (typeof r === "undefined" ? "undefined" : _type_of(r)) == "object";
};
var a = function(r, t) {
  return Object.assign(new Error("[".concat(r, "]: ").concat(t)), {
    code: r
  });
};
var _ = "ERR_INVALID_PACKAGE_CONFIG";
var E = "ERR_INVALID_PACKAGE_TARGET";
var I = "ERR_PACKAGE_PATH_NOT_EXPORTED";
var R = /^\d+$/;
var O = /^(\.{1,2}|node_modules)$/i;
var w = /\/|\\/;
var h = function(r) {
  return r.Export = "exports", r.Import = "imports", r;
}(h || {});
var f = function(r, t, e, o, c2) {
  if (t == null) return [];
  if (typeof t == "string") {
    var _t_split = _to_array(t.split(w)), n = _t_split[0], i2 = _t_split.slice(1);
    if (n === ".." || i2.some(function(l2) {
      return O.test(l2);
    })) throw a(E, 'Invalid "'.concat(r, '" target "').concat(t, '" defined in the package config'));
    return [
      c2 ? t.replace(/\*/g, c2) : t
    ];
  }
  if (Array.isArray(t)) return t.flatMap(function(n2) {
    return f(r, n2, e, o, c2);
  });
  if (A(t)) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = Object.keys(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n1 = _step.value;
        if (R.test(n1)) throw a(_, "Cannot contain numeric property keys");
        if (n1 === "default" || o.includes(n1)) return f(r, t[n1], e, o, c2);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return [];
  }
  throw a(E, 'Invalid "'.concat(r, '" target "').concat(t, '"'));
};
var s = "*";
var m = function(r, t) {
  var e = r.indexOf(s), o = t.indexOf(s);
  return e === o ? t.length > r.length : o > e;
};
function d(r, t) {
  if (!t.includes(s) && r.hasOwnProperty(t)) return [
    t
  ];
  var e, o;
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = Object.keys(r)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c2 = _step.value;
      if (c2.includes(s)) {
        var _c_split = _sliced_to_array(c2.split(s), 3), n = _c_split[0], i2 = _c_split[1], l2 = _c_split[2];
        if (l2 === void 0 && t.startsWith(n) && t.endsWith(i2)) {
          var g = t.slice(n.length, -i2.length || void 0);
          g && (!e || m(e, c2)) && (e = c2, o = g);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return [
    e,
    o
  ];
}
var p = function(r) {
  return Object.keys(r).reduce(function(t, e) {
    var o = e === "" || e[0] !== ".";
    if (t === void 0 || t === o) return o;
    throw a(_, '"exports" cannot contain some keys starting with "." and some not');
  }, void 0);
};
var u = /^\w+:/;
var v = function(r, t, e) {
  if (!r) throw new Error('"exports" is required');
  t = t === "" ? "." : "./".concat(t), (typeof r == "string" || Array.isArray(r) || A(r) && p(r)) && (r = {
    ".": r
  });
  var _d = _sliced_to_array(d(r, t), 2), o = _d[0], c2 = _d[1], n = f(h.Export, r[o], t, e, c2);
  if (n.length === 0) throw a(I, t === "." ? 'No "exports" main defined' : "Package subpath '".concat(t, '\' is not defined by "exports"'));
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = n[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i2 = _step.value;
      if (!i2.startsWith("./") && !u.test(i2)) throw a(E, 'Invalid "exports" target "'.concat(i2, '" defined in the package config'));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return n;
};

// get-tsconfig/src/parse-tsconfig/resolve-extends-path.ts
var getPnpApi = function() {
  var findPnpApi = import_node_module.default.findPnpApi;
  return findPnpApi && findPnpApi(process.cwd());
};
var resolveFromPackageJsonPath = function(packageJsonPath, subpath, ignoreExports, cache) {
  var cacheKey = "resolveFromPackageJsonPath:".concat(packageJsonPath, ":").concat(subpath, ":").concat(ignoreExports);
  if (cache === null || cache === void 0 ? void 0 : cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  var packageJson = readJsonc(packageJsonPath, cache);
  if (!packageJson) {
    return;
  }
  var resolvedPath = subpath || "tsconfig.json";
  if (!ignoreExports && packageJson.exports) {
    try {
      var _resolveExports = _sliced_to_array(v(packageJson.exports, subpath, [
        "require",
        "types"
      ]), 1), resolvedExport = _resolveExports[0];
      resolvedPath = resolvedExport;
    } catch (e) {
      return false;
    }
  } else if (!subpath && packageJson.tsconfig) {
    resolvedPath = packageJson.tsconfig;
  }
  resolvedPath = import_node_path2.default.join(packageJsonPath, "..", resolvedPath);
  cache === null || cache === void 0 ? void 0 : cache.set(cacheKey, resolvedPath);
  return resolvedPath;
};
var PACKAGE_JSON = "package.json";
var TS_CONFIG_JSON = "tsconfig.json";
var resolveExtendsPath = function(requestedPath, directoryPath, cache) {
  var filePath = requestedPath;
  if (requestedPath === "..") {
    filePath = import_node_path2.default.join(filePath, TS_CONFIG_JSON);
  }
  if (requestedPath[0] === ".") {
    filePath = import_node_path2.default.resolve(directoryPath, filePath);
  }
  if (import_node_path2.default.isAbsolute(filePath)) {
    if (exists(cache, filePath)) {
      if (stat(cache, filePath).isFile()) {
        return filePath;
      }
    } else if (!filePath.endsWith(".json")) {
      var jsonPath = "".concat(filePath, ".json");
      if (exists(cache, jsonPath)) {
        return jsonPath;
      }
    }
    return;
  }
  var _requestedPath_split = _to_array(requestedPath.split("/")), orgOrName = _requestedPath_split[0], remaining = _requestedPath_split.slice(1);
  var packageName = orgOrName[0] === "@" ? "".concat(orgOrName, "/").concat(remaining.shift()) : orgOrName;
  var subpath = remaining.join("/");
  var pnpApi = getPnpApi();
  if (pnpApi) {
    var resolveWithPnp = pnpApi.resolveRequest;
    try {
      if (packageName === requestedPath) {
        var packageJsonPath = resolveWithPnp(import_node_path2.default.join(packageName, PACKAGE_JSON), directoryPath);
        if (packageJsonPath) {
          var resolvedPath = resolveFromPackageJsonPath(packageJsonPath, subpath, false, cache);
          if (resolvedPath && exists(cache, resolvedPath)) {
            return resolvedPath;
          }
        }
      } else {
        var resolved;
        try {
          resolved = resolveWithPnp(requestedPath, directoryPath, {
            extensions: [
              ".json"
            ]
          });
        } catch (e) {
          resolved = resolveWithPnp(import_node_path2.default.join(requestedPath, TS_CONFIG_JSON), directoryPath);
        }
        if (resolved) {
          return resolved;
        }
      }
    } catch (e) {
    }
  }
  var packagePath = findUp(import_node_path2.default.resolve(directoryPath), import_node_path2.default.join("node_modules", packageName), cache);
  if (!packagePath || !stat(cache, packagePath).isDirectory()) {
    return;
  }
  var packageJsonPath1 = import_node_path2.default.join(packagePath, PACKAGE_JSON);
  if (exists(cache, packageJsonPath1)) {
    var resolvedPath1 = resolveFromPackageJsonPath(packageJsonPath1, subpath, false, cache);
    if (resolvedPath1 === false) {
      return;
    }
    if (resolvedPath1 && exists(cache, resolvedPath1) && stat(cache, resolvedPath1).isFile()) {
      return resolvedPath1;
    }
  }
  var fullPackagePath = import_node_path2.default.join(packagePath, subpath);
  var jsonExtension = fullPackagePath.endsWith(".json");
  if (!jsonExtension) {
    var fullPackagePathWithJson = "".concat(fullPackagePath, ".json");
    if (exists(cache, fullPackagePathWithJson)) {
      return fullPackagePathWithJson;
    }
  }
  if (!exists(cache, fullPackagePath)) {
    return;
  }
  if (stat(cache, fullPackagePath).isDirectory()) {
    var fullPackageJsonPath = import_node_path2.default.join(fullPackagePath, PACKAGE_JSON);
    if (exists(cache, fullPackageJsonPath)) {
      var resolvedPath2 = resolveFromPackageJsonPath(fullPackageJsonPath, "", true, cache);
      if (resolvedPath2 && exists(cache, resolvedPath2)) {
        return resolvedPath2;
      }
    }
    var tsconfigPath = import_node_path2.default.join(fullPackagePath, TS_CONFIG_JSON);
    if (exists(cache, tsconfigPath)) {
      return tsconfigPath;
    }
  } else if (jsonExtension) {
    return fullPackagePath;
  }
};

// get-tsconfig/src/parse-tsconfig/index.ts
var pathRelative = function(from, to) {
  return normalizeRelativePath(import_node_path3.default.relative(from, to));
};
var filesProperties = [
  "files",
  "include",
  "exclude"
];
var resolveExtends = function(extendsPath, fromDirectoryPath, circularExtendsTracker, cache) {
  var resolvedExtendsPath = resolveExtendsPath(extendsPath, fromDirectoryPath, cache);
  if (!resolvedExtendsPath) {
    throw new Error("File '".concat(extendsPath, "' not found."));
  }
  if (circularExtendsTracker.has(resolvedExtendsPath)) {
    throw new Error("Circularity detected while resolving configuration: ".concat(resolvedExtendsPath));
  }
  circularExtendsTracker.add(resolvedExtendsPath);
  var extendsDirectoryPath = import_node_path3.default.dirname(resolvedExtendsPath);
  var extendsConfig = _parseTsconfig(resolvedExtendsPath, cache, circularExtendsTracker);
  delete extendsConfig.references;
  var compilerOptions = extendsConfig.compilerOptions;
  if (compilerOptions) {
    var baseUrl = compilerOptions.baseUrl;
    if (baseUrl && !baseUrl.startsWith(configDirPlaceholder)) {
      compilerOptions.baseUrl = (0, import_slash2.default)(import_node_path3.default.relative(fromDirectoryPath, import_node_path3.default.join(extendsDirectoryPath, baseUrl))) || "./";
    }
    var outDir = compilerOptions.outDir;
    if (outDir) {
      if (!outDir.startsWith(configDirPlaceholder)) {
        outDir = import_node_path3.default.relative(fromDirectoryPath, import_node_path3.default.join(extendsDirectoryPath, outDir));
      }
      compilerOptions.outDir = (0, import_slash2.default)(outDir) || "./";
    }
  }
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = filesProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;
      var filesList = extendsConfig[property];
      if (filesList) {
        extendsConfig[property] = filesList.map(function(file) {
          if (file.startsWith(configDirPlaceholder)) {
            return file;
          }
          return (0, import_slash2.default)(import_node_path3.default.relative(fromDirectoryPath, import_node_path3.default.join(extendsDirectoryPath, file)));
        });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return extendsConfig;
};
var outputFields = [
  "outDir",
  "declarationDir"
];
var _parseTsconfig = function(tsconfigPath, cache) {
  var circularExtendsTracker = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new Set();
  var config;
  try {
    config = readJsonc(tsconfigPath, cache) || {};
  } catch (e) {
    throw new Error("Cannot resolve tsconfig at path: ".concat(tsconfigPath));
  }
  if ((typeof config === "undefined" ? "undefined" : _type_of(config)) !== "object") {
    throw new SyntaxError("Failed to parse tsconfig at: ".concat(tsconfigPath));
  }
  var directoryPath = import_node_path3.default.dirname(tsconfigPath);
  if (config.compilerOptions) {
    var compilerOptions = config.compilerOptions;
    if (compilerOptions.paths && !compilerOptions.baseUrl) {
      compilerOptions[implicitBaseUrlSymbol] = directoryPath;
    }
  }
  if (config.extends) {
    var extendsPathList = Array.isArray(config.extends) ? config.extends : [
      config.extends
    ];
    delete config.extends;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = extendsPathList.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var extendsPath = _step.value;
        var extendsConfig = resolveExtends(extendsPath, directoryPath, new Set(circularExtendsTracker), cache);
        var merged = _object_spread_props(_object_spread({}, extendsConfig, config), {
          compilerOptions: _object_spread({}, extendsConfig.compilerOptions, config.compilerOptions)
        });
        if (extendsConfig.watchOptions) {
          merged.watchOptions = _object_spread({}, extendsConfig.watchOptions, config.watchOptions);
        }
        config = merged;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  if (config.compilerOptions) {
    var compilerOptions1 = config.compilerOptions;
    var normalizedPaths = [
      "baseUrl",
      "rootDir"
    ];
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
    try {
      for (var _iterator1 = normalizedPaths[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
        var property = _step1.value;
        var unresolvedPath = compilerOptions1[property];
        if (unresolvedPath && !unresolvedPath.startsWith(configDirPlaceholder)) {
          var resolvedBaseUrl = import_node_path3.default.resolve(directoryPath, unresolvedPath);
          var relativeBaseUrl = pathRelative(directoryPath, resolvedBaseUrl);
          compilerOptions1[property] = relativeBaseUrl;
        }
      }
    } catch (err) {
      _didIteratorError1 = true;
      _iteratorError1 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
          _iterator1.return();
        }
      } finally {
        if (_didIteratorError1) {
          throw _iteratorError1;
        }
      }
    }
    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = void 0;
    try {
      for (var _iterator2 = outputFields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var outputField = _step2.value;
        var outputPath = compilerOptions1[outputField];
        if (outputPath) {
          if (!Array.isArray(config.exclude)) {
            config.exclude = [];
          }
          if (!config.exclude.includes(outputPath)) {
            config.exclude.push(outputPath);
          }
          if (!outputPath.startsWith(configDirPlaceholder)) {
            outputPath = normalizeRelativePath(outputPath);
          }
          compilerOptions1[outputField] = outputPath;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } else {
    config.compilerOptions = {};
  }
  if (config.include) {
    config.include = config.include.map(import_slash2.default);
    if (config.files) {
      delete config.files;
    }
  } else if (config.files) {
    config.files = config.files.map(function(file) {
      return file.startsWith(configDirPlaceholder) ? file : normalizeRelativePath(file);
    });
  }
  if (config.watchOptions) {
    var watchOptions = config.watchOptions;
    if (watchOptions.excludeDirectories) {
      watchOptions.excludeDirectories = watchOptions.excludeDirectories.map(function(excludePath) {
        return (0, import_slash2.default)(import_node_path3.default.resolve(directoryPath, excludePath));
      });
    }
  }
  return config;
};
var interpolateConfigDir = function(filePath, configDir) {
  if (filePath.startsWith(configDirPlaceholder)) {
    return (0, import_slash2.default)(import_node_path3.default.join(configDir, filePath.slice(configDirPlaceholder.length)));
  }
};
var compilerFieldsWithConfigDir = [
  "outDir",
  "declarationDir",
  "outFile",
  "rootDir",
  "baseUrl",
  "tsBuildInfoFile"
];
var normalizeCompilerOptions = function(compilerOptions) {
  if (compilerOptions.strict) {
    var strictOptions = [
      "noImplicitAny",
      "noImplicitThis",
      "strictNullChecks",
      "strictFunctionTypes",
      "strictBindCallApply",
      "strictPropertyInitialization",
      "strictBuiltinIteratorReturn",
      "alwaysStrict",
      "useUnknownInCatchVariables"
    ];
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = strictOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        if (compilerOptions[key] === void 0) {
          compilerOptions[key] = true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  if (compilerOptions.target) {
    var target = compilerOptions.target.toLowerCase();
    if (target === "es2015") {
      target = "es6";
    }
    compilerOptions.target = target;
    if (target === "esnext") {
      var _compilerOptions, _compilerOptions1;
      var _module;
      (_module = (_compilerOptions = compilerOptions).module) !== null && _module !== void 0 ? _module : _compilerOptions.module = "es6";
      var _useDefineForClassFields;
      (_useDefineForClassFields = (_compilerOptions1 = compilerOptions).useDefineForClassFields) !== null && _useDefineForClassFields !== void 0 ? _useDefineForClassFields : _compilerOptions1.useDefineForClassFields = true;
    }
    if (target === "es6" || target === "es2016" || target === "es2017" || target === "es2018" || target === "es2019" || target === "es2020" || target === "es2021" || target === "es2022" || target === "es2023" || target === "es2024") {
      var _compilerOptions2;
      var _module1;
      (_module1 = (_compilerOptions2 = compilerOptions).module) !== null && _module1 !== void 0 ? _module1 : _compilerOptions2.module = "es6";
    }
    if (target === "es2022" || target === "es2023" || target === "es2024") {
      var _compilerOptions3;
      var _useDefineForClassFields1;
      (_useDefineForClassFields1 = (_compilerOptions3 = compilerOptions).useDefineForClassFields) !== null && _useDefineForClassFields1 !== void 0 ? _useDefineForClassFields1 : _compilerOptions3.useDefineForClassFields = true;
    }
  }
  if (compilerOptions.module) {
    var module2 = compilerOptions.module.toLowerCase();
    if (module2 === "es2015") {
      module2 = "es6";
    }
    compilerOptions.module = module2;
    if (module2 === "es6" || module2 === "es2020" || module2 === "es2022" || module2 === "esnext" || module2 === "none" || module2 === "system" || module2 === "umd" || module2 === "amd") {
      var _compilerOptions4;
      var _moduleResolution;
      (_moduleResolution = (_compilerOptions4 = compilerOptions).moduleResolution) !== null && _moduleResolution !== void 0 ? _moduleResolution : _compilerOptions4.moduleResolution = "classic";
    }
    if (module2 === "system") {
      var _compilerOptions5;
      var _allowSyntheticDefaultImports;
      (_allowSyntheticDefaultImports = (_compilerOptions5 = compilerOptions).allowSyntheticDefaultImports) !== null && _allowSyntheticDefaultImports !== void 0 ? _allowSyntheticDefaultImports : _compilerOptions5.allowSyntheticDefaultImports = true;
    }
    if (module2 === "node16" || module2 === "nodenext" || module2 === "preserve") {
      var _compilerOptions6, _compilerOptions7;
      var _esModuleInterop;
      (_esModuleInterop = (_compilerOptions6 = compilerOptions).esModuleInterop) !== null && _esModuleInterop !== void 0 ? _esModuleInterop : _compilerOptions6.esModuleInterop = true;
      var _allowSyntheticDefaultImports1;
      (_allowSyntheticDefaultImports1 = (_compilerOptions7 = compilerOptions).allowSyntheticDefaultImports) !== null && _allowSyntheticDefaultImports1 !== void 0 ? _allowSyntheticDefaultImports1 : _compilerOptions7.allowSyntheticDefaultImports = true;
    }
    if (module2 === "node16" || module2 === "nodenext") {
      var _compilerOptions8, _compilerOptions9;
      var _moduleDetection;
      (_moduleDetection = (_compilerOptions8 = compilerOptions).moduleDetection) !== null && _moduleDetection !== void 0 ? _moduleDetection : _compilerOptions8.moduleDetection = "force";
      var _useDefineForClassFields2;
      (_useDefineForClassFields2 = (_compilerOptions9 = compilerOptions).useDefineForClassFields) !== null && _useDefineForClassFields2 !== void 0 ? _useDefineForClassFields2 : _compilerOptions9.useDefineForClassFields = true;
    }
    if (module2 === "node16") {
      var _compilerOptions10, _compilerOptions11;
      var _target;
      (_target = (_compilerOptions10 = compilerOptions).target) !== null && _target !== void 0 ? _target : _compilerOptions10.target = "es2022";
      var _moduleResolution1;
      (_moduleResolution1 = (_compilerOptions11 = compilerOptions).moduleResolution) !== null && _moduleResolution1 !== void 0 ? _moduleResolution1 : _compilerOptions11.moduleResolution = "node16";
    }
    if (module2 === "nodenext") {
      var _compilerOptions12, _compilerOptions13;
      var _target1;
      (_target1 = (_compilerOptions12 = compilerOptions).target) !== null && _target1 !== void 0 ? _target1 : _compilerOptions12.target = "esnext";
      var _moduleResolution2;
      (_moduleResolution2 = (_compilerOptions13 = compilerOptions).moduleResolution) !== null && _moduleResolution2 !== void 0 ? _moduleResolution2 : _compilerOptions13.moduleResolution = "nodenext";
    }
    if (module2 === "preserve") {
      var _compilerOptions14;
      var _moduleResolution3;
      (_moduleResolution3 = (_compilerOptions14 = compilerOptions).moduleResolution) !== null && _moduleResolution3 !== void 0 ? _moduleResolution3 : _compilerOptions14.moduleResolution = "bundler";
    }
  }
  if (compilerOptions.moduleResolution) {
    var moduleResolution = compilerOptions.moduleResolution.toLowerCase();
    if (moduleResolution === "node") {
      moduleResolution = "node10";
    }
    compilerOptions.moduleResolution = moduleResolution;
    if (moduleResolution === "node16" || moduleResolution === "nodenext" || moduleResolution === "bundler") {
      var _compilerOptions15, _compilerOptions16;
      var _resolvePackageJsonExports;
      (_resolvePackageJsonExports = (_compilerOptions15 = compilerOptions).resolvePackageJsonExports) !== null && _resolvePackageJsonExports !== void 0 ? _resolvePackageJsonExports : _compilerOptions15.resolvePackageJsonExports = true;
      var _resolvePackageJsonImports;
      (_resolvePackageJsonImports = (_compilerOptions16 = compilerOptions).resolvePackageJsonImports) !== null && _resolvePackageJsonImports !== void 0 ? _resolvePackageJsonImports : _compilerOptions16.resolvePackageJsonImports = true;
    }
    if (moduleResolution === "bundler") {
      var _compilerOptions17, _compilerOptions18;
      var _allowSyntheticDefaultImports2;
      (_allowSyntheticDefaultImports2 = (_compilerOptions17 = compilerOptions).allowSyntheticDefaultImports) !== null && _allowSyntheticDefaultImports2 !== void 0 ? _allowSyntheticDefaultImports2 : _compilerOptions17.allowSyntheticDefaultImports = true;
      var _resolveJsonModule;
      (_resolveJsonModule = (_compilerOptions18 = compilerOptions).resolveJsonModule) !== null && _resolveJsonModule !== void 0 ? _resolveJsonModule : _compilerOptions18.resolveJsonModule = true;
    }
  }
  if (compilerOptions.esModuleInterop) {
    var _compilerOptions19;
    var _allowSyntheticDefaultImports3;
    (_allowSyntheticDefaultImports3 = (_compilerOptions19 = compilerOptions).allowSyntheticDefaultImports) !== null && _allowSyntheticDefaultImports3 !== void 0 ? _allowSyntheticDefaultImports3 : _compilerOptions19.allowSyntheticDefaultImports = true;
  }
  if (compilerOptions.verbatimModuleSyntax) {
    var _compilerOptions20, _compilerOptions21;
    var _isolatedModules;
    (_isolatedModules = (_compilerOptions20 = compilerOptions).isolatedModules) !== null && _isolatedModules !== void 0 ? _isolatedModules : _compilerOptions20.isolatedModules = true;
    var _preserveConstEnums;
    (_preserveConstEnums = (_compilerOptions21 = compilerOptions).preserveConstEnums) !== null && _preserveConstEnums !== void 0 ? _preserveConstEnums : _compilerOptions21.preserveConstEnums = true;
  }
  if (compilerOptions.isolatedModules) {
    var _compilerOptions22;
    var _preserveConstEnums1;
    (_preserveConstEnums1 = (_compilerOptions22 = compilerOptions).preserveConstEnums) !== null && _preserveConstEnums1 !== void 0 ? _preserveConstEnums1 : _compilerOptions22.preserveConstEnums = true;
  }
};
var parseTsconfig = function(tsconfigPath) {
  var cache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Map();
  var resolvedTsconfigPath = import_node_path3.default.resolve(tsconfigPath);
  var config = _parseTsconfig(resolvedTsconfigPath, cache);
  var configDir = import_node_path3.default.dirname(resolvedTsconfigPath);
  var compilerOptions = config.compilerOptions;
  if (compilerOptions) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = compilerFieldsWithConfigDir[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var property = _step.value;
        var value = compilerOptions[property];
        if (value) {
          var resolvedPath = interpolateConfigDir(value, configDir);
          compilerOptions[property] = resolvedPath ? pathRelative(configDir, resolvedPath) : value;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    for (var _i = 0, _iter = [
      "rootDirs",
      "typeRoots"
    ]; _i < _iter.length; _i++) {
      var property1 = _iter[_i];
      var value1 = compilerOptions[property1];
      if (value1) {
        compilerOptions[property1] = value1.map(function(v2) {
          var resolvedPath2 = interpolateConfigDir(v2, configDir);
          return resolvedPath2 ? pathRelative(configDir, resolvedPath2) : v2;
        });
      }
    }
    var paths = compilerOptions.paths;
    if (paths) {
      var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
      try {
        for (var _iterator1 = Object.keys(paths)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
          var name = _step1.value;
          paths[name] = paths[name].map(function(filePath) {
            var _interpolateConfigDir;
            return (_interpolateConfigDir = interpolateConfigDir(filePath, configDir)) !== null && _interpolateConfigDir !== void 0 ? _interpolateConfigDir : filePath;
          });
        }
      } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
            _iterator1.return();
          }
        } finally {
          if (_didIteratorError1) {
            throw _iteratorError1;
          }
        }
      }
    }
    normalizeCompilerOptions(compilerOptions);
  }
  var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = void 0;
  try {
    for (var _iterator2 = filesProperties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var property2 = _step2.value;
      var value2 = config[property2];
      if (value2) {
        config[property2] = value2.map(function(filePath) {
          var _interpolateConfigDir;
          return (_interpolateConfigDir = interpolateConfigDir(filePath, configDir)) !== null && _interpolateConfigDir !== void 0 ? _interpolateConfigDir : filePath;
        });
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
  return config;
};

// get-tsconfig/src/get-tsconfig.ts
var getTsconfig = function() {
  var searchPath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : process.cwd(), configName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "tsconfig.json", cache = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new Map();
  var configFile = findUp((0, import_slash3.default)(searchPath), configName, cache);
  if (!configFile) {
    return null;
  }
  var config = parseTsconfig(configFile, cache);
  return {
    path: configFile,
    config: config
  };
};

// get-tsconfig/src/paths-matcher/index.ts
var import_node_path4 = __toESM(require("path"), 1);
var import_slash4 = __toESM(require_slash(), 1);

// get-tsconfig/src/paths-matcher/utils.ts
var starPattern = /\*/g;
var assertStarCount = function(pattern, errorMessage) {
  var starCount = pattern.match(starPattern);
  if (starCount && starCount.length > 1) {
    throw new Error(errorMessage);
  }
};
var parsePattern = function(pattern) {
  if (pattern.includes("*")) {
    var _pattern_split = _sliced_to_array(pattern.split("*"), 2), prefix = _pattern_split[0], suffix = _pattern_split[1];
    return {
      prefix: prefix,
      suffix: suffix
    };
  }
  return pattern;
};
var isPatternMatch = function(param, candidate) {
  var prefix = param.prefix, suffix = param.suffix;
  return candidate.startsWith(prefix) && candidate.endsWith(suffix);
};

// get-tsconfig/src/paths-matcher/index.ts
var parsePaths = function(paths, baseUrl, absoluteBaseUrl) {
  return Object.entries(paths).map(function(param) {
    var _param = _sliced_to_array(param, 2), pattern = _param[0], substitutions = _param[1];
    assertStarCount(pattern, "Pattern '".concat(pattern, "' can have at most one '*' character."));
    return {
      pattern: parsePattern(pattern),
      substitutions: substitutions.map(function(substitution) {
        assertStarCount(substitution, "Substitution '".concat(substitution, "' in pattern '").concat(pattern, "' can have at most one '*' character."));
        if (!baseUrl && !isRelativePathPattern.test(substitution)) {
          throw new Error("Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?");
        }
        return import_node_path4.default.resolve(absoluteBaseUrl, substitution);
      })
    };
  });
};
var createPathsMatcher = function(tsconfig) {
  var compilerOptions = tsconfig.config.compilerOptions;
  if (!compilerOptions) {
    return null;
  }
  var baseUrl = compilerOptions.baseUrl, paths = compilerOptions.paths;
  if (!baseUrl && !paths) {
    return null;
  }
  var implicitBaseUrl = implicitBaseUrlSymbol in compilerOptions && compilerOptions[implicitBaseUrlSymbol];
  var resolvedBaseUrl = import_node_path4.default.resolve(import_node_path4.default.dirname(tsconfig.path), baseUrl || implicitBaseUrl || ".");
  var pathEntries = paths ? parsePaths(paths, baseUrl, resolvedBaseUrl) : [];
  return function(specifier) {
    if (isRelativePathPattern.test(specifier)) {
      return [];
    }
    var patternPathEntries = [];
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = pathEntries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var pathEntry = _step.value;
        if (pathEntry.pattern === specifier) {
          return pathEntry.substitutions.map(import_slash4.default);
        }
        if (typeof pathEntry.pattern !== "string") {
          patternPathEntries.push(pathEntry);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    var matchedValue;
    var longestMatchPrefixLength = -1;
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
    try {
      for (var _iterator1 = patternPathEntries[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
        var pathEntry1 = _step1.value;
        if (isPatternMatch(pathEntry1.pattern, specifier) && pathEntry1.pattern.prefix.length > longestMatchPrefixLength) {
          longestMatchPrefixLength = pathEntry1.pattern.prefix.length;
          matchedValue = pathEntry1;
        }
      }
    } catch (err) {
      _didIteratorError1 = true;
      _iteratorError1 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
          _iterator1.return();
        }
      } finally {
        if (_didIteratorError1) {
          throw _iteratorError1;
        }
      }
    }
    if (!matchedValue) {
      return baseUrl ? [
        (0, import_slash4.default)(import_node_path4.default.join(resolvedBaseUrl, specifier))
      ] : [];
    }
    var matchedPath = specifier.slice(matchedValue.pattern.prefix.length, specifier.length - matchedValue.pattern.suffix.length);
    return matchedValue.substitutions.map(function(substitution) {
      return (0, import_slash4.default)(substitution.replace("*", matchedPath));
    });
  };
};

// node_modules/@swc/helpers/esm/_tagged_template_literal.js
function _tagged_template_literal(strings, raw) {
  if (!raw) raw = strings.slice(0);
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

// node_modules/@swc/helpers/esm/_array_without_holes.js
function _array_without_holes(arr) {
  if (Array.isArray(arr)) return _array_like_to_array(arr);
}

// node_modules/@swc/helpers/esm/_non_iterable_spread.js
function _non_iterable_spread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@swc/helpers/esm/_to_consumable_array.js
function _to_consumable_array(arr) {
  return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}

// get-tsconfig/src/files-matcher.ts
var import_node_path5 = __toESM(require("path"), 1);
var import_slash5 = __toESM(require_slash(), 1);

// node_modules/is-fs-case-sensitive/dist/index.mjs
var import_fs = __toESM(require("fs"), 1);
var s2 = function(e) {
  var o = "";
  for (var t = 0; t < e.length; t += 1) {
    var r = e[t], n = r.toUpperCase();
    o += r === n ? r.toLowerCase() : n;
  }
  return o;
};
var c = 65;
var a2 = 97;
var m2 = function() {
  return Math.floor(Math.random() * 26);
};
var S = function(e) {
  return Array.from({
    length: e
  }, function() {
    return String.fromCodePoint(m2() + (Math.random() > 0.5 ? c : a2));
  }).join("");
};
var l = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : import_fs.default;
  var o = process.execPath;
  if (e.existsSync(o)) return !e.existsSync(s2(o));
  var t = "/".concat(S(10));
  e.writeFileSync(t, "");
  var r = !e.existsSync(s2(t));
  return e.unlinkSync(t), r;
};

// get-tsconfig/src/files-matcher.ts
function _templateObject() {
  var data = _tagged_template_literal([
    "$&"
  ], [
    "\\$&"
  ]);
  _templateObject = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject1() {
  var data = _tagged_template_literal([
    "**/"
  ], [
    "\\*\\*/"
  ]);
  _templateObject1 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _tagged_template_literal([
    "*"
  ], [
    "\\*"
  ]);
  _templateObject2 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _tagged_template_literal([
    "?"
  ], [
    "\\?"
  ]);
  _templateObject3 = function _templateObject5() {
    return data;
  };
  return data;
}
function _templateObject4() {
  var data = _tagged_template_literal([
    "/**"
  ], [
    "/\\*\\*"
  ]);
  _templateObject4 = function _templateObject5() {
    return data;
  };
  return data;
}
var _path_posix = import_node_path5.default.posix;
var pathJoin = _path_posix.join;
var baseExtensions = {
  ts: [
    ".ts",
    ".tsx",
    ".d.ts"
  ],
  cts: [
    ".cts",
    ".d.cts"
  ],
  mts: [
    ".mts",
    ".d.mts"
  ]
};
var getSupportedExtensions = function(compilerOptions) {
  var ts = _to_consumable_array(baseExtensions.ts);
  var cts = _to_consumable_array(baseExtensions.cts);
  var mts = _to_consumable_array(baseExtensions.mts);
  if (compilerOptions === null || compilerOptions === void 0 ? void 0 : compilerOptions.allowJs) {
    ts.push(".js", ".jsx");
    cts.push(".cjs");
    mts.push(".mjs");
  }
  return _to_consumable_array(ts).concat(_to_consumable_array(cts), _to_consumable_array(mts));
};
var getDefaultExcludeSpec = function(compilerOptions) {
  var excludesSpec = [];
  if (!compilerOptions) {
    return excludesSpec;
  }
  var outDir = compilerOptions.outDir, declarationDir = compilerOptions.declarationDir;
  if (outDir) {
    excludesSpec.push(outDir);
  }
  if (declarationDir) {
    excludesSpec.push(declarationDir);
  }
  return excludesSpec;
};
var escapeForRegexp = function(string) {
  return string.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw(_templateObject()));
};
var dependencyDirectories = [
  "node_modules",
  "bower_components",
  "jspm_packages"
];
var implicitExcludePathRegexPattern = "(?!(".concat(dependencyDirectories.join("|"), ")(/|$))");
var isImplicitGlobPattern = /(?:^|\/)[^.*?]+$/;
var matchAllGlob = "**/*";
var anyCharacter = "[^/]";
var noPeriodOrSlash = "[^./]";
var isWindows = process.platform === "win32";
var createFilesMatcher = function(param) {
  var config = param.config, tsconfigPath = param.path, caseSensitivePaths = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : l();
  if ("extends" in config) {
    throw new Error("tsconfig#extends must be resolved. Use getTsconfig or parseTsconfig to resolve it.");
  }
  if (!import_node_path5.default.isAbsolute(tsconfigPath)) {
    throw new Error("The tsconfig path must be absolute");
  }
  if (isWindows) {
    tsconfigPath = (0, import_slash5.default)(tsconfigPath);
  }
  var projectDirectory = import_node_path5.default.dirname(tsconfigPath);
  var files = config.files, include = config.include, exclude = config.exclude, compilerOptions = config.compilerOptions;
  var filesList = files === null || files === void 0 ? void 0 : files.map(function(file) {
    return pathJoin(projectDirectory, file);
  });
  var extensions = getSupportedExtensions(compilerOptions);
  var regexpFlags = caseSensitivePaths ? "" : "i";
  var excludeSpec = exclude || getDefaultExcludeSpec(compilerOptions);
  var excludePatterns = excludeSpec.map(function(filePath) {
    var projectFilePath = pathJoin(projectDirectory, filePath);
    var projectFilePathPattern = escapeForRegexp(projectFilePath).replaceAll(String.raw(_templateObject1()), "(.+/)?").replaceAll(String.raw(_templateObject2()), "".concat(anyCharacter, "*")).replaceAll(String.raw(_templateObject3()), anyCharacter);
    return new RegExp("^".concat(projectFilePathPattern, "($|/)"), regexpFlags);
  });
  var includeSpec = files || include ? include : [
    matchAllGlob
  ];
  var includePatterns = includeSpec ? includeSpec.map(function(filePath) {
    var projectFilePath = pathJoin(projectDirectory, filePath);
    if (isImplicitGlobPattern.test(projectFilePath)) {
      projectFilePath = pathJoin(projectFilePath, matchAllGlob);
    }
    var projectFilePathPattern = escapeForRegexp(projectFilePath).replaceAll(String.raw(_templateObject4()), "(/".concat(implicitExcludePathRegexPattern).concat(noPeriodOrSlash).concat(anyCharacter, "*)*?")).replaceAll(/(\/)?\\\*/g, function(_2, hasSlash) {
      var pattern = "(".concat(noPeriodOrSlash, "|(\\.(?!min\\.js$))?)*");
      if (hasSlash) {
        return "/".concat(implicitExcludePathRegexPattern).concat(noPeriodOrSlash).concat(pattern);
      }
      return pattern;
    }).replaceAll(/(\/)?\\\?/g, function(_2, hasSlash) {
      var pattern = anyCharacter;
      if (hasSlash) {
        return "/".concat(implicitExcludePathRegexPattern).concat(pattern);
      }
      return pattern;
    });
    return new RegExp("^".concat(projectFilePathPattern, "$"), regexpFlags);
  }) : void 0;
  return function(filePath) {
    if (!import_node_path5.default.isAbsolute(filePath)) {
      throw new Error("filePath must be absolute");
    }
    if (isWindows) {
      filePath = (0, import_slash5.default)(filePath);
    }
    if (filesList === null || filesList === void 0 ? void 0 : filesList.includes(filePath)) {
      return config;
    }
    if (
      // Invalid extension (case sensitive)
      !extensions.some(function(extension) {
        return filePath.endsWith(extension);
      }) || excludePatterns.some(function(pattern) {
        return pattern.test(filePath);
      })
    ) {
      return;
    }
    if (includePatterns && includePatterns.some(function(pattern) {
      return pattern.test(filePath);
    })) {
      return config;
    }
  };
};

// Annotate the CommonJS export names for ESM import in 
0 && (module.exports = {
  createFilesMatcher: createFilesMatcher,
  createPathsMatcher: createFilesMatcher,
  getTsconfig: getTsconfig,
  parseTsconfig: parseTsconfig
});

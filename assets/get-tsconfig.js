'use strict';

var path = require('path');
var fs = require('fs');
var Module = require('module');

function slash(path) {
    var isExtendedLengthPath = path.startsWith('\\\\?\\');
    if (isExtendedLengthPath) {
        return path;
    }
    return path.replace(/\\/g, '/');
}

var cacheFs = function(name) {
    var method = fs[name];
    return function(cache) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        var cacheKey = "".concat(name, ":").concat(args.join(':'));
        var result = cache === null || cache === void 0 ? void 0 : cache.get(cacheKey);
        if (result === undefined) {
            result = Reflect.apply(method, fs, args);
            cache === null || cache === void 0 ? void 0 : cache.set(cacheKey, result);
        }
        return result;
    };
};
var exists = cacheFs('existsSync');
var readFile = cacheFs('readFileSync');
var stat = cacheFs('statSync');

var findUp = function(searchPath, fileName, cache) {
    while(true){
        var configPath = path.posix.join(searchPath, fileName);
        if (exists(cache, configPath)) {
            return configPath;
        }
        var parentPath = path.dirname(searchPath);
        if (parentPath === searchPath) {
            return;
        }
        searchPath = parentPath;
    }
};

// Only works on POSIX paths. Apply `slash` first.
var isRelativePathPattern = /^\.{1,2}(\/.*)?$/;

var normalizeRelativePath = function(filePath) {
    var normalizedPath = slash(filePath);
    return isRelativePathPattern.test(normalizedPath) ? normalizedPath : "./".concat(normalizedPath);
};

/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */ function createScanner(text) {
    var ignoreTrivia = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var len = text.length;
    var pos = 0, value = '', tokenOffset = 0, token = 16 /* SyntaxKind.Unknown */ , lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0 /* ScanError.None */ ;
    function scanHexDigits(count, exact) {
        var digits = 0;
        var value = 0;
        while(digits < count || !exact){
            var ch = text.charCodeAt(pos);
            if (ch >= 48 /* CharacterCodes._0 */  && ch <= 57 /* CharacterCodes._9 */ ) {
                value = value * 16 + ch - 48 /* CharacterCodes._0 */ ;
            } else if (ch >= 65 /* CharacterCodes.A */  && ch <= 70 /* CharacterCodes.F */ ) {
                value = value * 16 + ch - 65 /* CharacterCodes.A */  + 10;
            } else if (ch >= 97 /* CharacterCodes.a */  && ch <= 102 /* CharacterCodes.f */ ) {
                value = value * 16 + ch - 97 /* CharacterCodes.a */  + 10;
            } else {
                break;
            }
            pos++;
            digits++;
        }
        if (digits < count) {
            value = -1;
        }
        return value;
    }
    function setPosition(newPosition) {
        pos = newPosition;
        value = '';
        tokenOffset = 0;
        token = 16 /* SyntaxKind.Unknown */ ;
        scanError = 0 /* ScanError.None */ ;
    }
    function scanNumber() {
        var start = pos;
        if (text.charCodeAt(pos) === 48 /* CharacterCodes._0 */ ) {
            pos++;
        } else {
            pos++;
            while(pos < text.length && isDigit(text.charCodeAt(pos))){
                pos++;
            }
        }
        if (pos < text.length && text.charCodeAt(pos) === 46 /* CharacterCodes.dot */ ) {
            pos++;
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while(pos < text.length && isDigit(text.charCodeAt(pos))){
                    pos++;
                }
            } else {
                scanError = 3 /* ScanError.UnexpectedEndOfNumber */ ;
                return text.substring(start, pos);
            }
        }
        var end = pos;
        if (pos < text.length && (text.charCodeAt(pos) === 69 /* CharacterCodes.E */  || text.charCodeAt(pos) === 101 /* CharacterCodes.e */ )) {
            pos++;
            if (pos < text.length && text.charCodeAt(pos) === 43 /* CharacterCodes.plus */  || text.charCodeAt(pos) === 45 /* CharacterCodes.minus */ ) {
                pos++;
            }
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while(pos < text.length && isDigit(text.charCodeAt(pos))){
                    pos++;
                }
                end = pos;
            } else {
                scanError = 3 /* ScanError.UnexpectedEndOfNumber */ ;
            }
        }
        return text.substring(start, end);
    }
    function scanString() {
        var result = '', start = pos;
        while(true){
            if (pos >= len) {
                result += text.substring(start, pos);
                scanError = 2 /* ScanError.UnexpectedEndOfString */ ;
                break;
            }
            var ch = text.charCodeAt(pos);
            if (ch === 34 /* CharacterCodes.doubleQuote */ ) {
                result += text.substring(start, pos);
                pos++;
                break;
            }
            if (ch === 92 /* CharacterCodes.backslash */ ) {
                result += text.substring(start, pos);
                pos++;
                if (pos >= len) {
                    scanError = 2 /* ScanError.UnexpectedEndOfString */ ;
                    break;
                }
                var ch2 = text.charCodeAt(pos++);
                switch(ch2){
                    case 34 /* CharacterCodes.doubleQuote */ :
                        result += '\"';
                        break;
                    case 92 /* CharacterCodes.backslash */ :
                        result += '\\';
                        break;
                    case 47 /* CharacterCodes.slash */ :
                        result += '/';
                        break;
                    case 98 /* CharacterCodes.b */ :
                        result += '\b';
                        break;
                    case 102 /* CharacterCodes.f */ :
                        result += '\f';
                        break;
                    case 110 /* CharacterCodes.n */ :
                        result += '\n';
                        break;
                    case 114 /* CharacterCodes.r */ :
                        result += '\r';
                        break;
                    case 116 /* CharacterCodes.t */ :
                        result += '\t';
                        break;
                    case 117 /* CharacterCodes.u */ :
                        var ch3 = scanHexDigits(4, true);
                        if (ch3 >= 0) {
                            result += String.fromCharCode(ch3);
                        } else {
                            scanError = 4 /* ScanError.InvalidUnicode */ ;
                        }
                        break;
                    default:
                        scanError = 5 /* ScanError.InvalidEscapeCharacter */ ;
                }
                start = pos;
                continue;
            }
            if (ch >= 0 && ch <= 0x1f) {
                if (isLineBreak(ch)) {
                    result += text.substring(start, pos);
                    scanError = 2 /* ScanError.UnexpectedEndOfString */ ;
                    break;
                } else {
                    scanError = 6 /* ScanError.InvalidCharacter */ ;
                // mark as error but continue with string
                }
            }
            pos++;
        }
        return result;
    }
    function scanNext() {
        value = '';
        scanError = 0 /* ScanError.None */ ;
        tokenOffset = pos;
        lineStartOffset = lineNumber;
        prevTokenLineStartOffset = tokenLineStartOffset;
        if (pos >= len) {
            // at the end
            tokenOffset = len;
            return token = 17 /* SyntaxKind.EOF */ ;
        }
        var code = text.charCodeAt(pos);
        // trivia: whitespace
        if (isWhiteSpace(code)) {
            do {
                pos++;
                value += String.fromCharCode(code);
                code = text.charCodeAt(pos);
            }while (isWhiteSpace(code));
            return token = 15 /* SyntaxKind.Trivia */ ;
        }
        // trivia: newlines
        if (isLineBreak(code)) {
            pos++;
            value += String.fromCharCode(code);
            if (code === 13 /* CharacterCodes.carriageReturn */  && text.charCodeAt(pos) === 10 /* CharacterCodes.lineFeed */ ) {
                pos++;
                value += '\n';
            }
            lineNumber++;
            tokenLineStartOffset = pos;
            return token = 14 /* SyntaxKind.LineBreakTrivia */ ;
        }
        switch(code){
            // tokens: []{}:,
            case 123 /* CharacterCodes.openBrace */ :
                pos++;
                return token = 1 /* SyntaxKind.OpenBraceToken */ ;
            case 125 /* CharacterCodes.closeBrace */ :
                pos++;
                return token = 2 /* SyntaxKind.CloseBraceToken */ ;
            case 91 /* CharacterCodes.openBracket */ :
                pos++;
                return token = 3 /* SyntaxKind.OpenBracketToken */ ;
            case 93 /* CharacterCodes.closeBracket */ :
                pos++;
                return token = 4 /* SyntaxKind.CloseBracketToken */ ;
            case 58 /* CharacterCodes.colon */ :
                pos++;
                return token = 6 /* SyntaxKind.ColonToken */ ;
            case 44 /* CharacterCodes.comma */ :
                pos++;
                return token = 5 /* SyntaxKind.CommaToken */ ;
            // strings
            case 34 /* CharacterCodes.doubleQuote */ :
                pos++;
                value = scanString();
                return token = 10 /* SyntaxKind.StringLiteral */ ;
            // comments
            case 47 /* CharacterCodes.slash */ :
                var start = pos - 1;
                // Single-line comment
                if (text.charCodeAt(pos + 1) === 47 /* CharacterCodes.slash */ ) {
                    pos += 2;
                    while(pos < len){
                        if (isLineBreak(text.charCodeAt(pos))) {
                            break;
                        }
                        pos++;
                    }
                    value = text.substring(start, pos);
                    return token = 12 /* SyntaxKind.LineCommentTrivia */ ;
                }
                // Multi-line comment
                if (text.charCodeAt(pos + 1) === 42 /* CharacterCodes.asterisk */ ) {
                    pos += 2;
                    var safeLength = len - 1; // For lookahead.
                    var commentClosed = false;
                    while(pos < safeLength){
                        var ch = text.charCodeAt(pos);
                        if (ch === 42 /* CharacterCodes.asterisk */  && text.charCodeAt(pos + 1) === 47 /* CharacterCodes.slash */ ) {
                            pos += 2;
                            commentClosed = true;
                            break;
                        }
                        pos++;
                        if (isLineBreak(ch)) {
                            if (ch === 13 /* CharacterCodes.carriageReturn */  && text.charCodeAt(pos) === 10 /* CharacterCodes.lineFeed */ ) {
                                pos++;
                            }
                            lineNumber++;
                            tokenLineStartOffset = pos;
                        }
                    }
                    if (!commentClosed) {
                        pos++;
                        scanError = 1 /* ScanError.UnexpectedEndOfComment */ ;
                    }
                    value = text.substring(start, pos);
                    return token = 13 /* SyntaxKind.BlockCommentTrivia */ ;
                }
                // just a single slash
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* SyntaxKind.Unknown */ ;
            // numbers
            case 45 /* CharacterCodes.minus */ :
                value += String.fromCharCode(code);
                pos++;
                if (pos === len || !isDigit(text.charCodeAt(pos))) {
                    return token = 16 /* SyntaxKind.Unknown */ ;
                }
            // found a minus, followed by a number so
            // we fall through to proceed with scanning
            // numbers
            case 48 /* CharacterCodes._0 */ :
            case 49 /* CharacterCodes._1 */ :
            case 50 /* CharacterCodes._2 */ :
            case 51 /* CharacterCodes._3 */ :
            case 52 /* CharacterCodes._4 */ :
            case 53 /* CharacterCodes._5 */ :
            case 54 /* CharacterCodes._6 */ :
            case 55 /* CharacterCodes._7 */ :
            case 56 /* CharacterCodes._8 */ :
            case 57 /* CharacterCodes._9 */ :
                value += scanNumber();
                return token = 11 /* SyntaxKind.NumericLiteral */ ;
            // literals and unknown symbols
            default:
                // is a literal? Read the full word.
                while(pos < len && isUnknownContentCharacter(code)){
                    pos++;
                    code = text.charCodeAt(pos);
                }
                if (tokenOffset !== pos) {
                    value = text.substring(tokenOffset, pos);
                    // keywords: true, false, null
                    switch(value){
                        case 'true':
                            return token = 8 /* SyntaxKind.TrueKeyword */ ;
                        case 'false':
                            return token = 9 /* SyntaxKind.FalseKeyword */ ;
                        case 'null':
                            return token = 7 /* SyntaxKind.NullKeyword */ ;
                    }
                    return token = 16 /* SyntaxKind.Unknown */ ;
                }
                // some
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* SyntaxKind.Unknown */ ;
        }
    }
    function isUnknownContentCharacter(code) {
        if (isWhiteSpace(code) || isLineBreak(code)) {
            return false;
        }
        switch(code){
            case 125 /* CharacterCodes.closeBrace */ :
            case 93 /* CharacterCodes.closeBracket */ :
            case 123 /* CharacterCodes.openBrace */ :
            case 91 /* CharacterCodes.openBracket */ :
            case 34 /* CharacterCodes.doubleQuote */ :
            case 58 /* CharacterCodes.colon */ :
            case 44 /* CharacterCodes.comma */ :
            case 47 /* CharacterCodes.slash */ :
                return false;
        }
        return true;
    }
    function scanNextNonTrivia() {
        var result;
        do {
            result = scanNext();
        }while (result >= 12 /* SyntaxKind.LineCommentTrivia */  && result <= 15 /* SyntaxKind.Trivia */ );
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
    return ch === 32 /* CharacterCodes.space */  || ch === 9 /* CharacterCodes.tab */ ;
}
function isLineBreak(ch) {
    return ch === 10 /* CharacterCodes.lineFeed */  || ch === 13 /* CharacterCodes.carriageReturn */ ;
}
function isDigit(ch) {
    return ch >= 48 /* CharacterCodes._0 */  && ch <= 57 /* CharacterCodes._9 */ ;
}
var CharacterCodes;
(function(CharacterCodes) {
    CharacterCodes[CharacterCodes["lineFeed"] = 10] = "lineFeed";
    CharacterCodes[CharacterCodes["carriageReturn"] = 13] = "carriageReturn";
    CharacterCodes[CharacterCodes["space"] = 32] = "space";
    CharacterCodes[CharacterCodes["_0"] = 48] = "_0";
    CharacterCodes[CharacterCodes["_1"] = 49] = "_1";
    CharacterCodes[CharacterCodes["_2"] = 50] = "_2";
    CharacterCodes[CharacterCodes["_3"] = 51] = "_3";
    CharacterCodes[CharacterCodes["_4"] = 52] = "_4";
    CharacterCodes[CharacterCodes["_5"] = 53] = "_5";
    CharacterCodes[CharacterCodes["_6"] = 54] = "_6";
    CharacterCodes[CharacterCodes["_7"] = 55] = "_7";
    CharacterCodes[CharacterCodes["_8"] = 56] = "_8";
    CharacterCodes[CharacterCodes["_9"] = 57] = "_9";
    CharacterCodes[CharacterCodes["a"] = 97] = "a";
    CharacterCodes[CharacterCodes["b"] = 98] = "b";
    CharacterCodes[CharacterCodes["c"] = 99] = "c";
    CharacterCodes[CharacterCodes["d"] = 100] = "d";
    CharacterCodes[CharacterCodes["e"] = 101] = "e";
    CharacterCodes[CharacterCodes["f"] = 102] = "f";
    CharacterCodes[CharacterCodes["g"] = 103] = "g";
    CharacterCodes[CharacterCodes["h"] = 104] = "h";
    CharacterCodes[CharacterCodes["i"] = 105] = "i";
    CharacterCodes[CharacterCodes["j"] = 106] = "j";
    CharacterCodes[CharacterCodes["k"] = 107] = "k";
    CharacterCodes[CharacterCodes["l"] = 108] = "l";
    CharacterCodes[CharacterCodes["m"] = 109] = "m";
    CharacterCodes[CharacterCodes["n"] = 110] = "n";
    CharacterCodes[CharacterCodes["o"] = 111] = "o";
    CharacterCodes[CharacterCodes["p"] = 112] = "p";
    CharacterCodes[CharacterCodes["q"] = 113] = "q";
    CharacterCodes[CharacterCodes["r"] = 114] = "r";
    CharacterCodes[CharacterCodes["s"] = 115] = "s";
    CharacterCodes[CharacterCodes["t"] = 116] = "t";
    CharacterCodes[CharacterCodes["u"] = 117] = "u";
    CharacterCodes[CharacterCodes["v"] = 118] = "v";
    CharacterCodes[CharacterCodes["w"] = 119] = "w";
    CharacterCodes[CharacterCodes["x"] = 120] = "x";
    CharacterCodes[CharacterCodes["y"] = 121] = "y";
    CharacterCodes[CharacterCodes["z"] = 122] = "z";
    CharacterCodes[CharacterCodes["A"] = 65] = "A";
    CharacterCodes[CharacterCodes["B"] = 66] = "B";
    CharacterCodes[CharacterCodes["C"] = 67] = "C";
    CharacterCodes[CharacterCodes["D"] = 68] = "D";
    CharacterCodes[CharacterCodes["E"] = 69] = "E";
    CharacterCodes[CharacterCodes["F"] = 70] = "F";
    CharacterCodes[CharacterCodes["G"] = 71] = "G";
    CharacterCodes[CharacterCodes["H"] = 72] = "H";
    CharacterCodes[CharacterCodes["I"] = 73] = "I";
    CharacterCodes[CharacterCodes["J"] = 74] = "J";
    CharacterCodes[CharacterCodes["K"] = 75] = "K";
    CharacterCodes[CharacterCodes["L"] = 76] = "L";
    CharacterCodes[CharacterCodes["M"] = 77] = "M";
    CharacterCodes[CharacterCodes["N"] = 78] = "N";
    CharacterCodes[CharacterCodes["O"] = 79] = "O";
    CharacterCodes[CharacterCodes["P"] = 80] = "P";
    CharacterCodes[CharacterCodes["Q"] = 81] = "Q";
    CharacterCodes[CharacterCodes["R"] = 82] = "R";
    CharacterCodes[CharacterCodes["S"] = 83] = "S";
    CharacterCodes[CharacterCodes["T"] = 84] = "T";
    CharacterCodes[CharacterCodes["U"] = 85] = "U";
    CharacterCodes[CharacterCodes["V"] = 86] = "V";
    CharacterCodes[CharacterCodes["W"] = 87] = "W";
    CharacterCodes[CharacterCodes["X"] = 88] = "X";
    CharacterCodes[CharacterCodes["Y"] = 89] = "Y";
    CharacterCodes[CharacterCodes["Z"] = 90] = "Z";
    CharacterCodes[CharacterCodes["asterisk"] = 42] = "asterisk";
    CharacterCodes[CharacterCodes["backslash"] = 92] = "backslash";
    CharacterCodes[CharacterCodes["closeBrace"] = 125] = "closeBrace";
    CharacterCodes[CharacterCodes["closeBracket"] = 93] = "closeBracket";
    CharacterCodes[CharacterCodes["colon"] = 58] = "colon";
    CharacterCodes[CharacterCodes["comma"] = 44] = "comma";
    CharacterCodes[CharacterCodes["dot"] = 46] = "dot";
    CharacterCodes[CharacterCodes["doubleQuote"] = 34] = "doubleQuote";
    CharacterCodes[CharacterCodes["minus"] = 45] = "minus";
    CharacterCodes[CharacterCodes["openBrace"] = 123] = "openBrace";
    CharacterCodes[CharacterCodes["openBracket"] = 91] = "openBracket";
    CharacterCodes[CharacterCodes["plus"] = 43] = "plus";
    CharacterCodes[CharacterCodes["slash"] = 47] = "slash";
    CharacterCodes[CharacterCodes["formFeed"] = 12] = "formFeed";
    CharacterCodes[CharacterCodes["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));

new Array(20).fill(0).map(function(_, index) {
    return ' '.repeat(index);
});
var maxCachedValues = 200;
({
    ' ': {
        '\n': new Array(maxCachedValues).fill(0).map(function(_, index) {
            return '\n' + ' '.repeat(index);
        }),
        '\r': new Array(maxCachedValues).fill(0).map(function(_, index) {
            return '\r' + ' '.repeat(index);
        }),
        '\r\n': new Array(maxCachedValues).fill(0).map(function(_, index) {
            return '\r\n' + ' '.repeat(index);
        })
    },
    '\t': {
        '\n': new Array(maxCachedValues).fill(0).map(function(_, index) {
            return '\n' + '\t'.repeat(index);
        }),
        '\r': new Array(maxCachedValues).fill(0).map(function(_, index) {
            return '\r' + '\t'.repeat(index);
        }),
        '\r\n': new Array(maxCachedValues).fill(0).map(function(_, index) {
            return '\r\n' + '\t'.repeat(index);
        })
    }
});

var ParseOptions;
(function(ParseOptions) {
    ParseOptions.DEFAULT = {
        allowTrailingComma: false
    };
})(ParseOptions || (ParseOptions = {}));
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore always check the errors list to find out if the input was valid.
 */ function parse$1(text) {
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
/**
 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
 */ function visit(text, visitor) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ParseOptions.DEFAULT;
    var _scanner = createScanner(text, false);
    // Important: Only pass copies of this to visitor functions to prevent accidental modification, and
    // to not affect visitor functions which stored a reference to a previous JSONPath
    var _jsonPath = [];
    // Depth of onXXXBegin() callbacks suppressed. onXXXEnd() decrements this if it isn't 0 already.
    // Callbacks are only called when this value is 0.
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
        while(true){
            var token = _scanner.scan();
            switch(_scanner.getTokenError()){
                case 4 /* ScanError.InvalidUnicode */ :
                    handleError(14 /* ParseErrorCode.InvalidUnicode */ );
                    break;
                case 5 /* ScanError.InvalidEscapeCharacter */ :
                    handleError(15 /* ParseErrorCode.InvalidEscapeCharacter */ );
                    break;
                case 3 /* ScanError.UnexpectedEndOfNumber */ :
                    handleError(13 /* ParseErrorCode.UnexpectedEndOfNumber */ );
                    break;
                case 1 /* ScanError.UnexpectedEndOfComment */ :
                    if (!disallowComments) {
                        handleError(11 /* ParseErrorCode.UnexpectedEndOfComment */ );
                    }
                    break;
                case 2 /* ScanError.UnexpectedEndOfString */ :
                    handleError(12 /* ParseErrorCode.UnexpectedEndOfString */ );
                    break;
                case 6 /* ScanError.InvalidCharacter */ :
                    handleError(16 /* ParseErrorCode.InvalidCharacter */ );
                    break;
            }
            switch(token){
                case 12 /* SyntaxKind.LineCommentTrivia */ :
                case 13 /* SyntaxKind.BlockCommentTrivia */ :
                    if (disallowComments) {
                        handleError(10 /* ParseErrorCode.InvalidCommentToken */ );
                    } else {
                        onComment();
                    }
                    break;
                case 16 /* SyntaxKind.Unknown */ :
                    handleError(1 /* ParseErrorCode.InvalidSymbol */ );
                    break;
                case 15 /* SyntaxKind.Trivia */ :
                case 14 /* SyntaxKind.LineBreakTrivia */ :
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
            while(token !== 17 /* SyntaxKind.EOF */ ){
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
            // add property name afterwards
            _jsonPath.push(value);
        }
        scanNext();
        return true;
    }
    function parseLiteral() {
        switch(_scanner.getToken()){
            case 11 /* SyntaxKind.NumericLiteral */ :
                var tokenValue = _scanner.getTokenValue();
                var value = Number(tokenValue);
                if (isNaN(value)) {
                    handleError(2 /* ParseErrorCode.InvalidNumberFormat */ );
                    value = 0;
                }
                onLiteralValue(value);
                break;
            case 7 /* SyntaxKind.NullKeyword */ :
                onLiteralValue(null);
                break;
            case 8 /* SyntaxKind.TrueKeyword */ :
                onLiteralValue(true);
                break;
            case 9 /* SyntaxKind.FalseKeyword */ :
                onLiteralValue(false);
                break;
            default:
                return false;
        }
        scanNext();
        return true;
    }
    function parseProperty() {
        if (_scanner.getToken() !== 10 /* SyntaxKind.StringLiteral */ ) {
            handleError(3 /* ParseErrorCode.PropertyNameExpected */ , [], [
                2 /* SyntaxKind.CloseBraceToken */ ,
                5 /* SyntaxKind.CommaToken */ 
            ]);
            return false;
        }
        parseString(false);
        if (_scanner.getToken() === 6 /* SyntaxKind.ColonToken */ ) {
            onSeparator(':');
            scanNext(); // consume colon
            if (!parseValue()) {
                handleError(4 /* ParseErrorCode.ValueExpected */ , [], [
                    2 /* SyntaxKind.CloseBraceToken */ ,
                    5 /* SyntaxKind.CommaToken */ 
                ]);
            }
        } else {
            handleError(5 /* ParseErrorCode.ColonExpected */ , [], [
                2 /* SyntaxKind.CloseBraceToken */ ,
                5 /* SyntaxKind.CommaToken */ 
            ]);
        }
        _jsonPath.pop(); // remove processed property name
        return true;
    }
    function parseObject() {
        onObjectBegin();
        scanNext(); // consume open brace
        var needsComma = false;
        while(_scanner.getToken() !== 2 /* SyntaxKind.CloseBraceToken */  && _scanner.getToken() !== 17 /* SyntaxKind.EOF */ ){
            if (_scanner.getToken() === 5 /* SyntaxKind.CommaToken */ ) {
                if (!needsComma) {
                    handleError(4 /* ParseErrorCode.ValueExpected */ , [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 2 /* SyntaxKind.CloseBraceToken */  && allowTrailingComma) {
                    break;
                }
            } else if (needsComma) {
                handleError(6 /* ParseErrorCode.CommaExpected */ , [], []);
            }
            if (!parseProperty()) {
                handleError(4 /* ParseErrorCode.ValueExpected */ , [], [
                    2 /* SyntaxKind.CloseBraceToken */ ,
                    5 /* SyntaxKind.CommaToken */ 
                ]);
            }
            needsComma = true;
        }
        onObjectEnd();
        if (_scanner.getToken() !== 2 /* SyntaxKind.CloseBraceToken */ ) {
            handleError(7 /* ParseErrorCode.CloseBraceExpected */ , [
                2 /* SyntaxKind.CloseBraceToken */ 
            ], []);
        } else {
            scanNext(); // consume close brace
        }
        return true;
    }
    function parseArray() {
        onArrayBegin();
        scanNext(); // consume open bracket
        var isFirstElement = true;
        var needsComma = false;
        while(_scanner.getToken() !== 4 /* SyntaxKind.CloseBracketToken */  && _scanner.getToken() !== 17 /* SyntaxKind.EOF */ ){
            if (_scanner.getToken() === 5 /* SyntaxKind.CommaToken */ ) {
                if (!needsComma) {
                    handleError(4 /* ParseErrorCode.ValueExpected */ , [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 4 /* SyntaxKind.CloseBracketToken */  && allowTrailingComma) {
                    break;
                }
            } else if (needsComma) {
                handleError(6 /* ParseErrorCode.CommaExpected */ , [], []);
            }
            if (isFirstElement) {
                _jsonPath.push(0);
                isFirstElement = false;
            } else {
                _jsonPath[_jsonPath.length - 1]++;
            }
            if (!parseValue()) {
                handleError(4 /* ParseErrorCode.ValueExpected */ , [], [
                    4 /* SyntaxKind.CloseBracketToken */ ,
                    5 /* SyntaxKind.CommaToken */ 
                ]);
            }
            needsComma = true;
        }
        onArrayEnd();
        if (!isFirstElement) {
            _jsonPath.pop(); // remove array index
        }
        if (_scanner.getToken() !== 4 /* SyntaxKind.CloseBracketToken */ ) {
            handleError(8 /* ParseErrorCode.CloseBracketExpected */ , [
                4 /* SyntaxKind.CloseBracketToken */ 
            ], []);
        } else {
            scanNext(); // consume close bracket
        }
        return true;
    }
    function parseValue() {
        switch(_scanner.getToken()){
            case 3 /* SyntaxKind.OpenBracketToken */ :
                return parseArray();
            case 1 /* SyntaxKind.OpenBraceToken */ :
                return parseObject();
            case 10 /* SyntaxKind.StringLiteral */ :
                return parseString(true);
            default:
                return parseLiteral();
        }
    }
    scanNext();
    if (_scanner.getToken() === 17 /* SyntaxKind.EOF */ ) {
        if (options.allowEmptyContent) {
            return true;
        }
        handleError(4 /* ParseErrorCode.ValueExpected */ , [], []);
        return false;
    }
    if (!parseValue()) {
        handleError(4 /* ParseErrorCode.ValueExpected */ , [], []);
        return false;
    }
    if (_scanner.getToken() !== 17 /* SyntaxKind.EOF */ ) {
        handleError(9 /* ParseErrorCode.EndOfFileExpected */ , [], []);
    }
    return true;
}

var ScanError;
(function(ScanError) {
    ScanError[ScanError["None"] = 0] = "None";
    ScanError[ScanError["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
    ScanError[ScanError["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
    ScanError[ScanError["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
    ScanError[ScanError["InvalidUnicode"] = 4] = "InvalidUnicode";
    ScanError[ScanError["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
    ScanError[ScanError["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind) {
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 1] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 2] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 3] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 4] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 5] = "CommaToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 6] = "ColonToken";
    SyntaxKind[SyntaxKind["NullKeyword"] = 7] = "NullKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 8] = "TrueKeyword";
    SyntaxKind[SyntaxKind["FalseKeyword"] = 9] = "FalseKeyword";
    SyntaxKind[SyntaxKind["StringLiteral"] = 10] = "StringLiteral";
    SyntaxKind[SyntaxKind["NumericLiteral"] = 11] = "NumericLiteral";
    SyntaxKind[SyntaxKind["LineCommentTrivia"] = 12] = "LineCommentTrivia";
    SyntaxKind[SyntaxKind["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
    SyntaxKind[SyntaxKind["LineBreakTrivia"] = 14] = "LineBreakTrivia";
    SyntaxKind[SyntaxKind["Trivia"] = 15] = "Trivia";
    SyntaxKind[SyntaxKind["Unknown"] = 16] = "Unknown";
    SyntaxKind[SyntaxKind["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore, always check the errors list to find out if the input was valid.
 */ var parse = parse$1;
var ParseErrorCode;
(function(ParseErrorCode) {
    ParseErrorCode[ParseErrorCode["InvalidSymbol"] = 1] = "InvalidSymbol";
    ParseErrorCode[ParseErrorCode["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
    ParseErrorCode[ParseErrorCode["PropertyNameExpected"] = 3] = "PropertyNameExpected";
    ParseErrorCode[ParseErrorCode["ValueExpected"] = 4] = "ValueExpected";
    ParseErrorCode[ParseErrorCode["ColonExpected"] = 5] = "ColonExpected";
    ParseErrorCode[ParseErrorCode["CommaExpected"] = 6] = "CommaExpected";
    ParseErrorCode[ParseErrorCode["CloseBraceExpected"] = 7] = "CloseBraceExpected";
    ParseErrorCode[ParseErrorCode["CloseBracketExpected"] = 8] = "CloseBracketExpected";
    ParseErrorCode[ParseErrorCode["EndOfFileExpected"] = 9] = "EndOfFileExpected";
    ParseErrorCode[ParseErrorCode["InvalidCommentToken"] = 10] = "InvalidCommentToken";
    ParseErrorCode[ParseErrorCode["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
    ParseErrorCode[ParseErrorCode["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
    ParseErrorCode[ParseErrorCode["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
    ParseErrorCode[ParseErrorCode["InvalidUnicode"] = 14] = "InvalidUnicode";
    ParseErrorCode[ParseErrorCode["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
    ParseErrorCode[ParseErrorCode["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));

var readJsonc = function(jsonPath, cache) {
    return parse(readFile(cache, jsonPath, 'utf8'));
};

/**
 * When a tsconfig extends another file with relative `paths` entries and the final tsconfig
 * doesn't have a `baseUrl` set, the relative paths are resolved relative to the tsconfig that
 * defined the `paths`
 *
 * However, this is impossible to compute from a flattened tsconfig, because we no longer know
 * the path of the tsconfig that defined the `paths` entry.
 *
 * This is why we store the implicit baseUrl in the flattened tsconfig, so that the pathsMatcher
 * can use it to resolve relative paths.
 */ var implicitBaseUrlSymbol = Symbol('implicitBaseUrl');
var configDirPlaceholder = '${configDir}';

function _array_like_to_array$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$3(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array$2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit$3(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$3(arr, i) {
    return _array_with_holes$3(arr) || _iterable_to_array_limit$3(arr, i) || _unsupported_iterable_to_array$4(arr, i) || _non_iterable_rest$3();
}
function _to_array$1(arr) {
    return _array_with_holes$3(arr) || _iterable_to_array$2(arr) || _unsupported_iterable_to_array$4(arr) || _non_iterable_rest$3();
}
function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$4(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$4(o, minLen);
}
var A = function(r) {
    return r !== null && (typeof r === "undefined" ? "undefined" : _type_of$1(r)) == "object";
}, a$1 = function(r, t) {
    return Object.assign(new Error("[".concat(r, "]: ").concat(t)), {
        code: r
    });
}, _ = "ERR_INVALID_PACKAGE_CONFIG", E = "ERR_INVALID_PACKAGE_TARGET", I = "ERR_PACKAGE_PATH_NOT_EXPORTED", R = /^\d+$/, O = /^(\.{1,2}|node_modules)$/i, w = /\/|\\/;
var h = function(r) {
    return r.Export = "exports", r.Import = "imports", r;
}(h || {});
var f = function(r, t, e, o, c) {
    if (t == null) return [];
    if (typeof t == "string") {
        var _t_split = _to_array$1(t.split(w)), n = _t_split[0], i = _t_split.slice(1);
        if (n === ".." || i.some(function(l) {
            return O.test(l);
        })) throw a$1(E, 'Invalid "'.concat(r, '" target "').concat(t, '" defined in the package config'));
        return [
            c ? t.replace(/\*/g, c) : t
        ];
    }
    if (Array.isArray(t)) return t.flatMap(function(n) {
        return f(r, n, e, o, c);
    });
    if (A(t)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = Object.keys(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var n1 = _step.value;
                if (R.test(n1)) throw a$1(_, "Cannot contain numeric property keys");
                if (n1 === "default" || o.includes(n1)) return f(r, t[n1], e, o, c);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return [];
    }
    throw a$1(E, 'Invalid "'.concat(r, '" target "').concat(t, '"'));
}, s$1 = "*", m$1 = function(r, t) {
    var e = r.indexOf(s$1), o = t.indexOf(s$1);
    return e === o ? t.length > r.length : o > e;
};
function d(r, t) {
    if (!t.includes(s$1) && r.hasOwnProperty(t)) return [
        t
    ];
    var e, o;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.keys(r)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var c = _step.value;
            if (c.includes(s$1)) {
                var _c_split = _sliced_to_array$3(c.split(s$1), 3), n = _c_split[0], i = _c_split[1], l = _c_split[2];
                if (l === void 0 && t.startsWith(n) && t.endsWith(i)) {
                    var g = t.slice(n.length, -i.length || void 0);
                    g && (!e || m$1(e, c)) && (e = c, o = g);
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
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
        throw a$1(_, '"exports" cannot contain some keys starting with "." and some not');
    }, void 0);
}, u = /^\w+:/, v = function(r, t, e) {
    if (!r) throw new Error('"exports" is required');
    t = t === "" ? "." : "./".concat(t), (typeof r == "string" || Array.isArray(r) || A(r) && p(r)) && (r = {
        ".": r
    });
    var _d = _sliced_to_array$3(d(r, t), 2), o = _d[0], c = _d[1], n = f(h.Export, r[o], t, e, c);
    if (n.length === 0) throw a$1(I, t === "." ? 'No "exports" main defined' : "Package subpath '".concat(t, '\' is not defined by "exports"'));
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = n[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var i = _step.value;
            if (!i.startsWith("./") && !u.test(i)) throw a$1(E, 'Invalid "exports" target "'.concat(i, '" defined in the package config'));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return n;
};

function _array_like_to_array$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$2(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit$2(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$2(arr, i) {
    return _array_with_holes$2(arr) || _iterable_to_array_limit$2(arr, i) || _unsupported_iterable_to_array$3(arr, i) || _non_iterable_rest$2();
}
function _to_array(arr) {
    return _array_with_holes$2(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$3(arr) || _non_iterable_rest$2();
}
function _unsupported_iterable_to_array$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$3(o, minLen);
}
var getPnpApi = function() {
    var findPnpApi = Module.findPnpApi;
    // https://yarnpkg.com/advanced/pnpapi/#requirepnpapi
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
    var resolvedPath = subpath || 'tsconfig.json';
    if (!ignoreExports && packageJson.exports) {
        try {
            var _resolveExports = _sliced_to_array$2(v(packageJson.exports, subpath, [
                'require',
                'types'
            ]), 1), resolvedExport = _resolveExports[0];
            resolvedPath = resolvedExport;
        } catch (e) {
            // Block
            return false;
        }
    } else if (!subpath && packageJson.tsconfig) {
        resolvedPath = packageJson.tsconfig;
    }
    resolvedPath = path.join(packageJsonPath, '..', resolvedPath);
    cache === null || cache === void 0 ? void 0 : cache.set(cacheKey, resolvedPath);
    return resolvedPath;
};
var PACKAGE_JSON = 'package.json';
var TS_CONFIG_JSON = 'tsconfig.json';
var resolveExtendsPath = function(requestedPath, directoryPath, cache) {
    var filePath = requestedPath;
    if (requestedPath === '..') {
        filePath = path.join(filePath, TS_CONFIG_JSON);
    }
    if (requestedPath[0] === '.') {
        filePath = path.resolve(directoryPath, filePath);
    }
    if (path.isAbsolute(filePath)) {
        if (exists(cache, filePath)) {
            if (stat(cache, filePath).isFile()) {
                return filePath;
            }
        } else if (!filePath.endsWith('.json')) {
            var jsonPath = "".concat(filePath, ".json");
            if (exists(cache, jsonPath)) {
                return jsonPath;
            }
        }
        return;
    }
    var _requestedPath_split = _to_array(requestedPath.split('/')), orgOrName = _requestedPath_split[0], remaining = _requestedPath_split.slice(1);
    var packageName = orgOrName[0] === '@' ? "".concat(orgOrName, "/").concat(remaining.shift()) : orgOrName;
    var subpath = remaining.join('/');
    var pnpApi = getPnpApi();
    if (pnpApi) {
        var resolveWithPnp = pnpApi.resolveRequest;
        try {
            if (packageName === requestedPath) {
                var packageJsonPath = resolveWithPnp(path.join(packageName, PACKAGE_JSON), directoryPath);
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
                            '.json'
                        ]
                    });
                } catch (e) {
                    resolved = resolveWithPnp(path.join(requestedPath, TS_CONFIG_JSON), directoryPath);
                }
                if (resolved) {
                    return resolved;
                }
            }
        } catch (e) {}
    }
    var packagePath = findUp(path.resolve(directoryPath), path.join('node_modules', packageName), cache);
    if (!packagePath || !stat(cache, packagePath).isDirectory()) {
        return;
    }
    var packageJsonPath1 = path.join(packagePath, PACKAGE_JSON);
    if (exists(cache, packageJsonPath1)) {
        var resolvedPath1 = resolveFromPackageJsonPath(packageJsonPath1, subpath, false, cache);
        // Blocked
        if (resolvedPath1 === false) {
            return;
        }
        if (resolvedPath1 && exists(cache, resolvedPath1) && stat(cache, resolvedPath1).isFile()) {
            return resolvedPath1;
        }
    }
    var fullPackagePath = path.join(packagePath, subpath);
    var jsonExtension = fullPackagePath.endsWith('.json');
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
        var fullPackageJsonPath = path.join(fullPackagePath, PACKAGE_JSON);
        if (exists(cache, fullPackageJsonPath)) {
            var resolvedPath2 = resolveFromPackageJsonPath(fullPackageJsonPath, '', true, cache);
            if (resolvedPath2 && exists(cache, resolvedPath2)) {
                return resolvedPath2;
            }
        }
        var tsconfigPath = path.join(fullPackagePath, TS_CONFIG_JSON);
        if (exists(cache, tsconfigPath)) {
            return tsconfigPath;
        }
    } else if (jsonExtension) {
        return fullPackagePath;
    }
};

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var pathRelative = function(from, to) {
    return normalizeRelativePath(path.relative(from, to));
};
var filesProperties = [
    'files',
    'include',
    'exclude'
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
    var extendsDirectoryPath = path.dirname(resolvedExtendsPath);
    var extendsConfig = _parseTsconfig(resolvedExtendsPath, cache, circularExtendsTracker);
    delete extendsConfig.references;
    var compilerOptions = extendsConfig.compilerOptions;
    if (compilerOptions) {
        var baseUrl = compilerOptions.baseUrl;
        if (baseUrl && !baseUrl.startsWith(configDirPlaceholder)) {
            compilerOptions.baseUrl = slash(path.relative(fromDirectoryPath, path.join(extendsDirectoryPath, baseUrl))) || './';
        }
        var outDir = compilerOptions.outDir;
        if (outDir) {
            if (!outDir.startsWith(configDirPlaceholder)) {
                outDir = path.relative(fromDirectoryPath, path.join(extendsDirectoryPath, outDir));
            }
            compilerOptions.outDir = slash(outDir) || './';
        }
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = filesProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var property = _step.value;
            var filesList = extendsConfig[property];
            if (filesList) {
                extendsConfig[property] = filesList.map(function(file) {
                    if (file.startsWith(configDirPlaceholder)) {
                        return file;
                    }
                    return slash(path.relative(fromDirectoryPath, path.join(extendsDirectoryPath, file)));
                });
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return extendsConfig;
};
var outputFields = [
    'outDir',
    'declarationDir'
];
var _parseTsconfig = function(tsconfigPath, cache) {
    var circularExtendsTracker = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new Set();
    /**
	 * Decided not to cache the TsConfigJsonResolved object because it's
	 * mutable.
	 *
	 * Note how `resolveExtends` can call `parseTsconfig` rescursively
	 * and actually mutates the object. It can also be mutated in
	 * user-land.
	 *
	 * By only caching fs results, we can avoid serving mutated objects
	 */ var config;
    try {
        config = readJsonc(tsconfigPath, cache) || {};
    } catch (e) {
        throw new Error("Cannot resolve tsconfig at path: ".concat(tsconfigPath));
    }
    if ((typeof config === "undefined" ? "undefined" : _type_of(config)) !== 'object') {
        throw new SyntaxError("Failed to parse tsconfig at: ".concat(tsconfigPath));
    }
    var directoryPath = path.dirname(tsconfigPath);
    if (config.compilerOptions) {
        var compilerOptions = config.compilerOptions;
        if (compilerOptions.paths && !compilerOptions.baseUrl) {
            compilerOptions[implicitBaseUrlSymbol] = directoryPath;
        }
    }
    if (config["extends"]) {
        var extendsPathList = Array.isArray(config["extends"]) ? config["extends"] : [
            config["extends"]
        ];
        delete config["extends"];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = extendsPathList.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    if (config.compilerOptions) {
        var compilerOptions1 = config.compilerOptions;
        var normalizedPaths = [
            'baseUrl',
            'rootDir'
        ];
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = normalizedPaths[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var property = _step1.value;
                var unresolvedPath = compilerOptions1[property];
                if (unresolvedPath && !unresolvedPath.startsWith(configDirPlaceholder)) {
                    var resolvedBaseUrl = path.resolve(directoryPath, unresolvedPath);
                    var relativeBaseUrl = pathRelative(directoryPath, resolvedBaseUrl);
                    compilerOptions1[property] = relativeBaseUrl;
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                    _iterator1["return"]();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
        try {
            for(var _iterator2 = outputFields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
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
        } finally{
            try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                }
            } finally{
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    } else {
        config.compilerOptions = {};
    }
    if (config.include) {
        config.include = config.include.map(slash);
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
                return slash(path.resolve(directoryPath, excludePath));
            });
        }
    }
    return config;
};
var interpolateConfigDir = function(filePath, configDir) {
    if (filePath.startsWith(configDirPlaceholder)) {
        return slash(path.join(configDir, filePath.slice(configDirPlaceholder.length)));
    }
};
/**
 * @see https://github.com/microsoft/TypeScript/issues/57485#issuecomment-2027787456
 * exclude paths, as it requires custom processing
 */ var compilerFieldsWithConfigDir = [
    'outDir',
    'declarationDir',
    'outFile',
    'rootDir',
    'baseUrl',
    'tsBuildInfoFile'
];
var parseTsconfig = function(tsconfigPath) {
    var cache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new Map();
    var resolvedTsconfigPath = path.resolve(tsconfigPath);
    var config = _parseTsconfig(resolvedTsconfigPath, cache);
    var configDir = path.dirname(resolvedTsconfigPath);
    var compilerOptions = config.compilerOptions;
    if (compilerOptions) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = compilerFieldsWithConfigDir[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        for(var _i = 0, _iter = [
            'rootDirs',
            'typeRoots'
        ]; _i < _iter.length; _i++){
            var property1 = _iter[_i];
            var value1 = compilerOptions[property1];
            if (value1) {
                compilerOptions[property1] = value1.map(function(v) {
                    var resolvedPath = interpolateConfigDir(v, configDir);
                    return resolvedPath ? pathRelative(configDir, resolvedPath) : v;
                });
            }
        }
        var paths = compilerOptions.paths;
        if (paths) {
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = Object.keys(paths)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var name = _step1.value;
                    paths[name] = paths[name].map(function(filePath) {
                        var _interpolateConfigDir;
                        return (_interpolateConfigDir = interpolateConfigDir(filePath, configDir)) !== null && _interpolateConfigDir !== void 0 ? _interpolateConfigDir : filePath;
                    });
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                        _iterator1["return"]();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
    }
    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
    try {
        for(var _iterator2 = filesProperties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
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
    } finally{
        try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
            }
        } finally{
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
    return config;
};

var getTsconfig = function() {
    var searchPath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : process.cwd(), configName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'tsconfig.json', cache = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new Map();
    var configFile = findUp(slash(searchPath), configName, cache);
    if (!configFile) {
        return null;
    }
    var config = parseTsconfig(configFile, cache);
    return {
        path: configFile,
        config: config
    };
};

function _array_like_to_array$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit$1(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$1(arr, i) {
    return _array_with_holes$1(arr) || _iterable_to_array_limit$1(arr, i) || _unsupported_iterable_to_array$2(arr, i) || _non_iterable_rest$1();
}
function _unsupported_iterable_to_array$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$2(o, minLen);
}
var starPattern = /\*/g;
var assertStarCount = function(pattern, errorMessage) {
    var starCount = pattern.match(starPattern);
    if (starCount && starCount.length > 1) {
        throw new Error(errorMessage);
    }
};
var parsePattern = function(pattern) {
    if (pattern.includes('*')) {
        var _pattern_split = _sliced_to_array$1(pattern.split('*'), 2), prefix = _pattern_split[0], suffix = _pattern_split[1];
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

function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array$1(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
var parsePaths = function(paths, baseUrl, absoluteBaseUrl) {
    return Object.entries(paths).map(function(param) {
        var _param = _sliced_to_array(param, 2), pattern = _param[0], substitutions = _param[1];
        assertStarCount(pattern, "Pattern '".concat(pattern, "' can have at most one '*' character."));
        return {
            pattern: parsePattern(pattern),
            substitutions: substitutions.map(function(substitution) {
                assertStarCount(substitution, "Substitution '".concat(substitution, "' in pattern '").concat(pattern, "' can have at most one '*' character."));
                if (!baseUrl && !isRelativePathPattern.test(substitution)) {
                    throw new Error('Non-relative paths are not allowed when \'baseUrl\' is not set. Did you forget a leading \'./\'?');
                }
                return path.resolve(absoluteBaseUrl, substitution);
            })
        };
    });
};
/**
 * Reference:
 * https://github.com/microsoft/TypeScript/blob/3ccbe804f850f40d228d3c875be952d94d39aa1d/src/compiler/moduleNameResolver.ts#L2465
 */ var createPathsMatcher = function(tsconfig) {
    var compilerOptions = tsconfig.config.compilerOptions;
    if (!compilerOptions) {
        return null;
    }
    var baseUrl = compilerOptions.baseUrl, paths = compilerOptions.paths;
    if (!baseUrl && !paths) {
        return null;
    }
    var implicitBaseUrl = implicitBaseUrlSymbol in compilerOptions && compilerOptions[implicitBaseUrlSymbol];
    var resolvedBaseUrl = path.resolve(path.dirname(tsconfig.path), baseUrl || implicitBaseUrl || '.');
    var pathEntries = paths ? parsePaths(paths, baseUrl, resolvedBaseUrl) : [];
    return function(specifier) {
        if (isRelativePathPattern.test(specifier)) {
            return [];
        }
        var patternPathEntries = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = pathEntries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var pathEntry = _step.value;
                if (pathEntry.pattern === specifier) {
                    return pathEntry.substitutions.map(slash);
                }
                if (typeof pathEntry.pattern !== 'string') {
                    patternPathEntries.push(pathEntry);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        var matchedValue;
        var longestMatchPrefixLength = -1;
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = patternPathEntries[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var pathEntry1 = _step1.value;
                if (isPatternMatch(pathEntry1.pattern, specifier) && pathEntry1.pattern.prefix.length > longestMatchPrefixLength) {
                    longestMatchPrefixLength = pathEntry1.pattern.prefix.length;
                    matchedValue = pathEntry1;
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                    _iterator1["return"]();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        if (!matchedValue) {
            return baseUrl ? [
                slash(path.join(resolvedBaseUrl, specifier))
            ] : [];
        }
        var matchedPath = specifier.slice(matchedValue.pattern.prefix.length, specifier.length - matchedValue.pattern.suffix.length);
        return matchedValue.substitutions.map(function(substitution) {
            return slash(substitution.replace('*', matchedPath));
        });
    };
};

var s = function(e) {
    var o = "";
    for(var t = 0; t < e.length; t += 1){
        var r = e[t], n = r.toUpperCase();
        o += r === n ? r.toLowerCase() : n;
    }
    return o;
}, c = 65, a = 97, m = function() {
    return Math.floor(Math.random() * 26);
}, S = function(e) {
    return Array.from({
        length: e
    }, function() {
        return String.fromCodePoint(m() + (Math.random() > .5 ? c : a));
    }).join("");
}, l = function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : fs;
    var o = process.execPath;
    if (e.existsSync(o)) return !e.existsSync(s(o));
    var t = "/".concat(S(10));
    e.writeFileSync(t, "");
    var r = !e.existsSync(s(t));
    return e.unlinkSync(t), r;
};

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _tagged_template_literal(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _templateObject() {
    var data = _tagged_template_literal([
        "$&"
    ], [
        "\\$&"
    ]);
    _templateObject = function _templateObject() {
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
    _templateObject1 = function _templateObject() {
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
    _templateObject2 = function _templateObject() {
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
    _templateObject3 = function _templateObject() {
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
    _templateObject4 = function _templateObject() {
        return data;
    };
    return data;
}
var _path_posix = path.posix, pathJoin = _path_posix.join;
var baseExtensions = {
    ts: [
        '.ts',
        '.tsx',
        '.d.ts'
    ],
    cts: [
        '.cts',
        '.d.cts'
    ],
    mts: [
        '.mts',
        '.d.mts'
    ]
};
var getSupportedExtensions = function(compilerOptions) {
    var ts = _to_consumable_array(baseExtensions.ts);
    var cts = _to_consumable_array(baseExtensions.cts);
    var mts = _to_consumable_array(baseExtensions.mts);
    if (compilerOptions === null || compilerOptions === void 0 ? void 0 : compilerOptions.allowJs) {
        ts.push('.js', '.jsx');
        cts.push('.cjs');
        mts.push('.mjs');
    }
    return _to_consumable_array(ts).concat(_to_consumable_array(cts), _to_consumable_array(mts));
};
// https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/commandLineParser.ts#L3014-L3016
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
    'node_modules',
    'bower_components',
    'jspm_packages'
];
var implicitExcludePathRegexPattern = "(?!(".concat(dependencyDirectories.join('|'), ")(/|$))");
/**
 *
 * File matchers
 * replace *, ?, and ** / with regex
 * https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/utilities.ts#L8088
 *
 * getSubPatternFromSpec
 * https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/utilities.ts#L8165
 *
 * matchFiles
 * https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/utilities.ts#L8291
 *
 * getFileMatcherPatterns
 * https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/utilities.ts#L8267
 */ /**
 * An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space)
 * if its last component has no extension, and does not contain any glob characters itself.
 */ var isImplicitGlobPattern = /(?:^|\/)[^.*?]+$/;
var matchAllGlob = '**/*';
var anyCharacter = '[^/]';
var noPeriodOrSlash = '[^./]';
var isWindows = process.platform === 'win32';
var createFilesMatcher = function(param) {
    var config = param.config, tsconfigPath = param.path, caseSensitivePaths = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : l();
    if ('extends' in config) {
        throw new Error('tsconfig#extends must be resolved. Use getTsconfig or parseTsconfig to resolve it.');
    }
    if (!path.isAbsolute(tsconfigPath)) {
        throw new Error('The tsconfig path must be absolute');
    }
    if (isWindows) {
        tsconfigPath = slash(tsconfigPath);
    }
    var projectDirectory = path.dirname(tsconfigPath);
    var files = config.files, include = config.include, exclude = config.exclude, compilerOptions = config.compilerOptions;
    var filesList = files === null || files === void 0 ? void 0 : files.map(function(file) {
        return pathJoin(projectDirectory, file);
    });
    var extensions = getSupportedExtensions(compilerOptions);
    var regexpFlags = caseSensitivePaths ? '' : 'i';
    /**
	 * Match entire directory for `exclude`
	 * https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/utilities.ts#L8135
	 */ var excludeSpec = exclude || getDefaultExcludeSpec(compilerOptions);
    var excludePatterns = excludeSpec.map(function(filePath) {
        var projectFilePath = pathJoin(projectDirectory, filePath);
        var projectFilePathPattern = escapeForRegexp(projectFilePath)// Replace **/
        .replaceAll(String.raw(_templateObject1()), '(.+/)?')// Replace *
        .replaceAll(String.raw(_templateObject2()), "".concat(anyCharacter, "*"))// Replace ?
        .replaceAll(String.raw(_templateObject3()), anyCharacter);
        return new RegExp("^".concat(projectFilePathPattern, "($|/)"), regexpFlags);
    });
    // https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/commandLineParser.ts#LL3020C29-L3020C47
    var includeSpec = files || include ? include : [
        matchAllGlob
    ];
    var includePatterns = includeSpec ? includeSpec.map(function(filePath) {
        var projectFilePath = pathJoin(projectDirectory, filePath);
        // https://github.com/microsoft/TypeScript/blob/acf854b636e0b8e5a12c3f9951d4edfa0fa73bcd/src/compiler/utilities.ts#L8178
        if (isImplicitGlobPattern.test(projectFilePath)) {
            projectFilePath = pathJoin(projectFilePath, matchAllGlob);
        }
        var projectFilePathPattern = escapeForRegexp(projectFilePath)// Replace /**
        .replaceAll(String.raw(_templateObject4()), "(/".concat(implicitExcludePathRegexPattern).concat(noPeriodOrSlash).concat(anyCharacter, "*)*?"))// Replace *
        .replaceAll(/(\/)?\\\*/g, function(_, hasSlash) {
            var pattern = "(".concat(noPeriodOrSlash, "|(\\.(?!min\\.js$))?)*");
            if (hasSlash) {
                return "/".concat(implicitExcludePathRegexPattern).concat(noPeriodOrSlash).concat(pattern);
            }
            return pattern;
        })// Replace ?
        .replaceAll(/(\/)?\\\?/g, function(_, hasSlash) {
            var pattern = anyCharacter;
            if (hasSlash) {
                return "/".concat(implicitExcludePathRegexPattern).concat(pattern);
            }
            return pattern;
        });
        return new RegExp("^".concat(projectFilePathPattern, "$"), regexpFlags);
    }) : undefined;
    return function(filePath) {
        if (!path.isAbsolute(filePath)) {
            throw new Error('filePath must be absolute');
        }
        if (isWindows) {
            filePath = slash(filePath);
        }
        if (filesList === null || filesList === void 0 ? void 0 : filesList.includes(filePath)) {
            return config;
        }
        if (// Invalid extension (case sensitive)
        !extensions.some(function(extension) {
            return filePath.endsWith(extension);
        }) || excludePatterns.some(function(pattern) {
            return pattern.test(filePath);
        })) {
            return;
        }
        if (includePatterns && includePatterns.some(function(pattern) {
            return pattern.test(filePath);
        })) {
            return config;
        }
    };
};

exports.createFilesMatcher = createFilesMatcher;
exports.createPathsMatcher = createPathsMatcher;
exports.getTsconfig = getTsconfig;
exports.parseTsconfig = parseTsconfig;

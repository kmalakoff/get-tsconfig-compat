"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("core-js/actual/array/fill");
require("core-js/actual/array/includes");
require("core-js/actual/object/entries");
require("core-js/actual/set");
require("core-js/actual/string/ends-with");
require("core-js/actual/string/starts-with");
require("core-js/actual/string/includes");
require("core-js/actual/string/repeat");
require("core-js/actual/symbol");
require("core-js/actual/reflect");
require("core-js/actual/map");
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
var _pathposix = /*#__PURE__*/ _interop_require_default(require("path-posix"));
var _isabsolute = /*#__PURE__*/ _interop_require_default(require("is-absolute"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
if (!_path.default.posix) _path.default.posix = _pathposix.default;
if (!_path.default.isAbsolute) _path.default.isAbsolute = _isabsolute.default;
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get createFilesMatcher () {
        return createFilesMatcher;
    },
    get createPathsMatcher () {
        return createPathsMatcher;
    },
    get default () {
        return _default;
    },
    get getTsconfig () {
        return getTsconfig;
    },
    get parseTsconfig () {
        return parseTsconfig;
    }
});
require("./polyfills.js");
var _module = /*#__PURE__*/ _interop_require_default(require("module"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var _require = typeof require === 'undefined' ? _module.default.createRequire(require("url").pathToFileURL(__filename).toString()) : require;
var major = +process.versions.node.split('.')[0];
var getTS = major <= 10 ? _require('../../assets/get-tsconfig.cjs') : _require('get-tsconfig');
var createFilesMatcher = getTS.createFilesMatcher;
var createPathsMatcher = getTS.createPathsMatcher;
var getTsconfig = getTS.getTsconfig;
var parseTsconfig = getTS.parseTsconfig;
var _default = {
    createFilesMatcher: createFilesMatcher,
    createPathsMatcher: createPathsMatcher,
    getTsconfig: getTsconfig,
    parseTsconfig: parseTsconfig
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }
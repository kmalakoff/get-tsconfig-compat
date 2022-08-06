'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || (allowArrayLike && o && typeof o.length === 'number')) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e2) {
          throw _e2;
        },
        f: F,
      };
    }
    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e3) {
      didErr = true;
      err = _e3;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj && 'function' == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
          }),
    _typeof(obj)
  );
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var require$$0 = require('path');

var require$$1 = require('fs');

var require$$2 = require('module');

function _interopDefaultLegacy(e) {
  return e && _typeof(e) === 'object' && 'default' in e
    ? e
    : {
        default: e,
      };
}

var require$$0__default = /*#__PURE__*/ _interopDefaultLegacy(require$$0);

var require$$1__default = /*#__PURE__*/ _interopDefaultLegacy(require$$1);

var require$$2__default = /*#__PURE__*/ _interopDefaultLegacy(require$$2);

var dist = {};
exports.parseTsconfig = void 0;
exports.getTsconfig = void 0;
exports.createPathsMatcher = void 0;
Object.defineProperty(dist, '__esModule', {
  value: !0,
});
var G = require$$0__default['default'],
  K = require$$1__default['default'],
  Q = require$$2__default['default'];

function B(r) {
  return r && _typeof(r) == 'object' && 'default' in r
    ? r
    : {
        default: r,
      };
}

var d = B(G),
  O = B(K),
  X = B(Q);

function T(r) {
  var t = /^\\\\\?\\/.test(r),
    n = /[^\u0000-\u0080]+/.test(r);
  return t || n ? r : r.replace(/\\/g, '/');
}

function M(r, t) {
  for (;;) {
    var n = d['default'].join(r, t);
    if (O['default'].existsSync(n)) return T(n);
    var e = d['default'].dirname(r);
    if (e === r) return;
    r = e;
  }
}

function Y(r, t) {
  t === void 0 && (t = !1);
  var n = r.length,
    e = 0,
    i = '',
    a = 0,
    o = 16,
    c = 0,
    f = 0,
    p = 0,
    C = 0,
    u = 0;

  function A(s, b) {
    for (var v = 0, k = 0; v < s || !b; ) {
      var h = r.charCodeAt(e);
      if (h >= 48 && h <= 57) k = k * 16 + h - 48;
      else if (h >= 65 && h <= 70) k = k * 16 + h - 65 + 10;
      else if (h >= 97 && h <= 102) k = k * 16 + h - 97 + 10;
      else break;
      e++, v++;
    }

    return v < s && (k = -1), k;
  }

  function V(s) {
    (e = s), (i = ''), (a = 0), (o = 16), (u = 0);
  }

  function $() {
    var s = e;
    if (r.charCodeAt(e) === 48) e++;
    else
      for (e++; e < r.length && j(r.charCodeAt(e)); ) {
        e++;
      }
    if (e < r.length && r.charCodeAt(e) === 46)
      if ((e++, e < r.length && j(r.charCodeAt(e))))
        for (e++; e < r.length && j(r.charCodeAt(e)); ) {
          e++;
        }
      else return (u = 3), r.substring(s, e);
    var b = e;
    if (e < r.length && (r.charCodeAt(e) === 69 || r.charCodeAt(e) === 101))
      if ((e++, ((e < r.length && r.charCodeAt(e) === 43) || r.charCodeAt(e) === 45) && e++, e < r.length && j(r.charCodeAt(e)))) {
        for (e++; e < r.length && j(r.charCodeAt(e)); ) {
          e++;
        }

        b = e;
      } else u = 3;
    return r.substring(s, b);
  }

  function _() {
    for (var s = '', b = e; ; ) {
      if (e >= n) {
        (s += r.substring(b, e)), (u = 2);
        break;
      }

      var v = r.charCodeAt(e);

      if (v === 34) {
        (s += r.substring(b, e)), e++;
        break;
      }

      if (v === 92) {
        if (((s += r.substring(b, e)), e++, e >= n)) {
          u = 2;
          break;
        }

        var k = r.charCodeAt(e++);

        switch (k) {
          case 34:
            s += '"';
            break;

          case 92:
            s += '\\';
            break;

          case 47:
            s += '/';
            break;

          case 98:
            s += '\b';
            break;

          case 102:
            s += '\f';
            break;

          case 110:
            s += '\n';
            break;

          case 114:
            s += '\r';
            break;

          case 116:
            s += '	';
            break;

          case 117:
            var h = A(4, !0);
            h >= 0 ? (s += String.fromCharCode(h)) : (u = 4);
            break;

          default:
            u = 5;
        }

        b = e;
        continue;
      }

      if (v >= 0 && v <= 31)
        if (S(v)) {
          (s += r.substring(b, e)), (u = 2);
          break;
        } else u = 6;
      e++;
    }

    return s;
  }

  function P() {
    if (((i = ''), (u = 0), (a = e), (f = c), (C = p), e >= n)) return (a = n), (o = 17);
    var s = r.charCodeAt(e);

    if (U(s)) {
      do {
        e++, (i += String.fromCharCode(s)), (s = r.charCodeAt(e));
      } while (U(s));

      return (o = 15);
    }

    if (S(s)) return e++, (i += String.fromCharCode(s)), s === 13 && r.charCodeAt(e) === 10 && (e++, (i += '\n')), c++, (p = e), (o = 14);

    switch (s) {
      case 123:
        return e++, (o = 1);

      case 125:
        return e++, (o = 2);

      case 91:
        return e++, (o = 3);

      case 93:
        return e++, (o = 4);

      case 58:
        return e++, (o = 6);

      case 44:
        return e++, (o = 5);

      case 34:
        return e++, (i = _()), (o = 10);

      case 47:
        var b = e - 1;

        if (r.charCodeAt(e + 1) === 47) {
          for (e += 2; e < n && !S(r.charCodeAt(e)); ) {
            e++;
          }

          return (i = r.substring(b, e)), (o = 12);
        }

        if (r.charCodeAt(e + 1) === 42) {
          e += 2;

          for (var v = n - 1, k = !1; e < v; ) {
            var h = r.charCodeAt(e);

            if (h === 42 && r.charCodeAt(e + 1) === 47) {
              (e += 2), (k = !0);
              break;
            }

            e++, S(h) && (h === 13 && r.charCodeAt(e) === 10 && e++, c++, (p = e));
          }

          return k || (e++, (u = 1)), (i = r.substring(b, e)), (o = 13);
        }

        return (i += String.fromCharCode(s)), e++, (o = 16);

      case 45:
        if (((i += String.fromCharCode(s)), e++, e === n || !j(r.charCodeAt(e)))) return (o = 16);

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
        return (i += $()), (o = 11);

      default:
        for (; e < n && m(s); ) {
          e++, (s = r.charCodeAt(e));
        }

        if (a !== e) {
          switch (((i = r.substring(a, e)), i)) {
            case 'true':
              return (o = 8);

            case 'false':
              return (o = 9);

            case 'null':
              return (o = 7);
          }

          return (o = 16);
        }

        return (i += String.fromCharCode(s)), e++, (o = 16);
    }
  }

  function m(s) {
    if (U(s) || S(s)) return !1;

    switch (s) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return !1;
    }

    return !0;
  }

  function l() {
    var s;

    do {
      s = P();
    } while (s >= 12 && s <= 15);

    return s;
  }

  return {
    setPosition: V,
    getPosition: function getPosition() {
      return e;
    },
    scan: t ? l : P,
    getToken: function getToken() {
      return o;
    },
    getTokenValue: function getTokenValue() {
      return i;
    },
    getTokenOffset: function getTokenOffset() {
      return a;
    },
    getTokenLength: function getTokenLength() {
      return e - a;
    },
    getTokenStartLine: function getTokenStartLine() {
      return f;
    },
    getTokenStartCharacter: function getTokenStartCharacter() {
      return a - C;
    },
    getTokenError: function getTokenError() {
      return u;
    },
  };
}

function U(r) {
  return r === 32 || r === 9 || r === 11 || r === 12 || r === 160 || r === 5760 || (r >= 8192 && r <= 8203) || r === 8239 || r === 8287 || r === 12288 || r === 65279;
}

function S(r) {
  return r === 10 || r === 13 || r === 8232 || r === 8233;
}

function j(r) {
  return r >= 48 && r <= 57;
}

var N;

(function (r) {
  r.DEFAULT = {
    allowTrailingComma: !1,
  };
})(N || (N = {}));

function Z(r, t, n) {
  t === void 0 && (t = []), n === void 0 && (n = N.DEFAULT);
  var e = null,
    i = [],
    a = [];

  function o(f) {
    Array.isArray(i) ? i.push(f) : e !== null && (i[e] = f);
  }

  var c = {
    onObjectBegin: function onObjectBegin() {
      var f = {};
      o(f), a.push(i), (i = f), (e = null);
    },
    onObjectProperty: function onObjectProperty(f) {
      e = f;
    },
    onObjectEnd: function onObjectEnd() {
      i = a.pop();
    },
    onArrayBegin: function onArrayBegin() {
      var f = [];
      o(f), a.push(i), (i = f), (e = null);
    },
    onArrayEnd: function onArrayEnd() {
      i = a.pop();
    },
    onLiteralValue: o,
    onError: function onError(f, p, C) {
      t.push({
        error: f,
        offset: p,
        length: C,
      });
    },
  };
  return x(r, c, n), i[0];
}

function x(r, t, n) {
  n === void 0 && (n = N.DEFAULT);
  var e = Y(r, !1);

  function i(g) {
    return g
      ? function () {
          return g(e.getTokenOffset(), e.getTokenLength(), e.getTokenStartLine(), e.getTokenStartCharacter());
        }
      : function () {
          return !0;
        };
  }

  function a(g) {
    return g
      ? function (w) {
          return g(w, e.getTokenOffset(), e.getTokenLength(), e.getTokenStartLine(), e.getTokenStartCharacter());
        }
      : function () {
          return !0;
        };
  }

  var o = i(t.onObjectBegin),
    c = a(t.onObjectProperty),
    f = i(t.onObjectEnd),
    p = i(t.onArrayBegin),
    C = i(t.onArrayEnd),
    u = a(t.onLiteralValue),
    A = a(t.onSeparator),
    V = i(t.onComment),
    $ = a(t.onError),
    _ = n && n.disallowComments,
    P = n && n.allowTrailingComma;

  function m() {
    for (;;) {
      var g = e.scan();

      switch (e.getTokenError()) {
        case 4:
          l(14);
          break;

        case 5:
          l(15);
          break;

        case 3:
          l(13);
          break;

        case 1:
          _ || l(11);
          break;

        case 2:
          l(12);
          break;

        case 6:
          l(16);
          break;
      }

      switch (g) {
        case 12:
        case 13:
          _ ? l(10) : V();
          break;

        case 16:
          l(1);
          break;

        case 15:
        case 14:
          break;

        default:
          return g;
      }
    }
  }

  function l(g, w, L) {
    if ((w === void 0 && (w = []), L === void 0 && (L = []), $(g), w.length + L.length > 0))
      for (var D = e.getToken(); D !== 17; ) {
        if (w.indexOf(D) !== -1) {
          m();
          break;
        } else if (L.indexOf(D) !== -1) break;

        D = m();
      }
  }

  function s(g) {
    var w = e.getTokenValue();
    return g ? u(w) : c(w), m(), !0;
  }

  function b() {
    switch (e.getToken()) {
      case 11:
        var g = e.getTokenValue(),
          w = Number(g);
        isNaN(w) && (l(2), (w = 0)), u(w);
        break;

      case 7:
        u(null);
        break;

      case 8:
        u(!0);
        break;

      case 9:
        u(!1);
        break;

      default:
        return !1;
    }

    return m(), !0;
  }

  function v() {
    return e.getToken() !== 10 ? (l(3, [], [2, 5]), !1) : (s(!1), e.getToken() === 6 ? (A(':'), m(), F() || l(4, [], [2, 5])) : l(5, [], [2, 5]), !0);
  }

  function k() {
    o(), m();

    for (var g = !1; e.getToken() !== 2 && e.getToken() !== 17; ) {
      if (e.getToken() === 5) {
        if ((g || l(4, [], []), A(','), m(), e.getToken() === 2 && P)) break;
      } else g && l(6, [], []);

      v() || l(4, [], [2, 5]), (g = !0);
    }

    return f(), e.getToken() !== 2 ? l(7, [2], []) : m(), !0;
  }

  function h() {
    p(), m();

    for (var g = !1; e.getToken() !== 4 && e.getToken() !== 17; ) {
      if (e.getToken() === 5) {
        if ((g || l(4, [], []), A(','), m(), e.getToken() === 4 && P)) break;
      } else g && l(6, [], []);

      F() || l(4, [], [4, 5]), (g = !0);
    }

    return C(), e.getToken() !== 4 ? l(8, [4], []) : m(), !0;
  }

  function F() {
    switch (e.getToken()) {
      case 3:
        return h();

      case 1:
        return k();

      case 10:
        return s(!0);

      default:
        return b();
    }
  }

  return m(), e.getToken() === 17 ? (n.allowEmptyContent ? !0 : (l(4, [], []), !1)) : F() ? (e.getToken() !== 17 && l(9, [], []), !0) : (l(4, [], []), !1);
}

var ee = Z;

var W = /^\.{1,2}(\/.*)?$/,
  J = function J(r) {
    return T(W.test(r) ? r : './'.concat(r));
  },
  E = O['default'].existsSync,
  re = function re(r) {
    try {
      return JSON.parse(r);
    } catch (_unused) {}
  },
  ne = function ne() {
    var r = X['default'].findPnpApi;
    return r && r(process.cwd());
  };

function I(r) {
  var t = re(O['default'].readFileSync(r, 'utf8'));
  return d['default'].join(r, '..', t && 'tsconfig' in t ? t.tsconfig : 'tsconfig.json');
}

function te(r, t) {
  var n = r;

  if ((n === '..' && (n += '/tsconfig.json'), n.startsWith('.'))) {
    var a = d['default'].resolve(t, n);
    if ((E(a) && O['default'].statSync(a).isFile()) || (!a.endsWith('.json') && ((a += '.json'), E(a)))) return a;
    throw new Error("File '".concat(r, "' not found."));
  }

  var e = ne();

  if (e) {
    var _a = e.resolveRequest,
      _r$split = r.split('/'),
      _r$split2 = _slicedToArray(_r$split, 2),
      o = _r$split2[0],
      c = _r$split2[1],
      f = o.startsWith('@') ? ''.concat(o, '/').concat(c) : o;

    try {
      if (f === r) {
        var p = _a(d['default'].join(f, 'package.json'), t);

        if (p) {
          var C = I(p);
          if (E(C)) return C;
        }
      } else
        try {
          return _a(r, t, {
            extensions: ['.json'],
          });
        } catch (_unused2) {
          return _a(d['default'].join(r, 'tsconfig.json'), t);
        }
    } catch (_unused3) {}
  }

  var i = M(t, d['default'].join('node_modules', n));

  if (i) {
    if (O['default'].statSync(i).isDirectory()) {
      var _a2 = d['default'].join(i, 'package.json');

      if ((E(_a2) ? (i = I(_a2)) : (i = d['default'].join(i, 'tsconfig.json')), E(i))) return i;
    } else if (i.endsWith('.json')) return i;
  }

  if (!n.endsWith('.json') && ((n += '.json'), (i = M(t, d['default'].join('node_modules', n))), i)) return i;
  throw new Error("File '".concat(r, "' not found."));
}

var ae = Object.defineProperty,
  oe = Object.defineProperties,
  ie = Object.getOwnPropertyDescriptors,
  R = Object.getOwnPropertySymbols,
  se = Object.prototype.hasOwnProperty,
  ue = Object.prototype.propertyIsEnumerable,
  z = function z(r, t, n) {
    return t in r
      ? ae(r, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: n,
        })
      : (r[t] = n);
  },
  y = function y(r, t) {
    for (var n in t || (t = {})) {
      se.call(t, n) && z(r, n, t[n]);
    }

    if (R) {
      var _iterator = _createForOfIteratorHelper(R(t)),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var n = _step.value;
          ue.call(t, n) && z(r, n, t[n]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return r;
  },
  fe = function fe(r, t) {
    return oe(r, ie(t));
  };

function q(r) {
  var t;
  var n;

  try {
    n = O['default'].realpathSync(r);
  } catch (_unused4) {
    throw new Error('Cannot resolve tsconfig at path: '.concat(r));
  }

  var e = d['default'].dirname(n),
    i = O['default'].readFileSync(n, 'utf8').trim();
  var a = {};
  if (i && ((a = ee(i)), !a || _typeof(a) != 'object')) throw new SyntaxError('Failed to parse tsconfig at: '.concat(r));

  if (a['extends']) {
    var o = te(a['extends'], e),
      c = q(o);

    if ((delete c.references, (t = c.compilerOptions) != null && t.baseUrl)) {
      var p = c.compilerOptions;
      p.baseUrl = d['default'].relative(e, d['default'].join(d['default'].dirname(o), p.baseUrl)) || './';
    }

    c.files &&
      (c.files = c.files.map(function (p) {
        return d['default'].relative(e, d['default'].join(d['default'].dirname(o), p));
      })),
      c.include &&
        (c.include = c.include.map(function (p) {
          return d['default'].relative(e, d['default'].join(d['default'].dirname(o), p));
        })),
      delete a['extends'];
    var f = fe(y(y({}, c), a), {
      compilerOptions: y(y({}, c.compilerOptions), a.compilerOptions),
    });
    c.watchOptions && (f.watchOptions = y(y({}, c.watchOptions), a.watchOptions)), (a = f);
  }

  if (a.compilerOptions) {
    var _a3 = a,
      _o = _a3.compilerOptions;
    _o.baseUrl && (_o.baseUrl = J(_o.baseUrl)), _o.outDir && (Array.isArray(a.exclude) || (a.exclude = []), a.exclude.push(_o.outDir), (_o.outDir = J(_o.outDir)));
  }

  if ((a.files && (a.files = a.files.map(J)), a.include && (a.include = a.include.map(T)), a.watchOptions)) {
    var _a4 = a,
      _o2 = _a4.watchOptions;
    _o2.excludeDirectories &&
      (_o2.excludeDirectories = _o2.excludeDirectories.map(function (c) {
        return T(d['default'].resolve(e, c));
      }));
  }

  return a;
}

function ce() {
  var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tsconfig.json';
  var n = M(r, t);
  if (!n) return null;
  var e = q(n);
  return {
    path: n,
    config: e,
  };
}

var le = /\*/g,
  H = function H(r, t) {
    var n = r.match(le);
    if (n && n.length > 1) throw new Error(t);
  };

function de(r) {
  if (r.includes('*')) {
    var _r$split3 = r.split('*'),
      _r$split4 = _slicedToArray(_r$split3, 2),
      t = _r$split4[0],
      n = _r$split4[1];

    return {
      prefix: t,
      suffix: n,
    };
  }

  return r;
}

var ge = function ge(_ref, n) {
  var r = _ref.prefix,
    t = _ref.suffix;
  return n.startsWith(r) && n.endsWith(t);
};

function pe(r, t, n) {
  return Object.entries(r).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      e = _ref3[0],
      i = _ref3[1];

    return (
      H(e, "Pattern '".concat(e, "' can have at most one '*' character.")),
      {
        pattern: de(e),
        substitutions: i.map(function (a) {
          if ((H(a, "Substitution '".concat(a, "' in pattern '").concat(e, "' can have at most one '*' character.")), !t && !W.test(a)))
            throw new Error("Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?");
          return d['default'].join(n, a);
        }),
      }
    );
  });
}

function he(r) {
  if (!r.config.compilerOptions) return null;
  var _r$config$compilerOpt = r.config.compilerOptions,
    t = _r$config$compilerOpt.baseUrl,
    n = _r$config$compilerOpt.paths;
  if (!t && !n) return null;
  var e = d['default'].resolve(d['default'].dirname(r.path), t || '.'),
    i = n ? pe(n, t, e) : [];
  return function (o) {
    if (W.test(o)) return [];
    var c = [];

    var _iterator2 = _createForOfIteratorHelper(i),
      _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var _u = _step2.value;
        if (_u.pattern === o) return _u.substitutions.map(T);
        typeof _u.pattern != 'string' && c.push(_u);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var f,
      p = -1;

    for (var _i2 = 0, _c = c; _i2 < _c.length; _i2++) {
      var u = _c[_i2];
      ge(u.pattern, o) && u.pattern.prefix.length > p && ((p = u.pattern.prefix.length), (f = u));
    }

    if (!f) return t ? [T(d['default'].join(e, o))] : [];
    var C = o.slice(f.pattern.prefix.length, o.length - f.pattern.suffix.length);
    return f.substitutions.map(function (u) {
      return T(u.replace('*', C));
    });
  };
}

(exports.createPathsMatcher = dist.createPathsMatcher = he), (exports.getTsconfig = dist.getTsconfig = ce), (exports.parseTsconfig = dist.parseTsconfig = q);
exports['default'] = dist;

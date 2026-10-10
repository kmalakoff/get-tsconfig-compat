import 'core-js/actual/array/fill.js';
import 'core-js/actual/array/includes.js';
import 'core-js/actual/object/entries.js';
import 'core-js/actual/set/index.js';
import 'core-js/actual/string/ends-with.js';
import 'core-js/actual/string/starts-with.js';
import 'core-js/actual/string/includes.js';
import 'core-js/actual/string/repeat.js';
import 'core-js/actual/symbol/index.js';
import 'core-js/actual/reflect/index.js';
import 'core-js/actual/map/index.js';

import path from 'path';

import pathPosix from 'path-posix';

if (!path.posix) (path as { posix: typeof pathPosix }).posix = pathPosix;

import isAbsolute from 'is-absolute';

if (!path.isAbsolute) path.isAbsolute = isAbsolute;

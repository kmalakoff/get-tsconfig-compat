import 'core-js/actual/array/fill';
import 'core-js/actual/object/entries';
import 'core-js/actual/set';
import 'core-js/actual/string/ends-with';
import 'core-js/actual/string/starts-with';
import 'core-js/actual/string/includes';
import 'core-js/actual/string/repeat';
import 'core-js/actual/symbol';
import 'core-js/actual/reflect';
import 'core-js/actual/map';
import path from 'path';
import pathPosix from 'path-posix'; // @ts-ignore
if (!path.posix) path.posix = pathPosix;
import isAbsolute from 'is-absolute';
if (!path.isAbsolute) path.isAbsolute = isAbsolute;

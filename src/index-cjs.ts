import './polyfills.js';

import type t from 'get-tsconfig';

type Cache = t.Cache;
type FileMatcher = t.FileMatcher;
type TsConfigJson = t.TsConfigJson;
type TsConfigJsonResolved = t.TsConfigJsonResolved;
type TsConfigResult = t.TsConfigResult;
export type { Cache, FileMatcher, TsConfigJson, TsConfigJsonResolved, TsConfigResult };

import Module from 'module';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const major = +process.versions.node.split('.')[0];

const getTS = major <= 10 ? _require('../../assets/get-tsconfig.cjs') : _require('get-tsconfig');

export const createFilesMatcher = getTS.createFilesMatcher as typeof t.createFilesMatcher;
export const createPathsMatcher = getTS.createPathsMatcher as typeof t.createPathsMatcher;
export const getTsconfig = getTS.getTsconfig as typeof t.getTsconfig;
export const parseTsconfig = getTS.parseTsconfig as typeof t.parseTsconfig;

export default {
  createFilesMatcher,
  createPathsMatcher,
  getTsconfig,
  parseTsconfig,
};

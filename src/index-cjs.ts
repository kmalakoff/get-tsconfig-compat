import './polyfills.js';

import type t from 'get-tsconfig';

type Cache = t.Cache;
type FileMatcher = t.FileMatcher;
type TsConfigJson = t.TsConfigJson;
type TsConfigJsonResolved = t.TsConfigJsonResolved;
type TsConfigResult = t.TsConfigResult;

export type { Cache, FileMatcher, TsConfigJson, TsConfigJsonResolved, TsConfigResult };

import Module from 'module';

const _require = typeof require === 'undefined' ? Module.createRequire((import.meta as { url: string }).url) : require;
const [major, minor] = process.versions.node.split('.').map(Number);
// Upstream's node-prefixed CommonJS imports require Node 14.18 or Node 16+.
const supportsUpstream = major >= 16 || (major === 14 && minor >= 18);

const getTS = supportsUpstream ? _require('get-tsconfig') : _require('../../assets/get-tsconfig.cjs');

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

import './polyfills.js';
import type t from 'get-tsconfig';
type Cache = t.Cache;
type FileMatcher = t.FileMatcher;
type TsConfigJson = t.TsConfigJson;
type TsConfigJsonResolved = t.TsConfigJsonResolved;
type TsConfigResult = t.TsConfigResult;
export type { Cache, FileMatcher, TsConfigJson, TsConfigJsonResolved, TsConfigResult };
export declare const createFilesMatcher: typeof t.createFilesMatcher;
export declare const createPathsMatcher: typeof t.createPathsMatcher;
export declare const getTsconfig: typeof t.getTsconfig;
export declare const parseTsconfig: typeof t.parseTsconfig;
declare const _default: {
    createFilesMatcher: any;
    createPathsMatcher: any;
    getTsconfig: any;
    parseTsconfig: any;
};
export default _default;

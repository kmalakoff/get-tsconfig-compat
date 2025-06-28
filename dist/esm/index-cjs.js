import './polyfills.js';
import Module from 'module';
const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const major = +process.versions.node.split('.')[0];
const getTS = major <= 10 ? _require('../../assets/get-tsconfig.cjs') : _require('get-tsconfig');
export const createFilesMatcher = getTS.createFilesMatcher;
export const createPathsMatcher = getTS.createPathsMatcher;
export const getTsconfig = getTS.getTsconfig;
export const parseTsconfig = getTS.parseTsconfig;
export default {
    createFilesMatcher,
    createPathsMatcher,
    getTsconfig,
    parseTsconfig
};

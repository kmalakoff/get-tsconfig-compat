import assert from 'assert';
import type t from 'get-tsconfig-compat';
import Module from 'module';
import path from 'path';
import { DATA_DIR } from '../lib/fixtures.ts';

const _require = typeof require === 'undefined' ? Module.createRequire((import.meta as { url: string }).url) : require;
const getTS = _require('get-tsconfig-compat') as typeof t;

describe('CommonJS configuration loading', () => {
  it('finds and parses a configuration', () => {
    const filename = path.join(DATA_DIR, 'cjs', 'tsconfig.json');
    const result = getTS.getTsconfig(filename);
    assert.ok(result);
    assert.equal(result?.config.compilerOptions?.module, 'commonjs');
    assert.equal(getTS.parseTsconfig(filename).compilerOptions?.module, 'commonjs');
  });
});

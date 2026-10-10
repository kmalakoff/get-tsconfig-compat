import assert from 'assert';
import * as getTS from 'get-tsconfig-compat';
import { createFilesMatcher, createPathsMatcher, getTsconfig, parseTsconfig } from 'get-tsconfig-compat';

describe('exports .mjs', () => {
  it('exposes the configuration helpers', () => {
    assert.equal(typeof getTsconfig, 'function');
    assert.equal(typeof parseTsconfig, 'function');
    assert.equal(typeof createFilesMatcher, 'function');
    assert.equal(typeof createPathsMatcher, 'function');
    assert.equal(getTS.getTsconfig, getTsconfig);
  });
});

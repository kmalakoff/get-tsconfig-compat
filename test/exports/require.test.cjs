const assert = require('assert');
const getTS = require('get-tsconfig-compat');

describe('exports .cjs', function () {
  it('exposes the configuration helpers', function () {
    assert.equal(typeof getTS.getTsconfig, 'function');
    assert.equal(typeof getTS.parseTsconfig, 'function');
    assert.equal(typeof getTS.createFilesMatcher, 'function');
    assert.equal(typeof getTS.createPathsMatcher, 'function');
  });
});

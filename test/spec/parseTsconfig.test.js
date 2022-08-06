var assert = require('assert');
var path = require('path');

var get = require('../../lib');

var DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('parseTsconfig', function () {
  it('parse', function () {
    var config = get.getTsconfig(DATA_DIR);
    assert.equal(config.config.compilerOptions.module, 'System');
    var parsed = get.parseTsconfig(config.path);
    assert.equal(parsed.compilerOptions.module, 'System');
  });
});

var assert = require('assert');
var path = require('path');

var get = require('../../lib');

var DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('createPathsMatcher', function () {
  it('matcher', function () {
    var config = get.getTsconfig(DATA_DIR);
    assert.equal(config.config.compilerOptions.module, 'System');
    var matcher = get.createPathsMatcher(config);
    assert.ok(matcher);
  });
});

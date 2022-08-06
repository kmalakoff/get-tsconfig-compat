var assert = require('assert');
var path = require('path');

var get = require('../../lib');

var DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('getTsconfig', function () {
  it('cwd', function () {
    assert.equal(get.getTsconfig(), null);

    var cwd = process.cwd();
    process.chdir(DATA_DIR);
    var config = get.getTsconfig();
    assert.ok(config.path.startsWith(DATA_DIR));
    assert.equal(config.config.compilerOptions.module, 'System');
    process.chdir(cwd);
  });

  it('filepath', function () {
    var config = get.getTsconfig(path.join(DATA_DIR, 'dummy.ts'));
    assert.ok(config.path.startsWith(DATA_DIR));
    assert.equal(config.config.compilerOptions.module, 'System');
  });

  it('directory', function () {
    var config = get.getTsconfig(DATA_DIR);
    assert.ok(config.path.startsWith(DATA_DIR));
    assert.equal(config.config.compilerOptions.module, 'System');
  });

  it('config path', function () {
    var config = get.getTsconfig(path.join(DATA_DIR, 'cjs', 'tsconfig.json'));
    assert.ok(config.path.startsWith(DATA_DIR));
    assert.equal(config.config.compilerOptions.module, 'CommonJS');
  });

  it('config path extends', function () {
    var config = get.getTsconfig(path.join(DATA_DIR, 'extends', 'tsconfig.json'));
    assert.ok(config.path.startsWith(DATA_DIR));
    assert.equal(config.config.compilerOptions.module, 'ESNext');
  });
});

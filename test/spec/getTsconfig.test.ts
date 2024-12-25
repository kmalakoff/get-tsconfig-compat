import assert from 'assert';
import path from 'path';
import url from 'url';
import slash from 'slash';

// @ts-ignore
import * as getTS from 'get-tsconfig-compat';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('getTsconfig', function () {
  it('filepath', function () {
    var config = getTS.getTsconfig(path.join(DATA_DIR, 'dummy.ts'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'System');
  });

  it('directory', function () {
    var config = getTS.getTsconfig(DATA_DIR);
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'System');
  });

  it('config path', function () {
    var config = getTS.getTsconfig(path.join(DATA_DIR, 'cjs', 'tsconfig.json'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'CommonJS');
  });

  it('config path extends', function () {
    var config = getTS.getTsconfig(path.join(DATA_DIR, 'extends', 'tsconfig.json'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'ESNext');
  });
});

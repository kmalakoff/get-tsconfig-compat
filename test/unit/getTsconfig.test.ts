import assert from 'assert';
// @ts-ignore
import * as getTS from 'get-tsconfig-compat';
import path from 'path';
import slash from 'slash';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('getTsconfig', () => {
  it('filepath', () => {
    var config = getTS.getTsconfig(path.join(DATA_DIR, 'dummy.ts'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'system');
  });

  it('directory', () => {
    var config = getTS.getTsconfig(DATA_DIR);
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'system');
  });

  it('config path', () => {
    var config = getTS.getTsconfig(path.join(DATA_DIR, 'cjs', 'tsconfig.json'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'commonjs');
  });

  it('config path extends', () => {
    var config = getTS.getTsconfig(path.join(DATA_DIR, 'extends', 'tsconfig.json'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions.module, 'esnext');
  });
});

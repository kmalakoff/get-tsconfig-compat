import assert from 'assert';
import path from 'path';
import slash from 'slash';
import { DATA_DIR, getConfig } from '../lib/fixtures.ts';

describe('getTsconfig', () => {
  it('filepath', () => {
    var config = getConfig(path.join(DATA_DIR, 'dummy.ts'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions?.module, 'system');
  });

  it('directory', () => {
    var config = getConfig(DATA_DIR);
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions?.module, 'system');
  });

  it('config path', () => {
    var config = getConfig(path.join(DATA_DIR, 'cjs', 'tsconfig.json'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions?.module, 'commonjs');
  });

  it('config path extends', () => {
    var config = getConfig(path.join(DATA_DIR, 'extends', 'tsconfig.json'));
    assert.ok(config.path.startsWith(slash(DATA_DIR)));
    assert.equal(config.config.compilerOptions?.module, 'esnext');
  });
});

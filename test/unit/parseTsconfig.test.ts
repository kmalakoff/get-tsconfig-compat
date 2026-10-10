import assert from 'assert';
import * as getTS from 'get-tsconfig-compat';
import { DATA_DIR, getConfig } from '../lib/fixtures.ts';

describe('parseTsconfig', () => {
  it('parse', () => {
    var config = getConfig(DATA_DIR);
    assert.equal(config.config.compilerOptions?.module, 'system');
    var parsed = getTS.parseTsconfig(config.path);
    assert.equal(parsed.compilerOptions?.module, 'system');
  });
});

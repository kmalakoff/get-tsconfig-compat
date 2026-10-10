import assert from 'assert';
import * as getTS from 'get-tsconfig-compat';
import { DATA_DIR, getConfig } from '../lib/fixtures.ts';

describe('createPathsMatcher', () => {
  it('matcher', () => {
    var config = getConfig(DATA_DIR);
    assert.equal(config.config.compilerOptions?.module, 'system');
    var matcher = getTS.createPathsMatcher(config);
    assert.ok(matcher);
  });
});

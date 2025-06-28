import assert from 'assert';
// @ts-ignore
import * as getTS from 'get-tsconfig-compat';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('createPathsMatcher', () => {
  it('matcher', () => {
    var config = getTS.getTsconfig(DATA_DIR);
    assert.equal(config.config.compilerOptions.module, 'system');
    var matcher = getTS.createPathsMatcher(config);
    assert.ok(matcher);
  });
});

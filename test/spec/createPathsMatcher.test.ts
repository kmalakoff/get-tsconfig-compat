import assert from 'assert';
import path from 'path';
import url from 'url';

// @ts-ignore
import * as getTS from 'get-tsconfig-compat';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('createPathsMatcher', function () {
  it('matcher', function () {
    var config = getTS.getTsconfig(DATA_DIR);
    assert.equal(config.config.compilerOptions.module, 'System');
    var matcher = getTS.createPathsMatcher(config);
    assert.ok(matcher);
  });
});

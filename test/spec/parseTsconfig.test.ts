import assert from 'assert';
import path from 'path';
import url from 'url';

// @ts-ignore
import * as getTS from 'get-tsconfig-compat';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('parseTsconfig', function () {
  it('parse', function () {
    var config = getTS.getTsconfig(DATA_DIR);
    assert.equal(config.config.compilerOptions.module, 'System');
    var parsed = getTS.parseTsconfig(config.path);
    assert.equal(parsed.compilerOptions.module, 'System');
  });
});

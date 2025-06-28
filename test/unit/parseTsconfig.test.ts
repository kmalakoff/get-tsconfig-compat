import assert from 'assert';
// @ts-ignore
import * as getTS from 'get-tsconfig-compat';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

describe('parseTsconfig', () => {
  it('parse', () => {
    var config = getTS.getTsconfig(DATA_DIR);
    assert.equal(config.config.compilerOptions.module, 'system');
    var parsed = getTS.parseTsconfig(config.path);
    assert.equal(parsed.compilerOptions.module, 'system');
  });
});

## get-tsconfig-compat

Portable version of get-tsconfig for earlier versions of node.js

Supports Node.js 0.8 and later.

```sh
npm install get-tsconfig-compat
```

Find the nearest tsconfig for the current directory:

```js
var getTsconfig = require('get-tsconfig-compat').getTsconfig;
var result = getTsconfig(process.cwd());
if (result) console.log(result.path);
```

The package exports `getTsconfig`, `parseTsconfig`, `createPathsMatcher`, and `createFilesMatcher`. See the [upstream documentation](https://github.com/privatenumber/get-tsconfig) for these APIs.

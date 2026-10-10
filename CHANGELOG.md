# Changelog

## [2.1.4] - 2026-10-10

### Fixed

- Load the compatibility implementation on Node versions that cannot load upstream's `node:` imports, including Node 12, Node 13, early Node 14, and Node 15. ESM imports now use the same compatibility routing as CommonJS.

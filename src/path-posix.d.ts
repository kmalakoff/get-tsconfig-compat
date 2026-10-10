declare module 'path-posix' {
  import path from 'path';

  const pathPosix: Pick<typeof path.posix, 'resolve' | 'normalize' | 'isAbsolute' | 'join' | 'relative' | 'dirname' | 'basename' | 'extname' | 'format' | 'parse' | 'sep' | 'delimiter'>;
  export = pathPosix;
}

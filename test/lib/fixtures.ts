import { getTsconfig, type TsConfigResult } from 'get-tsconfig-compat';
import path from 'path';
import url from 'url';

const filename = typeof __filename !== 'undefined' ? __filename : (url as unknown as { fileURLToPath(url: string): string }).fileURLToPath((import.meta as { url: string }).url);
export const DATA_DIR = path.resolve(path.dirname(filename), '..', 'data');

export function getConfig(filepath: string): TsConfigResult {
  const config = getTsconfig(filepath);
  if (!config) throw new Error(`No tsconfig found for ${filepath}`);
  return config;
}

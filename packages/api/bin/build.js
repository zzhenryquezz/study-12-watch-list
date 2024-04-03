import { build } from 'esbuild';
import { createConfig } from '../esbuild.config.js';

await build(createConfig());
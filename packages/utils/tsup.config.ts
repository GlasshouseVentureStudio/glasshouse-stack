import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: ['src/index.ts', 'src/*.{ts,tsx}', '!src/*.stories.{ts,tsx}', 'src/**/*.{ts,tsx}'],
		format: ['cjs', 'esm'],
		outDir: 'dist',
		external: ['react'],
	},
]);

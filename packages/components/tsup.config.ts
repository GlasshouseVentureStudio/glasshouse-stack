import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: ['src/index.ts', 'src/**/index.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/types'],
		format: 'esm',
		outDir: 'dist/esm',
		external: ['react', 'react-dom'],
		loader: {
			'.css': 'local-css',
		},
		sourcemap: true,
		dts: true,
		minify: true,
	},
	{
		entry: ['src/index.ts', 'src/**/index.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/types'],
		format: 'cjs',
		outDir: 'dist/cjs',
		external: ['react', 'react-dom'],
		loader: {
			'.css': 'local-css',
		},
		sourcemap: true,
		dts: true,
		minify: true,
	},
]);

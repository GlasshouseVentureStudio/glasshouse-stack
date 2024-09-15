import { defineConfig } from 'tsup';

// export default defineConfig({
// 	entry: ['src/index.ts', 'src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/types'],
// 	format: ['cjs', 'esm'],
// 	outDir: 'dist',
// 	external: ['react', '@mantine/core', '@tanstack/react-query'],
// 	loader: {
// 		'.css': 'local-css',
// 	},
// 	sourcemap: true,
// });

export default defineConfig([
	{
		entry: ['src/index.ts', 'src/**/index.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/types'],
		format: 'cjs',
		outDir: 'dist/cjs',
		external: ['react'],
		loader: {
			'.css': 'local-css',
		},
		sourcemap: true,
		dts: true,
	},
	{
		entry: ['src/index.ts', 'src/**/index.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/types'],
		format: 'esm',
		outDir: 'dist/esm',
		external: ['react'],
		loader: {
			'.css': 'local-css',
		},
		sourcemap: true,
		dts: true,
	},
]);

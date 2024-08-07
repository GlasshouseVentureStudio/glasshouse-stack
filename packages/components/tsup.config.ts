import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', 'src/**/index.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/types'],
	format: ['cjs', 'esm'],
	outDir: 'dist',
	external: ['react', '@mantine/core', '@tanstack/react-query'],
	minify: true,
	sourcemap: true,
	metafile: true,
	loader: {
		'.css': 'local-css',
	},
});

import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', 'src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/types'],
	format: ['cjs', 'esm'],
	outDir: 'dist',
	external: ['react', '@mantine/core', '@tanstack/react-query'],
	loader: {
		'.css': 'local-css',
	},
});

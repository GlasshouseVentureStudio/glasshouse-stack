import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', '!src/**/*.stories.{ts,tsx}', '!src/types', '!src/grid-system/vercel'],
	format: ['cjs', 'esm'],
	outDir: 'dist',
	external: ['react', '@mantine/core', '@tanstack/react-query'],
});

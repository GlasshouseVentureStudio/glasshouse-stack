import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: ['src/client/index.ts', 'src/client/**/*.{ts,tsx}', '!src/client/**/*.stories.{ts,tsx}'],
		format: ['cjs', 'esm'],
		outDir: 'dist/client',
		banner: {
			js: "'use client'",
		},
		external: ['react', '@mantine/core', '@tanstack/react-query'],
	},
	{
		entry: ['src/server/index.ts', 'src/server/**/*.{ts,tsx}'],
		format: ['cjs', 'esm'],
		outDir: 'dist/server',
		external: ['react', '@mantine/core', '@tanstack/react-query'],
	},
]);

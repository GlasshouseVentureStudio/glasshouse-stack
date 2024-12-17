import { Linter } from 'eslint';

declare const gvseslint: {
	readonly meta: {
		readonly name: string;
		readonly version: string;
	};
	readonly configs: {
		readonly flat: {
			/** Base ESLint config for browser environment. */
			readonly browser: Linter.Config[];
			/** Base ESLint config for node environment. */
			readonly node: Linter.Config[];
			/** Recommended ESLint config for Next.js app development. */
			readonly next: Linter.Config[];
			/** Recommended ESLint config for React development. */
			readonly react: Linter.Config[];
			/** Recommended ESLint config for development with TypeScript. */
			readonly typescript: Linter.Config[];
		};
		readonly legacy: {
			readonly base: Linter.Config;
			readonly library: Linter.Config;
			readonly next: Linter.Config;
			readonly react: Linter.Config;
		};
	};
};

export = gvseslint;

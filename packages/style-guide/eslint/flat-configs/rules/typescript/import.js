/**
 * These are enabled by `import/recommended`, but are better handled by
 * TypeScript and @typescript-eslint.
 */
const disabledRules = {
	'import/default': 'off',
	'import/export': 'off',
	'import/namespace': 'off',
	'import/no-unresolved': 'off',
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
	rules: {
		...disabledRules,
	},
};

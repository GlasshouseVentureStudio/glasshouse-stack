/** @type {import('eslint').Linter.Config} */
module.exports = {
	rules: {
		'@eslint-community/eslint-comments/disable-enable-pair': 'off',
		/**
		 * Require comments on ESlint disable directives.
		 *
		 * 🚫 Not fixable - https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/require-description.html
		 */
		'@eslint-community/eslint-comments/require-description': 'error',
	},
};

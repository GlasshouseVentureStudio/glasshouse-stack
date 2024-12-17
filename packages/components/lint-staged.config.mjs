/** @type {import('lint-staged').Config} */
export default {
	'*.{ts,tsx}': filenames => [
		`eslint ${filenames.join(' ')} --fix --no-warn-ignored --max-warnings=0`,
		`prettier ${filenames.join(' ')} -w -u`,
	],
};

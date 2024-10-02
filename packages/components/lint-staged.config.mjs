export default {
	'*.{js,mjs,cjs,jsx,ts,tsx}': filenames => [
		`eslint ${filenames.join(' ')} --fix --max-warnings=0`,
		`prettier ${filenames.join(' ')} -w -u`,
	],
};

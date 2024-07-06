export default {
	'*.{js,mjs,cjs,jsx,ts,tsx}': filenames => [
		`eslint ${filenames.join(' ')} --fix`,
		`prettier ${filenames.join(' ')} --write`,
	],
};

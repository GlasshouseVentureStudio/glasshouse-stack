import { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.stories.{js,ts,jsx,tsx}',
		'./node_modules/@glasshouse/components/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

export default config;

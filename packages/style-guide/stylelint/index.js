module.exports = {
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-prettier-scss',
		'stylelint-config-sass-guidelines',
		'stylelint-config-rational-order',
	],
	rules: {
		'max-nesting-depth': [
			6,
			{
				ignoreAtRules: ['each', 'media', 'supports', 'include'],
			},
		],
		'selector-max-compound-selectors': 6,
		'custom-property-pattern': null,
		'selector-class-pattern': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind'],
			},
		],
		'selector-no-qualifying-type': null,
		'selector-max-id': 2,
	},
};

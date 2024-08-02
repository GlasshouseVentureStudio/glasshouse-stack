# ![GVSStack](../../assets/gvs-style-guide.svg)

This repository includes configs for popular linting and styling tools, extended from `@vercel/style-guide`. See [Vercel's style guide](https://github.com/vercel/style-guide).

The following configs are available:

- [ESLint](#eslint)
- [TypeScript](#typescript)
- [Prettier](#prettier)
- [Stylelint](#stylelint)

## Installation

All configs are contained in one package, `@glasshouse/style-guide`. To install:

```sh
# If you use npm
npm i --save-dev @glasshouse/style-guide

# If you use pnpm
pnpm i --save-dev @glasshouse/style-guide

# If you use Yarn
yarn add --dev @glasshouse/style-guide
```

## Prettier

> Note: Prettier is a peer-dependency of this package, and should be installed at the root of your project.
> See: [Install · Prettier](https://prettier.io/docs/en/install)

To use the shared Prettier config, set the following in `package.json`:

```
{
  "prettier": "@glasshouse/style-guide/prettier"
}
```

## ESLint

> Note: ESLint is a peer-dependency of this package, and should be installed at the root of your project.
>
> See: [Getting Started with ESLint - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/v8.x/use/getting-started)

All configs require `typescript` to be installed and [additional configuration](#configuring-eslint-for-typescript).

The following configs are available:

- `@glasshouse/style-guide/eslint/base`
- `@glasshouse/style-guide/eslint/library`
- `@glasshouse/style-guide/eslint/react`
- `@glasshouse/style-guide/eslint/next` (requires `@next/eslint-plugin-next` to be installed at the same version as `next`)

> You'll need to use `require.resolve` to provide ESLint with absolute paths, due to an issue around ESLint config resolution (see [eslint/eslint#9188](https://github.com/eslint/eslint/issues/9188)).

For example, use the `@glasshouse/style-guide/eslint/next` in a Next.js project, set the following in `.eslintrc.js` (or any other ESLint config file format):

```js
module.exports = {
	extends: [require.resolve('@glasshouse/style-guide/eslint/next')],
};
```

### Configuring ESLint for TypeScript

Some of the rules enabled in the TypeScript config require additional type information, you'll need to provide the path to your `tsconfig.json`.

For more information, see: https://typescript-eslint.io/docs/linting/type-linting

```js
const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
	root: true,
	extends: [require.resolve('glasshouse/style-guide/eslint/next')],
	parserOptions: {
		project,
	},
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
		},
	},
};
```

## TypeScript

This style guide provides multiple TypeScript configs for different project types.

To use the shared TypeScript config, set the following in `tsconfig.json`.

```json
{
	"extends": "@glasshouse/style-guide/typescript/react-library"
}
```

The base TypeScript config is also available as `@glasshouse/style-guide/typescript` which only specifies a set of general rules:

```json
{
	"extends": "@glasshouse/style-guide/typescript"
}
```

## Stylelint

> Note: Stylelint is a peer-dependency of this package, and should be installed at the root of your project.
>
> See: [Stylelint](https://stylelint.io/user-guide/get-started)

This style guide provides a shared Stylelint config with extended SCSS/SASS linting rules support.

To use this config, set the following in `stylelint.config.mjs` (or any other Stylelint [config file format](https://stylelint.io/user-guide/configure/)):

```js
/** @type {import('stylelint').Config} */
export default {
	extends: ['@glasshouse/style-guide/stylelint'],
};
```

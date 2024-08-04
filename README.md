# ![GVSStack](./assets/gvs-stack.svg)

[![Chromatic](https://img.shields.io/github/actions/workflow/status/GlasshouseVentureStudio/glasshouse-stack/chromatic.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=ffffff&label=Chromatic)](https://github.com/GlasshouseVentureStudio/glasshouse-stack/actions/workflows/chromatic.yml)
[![Release](https://img.shields.io/github/actions/workflow/status/GlasshouseVentureStudio/glasshouse-stack/release.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=ffffff&label=Release)](https://github.com/GlasshouseVentureStudio/glasshouse-stack/actions/workflows/release.yml)

This Turborepo is home to various libraries made by [Glasshouse](https://www.glasshouseventure.studio/) developers.

Versioning and package publishing is handled by [Changesets](https://github.com/changesets/changesets) and fully automated with GitHub Actions.

## What's inside?

[![NPM Version](https://img.shields.io/npm/v/%40glasshouse%2Fcomponents?style=for-the-badge&label=components)](https://www.npmjs.com/package/@glasshouse/components)
[![NPM Version](https://img.shields.io/npm/v/%40glasshouse%2Futils?style=for-the-badge&label=utils)](https://www.npmjs.com/package/@glasshouse/utils)
[![NPM Version](https://img.shields.io/npm/v/%40glasshouse%2Fstyle-guide?style=for-the-badge&label=style-guide)](https://www.npmjs.com/package/@glasshouse/style-guide)

This Turborepo includes the following:

### Apps and Packages

- `@glasshouse/docs`: A placeholder documentation site powered by [Storybook](https://storybook.js.org/)
- `@glasshouse/demo`: A placeholder demo site powered by [Next.js](https://nextjs.org/)
- `@glasshouse/components`: core React components
- `@glasshouse/utils`: shared React utilities
- `@glasshouse/style-guide`: shared configs package used throughout the monorepo, included configs: `typescript`, `eslint`, `prettier`, `stylelint`

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [StyleLint](https://stylelint.io/) for CSS formatting

### Useful commands

- `pnpm build` - Build all packages and the docs site
- `pnpm dev` - Develop all packages and the docs site
- `pnpm lint` - Lint all packages
- `pnpm changeset` - Generate a changeset
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Versioning and Publishing packages

Package publishing has been configured using [Changesets](https://github.com/changesets/changesets). Please review their [documentation](https://github.com/changesets/changesets#documentation) to familiarize yourself with the workflow.

This example comes with automated npm releases setup in a [GitHub Action](https://github.com/changesets/action).

For more information about this automation, refer to the official [changesets documentation](https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md)

### npm

If you want to publish package to the public npm registry and make them publicly available, this is already setup.

### GitHub Package Registry

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package-using-publishconfig-in-the-packagejson-file)

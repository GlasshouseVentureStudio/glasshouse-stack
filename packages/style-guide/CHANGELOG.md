# @glasshouse/style-guide

## 1.0.2

### Patch Changes

- Fix variable is not defined

## 1.0.1

### Patch Changes

- Update/disable some linting rules

## 1.0.0

### Major Changes

- eslint 9 migration, convert legacy eslint configs to new flat config format

> :warning: **BREAKING CHANGE**:
>
> - ESLint minimum version is now `9.0.0`.
> - Refactored configs using new flat config [format](https://eslint.org/blog/2022/08/new-config-system-part-2/#main).
> - Moved all configs into a single object default export. You can now import new flat configs by the example below.
>
> ```js
> import gvseslint from '@glasshouse/style-guide/eslint
>
> export default [
> 	...gvseslint.configs.flat.node,
> ]
> ```
>
> - Read more in `README`

## 0.3.1

### Patch Changes

- Fix minor code style errors

## 0.3.0

### Minor Changes

- Bump dependencies version, raise React minimum version to 19 and Next's to 15

## 0.2.0

### Minor Changes

- Add additional stylelint rules

## 0.1.7

### Patch Changes

- Add tanstack query eslint plugin

## 0.1.6

### Patch Changes

- Update package info

## 0.1.5

### Patch Changes

- Bump dependencies version

## 0.1.4

### Patch Changes

- Add missing `eslint-plugin-simple-import-sort` package and use commonjs export for prettier.

## 0.1.3

### Patch Changes

- Update readme

## 0.1.2

### Patch Changes

- Remove eslint-config-turbo

## 0.1.1

### Patch Changes

- Minor tweaks

## 0.1.0

### Minor Changes

- ESLint configs release.
- TypeScript configs release.
- Prettier config release.
- Stylelint config release.

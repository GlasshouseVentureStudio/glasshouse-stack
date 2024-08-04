# ![GVSComponents](./gvs-components.svg)

[![Storybook](https://img.shields.io/badge/storybook-storybook?style=for-the-badge&logo=storybook&logoColor=ffffff&color=ff4785)](https://main--668b65bdcf16256d1a25e70c.chromatic.com)
[![Chromatic Library](https://img.shields.io/badge/chromatic%20library-chromatic?style=for-the-badge&logo=chromatic&logoColor=ffffff&color=fc521f)](https://www.chromatic.com/library?appId=668b65bdcf16256d1a25e70c&branch=main)

This package contains the core React components used by Glasshouse developers.

## Installation

To install the `@glasshouse/components` package, use your preferred package manager:

```sh
# If you use npm
npm install @glasshouse/components

# If you use pnpm
pnpm add @glasshouse/components

# If you use Yarn
yarn add @glasshouse/components
```

## Usage

Import the components you need from the `@glasshouse/components` package:

```ts
import { Grid } from '@glasshouse/components';

const App = () => (
  <div>
    <Grid>
      <Grid.Cell>I am a Grid Cell</Grid.Cell>
    </Grid>
  </div>
);

export default App;
```

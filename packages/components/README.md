# ![GVSComponents](./gvs-components.svg)

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

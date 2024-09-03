import { createSafeContext, type GetStylesApi, type StyleProp } from '@mantine/core';

import { type GridFactory } from './grid.types';

interface GridContextValue {
	getStyles: GetStylesApi<GridFactory>;
	/**
	 * Number of columns in the grid.
	 */
	columns: StyleProp<number>;
	/**
	 * Number of rows in the grid.
	 */
	rows: StyleProp<number>;
}

export const [GridProvider, useGridContext] = createSafeContext<GridContextValue>(
	'Grid component was not found in tree'
);

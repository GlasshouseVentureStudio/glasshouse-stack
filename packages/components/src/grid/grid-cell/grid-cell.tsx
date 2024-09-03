import { cn } from '@glasshouse/utils';
import { Box, polymorphicFactory, useProps, useRandomClassName } from '@mantine/core';

import { useGridContext } from '../grid.context';
import { type GridCellFactory, type GridCellProps } from './grid-cell.types';
import { GridCellVariables } from './grid-cell.variables';

const defaultProps: Partial<GridCellProps> = {};

/**
 * Renders a grid cell component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the grid cell.
 * @param {string} props.className - The additional CSS class name for the grid cell.
 * @param {number} props.column - The column index of the grid cell.
 * @param {number} props.row - The row index of the grid cell.
 * @returns {JSX.Element} The rendered grid cell component.
 */
export const GridCell = polymorphicFactory<GridCellFactory>((_props, ref) => {
	const props = useProps('GridCell', defaultProps, _props);
	const { className, column, row, ...others } = props;

	const ctx = useGridContext();

	const responsiveClassName = useRandomClassName();

	return (
		<>
			<GridCellVariables
				column={column}
				row={row}
				selector={`.${responsiveClassName}`}
			/>
			<Box
				ref={ref}
				{...ctx.getStyles('cell', {
					className: cn(className, responsiveClassName),
				})}
				{...others}
			/>
		</>
	);
});

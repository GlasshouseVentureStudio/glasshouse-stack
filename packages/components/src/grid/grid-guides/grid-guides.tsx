import { Box, factory, useProps } from '@mantine/core';

import { useGridContext } from '../grid.context';
import { GridGuide } from './grid-guide';
import { type GridGuidesFactory, type GridGuidesProps } from './grid-guides.types';

const defaultProps: Partial<GridGuidesProps> = {};

/**
 * Renders a grid guide component.
 */
export const GridGuides = factory<GridGuidesFactory>((_props, ref) => {
	const props = useProps('GridGuides', defaultProps, _props);
	const {
		className,
		style,
		styles,
		classNames,
		columns,
		rows,
		hideGuides,
		clipSpans,
		hiddenFrom,
		visibleFrom,
		...others
	} = props;

	const hideAllGuides = typeof hideGuides === 'boolean' && hideGuides;
	const hideColumnGuides = hideAllGuides || hideGuides === 'column';
	const hideRowGuides = hideAllGuides || hideGuides === 'row';

	const ctx = useGridContext();

	return (
		<Box
			ref={ref}
			{...ctx.getStyles('guides', { className, classNames, style, styles })}
			{...others}
		>
			{Array.from({ length: rows * columns }, (_, index) => {
				const columnIndex = index % columns;
				const rowIndex = Math.floor(index / columns);

				const hideRightBorder =
					columnIndex === columns - 1 ||
					hideColumnGuides ||
					clipSpans.some(span => {
						return (
							(span.column?.[0] ?? 1) <= columnIndex + 1 &&
							(span.column?.[1] ?? 1) > columnIndex + 2 &&
							(span.row?.[0] ?? 1) <= rowIndex + 1 &&
							(span.row?.[1] ?? 1) > rowIndex + 1
						);
					});
				const hideBottomBorder =
					rowIndex === rows - 1 ||
					hideRowGuides ||
					clipSpans.some(
						span =>
							(span.column?.[0] ?? 1) <= columnIndex + 1 &&
							(span.column?.[1] ?? 1) > columnIndex + 1 &&
							(span.row?.[0] ?? 1) <= rowIndex + 1 &&
							(span.row?.[1] ?? 1) > rowIndex + 2
					);

				return (
					<GridGuide
						key={index}
						className={className}
						columnIndex={columnIndex}
						hiddenFrom={hiddenFrom}
						hideBottomBorder={hideBottomBorder}
						hideRightBorder={hideRightBorder}
						index={index}
						rowIndex={rowIndex}
						visibleFrom={visibleFrom}
					/>
				);
			})}
		</Box>
	);
});

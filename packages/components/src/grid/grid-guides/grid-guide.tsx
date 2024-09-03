import { Box, factory, useProps } from '@mantine/core';

import { useGridContext } from '../grid.context';
import { type GridGuideFactory, type GridGuideProps } from './grid-guides.types';

const defaultProps: Partial<GridGuideProps> = {};

/**
 * Renders a grid guide block.
 */
export const GridGuide = factory<GridGuideFactory>((_props, ref) => {
	const props = useProps('GridGuide', defaultProps, _props);

	const {
		className,
		classNames,
		style,
		styles,
		columnIndex,
		rowIndex,
		hideRightBorder,
		hideBottomBorder,
		mod,
		...others
	} = props;

	const context = useGridContext();

	return (
		<Box
			ref={ref}
			mod={[
				{
					'column-index': columnIndex + 1,
					'hide-bottom-border': hideBottomBorder,
					'hide-right-border': hideRightBorder,
					'row-index': rowIndex + 1,
					mod,
				},
			]}
			{...context.getStyles('guide', { className, classNames, style, styles })}
			style={{
				...context.getStyles('guide', { className, classNames, style, styles }).style,
				'--x': columnIndex + 1,
				'--y': rowIndex + 1,
			}}
			{...others}
		/>
	);
});

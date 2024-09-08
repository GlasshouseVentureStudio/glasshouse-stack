'use client';

import { Box, factory, rem, useProps } from '@mantine/core';

import { useListContext } from '../list.context';
import { type ListItemFactory, type ListItemProps } from './list-item.types';

const defaultProps: Partial<ListItemProps> = {};

export const ListItem = factory<ListItemFactory>((_props, ref) => {
	const props = useProps('ListItem', defaultProps, _props);

	const {
		classNames,
		className,
		style,
		styles,
		mod,
		virtualRow,
		active,
		children,
		orientation,
		withItemBorder,
		virtualized,
		...others
	} = props;

	const { getStyles } = useListContext();

	const infiniteStyle = virtualized ? { '--list-item-start': rem(virtualRow?.start) } : {};

	const elementStyles = getStyles('item', {
		className,
		classNames,
		style: {
			...infiniteStyle,
			...style,
		},
		styles,
	});

	return (
		<Box
			ref={ref}
			component='li'
			mod={[
				{
					orientation,
					active,
					virtualized,
					'with-item-border': withItemBorder,
				},
				mod,
			]}
			{...elementStyles}
			{...others}
		>
			{children}
		</Box>
	);
});

ListItem.displayName = 'ListItem';

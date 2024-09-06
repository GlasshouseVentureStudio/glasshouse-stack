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
		...others
	} = props;

	const { getStyles } = useListContext();

	return (
		<Box
			ref={ref}
			component='li'
			mod={[
				{
					orientation,
					active,
					'with-item-border': withItemBorder,
				},
				mod,
			]}
			{...getStyles('item', {
				className,
				classNames,
				style: {
					'--list-item-start': rem(virtualRow.start),
					...style,
				},
				styles,
			})}
			{...others}
		>
			{children}
		</Box>
	);
});

ListItem.displayName = 'ListItem';

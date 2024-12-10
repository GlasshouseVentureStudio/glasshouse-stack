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
		measureElement,
		...others
	} = props;

	const { getStyles } = useListContext();

	const virtualizedStyles = virtualized ? { '--list-item-start': rem(virtualRow?.start) } : {};

	const elementStyles = getStyles('item', {
		className,
		classNames,
		style: {
			...virtualizedStyles,
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
					index: virtualRow?.index,
					orientation,
					active,
					virtualized,
					'with-item-border': withItemBorder,
					'measure-element': measureElement,
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

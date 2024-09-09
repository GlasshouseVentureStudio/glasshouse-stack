'use client';

import { Box, polymorphicFactory, rem, useProps } from '@mantine/core';

import { useListContext } from '../list.context';
import { type ListGroupHeaderFactory } from './list-group-header.types';

export const ListGroupHeader = polymorphicFactory<ListGroupHeaderFactory>((_props, ref) => {
	const props = useProps('ListGroupHeader', {}, _props);

	const {
		className,
		classNames,
		style,
		styles,
		children,
		orientation,
		sticky,
		withItemBorder,
		mod,
		virtualRow,
		virtualized,
		...others
	} = props;

	const { getStyles } = useListContext();

	const virtualizedStyles = virtualized ? { '--list-item-start': rem(virtualRow?.start) } : {};

	const elementStyles = getStyles('groupHeader', {
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
					orientation,
					sticky,
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

ListGroupHeader.displayName = 'ListGroupHeader';

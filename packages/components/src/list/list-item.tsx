'use client';

import { forwardRef } from 'react';
import { cn } from '@glasshouse/utils';
import { Box } from '@mantine/core';

import { type ListItemProps } from './list.types';

const ListItemInner = (
	{ className, virtualRow, active, children, component = 'li', ...props }: ListItemProps,
	ref: React.ForwardedRef<HTMLLIElement>
) => {
	return (
		<Box
			ref={ref}
			className={cn(className, 'absolute')}
			component={component}
			data-active={active}
			style={{ '--translate': `${virtualRow.start}px` }}
			{...props}
		>
			{children}
		</Box>
	);
};

export const ListItem = forwardRef(ListItemInner);

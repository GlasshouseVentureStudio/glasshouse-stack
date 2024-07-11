import { forwardRef } from 'react';
import { Box } from '@mantine/core';

import { type ListItemProps } from './list.types';

const ListItemInner = (
	{ className, virtualRow, active, children, component = 'li', ...props }: ListItemProps,
	ref: React.ForwardedRef<HTMLLIElement>
) => {
	return (
		<Box
			ref={ref}
			className={className}
			component={component}
			data-active={active}
			style={{
				'--translate-y': `${virtualRow.start}px`,
			}}
			{...props}
		>
			{children}
		</Box>
	);
};

export const ListItem = forwardRef(ListItemInner);

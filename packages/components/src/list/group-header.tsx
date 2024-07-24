import { forwardRef } from 'react';
import { Box } from '@mantine/core';

import { type ListGroupHeaderProps } from './list.types';

export const ListGroupHeaderInner = (
	{ className, children, orientation, virtualRow, isSticky, isActiveSticky, ...props }: ListGroupHeaderProps,
	ref: React.ForwardedRef<HTMLLIElement>
) => {
	return (
		<Box
			ref={ref}
			className={className}
			component='li'
			style={{
				...(isSticky(virtualRow.index)
					? {
							zIndex: 10,
						}
					: {}),
				...(isActiveSticky(virtualRow.index)
					? {
							position: 'sticky',
						}
					: {
							position: 'absolute',
							transform:
								orientation === 'vertical' ? `translateY(${virtualRow.start}px)` : `translateX(${virtualRow.start}px)`,
						}),
			}}
			{...props}
		>
			{children}
		</Box>
	);
};

export const ListGroupHeader = forwardRef(ListGroupHeaderInner);

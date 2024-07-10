/* eslint-disable @typescript-eslint/no-unnecessary-qualifier -- Necessary */
import * as React from 'react';
import { forwardRef } from 'react';
import { Box, ScrollArea } from '@mantine/core';
import cx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { list } from './list.styles.js';
import { type ListProps } from './list.types';

declare module 'react' {
	function forwardRef<T, P extends object>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
	): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

const ListInner = <T,>(props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
	const {
		className,
		classNames,
		data,
		renderItem,
		itemKey,
		getActiveItem,
		getItemLabel,
		onItemClick,
		bordered,
		listClassNames,
		...rest
	} = props;
	const { root, item: itemStyles, list: listStyles } = list({ bordered });

	const baseStyles = twMerge(cx(className, classNames?.root));

	const getInnerLabel = (item: T, index: number) => {
		if (getItemLabel) {
			return getItemLabel(item, index);
		}

		if (typeof item === 'string') {
			return item;
		}

		return null;
	};

	const renderInnerItem = (item: T, index: number) => {
		let key: string | number | undefined;

		if (typeof itemKey === 'function') {
			key = itemKey(item, index);
		} else if (itemKey) {
			key = item[itemKey] as string | number;
		}

		if (!key) {
			key = `list-item-${index}`;
		}

		if (renderItem) {
			return <React.Fragment key={key}>{renderItem(item, index)}</React.Fragment>;
		}

		return (
			<Box
				component='li'
				className={itemStyles({ className: classNames?.item })}
				key={key}
				onClick={event => onItemClick?.(event, item, index)}
				data-active={getActiveItem?.(item, index)}
			>
				{getInnerLabel(item, index)}
			</Box>
		);
	};

	const items = data.map((item, index) => renderInnerItem(item, index));

	return (
		<ScrollArea
			ref={ref}
			className={root({ className: baseStyles })}
			classNames={listClassNames}
			{...rest}
		>
			<Box
				component='ul'
				className={listStyles({ className: classNames?.list })}
			>
				{items}
			</Box>
		</ScrollArea>
	);
};

/**
 * A component that renders a list of items.
 */
export const List = forwardRef(ListInner);

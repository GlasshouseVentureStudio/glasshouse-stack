/* eslint-disable @typescript-eslint/no-unnecessary-qualifier -- Necessary */
import { forwardRef, useCallback, useRef } from 'react';
import { cn } from '@glasshouse/utils';
import { Box, LoadingOverlay, ScrollArea } from '@mantine/core';
import { defaultRangeExtractor, type Range, useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import cx from 'clsx';
import findIndex from 'lodash.findindex';
import map from 'lodash.map';
import { twMerge } from 'tailwind-merge';

import { list } from './list.styles.js';
import { instanceOfListGroupHeader, type ListGroupHeader, type ListProps } from './list.types';

declare module 'react' {
	function forwardRef<T, P extends object>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
	): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

const ListInner = <T extends object>(props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
	const {
		className,
		classNames,
		data: externalData,
		renderItem,
		itemKey,
		getActiveItem,
		onItemClick,
		bordered,
		scrollAreaClassNames,
		viewportProps,
		estimateItemSize = () => 40,
		estimateGroupHeaderSize = () => 20,
		header,
		footer,
		stickyHeader,
		stickyFooter,
		loading,
		renderGroupHeader,
		groupByFn,
		stickyGroupHeader,
		orientation = 'vertical',
		...rest
	} = props;

	const { root, item: itemStyles, list: listStyles } = list({ bordered, stickyHeader, stickyFooter, orientation });

	const baseStyles = twMerge(cx(className, classNames?.root));

	const grouped = groupByFn?.(externalData) ?? {};
	const groups = Object.keys(grouped);

	const data = groupByFn
		? map(groupByFn(externalData), (value, key) => [
				{ title: key, items: value, type: 'group-header' } as ListGroupHeader<T>,
				...value,
			]).flat()
		: externalData;

	const activeStickyIndexRef = useRef(0);

	const groupHeaderIndexes = groups.map(group =>
		findIndex(data, item => instanceOfListGroupHeader(item) && item.title === group)
	);

	const isSticky = (index: number) => groupHeaderIndexes.includes(index);

	const isActiveSticky = (index: number) => activeStickyIndexRef.current === index && stickyGroupHeader;

	const renderInnerItem = (item: T | ListGroupHeader<T>, index: number, virtualRow: VirtualItem<Element>) => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `renderItem` is required
		if (!renderItem) {
			throw new Error('List: `renderItem` is required');
		}

		let key: string | number | undefined;

		if (instanceOfListGroupHeader(item)) {
			key = item.title;
		} else if (typeof itemKey === 'function') {
			key = itemKey(item, index);
		} else if (itemKey) {
			key = item[itemKey] as string | number;
		}

		if (!key) {
			key = `list-item-${index}`;
		}

		if (instanceOfListGroupHeader(item)) {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `renderGroupHeader` is required
			if (!renderGroupHeader) throw new Error('List: `renderGroupHeader` is required.');

			return (
				<Box
					key={key}
					className={itemStyles({ className: cn(classNames?.item) })}
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
										orientation === 'vertical'
											? `translateY(${virtualRow.start}px)`
											: `translateX(${virtualRow.start}px)`,
								}),
					}}
				>
					{renderGroupHeader(item.title)}
				</Box>
			);
		}

		return (
			<Box
				key={key}
				className={itemStyles({ className: cn(classNames?.item, 'absolute') })}
				component='li'
				data-active={getActiveItem?.(item, index)}
				onClick={event => onItemClick?.(event, item, index)}
				style={{ '--translate': `${virtualRow.start}px` }}
			>
				{renderItem(item, index, { '--translate': `${virtualRow.start}px` })}
			</Box>
		);
	};

	const scrollRef = useRef<HTMLDivElement>(null);

	const rangeExtractor = useCallback(
		(range: Range) => {
			activeStickyIndexRef.current = [...groupHeaderIndexes].reverse().find(index => range.startIndex >= index) ?? 0;

			const next = new Set([activeStickyIndexRef.current, ...defaultRangeExtractor(range)]);

			return [...next].sort((a, b) => a - b);
		},
		[groupHeaderIndexes]
	);

	const rowVirtualizer = useVirtualizer({
		horizontal: orientation === 'horizontal',
		count: data.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: index => {
			if (groupHeaderIndexes.includes(index)) {
				return estimateGroupHeaderSize(index);
			}

			return estimateItemSize(index);
		},
		overscan: 5,
		rangeExtractor,
	});

	const items = rowVirtualizer.getVirtualItems().map(row => renderInnerItem(data[row.index] as T, row.index, row));

	return (
		<ScrollArea
			ref={ref}
			className={root({ className: baseStyles })}
			classNames={scrollAreaClassNames}
			viewportProps={viewportProps}
			viewportRef={scrollRef}
			{...rest}
		>
			<LoadingOverlay visible={loading} />
			{header ? <Box>{header}</Box> : null}
			<Box
				className={listStyles({ className: classNames?.list })}
				component='ul'
				style={{ '--list-size': `${rowVirtualizer.getTotalSize()}px` }}
			>
				{items}
			</Box>
			{footer ? <Box>{footer}</Box> : null}
		</ScrollArea>
	);
};

/**
 * A component that renders a list of items.
 */
export const List = forwardRef(ListInner);

/* eslint-disable @typescript-eslint/no-unnecessary-qualifier -- Necessary */
import { forwardRef, useCallback, useRef, useState } from 'react';
import { Box, LoadingOverlay, Pagination, ScrollArea, Stack, Text } from '@mantine/core';
import { defaultRangeExtractor, type Range, useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import cx from 'clsx';
import findIndex from 'lodash.findindex';
import map from 'lodash.map';
import omit from 'lodash.omit';
import { twMerge } from 'tailwind-merge';

import { ListGroupHeader } from './group-header';
import { list } from './list.styles.js';
import { type ListGroupHeaderType, type ListProps } from './list.types';
import { isListGroupHeader } from './list.utils';
import { ListItem } from './list-item';

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
		getActiveItem: getActiveItemProp,
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
		selectable,
		value: valueProp,
		onChange,
		renderLoader,
		renderEmpty,
		pagination,
		...rest
	} = props;

	const {
		root,
		scrollArea,
		item: itemStyles,
		list: listStyles,
		header: headerStyles,
		footer: footerStyles,
		empty,
		loader,
		pagination: paginationStyles,
	} = list({ bordered, stickyHeader, stickyFooter, orientation });

	const baseStyles = twMerge(cx(className, classNames?.root));

	// =============== Handle selection =============== //
	const [value, setValue] = useState<T | T[] | undefined>(valueProp);

	const realValue = valueProp ? valueProp : value;

	const handleItemClick = useCallback(
		(event: React.MouseEvent, item: T, index: number) => {
			onItemClick?.(event, item, index);

			if (selectable) {
				onChange?.(item);
				setValue(prev => (prev === item ? undefined : item));
			}
		},
		[onItemClick, selectable, onChange]
	);

	const getInnerActiveItem = useCallback((item: T) => item === realValue, [realValue]);

	const getActiveItem = getActiveItemProp ?? getInnerActiveItem;
	// =============== Handle selection =============== //

	// =============== Handle data items =============== //
	const grouped = groupByFn?.(externalData) ?? {};

	const groups = Object.keys(grouped);

	const data = groupByFn
		? map(groupByFn(externalData), (value, key) => [
				{ title: key, items: value, type: 'group-header' } as ListGroupHeaderType<T>,
				...value,
			]).flat()
		: externalData;

	const activeStickyIndexRef = useRef(0);

	const groupHeaderIndexes = groups.map(group =>
		findIndex(data, item => isListGroupHeader(item) && item.title === group)
	);

	const isSticky = (index: number) => groupHeaderIndexes.includes(index);

	const isActiveSticky = (index: number) => activeStickyIndexRef.current === index && stickyGroupHeader;

	const renderInnerItem = (item: T | ListGroupHeaderType<T>, index: number, virtualRow: VirtualItem<Element>) => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `renderItem` is required
		if (!renderItem) {
			throw new Error('List: `renderItem` is required');
		}

		let key: string | number | undefined;

		if (isListGroupHeader(item)) {
			key = item.title;
		} else if (typeof itemKey === 'function') {
			key = itemKey(item, index);
		} else if (itemKey) {
			key = item[itemKey] as string | number;
		}

		if (!key) {
			key = `list-item-${index}`;
		}

		if (isListGroupHeader(item)) {
			if (!renderGroupHeader) throw new Error('List: `renderGroupHeader` is required.');

			return (
				<ListGroupHeader
					key={key}
					className={itemStyles({ className: classNames?.item })}
					isActiveSticky={isActiveSticky}
					isSticky={isSticky}
					orientation={orientation}
					virtualRow={virtualRow}
				>
					{renderGroupHeader(item)}
				</ListGroupHeader>
			);
		}

		return (
			<ListItem
				key={key}
				active={getActiveItem(item, index)}
				className={itemStyles({ className: classNames?.item })}
				virtualRow={virtualRow}
				onClick={event => {
					handleItemClick(event, item, index);
				}}
			>
				{renderItem(item, index, getActiveItem(item, index))}
			</ListItem>
		);
	};
	// =============== Handle data items =============== //

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
				return estimateGroupHeaderSize(data[index] as ListGroupHeaderType<T>, index);
			}

			return estimateItemSize(data[index] as T, index);
		},
		overscan: 5,
		rangeExtractor,
	});

	const items = rowVirtualizer.getVirtualItems().map(row => renderInnerItem(data[row.index] as T, row.index, row));

	const renderInnerLoader = () => {
		if (renderLoader) {
			if (loading) return <Box className={loader({ className: classNames?.loader })}>{renderLoader()}</Box>;

			return null;
		}

		return <LoadingOverlay visible={loading} />;
	};

	const renderInnerEmpty = () => {
		if (renderEmpty) return renderEmpty();

		return <Text>No items</Text>;
	};

	const childrenContent = items.length ? (
		<Box
			className={listStyles({ className: classNames?.list })}
			component='ul'
			style={{ '--list-size': `${rowVirtualizer.getTotalSize()}px` }}
		>
			{items}
		</Box>
	) : (
		<Box className={empty({ className: classNames?.empty })}>{renderInnerEmpty()}</Box>
	);

	const paginationPosition = pagination?.position ?? 'bottom';

	const paginationContent = pagination ? (
		<Box className={paginationStyles({ className: classNames?.pagination })}>
			<Pagination {...pagination} />
		</Box>
	) : null;

	return (
		<Stack className={root({ className: baseStyles })}>
			{paginationPosition === 'top' ? paginationContent : null}
			<ScrollArea
				ref={ref}
				className={scrollArea({ className: classNames?.scrollArea })}
				classNames={scrollAreaClassNames}
				viewportRef={scrollRef}
				viewportProps={{
					...viewportProps,
					tabIndex: 0,
				}}
				{...omit(rest, 'onChange', 'value')}
			>
				{renderInnerLoader()}
				{header ? <Box className={headerStyles({ className: classNames?.header })}>{header}</Box> : null}
				{childrenContent}
				{footer ? <Box className={footerStyles({ className: classNames?.footer })}>{footer}</Box> : null}
			</ScrollArea>
			{paginationPosition === 'bottom' ? paginationContent : null}
		</Stack>
	);
};

/**
 * A component that renders a list of items.
 */
export const List = forwardRef(ListInner);

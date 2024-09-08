'use client';

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	Box,
	createVarsResolver,
	getRadius,
	type GetStylesApi,
	Loader,
	LoadingOverlay,
	Pagination,
	rem,
	Text,
	useProps,
	useStyles,
} from '@mantine/core';
import { defaultRangeExtractor, type Range, useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import findIndex from 'lodash.findindex';
import map from 'lodash.map';

import { ScrollShadow } from '../scroll-shadow';
import { ListProvider } from './list.context';
import { type ListFactory, type ListGroupHeaderType, type ListProps } from './list.types';
import { isListGroupHeader } from './list.utils';
import { ListGroupHeader } from './list-group-header';
import { ListItem } from './list-item';

import classes from './list.module.css';

const varsResolver = <T extends object>() =>
	createVarsResolver<ListFactory<T>>((_, { radius }) => ({
		root: {
			'--list-radius': radius ? getRadius(radius) : undefined,
		},
	}));

/**
 * Renders a list component with various features such as selection, grouping, pagination, and virtualization.
 *
 * @template T - The type of the items in the list.
 * @param _props - The props for the list component.
 * @param ref - The ref for the list component.
 * @returns The rendered list component.
 */
const ListInner = <T extends object>(_props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
	const props = useProps('List', {}, _props);

	const {
		className,
		classNames,
		data: externalData,
		renderItem,
		itemKey,
		getActiveItem: getActiveItemProp,
		onItemClick,
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
		onEndReached,
		bottomLoaderProps = {
			type: 'dots',
		},
		bottomLoading,
		onEndReachedThreshold = '256px',
		infinite = true,
		withBorder = true,
		withItemBorder = true,
		vars,
		scrollShadowProps,
		style,
		styles,
		virtualized = true,
		...rest
	} = props;

	const getStyles = useStyles<ListFactory<T>>({
		name: 'List',
		props,
		classes,
		className,
		classNames,
		style,
		styles,
		vars,
		varsResolver: varsResolver<T>(),
	});

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

	const isActiveSticky = useCallback(
		(index: number) => activeStickyIndexRef.current === index && stickyGroupHeader,
		[stickyGroupHeader]
	);

	const renderInnerItem = useCallback(
		(item: T | ListGroupHeaderType<T>, index: number, virtualRow?: VirtualItem) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `renderItem` is required
			if (!renderItem) {
				throw new Error('List: `renderItem` is required');
			}

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `estimateItemSize` is required
			if (virtualized && !estimateItemSize) {
				throw new Error('List: `estimateItemSize` is required for `infinite` is `true`');
			}

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `estimateGroupHeaderSize` is required
			if (virtualized && groupByFn && !estimateGroupHeaderSize) {
				throw new Error(
					'List: `estimateGroupHeaderSize` is required for `infinite` is `true` and `groupByFn` is defined'
				);
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
				const index = virtualRow?.index ?? 0;

				return (
					<ListGroupHeader
						key={key}
						orientation={orientation}
						sticky={isActiveSticky(index)}
						virtualized={virtualized}
						virtualRow={virtualRow}
						withItemBorder={withItemBorder}
					>
						{renderGroupHeader?.(item)}
					</ListGroupHeader>
				);
			}

			return (
				<ListItem
					key={key}
					active={getActiveItem(item, index)}
					onClick={event => {
						handleItemClick(event, item, index);
					}}
					orientation={orientation}
					virtualized={virtualized}
					virtualRow={virtualRow}
					withItemBorder={withItemBorder}
				>
					{renderItem(item, index, getActiveItem(item, index))}
				</ListItem>
			);
		},
		[
			estimateGroupHeaderSize,
			estimateItemSize,
			getActiveItem,
			groupByFn,
			handleItemClick,
			isActiveSticky,
			itemKey,
			orientation,
			renderGroupHeader,
			renderItem,
			virtualized,
			withItemBorder,
		]
	);
	// =============== Handle data items =============== //

	const scrollRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

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

	const listSize = rowVirtualizer.getTotalSize();

	const virtualizedItems = useMemo(
		() => rowVirtualizer.getVirtualItems().map(row => renderInnerItem(data[row.index] as T, row.index, row)),
		[data, renderInnerItem, rowVirtualizer]
	);

	const items = useMemo(
		() => (virtualized ? virtualizedItems : data.map((item, index) => renderInnerItem(item, index))),
		[data, renderInnerItem, virtualized, virtualizedItems]
	);

	const isEmpty = !items.length;

	const renderInnerLoader = () => {
		if (renderLoader) {
			if (loading) return <Box {...getStyles('loader')}>{renderLoader()}</Box>;

			return null;
		}

		return (
			<LoadingOverlay
				{...getStyles('loader')}
				visible={loading}
			/>
		);
	};

	const renderInnerEmpty = () => {
		if (loading) return null;

		if (renderEmpty) return renderEmpty();

		return <Text>No items</Text>;
	};

	const paginationPosition = pagination?.position ?? 'bottom';

	const paginationContent = pagination ? (
		<Box {...getStyles('paginationWrapper')}>
			<Pagination {...pagination} />
		</Box>
	) : null;

	/**
	 * Handle on end reached.
	 */
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const target = entries[0];

				if (target?.isIntersecting) onEndReached?.();
			},
			{
				root: scrollRef.current,
				rootMargin: onEndReachedThreshold,
			}
		);

		const loader = bottomRef.current;

		if (loader) {
			observer.observe(loader);
		}

		return () => {
			if (loader) {
				observer.unobserve(loader);
			}
		};
	}, [onEndReached, onEndReachedThreshold]);

	const bottomContent = bottomLoading ? (
		<Box {...getStyles('bottomLoaderWrapper')}>
			<Loader {...bottomLoaderProps} />
		</Box>
	) : null;

	const headerContent = header ? (
		<Box
			mod={{
				orientation,
				'sticky-header': stickyHeader,
			}}
			{...getStyles('header')}
		>
			{header}
		</Box>
	) : null;

	const footerContent = footer ? (
		<Box
			mod={{
				orientation,
				'sticky-footer': stickyFooter,
			}}
			{...getStyles('footer')}
		>
			{footer}
		</Box>
	) : null;

	const listVirtualizedStyles = virtualized ? { '--list-size': rem(listSize) } : {};
	const listStyles = getStyles('list', {
		style: listVirtualizedStyles,
	});

	return (
		<ListProvider value={{ getStyles: getStyles as unknown as GetStylesApi<ListFactory<object>> }}>
			<Box
				ref={ref}
				mod={[
					{
						orientation,
						infinite,
						'with-border': withBorder,
					},
				]}
				{...getStyles('root')}
				{...rest}
			>
				{paginationPosition === 'top' ? paginationContent : null}
				<ScrollShadow
					mod={[
						{
							orientation,
							'with-border': withBorder,
						},
					]}
					viewportRef={scrollRef}
					{...getStyles('scrollArea', {
						className: scrollShadowProps?.className,
						classNames: scrollShadowProps?.classNames,
						style: scrollShadowProps?.style,
						styles: scrollShadowProps?.styles,
					})}
					{...scrollShadowProps}
				>
					{renderInnerLoader()}
					{headerContent}
					<Box
						component='ul'
						mod={{
							orientation,
							virtualized,
						}}
						{...listStyles}
					>
						{items}
					</Box>
					{isEmpty ? <Box {...getStyles('empty')}>{renderInnerEmpty()}</Box> : null}
					{bottomContent}
					{footerContent}
					<Box ref={bottomRef} />
				</ScrollShadow>
				{paginationPosition === 'bottom' ? paginationContent : null}
			</Box>
		</ListProvider>
	);
};

/** Renders a list component with various features such as selection, grouping, pagination, and virtualization by default. */
export const List = forwardRef(ListInner);

import { type ForwardedRef, forwardRef, useRef } from 'react';
import { cn, useDataScrollOverflow } from '@glasshouse/utils';
import {
	Box,
	createPolymorphicComponent,
	createVarsResolver,
	getSize,
	ScrollArea,
	type ScrollAreaProps,
	useProps,
	useStyles,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';

import {
	type ScrollShadowFactory,
	type ScrollShadowProps,
	type ScrollShadowStaticComponents,
} from './scroll-shadow.types';

import classes from './scroll-shadow.module.css';

const varsResolver = createVarsResolver<ScrollShadowFactory>((_, { shadowSize }) => ({
	root: {
		'--scrollarea-shadow-size': getSize(shadowSize, 'scrollarea-shadow-size'),
	},
}));

const defaultProps: Partial<ScrollAreaProps & ScrollShadowProps> = {};

const ScrollShadowComponent = (_props: ScrollShadowProps & ScrollAreaProps, ref: ForwardedRef<HTMLDivElement>) => {
	const props = useProps('ScrollShadow', defaultProps, _props);

	const {
		children,
		className,
		classNames,
		style,
		styles,
		scrollbarSize,
		scrollHideDelay,
		type,
		dir,
		offsetScrollbars,
		viewportRef,
		onScrollPositionChange,
		unstyled,
		variant,
		viewportProps,
		scrollbars,
		vars,
		onBottomReached,
		orientation = 'vertical',
		shadowOffset,
		shadowVisibility,
		shadowEnabled,
		onVisibilityChange,
		shadowSize,
		mod,
		...others
	} = props;

	const getStyles = useStyles<ScrollShadowFactory>({
		name: 'ScrollShadow',
		props,
		classes,
		className,
		classNames,
		style,
		styles,
		vars,
		varsResolver,
	});

	const domRef = useRef<HTMLDivElement>(null);

	const mergedRef = useMergedRef(viewportRef, domRef);

	useDataScrollOverflow({
		domRef,
		shadowOffset,
		shadowVisibility,
		shadowEnabled,
		onVisibilityChange,
		updateDeps: [children],
		shadowOverflowCheck: orientation,
	});

	return (
		<ScrollArea
			ref={ref}
			dir={dir}
			mod={[{ 'shadow-size': shadowSize }, mod]}
			offsetScrollbars={offsetScrollbars}
			onBottomReached={onBottomReached}
			onScrollPositionChange={onScrollPositionChange}
			scrollbars={scrollbars}
			scrollbarSize={scrollbarSize}
			scrollHideDelay={scrollHideDelay}
			styles={styles}
			type={type}
			unstyled={unstyled}
			variant={variant}
			vars={vars}
			viewportProps={viewportProps}
			viewportRef={mergedRef}
			classNames={{
				root: cn(getStyles('root').className),
				viewport: getStyles('viewport').className,
			}}
			{...getStyles('root')}
			{...others}
		>
			{children}
		</ScrollArea>
	);
};

export const ScrollShadow = createPolymorphicComponent<
	'div',
	ScrollShadowProps & ScrollAreaProps,
	ScrollShadowStaticComponents
>(forwardRef(ScrollShadowComponent));

const ScrollShadowAutosizeComponent = (
	_props: ScrollShadowProps & ScrollAreaProps,
	ref: ForwardedRef<HTMLDivElement>
) => {
	const props = useProps('ScrollShadowAutosize', defaultProps, _props);

	const {
		children,
		classNames,
		styles,
		scrollbarSize,
		scrollHideDelay,
		type,
		dir,
		offsetScrollbars,
		viewportRef,
		onScrollPositionChange,
		unstyled,
		variant,
		viewportProps,
		scrollbars,
		style,
		vars,
		onBottomReached,
		orientation = 'vertical',
		shadowOffset,
		shadowVisibility,
		shadowEnabled,
		onVisibilityChange,
		shadowSize,
		...others
	} = props;

	return (
		<Box
			{...others}
			ref={ref}
			style={[{ display: 'flex', overflow: 'auto' }, style]}
		>
			<Box style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
				<ScrollShadow
					classNames={classNames}
					dir={dir}
					offsetScrollbars={offsetScrollbars}
					onBottomReached={onBottomReached}
					onScrollPositionChange={onScrollPositionChange}
					onVisibilityChange={onVisibilityChange}
					orientation={orientation}
					scrollbars={scrollbars}
					scrollbarSize={scrollbarSize}
					scrollHideDelay={scrollHideDelay}
					shadowEnabled={shadowEnabled}
					shadowOffset={shadowOffset}
					shadowVisibility={shadowVisibility}
					styles={styles}
					type={type}
					unstyled={unstyled}
					variant={variant}
					vars={vars}
					viewportProps={viewportProps}
					viewportRef={viewportRef}
					mod={{
						'shadow-size': shadowSize,
					}}
				>
					{children}
				</ScrollShadow>
			</Box>
		</Box>
	);
};

export const ScrollShadowAutosize = createPolymorphicComponent<
	'div',
	ScrollShadowProps & ScrollAreaProps,
	ScrollShadowStaticComponents
>(forwardRef(ScrollShadowAutosizeComponent));

ScrollShadow.Autosize = ScrollShadowAutosize;

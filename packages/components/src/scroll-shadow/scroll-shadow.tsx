import { useRef } from 'react';
import { cn, useDataScrollOverflow } from '@glasshouse/utils';
import {
	Box,
	createVarsResolver,
	getSize,
	polymorphicFactory,
	ScrollArea,
	type ScrollAreaFactory,
	type ScrollAreaProps,
	useProps,
	useStyles,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';

import { type ScrollShadowFactory, type ScrollShadowProps } from './scroll-shadow.types';

import classes from './scroll-shadow.module.css';

const varsResolver = createVarsResolver<ScrollShadowFactory>((_, { shadowSize }) => ({
	root: {
		'--scrollarea-shadow-size': getSize(shadowSize, 'scrollarea-shadow-size'),
	},
}));

const defaultProps: Partial<ScrollAreaProps & ScrollShadowProps> = {};

export const ScrollShadow = polymorphicFactory<ScrollShadowFactory & ScrollAreaFactory>((_props, ref) => {
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
			classNames={{
				root: cn(getStyles('root').className),
				viewport: getStyles('viewport').className,
			}}
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
			{...getStyles('root')}
			{...others}
		>
			{children}
		</ScrollArea>
	);
});

export const ScrollShadowAutosized = polymorphicFactory<ScrollShadowFactory & ScrollAreaFactory>((_props, ref) => {
	const props = useProps('ScrollShadowAutosized', defaultProps, _props);

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
					mod={{
						'shadow-size': shadowSize,
					}}
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
				>
					{children}
				</ScrollShadow>
			</Box>
		</Box>
	);
});

ScrollShadow.Autosized = ScrollShadowAutosized;

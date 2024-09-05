import { useRef } from 'react';
import { cn, useDataScrollOverflow, type UseDataScrollOverflowProps } from '@glasshouse/utils';
import {
	Box,
	type BoxProps,
	createVarsResolver,
	type ElementProps,
	type PolymorphicFactory,
	polymorphicFactory,
	rem,
	ScrollArea,
	type ScrollAreaFactory,
	type ScrollAreaProps,
	type StylesApiProps,
	useProps,
	useStyles,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';

import classes from './scroll-shadow.module.css';

export type ScrollShadowStylesNames = 'root' | 'viewport';
export interface ScrollShadowCssVariables {
	root: '--scrollarea-shadow-size';
}

export type ScrollShadowFactory = PolymorphicFactory<{
	props: ScrollShadowProps;
	stylesNames: ScrollShadowStylesNames;
	vars: ScrollShadowCssVariables;
	defaultComponent: 'div';
	defaultRef: HTMLDivElement;
	staticComponents: {
		Autosized: typeof ScrollShadowAutosized;
	};
}>;

export interface ScrollShadowProps
	extends BoxProps,
		StylesApiProps<ScrollShadowFactory>,
		ElementProps<'div'>,
		UseDataScrollOverflowProps {
	orientation?: 'vertical' | 'horizontal';
	/**
	 * The shadow size in pixels.
	 * @default 40
	 */
	size?: number;
}

const varsResolver = createVarsResolver<ScrollShadowFactory>((_, { size }) => ({
	root: {
		'--scrollarea-shadow-size': rem(size),
	},
}));

const defaultProps: Partial<ScrollAreaProps & ScrollShadowProps> = {
	size: 40,
};

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
		offset,
		visibility,
		isEnabled,
		onVisibilityChange,
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
		offset,
		visibility,
		isEnabled,
		onVisibilityChange,
		updateDeps: [children],
		overflowCheck: orientation,
	});

	return (
		<ScrollArea
			ref={ref}
			classNames={{
				root: cn(getStyles('root').className),
				viewport: getStyles('viewport').className,
			}}
			dir={dir}
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
		offset,
		visibility,
		isEnabled,
		onVisibilityChange,
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
					isEnabled={isEnabled}
					offset={offset}
					offsetScrollbars={offsetScrollbars}
					onBottomReached={onBottomReached}
					onScrollPositionChange={onScrollPositionChange}
					onVisibilityChange={onVisibilityChange}
					orientation={orientation}
					scrollbars={scrollbars}
					scrollbarSize={scrollbarSize}
					scrollHideDelay={scrollHideDelay}
					styles={styles}
					type={type}
					unstyled={unstyled}
					variant={variant}
					vars={vars}
					viewportProps={viewportProps}
					viewportRef={viewportRef}
					visibility={visibility}
				>
					{children}
				</ScrollShadow>
			</Box>
		</Box>
	);
});

ScrollShadow.Autosized = ScrollShadowAutosized;

import { useRef } from 'react';
import { cn, useDataScrollOverflow, type UseDataScrollOverflowProps } from '@glasshouse/utils';
import {
	Box,
	type BoxProps,
	createVarsResolver,
	type ElementProps,
	getSize,
	type MantineSize,
	type PolymorphicFactory,
	polymorphicFactory,
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

type ScrollShadowOrientation = 'vertical' | 'horizontal';

export interface ScrollShadowProps
	extends BoxProps,
		StylesApiProps<ScrollShadowFactory>,
		ElementProps<'div'>,
		UseDataScrollOverflowProps {
	orientation?: ScrollShadowOrientation;
	/** Width or height of the shadow, numbers are converted to rem, `'md'` by default */
	shadowSize?: MantineSize | (string & Record<string, unknown>) | number;
}

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
		offset,
		visibility,
		isEnabled,
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
		offset,
		visibility,
		isEnabled,
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
					isEnabled={isEnabled}
					mod={{
						'shadow-size': shadowSize,
					}}
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

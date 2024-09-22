import { type UseDataScrollOverflowProps } from '@glasshouse/utils';
import {
	type BoxProps,
	type ElementProps,
	type MantineSize,
	type PolymorphicFactory,
	type ScrollAreaCssVariables,
	type ScrollAreaProps,
	type ScrollAreaStylesNames,
	type StylesApiProps,
} from '@mantine/core';

import { type ScrollShadowAutosize } from './scroll-shadow';

export type ScrollShadowStylesNames = ScrollAreaStylesNames;

export interface ScrollShadowCssVariables extends ScrollAreaCssVariables {
	root: '--scrollarea-shadow-size' & ScrollAreaCssVariables['root'];
}

export interface ScrollShadowStaticComponents {
	Autosize: typeof ScrollShadowAutosize;
}

export type ScrollShadowFactory = PolymorphicFactory<{
	props: ScrollShadowProps;
	stylesNames: ScrollShadowStylesNames;
	vars: ScrollShadowCssVariables;
	defaultComponent: 'div';
	defaultRef: HTMLDivElement;
	staticComponents: {
		Autosized: typeof ScrollShadowAutosize;
	};
}>;

type ScrollShadowOrientation = 'vertical' | 'horizontal';

export interface ScrollShadowProps
	extends BoxProps,
		StylesApiProps<ScrollShadowFactory>,
		ElementProps<'div'>,
		Omit<UseDataScrollOverflowProps, 'updateDeps' | 'shadowOverflowCheck'>,
		Omit<ScrollAreaProps, 'classNames' | 'styles' | 'vars'> {
	orientation?: ScrollShadowOrientation;
	/** Width or height of the shadow, numbers are converted to rem, `'md'` by default */
	shadowSize?: MantineSize | (string & Record<string, unknown>) | number;
}

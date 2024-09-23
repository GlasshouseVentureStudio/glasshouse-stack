import { useState } from 'react';
import { type ComboboxItem, Group, Pill, rem, Tooltip, type TooltipProps } from '@mantine/core';

interface MaxDisplayedValuesPillProps {
	maxDisplayedValues?: number;
	maxDisplayedValuesTooltipType?: 'pills' | 'texts';
	onRemove: (value: string) => void;
	optionsLockup?: Record<string, ComboboxItem>;
	readOnly?: boolean;
	renderMaxDisplayedValuesLabel?: (count: number) => React.ReactNode;
	values?: string[];
	withMaxDisplayedValuesTooltip?: boolean;
	tooltipProps?: TooltipProps;
}

export const MaxDisplayedValuesPill = ({
	maxDisplayedValues,
	maxDisplayedValuesTooltipType = 'pills',
	onRemove,
	optionsLockup,
	renderMaxDisplayedValuesLabel,
	readOnly,
	values = [],
	withMaxDisplayedValuesTooltip,
	tooltipProps,
}: MaxDisplayedValuesPillProps) => {
	const [keepTooltipOpened, setKeepTooltipOpened] = useState(false);

	const tooltipTextContent = maxDisplayedValues
		? values
				.slice(maxDisplayedValues - 1)
				.map(value => optionsLockup?.[value]?.label ?? value)
				.join(', ')
		: undefined;

	return maxDisplayedValues ? (
		<Tooltip
			closeDelay={300}
			disabled={!withMaxDisplayedValuesTooltip}
			label={
				<Group
					gap={4}
					onMouseEnter={() => {
						setKeepTooltipOpened(true);
					}}
					onMouseLeave={() => {
						setKeepTooltipOpened(false);
					}}
					style={{ pointerEvents: 'auto' }}
				>
					{maxDisplayedValuesTooltipType === 'pills'
						? values.slice(maxDisplayedValues - 1).map(value => (
								<Pill
									key={value}
									onRemove={() => {
										onRemove(value);
									}}
									size='xs'
									withRemoveButton={!readOnly && !optionsLockup?.[value]?.disabled}
								>
									{optionsLockup?.[value]?.label ?? value}
								</Pill>
							))
						: tooltipTextContent}
				</Group>
			}
			maw={rem(480)}
			multiline
			offset={4}
			{...tooltipProps}
			opened={keepTooltipOpened ? keepTooltipOpened : undefined}
		>
			<Pill style={{ flexShrink: 0, flexGrow: 0, minWidth: 'auto' }}>
				{renderMaxDisplayedValuesLabel
					? renderMaxDisplayedValuesLabel(values.length)
					: `+${values.length - (maxDisplayedValues - 1)} more`}
			</Pill>
		</Tooltip>
	) : null;
};

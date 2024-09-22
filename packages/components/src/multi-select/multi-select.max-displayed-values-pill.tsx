import { useState } from 'react';
import { type ComboboxItem, Group, Pill, Tooltip } from '@mantine/core';

interface MaxDisplayedValuesPillProps {
	maxDisplayedValues?: number;
	maxDisplayedValuesTooltipType?: 'pills' | 'texts';
	onRemove: (value: string) => void;
	optionsLockup?: Record<string, ComboboxItem>;
	readOnly?: boolean;
	renderMaxDisplayedValuesLabel?: (count: number) => React.ReactNode;
	values?: string[];
	withMaxDisplayedValuesTooltip?: boolean;
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
			multiline
			offset={4}
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

import { useEffect, useRef } from 'react';
import isEmpty from 'lodash.isempty';

/** Based on Mantine's `usePrevious` hook with extra falsy check. If previous value is falsy, it will not be updated.
 * @see https://mantine.dev/hooks/use-previous/
 */
export const usePrevious = <T>(value: T, checkFalsy?: boolean): T | undefined => {
	const ref = useRef<T>(undefined);

	useEffect(() => {
		if (checkFalsy && (!value || isEmpty(value))) {
			return;
		}

		ref.current = value;
	}, [checkFalsy, value]);

	// eslint-disable-next-line react-compiler/react-compiler -- this is fine
	return ref.current;
};

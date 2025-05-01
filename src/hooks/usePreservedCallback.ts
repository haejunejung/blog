import { useCallback, useEffect, useRef } from "react";

export function usePreservedCallback<Arguments extends unknown[], Result>(
	callback: (...args: Arguments) => Result,
) {
	const callbackRef = useRef<(...args: Arguments) => Result>(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	return useCallback((...args: Arguments): Result => {
		return callbackRef.current(...args);
	}, []);
}

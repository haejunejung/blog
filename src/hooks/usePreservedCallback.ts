import { useCallback, useEffect, useRef } from "react";

export function usePreservedCallback<Arguments extends unknown[], Return>(
	callback: (...args: Arguments) => Return,
) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	return useCallback((...args: Arguments) => {
		return callbackRef.current(...args);
	}, []);
}

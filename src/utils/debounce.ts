export function debounce<Arguments extends unknown[]>(
	callback: (...args: Arguments) => void,
	ms: number,
) {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: Arguments) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			callback(...args);
		}, ms);
	};
}

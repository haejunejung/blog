const KEYS = [
	"window",
	"document",
	"location",
	"navigator",
	"localStorage",
	"sessionStorage",
	"history",
	"requestAnimationFrame",
	"cancelAnimationFrame",
	"matchMedia",
	"ResizeObserver",
	"IntersectionObserver",
	"MutationObserver",
	"performance",
	"Event",
	"CustomEvent",
	"screen",
] as const;

type Key = (typeof KEYS)[number] & keyof typeof globalThis;

export function serverEnvironment<T>(callback: () => T) {
	const origins: Map<Key, unknown> = KEYS.reduce(
		(acc, key) => acc.set(key, globalThis[key as keyof typeof globalThis]),
		new Map(),
	);

	try {
		for (const key of origins.keys()) {
			delete globalThis[key];
		}

		return callback();
	} finally {
		for (const [key, value] of origins.entries()) {
			// biome-ignore lint/suspicious/noExplicitAny: globalThis
			(globalThis as any)[key] = value;
		}
	}
}

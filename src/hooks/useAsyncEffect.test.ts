import { renderHookSSR } from "@/__test__";
import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAsyncEffect } from "./useAsyncEffect";

describe("useAsyncEffect", () => {
	it("should execute the async effect", async () => {
		const effect = vi.fn().mockResolvedValue(undefined);
		renderHookSSR(() => useAsyncEffect(effect));
		expect(effect).toHaveBeenCalled();
	});

	it("should call cleanup function on unmount", async () => {
		const cleanup = vi.fn();
		const effect = vi.fn(async () => cleanup);
		const { unmount } = renderHookSSR(() => useAsyncEffect(effect));
		await waitFor(async () => await Promise.resolve(0));
		unmount();
		expect(effect).toHaveBeenCalled();
		expect(cleanup).toHaveBeenCalled();
	});

	it("should abort the effect when unmounted", async () => {
		const cleanup = vi.fn();
		const effect = vi.fn(async (signal: AbortSignal) => {
			signal.onabort = () => {
				cleanup();
			};
		});
		const { unmount } = renderHookSSR(() => useAsyncEffect(effect));
		const signal = effect.mock.calls[0][0];
		expect(signal.aborted).toBe(false);
		await waitFor(async () => await Promise.resolve(0));
		unmount();
		expect(signal.aborted).toBe(true);
		expect(effect).toHaveBeenCalled();
		expect(cleanup).toHaveBeenCalled();
	});
});

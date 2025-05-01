import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { usePreservedCallback } from "./usePreservedCallback";

describe("usePreservedCallback", () => {
	it("calls the latest version of external variables inside the callback", () => {
		const { result } = renderHook(() => {
			const [count, setCount] = useState(0);

			const getCount = () => count;
			const preservedCallback = usePreservedCallback(getCount);
			const increment = () => setCount((prev) => prev + 1);

			return { preservedCallback, increment };
		});

		expect(result.current.preservedCallback()).toBe(0);
		act(() => {
			result.current.increment();
		});
		expect(result.current.preservedCallback()).toBe(1);
	});

	it("should not create a new function instance unnecessarily", () => {
		const fn1 = vi.fn();
		const fn2 = vi.fn();

		const { result, rerender } = renderHook(
			({ callback }) => {
				const preservedCallback = usePreservedCallback(callback);
				return { preservedCallback };
			},
			{ initialProps: { callback: fn1 } },
		);

		const fn1Ref = result.current.preservedCallback;
		rerender({ callback: fn2 });
		const fn2Ref = result.current.preservedCallback;
		expect(fn1Ref).toBe(fn2Ref);
	});
});

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
		const fn1 = vi.fn().mockReturnValue("first");
		const fn2 = vi.fn().mockReturnValue("second");

		const { result, rerender } = renderHook(
			({ callback }) => usePreservedCallback(callback),
			{ initialProps: { callback: fn1 } },
		);

		const firstFn = result.current;
		expect(result.current()).toBe("first");

		rerender({ callback: fn2 });

		const secondFn = result.current;
		expect(result.current()).toBe("second");

		expect(firstFn).toBe(secondFn);
	});
});

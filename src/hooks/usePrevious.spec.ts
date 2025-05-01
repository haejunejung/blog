import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
	it("should return initial state on first render", () => {
		const { result } = renderHook(() => usePrevious(0));
		expect(result.current).toBe(0);
	});

	it("should return previous state on subsequent renders", () => {
		const { result, rerender } = renderHook(({ state }) => usePrevious(state), {
			initialProps: { state: 0 },
		});
		expect(result.current).toBe(0);

		rerender({ state: 1 });
		expect(result.current).toBe(0);

		rerender({ state: 2 });
		expect(result.current).toBe(1);

		rerender({ state: 3 });
		expect(result.current).toBe(2);
	});

	it("should not be changed if the state is the same", () => {
		const { result, rerender } = renderHook(({ state }) => usePrevious(state), {
			initialProps: { state: 1, otherState: 1 },
		});
		expect(result.current).toBe(1);

		rerender({ state: 2, otherState: 1 });
		expect(result.current).toBe(1);

		rerender({ state: 2, otherState: 2 });
		expect(result.current).toBe(1);

		rerender({ state: 3, otherState: 2 });
		expect(result.current).toBe(2);
	});

	it("should work with custom equality function", () => {
		const { result, rerender } = renderHook(
			({ state }) => usePrevious(state, (prev, curr) => !Object.is(prev, curr)),
			{ initialProps: { state: 0 } },
		);
		expect(result.current).toBe(0);

		rerender({ state: 1 });
		expect(result.current).toBe(0);

		rerender({ state: 2 });
		expect(result.current).toBe(0);

		rerender({ state: 3 });
		expect(result.current).toBe(0);
	});
});

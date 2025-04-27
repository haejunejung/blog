import { emptyArray } from "@/consts";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, expectTypeOf, it } from "vitest";
import { useStackState } from "./useStackState";

describe("useStackState", () => {
	it("should initialize with no initial state", () => {
		const { result } = renderHook(() => useStackState());
		expect(result.current.stack).toEqual(emptyArray);
		expect(result.current.length).toBe(0);
	});

	it("should initialize when an empty array", () => {
		const { result } = renderHook(() => useStackState(emptyArray));
		expect(result.current.stack).toEqual(emptyArray);
		expect(result.current.length).toBe(0);
	});

	it("should push a value to the stack correctly", () => {
		const { result } = renderHook(() => useStackState<string>());
		const { push } = result.current;

		act(() => {
			push("1");
		});

		expectTypeOf(result.current.stack).toEqualTypeOf<string[]>();
		expect(result.current.stack).toEqual(["1"]);
		expect(result.current.length).toBe(1);
	});

	it("should pop a value from the stack correctly", () => {
		const { result } = renderHook(() => useStackState<string>(["1", "2", "3"]));
		const { pop } = result.current;

		act(() => {
			const poppedValue = pop();
			expect(poppedValue).toBe("3");
		});

		expect(result.current.stack).toEqual(["1", "2"]);
		expect(result.current.length).toBe(2);
	});

	it("should peek the top value of the stack correctly", () => {
		const { result } = renderHook(() => useStackState<string>(["1", "2", "3"]));
		const { peek } = result.current;
		act(() => {
			const peekedValue = peek();
			expect(peekedValue).toBe("3");
		});
		expect(result.current.stack).toEqual(["1", "2", "3"]);
		expect(result.current.length).toBe(3);
	});

	it("should clear the stack correctly", () => {
		const { result } = renderHook(() => useStackState<string>(["1", "2", "3"]));
		const { clear } = result.current;
		act(() => {
			clear();
		});
		expect(result.current.stack).toEqual(emptyArray);
		expect(result.current.length).toBe(0);
	});
});

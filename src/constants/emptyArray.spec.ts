import { describe, expect, it } from "vitest";
import { emptyArray } from "./emptyArray";

describe("emptyArray", () => {
	it("should be an empty array", () => {
		expect(emptyArray).toEqual([]);
	});

	it("should be frozen", () => {
		expect(Object.isFrozen(emptyArray)).toBe(true);
	});

	it("should be not extensible", () => {
		expect(Object.isExtensible(emptyArray)).toBe(false);
	});
});

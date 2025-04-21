import { emptyObject } from "@/consts";
import { describe, expect, it } from "vitest";
import { noop } from "./noop";

describe("noop", () => {
	it("should be a function", () => {
		expect(typeof noop).toBe("function");
	});

	it("should return an empty object", () => {
		expect(noop()).toEqual(emptyObject);
	});
});

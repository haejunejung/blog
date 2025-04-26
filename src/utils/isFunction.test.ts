import { emptyArray, emptyObject } from "@/consts";
import { describe, expect, it, vi } from "vitest";
import { isFunction } from "./isFunction";

describe("isFunction", () => {
	it("should return true for function", () => {
		const fn = vi.fn();
		expect(isFunction(fn)).toBeTruthy();
	});

	it("should return false for non-function", () => {
		const string = "string";
		const number = 123;
		const boolean = true;
		const object = emptyObject;
		const array = emptyArray;
		const nullValue: null = null;
		const undefinedValue = undefined;
		const symbol = Symbol("symbol");
		const date = new Date();
		const regexp = /regex/g;
		const promise = Promise.resolve();
		const map = new Map();
		const set = new Set();

		expect(isFunction(string)).toBeFalsy();
		expect(isFunction(number)).toBeFalsy();
		expect(isFunction(boolean)).toBeFalsy();
		expect(isFunction(object)).toBeFalsy();
		expect(isFunction(array)).toBeFalsy();
		expect(isFunction(nullValue)).toBeFalsy();
		expect(isFunction(undefinedValue)).toBeFalsy();
		expect(isFunction(symbol)).toBeFalsy();
		expect(isFunction(date)).toBeFalsy();
		expect(isFunction(regexp)).toBeFalsy();
		expect(isFunction(promise)).toBeFalsy();
		expect(isFunction(map)).toBeFalsy();
		expect(isFunction(set)).toBeFalsy();
	});
});

import { renderHookSSR } from "@/__test__";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useNetworkStatus } from "./useNetworkStatus";

describe("useNetworkStatus", () => {
	const navigatorOnlineSpy = vi.spyOn(window.navigator, "onLine", "get");
	const mockInternetConnection = (status: "online" | "offline") => {
		act(() => {
			window.dispatchEvent(new Event(status));
		});
	};

	const onlineCallback = vi.fn();
	const offlineCallback = vi.fn();

	it("should return true if server side rendering", () => {
		const { result } = renderHookSSR(() => useNetworkStatus());
		expect(result.current).toBe(true);
	});

	it("should return true if online", () => {
		navigatorOnlineSpy.mockReturnValue(true);

		const { result } = renderHook(() => useNetworkStatus());
		expect(result.current).toBe(true);
	});

	it("should return false if offline", () => {
		navigatorOnlineSpy.mockReturnValue(false);

		const { result } = renderHook(() => useNetworkStatus());
		expect(result.current).toBe(false);
	});

	it("should call registered callback when network status changed", () => {
		navigatorOnlineSpy.mockReturnValue(false);

		renderHook(() => useNetworkStatus({ onlineCallback, offlineCallback }));

		mockInternetConnection("online");
		expect(onlineCallback).toHaveBeenCalled();

		mockInternetConnection("offline");
		expect(offlineCallback).toHaveBeenCalled();
	});
});

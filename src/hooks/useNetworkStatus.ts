import { emptyObject } from "@/consts";
import { noop } from "@/utils";
import { useSyncExternalStore } from "react";
import { usePreservedCallback } from "./usePreservedCallback";

type UseNetworkStatusProps = {
	onlineCallback?: (event: Event) => void;
	offlineCallback?: (event: Event) => void;
};

export function useNetworkStatus({
	onlineCallback = noop,
	offlineCallback = noop,
}: UseNetworkStatusProps = emptyObject): boolean {
	const preservedSubscribe = usePreservedCallback((callback: VoidFunction) =>
		subscribe(callback, onlineCallback, offlineCallback),
	);

	const isOnline = useSyncExternalStore(
		preservedSubscribe,
		() => getSnapshot(),
		() => getServerSnapshot(),
	);

	return isOnline;
}

const subscribe = (
	callback: VoidFunction,
	onlineCallback: (event: Event) => void,
	offlineCallback: (event: Event) => void,
) => {
	const handleOnlineCallback = (event: Event) => {
		onlineCallback(event);
		return callback();
	};

	const handleOfflineCallback = (event: Event) => {
		offlineCallback(event);
		return callback();
	};

	window.addEventListener("online", handleOnlineCallback);
	window.addEventListener("offline", handleOfflineCallback);

	return () => {
		window.removeEventListener("online", handleOnlineCallback);
		window.removeEventListener("offline", handleOfflineCallback);
	};
};

const getSnapshot = () => {
	return window.navigator.onLine;
};

const getServerSnapshot = () => {
	return true;
};

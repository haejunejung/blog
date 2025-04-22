import { emptyObject } from "@/consts";
import {
	type RenderHookOptions,
	render,
	renderHook,
} from "@testing-library/react";
import type { RefObject } from "react";
import { renderToString } from "react-dom/server";
import { createMutatableRef } from "./createMutatableRef";
import { serverEnvironment } from "./serverEnvironment";

export function renderHookSSR<
	P extends Record<string, unknown>,
	R,
	Hook extends (props: P) => R,
>(useHook: Hook, options: RenderHookOptions<P> = emptyObject) {
	const result = renderHook<R, P>(useHook, {
		...options,
		hydrate: true,
	});

	return result;
}

renderHookSSR.serverOnly = <R, Hook extends () => R>(useHook: Hook) => {
	const result = createMutatableRef<R | null>(null);

	const Component = () => {
		const hookResult = useHook();
		result.current = hookResult;
		return <div />;
	};

	const stringified = serverEnvironment(() => renderToString(<Component />));
	// biome-ignore lint/security/noDangerouslySetInnerHtml: only for testing
	render(<div dangerouslySetInnerHTML={{ __html: stringified }} />);
	return result as RefObject<R>;
};

import type { HasDisplayName } from "@/types";
import { forwardRef } from "react";

/**
 * @description
 * This is a hack, but basically we want to keep the full 'API' of the component, but we do want to
 * wrap it in a forwardRef so that we _can_ passthrough the ref
 */
export function forwardRefWithAs<
	T extends { name: string; displayName?: string },
>(component: T): T & HasDisplayName {
	return Object.assign(forwardRef(component as any) as any, {
		displayName: component.displayName ?? component.name,
	});
}

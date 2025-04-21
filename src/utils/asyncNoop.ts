import { emptyObject } from "@/consts";

/**
 * @description
 * A no-operation function that does nothing and returns an promised empty object.
 * This is useful as a default value for optional callbacks or event handlers.
 * It can be used to avoid null checks or to provide a default implementation.
 */
export const asyncNoop = async () => emptyObject;

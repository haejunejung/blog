import type {
	ComponentPropsWithRef,
	ComponentPropsWithoutRef,
	ElementType,
} from "react";

export type { ArticlePageProps } from "./ArticlePageProps";

/******************** Common ********************/

/**
 * @description
 * A type that represents an empty object.
 * This is useful for defining types that should not have any properties.
 *
 * The type `{}` is not equivalent to an empty object type in TypeScript.
 * So, we use `Record<string, never>` to represent an object type with no properties.
 */
export type EmptyObject = Record<string, never>;

/**
 * @description
 * A type that represents a strict version of Omit.
 * The type `Omit` does not enforce that the keys being omiited are actually present in the type.
 *
 * So, we use `StrictOmit` to ensure that the keys being omitted are actually present in the type.
 * It prevents accidental omission of keys that are not present in the type.
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

/**
 * @description
 * A type that represents a callable type.
 */
export type ResolveCallable<T> = T | (() => T);

/******************** Polymorphic ********************/

/**
 * @description
 * When we create a forwardRef component, we need to set the displayName for debugging purposes.
 */
export type HasDisplayName = { displayName?: string };

/**
 * @description
 * When we create a component, we need to set the className for styling purposes.
 * The className prop is optional and can be used to apply custom styles to the component.
 */
export type HasClassName = { className?: string };

/**
 * @description
 * When we create a polymorphic support component, we need to set the type of the component.
 * It contains `as`, `children` and the props of the component.
 *
 * The `as` prop is used to specify the type of the component.
 * It can be any valid HTML element or a custom component.
 * Since the `as` prop, we can use the component as polymorphic.
 */
export type PolymorphicComponentProps<
	TTag extends ElementType,
	TProps extends object = EmptyObject,
> = TProps & { as?: TTag } & HasClassName &
	Omit<ComponentPropsWithoutRef<TTag>, keyof TProps | "as" | "className">;

/**
 * @description
 * When we create a polymorphic support component, we should infer the type of `ref` based on the ElementType.
 * This is useful for components that accept a `ref` prop.
 */
export type PolymorphicRef<TTag extends ElementType> =
	ComponentPropsWithRef<TTag>["ref"];

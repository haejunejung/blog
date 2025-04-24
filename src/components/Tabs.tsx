import { usePreservedCallback } from "@/hooks";
import type {
	HasDisplayName,
	PolymorphicComponentProps,
	PolymorphicRef,
} from "@/types";
import { createSafeContext, forwardRefWithAs } from "@/utils";
import {
	type ElementType,
	type MutableRefObject,
	type PropsWithChildren,
	useRef,
} from "react";
import { Stack } from "./Stack";

type UseTabsValueContextType = {
	activeTab: string;
	direction?: "horizontal" | "vertical";
	variant?: "line";
	tabsRef: MutableRefObject<HTMLButtonElement[]>;
};

type UseTabsActionContextType = {
	handleTabChange: (tab: string) => void;
};

const [TabsValueProvider, useTabsValue] =
	createSafeContext<UseTabsValueContextType>("TabsValueContext");
const [TabsActionProvider, useTabsAction] =
	createSafeContext<UseTabsActionContextType>("TabsActionContext");

type TabsProps<TTag extends ElementType> = PolymorphicComponentProps<
	TTag,
	{
		activeTab: string;
		tabs: { key: string; label: string }[];
		direction?: "horizontal" | "vertical";
		variant?: "line";
		onTabChange: (tab: string) => void;
	}
>;

type TabsRef<TTag extends ElementType> = PolymorphicRef<TTag>;

const TabsFn = <TTag extends ElementType = "section">(
	props: TabsProps<TTag>,
	ref: TabsRef<TTag>,
) => {
	const {
		as,
		activeTab,
		tabs,
		direction = "horizontal",
		variant = "line",
		onTabChange,
	} = props;

	const TabsLayout = as || "section";

	const tabsRef = useRef<HTMLButtonElement[]>(
		new Array(tabs.length).fill(null),
	);

	const handleTabChange = usePreservedCallback((tab: string) => {
		// implementation
		onTabChange(tab);
	});

	return (
		<TabsValueProvider value={{ activeTab, direction, variant, tabsRef }}>
			<TabsActionProvider value={{ handleTabChange }}>
				<TabsLayout ref={ref}>
					<TabsHeader>
						{tabs.map(({ key, label }, index) => (
							<TabsTrigger key={key} tab={key} index={index}>
								{label}
							</TabsTrigger>
						))}
						<TabsIndicator />
					</TabsHeader>
				</TabsLayout>
			</TabsActionProvider>
		</TabsValueProvider>
	);
};

type TabsHeaderProps = PropsWithChildren;

const TabsHeader = ({ children }: TabsHeaderProps) => {
	const { direction } = useTabsValue();

	return (
		<Stack as="nav" role="tablist" direction={direction}>
			{children}
		</Stack>
	);
};

type TabsTriggerProps = PropsWithChildren<{ tab: string; index: number }>;

const TabsTrigger = ({ children, tab, index }: TabsTriggerProps) => {
	const { activeTab, tabsRef } = useTabsValue();
	const { handleTabChange } = useTabsAction();
	const isSelected = tab === activeTab;

	return (
		<button
			type="button"
			role="tab"
			onClick={() => handleTabChange(tab)}
			ref={(el) => {
				if (el && !tabsRef.current[index]) {
					tabsRef.current[index] = el as HTMLButtonElement;
				}
			}}
		>
			{children}
		</button>
	);
};

const TabsIndicator = () => {
	return <div />;
};

TabsFn.displayName = "Tabs";

export interface _internal_ComponentTabs extends HasDisplayName {
	<TTag extends ElementType = "section">(
		props: TabsProps<TTag> & { ref?: TabsRef<TTag> },
	): ReturnType<typeof TabsFn>;
}

export const Tabs = forwardRefWithAs(TabsFn) as _internal_ComponentTabs;

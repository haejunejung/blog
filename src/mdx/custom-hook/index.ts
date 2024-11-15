import { MDXItemProps } from "@/types/MDXItemProps";

export const customhookList: MDXItemProps[] = [
  {
    title: "useCombobox",
    summary:
      "combobox와 autocomplete 기능을 수행할 수 있는 useCombobox에 대해 공부했습니다.",
    path: "/custom-hook/useCombobox.mdx",
    importMdx: () => import("./useCombobox.mdx"),
  },
];

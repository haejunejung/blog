import { ArticlePageProps } from "@/types";

export const techList: ArticlePageProps[] = [
  {
    src: "/images/fds-figma-plugin.png",
    title: "띵동! 아이콘이 도착했어요 (1)",
    description: "아이콘을 쉽게 관리할 수 있는 피그마 플러그인을 개발했어요",
    slug: "/tech/fds-figma-plugin-1",
    date: "2024년 2월 2일",
    importMdx: () => import("./fds-figma-plugin-1.mdx")
  }
];

import type { SidebarConfig } from "@vuepress/theme-default";

const fs: string = "/docs/filename-simplifier/";

export const en: SidebarConfig = {
  "/docs/filename-simplifier/": [
    {
      text: "Filename Simplifier",
      children: [`${fs}install.md`, `${fs}run.md`, `${fs}config.md`],
    },
  ],
};

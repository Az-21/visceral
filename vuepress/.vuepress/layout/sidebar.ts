import type { SidebarConfig } from "@vuepress/theme-default";

const fs: string = "/docs/filename-simplifier/";
const dip: string = "/course/dip/";

export const en: SidebarConfig = {
  // Filename Simplifier [ Documentation ]
  "/docs/filename-simplifier/": [
    {
      text: "Filename Simplifier",
      children: [`${fs}install.md`, `${fs}run.md`, `${fs}config.md`],
    },
  ],

  // Digital Image Processing [ Course ]
  "/course/dip/": [
    {
      text: "Digital Image Processing",
      children: [
        `${dip}introduction.md`,
        `${dip}unit1.md`,
        `${dip}unit2.md`,
        `${dip}unit3.md`,
        `${dip}unit4.md`,
        `${dip}unit5.md`,
      ],
    },
  ],
};

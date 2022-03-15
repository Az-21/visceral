import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";
import { sidebar } from "./layout";

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  lang: "en-US",
  title: "Visceral",
  description: "☄️ Document Everything",

  // theme and its config
  theme: "@vuepress/theme-default",
  themeConfig: {
    base: "/vuepress/",
    docsDir: "/vuepress/",
    repo: "Az-21/visceral",
    logo: "https://vuejs.org/images/logo.png",
    sidebar: sidebar.en,
  },
  plugins: [
    ["@vuepress/plugin-shiki", { theme: "material-darker" }],
    ["vuepress-plugin-chart"],
    [
      "vuepress-plugin-giscus",
      {
        repo: "Az-21/visceral",
        repoId: "R_kgDOG9uDLA ",
        category: "General",
        categoryId: "DIC_kwDOG9uDLM4COGxh",
        mapping: "pathname",
        reactionsEnabled: "1",
        theme: "preferred_color_scheme",
        lang: "auto",
        crossorigin: "anonymous",
      },
    ],
  ],
});

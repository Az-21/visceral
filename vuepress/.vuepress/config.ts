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
    // Syntax Highlighter
    ["@vuepress/plugin-shiki", { theme: "material-darker" }],

    // Markdown extended
    ["@renovamen/vuepress-plugin-md-plus", { all: true }],

    // KaTeX
    [
      "@renovamen/vuepress-plugin-katex",
      {
        throwOnError: false,
        strict: true,
      },
    ],
  ],
});

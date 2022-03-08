import type { DefaultThemeOptions } from "vuepress";
import { defineUserConfig } from "vuepress";
import { sidebar } from "./layout";

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  lang: "en-US",
  title: "Visceral",
  description: "Documentation for Az-21's projects.",

  // theme and its config
  theme: "@vuepress/theme-default",
  themeConfig: {
    base: "/vuepress/",
    repo: "Az-21/visceral",
    logo: "https://vuejs.org/images/logo.png",
    sidebar: sidebar.en,
  },
});

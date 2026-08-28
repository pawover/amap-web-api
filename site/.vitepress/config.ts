import { defineConfig } from "vitepress";

export default defineConfig({
  title: "amap-web-api",
  description: "高德地图 AMap Web API 组件库",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "API", link: "/api/" },
      { text: "GitHub", link: "https://github.com/pawover/amap-web-api" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始",
          items: [
            { text: "快速开始", link: "/guide/getting-started" },
          ],
        },
      ],
      "/api/": [
        {
          text: "包",
          items: [
            { text: "amap-web-react", link: "/api/amap-web-react" },
            { text: "amap-web-types", link: "/api/amap-web-types" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/pawover/amap-web-api" },
    ],
    search: { provider: "local" },
  },
});

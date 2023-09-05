import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '高德地图 AMap',
  description: 'AMap Javascript Web Api',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '项目',
        items: [
          { text: 'amap-web-react', link: '/amap-web-react/01-开始' },
          { text: 'amap-web-types', link: '/amap-web-types/01-开始' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/handpear' }],
    logo: '/favicon.ico',
    outlineTitle: '目录',
    lastUpdatedText: '更新日期',
    docFooter: { prev: '上一页', next: '下一页' },
    footer: {
      message: '高德地图 AMap Web Api 文档',
      copyright: 'Copyright ©2023 Created by Handpear',
    },
  },
  vite: {
    server: { host: true },
    css: { devSourcemap: true },
    plugins: [
      AutoSidebar({
        titleFromFile: true,
      }),
    ],
  },
});

import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'nukleo.io',
  description: 'Guia da API',
  base: '/APIDocs/',
  dest: '../docs/',
  srcDir: './src',
  themeConfig: {
    logo: '/logo.png',
    siteTitle: false,
    nav: [
      {
        text: 'Versão da API',
        items: [{ text: 'v2', link: '/' }],
      },
    ],
    search: {
      provider: 'local',
    },
  },
});

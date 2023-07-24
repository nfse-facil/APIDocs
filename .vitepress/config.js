import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'nukleo.io',
  description: 'Guia da API',
  dest: '../docs/',
  srcDir: './src',
  themeConfig: {
    logo: '/logo.png',
    siteTitle: false,
    sidebar: [
      {
        text: 'Introdução',
        link: '#comece-aqui',
        items: [
          {
            text: 'Autenticação',
            link: '#_1-obtenha-suas-chaves',
          },
          {
            text: 'Formato',
            link: '#format',
          },
          {
            text: 'Erros',
            link: '#errors',
          },
          {
            text: 'Requisições',
            link: '#rate-limit',
          },
          {
            text: 'Paginação',
            link: '#pagination',
          },
          {
            text: 'Busca',
            link: '#search',
          },
        ],
      },
      {
        text: 'Endpoints',
        link: '#recursos-principais',
        items: [
          {
            text: 'Receipts',
            collapsed: true,
            link: '#receipts',
            items: [
              {
                text: 'Listar receipts',
                link: '#_1-listar-receipts',
              },
            ]
          },
          {
            text: 'Customers',
            link: '#customers',
          },
          {
            text: 'Companies',
            link: '#companies',
          },
        ]
      }
    ],
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

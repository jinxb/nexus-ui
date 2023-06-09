export default {
  title: 'Nexus',
  description: '.......',
  editLinks: true,
  contributors: true,
  lastUpdated: true,
  base: '/nexus-ui/',
  themeConfig: {
    logo: "logo_mini.png",
    siteTitle: 'Nexus',
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    cleanUrls: 'without-subfolders',
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name',
    },
    nav: [
      { text: "指南", link: "/guide/index" },
      { text: "组件", link: "/components/tabs/" },
      { text: "工具函数", link: "/tools/useTableData/" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/jinxb/nexus-ui" }],
    sidebar: {
      "/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guide/",
            },
            {
              text: "快速开始",
              link: "/guide/quickstart",
            },
          ],
        },
        {
          text: "通用页面",
          items: [
            {
              text: "页面一",
              link: "/generalPage/page1",
            },
          ],
        },
      ],
      "/components/": [
        {
          text: "组件",
          items: [
            {
              text: "tabs",
              link: "/components/tabs/",
            },
            {
              text: "filter",
              link: "/components/filter/",
            },
            {
              text: "table",
              link: "/components/table/",
            },
          ],
        },
      ],
      "/tools/": [
        {
          text: "Hooks",
          items: [
            {
              text: "useTableData",
              link: "/tools/useTableData/",
            }
          ],
        },
      ]
    },
    editLink: {
      pattern: 'https://github.com/jinxb/nexus-ui//tree/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2023-present'
    }
  }
}

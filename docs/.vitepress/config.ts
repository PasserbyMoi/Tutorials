import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tutorials",
  description: "Tutorials",
  // 设置公共基本路径，如果您的网站将在子路径中提供服务
  base: '/',
  srcDir: '../docs',
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: '../public',
  // 忽略死链接，VitePress 不会因死链接而使构建失败
  ignoreDeadLinks: true,
  lastUpdated: true,
  //lang: 'zh_CN',
  //cleanUrls: true,

  // head: [
  //   ['meta', { name: 'theme-color', content: '#3c8772' }],
  //   [
  //     'script',
  //     {
  //       src: 'https://cdn.usefathom.com/script.js',
  //       'data-site': 'AZBRSFGG',
  //       'data-spa': 'auto',
  //       defer: ''
  //     }
  //   ]
  // ],

  rewrites: {
    // 'packages/pkg-a/src/pkg-a-docs.md': 'pkg-a/index.md',
    // 'packages/pkg-b/src/pkg-b-docs.md': 'pkg-b/index.md',
    // 'packages/:pkg/src/(.*)': ':pkg/index.md'
  },

  // 配置 markdown 解析器选项
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true,
    // adjust how header anchors are generated,
    // useful for integrating with tools that use different conventions
    anchor: {
      slugify(str) {
        return encodeURIComponent(str)
      }
    }
  },

  // Vite config options
  vite: {},
  // @vitejs/plugin-vue options
  vue: {},

  themeConfig: {
    logo: 'https://ensoul.club/images/logo/square.jpg',
    // 本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    sidebar: {
      '/AI/': sidebarAI(),
      '/Tools/devbox/': sidebarDevbox(),
      '/Tools/Examples/': sidebarExamples()
    },

    socialLinks: [
      { icon: 'slack', link: 'https://ensoul.club/' },
      { icon: 'discord', link: 'https://discord.gg/cMPQAHKB' },
      { icon: 'github', link: 'https://github.com/PasserbyMoi/Tutorials.git' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
        },
        link: '...',
        ariaLabel: 'cool link'
      }
    ],

    // 页脚配置。您可以在页脚上添加消息或版权文本，但是，仅当页面不包含侧边栏时才会显示。这是由于设计问题。
    footer: {
      copyright: 'Copyright © 2023 赋予灵魂',
      message: '备案号：<a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2021008660号</a>',
    },

    // 编辑链接允许您显示一个链接，用于在 Git 管理服务（如 GitHub 或 GitLab）上编辑页面。
    editLink: {
      pattern: 'https://github.com/PasserbyMoi/Tutorials/develop/docs/:path',
      text: '编辑此页面'
    }

  }
})

function nav() {
  return [
    { text: 'Home', link: '/', activeMatch: '/' },
    { text: 'AI', link: '/AI/audiocraft-music-install', activeMatch: '/AI/' },
    {
      text: 'Tools', activeMatch: '/Tools/',
      items: [
        {
          text: 'Devbox',
          link: '/Tools/devbox/01.devbox 的基本使用'
        },
        {
          text: 'Examples',
          link: '/Tools/Examples/markdown-examples'
        }
      ]
    },
    {
      text: '关于',
      items: [
        {
          text: 'Blog',
          link: 'https://ensoul.club/',
          target: '_blank',
          rel: 'Blog'
        },
      ]
    }
  ]
}

function sidebarAI() {
  return [
    {
      text: 'stable-diffusion-webui',
      items: [
        { text: 'Stable Diffusion WebUI Install', link: '/AI/stable-diffusion-webui/Stable Diffusion WebUI Install' }
      ]
    },
    {
      text: 'audiocraft-music-install',
      items: [
        { text: 'audiocraft-music-install', link: '/AI/audiocraft-music-install.md' }
      ]
    },
  ]
}

function sidebarExamples() {
  return [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' }
      ]
    },
  ]
}

function sidebarDevbox() {
  return [
    {
      text: 'devbox',
      collapsed: false,
      items: [
        { text: 'devbox 的基本使用', link: '/Tools/devbox/01.devbox 的基本使用' },
        { text: 'devbox 配置项目', link: '/Tools/devbox/02.devbox 配置项目' },
        { text: 'devbox json 参考', link: '/Tools/devbox/03.devbox json 参考' },
        { text: 'devbox 相关命令', link: '/Tools/devbox/04.devbox 相关命令' },
        { text: '在 CICD 中使用 devbox', link: '/Tools/devbox/05.在 CICD 中使用 devbox' },
      ]
    }
  ]
}

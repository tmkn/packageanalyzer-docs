import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const config: Config = {
    title: "packageanalyzer",
    tagline: "A framework to introspect Node.js packages",
    url: "https://packageanalyzer-docs.vercel.app/",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    favicon: "img/favicon.ico",
    organizationName: "tmkn", // Usually your GitHub org/user name.
    projectName: "packageanalyzer-docs", // Usually your repo name.
    themeConfig: {
        algolia: {
            appId: "XSXSD2EE9P",
            apiKey: "e7f74acdb7de6b6b5b029c9dbfb3fa78",
            indexName: "packageanalyzer"
        },
        announcementBar: {
            id: "support_us", // Any value that will identify this message.
            content:
                "As the packageanalyzer is currently a work in progress, the documentation might not be up to date in all areas!",
            backgroundColor: "#03a9f4", // Defaults to `#fff`.
            textColor: "white", // Defaults to `#000`.
            isCloseable: true // Defaults to `true`.
        },
        image: "https://i.imgur.com/5Ke7jFs.png",
        navbar: {
            title: "packageanalyzer",
            /*logo: {
        alt: 'packageanalyzer documentation',
        src: 'img/logo.svg',
      },*/
            items: [
                {
                    type: "doc",
                    docId: "intro",
                    position: "left",
                    label: "Docs"
                },
                { to: "/blog", label: "Blog", position: "left" },
                { to: "/about", label: "About", position: "right" },
                {
                    href: "https://github.com/tmkn/packageanalyzer-docs",
                    label: "GitHub",
                    position: "right"
                }
            ]
        },
        footer: {
            style: "dark",
            links: [
                /*{
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },*/
                {
                    title: "Community",
                    items: [
                        {
                            label: "Twitter",
                            href: "https://twitter.com/tmkndev"
                        }
                    ]
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Blog",
                            to: "/blog"
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/tmkn/packageanalyzer-docs"
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} packageanalyzer. Built with Docusaurus.`
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme
        }
    } satisfies Preset.ThemeConfig,
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    showLastUpdateTime: true,
                    //showLastUpdateAuthor: true,
                    sidebarPath: require.resolve("./sidebars.ts"),
                    // Please change this to your repo.
                    editUrl: "https://github.com/tmkn/packageanalyzer-docs/edit/master/"
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: "https://github.com/tmkn/packageanalyzer-docs/edit/master/"
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css")
                }
            } satisfies Preset.Options
        ]
    ],
    scripts: [
        {
            src: "/stats/js/script.js",
            "data-api": "/stats/api/event",
            "data-domain": "packageanalyzer-docs.vercel.app",
            async: true
        }
    ]
};

export default config;
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'packageanalyzer',
  tagline: 'A framework to introspect Node.js packages',
  url: 'https://github.com/tmkn/packageanalyzer',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tmkn', // Usually your GitHub org/user name.
  projectName: 'packageanalyzer-docs', // Usually your repo name.
  themeConfig: {
    image: 'https://i.imgur.com/5Ke7jFs.png',
    navbar: {
      title: 'packageanalyzer',
      /*logo: {
        alt: 'packageanalyzer documentation',
        src: 'img/logo.svg',
      },*/
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Welcome',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/about', label: 'About', position: 'right'},
        {
          href: 'https://github.com/tmkn/packageanalyzer-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
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
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/tmkndev',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/tmkn/packageanalyzer-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} packageanalyzer. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/tmkn/packageanalyzer-docs/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/tmkn/packageanalyzer-docs/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

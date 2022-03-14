const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'packageanalyzer',
  tagline: 'A framework to introspect Node.js packages',
  url: 'https://packageanalyzer-docs.vercel.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'tmkn', // Usually your GitHub org/user name.
  projectName: 'packageanalyzer-docs', // Usually your repo name.
  themeConfig: {
    announcementBar: {
      id: 'support_us', // Any value that will identify this message.
      content:
        'As the packageanalyzer is currently a work in progress, the documentation might not be up to date in all areas!',
      backgroundColor: '#03a9f4', // Defaults to `#fff`.
      textColor: 'white', // Defaults to `#000`.
      isCloseable: true, // Defaults to `true`.
    },
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
          label: 'Docs',
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
          showLastUpdateTime: true,
          //showLastUpdateAuthor: true,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/tmkn/packageanalyzer-docs/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/tmkn/packageanalyzer-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

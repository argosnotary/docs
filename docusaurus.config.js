module.exports = {
  title: 'Argos Notary',
  url: 'https://argosnotary.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'Argos Notary Incorporated',
  projectName: 'argosnotary/argos',
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Argos Notary Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/00_introduction/intro',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/argosnotary/argos',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Argos Notary, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/argosnotary/docs/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

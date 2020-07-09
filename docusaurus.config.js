/*
 * Copyright (C) 2019 - 2020 Rabobank Nederland
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
  title: 'Argos Notary',
  url: 'https://argosnotary.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'argosnotary',
  projectName: 'argosnotary.github.io',
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Argos Notary Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/00_overview/10_overview',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/argosnotary',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contact',
          items: [
            {
              label: 'e-mail',
              href: 'mailto:info@argosnotary.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Argos Notary, Built with Docusaurus.`,
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
  plugins: [(md) => {
      require('remarkable-plantuml')(md);
  }],
};

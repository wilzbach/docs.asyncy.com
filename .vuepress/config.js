const path = require('path');

module.exports = {
  title: 'Storyscript',
  description: 'Build smarter applications.',
  ga: 'UA-111475156-5',
  theme: 'story',
  themeConfig: {
    algolia: {
      apiKey: 'daa25e161a8e69d7649ae46784fa45d5',
      indexName: 'asyncy'
    },
    sass: true,
    lastUpdated: 'Last Updated',
    repo: 'storyscript/docs.storyscript.io',
    repoLabel: 'Edit on GitHub',
    editLinks: true,
    sidebarDepth: 1,
    nav: [{
      name: 'Blog',
      link: '//storyscript.io/blog'
    }, {
      name: 'Docs',
      link: '//docs.storyscript.io',
      active: true
    }, {
      name: 'About',
      link: '//storyscript.io/about'
    }, {
      name: 'Hub',
      link: '//hub.storyscript.io'
    }, {
      name: 'Github',
      button: {
        url: '//github.com/storyscript',
        outlined: true,
        state: 'light',
        size: 'small',
        iconRight: 'github-face'
      }
    }],
    sidebar: [
      '/quick-start/',
      {
         title: 'Storyscript',
         collapsable: true,
         children: [
           '/storyscript/intro/',
           '/storyscript/syntax/',
           '/storyscript/execution/',
           '/storyscript/services/',
           '/storyscript/basic-types/',
           '/storyscript/functions/',
           '/storyscript/flow/',
           '/storyscript/advanced/',
         ]
       },
      '/services/',
      '/functions/',
      '/cli/',
      // {
      //   title: 'API',
      //   collapsable: false,
      //   children: [
      //     '/rest-api/',
      //     '/graphql/',
      //   ]
      // },
      '/faq/',
      '/support/'
    ]
  }
}

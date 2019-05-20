module.exports = {
  title: 'Storyscript',
  description: 'Build smarter applications.',
  ga: 'UA-111475156-5',
  themeConfig: {
    algolia: {
      apiKey: 'daa25e161a8e69d7649ae46784fa45d5',
      indexName: 'asyncy'
    },
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
    }],
    sidebar: [
      '/quick-start/',
      {
         title: 'Storyscript',
         collapsable: false,
         children: [
           '/storyscript/intro/',
           '/storyscript/semantics/',
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

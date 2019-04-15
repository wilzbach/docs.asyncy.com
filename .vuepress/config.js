module.exports = {
  title: 'Asyncy',
  description: 'Build smarter applications.',
  ga: 'UA-111475156-5',
  themeConfig: {
    algolia: {
      apiKey: 'daa25e161a8e69d7649ae46784fa45d5',
      indexName: 'asyncy'
    },
    lastUpdated: 'Last Updated',
    repo: 'asyncy/docs.asyncy.com',
    repoLabel: 'Edit in GitHub',
    editLinks: true,
    sidebarDepth: 1,
    nav: [{
      name: 'blog',
      link: '//asyncy.com/blog'
    }, {
      name: 'Hub',
      link: '//hub.asyncy.com'
    }, {
      name: 'About',
      link: '//asyncy.com/about'
    }, {
      name: 'Contact',
      link: '//asyncy.com/contact'
    }],
    sidebar: [
      '/quick-start/',
      '/storyscript/',
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
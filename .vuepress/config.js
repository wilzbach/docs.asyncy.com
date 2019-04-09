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
    nav: [
      { text: 'Platform', link: 'https://asyncy.com' },
      // {
      //   text: 'More',
      //   items: [
      //     { text: 'Blog', link: '//medium.com/asyncy' },
      //     { text: 'Asyncy Hub', link: '//hub.asyncy.com' }
      //   ]
      // }
    ],
    sidebar: [
      '/quick-start/',
      '/storyscript/',
      '/services/',
      '/cli/',
      // {
      //   title: 'API',
      //   collapsable: false,
      //   children: [
      //     '/rest-api/',
      //     '/graphql/',
      //   ]
      // },
      {
        title: 'Architecture',
        children: [
          '/architecture/diagrams/'
        ]
      },
      {
        title: 'Reference',
        children: [
          '/reference/exposing_services/'
        ]
      },
      '/faq/',
      '/support/'
    ]
  }
};

({
  baseUrl: './',
  name: 'popbox',
  out: "./popbox-" + process.env.npm_package_version + ".min.js",
  paths: {
    dtools: 'empty:',
    template: 'empty:',
    jquery: 'empty:',
    text: './test/lib/text/text',
  },
  exclude: ['text']
})

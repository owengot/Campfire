module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Campfire',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Campfire Dashboard' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/primer.css'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/style.css'
  ],
  /*
   ** Site Modules
   */
  modules: [
    ['@nuxtjs/pwa', { icon: false }]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#24292e' },
  /*
   ** Router config
   */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  router: {
    // middleware: 'check-auth'
  },
  plugins: [
    {
      src: '~/plugins/auth',
      ssr: false
    }
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'firebase',
      'firebase-auth',
      'vuexfire'
    ],
    // put CSS in files instead of JS bundles
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

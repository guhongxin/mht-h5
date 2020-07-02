
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: "游戏,末日血战" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/swiper.min.js' },
      // { src: '/js/vconsole.min.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style/index.scss',
    '@/assets/style/swiper.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vant.js',
    { src:'@/plugins/amfe-flexible.js', ssr: false },
    '@/plugins/request.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'js-cookie'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
  */
  postcss: [
      require('postcss-pxtorem')({
        rootValue: 37.5, // vant-UI的官方根字体大小是37.5
        propList: ['*']
      }),
      require('autoprefixer')({
        browsers: ['Android >= 4.0', 'iOS >= 7']
      })
    ],
    extend (config, ctx) {
    }
  },
 
  env: {
    // BASE_URL: "http://192.168.1.16:9101"
    // BASE_URL: "http://118.25.146.170/mgp"
    BASE_URL: "http://mrxz-2y-page.17173g.cn/mgp"
    // BASE_URL: "http://t-static.tyu89.wang/mgp"
  }
}

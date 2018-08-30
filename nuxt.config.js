const webTitle = "Nusa Penida Tourism Board"

module.exports = {
    head: {
        htmlAttrs: {
            lang: 'en'
        },
        title: webTitle,
        titleTemplate: `%s | ${webTitle}`,
        meta: [
            { charset: 'utf-8' },
            { name:"google-site-verification", content:"ikaNaw186Qjr7RE7CXcAZ2b1VSrYN8oakmVc9lYVvK0" },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            //manifest theme
            { name: 'apple-mobile-web-app-title', content: webTitle },
            { name: 'application-name', content: webTitle },
            { name: 'msapplication-TileColor', content: '#fe6601' },
            { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
            { name: 'theme-color', content: '#fe6601' },
            //robots
            { name: "robots", content: "noodp,noydir" },
            //social media
            { property: 'og:site_name', content: webTitle },
            { property: 'og:type', content: 'website' },
            { property: 'og:locale', content: 'en_US' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@janumedia' },
            { name: 'twitter:creator', content: '@janumedia' }
        ],
        link: [
            { rel: 'apple-touch-icon', type: 'image/x-icon', size: "180x180", href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/x-icon', size: "32x32", href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/x-icon', size: "16x16", href: '/favicon-16x16.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: "preload", href:"https://fonts.googleapis.com/css?family=Catamaran", as:"style"},
            { rel: "stylesheet", href:"https://fonts.googleapis.com/css?family=Catamaran", bottom: true},
            { rel: "preconnect", href:"https://fonts.gstatic.com/", crossorigin:"crossorigin"},
        ],
        //disable sanitize to quote https://github.com/nuxt/nuxt.js/issues/2230#issuecomment-346997270
        __dangerouslyDisableSanitizers: ['script']    
    },
    loading: {
        color: '#FE6601',
        height: '4px'
    },
    css: [
        "@/assets/css/style.scss"
    ],
    build: {
        //extract css
        extractCSS: true,
        //generate js filenames without chunkhash
        filenames: {
            css: '[name].css',
            manifest: 'manifest.js',
            vendor: 'common.js',
            app: 'app.js',
            chunk: '[name].js'
        }, 
    },
    env: {
        //fixed axios ECONNREFUSED for static local json
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }

}
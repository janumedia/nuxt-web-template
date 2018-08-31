import splash from "@/components/splash"
import headerMenu from "@/components/header"
import footerPage from "@/components/footer"

import data from "@/assets/data/menu.js"

export default {
    components: {
        splash, headerMenu, footerPage
    },
    head: {
        link: [
            { rel: "preload", href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css", as: "style" },
            { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css", bottom: true }
        ],
        script: [
            { src: '/js/app.js', body: true },
        ]
    },
    data() {
        return {
            list: data.menu
        }
    }
}
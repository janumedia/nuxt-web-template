import utils from "@/assets/js/utils/utils"

const GA_CODE = "YOUR_GA_CODE";
const DOMAIN  = "https://nuxt-web-template.herokuapp.com";

export default {
    head() {
        return {
            title: this.removeHTMLTags(this.$store.state.pageTitle),
            meta: [
                { name: 'description', content: this.removeHTMLTags(this.$store.state.pageDesc) },
                { property: 'og:title', content: this.removeHTMLTags(this.$store.state.pageTitle) },
                { property: 'og:url', content: `${DOMAIN}${this.$route.path}` },
                { property: 'og:description', content: this.removeHTMLTags(this.$store.state.pageDesc) },
                { property: 'og:image', content: this.$store.state.metaImage },
                { name: 'twitter:title', content: this.removeHTMLTags(this.$store.state.pageTitle) },
                { name: 'twitter:description', content: this.removeHTMLTags(this.$store.state.pageDesc) },
                { name: 'twitter:image', content: this.$store.state.metaImage }
            ],
            script: [
                { innerHTML: this.googleAnalytic(), body: true},
            ]
        }
    },
    methods: {
        removeHTMLTags(s) {
            return s.replace(/<(.|\n)*?>/g, "")
        },
        googleAnalytic() {
            return `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '${GA_CODE}', 'auto');ga('send', 'pageview');`
        },
        fadeOut(to, from, next) {
            utils.fadeOut(document.querySelector("#footer"), true)
            .then(() => {
                return utils.fadeOut(document.querySelector(".container"), true)
            })
            .then(() => {
                return utils.fadeOut(document.querySelector(".banner-info"), true)
            })
            .then(() => {
                return utils.fadeOut(document.querySelector(".logo"), true)
            })
            .then(() => {
                return utils.fadeOut(document.querySelector("#header"), true)
            })
            .then(() => {
                if(to.name === from.name) {
                    window.scrollTo(0, 0)
                    this.$store.state.pageTitle = this.$store.state.pageData.name
                    this.$store.state.pageDesc = this.$store.state.pageData.pageDesc
                } else 
                {
                    this.$store.state.pageData = null
                    this.$store.state.loading = true
                }
                next();
            });
        }
    },
    mounted(){
        this.$store.state.loading = false;
        if(!this.$store.state.initiated) {
            this.$store.state.initiated = true
            return
        }
        utils.fadeIn(document.querySelector(".logo"))
        .then(() => {
            return utils.fadeIn(document.querySelector("#header"))
        })
        .then(() => {
            return utils.fadeIn(document.querySelector(".banner-info"))
        })
        .then(() => {
            return utils.fadeIn(document.querySelector(".container"))
        })
        .then(() => {
            return utils.fadeIn(document.querySelector("#footer"))
        })
    },
    //we avoid using arrow function here to have access to $store
    beforeRouteLeave: function (to, from, next) {
        this.fadeOut(to, from, next)
    },
    //firing for dynamic routes
    //https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
    beforeRouteUpdate: function(to, from, next) {
        //window.scrollTo(0, 0)
        this.fadeOut(to, from, next)
    }
}
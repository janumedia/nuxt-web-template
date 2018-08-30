import {mapState} from "vuex";
import utils from "@/assets/js/utils/utils"

export default {
    head() {
        return {
            title: this.removeHTMLTags(this.pageData.title),
            meta: [
                { name: 'description', content: this.removeHTMLTags(this.pageData.desc) },
                { property: 'og:title', content: this.removeHTMLTags(this.pageData.title) },
                { property: 'og:url', content: `${this.WEB_ADDRESS}${this.$route.path}` },
                { property: 'og:description', content: this.removeHTMLTags(this.pageData.desc) },
                { property: 'og:image', content: this.pageData.metaImage },
                { name: 'twitter:title', content: this.removeHTMLTags(this.pageData.title) },
                { name: 'twitter:description', content: this.removeHTMLTags(this.pageData.desc) },
                { name: 'twitter:image', content: this.pageData.metaImage }
            ],
            script: [
                { innerHTML: this.googleAnalytic(), body: true},
            ]
        }
    },
    computed: {
        ...mapState(['initiated', 'loading', 'pageData', 'nextLink', 'WEB_ADDRESS', 'GA_CODE'])
    },
    methods: {
        removeHTMLTags(s) {
            if(!s) return "";
            return s.replace(/<(.|\n)*?>/g, "")
        },
        googleAnalytic() {
            return `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '${this.GA_CODE}', 'auto');ga('send', 'pageview');`
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
                }
                this.$store.dispatch("setPageData", {...this.pageData, title: "Loading"});
                this.$store.dispatch("setLoading", true);
                if(next) next();
            });
        }
    },
    mounted(){
        this.$store.dispatch("setLoading", false);
        /*if(!this.initiated) {
            this.$store.dispatch("setInit", true);
            return;
        }*/
        //in case there're fade animation, should stopped
        utils.clearFade();
        //hide all
        utils.setOpacity(document.querySelector(".logo"), 0);
        utils.setOpacity(document.querySelector("#header"), 0);
        utils.setOpacity(document.querySelector(".banner-info"), 0);
        utils.setOpacity(document.querySelector(".container"), 0);
        utils.setOpacity(document.querySelector("#footer"), 0);

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
    beforeRouteLeave: function (to, from, next) {
        this.fadeOut(to, from, next)
    },
    //watch on nextLink change,
    //currently solution to listen if router path updated
    watch: {
        "nextLink": function(to, from) {
            if(!from) return
            if(from.path !== to.path) this.fadeOut(to, this.$route);           
        }
    }
}
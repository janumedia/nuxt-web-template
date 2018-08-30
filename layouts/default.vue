<template>
    <div>
        <splash/>
        <div id="wrapper">
            <header-menu :list="list"/>
            <div class="banner-info">
                <h1 v-show="!pageData.layout" class="quote" v-html="pageData.title"></h1>
                <div v-show="!pageData.layout">
                    <p>{{pageData.desc}}</p>
                </div>
                <div v-if="pageData.layout" class="container">
                    <nuxt></nuxt>
                </div>
            </div>
            <div v-if="!pageData.layout" class="container">
                <nuxt></nuxt>
            </div>
            <footer-page/>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
import layout from "@/mixins/layout"
export default {
    mixins: [layout],
    computed: {
        ...mapState(['pageData'])
    }
}
</script>
<style lang="scss">
.banner-info {
    > div {
        white-space: pre-line;
    }
}
</style>




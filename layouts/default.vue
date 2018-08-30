<template>
    <div>
        <splash/>
        <div id="wrapper">
            <header-menu :list="list"/>
            <div class="banner-info">
                <h1 v-show="$store.state.layout == 'default'" class="quote" v-html="$store.state.pageTitle"></h1>
                <div v-show="$store.state.layout == 'default'">
                    <p>{{$store.state.pageDesc}}</p>
                </div>
                <div v-if="$store.state.layout != 'default'" class="container">
                    <nuxt></nuxt>
                </div>
            </div>
            <div v-if="$store.state.layout == 'default'" class="container">
                <nuxt></nuxt>
            </div>
            <footer-page/>
        </div>
    </div>
</template>
<script>
import layout from "@/mixins/layout"
export default {
    mixins: [layout]
}
</script>
<style lang="scss">
.banner-info {
    > div {
        white-space: pre-line;
    }
}
</style>




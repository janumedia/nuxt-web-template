<template>
    <div>
        <splash/>
        <div id="wrapper">
            <header-menu :list="list"/>
            <div class="banner-info">
                <div class="container">
                    <nuxt></nuxt>
                </div>
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


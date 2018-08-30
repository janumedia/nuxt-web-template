<template>
    <div>
        <section v-if="body" :class="$store.state.layout == 'default' ? 'section-body' : ''">
            <div v-if="$store.state.layout == 'default'" class="preheader-hidden">
                <h2>Hot Tour Destination in Nusa Penida</h2>
            </div>
            <div v-for="(item, index) in body" :key="`b_${index}`" :class="index > 0? 'next' : ''">
                <div v-if="(item.chessGrid || item.tilesGrid) && item.name && index > 0" class="preheader" style="margin-top: 40px">
                    <h2>{{item.name}}</h2>
                </div>
                <chess-grid v-if="item.chessGrid" :list="item.chessGrid"/>
                <tiles-grid v-if="item.tilesGrid" :list="item.tilesGrid" :square="item.square" :thumbnailMode="item.thumbnailMode" :numColumns="item.numColumns"/>
                <listBox v-if="item.listBox" :list="item.listBox"/>
                <div v-if="item.slides">
                    <slide-images :list="item.slides"/>
                </div>
                <div v-if="item.googleMap">
                    <google-map :lat="item.googleMap.lat" :long="item.googleMap.long"/>
                    <br>
                    <div class="text-center">
                        <Button :url="`https://www.google.com/maps/dir//${item.googleMap.lat},${item.googleMap.long}`" label="Get Direction"/>
                    </div>
                </div>
                <div v-if="item.googleReview">
                    <google-review :placeID="item.googleReview.placeID"/>
                </div>
            </div>
        </section>
        <section v-if="footer">
            <div v-for="(item, index) in footer" :key="`f_${index}`" :class="index > 0? 'next' : ''">
                <h2 v-if="item.name" class="text-center">{{item.name}}</h2>
                <div v-if="item.slides">
                    <slide-images :list="item.slides"/>
                </div>
                <div v-if="item.googleMap">
                    <google-map :lat="item.googleMap.lat" :long="item.googleMap.long"/>
                    <br>
                    <div class="text-center">
                        <Button :url="`https://www.google.com/maps/dir//${item.googleMap.lat},${item.googleMap.long}`" label="Get Direction"/>
                    </div>
                </div>
                <div v-if="item.googleReview">
                    <google-review :placeID="item.googleReview.placeID"/>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Button from "@/components/core/Button"
import LazyImage from "@/components/core/LazyImage"
import Table from "@/components/core/Table"
import chessGrid from '@/components/list/chess-grid'
import tilesGrid from '@/components/list/tiles-grid'
import listBox from '@/components/list/list-box'
import slideImages from "@/components/list/slide-images"
import googleMap from "@/components/vendor/google-map"
import googleReview from '@/components/vendor/google-review'

export default {
    components: {
        Button, LazyImage, Table,
        chessGrid, tilesGrid, listBox, slideImages,
        googleMap, googleReview
    },
    props:["body", "footer"],
    data() {
        return {
            title: "demo"
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";

body section:not(:first-child) {
    padding-top: 40px;
}

section {
    padding: 30px;
}

.section-body {
    background-color: $bgSubColor;
}

.next {
    margin-top: 30px;
}

@media only screen and (max-width:720px) {
    section {
        padding: 20px;
    }
}

</style>

<template>
    <section v-if="list" :class="!$store.state.pageData.layout ? 'section-body' : ''">
        <div v-if="!$store.state.pageData.layout && $store.state.pageData.title" class="preheader-hidden">
            <h2>{{ $store.state.pageData.title }}</h2>
        </div>
        <div v-for="(item, index) in list" :key="`b_${index}`" :class="index > 0? 'next' : ''">
            <div v-if="item.name" class="preheader" style="margin-top: 40px">
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
            <div v-if="item.table">
                <Table 
                    :headers="item.tableHeaders"
                    :items="item.table"
                />
            </div>
        </div>
    </section>
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
    props: {
        list: { type: Array }
    }
}
</script>
<style lang="scss">
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

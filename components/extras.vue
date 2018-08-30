<template>
    <section v-if="list">
        <div v-for="(item, index) in list" :key="`f_${index}`" :class="index > 0? 'next' : ''">
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
</template>
<script>
import Button from "@/components/core/Button"
import slideImages from "@/components/list/slide-images"
import googleMap from "@/components/vendor/google-map"
import googleReview from '@/components/vendor/google-review'

export default {
    components: {
        Button, slideImages,
        googleMap, googleReview
    },
    props: {
        list: { type: Array }
    }
}
</script>

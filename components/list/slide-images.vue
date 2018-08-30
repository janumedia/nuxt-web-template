<template>
    <div class="slide-images">
        <div v-for="(slide, i) in list" :key="i">
            <lazy-image 
                :src="slide.img.indexOf('http') > -1 ? slide.img : slide.img" 
                :title="(slide.name ? slide.name : 'slide')"
                @onLoaded="imageReady"
            />
            <p v-if="slide.name || slide.credit">{{ slide.name }}{{ slide.credit ? `${slide.name ? ', ' : ''}credit by ${slide.credit}` : ''}}</p>
            <p v-else-if="list.find(slide =>slide.credit)">&nbsp;</p>
        </div>   
    </div>
</template>
<script>
import $ from 'jquery'
import LazyImage from "@/components/core/LazyImage"
import {registerListener, unRegisterListener, inViewPort} from "@/assets/js/events/events"

const onScroll = () => {
    registeredComponent.map(component => {
        if(component.slick) component.slick.slick(inViewPort(component.$el) ? "slickPlay" : "slickPause")
    })
}

const initScrollListener = (f) => {
    registeredComponent.push(f);
    if(init) return;
    //https://nuxtjs.org/faq/window-document-undefined/
    if(process.browser) {
        registerListener("scroll", onScroll);
        registerListener("resize", onScroll);
        //process next tick if new componend added
        setTimeout(onScroll);
    }
    init = true;
}

const dispose = (f) => {
    let index = registeredComponent.indexOf(f);
    if(index > -1) registeredComponent.splice(index, 1);
    if(registeredComponent.length <= 0) {
        unRegisterListener("scroll", onScroll);
        unRegisterListener("resize", onScroll);
        init = false;
    }
}

let init, registeredComponent = [];

export default {
    props: ["list"],
    components: { LazyImage },
    data() {
        return {
            placeHolder: "/images/assets/3x2-placeholder.svg",
            slick: null,
            sliding: false
        }
    },
    methods: {
        imageReady(el) {
            this.slick.slick(inViewPort(el.$el) ? 'slickPlay': 'slickPause');   
        }
    },
    mounted() {
        //load slick-corousel here to wait window loaded
        require("slick-carousel")
        //start slick
        this.slick = $(this.$el);
        this.slick.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
            const img = slick.$slides[nextSlide].querySelector('img');
            const src = img.getAttribute('data-src');
            if(src) {
                setTimeout(() => this.slick.slick('slickPause'));
                LazyImage.loadImage(img);
            }
        });

        this.slick.slick({
            infinite: false,//true,
            //arrows: true,
            //adaptiveHeight: true,
            lazyLoad: 'ondemand',//'progressive',
            autoplay: true,
            autoplaySpeed: 6000,
            //useTransform: true,
            //cssEase: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
        });
        //register scroll event
        initScrollListener(this);
    },
    beforeDestroy() {
        dispose(this);
    }
}
</script>
<style lang="scss">
.slide-images {
    p {
        text-align: left;
        padding-top: 8px;
    }
    img {
        width: 100%;
    }
}

// display rows only when image hover //
.slick-slider .slick-arrow {
    display: none !important;
}
.slick-slider:hover .slick-arrow {
    display: inline !important;
}
// Arrows //
.slick-prev,
.slick-next
{
    font-size: 0;
    line-height: 0;

    position: absolute;
    top: calc(50% - 40px);

    display: block;

    width: 40px;
    height: 40px;
    padding: 0;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);

    cursor: pointer;

    color: transparent;
    border: none;
    outline: none;
    background-color: rgba(52, 44, 44, 0.4);
    opacity: 0.6;

    z-index: 1;
}
.slick-prev:hover,
.slick-next:hover
{
    background-color: rgba(52, 44, 44, 0.6);
}
.slick-prev
{
    left: 0px;
    background-image: url("/images/assets/icon-expand-white.svg");
    background-size: cover;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
}
.slick-next
{
    right: 0px;
    background-image: url("/images/assets/icon-expand-white.svg");
    background-size: cover;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
}
.slick-slider img {
    width: 100%;
}
</style>

<template>
    <div :class="`${className} ${verticalAlign ? className + '--vertical-align' : ''}`">
        <nuxt-link v-if="url !== undefined && url.indexOf('http') == -1" :to="url" :title="title">
            <lazy-image 
                :src="src" 
                :title="title" 
                :square="square" 
                @onReady="imageReady" 
                @onLoaded="imageLoaded"
                @onError="imageError"
            />
            <div v-if="thumbnailMode" :class="`${className}__title`"><span>{{ title }}</span></div>
        </nuxt-link>
        <a v-else-if="url !== undefined && url.indexOf('http') > -1" :href="url" target="_blank" :title="title">
            <lazy-image 
                :src="src" 
                :title="title" 
                :square="square" 
                @onReady="imageReady" 
                @onLoaded="imageLoaded"
                @onError="imageError"
            />
        </a>
        <span v-else>
            <lazy-image 
                :src="src" 
                :title="title" 
                :square="square" 
                @onReady="imageReady" 
                @onLoaded="imageLoaded"
                @onError="imageError"
            />
        </span>
    </div>
</template>
<script>
import LazyImage from "@/components/core/LazyImage"
export default {
    props: ["src", "url", "title", "square", "thumbnailMode", "verticalAlign"],
    components: {
        LazyImage
    },
    data() {
        return {
            className: "linked-image"
        }
    },
    methods: {
        imageReady(el, index) {
            this.$emit('onReady', this, index);
        },
        imageLoaded(el, index) {
            this.$emit('onLoaded', this, index);
        },
        imageError(index) {
            this.$emit('onError', this, index);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.linked-image {
    a {
        &:hover .linked-image__title {
            opacity: 1;
        }
    }
    &__title {
        text-align: center;
        color: rgba(255, 255, 255, 1);
        text-transform: uppercase;
        letter-spacing: 0.3em;
        font-weight: 700;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        width:auto;
        background: rgba(0, 0, 0, 0.1);
        @include transition(opacity 0.35s);
        span {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            padding: 20px;
            @include translateY(-50%);
        }
    }
    &--vertical-align {
        position:absolute;
        top:0;
        left: 0;
        right: 0;
        width:auto;
        height: 100%;
        img {
            top:0;
        }
    }
}
// mouse hover supported only. usually for non touch devices //
@media only screen and (hover:hover) {
    .linked-image {
        a {
            div {
                opacity: 0.85;
                // fix move, scale issue //
                -webkit-filter: brightness(1.01);
                -moz-filter: brightness(1.01);
                -o-filter: brightness(1.01);
                -ms-filter: brightness(1.01);
                filter: brightness(1.01);
            }
            &:hover div {
                opacity: 1;
            }
        }
        &__title {
            opacity: 0;
        }
    }
}
</style>

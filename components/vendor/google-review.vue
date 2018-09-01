<template>
    <div id="google-review">
        <div v-for="(item, index) in reviews" :key="index" class="google-review__item">
            <div class="google-review-meta">
                <p class="google-review__text">{{ item.text }}</p>
            </div>
            <div class="google-review__stars">
                <ul>
                    <li v-for="i in Math.floor(item.rating)" :key="'star'+i">
                        <span class="google-review__star"></span>
                    </li>
                    <li v-for="i in (5 - Math.floor(item.rating))" v-if="item.rating < 5" :key="'half-star'+i">
                        <span :class="'google-review__star ' + (i == 1 && item.rating%1 > 0 ? 'google-review__star--half' : 'google-review__star--inactive')"></span>
                    </li>
                </ul>
            </div>    
            <span class="google-review__author">{{ item.author_name }}</span>
            <span class="google-review-sep">, </span><br>
            <span class="google-review__date">{{ item.reviewDate }}</span>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
import Loader from "@/assets/js/utils/script-loader"
import $ from "jquery"
import {registerListener, unRegisterListener, inViewPort} from "@/assets/js/events/events"

export default {
    props: {
        placeID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            url: "https://maps.googleapis.com/maps/api/js?",
            reviews: [],
            intervalID: null,
        }
    },
    computed: {
        ...mapState(['GOOGLE_KEY'])
    },
    methods: {
        googleMapCallback() {
            let service, months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            service = new google.maps.places.PlacesService(this.$el)
            service.getDetails({ placeId: this.placeID }, (place, status) => {
                this.reviews = place.reviews.map(review => {
                    let t = new Date(review.time * 1000)
                    review.reviewDate = months[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear()
                    return review;
                }).sort((a, b) => {
                    return a.time > b.time ? -1 : 1
                })
                this.onScroll();
            })
        },
        startSlide() {
            if(this.intervalID) return;
            if(this.$el.querySelectorAll(".google-review__item").length < 2) return;
            let text = this.$el.querySelector(".google-review__text").textContent;
            let totalWords = text ? text.split(" ").length : 1;
            // average reading speed 130 words per minute
            let delay = totalWords / 130 * 60 * 1000;    
            this.intervalID = setTimeout(() => {
                $("#google-review > div:first")
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo("#google-review");
                this.intervalID = null;
                this.startSlide();
            }, delay * 1.5); //extra delay 1.5x from average
            
        },
        onScroll() {
            if(inViewPort(this.$el)) {    
                this.startSlide();
            } else if(this.intervalID){
                clearTimeout(this.intervalID);
                this.intervalID = null;
            }
        }
    },
    mounted() {
        Loader.load(this.url + "&key=" + this.GOOGLE_KEY + "&libraries=places", this.googleMapCallback)
        registerListener("scroll", this.onScroll);
    },
    beforeDestroy(){
        unRegisterListener("scroll", this.onScroll);
    }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Fauna+One');

#google-review {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
}

.google-review {
    &__item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 20px;
        text-align: center;
        display: none;
        &:first-child {
            position: relative;
            display: block;
        }
    }
    &__author {
        color: #8d8d8d;
    }
    &__date {
        color: #afafaf;
        font-size: 0.8em;
    }
    &__star {
        color: #E4B248;
        font-size: 2em;
        position: relative;
        &::before {
            content: "\2605";
        }
        &--inactive {
            color: #dedddd;
        }
        &--half {
            color: #c6c6c6;
        }
        &--half::after {
            content: "\2605";
            color: #E4B248;
            position: absolute;
            left: 0;
            right: 50%;
            overflow: hidden;
        }
    }
    &__stars {
        ul {
            display: inline-block;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        li {
            float: left;
            margin-right: 5px;
            list-style: none;
        }
    }
    &__text {
        font-family: 'Fauna One', serif;
        font-style: italic;
        padding: 0;
        padding-bottom: 10px;
        margin: 0;
        &::before {
            position: relative;
            content: "\201C";
            font-size: 1.4em;
            top: 4px;
            left: -2px;
        }
        &::after {
            position: relative;
            content: "\201D";
            font-size: 1.4em;
            top: 4px;
            left: 2px;
        }
    }
}

</style>

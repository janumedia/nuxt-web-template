<template>
    <div class="list-box">
        <div v-for="(item, index) in list" :class="getClassName(item)" :key="index">
            <a v-if="item.linkTag" :name="item.linkTag"></a>           
            <lazy-image v-if="item.img" 
                :src="item.img"
            />
            <h3 v-if="item.name" class="list-box__item-name">{{ item.name }}</h3>
            <h3 v-if="item.subnamehead" class="list-box__item-subname" v-html="item.subnamehead"></h3>
            <div v-if="item.subname" class="list-box__item-subname" v-html="item.subname"></div>
            <div v-if="item.desc" class="list-box__item-desc" v-html="item.desc"></div>
            <div v-if="item.list">
                <span v-if="item.listname"><br>{item.listname}:</span>
                <ul>
                    <li v-for="(subitem, i) in item.list" v-html="subitem" :key="i"></li>
                </ul>
            </div>
            <div v-if="item.customList">
                <br>
                <div v-for="(item, i) in item.customList" :key="i">
                    <div v-if="typeof item == 'object'">
                        {{ item.name }}:
                        <ul>
                            <li v-for="(subitem, n) in item.items" v-html="subitem" :key="n"></li>
                        </ul>
                    </div>
                    <span v-else>{{ item }}</span>
                </div>
            </div>
            <ul v-if="item.customListWithNumber">
                <li v-for="(item, i) in item.customListWithNumber" :key="i">
                    <div v-if="typeof item == 'object'">
                        {{ item.name }}
                        <ul>
                            <li v-for="(subitem, n) in item.items" v-html="subitem" :key="n"></li>
                        </ul>
                    </div>
                    <span v-else>{{ item }}</span>
                </li>
            </ul>
            <div v-if="item.slides">
                <slide-images :list="item.slides"/>
            </div>
            <div v-if="item.googleMap">
                <google-map :lat="item.googleMap.lat" :long="item.googleMap.long"/>
                <br>
                <Button :url="`https://www.google.com/maps/dir//${item.googleMap.lat},${item.googleMap.long}`" label="Get Direction"/>
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
            <div v-if="item.note" class="list-box__item-desc"><b>Note:</b> {{ item.note }}</div>
            <br v-if="item.btnLabel">
            <Button v-if="item.btnLabel" :url="item.btnUrl" :label="item.btnLabel" primary/>
        </div>
    </div>
</template>
<script>
import {registerListener, unRegisterListener, inViewPort} from "@/assets/js/events/events"
import Button from "@/components/core/Button"
import LazyImage from "@/components/core/LazyImage"
import Table from "@/components/core/Table"
import slideImages from "@/components/list/slide-images"
import googleMap from "@/components/vendor/google-map"
import googleReview from "@/components/vendor/google-review"
export default {
    props: ["list", "last"],
    components: {
        Button, LazyImage, Table, slideImages, googleMap, googleReview
    },
    data() {
        return {
            placeHolder: "/images/assets/3x2-placeholder.svg",
        }
    },
    mounted() {
        registerListener("scroll", this.onScroll);
        this.onScroll();
    },
    methods: {
        getClassName (item) {
            let className = "list-box__item";
            if(item.customListWithNumber !== undefined) className = "list-box__item custom-list";
            return className + " list-box__item--hide" 
        },
        onScroll() {
            let items = this.$el.querySelectorAll(".list-box__item--hide");
            [].slice.call(items).map((item, index) => {
                if(inViewPort(item, 50)) {
                    setTimeout(() => {
                        item.classList.remove("list-box__item--hide");
                    }, index * 500);
                }
            });
        },
        beforeDestroy() {
            unRegisterListener("scroll", this.onScroll);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.list-box {
    &__item {
        background-color: $bgColor;
        padding: 20px;
        margin-bottom: 40px;
        position: relative;
        top: 0px;
        @include transition(opacity 0.35s, top 0.3s);
        :last-child {
            margin-bottom: 0;
        }
        img {
            width: 100%;
        }
        h3, 
        h4 {
            font-weight: normal;
            margin: 0;
        }
        ul {
            padding-left: 30px;
        }
        li {
            list-style:disc;
        }
        &--hide {
            opacity: 0;
            top: 50px;
        }
        &-name {
            font-size: 1.5em;
            line-height: 1.2em;
            padding-bottom: 10px;
        }
        &-subname {
            font-size: 1.2em;
            padding-bottom: 10px;
        }
        &-desc {
            margin-top: 20px;
        }
        &-custom {
            ul{
                padding-left: 20px;
            }
            li {
                list-style:decimal;
                font-weight: bold;
                li {
                    list-style:disc;
                    font-weight: normal;
                }
            }
        }
    }
}
@media only screen and (max-width:840px) {
    .list-box__item {
        margin-bottom: 30px;
    }
}
@media only screen and (max-width:768px) {
    .list-box__item {
        margin-bottom: 30px;
    }
}
@media only screen and (max-width:580px) {
    .list-box__item {
        margin-bottom: 40px;
    }
}
@media only screen and (max-width:505px) {
    .list-box__item {
        margin-bottom: 30px;
    }
}
@media only screen and (max-width:350px) {
    .list-box__item {
        margin-bottom: 20px;
    }
}
</style>


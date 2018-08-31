<template>
    <div class="tiles-container">
        <ul :class="`tiles tiles--col${ numColumns > 3 ? 3 : numColumns }`">
            <li v-for="(item, index) in list" :class="generateListClass(index)" :key="index">
                <linked-image v-if="item.url"
                    :src="item.img"
                    :url="item.url"
                    :title="item.name"
                    :square="square"
                    :thumbnailMode="thumbnailMode"
                    @onReady="imageReady"
                    @onLoaded="imageReady"
                />
                <lazy-image v-else
                    :src="item.img"
                    :title="item.name"
                    :square="square"
                    @onReady="imageReady"
                    @onLoaded="imageReady"
                />
                <div class="tile__info" v-if="!thumbnailMode">
                    <h3>{{ item.name }}</h3>
                    <div>{{ item.desc }}</div>
                    <div v-if="item.url || item.primaryUrl" class="button-group">
                        <Button v-if="item.primaryUrl" :url="item.primaryUrl" :label="item.primaryBtnLabel" primary/>
                        <Button v-if="item.url" :url="item.url" :label="item.btnLabel"/>
                        <br><br>
                    </div>
                </div>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>
</template>
<script>
import {registerListener, unRegisterListener, inViewPort, aboveViewPort} from "@/assets/js/events/events"
import Button from "@/components/core/Button"
import LazyImage from "@/components/core/LazyImage"
import LinkedImage from "@/components/core/LinkedImage"
export default {
    components: {
        Button, LazyImage, LinkedImage
    },
    props: {
        list: {
            type: Array,
            required: true
        },
        numColumns: {
            type: Number,
            default: 2
        },
        square: {
            type: Boolean
        },
        thumbnailMode: {
            type: Boolean
        }
    }, 
    mounted() {
        registerListener("scroll", this.onScroll);
        registerListener("resize", this.onScroll);
        this.onScroll();
    },
    methods: {
        imageReady(e, index) {
            this.adjustSize();
            setTimeout(() => {
                e.$el.parentElement.classList.remove("tile--hide");
            }, index * 2 * 300);
        },
        generateListClass(index) {
            const len = this.list.length;
            let className = "tile" + (this.thumbnailMode ? " tile--thumbnail-mode" : "");
            if(len%this.numColumns == 0 && index == len-this.numColumns)
            {
                className += " last-2nd";
            } else if(this.numColumns == 2 && len%this.numColumns == 1 && index == len-1)
            {
                className += " last-center";
            }
            return className + " tile--hide";
        },
        onScroll() {
            if(!inViewPort(this.$el)) return;
            const tiles = this.$el.querySelectorAll(".tile--hide");
            //process items in visible area
            [].slice.call(tiles).filter(item => {
                return inViewPort(item, 50)
            }).map((item, index) => {
                this.adjustSize();
                setTimeout(() => {
                    item.classList.remove("tile--hide");
                }, index * 2 * 300);
            });
            //process items above visible area
            [].slice.call(tiles).filter(item => {
                return aboveViewPort(item);
            }).map(item => {
                this.adjustSize();
                item.classList.remove("tile--hide");
            });
        },
        adjustSize() {
            if(this.thumbnailMode) return;
            let tiles = this.$el.querySelectorAll(".tile");
            if(tiles.length == 0) return
            let buttonGroup = this.$el.querySelectorAll(".button-group");
            [].slice.call(tiles).map((tile) => {
                tile.style.height = "";
                return tile;
            });

            [].slice.call(buttonGroup).map((btn) => {
                btn.style.position = "relative";
                btn.style.bottom = 0;
                return btn;
            });
            
            let maxH = [].slice.call(tiles).reduce((max, tile) => {
                let h = tile.offsetHeight ? tile.offsetHeight : 0;
                return h > max ? h : max;
            }, tiles[0].offsetHeight ? tiles[0].offsetHeight : 0);
            // update when it has more than one column
            if(tiles[0].offsetWidth + 80 < window.innerWidth)
            {
                [].slice.call(tiles).map((tile) => {
                    tile.style.height = maxH + "px";
                    return tile;
                });
                
                [].slice.call(buttonGroup).map((btn) => {
                    btn.style.position = "absolute";
                    btn.style.bottom = "14px";
                    btn.style.left = 0;
                    btn.style.right = 0;
                    return btn;
                });
            };
        }
    },
    beforeDestroy(){
        unRegisterListener("scroll", this.onScroll);
        unRegisterListener("resize", this.onScroll);
    }
}
</script>

<style lang="scss" scoped>

@import "@/assets/css/base.scss";

//container
.tiles-container {
    padding: 0;
    margin:0;
}

.tiles {
    margin:0;
    clear: both;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 0;
    display: inline;
    &:before, 
    &:after { 
        content: "";
        display: table; 
    }
    &:after {
        clear: both; 
    }
    &:before, 
    &:after { 
        content: ""; display: table; 
    }
    
    &--col2 {
        > li {
            width: -webkit-calc(50% - 20px);
            width: -moz-calc(50% - 20px);
            width: calc(50% - 20px);
            margin-left: 20px;
            &:nth-child(odd) {
                margin-left: 0px;
                margin-right: 20px;
            }
            &:last-child,
            &.last-2nd {
                margin-bottom: 0px;
            }
            &.last-center {
                margin-left: 25%;
                margin-right: 25%;
            }
        }
    }
    &--col3 {
        
        > li {
            width: -webkit-calc(33.3% - 36px);
            width: -moz-calc(33.3% - 36px);
            width: calc(33.3% - 36px);
            //margin-left: 18px;
            margin-left: 18px;
            margin-right: 18px;
        }
    }
}

.tile {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 40px;
    
    background-color: $bgColor;
    float: left;
    position: relative;
    
    top: 0px;
    @include transition(opacity 0.35s, top 0.3s);

    // redraw issue https://stackoverflow.com/a/27971913/1578100
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);

    &__info {
        padding: 20px;
        text-align: center;
        > div {
            white-space: pre-line;
        }
    }

    &__thumbnail-info {
        text-align: center;
        color: rgba(255, 255, 255, 1);
        text-transform: uppercase;
        letter-spacing: 0.3em;
        font-weight: 700;
        //border: 1px solid #000;
        position: absolute;
        //top:50%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        width:auto;
        background: rgba(0, 0, 0, 0.1);
        //@include translateY(-50%);
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

    &--thumbnail-mode {
        margin-bottom: 20px;
    }
    
    &--hide {
        top: 50px;
        visibility: hidden;
        opacity: 0;
    }

}

@media only screen and (max-width:768px) {
    
    .tiles > li {
        width: -webkit-calc(50% - 15px);
        width: -moz-calc(50% - 15px);
        width: calc(50% - 15px);
        margin-left: 15px;
        margin-right: 0px;
        margin-bottom: 30px;
        &:nth-child(odd) {
            margin-left: 0px;
            margin-right: 15px;
        }
        &.last-center {
            margin-left: 25%;
            margin-right: 25%;
        }
    }
}

@media only screen and (max-width:580px) {
    .tiles > li {
        width: 100%;
        margin-top: 0px;
        margin-left: 0px;
        margin-right: 0px;
        margin-bottom: 40px;
        &:nth-child(odd) {
            margin-left: 0px;
            margin-right: 0px;
        }
        &:first-child,
        &:nth-last-child(2){
            margin-bottom: 40px;
        }
    }
}

@media only screen and (max-width:505px) {
    .tiles > li,
    .tiles > li:first-child,
    .tiles > li:nth-last-child(2){
        margin-bottom: 30px;
    }
}

@media only screen and (max-width:350px) {
    .tiles > li,
    .tiles > li:first-child,
    .tiles > li:nth-last-child(2){
        margin-bottom: 20px;
    }
}

</style>

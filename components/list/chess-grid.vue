<template>
    <div :class="className">
        <div :class="`${className}__item`" v-for="(item, index) in list" :key="index">
            <div :class="`${className}__item-box ${isPull(index)}`">
                <linked-image 
                    :src="item.img"
                    :url="item.url"
                    :title="item.name"
                    :square="true"
                    :verticalAlign="true"
                />
            </div>
            <div :class="`${className}__item-box ${className}__item-info ${isPush(index)}`">
                <div class="v-align-pos">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.desc }}</p>
                    <Button :url="item.url" :label="item.btnLabel"/>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
import Button from "@/components/core/Button"
import LinkedImage from "@/components/core/LinkedImage"
let className = "chess-grid"
export default {
    components: {
        Button, LinkedImage
    },
    props: {
        list: {
            type: Array,
            required: true
        }
    },    
    data() {
        return {
            className
        }
    },
    methods: {
        isPull(num)
        {
            return (num%2 == 0 ? ` ${className}__item-box--pull` : "");
        },
        isPush(num)
        {
            return (num%2 == 0 ? ` ${className}__item-box--push` : "");
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.chess-grid {
    padding:0;
    margin:0 auto;
    &__item {
        max-width: 1170px;
        margin:0 auto;
        &::after, 
        &::before {
            content: "";
            display: table;
        }
        &::after {
            clear: both;
        }
        img {
            position:absolute;
            top:50%;
            height: auto;
            width: 100%;
            @include translateY(-50%);
        }
        &-box {
            width: 50%;
            position: relative;
            background: $bgColor;
            overflow: hidden;
            float: left;
            &::after {
                content: "";
                display: block;
                padding-bottom: 100%; //66%; // use 100% for square
            }    
            &--pull {
                left: 50%;
            }
            &--push {
                left: -50%;
            }
        }
        &-info {
            text-align: center;
            height: auto;
            white-space: pre-line;
            p {
                padding: 20px;
                margin: 0;
            }
            h3 {
                font-size: 1.3em;
                margin: 0px;
            }
        }
    }
}

.v-align-pos {
    position:absolute;
    top:50%;
    left: 0;
    right: 0;
    text-align:center;
    width:auto;
    padding: 50px; 
    @include translateY(-50%);
}

@media only screen and (max-width:1024px) {
    .v-align-pos {
        padding: 20px; 
    }
}

@media only screen and (max-width:840px) {
    .v-align-pos{padding:15px;}
}

@media only screen and (max-width:768px) {
    .chess-grid__item-info p  {
        padding: 8px;
        margin: 0;
    }
}

@media only screen and (max-width:720px) {
    .chess-grid__item-info h3  {
        font-size: 1.2em;
    }
}

@media only screen and (max-width:580px) {
    .chess-grid__item {
        &:not(:last-child){margin-bottom: 40px}
        &-box{
            width:100%;
            min-height:220px;
            &:last-child:after{padding-bottom:0px;}
            &--push,
            &--pull {left:0%;}
        }
        &-info h3  {
            margin-top: 30px;
            margin-bottom: 10px;
        }
    }
    
    .v-align-pos{
        position:static;
        height:100%;
        top:0;
        padding-bottom: 40px;
        padding-top: 0;
        @include translateY(0);
    }
}

@media only screen and (max-width:505px) {
    .chess-grid__item{
        max-width:100%;
        &:not(:last-child){margin-bottom: 30px}
    }
}

@media only screen and (max-width:350px) {
    .chess-grid__item:not(:last-child){margin-bottom: 20px}
}
</style>

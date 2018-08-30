<template>
    <button :class="className" :type="submit !== undefined ? 'submit' : ''">
        <nuxt-link v-if="url && url.indexOf('http') == -1" :title="label" :to="url">{{ label }}</nuxt-link>
        <a v-else-if="url" :href="url" target="_blank" :title="label" rel="noopener">{{ label }}</a>
        <span v-else>{{ label }}</span>
    </button>
</template>
<script>
export default {
    props: ["primary", "submit", "label", "url"],
    computed: {
        className() {
            let str = this.primary !== undefined ? 'button--primary' : '';
            return str + (this.submit !== undefined ? ' button--submit' : '');
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
button {
    border: 1px solid #ccc;;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;    
    
    text-transform: uppercase;
    letter-spacing: 0.04em;
    display:inline-block;
    padding: 0;
    vertical-align:middle;
    text-decoration:none;
    font-size: 0.8em;
    color:#807e7e;
    background-color:inherit;
    text-align:center;
    cursor:pointer;
    white-space:nowrap;
    @include transition-duration(0.4s);

    &:focus {
        outline: none;
    }
    &:hover {
        color: $bgColor;
        background-color:#ccc;
    }
    & span,
    & a {
        display:block;
        color:#807e7e;
        padding:8px 16px;
        @include transition-duration(0.4s);
        cursor: pointer;
    }
    & > a:hover {
        color: $bgColor;
        background-color:#ccc;
    }
}

.button--primary {
    border: 1px solid $mainColor;
    color: $mainColor;
    padding:0px 9px;
    background-color: $mainColor;
    margin-bottom: 16px;
    span,
    a {
        color: $bgColor;
        &:hover {
            background-color:$errorColor;
        }
    }
    &:hover {
        background-color:$errorColor;
    }
}

.button--submit {
    padding:8px 40px;
}

@media only screen and (max-width:768px) {
    .button--submit {
        width: 100%;
    }
}

</style>

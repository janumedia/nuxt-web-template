<template>
    <div id="splash"  v-show="loading">
        <div class="splash-logo">
            <img src="/images/assets/logo.svg" alt="Nusa Penida" data-pin-nopin="true"/>
            <h1>{{ company.name }}</h1>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
import utils from "@/assets/js/utils/utils"
export default {
    computed: {
        ...mapState(['loading', 'company'])
    }/*,
    watch: {
        "loading": function (newValue, oldValue) {
            if(newValue) utils.show(this.$el);
            else utils.hide(this.$el)
        }
    }*/
}
</script>
<style lang="scss" scoped>
$bgColor: #fff;
@mixin translateY($value) {
    -webkit-transform:translateY($value);
    -moz-transform:translateY($value);
    -o-transform:translateY($value);
    -ms-transform:translateY($value);
    transform:translateY($value);
}
@mixin animation($properties...) {
    -webkit-animation: $properties;
    -moz-animation: $properties;
    -ms-animation: $properties;
    -o-animation: $properties;
    animation: $properties;
}
#splash{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 9999;
    background-color: $bgColor;
    // fix chromium bugs: https://stackoverflow.com/a/46411684
    border: 1px solid $bgColor;
}
#splash h1 {
    font-size: 1px;
    color: $bgColor;
}
.splash-logo {
    position: absolute;
    top: 45%;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 150px;
    color: $bgColor;
    
    @include translateY(-50%);
    //@include animation(fadeInLogo 1.5s ease-out infinite alternate);
    @include animation(fadeInLogo 0.8s ease-out);
}
.splash-logo img {
    max-width: 150px;
}
@-webkit-keyframes fadeInLogo {
    from { opacity: 0 }
}
@-moz-keyframes fadeInLogo {
    from { opacity: 0 }
}
@-o-keyframes fadeInLogo {
    from { opacity: 0 }
}
@-ms-keyframes fadeInLogo {
    from { opacity: 0 }
}
@keyframes fadeInLogo {
    from { opacity: 0 }
}

#wrapper {
    display: block;
}
</style>


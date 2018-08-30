<template>
    <div>
        <Body v-if="body" :list="body"/>
        <Extras v-if="extras" :list="extras"/>
    </div>
</template>
<script>
import axios from 'axios'
import page from "@/mixins/page"
import Body from "@/components/body"
import Extras from "@/components/extras"

export default {
    async asyncData({store, params, redirect, error, route}) {
        console.log(process.env.BASE_URL, route.path)
        const valid = params.id ? params.id.indexOf(".") == -1 ? true : false : true;
        if(params.category && valid)
        {
            try {
                const {path, name} = route;
                store.dispatch("setNextLink", {path, name});
                
                const url = `${process.env.baseUrl}/data/${params.category}${ params.id ? `/${params.id}`  : '' }.json`
                const {data} = await axios.get(url);
                
                store.dispatch("setPageData", data);
                
                //must have props body and extras
                if(!data.body) data.body = null;
                if(!data.extras) data.extras = null;

                return data;

            } catch(e) {
                console.error("ERROR", e);
            }
        } 
        
        store.state.pageError = true;
        error({ statusCode: 404, message: 'Post NOT found!' });
    },
    components: {
        Body, Extras
    },
    mixins: [page]
}
</script>
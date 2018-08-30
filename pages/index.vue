<template>
    <div>
        <Body v-if="body" :list="body"/>
        <Extras v-if="extras" :list="extras"/>
    </div>
</template>
<script>
import axios from 'axios'
import page from "@/mixins/page"
import Body from '@/components/body'
import Extras from '@/components/extras'

export default {
    async asyncData({store, error,}) {
        
        try {
            const {data} = await axios.get(`${process.env.baseUrl}/data/index.json`);
            
            store.state.pageTitle = data.title;
            store.state.pageDesc = data.desc;
            store.state.metaImage = data.metaImage;
            store.state.layout = data.layout || 'default';
            
            //must have props body and extras
            return {...data, body:data.body || null, extras:data.extras || null};

        } catch(e) {
            console.error("ERROR");
            store.state.pageError = true;
            error({ statusCode: 404, message: 'Post NOT found' })
        } 
        
    },
    components: {
        Body, Extras
    },
    mixins:[page]
}
</script>

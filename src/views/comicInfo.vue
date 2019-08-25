<template>
    <div class="ComicInfo">
        <loading v-if="isLoading" />
        <contentLoader @giveData="getData" :comicId="+$route.params.id" />
        <contentDisplayer :data="data" />
    </div>
</template>

<script>
// @ is an alias to /src
import contentLoader from "@/components/comicInfo/contentLoader.vue";
import contentDisplayer from "@/components/comicInfo/contentDisplayer.vue";
import loading from "@/components/loading.vue";

export default {
    name: "comicInfo",
    components: {
        contentLoader
        ,contentDisplayer
        ,loading
    },
    data: function() {
        return {
            isLoading: true,
            data: []
        };
    },
    methods: {
        getData: function(results) {
            this.data = results.results[0];
            this.isLoading = false;
        }
    },
    created() {
        isLoading: false;
    }
};
</script>

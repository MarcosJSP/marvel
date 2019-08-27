<template>
    <div class="home">
        <searchBar @giveSearch="getSearch" :query="query" />
        <loading v-if="isLoading" />
        <homeFeed :comics="comics" :total="total"/>
        <pageSelector :query="query" :total="total?total:-20" />
    </div>
</template>

<script>
// @ is an alias to /src
import searchBar from "@/components/home/searchBar.vue";
import homeFeed from "@/components/home/homeFeed.vue";
import pageSelector from "@/components/home/pageSelector.vue";
import loading from "@/components/loading.vue";

export default {
    name: "home",
    components: {
        searchBar
        ,homeFeed
        ,pageSelector
        ,loading
    },
    data: function() {
        return {
            isLoading: false,
            comics: [],
            total: 0
        };
    },
    props: {
        query: {}
    },
    methods: {
        getSearch: function(results) {
            this.comics = results.results;
            this.total = results.total ? results.total : -1;
            this.isLoading = false;
        }
    },
    watch: {
        $route(to, from) {
            this.isLoading = true;
        }
    }
    ,created(){
        this.isLoading = true;
    }
};
</script>

<style>
.home{
    padding: 4vh 6vw 3.5vh;
}
</style>
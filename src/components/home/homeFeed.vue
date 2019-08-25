<template>
    <div v-if="comics" id="homeFeed">
        <div v-if="total>0" class="comics">
            <div class="comic" v-for="comic in comics" :key="comic.id">
                <router-link :to="'/comics/' + comic.id">
                <img
                    :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                    :alt="comic.title"
                />
                    <span class="title">{{comic.title}}</span>
                </router-link>
            </div>
        </div>

        <h2 v-if="total==-1">
            We are sorry, no results were found.
        </h2>
    </div>
</template>

<script>
export default {
    name: "navigationBar",
    data: function() {
        return {};
    },
    props: {
        comics: Array
        ,total: Number
    }
};
</script>

<style>
.comics {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 16.5vh 10vw 10vh;
}

.comic {
    flex-basis: calc(20% - 40px);
    margin: 0 20px 15px;
    display: flex;
    flex-direction: column;
    word-break: break-all;
    align-items: center;
}

.comic img {
    max-height: 35vh;
    min-height: 35vh;
    max-width: 100%;
    min-width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    background-color: white;
}

.comic a{
    color: white;
    text-decoration: none;
}

.comic a:hover > *{
    color: var(--primary);
    text-decoration: none;
    border-color: var(--primary);
}
#homeFeed h2{
    color: white;
    display: block;
    height: 50vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: auto;
    margin: 0;
}



</style>
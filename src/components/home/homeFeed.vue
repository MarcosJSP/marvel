<template>
    <div v-if="comics" id="homeFeed">
        <div v-if="total>0" class="comics">
            <div class="comic" v-for="comic in comics" :key="comic.id">
                <router-link :to="'/comics/' + comic.id">
                    <div :class="{front: noImage(comic.thumbnail.path)}" class="cover">
                        <span class="title">{{comic.title}}</span>
                    </div>
                    <img v-if="!noImage(comic.thumbnail.path)"
                        :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                        :alt="comic.title"
                    />

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
        comics: {}
        ,total: Number
    }
    ,methods:{
        noImage: function(image){
            return image.includes('image_not_available');
        }
    }
};
</script>

<style>
#homeFeed{
    margin-bottom: 5vh;
}
.comics{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.comic{
    margin-top: 5vh;
    height: 35vh;
    flex-basis: calc( calc(100% - 10vh) / 5 );

    display: flex;
    justify-content: center;
    position: relative;
}

.comic a{
    transition: transform 100ms ease-out;
    /* box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.75); */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 80%;
    border: 2px solid black;
    background: var(--terciary);
}

.comic img{
    max-height: 100%;
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
    z-index: 20;
    color: var(--secundary);
}

.cover{
    position: absolute;
    left: 0;
    top:0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 10;
    padding:10px;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;


    background: rgba(0, 0, 0, 0.815);
    color: var(--terciary);
    /* border: 2px solid var(--secundary); */
}

.comic:hover a{
    transform: translateY(-5px);
    box-shadow: none;
}

a:hover .cover 
, .front{
    z-index: 50;
}

.front{
    background: var(--terciary);
    color: var(--secundary);
}

#homeFeed h2{
    font-family: 'Oswald', sans-serif;
    color: var(--secundary);
    padding-top: 5vh;
    margin: 0;
}



</style>
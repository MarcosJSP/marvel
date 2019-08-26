<template>
    <div v-if="data.title" id="contentDisplayer">
        
        <div class="left-column border-left border-right">
            <section class="img-section">
                <div v-if="data.thumbnail.path.includes('image_not_available')" class="noImg">{{data.title}}</div>
                <img v-else :src="data.thumbnail.path + '.' + this.data.thumbnail.extension" :alt="data.title" />
            </section>
            <section class="last-section">
                <h2>Extended info</h2>
                <ul>
                    <li><b>Pages:</b>{{data.pageCount}}</li>

                    <li v-for="date in data.dates" :key="date.type">
                        <b>{{date.type}}:</b>{{ giveDate(date.date) }}
                    </li>
                    <li v-for="price in data.prices" :key="price.type">
                        <b>{{price.type}}:</b>{{price.price}}$
                    </li>
                    <li><b>Upc:</b>{{data.upc}}</li>
                    <li><b>Isbn:</b>{{data.isbn}}</li>
                    <li><b>DiamondCode:</b>{{data.diamondCode}}</li>
                </ul>
               
            </section>
        </div>

        <div class="right-column border-right">
            <section>
                <h1>{{data.title}}</h1>
                <p v-if="data.description" v-html="data.description" class="description"></p>
            </section>
            <section>
                <h2>Creators</h2>
                <ul>
                    <li v-for="creators in data.creators.items" :key="creators.name">
                        <b>{{creators.role}}:</b>
                        {{creators.name}}
                    </li>
                </ul>
            </section>
            <section class="stories last-section">
                <h2>Stories</h2>
                <ul>
                    <li v-for="story in data.stories.items" :key="story.name"><i>{{story.name}}</i></li>
                </ul>
            </section>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "contentDisplayer",
    props: {
        data: {}
    }
    ,methods:{
        giveDate: function(date){
            var day = new Date(date);
            return day.toLocaleDateString("en-US");
        }
    }
};
</script>

<style>
#contentDisplayer {
    display: flex;
    flex-wrap: wrap;
}

#contentDisplayer p
,#contentDisplayer h1
,#contentDisplayer h2
,#contentDisplayer ul{
    margin: 0;
}

#contentDisplayer h1
,#contentDisplayer h2{
    margin-bottom: 20px;
    font-size: 1.9rem;
}

#contentDisplayer ul{
    padding: 0;
    list-style-type: none;
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
}

#contentDisplayer .stories ul{
    columns: 1;
    -webkit-columns: 1;
    -moz-columns: 1;
    list-style-type: square;
    padding-left: 20px;
}

#contentDisplayer .stories ul li{
    margin-bottom: 8px;
}
#contentDisplayer p {
    text-align: justify;
}

#contentDisplayer b{
    margin-right: 3px;
}

#contentDisplayer .left-column
,#contentDisplayer .right-column{
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
}

#contentDisplayer .left-column .img-section{
    height: 72vh;
    display: flex;
    justify-content: center;
}

#contentDisplayer .left-column .img-section img
,#contentDisplayer .left-column .img-section .noImg{
    max-width: 50%;
    min-width: 50%;
    max-height: 100%;
    min-height: 100%;
    border: 2px solid var(--secundary);
    background: var(--terciary);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
}

#contentDisplayer section{
    font-family: 'Oswald', sans-serif;
    padding: 10vh 7vw;
    border-bottom: 2px solid var(--secundary);
}

#contentDisplayer .last-section{
    border-bottom: 0;
}

</style>
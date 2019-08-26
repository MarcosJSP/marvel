<template>
    <div v-if="total>0" id="pageSelector">
        <button v-if="query.page-1>1" @click="changePage(1)"><<</button>
        <button v-else class="hideMe"><<</button>
        
        <button v-if="query.page>1" @click="changePage(query.page-1)"><</button>
        <button v-else class="hideMe"><</button>

        <button v-for="page in prevPages" @click="changePage(page)" :key="page">{{page}}</button>
        <button disabled class="selected"><span>{{query.page}}</span></button>
        <button v-for="page in nextPages" @click="changePage(page)" :key="page">{{page}}</button>

        <button v-if="query.page<lastPage()" @click="changePage(query.page+1)">></button>
        <button v-else class="hideMe">></button>
        <button v-if="query.page+1<lastPage()" @click="changePage(lastPage())">>></button>
        <button v-else class="hideMe">>></button>
    </div>
</template>

<script>
export default {
    name: "pageSelector",
    data: function() {
        return {
            threshold:4
        };
    },
    props: {
        query: {},
        total: Number
    },
    methods: {
        changePage: function(nextPage) {
            var{title,orderBy,limit,asc} = this.query;
            const page = nextPage;
            this.$router
                .push({
                    path: "home",
                    query: {
                        title,
                        orderBy,
                        asc,
                        limit,
                        page
                    }
                })
                .catch(() => {});
        },
        givePagesLeftAndSeen: function(){
            const totalComics = +this.total;
            const limit = +this.query.limit;
            const page = +this.query.page;

            const lastComicSeen = limit * page;
            const comicsLeft = totalComics - lastComicSeen;

            var pagesLeft = comicsLeft>0? Math.ceil(comicsLeft / limit) : 0 ;
            const pagesSeen = +this.query.page-1;

            return{
                pagesLeft
                ,pagesSeen
            }
        }
        ,lastPage: function() {
            const limit = +this.query.limit;
            const totalComics = +this.total;
            const lastPage = Math.ceil(totalComics / limit);
            return lastPage;
        }
    },
    computed: {
        prevPages: function() {
            var list = [];
            var {pagesLeft, pagesSeen}= this.givePagesLeftAndSeen();

            var pagesSeenLimit = 0;

            if(pagesLeft<this.threshold/2){
                pagesSeenLimit= this.threshold-pagesLeft <= pagesSeen  
                                   ? this.threshold-pagesLeft:
                                   pagesSeen;
            }else{
                pagesSeenLimit = pagesSeen <= this.threshold/2 
                                ? pagesSeen : this.threshold/2;
            }

            var i = 0;

            while (i < pagesSeenLimit) {
                list.push(pagesSeen - i);
                i++;
            }

            return list.reverse();
        },

        nextPages: function() {
            var list = [];
            const page = +this.query.page;
            var {pagesLeft, pagesSeen}= this.givePagesLeftAndSeen();

            var pagesLeftLimit = 0;
            
            if(pagesLeft<this.threshold/2){
                pagesLeftLimit=pagesLeft;
            }else{
                pagesLeftLimit = pagesSeen <= this.threshold/2 
                                ? this.threshold-pagesSeen
                                : this.threshold/2;
            }
            
            var i = 0;
            while (i < pagesLeftLimit) {
                list.push( (page + 1) + i);
                i++;
            }

            return list;
        }
    }
};
</script>

<style>
    #pageSelector{
        display: flex;
        justify-content: center;
        height: 5vh;
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
    }

    #pageSelector button{
        all: unset;
        text-align: center;
        margin-right: 1px;
        height: 4vh;
        width: 4vw;
        border: 2px solid var(--secundary);
    }


    #pageSelector button{
        cursor: pointer;
    }

    #pageSelector button:hover{
        color: var(--primary);
    }


    #pageSelector button:active{
        color: var(--terciary);
        background: var(--secundary);
    }

    #pageSelector button.hideMe
    ,#pageSelector button.hideMe:hover
    ,#pageSelector button.hideMe:active{
        cursor: auto;
        color: var(--terciary);
        border: 2px solid var(--terciary);
        background: var(--terciary)
    }

    #pageSelector button[disabled=disabled]
    ,#pageSelector button[disabled=disabled]:hover{
        cursor: auto;
        color: var(--primary);
        background-color: var(--secundary);
    }

</style>
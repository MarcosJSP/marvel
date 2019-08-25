<template>
    <div id="pageSelector">
        <button v-if="query.page-1>1" @click="changePage(1)"><<</button>
        <button v-if="query.page>1" @click="changePage(query.page-1)"><</button>
        <button v-for="page in prevPages" @click="changePage(page)" :key="page">{{page}}</button>
        <button disabled class="selected"><span>{{query.page}}</span></button>
        <button v-for="page in nextPages" @click="changePage(page)" :key="page">{{page}}</button>
        <button v-if="query.page<lastPage()" @click="changePage(query.page+1)">></button>
        <button v-if="query.page+1<lastPage()" @click="changePage(lastPage())">>></button>
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
        height: 7vh;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: var(--primary);
        color: white;
        font-family: 'Roboto', sans-serif;
        font-size: 0.9rem;

        -webkit-box-shadow: 0px -5px 15px 0px rgba(0,0,0,0.46);
        -moz-box-shadow: 0px -5px 15px 0px rgba(0,0,0,0.46);
        box-shadow: 0px -5px 15px 0px rgba(0,0,0,0.46);
    }

    #pageSelector button{
        all: unset;
        padding: 0 10px;
        cursor: pointer;
        font-size: .9rem;
        font-weight: bold;
    }

    #pageSelector button:hover{
        color: var(--secundary);
        font-weight: bold;
    }

    #pageSelector button[disabled=disabled]:hover, #pageSelector button:disabled {
        color: rgb(150, 20, 20);
        text-align: center;
        align-self: center;
        font-weight: bold;
        cursor: default;
    }

    #pageSelector button[disabled=disabled].selected span{
        border-bottom: 3px solid rgb(150, 20, 20);
    }
</style>
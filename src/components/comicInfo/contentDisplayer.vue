<template>
    <div v-if="data.title" id="contentDisplayer">
        <div class="left-column">
            <img :src="data.thumbnail.path + '.' + this.data.thumbnail.extension" :alt="data.title" />
        </div>

        <div class="right-column">
            <section>
                <h1>{{data.title}}</h1>

                <p v-if="data.description" v-html="data.description"></p>
                <p>Pages:{{data.pageCount}}</p>
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
            <section>
                <h2>Stories</h2>
                <ul>
                    <li v-for="story in data.stories.items" :key="story.name">{{story.name}}</li>
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
};
</script>

<style>
#contentDisplayer {
    display: flex;
    height: 93vh;
    position: absolute;
    top: 7vh;
    width: 100%;
}

.left-column {
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.left-column img {
    max-width: 32vw;
    min-width: 32vw;
    max-height: 78vh;
    min-height: 78vh;
    border: 2px solid none;
    border-radius: 15px;
}

.right-column {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    color: white;
    padding-bottom: 5vh; 
    font-size: 1.5rem;
    padding: 7vh 0;
}

section {
    padding: 0 20px 40px;
    display: flex;
    flex-direction: column;
}

section *{
    margin: 0;
}

p{
    margin:20px 0;
}

h1,h2{
    color:var(--primary);
}
</style>
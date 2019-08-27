<template>
  <div id="searchBar">
      <input
        @keyup.enter="searchComic"
        v-model="comicName"
        type="text"
        placeholder="Search comics..."
      />

      <div class="ordering-section">
        <select v-model="sortingMethodSelected">
          <option class="sortingMethod" value="title" disabled="disabled">Sort by</option>
          <option
            class="sortingMethod"
            v-for="sortingMethod in sortingMethods"
            :key="sortingMethod"
          >{{sortingMethod}}</option>
        </select>
        <span>
          <button class="asc" @click="asc=!asc" :class="{desc: !asc}"></button>
        </span>
      </div>

      <span class="separator"></span>
      <button @click="searchComic">Search</button>
  </div>
</template>


<script>
import axios from "axios";
import keys from "@/keys";

export default {
  name: "searchBar",
  data: function() {
    return {
      comicName: "",
      sortingMethods: [
        "title",
        "onsaleDate",
        "focDate",
        "issueNumber",
        "modified"
      ],
      sortingMethodSelected: "title"
      ,asc:true
    };
  },
  props: {
    query: {}
  },
  methods: {
    searchComic: function() {
      const title = this.comicName;
      const orderBy = this.sortingMethodSelected;
      const page = 1;
      const limit = 10;
      const asc = this.asc;

      this.$router
        .push({ path: "home", query: { title, orderBy, asc, limit, page } })
        .catch(() => {});
    },
    md5(data) {
      var crypto = require("crypto");
      return crypto
        .createHash("md5")
        .update(data)
        .digest("hex");
    },
    loadData() {
      const ts = Date.now();
      var { privateKey, publicKey } = keys;
      const hash = this.md5(ts + privateKey + publicKey);

			var identification =
        "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;
    
      var apiUrl =
        "https://gateway.marvel.com:443/v1/public/comics?" +
        identification + 
        "&format=comic" +
        "&limit=" + this.query.limit +
        "&offset=" + (+this.query.page-1) * (+this.query.limit);

      if (this.query.title) apiUrl += "&titleStartsWith=" + this.query.title;
      if (this.query.asc){
        apiUrl += "&orderBy=" + this.query.orderBy
      } else{        
        apiUrl += "&orderBy=-" + this.query.orderBy
      }
      // console.log(apiUrl);
      
      axios
        .get(apiUrl)
        .then(res => {
          console.log(res.data.data)
          this.$emit("giveSearch", res.data.data)
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    $route(to, from) {
      this.loadData();
    }
  },
  created() {
    this.loadData(); 
  }
};
</script>

<style>
#searchBar{
  height: 5vh;
  background: var(--terciary);
  display: flex;
  align-items: center;
}

#searchBar button
,#searchBar select{
  all: unset;
}

#searchBar input
,#searchBar .ordering-section
,#searchBar button
,#searchBar .separator{
  border: none;
  height: 100%;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
}

#searchBar input{
  border-left: 2px solid var(--secundary);
  border-top: 2px solid var(--secundary);
  border-bottom: 2px solid var(--secundary);
  padding: 0 1vw;
  flex-basis: 65%;
}

#searchBar > button
,#searchBar .ordering-section{
  background: var(--terciary);
  color: var(--secundary);
  border: 2px solid black;
  flex-basis: 17.35%;
}

#searchBar .separator{
  margin: 0;
  padding: 0;
  background: var(--terciary);
  flex-basis: 0.3%;
}

#searchBar > button{
  color: var(--terciary);
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;

  color: var(--secundary);
  background: white;
  border: 2px solid black;
}

#searchBar > button:hover
,#searchBar .ordering-section select:hover
,#searchBar .ordering-section select:focus{
  color: var(--primary);

}

#searchBar > button:active{
  background: var(--secundary);
  color: var(--terciary);
}

#searchBar .ordering-section{
  display: flex;
  align-items: center;
}

#searchBar .ordering-section select{
  cursor: pointer;
  padding: 0;
  text-align: center;
  text-align-last: center;
  flex-basis: 80%;
}


#searchBar .ordering-section option{
  flex-basis: 20%;
  font-family: 'Oswald', sans-serif;
  color: var(--secundary);
  height: 100%;
}

#searchBar .ordering-section span{
  height: 100%;
  flex-basis: 20%;
  border-left: 2px solid var(--secundary);
}
#searchBar .ordering-section button{
  cursor: pointer;
  transform: rotate(0deg);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  background: url(../../assets/arrow-up.svg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 40%;
}

#searchBar .ordering-section button.desc{
  transform: rotate(180deg);
}

#searchBar .ordering-section button:hover{
  background: url(../../assets/arrow-up-red.svg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 40%;
}
</style>
<template>
  <div id="searchBar">
    <div class="search-section">
      <input
        @keyup.enter="searchComic"
        v-model="comicName"
        type="text"
        placeholder="Search comics..."
      />
      <span class="separator">|</span>
      <select v-model="sortingMethodSelected">
        <option class="sortingMethod" value="focDate" disabled="disabled">Sort by</option>
        <option
          class="sortingMethod"
          v-for="sortingMethod in sortingMethods"
          :key="sortingMethod"
        >{{sortingMethod}}</option>
      </select>
      <button class="asc" @click="asc=!asc" :class="{desc: !asc}"> > </button>

      <span class="separator">|</span>
      <button @click="searchComic">Search</button>
    </div>
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
      sortingMethodSelected: "focDate"
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
#searchBar {
  height: 5vh;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  position: fixed;
  width: 100%;
  top: calc(7vh);
}

.search-section {
  background-color: white;
  border-radius: 20px;
  padding: 2.25vh 10px 2.25vh 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-box-shadow: 0px 0px 38px 9px rgba(0, 0, 0, 0.46);
  -moz-box-shadow: 0px 0px 38px 9px rgba(0, 0, 0, 0.46);
  box-shadow: 0px 0px 38px 9px rgba(0, 0, 0, 0.46);
}

.search-section input,
.search-section button,
.search-section select {
  all: unset;
}

.search-section select {
  color: grey;
  text-align: right;
  text-align-last: center;
  cursor: pointer;
}

.search-section button {
  width: 70px;
  text-align: center;
  cursor: pointer;
}

.search-section input {
  width: 130px;
}

.search-section select:focus,
.search-section select:hover {
  color: black;
}

.search-section button:hover {
  color: var(--primary);
}

.separator {
  display: block;
  margin: 0 10px;
  color: grey;
}

.search-section button.asc{
  transform: rotate(-90deg);
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.search-section button.desc{
  transform: rotate(90deg);
}
</style>
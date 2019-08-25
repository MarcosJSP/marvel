<template>
  <div id="contentLoader"></div>
</template>

<script>
import axios from "axios";
import keys from "@/keys";

export default {
  name: "contentLoader",
  props: {
    comicId: Number
  },
  methods: {
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
        "https://gateway.marvel.com:443/v1/public/comics/" +
        this.comicId +
        "?" +
        identification;

      axios
        .get(apiUrl)
        .then(res => this.$emit("giveData", res.data.data))
        .catch(err => console.log(err));
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<template>
  <div class="box-search-mobile" :class="{'disableBoxSearchMobile':getIsMobile && getIsSearching}">
    <div class="inputSearch">
      <div><input type="text"></div>
      <div class="closeBt" @click="clickSearch()">
        <i class="material-icons">clear</i>
      </div>
    </div>
    <div class="filterLeague">
      <div>Filter by League</div>
      <div @click="closeOpenLeagueMobile(true)">
        <span>None</span>
        <i class="material-icons">expand_more</i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("menuheader", ["getIsSearching", "getIsMobile"])
  },
  methods: {
    ...mapActions("menuheader",["clickSearch"]),
    ...mapActions("boxsearch",["closeOpenLeagueMobile"])
  }
};
</script>
<style lang="scss" scoped>
.box-search-mobile {
  position: absolute;
  top: 0;
  width: 100%;
  visibility: hidden;
  overflow: hidden;
  transition: height 0.5s, visibility 0.5s;
  height: 0px;
}
.inputSearch {
  height: 64px;
  background-color: #444;
  display: flex;
  align-items: center;
  div:first-child {
    flex: 1;
    margin: 0 10px;
  }
  input {
    border: none;
    border-radius: 15px;
    height: 30px;
    background-color: #575757;
    outline: none;
    padding-left: 10px;
    width: -webkit-fill-available;
    color: #fff;
  }
}
.filterLeague {
  background-color: #333;
  height: 40px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  div:first-child {
    flex: 1;
    text-align: left;
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
.closeBt {
  color: #fff;
  box-shadow: -1px 0 0 0 hsla(0, 0%, 100%, 0.1);
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
}
.disableBoxSearchMobile {
  visibility: visible;
  height: 104px;
}
</style>



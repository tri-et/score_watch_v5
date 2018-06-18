<template>
  <div class="box-league-mobile" :class="{'show-box-league-mobile':getIsOpenLeagueMobile && getIsMobile}">
    <div class="box-search-header">
      <div>Filter by League</div>
      <div>
        <i class="material-icons">replay</i>
      </div>
      <div @click="closeOpenLeagueMobile(false)">
        <i class="material-icons">clear</i>
      </div>
    </div>
    <div class="inPut-search">
      <input type="text" placeholder="Search league">
    </div>
    <div class="search-result">
      <ul>
        <li>
          <input type="checkbox" name="" id="test1">
          <label for="test1">test</label>
        </li>
        <li>
          <input type="checkbox" name="" id="test2">
          <label for="test2">test 2</label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("boxsearch", ["getIsOpenLeagueMobile"]),
    ...mapGetters("menuheader", ["getIsMobile"])
  },
  methods: {
    ...mapActions("boxsearch", ["closeOpenLeagueMobile"])
  }
};
</script>
<style lang="scss" scoped>
.box-league-mobile {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #444;
  height: 100%;
  display: none;
  div:not(:first-child) {
    cursor: pointer;
  }
}
.box-search-header {
  color: #fff;
  height: 64px;
  border-bottom: 1px solid rgba(225, 225, 225, 0.1);
  display: flex;
  align-items: center;
  padding-left: 15px;
  div:first-child {
    flex: 1;
    text-align: left;
  }
  div:not(:first-child) {
    display: flex;
    align-items: center;
    border-left: 1px solid rgba(225, 225, 225, 0.1);
    height: 100%;
    padding: 0 18px;
  }
}
.inPut-search {
  padding: 10px 15px;
  border-bottom: 1px solid rgba(225, 225, 225, 0.1);
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
.show-box-league-mobile {
  display: block !important;
}
.search-result {
  height: 100%;
  overflow-x: hidden;
  max-height: calc(100% - 119px);
  position: absolute;
  top: 119px;
  width: 100%;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    li {
      border-bottom: 1px solid rgba(225, 225, 225, 0.1);
      padding: 10px 0;
      color: #fff;
      display: flex;
      padding-left: 10px;
      input {
        margin-right: 5px;
      }
    }
  }
}
</style>



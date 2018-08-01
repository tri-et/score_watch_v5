<template>
  <div class="box-search-desktop" :class="{'animationBoxSearch':getIsSearching,'disableBoxSearch':getIsMobile}">
    <ul>
      <li>
        <div class="filter-by" @click="closeOpenLeagueDeskTop(!getIsOpenLeagueDeskTop)">
          <span>Filter by League</span>
          <span>
            <i class="material-icons">expand_more</i>
          </span>
        </div>
      </li>
      <li>
        <input type="text" placeholder="Search here"  @input="searchTeamName($event.target.value)">
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("menuheader", ["getIsSearching", "getIsMobile"]),
    ...mapGetters("boxsearch", ["getIsOpenLeagueDeskTop", "setFilterTeamName"])
  },
  methods: {
    ...mapActions("boxsearch", ["closeOpenLeagueDeskTop", "searchTeamName"])
  }
};
</script>
<style lang="scss" scoped>
.box-search-desktop {
  position: absolute;
  top: 0;
  right: 66px;
  height: 100%;
  width: 0px;
  transition: width 0.5s, visibility 0.5s;
  visibility: hidden;
  color: #fff;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    overflow: hidden;
    li {
      padding: 0 15px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      height: 100%;
      display: flex;
      align-items: center;
      input {
        border: none;
        border-radius: 15px;
        height: 23px;
        outline: none;
        background-color: #575757;
        padding-left: 10px;
        width: 210px;
        color: #fff;
      }
    }
  }
}
.filter-by {
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;
  i {
    padding-top: 4px;
  }
}
.animationBoxSearch {
  visibility: visible;
  width: 421px;
}
.disableBoxSearch {
  display: none;
}
</style>



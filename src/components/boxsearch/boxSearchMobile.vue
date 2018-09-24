<template>
  <div class="box-search-mobile" :class="{'disableBoxSearchMobile':getIsMobile && getIsSearching}">
    <div class="inputSearch">
      <div><input type="text" placeholder="Search here" @input="searchTeamName($event.target.value)"></div>
      <div class="closeBt" @click="clickSearch()">
        <i class="material-icons">clear</i>
      </div>
    </div>
    <div class="searchTerm">
      <div>Search Term</div>
      <div @click="closeOpenLeagueMobile(true)">
        <span>{{getFilterTeamName == ''?'None':getFilterTeamName}}</span>
      </div>
    </div>
    <div class="filterLeague">
      <div>Filter by League</div>
      <div @click="closeOpenLeagueMobile(true)">
        <span>{{setStatusSelected()}}</span>
        <i class="material-icons">expand_more</i>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters('menuheader', ['getIsSearching', 'getIsMobile']),
    ...mapGetters('boxsearch', ['getchekedLeagueName', 'getFilterTeamName']),
    ...mapGetters('datapredictions', ['getLeaguePrediction']),
  },
  methods: {
    ...mapActions('menuheader', ['clickSearch']),
    ...mapActions('boxsearch', ['closeOpenLeagueMobile', 'searchTeamName']),
    setStatusSelected() {
      if (this.getchekedLeagueName != null && this.getLeaguePrediction != null) {
        if (this.getchekedLeagueName.length == this.getLeaguePrediction.length) {
          return 'None'
        } else {
          return this.getchekedLeagueName.length + ' Selected'
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.box-search-mobile {
  position: absolute;
  top: 0;
  width: 100%;
  visibility: hidden;
  overflow: hidden;
  transition: height 0.2s, visibility 0.2s;
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
.filterLeague,
.searchTerm {
  background-color: #333;
  height: 35px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  div:first-child {
    flex: 1;
    text-align: left;
    opacity: 0.34;
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
.searchTerm {
  border-bottom: 0.7px solid hsla(0, 0%, 100%, 0.1);
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
  height: 135px;
}
</style>



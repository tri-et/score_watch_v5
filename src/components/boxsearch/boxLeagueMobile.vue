<template>
  <div class="box-league-mobile" :class="{'show-box-league-mobile':getIsOpenLeagueMobile && getIsMobile}">
    <div class="box-search-header">
      <div>Filter by League</div>
      <div>
        <i class="material-icons">replay</i>
      </div>
      <div @click="closeLeagueFilter()">
        <i class="material-icons">clear</i>
      </div>
    </div>
    <div class="inPut-search">
      <input type="text" placeholder="Search league" v-model="filterLeagueTxt">
    </div>
    <div class="search-result">
      <ul>
        <li v-for="(league,index) in filterleague" :key="index+'leaguemobi'">
          <input type="checkbox" :value="league" :id="league" v-model="checkedLeagueMobi" @change="updateCheckall()">
          <label :for="league">{{league}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      filterLeagueTxt: '',
      checkedLeagueMobi: [],
    }
  },
  computed: {
    ...mapGetters('boxsearch', ['getIsOpenLeagueMobile']),
    ...mapGetters('menuheader', ['getIsMobile']),
    ...mapGetters('datapredictions', ['getLeaguePrediction']),
    filterleague() {
      if (this.getLeaguePrediction != null) {
        return this.getLeaguePrediction.filter(el => {
          return el.match(new RegExp(this.filterLeagueTxt, 'gi'))
        })
      }
    },
  },
  methods: {
    ...mapActions('boxsearch', ['closeOpenLeagueMobile', 'checkLeague']),
    updateCheckall() {
      this.checkLeague(this.checkedLeagueMobi.length == 0 ? this.getLeaguePrediction : this.checkedLeagueMobi)
    },
    closeLeagueFilter() {
      this.closeOpenLeagueMobile(false)
    },
  },
  watch: {
    getIsMobile(newData, oldData) {
      this.checkLeague(this.getLeaguePrediction)
      this.checkedLeagueMobi = []
    },
  },
}
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
      cursor: pointer;
      input {
        margin-right: 5px;
        cursor: pointer;
      }
      label {
        cursor: pointer;
      }
    }
  }
}
</style>



q<template>
  <div class="box-league-desktop" :class="{'show-league-desktop':getIsOpenLeagueDeskTop}">
    <div class="header-league-desk">
      <input type="text" placeholder="Search league" v-model="filterLeagueTxt">
    </div>
    <div v-if="getActiveMenu=='predictions'" class="league-content-desk">
      <ul>
        <li>
          <input type="checkbox" value="All" id="All" @click="checkAll()" v-model="isCheckAll">
          <label for="ALL">ALL</label>
        </li>
        <li v-for="(league,index) in filterleague" :key="index+'leaguepre'">
          <input type="checkbox" :value="league" v-model="checkedLeague" @change="updateCheckall()" :id="league">
          <label :for="league">{{league}}</label>
        </li>
      </ul>
    </div>
    <div v-else class="league-content-desk">
      <ul>
        <li>
          <input type="checkbox" value="All" id="All" @click="checkAllLive()" v-model="isCheckAllLive">
          <label for="ALL">ALL</label>
        </li>
        <li v-for="(league,index) in filterLeagueLive" :key="index+'leaguepre'">
          <input type="checkbox" :value="league" v-model="checkedLeagueLive" @change="updateCheckAllLive()" :id="league">
          <label :for="league">{{league}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import _ from 'lodash'
export default {
  data() {
    return {
      filterLeagueTxt: '',
      isCheckAll: true,
      isCheckAllLive: true,
      checkedLeague: [],
      checkedLeagueLive: [],
    }
  },
  computed: {
    ...mapGetters('boxsearch', ['getIsOpenLeagueDeskTop', 'getchekedLeagueName']),
    ...mapGetters('menuheader', ['getIsSearching', 'getActiveMenu']),
    ...mapGetters('datapredictions', ['getLeaguePrediction']),
    ...mapGetters('datalivescore', ['getLeagueLiveScore']),
    filterleague() {
      if (this.getLeaguePrediction != null) {
        return this.getLeaguePrediction.filter(el => {
          return el.match(new RegExp(this.filterLeagueTxt, 'gi'))
        })
      }
    },
    filterLeagueLive() {
      if (this.getLeagueLiveScore != null) {
        return this.getLeagueLiveScore.filter(el => {
          return el.match(new RegExp(this.filterLeagueTxt, 'gi'))
        })
      }
    },
  },
  methods: {
    ...mapActions('boxsearch', ['checkLeague', 'checkLeagueLive']),
    checkAll() {
      this.isCheckAll = !this.isCheckAll
      if (this.isCheckAll) {
        this.checkLeague(this.getLeaguePrediction)
        this.checkedLeague = _.clone(this.getLeaguePrediction)
      } else {
        this.checkLeague([])
        this.checkedLeague = []
      }
    },
    checkAllLive() {
      this.isCheckAllLive = !this.isCheckAllLive
      if (this.isCheckAllLive) {
        this.checkLeagueLive(this.getLeagueLiveScore)
        this.checkedLeagueLive = _.clone(this.getLeagueLiveScore)
      } else {
        this.checkLeagueLive([])
        this.checkedLeagueLive = []
      }
    },
    updateCheckall() {
      if (this.checkedLeague.length == this.getLeaguePrediction.length) {
        this.isCheckAll = true
      } else {
        this.isCheckAll = false
      }
      this.checkLeague(this.checkedLeague)
    },
    updateCheckAllLive() {
      if (this.checkedLeagueLive.length == this.getLeagueLiveScore.length) {
        this.isCheckAllLive = true
      } else {
        this.isCheckAllLive = false
      }
      this.checkLeagueLive(this.checkedLeagueLive)
    },
  },
  watch: {
    getLeaguePrediction(newData, oldData) {
      // if (oldData == null) {
      //   // set checked default
      //   this.checkedLeague = _.clone(this.getLeaguePrediction)
      //   this.checkLeague(this.getLeaguePrediction)
      // }
      var items = _.difference(newData, oldData)
      if (items.length != 0) {
        this.checkedLeague = _.clone(this.getLeaguePrediction)
        this.checkLeague(this.getLeaguePrediction)
      }
    },
    getLeagueLiveScore(newData, oldData) {
      if (oldData.length == 0) {
        this.checkedLeagueLive = _.clone(this.getLeagueLiveScore)
        this.checkLeagueLive(this.getLeagueLiveScore)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.box-league-desktop {
  position: absolute;
  top: 77px;
  width: 350px;
  background-color: #212121;
  height: 400px;
  right: 140px;
  border-radius: 8px;
  transform: scale(0);
  transition: all 0.5s ease-in-out;
  transform-origin: top center;
  visibility: hidden;
}
.header-league-desk {
  background-color: #444;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  input {
    border-radius: 10px;
    border: none;
    height: 25px;
    outline: none;
    background-color: #575757;
    padding-left: 10px;
    width: 100%;
    color: #fff;
  }
}
.show-league-desktop {
  visibility: visible;
  transform: scale(1) !important;
}
.league-content-desk {
  height: 100%;
  overflow-x: hidden;
  max-height: calc(100% - 45px);
  position: absolute;
  top: 45px;
  width: 100%;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    li {
      border-bottom: 1px solid rgba(225, 225, 225, 0.1);
      color: #fff;
      display: flex;
      padding-left: 10px;
      font-size: 14px;
      align-items: center;
      height: 35px;
      cursor: pointer;
      input {
        margin-right: 5px;
      }
      *:hover {
        cursor: pointer;
      }
    }
  }
}
</style>



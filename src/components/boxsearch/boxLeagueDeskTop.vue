<template>
  <div class="box-league-desktop" :class="{'show-league-desktop':getIsOpenLeagueDeskTop}">
    <div class="header-league-desk">
      <input type="text" placeholder="Search league" v-model="filterLeagueTxt">
    </div>
    <div class="league-content-desk">
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      filterLeagueTxt: "",
      isCheckAll: true,
      checkedLeague: []
    };
  },
  computed: {
    ...mapGetters("boxsearch", [
      "getIsOpenLeagueDeskTop",
      "getchekedLeagueName"
    ]),
    ...mapGetters("menuheader", ["getIsSearching"]),
    ...mapGetters("datapredictions", ["getLeaguePrediction"]),
    filterleague() {
      if (this.getLeaguePrediction != null) {
        return this.getLeaguePrediction.filter(el => {
          return el.match(new RegExp(this.filterLeagueTxt, "gi"));
        });
      }
    }
  },
  methods: {
    ...mapActions("boxsearch", ["checkLeague"]),
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      if (this.isCheckAll) {
        this.checkLeague(this.getLeaguePrediction);
        this.checkedLeague = _.clone(this.getLeaguePrediction);
      } else {
        this.checkLeague([]);
        this.checkedLeague = [];
      }
    },
    updateCheckall() {
      if (this.checkedLeague.length == this.getLeaguePrediction.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
      this.checkLeague(this.checkedLeague);
    }
  },
  watch: {
    getLeaguePrediction(newData, oldData) {
      if (oldData == null) {
        // set checked default
        this.checkedLeague = _.clone(this.getLeaguePrediction);
        this.checkLeague(this.getLeaguePrediction);
      }
    }
  }
};
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



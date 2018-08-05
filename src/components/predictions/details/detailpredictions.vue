<template>
  <div class="detail-predictions" @click="hideDetail(true)" :class="{'hide-detail':getIsHideDetail}">
    <div class="header-detail" :class="{'hide-header':getIsHideHeader}">
      <i class="material-icons">keyboard_backspace</i>
      <span>&nbsp;Back</span>
    </div>
    <preductionbt :class="{'margin-top':!getIsHideHeader}"></preductionbt>
    <headerLeague class="league-name">
      <span>{{getDataDetail.league}}</span>
    </headerLeague>
    <div class="team-score">
      <div class="score">
        <div>
          <span>{{getDataDetail.score_home}}</span>
        </div>
        <div class="divided-circle" :class="activeStyle">
          <div>
            <span>{{getDataDetail.match_minute|matchDate(getDataDetail.match_dt)}}</span>
          </div>
          <div>
            <span>{{getDataDetail.match_period|stateMatch}}</span>
          </div>
        </div>
        <div>
          <span>{{getDataDetail.score_away}}</span>
        </div>
      </div>
      <div class="team">
        <div>
          <span>{{getDataDetail.team_home}}</span>
        </div>
        <div>
          <span>vs</span>
        </div>
        <div>
          <span>{{getDataDetail.team_away}}</span>
        </div>
      </div>
      <div class="system">
        <span>System Prediction recommended pick:</span>
      </div>
    </div>
    <div class="odds-ou">
      <div class="livecenter">
        d
      </div>
      <oddouheader>
        <template slot="oddsou">
          <span>ODDS</span>
        </template>
        <template slot="oddsou_1">
          <span>HANDICAP</span>
        </template>
        <template slot="oddsou_2">
          <span>HOME</span>
        </template>
        <template slot="oddsou_3">
          <span>AWAY</span>
        </template>
      </oddouheader>
      <oddoucontent>
        <template slot="m8-1">
          <span>{{getDataDetail.sys_hdp}}</span>
        </template>
        <template slot="m8-2">
          <span>{{getDataDetail.sys_odds_home}}</span>
        </template>
        <template slot="m8-3">
          <span>{{getDataDetail.sys_odds_away}}</span>
        </template>
        <template slot="sbo-1">
          <span>{{getDataDetail.sbo_hdp}}</span>
        </template>
         <template slot="sbo-2">
          <span>{{getDataDetail.sbo_odds_home}}</span>
        </template>
         <template slot="sbo-3">
          <span>{{getDataDetail.sbo_odds_away}}</span>
        </template>
        <template slot="ibc-1">
          <span>{{getDataDetail.ibc_hdp}}</span>
        </template>
        <template slot="ibc-2">
          <span>{{getDataDetail.ibc_odds_home}}</span>
        </template>
        <template slot="ibc-3">
          <span>{{getDataDetail.ibc_odds_away}}</span>
        </template>
      </oddoucontent>
      <oddouheader>
        <template slot="oddsou">
          <span>OU</span>
        </template>
        <template slot="oddsou_1">
          <span>TOTAL GOALS</span>
        </template>
        <template slot="oddsou_2">
          <span>OVER</span>
        </template>
        <template slot="oddsou_3">
          <span>UNDER</span>
        </template>
      </oddouheader>
      <oddoucontent>
         <template slot="m8-1">
          <span>{{getDataDetail.sys_ou}}</span>
        </template>
        <template slot="m8-2">
          <span>{{getDataDetail.sys_odds_over}}</span>
        </template>
        <template slot="m8-3">
          <span>{{getDataDetail.sys_odds_under}}</span>
        </template>
        <template slot="sbo-1">
          <span>{{getDataDetail.sbo_ou}}</span>
        </template>
         <template slot="sbo-2">
          <span>{{getDataDetail.sbo_odds_over}}</span>
        </template>
         <template slot="sbo-3">
          <span>{{getDataDetail.sbo_odds_under}}</span>
        </template>
        <template slot="ibc-1">
          <span>{{getDataDetail.ibc_ou}}</span>
        </template>
        <template slot="ibc-2">
          <span>{{getDataDetail.ibc_odds_over}}</span>
        </template>
        <template slot="ibc-3">
          <span>{{getDataDetail.ibc_odds_under}}</span>
        </template>
      </oddoucontent>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import headerLeague from '../leagueNamePre'
import preductionbt from './predictionBt'
import oddouheader from './oddOuHeader'
import oddoucontent from './oddOuContent'
export default {
  data() {
    return {
      activeStyle: 'timeInplay',
    }
  },
  filters: {
    stateMatch(val) {
      let period = ''
      switch (val) {
        case 'Part1':
          period = '1H'
          break
        case 'Part2':
          period = '2H'
          break
        case '':
          period = 'Kickoff'
          break
        default:
          period = val
      }
      return period
    },
    matchDate(value, match_dt) {
      switch (value) {
        case '0':
          var date = new Date(match_dt.replace(/-/g, '/'))
          return `${date.getHours()}:${date.getMinutes() == 0 ? '00' : date.getMinutes()}`
          break
        default:
          return value + "'"
          break
      }
    },
  },
  components: {
    headerLeague,
    preductionbt,
    oddouheader,
    oddoucontent,
  },
  computed: {
    ...mapGetters('detailpredictions', ['getIsHideDetail', 'getIsHideHeader', 'getDataDetail', 'getCurrentType']),
  },
  methods: {
    ...mapActions('detailpredictions', ['hideDetail']),
  },
  watch: {
    getCurrentType(newValue) {
      switch (newValue.trim()) {
        case 'expired':
          this.activeStyle = 'timeExpired'
          break
        case 'pregame':
          this.activeStyle = 'timePregame'
          break
        default:
          this.activeStyle = 'timeInplay'
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$circle-diameter: 64px;
.timeInplay {
  div:first-child {
    background-color: #ff7c7c;
  }
  div:last-child {
    background-color: #fee1e1;
  }
}
.timePregame {
  color: #fff;
  div:first-child {
    background: #5bb6e7 !important;
  }
  div:last-child {
    background: #c8e6f7 !important;
  }
}
.timeExpired {
  div:first-child {
    background: #767676 !important;
  }
  div:last-child {
    background: #f0f0f0 !important;
  }
}
.divided-circle {
  width: $circle-diameter;
  height: $circle-diameter;
  display: grid;
  font-weight: 700;
  div:first-child,
  div:last-child {
    font-size: 14px !important;
    width: $circle-diameter;
    height: $circle-diameter/2;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  div:first-child {
    border-top-left-radius: $circle-diameter/2;
    border-top-right-radius: $circle-diameter/2;
  }
  div:last-child {
    border-bottom-left-radius: $circle-diameter/2;
    border-bottom-right-radius: $circle-diameter/2;
  }
}
.detail-predictions {
  width: 100%;
  max-width: 512px;
  background-color: #fff;
  height: 100%;
  float: right;
  visibility: visible;
  transition: width 1s, visibility 1s;
  position: relative;
}
.hide-detail {
  visibility: hidden;
  width: 0;
}
.header-detail {
  height: 50px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  color: #444;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
}
.hide-header {
  display: none;
}
.league-name {
  background-color: #fff !important;
}
.score {
  display: flex;
  align-items: center;
  padding: 0 24px;
  div:first-child {
    flex: 1;
    font-size: 28px;
  }
  div:last-child {
    flex: 1;
    text-align: right;
    font-size: 28px;
  }
}
.team {
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-top: 10px;
  div:first-child {
    flex: 1;
    font-size: 16px;
  }
  div:nth-child(2) {
    color: rgba(0, 0, 0, 0.34);
  }
  div:last-child {
    flex: 1;
    text-align: right;
    font-size: 16px;
  }
}
.system {
  color: rgba(0, 0, 0, 0.34);
  text-align: center;
  font-size: 14px;
  margin: 15px 0 41px 0;
}
.margin-top {
  top: 237px !important;
}
.odds-ou {
  // background-color: blueviolet;
  height: calc(100% - 284px);
  overflow-x: hidden;
  // padding-top: 20px;
  ul {
    list-style: none;
  }
}
.livecenter {
  background-color: aqua;
  height: 300px;
}
</style>



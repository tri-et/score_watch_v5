<template>
  <div class="predictions">
    <!-- {{this.$root.browserWidth}} -->
    <div class="left-col">
      <calendar></calendar>
      <div class="predictions-container">
        <div class="inplay">
          <headerpre type="inplay">inplay</headerpre>
          <nomatches :class="{'hide_no_matches':filterLeagueInPlay.length!=0}"></nomatches>
          <template v-for="(league,index) in filterLeagueInPlay">
            <leaguenamepre :key="index+'league_inplay'">
              <span>{{league}}</span>
            </leaguenamepre>
            <div class="match_container" :key="index+'macth_container_inplay'" :class="{'last':filterLeagueInPlay.length==index+1}">
              <matchprecontainer type="inplay" v-for="(match,index) in filterHomeAwayName" :match="match" :key="index+'match_inplay'" v-if="league==match.league && match.match_period!='FT' && !match.isExpired">
              </matchprecontainer>
            </div>
          </template>
          <headerpre type="expired">expired in-play</headerpre>
          <nomatches :class="{'hide_no_matches':filterLeagueInPlayExp.length!=0}"></nomatches>
          <template v-for="(league,index) in filterLeagueInPlayExp">
            <leaguenamepre :key="index+'league_inplay_exp'">
              <span>{{league}}</span>
            </leaguenamepre>
            <div class="match_container" :key="index+'macth_container_inplay_exp'" :class="{'last':filterLeagueInPlayExp.length==index+1}">
              <matchprecontainer type="expired" v-for="(match,index) in filterHomeAwayName" :match="match" :key="index+'match_inplay_exp'" v-if="league==match.league && (match.match_period=='FT' || match.isExpired)">
              </matchprecontainer>
            </div>
          </template>
        </div>
        <div class="pregame " @click="hideDetail(false) ">
          <headerpre type="pregame">pregame</headerpre>
          <nomatches :class="{ 'hide_no_matches':filterLeaguePregame.length!=0} "></nomatches>
          <template v-for="(league,index) in filterLeaguePregame ">
            <leaguenamepre :key="index+ 'league_pregame' ">
              <span>{{league}}</span>
            </leaguenamepre>
            <div class="match_container" :key="index+ 'macth_container_pregame' " :class="{ 'last':filterLeaguePregame.length==index+1} ">
              <matchpregamecontainer type="pregame " v-for="(match,index) in filterHomeAwayNamePre " :match="match " :key="index+ 'match_pre' " v-if="league==match.league&&(match.match_period!='' ||match.match_period=='' ) ">
              </matchpregamecontainer>
            </div>
          </template>
          <headerpre type="expired">expired pre-game</headerpre>
          <nomatches :class="{ 'hide_no_matches':filterLeaguePregameExp.length!=0} "></nomatches>
          <template v-for="(league,index) in filterLeaguePregameExp ">
            <leaguenamepre :key="index+ 'league_pregame_exp' ">
              <span>{{league}}</span>
            </leaguenamepre>
            <div class="match_container " :key="index+ 'macth_container_pregame_exp' " :class="{ 'last':filterLeaguePregameExp.length==index+1} ">
              <matchpregamecontainer type="expired " v-for="(match,index) in filterHomeAwayNamePre " :match="match " :key="index+ 'match_pre_exp' " v-if="league==match.league&&match.match_period=='FT' ">
              </matchpregamecontainer>
            </div>
          </template>
        </div>
        <div class="footer ">All Right Reserved. © 2018. Powered by In-Play</div>
      </div>
    </div>
    <div class="right-col " :class="{ 'hide-right-col':getIsHideDetail} ">
      <detailprediction></detailprediction>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import _ from 'lodash'
import detailprediction from './details/detailpredictions'
import calendar from './calendar'
import headerpre from './headerPre'
import leaguenamepre from './leagueNamePre'
import matchprecontainer from './inplay/matchInplayContainer'
import nomatches from './noMatches'
import matchpregamecontainer from './pregame/matchPregameContainer'
export default {
  computed: {
    ...mapGetters('boxsearch', ['getchekedLeagueName', 'getFilterTeamName']),
    ...mapGetters('detailpredictions', ['getIsHideDetail']),
    ...mapGetters('datapredictions', [
      'getLeaguePrediction',
      'getMatchInPlay',
      'getMatchPregame',
      'getLeagueInPlay',
      'getLeagueInPlayExp',
      'getLeaguePregame',
      'getLeaguePregameExp',
    ]),
    filterLeagueInPlayExp() {
      return this.checkLeagueInPlayExp(this.filterHomeAwayName)
    },
    filterLeagueInPlay() {
      return this.checkLeagueInPlay(this.filterHomeAwayName)
    },
    filterLeaguePregame() {
      return this.checkLeaguePregame(this.filterHomeAwayNamePre)
    },
    filterLeaguePregameExp() {
      return this.checkLeaguePregameExp(this.filterHomeAwayNamePre)
    },
    filterHomeAwayName() {
      if (this.getFilterTeamName == '') {
        return this.getMatchInPlay
      } else {
        return this.getMatchInPlay.filter(el => {
          return (
            el.team_home.match(new RegExp(this.getFilterTeamName, 'gi')) ||
            el.team_away.match(new RegExp(this.getFilterTeamName, 'gi'))
          )
        })
      }
    },
    filterHomeAwayNamePre() {
      if (this.getFilterTeamName == '') {
        return this.getMatchPregame
      } else {
        return this.getMatchPregame.filter(el => {
          return (
            el.team_home.match(new RegExp(this.getFilterTeamName, 'gi')) ||
            el.team_away.match(new RegExp(this.getFilterTeamName, 'gi'))
          )
        })
      }
    },
  },
  methods: {
    ...mapActions('detailpredictions', ['hideDetail']),
    ...mapActions('datapredictions', [
      'setLeague',
      'setDataInplay',
      'setDataPregame',
      'setDataLeagueInplay',
      'setDataLeagueInplayExp',
      'setDataLeaguePregame',
      'setDataLeaguePregameExp',
    ]),
    checkLeagueInPlay(data) {
      var self = this
      var league = _.filter(data, ({league, match_period, isExpired}) => {
        return _.includes(self.getchekedLeagueName, league) && match_period != 'FT' && !isExpired
      })
      return _.union(_.map(league, 'league'))
    },
    checkLeagueInPlayExp(data) {
      var self = this
      var league = _.filter(data, ({league, match_period, isExpired}) => {
        return _.includes(self.getchekedLeagueName, league) && (match_period == 'FT' || isExpired)
      })
      return _.union(_.map(league, 'league'))
    },
    checkLeaguePregame(data) {
      var self = this
      var league = _.filter(data, ({league, match_period}) => {
        return _.includes(self.getchekedLeagueName, league) && match_period != 'FT'
      })
      return _.union(_.map(league, 'league'))
    },
    checkLeaguePregameExp(data) {
      var self = this
      var league = _.filter(data, ({league, match_period}) => {
        return _.includes(self.getchekedLeagueName, league) && match_period == 'FT'
      })
      return _.union(_.map(league, 'league'))
    },
  },
  components: {
    detailprediction,
    calendar,
    headerpre,
    leaguenamepre,
    matchprecontainer,
    nomatches,
    matchpregamecontainer,
  },
  mounted() {
    var today = new Date()
    var dateselected = today.getFullYear() + '-' + (parseInt(today.getMonth()) + 1) + '-' + today.getDate()
    this.$root.GetData.getInPlayPreGame(this, dateselected)
  },
}
</script>
<style lang="scss" scoped>
.predictions {
  background-color: #444;
  top: 64px;
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
}
.left-col {
  position: relative;
  height: 100%;
  background-color: #333;
  min-width: 352px;
  flex: 1;
}
.predictions-container {
  display: block;
  -webkit-overflow-scrolling: touch;
  justify-items: center;
  overflow-x: hidden;
  max-height: calc(100% - 128px);
  margin: 0 5px;
  padding: 0 3px;
  grid-template-areas:
    'header header header header header header'
    'main main main main main main'
    'footer footer footer footer footer footer';
}
.predictions-container::after {
  content: '';
  clear: both;
  display: table;
}
.right-col {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  transition: width 1s;
}
.hide-right-col {
  width: 0;
}
.inplay {
  grid-area: header;
  max-width: 360px;
  min-width: 200px;
  width: 100%;
  margin: auto;
  div[class='match_container last'] {
    padding-bottom: 10px !important;
  }
}
.pregame {
  grid-area: main;
  margin: auto;
  max-width: 360px;
  min-width: 200px;
  width: 100%;
  div[class='match_container last'] {
    padding-bottom: 10px !important;
  }
}
.match_container {
  background-color: #f0f0f0;
  padding: 0 8px 8px 8px;
}
.footer {
  grid-area: footer;
  background-color: #333;
  height: 64px;
  width: 100%;
  border-top: 1px solid rgba(225, 225, 225, 0.1);
  margin-top: 15px;
  color: #fff;
  opacity: 0.34;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
}
.hide_no_matches {
  display: none !important;
}
@media (min-width: 320px) {
  .right-col {
    position: fixed;
    z-index: 3;
    top: 0;
    right: 0;
  }
}
@media (min-width: 672px) {
  .right-col {
    width: 100%;
    position: unset;
    z-index: 0;
    max-width: 512px;
    min-width: 320px;
  }
}
@media (min-width: 1248px) {
  .predictions-container {
    display: grid;
    grid-template-areas:
      'main main main right right right'
      'footer footer footer footer footer footer';
    grid-column-gap: 5px;
  }
  .inplay {
    grid-area: main;
    margin: 0;
  }
  .pregame {
    grid-area: right;
    margin: 0;
  }
}
</style>


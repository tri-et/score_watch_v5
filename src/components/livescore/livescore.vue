<template>
  <div class="livescores" :class="{'top':getIsMobile && getIsSearching}">
    <!-- {{this.$root.browserWidth}} -->
    <div class="left-col">
      <calendarlivescore></calendarlivescore>
      <div class="livescores-container" :class="{'max-height-prediction':getIsMobile && getIsSearching}">
        <div class="inplay">
          <template v-for="(item,index) in filterLeftLeague">
            <leaguelivescore :key="index+'leftCol'" :color="item.colorName">
              <span slot="shortnamelive">{{item.shortName}}</span>
              <span slot="leaguenamelive">{{item.leagueName}}</span>
            </leaguelivescore>
            <matchlivescore v-for="(match,index) in filterHomeAwayNameLeft" :match="match" v-if="match[5]==item.leagueName" :key="index+match[0]">
            </matchlivescore>
          </template>
        </div>
        <div class="pregame">
          <template v-for="(item,index) in filterRightLeague">
            <leaguelivescore :key="index+'rightCol'" :color="item.colorName">
              <span slot="shortnamelive">{{item.shortName}}</span>
              <span slot="leaguenamelive">{{item.leagueName}}</span>
            </leaguelivescore>
            <matchlivescore v-for="(match,index) in filterHomeAwayNameRight" :match="match" v-if="match[5]==item.leagueName" :key="index+match[0]">
            </matchlivescore>
          </template>
        </div>
        <div class="footer">All Right Reserved. © 2018. Powered by In-Play</div>
        <div class="loading-live" :class="{'show-loading':getHideLoadingLive}">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-col" :class="{'hide-right-col':getIsHideDetail}">
      <detaillivescore></detaillivescore>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import _ from 'lodash'
import detaillivescore from './details/detaillivescore'
import calendarlivescore from './calendarLivescore'
import leaguelivescore from './leagueNameLive'
import matchlivescore from './matchLiveScore'
export default {
  components: {
    calendarlivescore,
    detaillivescore,
    leaguelivescore,
    matchlivescore,
  },
  computed: {
    ...mapGetters('datalivescore', [
      'getLeagueLiveScore',
      'getMatchesColRight',
      'getMatchesColLeft',
      'getHideLoadingLive',
    ]),
    ...mapGetters('detailpredictions', ['getIsHideDetail']),
    ...mapGetters('boxsearch', ['getchekedLeagueNameLive', 'getFilterTeamName']),
    ...mapGetters('menuheader', ['getIsSearching', 'getIsMobile']),
    filterRightLeague() {
      return this.checkLeague(this.filterHomeAwayNameRight, 'right')
    },
    filterLeftLeague() {
      return this.checkLeague(this.filterHomeAwayNameLeft, 'left')
    },
    filterHomeAwayNameRight() {
      if (this.getFilterTeamName == '') {
        return this.getMatchesColRight
      } else {
        return this.getMatchesColRight.filter(el => {
          return (
            el[8].match(new RegExp(this.getFilterTeamName, 'gi')) ||
            el[9].match(new RegExp(this.getFilterTeamName, 'gi'))
          )
        })
      }
    },
    filterHomeAwayNameLeft() {
      if (this.getFilterTeamName == '') {
        return this.getMatchesColLeft
      } else {
        return this.getMatchesColLeft.filter(el => {
          return (
            el[8].match(new RegExp(this.getFilterTeamName, 'gi')) ||
            el[9].match(new RegExp(this.getFilterTeamName, 'gi'))
          )
        })
      }
    },
  },
  methods: {
    ...mapActions('datalivescore', [
      'setLeagueLiveSocre',
      'setDataLiveScore',
      'setDataLiveScoreDetail',
      'setHideLoadingLive',
    ]),
    checkLeague(data, col) {
      var self = this
      var league = _.filter(data, match => {
        return _.includes(self.getchekedLeagueNameLive, match[5])
      })
      this.setDataDefaultLive(league, col)
      return _.unionBy(
        _.map(league, x => {
          return Object.assign({
            leagueName: x[5],
            shortName: x[6],
            colorName: x[7],
          })
        }),
        'leagueName'
      )
    },
    setDataDefaultLive(value, col) {
      if (value.length != 0 && col == 'left') {
        this.setDataLiveScoreDetail(value[0])
      }
    },
  },
  mounted() {
    this.$root.GetData.getLiveScore(this, '')
  },
}
</script>
<style lang="scss" scoped>
.show-loading {
  display: flex !important;
}
.loading-live {
  background-color: #000;
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  left: 0;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  max-height: calc(100vh - 128px);
  top: 64px;
}
.max-height-prediction {
  max-height: calc(100% - 213px) !important;
}
.livescores {
  background-color: #444;
  top: 64px;
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
  transition: top 0.2s;
}
.left-col {
  position: relative;
  height: 100%;
  background-color: #333;
  min-width: 352px;
  flex: 1;
}
.livescores-container {
  display: block;
  -webkit-overflow-scrolling: touch;
  justify-items: center;
  overflow-x: hidden;
  max-height: calc(100% - 145px);
  margin: 0 5px;
  padding: 15px 3px 0px 3px;
  grid-template-areas:
    'header header header header header header'
    'main main main main main main'
    'footer footer footer footer footer footer';
}
.livescores-container::after {
  content: '';
  clear: both;
  display: table;
}
.right-col {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  transition: width 0.5s;
}
.hide-right-col {
  width: 0;
}
.inplay {
  grid-area: header;
  max-width: 360px;
  min-width: 200px;
  width: 100%;
  background-color: #f0f0f0;
  height: fit-content;
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
  height: fit-content;
  background-color: #f0f0f0;
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
.top {
  top: 135px !important;
}
.lds-ring {
  width: 45px;
  height: 45px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 6px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
  .livescores-container {
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


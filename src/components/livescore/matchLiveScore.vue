<template>
  <div class="match_live_score" @click="liveSelected()" :style="{'border-color':match[0]==getLiveScoreDetail[0]?match[7]:'transparent'}">
    <!-- :class="{'border':}" -->
    <div>
      <span :style="bg" v-if="match[4]=='HT'">45</span>
      <span :style="bg" v-else>{{match[4]|filterTime(matchDate(match[10],bg))}}</span>
      <span :style="bg">{{match[3]|filterStatus(matchDate(match[10]),bg)}}</span>
    </div>
    <div>
      <span v-html="this.$options.filters.highlight(match[8],this.getFilterTeamName)"></span>
      <span v-html="this.$options.filters.highlight(match[9],this.getFilterTeamName)"></span>
    </div>
    <div>
      <span>{{match[12]}}</span>
      <span>{{match[13]}}</span>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  props: {
    match: [Array],
  },
  data() {
    return {
      bg: {
        color: '',
      },
    }
  },
  filters: {
    filterTime(val, match_dt) {
      if (val == '') {
        return match_dt
      } else {
        return val == 'FT' ? val : val + "'"
      }
    },
    filterStatus(val, match_dt, bg, t) {
      var st = ''
      switch (val) {
        case '-1':
          st = match_dt
          break
        case '2':
          st = 'HT'
          bg.color = '#ff9250'
          break
        case '1':
        case '3':
          st = 'Live'
          bg.color = '#50d278'
          break
        case '0':
          st = 'Kickoff'
          bg.color = '#767676'
          break
        default:
          st = val
          break
      }
      return st
    },
  },
  computed: {
    ...mapGetters('boxsearch', ['getFilterTeamName']),
    ...mapGetters('datalivescore', ['getLiveScoreDetail']),
  },
  methods: {
    ...mapActions('detailpredictions', ['hideDetail']),
    ...mapActions('datalivescore', ['setDataLiveScoreDetail']),
    matchDate(value) {
      var date = new Date(value.replace(/-/g, '/'))
      return date.getHours() + ':' + (date.getMinutes() == 0 ? '00' : date.getMinutes())
    },
    liveSelected() {
      this.hideDetail(false)
      this.match[26] = this.match[3]
      this.setDataLiveScoreDetail(this.match)
    },
  },
}
</script>
<style lang="scss" scoped>
.match_live_score {
  display: inline-flex;
  background-color: #f0f0f0;
  margin: 0 8px 8px 8px;
  box-shadow: 0 -1px 5px -1px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  padding: 7px 0;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  width: -webkit-fill-available;
  div {
    display: grid;
    grid-gap: 5px;
  }
  div:first-child {
    width: 48px;
    text-align: center;
    font-size: 12px !important;
  }
  div:nth-child(2) {
    flex: 1;
  }
  div:last-child {
    width: 30px;
    text-align: center;
  }
}
.border {
  border: 1px solid #000;
}
</style>



<template>
  <div class="stats-detail">
    <ul>
      <li>
        <div class="row-stats">
          <div>
            <span>{{homeAway(getStatsDetail[6],'home')}}</span>
          </div>
          <div><hr class="home-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[6],'home'))}"></div>
          <div>
            <span>Shots</span>
          </div>
          <div><hr class="away-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[6],'away'))}"></div>
          <div>
            <span>{{homeAway(getStatsDetail[6],'away')}}</span>
          </div>
        </div>
      </li>
      <li>
        <div class="row-stats">
          <div>
            <span>{{homeAway(getStatsDetail[37],'home')}}</span>
          </div>
          <div><hr class="home-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[37],'home'))}"></div>
          <div>
            <span>Off Target</span>
          </div>
          <div><hr class="away-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[37],'away'))}"></div>
          <div>
            <span>{{homeAway(getStatsDetail[37],'away')}}</span>
          </div>
        </div>
      </li>
      <li>
        <div class="row-stats">
          <div>
            <span>{{homeAway(getStatsDetail[9],'home')}}</span>
          </div>
          <div><hr class="home-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[9],'home'))}"></div>
          <div>
            <span>Corner Kicks</span>
          </div>
          <div><hr class="away-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[9],'away'))}"></div>
          <div>
            <span>{{homeAway(getStatsDetail[9],'away')}}</span>
          </div>
        </div>
      </li>
      <li>
        <div class="row-stats">
          <div>
            <span>{{homeAway(getStatsDetail[14],'home')}}</span>
          </div>
          <div><hr class="home-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[14],'home'))}"></div>
          <div>
            <span>Yellow Cards</span>
          </div>
          <div><hr class="away-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[14],'away'))}"></div>
          <div>
            <span>{{homeAway(getStatsDetail[14],'away')}}</span>
          </div>
        </div>
      </li>
      <li>
        <div class="row-stats">
          <div>
            <span>{{homeAway(getStatsDetail[16],'home')}}</span>
          </div>
          <div><hr class="home-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[16],'home'))}"></div>
          <div>
            <span>Red Cards</span>
          </div>
          <div><hr class="away-percent-line" :style="{'width':setWidthStats(homeAway(getStatsDetail[16],'away'))}"></div>
          <div>
            <span>{{homeAway(getStatsDetail[16],'away')}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('datalivescore', ['getStatsDetail']),
  },
  methods: {
    homeAway(val, team) {
      if (val != undefined) {
        if (val != '') {
          var data = val.split(',')
          if (team == 'home') {
            return data[0]
          } else {
            return data[1]
          }
        } else {
          return '-'
        }
      } else {
        return '-'
      }
    },
    setWidthStats(val) {
      return val == "-" ? "0%" : parseInt(val) * 100 / 35 + "%";
    }
  },
}
</script>
<style lang="scss" scoped>
.stats-detail {
  padding: 0 15px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.row-stats {
  display: flex;
  padding: 13px 0;
  div:nth-child(even) {
    flex: 1;
  }
  div:nth-child(3) {
    width: 28%;
    color: #c5c5c5;
    font-size: 15px;
    text-align: center;
  }
}
.home-percent-line {
  float: right;
  border: none;
  border-top: 6px solid #ff785a;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 50px;
}
.away-percent-line {
  float: left;
  border: none;
  border-top: 6px solid #36cc64;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 60px;
}
</style>



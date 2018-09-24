<template>
  <div class="match_pre_container" @click="matchSelected()" :style="match.idmatch==getDataDetail.idmatch?active:''">
    <matchpre :type="type" :matchperiod="match.match_period">
      <template slot="timelive">
        <span>{{`${match.match_minute}\'`}}</span>
        <span>{{match.match_period|filterMatchTime}}</span>
      </template>
      <template slot="match_time_ft">
        <span>{{match.match_dt|filterDateTime}}</span>
      </template>
      <template slot="match_team">
        <span v-html="this.$options.filters.highlight(match.team_home,this.getFilterTeamName)"></span>
        <span v-html="this.$options.filters.highlight(match.team_away,this.getFilterTeamName)"></span>
      </template>
      <template slot="match_score">
        <span>{{match.score_home}}</span>
        <span>{{match.score_away}}</span>
      </template>
    </matchpre>
    <inplayprediction :marquee="marquee" :bg="bginplay" :item="match.detail" :type="type">
      <template slot="team_pick">
        <span :class="{'marquee':marquee}">{{match.pick_hdp=="H"?match.team_home.trim():match.team_away.trim()}}</span>
      </template>
      <template slot="odd_score">
        <span>{{'['+match.detail.score_home+':'+match.detail.score_away+'] '+match.detail.sys_hdp+' @'}}</span>
        <oddou :items="{'odd':match.detail.pick_hdp=='H'?match.detail.sys_odds_home:match.detail.sys_odds_away,'match_code':match.detail.match_code}">
        </oddou>
      </template>
    </inplayprediction>
    <overunder :bg="bgover" :type="type" :item="match.detail">
      <template slot="over_under_pick">
        <span>{{match.detail.pick_ou=="O"?"over":"under"}}</span>
      </template>
      <template slot="odd_over_under">
        <span>{{'['+match.detail.score_home+':'+match.detail.score_away+'] '+match.detail.sys_hdp+' @'}}</span>
        <span>{{match.detail.pick_ou=="O"?match.detail.sys_odds_over:match.detail.sys_odds_under}}</span>
      </template>
    </overunder>
  </div>
</template>
<script>
import matchpre from './matchInPlay'
import inplayprediction from './inplayPrediction'
import oddou from './oddOu'
import overunder from './overUnder'
import pred_gold from '@/assets/imgs/pred_gold.svg'
import lose_icon from '@/assets/imgs/lose_icon@1x.svg'
import win_icon from '@/assets/imgs/win_icon@1x.svg'
import draw_icon from '@/assets/imgs/draw_icon@1x.svg'
import _ from 'lodash'
import {mapGetters, mapActions} from 'vuex'
export default {
  props: {
    match: [Object],
    type: [String],
  },
  data() {
    return {
      marquee: false,
      bginplay: {
        backgroundColor: '#FEE1E1',
        color: '#000',
        imgUrl: pred_gold,
      },
      bgover: {
        backgroundColor: '#FEE1E1',
        color: '#000',
        imgUrl: pred_gold,
      },
      lose: {
        imgUrl: lose_icon,
        backgroundColor: '#F0F0F0',
        color: 'rgba(51,51,51,.45)',
      },
      win: {
        imgUrl: win_icon,
        backgroundColor: '#69AE72',
        color: '#FFF',
      },
      draw: {
        imgUrl: draw_icon,
        backgroundColor: '#F0F0F0',
        color: 'rgba(51,51,51,.45)',
      },
      active: {
        border: '',
      },
    }
  },
  components: {
    matchpre,
    inplayprediction,
    oddou,
    overunder,
  },
  computed: {
    ...mapGetters('boxsearch', ['getFilterTeamName']),
    ...mapGetters('detailpredictions', ['getDataDetail']),
    ...mapGetters('datapredictions', ['getIpAddress']),
  },
  filters: {
    filterDateTime(value) {
      var date = new Date(value.replace(/-/g, '/'))
      return date.getHours() + ':' + (date.getMinutes() == 0 ? '00' : date.getMinutes())
    },
    filterMatchTime(value) {
      var time = ''
      switch (value) {
        case 'HT':
          time = 'HT'
          break
        case 'Part2':
          time = '2H'
          break
        case 'Part1':
          time = '1H'
          break
        default:
          var matchPeriod = parseInt(value)
          time = matchPeriod > 0 && matchPeriod < 45 ? '1H' : '2H'
      }
      return time
    },
  },
  methods: {
    ...mapActions('detailpredictions', ['hideDetail', 'setDataDetail']),
    setMarquee() {
      var inner = this.$el.querySelector('.team_pick').offsetWidth
      var outter = this.$el.querySelector('.team_pick span').offsetWidth - 1
      if (outter > inner) this.marquee = true
    },
    setbgInPlay() {
      switch (this.type) {
        case 'expired':
          let hdp = parseFloat(this.match.detail.sys_hdp)
          let score_home =
            parseInt(this.match.score_home) + (hdp > 0 ? hdp : 0) - parseInt(this.match.detail.score_home)
          let score_away =
            parseInt(this.match.score_away) + (hdp < 0 ? Math.abs(hdp) : 0) - parseInt(this.match.detail.score_away)
          if (this.match.match_period == 'FT') {
            if (this.match.detail.pick_hdp == 'H') {
              if (score_home > score_away) {
                this.bginplay = this.win
              } else if (score_home < score_away) {
                this.bginplay = this.lose
              } else {
                this.bginplay = this.draw
              }
            } else {
              if (score_away > score_home) {
                this.bginplay = this.win
              } else if (score_away < score_home) {
                this.bginplay = this.lose
              } else {
                this.bginplay = this.draw
              }
            }
          }
          break
      }
    },
    setgbOver() {
      let ou = parseFloat(this.match.detail.sys_ou)
      let finalsocre = parseInt(this.match.score_home) + parseInt(this.match.score_away)
      if (this.type == 'expired' && this.match.match_period == 'FT') {
        switch (this.match.detail.pick_ou) {
          case 'O':
            if (finalsocre > ou) {
              this.bgover = this.win
            } else if (finalsocre < ou) {
              this.bgover = this.lose
            } else {
              this.bgover = this.draw
            }
            break
          default:
            if (ou > finalsocre) {
              this.bgover = this.win
            } else if (ou < finalsocre) {
              this.bgover = this.lose
            } else {
              this.bgover = this.draw
            }
            break
        }
      }
    },
    matchSelected() {
      this.hideDetail(false)
      this.$root.GetData.getLiveCast(
        this.match.rb_id != '' ? this.match.rb_id : this.match.idmatch,
        this.getIpAddress,
        this.$parent
      )
      this.setDataDetail({data: this.match, type: this.type})
      if (this.type == 'expired') {
        this.active.border = '1px solid #767676'
      } else {
        this.active.border = '1px solid #ff7c7c'
      }
    },
  },
  created() {
    this.setbgInPlay()
    this.setgbOver()
    if (this.type == 'expired') {
      this.active.border = '1px solid #767676'
    } else {
      this.active.border = '1px solid #ff7c7c'
    }
  },
  mounted() {
    this.setMarquee()
    var seft = this
    this.$root.$on('browserResize', function(data) {
      seft.setMarquee()
    })
  },
  watch: {
    match: {
      handler(val) {
        if (val.match_period == 'FT') {
          this.setbgInPlay()
          this.setgbOver()
        }
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.match_pre_container {
  box-shadow: -1px -1px 8px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  &:last-of-type {
    margin-bottom: 0px;
  }
}
.marquee {
  position: absolute;
  animation: leftmarquee 5s linear infinite;
}
@keyframes leftmarquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>



<template>
  <div class="match_pregame_container" @click="matchSelected()" :style="match.idmatch==getDataDetail.idmatch?active:''">
    <matchpregame :type="type">
      <template slot="match_time_ft">
        <span>{{match.match_dt|filterDateTime}}</span>
      </template>
      <template slot="match_team">
        <span v-html="this.$options.filters.highlight(match.team_home,this.getFilterTeamName)"></span>
        <span v-html="this.$options.filters.highlight(match.team_away,this.getFilterTeamName)"></span>
      </template>
      <template slot="match_live">
        <span v-if="match.match_period!=''" class="live">Live</span>
        <span class="remain" v-else>{{match.match_dt|time_remaining}}</span>
      </template>
      <template slot="match_score">
        <span>{{match.score_home}}</span>
        <span>{{match.score_away}}</span>
      </template>
    </matchpregame>
    <pregameprediction :marquee="marquee" :bg="bgpre">
      <template slot="team_pick">
        <span :class="{'marquee':marquee}">{{match.pick_hdp=="H"?match.team_home.trim():match.team_away.trim()}}</span>
      </template>
      <template slot="odd_score">
        <span v-show="type=='expired'">{{'['+match.score_home+':'+match.score_away+'] '}}</span>&nbsp;
        <span>{{match.sys_hdp+' @ '+(match.pick_hdp=="H"?match.sys_odds_home:match.sys_odds_away)}}</span>
      </template>
    </pregameprediction>
    <overunderpregame :bg="bgover">
      <template slot="over_under_pick">
        <span>{{match.pick_ou=="O"?"over":"under"}}</span>
      </template>
      <template slot="odd_over_under">
        <span v-show="type=='expired'">{{'['+match.score_home+':'+match.score_away+'] '}}</span>&nbsp;
        <span>{{match.sys_hdp+' @'}}</span>&nbsp;
        <span>{{match.pick_ou=="O"?match.sys_odds_over:match.sys_odds_under}}</span>
      </template>
    </overunderpregame>
  </div>
</template>
<script>
import matchpregame from './matchPregame'
import pregameprediction from './pregamePrediction'
import overunderpregame from './overUnderPregame'
import pred_gold from '@/assets/imgs/pred_gold.svg'
import lose_icon from '@/assets/imgs/lose_icon@1x.svg'
import win_icon from '@/assets/imgs/win_icon@1x.svg'
import draw_icon from '@/assets/imgs/draw_icon@1x.svg'
import {mapGetters, mapActions} from 'vuex'
export default {
  props: {
    match: [Object],
    type: [String],
  },
  data() {
    return {
      marquee: false,
      bgpre: {
        backgroundColor: '#C8E6F7',
        color: '#000',
        imgUrl: pred_gold,
      },
      bgover: {
        backgroundColor: '#C8E6F7',
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
  computed: {
    ...mapGetters('boxsearch', ['getFilterTeamName']),
    ...mapGetters('detailpredictions', ['getDataDetail', 'getCurrentType']),
    ...mapGetters('datapredictions', ['getIpAddress']),
  },
  components: {
    matchpregame,
    pregameprediction,
    overunderpregame,
  },
  filters: {
    filterDateTime(value) {
      var date = new Date(value.replace(/-/g, '/'))
      return date.getHours() + ':' + (date.getMinutes() == 0 ? '00' : date.getMinutes())
    },
    time_remaining(matchdate) {
      var matchDate = new Date(matchdate.replace(/-/g, '/'))
      var currentDate = new Date()
      var millisec = matchDate.getTime() - currentDate.getTime()
      var seconds = (millisec / 1000).toFixed(0)
      var minutes = Math.floor(seconds / 60)
      var hours = ''
      if (minutes > 59) {
        hours = Math.floor(minutes / 60)
        hours = hours >= 10 ? hours : hours
        minutes = minutes - hours * 60
        minutes = minutes >= 10 ? minutes : minutes
      }
      seconds = Math.floor(seconds % 60)
      seconds = seconds >= 10 ? seconds : seconds
      if (hours != '') {
        return 'in ' + hours + 'h ' + minutes + 'm'
      }
      return 'in ' + minutes + 'm'
    },
  },
  methods: {
    ...mapActions('detailpredictions', ['hideDetail', 'setDataDetail']),
    setMarquee() {
      var inner = this.$el.querySelector('.team_pick').offsetWidth
      var outter = this.$el.querySelector('.team_pick span').offsetWidth - 1
      if (outter > inner) this.marquee = true
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
        this.active.border = '1px solid #5bb6e7'
      }
    },
    setbgPregame() {
      switch (this.type) {
        case 'expired':
          let hdp = parseFloat(this.match.sys_hdp)
          let score_home = parseInt(this.match.score_home) + (hdp > 0 ? hdp : 0)
          let score_away = parseInt(this.match.score_away) + (hdp < 0 ? Math.abs(hdp) : 0)
          if (this.match.pick_hdp == 'H') {
            if (score_home > score_away) {
              this.bgpre = this.win
            } else if (score_home < score_away) {
              this.bgpre = this.lose
            } else {
              this.bgpre = this.draw
            }
          } else {
            if (score_away > score_home) {
              this.bgpre = this.win
            } else if (score_away < score_home) {
              this.bgpre = this.lose
            } else {
              this.bgpre = this.draw
            }
          }
          break
      }
    },
    setgbOver() {
      let ou = parseFloat(this.match.sys_ou)
      let finalsocre = parseInt(this.match.score_home) + parseInt(this.match.score_away)
      if (this.type == 'expired') {
        switch (this.match.pick_ou) {
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
  },
  created() {
    this.setbgPregame()
    this.setgbOver()

    //set border stype at first load
    if (this.type == 'expired') {
      this.active.border = '1px solid #767676'
    } else {
      this.active.border = '1px solid #5bb6e7'
    }
  },
  mounted() {
    this.setMarquee()
    var seft = this
    this.$root.$on('browserResize', function(data) {
      seft.setMarquee()
    })
  },
}
</script>
<style lang="scss" scoped>
.live {
  color: #69ae72;
  font-weight: 700;
}
.remain {
  color: #000;
  opacity: 0.34;
}
.match_pregame_container {
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

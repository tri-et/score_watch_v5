<template>
  <div class="match_pregame_container">
    <matchpregame :type="type">
      <template slot="match_time_ft">
        <span>{{match.match_dt|filterDateTime}}</span>
      </template>
      <template slot="match_team">
        <span v-html="this.$options.filters.highlight(match.team_home,this.getFilterTeamName)"></span>
        <span v-html="this.$options.filters.highlight(match.team_away,this.getFilterTeamName)"></span>
      </template>
      <template slot="match_live">
        <span>{{match.match_dt|time_remaining}}</span>
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
        <span>{{'['+match.score_home+':'+match.score_away+'] '+match.sys_hdp+' @ '+(match.pick_hdp=="H"?match.sys_odds_home:match.sys_odds_away)}}</span>
      </template>
    </pregameprediction>
    <overunderpregame :bg="bgover">
      <template slot="over_under_pick">
        <span>{{match.pick_ou=="O"?"over":"under"}}</span>
      </template>
      <template slot="odd_over_under">
        <span>{{'['+match.score_home+':'+match.score_away+'] '+match.sys_hdp+' @'}}</span>
        <span>{{match.pick_ou=="O"?match.sys_odds_over:match.sys_odds_under}}</span>
      </template>
    </overunderpregame>
  </div>
</template>
<script>
import matchpregame from "./matchPregame";
import pregameprediction from "./pregamePrediction";
import overunderpregame from "./overUnderPregame";
import pred_gold from "@/assets/imgs/pred_gold.svg";
import { mapGetters } from "vuex";
export default {
  props: {
    match: [Object],
    type: [String]
  },
  data() {
    return {
      marquee: false,
      bgpre: {
        backgroundColor: "#C8E6F7",
        color: "#000",
        imgUrl: pred_gold
      },
      bgover: {
        backgroundColor: "#C8E6F7",
        color: "#000",
        imgUrl: pred_gold
      }
    };
  },
  computed: {
    ...mapGetters("boxsearch", ["getFilterTeamName"])
  },
  components: {
    matchpregame,
    pregameprediction,
    overunderpregame
  },
  filters: {
    filterDateTime(value) {
      var date = new Date(value.replace(/-/g, "/"));
      return (
        date.getHours() +
        ":" +
        (date.getMinutes() == 0 ? "00" : date.getMinutes())
      );
    },
    time_remaining(matchdate) {
      var matchDate = new Date(matchdate.replace(/-/g, "/"));
      var currentDate = new Date();
      var millisec = matchDate.getTime() - currentDate.getTime();
      var seconds = (millisec / 1000).toFixed(0);
      var minutes = Math.floor(seconds / 60);
      var hours = "";
      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = hours >= 10 ? hours : hours;
        minutes = minutes - hours * 60;
        minutes = minutes >= 10 ? minutes : minutes;
      }
      seconds = Math.floor(seconds % 60);
      seconds = seconds >= 10 ? seconds : seconds;
      if (hours != "") {
        return "in " + hours + "h " + minutes + "m";
      }
      return "in " + minutes + "m";
    }
  },
  methods: {
    setMarquee() {
      var inner = this.$el.querySelector(".team_pick").offsetWidth;
      var outter = this.$el.querySelector(".team_pick span").offsetWidth - 1;
      if (outter > inner) this.marquee = true;
    }
  },
  mounted() {
    this.setMarquee();
    var seft = this;
    this.$root.$on("browserResize", function(data) {
      seft.setMarquee();
    });
  }
};
</script>
<style lang="scss" scoped>
.match_pregame_container {
  box-shadow: -1px -1px 8px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
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

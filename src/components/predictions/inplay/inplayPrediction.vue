<template>
  <div class="inplay_prediction" :style="bg">
    <div class="match_time">
      <img :src="bg.imgUrl" alt="" width="24" height="24">
    </div>
    <div class="team_pick" :style="{'width':marquee?'92px':''}">
      <slot name="team_pick" />
    </div>
    <div class="odd_score">
      <slot name="odd_score" />
    </div>
    <div class="countdown">
      <countdown :item="item"></countdown>
    </div>
    <div v-if="type=='expired'" class="time_expired" >
      <span>{{`Min ${item.minutes}\' - ${calculatorExpired(item.minutes)}\'`}}</span>
    </div>
  </div>
</template>
<script>
import countdown from './countdown'
export default {
  props: {
    marquee: [Boolean],
    bg:[Object],
    item:[Object],
    type:[String]
  },
  components:{
    countdown
  },
  methods:{
    calculatorExpired(minutes) {
      var time = parseInt(minutes);
      if (time < 70) {
        time = time + 10;
      } else {
        time = time + 3;
      }
      return time;
    }
  }
};
</script>
<style lang="scss" scoped>
.inplay_prediction {
  background-color: #69ae72;
  display: flex !important;
  align-items: center;
  padding: 2px 8px;
  font-size: 14px;
  color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  img{
    margin-bottom: -5px;
  }
  div:first-of-type {
    padding: 4px 8px 4px 0px;
  }
  div:nth-of-type(2) {
    max-width: 92px;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 700;
  }
  div:nth-of-type(3) {
    flex: 1;
  }
}
.team_pick {
  position: relative;
  height: 17px;
}
.odd_score {
  display: flex;
  align-items: center;
  padding-left: 5px;
}
.icon {
  display: flex;
  align-content: center;
}
.countdown{
  font-weight: 700;
}
</style>
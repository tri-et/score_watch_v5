<template>
  <div class="pregame_prediction" :style="bg">
    <div class="match_time">
      <img :src="bg.imgUrl" alt="" width="24" height="24">
    </div>
    <div class="team_pick" :style="{'width':marquee?'95px':''}">
      <slot name="team_pick" />
    </div>
    <div class="odd_score">
      <slot name="odd_score" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    marquee: [Boolean],
    bg: [Object]
  }
};
</script>
<style lang="scss" scoped>
.pregame_prediction {
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
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 700;
  }
  div:nth-of-type(3) {
    flex: 1;
    min-width: 200px;
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
</style>
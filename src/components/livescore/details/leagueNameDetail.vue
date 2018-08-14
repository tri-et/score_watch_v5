<template>
  <div class="league-name-live-detail">
    <div class="icon_league_live_detail" :style="{'background-color':data[7]}"></div>
    <div>
      <span :style="{'color':data[7]}">{{data[6]}}</span>
    </div>
    <div>
      <span>{{data[5]}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: [Array],
  },
}
</script>
<style lang="scss" scoped>
.league-name-live-detail {
  height: 48px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  padding-right: 10px;
  div:nth-child(2) {
    margin-right: 5px;
    flex: 1;
  }
}
.icon_league_live_detail {
  height: 24px;
  width: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.34);
  margin: 0 8px;
}
</style>



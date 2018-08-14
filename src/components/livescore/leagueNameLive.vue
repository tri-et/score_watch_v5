<template>
    <div class="league-name-live">
        <div class="icon_league_live" :style="{'background-color':color}"></div>
        <div :style="{'color':color}"><slot name="shortnamelive"/></div>
        <div><slot name="leaguenamelive"/></div>
    </div>
</template>
<script>
export default {
  props:{
    color:[String]
  }
};
</script>
<style lang="scss" scoped>
.league-name-live {
  height: 48px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  text-transform: uppercase;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  div:nth-child(2){
    color:brown;
    margin-right:5px;
  }
}
.icon_league_live {
  height: 24px;
  width: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.34);
  margin: 0 8px;
}
</style>



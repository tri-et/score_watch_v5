<template>
  <div class="match_pre">
    <div class="match_time_ft">
      <slot name="match_time_ft" />
    </div>
    <div class="match_team">
      <slot name="match_team" />
    </div>
    <div class="match_live" :class="{'hide_score':type=='expired'}">
      <slot name="match_live" />
    </div>
    <div class="match_score" :class="{'hide_score':type=='pregame'}">
      <slot name="match_score" />
    </div>
  </div>
</template>
<script>
export default {
  props:{
    type:[String]
  }
};
</script>
<style lang="scss" scoped>
.match_pre {
  background-color: #ffff;
  display: flex;
  padding: 8px 8px 8px 0px;
  align-items: center;
  font-size: 14px;
  div {
    display: grid;
    grid-row-gap: 3px;
  }
  div:first-of-type {
    align-items: center;
    display: flex;
    text-align: center;
    div:nth-of-type(2) {
      padding: 0 8px;
    }
  }
  div:nth-of-type(2) {
    flex: 1;
  }
}
.match_time_ft {
  padding: 0 8px;
  text-align: center;
}
.match_live {
  color: #000;
  opacity: 0.34;
}
.hide_score{
  display: none!important;
}
</style>



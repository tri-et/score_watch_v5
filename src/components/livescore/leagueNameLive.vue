<template>
    <div class="league-name-live">
        <div class="icon_league_live"></div>
        <div><span>MEX MFW</span></div>
        <div><span>MEXICO LIGA MX FEMENIL</span></div>
    </div>
</template>
<script>
export default {};
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
  background-color: #5700af;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.34);
  margin: 0 8px;
}
</style>



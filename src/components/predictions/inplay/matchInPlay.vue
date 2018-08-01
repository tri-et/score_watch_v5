<template>
  <div class="match_pre">
    <div class="match_time" style="display:none !important">
      <div class="icon-live"></div>
      <div>
        <span>FT</span>
        <span>22:00</span>
      </div>
    </div>
    <div class="match_time_ft">
      <slot name="match_time_ft" />
    </div>
    <div class="match_team">
      <slot name="match_team" />
    </div>
    <div class="match_score">
      <slot name="match_score" />
    </div>
  </div>
</template>
<script>
export default {
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
  div:nth-of-type(3) {
    flex: 1;
  }
}
.icon-live {
  height: 10px;
  width: 6px;
  background-color: #8ce898;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
}
.match_time_ft {
  padding: 0 8px;
  text-align: center;
  span:first-of-type {
    font-weight: bold;
  }
}
</style>



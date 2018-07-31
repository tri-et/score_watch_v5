<template>
  <div class="over_under" :style="bg">
    <div class="match_time">
      <img :src="bg.imgUrl" alt="" width="24" height="24">
    </div>
    <div class="over_under_pick">
      <slot name="over_under_pick" />
    </div>
    <div class="odd_over_under">
      <slot name="odd_over_under" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    marquee: [Boolean],
    bg:[Object]
  }
};
</script>
<style lang="scss" scoped>
.over_under {
  background-color: #69ae72;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  font-size: 14px;
  color: #fff;
  div:first-of-type {
    padding: 2px 8px 0px 0px;
  }
}
.over_under_pick {
  position: relative;
  height: 17px;
  font-weight: bold;
  text-transform: capitalize;
}
.odd_over_under {
  display: flex;
  align-items: center;
  padding-left: 5px;
  span:first-of-type{
    padding-right: 3px;
  }
  span:last-of-type{
    font-weight: bold;
  }
}
.icon {
  display: flex;
  align-content: center;
}
</style>
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
     <div v-if="type=='expired'" class="time_expired" >
      <span>{{`Min ${item.minutes}\' - ${calculatorExpired(item.minutes)}\'`}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item:[Object],
    marquee: [Boolean],
    bg: [Object],
    type: [String],
  },
  methods: {
    calculatorExpired(minutes) {
      var time = parseInt(minutes)
      if (time < 70) {
        time = time + 10
      } else {
        time = time + 3
      }
      return time
    },
  },
}
</script>
<style lang="scss" scoped>
.over_under {
  background-color: #69ae72;
  display: flex;
  align-items: center;
  padding: 1px 8px;
  font-size: 14px;
  color: #fff;
  img {
    margin-bottom: -5px;
  }
  div:first-of-type {
    padding: 4px 8px 4px 0px;
  }
  div:nth-of-type(3) {
    flex: 1;
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
  span:first-of-type {
    padding-right: 3px;
  }
  span:last-of-type {
    font-weight: bold;
  }
}
.icon {
  display: flex;
  align-content: center;
}
</style>
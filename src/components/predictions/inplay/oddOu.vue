<template>
  <div class="odd_ou">
    <span>{{items.odd}}</span>
    <span class="arrow" :class="arrow"></span>
  </div>
</template>
<script>
export default {
  props: {
    items: [Object]
  },
  data() {
    return {
      arrow: ""
    };
  },
  watch: {
    items(newdata, olddata) {
      let self = this;
      if (olddata != undefined) {
        if (parseFloat(newdata.odd) > parseFloat(olddata.odd)) {
          this.arrow = "up";
          setTimeout(() => {
            self.arrow = "";
          }, 3000);
        } else if (parseFloat(newdata.odd) < parseFloat(olddata.odd)) {
          this.arrow = "down";
          setTimeout(() => {
            self.arrow = "";
          }, 3000);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.odd_ou {
  padding-left: 2px !important;
}
.arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  cursor: pointer;
  vertical-align: middle;
  display: inline-block;
  opacity: 0;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.down {
  border-top: 5px solid #ff7754;
  opacity: 1;
}
.up {
  border-bottom: 5px solid #2ace5f;
  opacity: 1;
}
</style>



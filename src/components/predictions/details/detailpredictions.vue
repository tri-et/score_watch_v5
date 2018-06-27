<template>
  <div class="detail-predictions" @click="hideDetail(true)" :class="{'hide-detail':getIsHideDetail}">test</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("detailpredictions", ["getIsHideDetail"])
  },
  methods: {
    ...mapActions("detailpredictions", ["hideDetail"])
  }
};
</script>
<style lang="scss" scoped>
.detail-predictions {
  width: 100%;
  max-width: 512px;
  background-color: #fff;
  height: 100%;
  float: right;
  visibility: visible;
  transition: width 1s,visibility 1s;
}
.hide-detail {
  visibility: hidden;
  width: 0;
}
</style>



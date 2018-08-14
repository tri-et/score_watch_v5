<template>
  <div class="detail-predictions" :class="{'hide-detail':getIsHideDetail}">
    <div class="header-detail" @click="hideDetail(true)" :class="{'hide-header':getIsHideHeader}">
      <i class="material-icons">keyboard_backspace</i>
      <span>&nbsp;Back</span>
    </div>
    <leaguenamedetail :data="getLiveScoreDetail"></leaguenamedetail>
    <scoretime :data="getLiveScoreDetail"></scoretime>
    <timestats>
      <span slot="timestats">stats</span>
    </timestats>
    <statsdetail></statsdetail>
    <timestats>
      <span slot="timestats">timeline</span>
    </timestats>
    <timeline></timeline>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import leaguenamedetail from './leagueNameDetail'
import scoretime from './scoreTime'
import timestats from './timestats'
import statsdetail from './statsDetail'
import timeline from './timelineDetail'
export default {
  components: {
    leaguenamedetail,
    scoretime,
    timestats,
    statsdetail,
    timeline,
  },
  computed: {
    ...mapGetters('detailpredictions', ['getIsHideDetail', 'getIsHideHeader']),
    ...mapGetters('datalivescore', ['getLiveScoreDetail']),
  },
  methods: {
    ...mapActions('detailpredictions', ['hideDetail']),
  },
}
</script>
<style lang="scss" scoped>
.detail-predictions {
  width: 100%;
  max-width: 512px;
  background-color: #fff;
  height: 100%;
  float: right;
  visibility: visible;
  transition: width 0.2s, visibility 0.2s;
}
.header-detail {
  height: 50px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  color: #444;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
}
.hide-detail {
  visibility: hidden;
  width: 0;
}
.hide-header {
  display: none;
}
</style>



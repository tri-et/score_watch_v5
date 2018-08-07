<template>
  <div class="detailBt" :style="bg">
    <div>
      <img :src="imgUrl" alt="" width="24" height="24">
    </div>
    <div>
      <span>{{getDataDetail.pick_hdp=="H"?getDataDetail.team_home:getDataDetail.team_away}}</span>
    </div>
    <div>
      <span>&nbsp;{{`[${getDataDetail.score_home}:${getDataDetail.score_away}] ${getDataDetail.detail==undefined?getDataDetail.sys_hdp:getDataDetail.detail.sys_hdp} @`}}</span>
      <span>&nbsp;{{getDataDetail.pick_hdp=='H'?(getDataDetail.detail==undefined?
        getDataDetail.sys_odds_home:getDataDetail.detail.sys_odds_home):(getDataDetail.detail==undefined?
        getDataDetail.sys_odds_away:getDataDetail.detail.sys_odds_away)}}</span>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import pred_gold from '@/assets/imgs/pred_gold.svg'
export default {
  data() {
    return {
      bg: {
        backgroundColor: '#FEE1E1',
      },
      imgUrl: pred_gold,
    }
  },
  computed: {
    ...mapGetters('detailpredictions', ['getCurrentType', 'getDataDetail']),
  },
  watch: {
    getCurrentType(newValue) {
      switch (newValue.trim()) {
        case 'expired':
          this.bg.backgroundColor = '#f0f0f0'
          break
        case 'pregame':
          this.bg.backgroundColor = '#C8E6F7'
          break
        default:
          this.bg.backgroundColor = '#FEE1E1'
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.detailBt {
  border-radius: 5px;
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.17);
  height: 54px;
  position: absolute;
  left: 10px;
  right: 10px;
  top: 188px;
  display: flex;
  align-items: center;
  div:first-child {
    margin-top: 5px;
    padding: 0 10px;
  }
  div:nth-child(2) {
    font-weight: bold;
  }
}
</style>



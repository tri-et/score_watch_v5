<template>
  <div class="header-odds-ou" :style="bg">
    <div class="oddsou">
      <slot name="oddsou" />
    </div>
    <div>
      <slot name="oddsou_1" />
    </div>
    <div>
      <slot name="oddsou_2" />
    </div>
    <div>
      <slot name="oddsou_3" />
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      bg: {
        backgroundColor: '#ff7c7c',
      },
    }
  },
  computed: {
    ...mapGetters('detailpredictions', ['getCurrentType']),
  },
  watch: {
    getCurrentType(newValue) {
      switch (newValue.trim()) {
        case 'expired':
          this.bg.backgroundColor = '#767676'
          break
        case 'pregame':
          this.bg.backgroundColor = '#5BB6E7'
          break
        default:
          this.bg.backgroundColor = '#ff7c7c'
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.header-odds-ou {
  height: 55px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: #fff;
  div:first-child{
    font-size: 16px;
    font-weight: 700;
    width: 20%;
  }
  div:not(:first-child){
    font-size: 12px;
    flex: 1;
    text-align: center;
  }
}
</style>



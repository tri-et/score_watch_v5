<template>
  <div class="timeline-detail">
    <ul>
      <li class="row-timeline" v-for="(item,index) in getTimelineDetail" :key="index">
        <div class="icon">
          <img :src="iconls[dataHomeAway(item,'home').icon]" />
        </div>
        <div>
          <span>{{dataHomeAway(item,'home').player}}</span>
        </div>
        <div>
          <span>{{item[5]+'\''}}</span>
        </div>
        <div>
          <span>{{dataHomeAway(item,'away').player}}</span>
        </div>
        <div class="icon">
          <img :src="iconls[dataHomeAway(item,'away').icon]" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import _1 from '@/assets/imgs/iconl/1.gif'
import _2 from '@/assets/imgs/iconl/2.gif'
import _3 from '@/assets/imgs/iconl/3.gif'
import _4 from '@/assets/imgs/iconl/4.gif'
import _5 from '@/assets/imgs/iconl/5.gif'
import _6 from '@/assets/imgs/iconl/6.gif'
import _7 from '@/assets/imgs/iconl/7.gif'
import _8 from '@/assets/imgs/iconl/8.gif'
import _9 from '@/assets/imgs/iconl/9.gif'
import _10 from '@/assets/imgs/iconl/10.gif'
import _11 from '@/assets/imgs/iconl/11.gif'
export default {
  data() {
    return {
      iconls: {
        __1: _1,
        __2: _2,
        __3: _3,
        __4: _4,
        __5: _5,
        __6: _6,
        __7: _7,
        __8: _8,
        __9: _9,
        __10: _10,
        __11: _11,
      },
    }
  },
  computed: {
    ...mapGetters('datalivescore', ['getTimelineDetail']),
  },
  methods: {
    dataHomeAway(data, homeAway) {
      var objectData = {}
      if (homeAway == 'home') {
        if (data[3] == '1') {
          objectData = {
            player: data[6],
            icon: '__' + data[4],
          }
        }
      } else {
        if (data[3] == '0') {
          objectData = {
            player: data[6],
            icon: '__' + data[4],
          }
        }
      }
      return objectData
    },
  },
}
</script>
<style lang="scss" scoped>
.timeline-detail {
  padding: 0 15px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.row-timeline {
  display: flex;
  padding: 8px 0px;
  font-size: 15px;
  div:nth-child(even) {
    flex: 1;
  }
  div:nth-child(2) {
    text-align: right;
  }
  div:nth-child(3) {
    width: 20%;
    color: #c5c5c5;
    font-size: 15px;
    text-align: center;
  }
}
.icon {
  display: flex;
  align-items: center;
  img {
    width: 10px;
  }
}
</style>


<template>
  <div class="livescore">
    <!-- {{this.$root.browserWidth}} -->
    <div class="left-col" @click="hideDetail(false)">
      <calendarlive></calendarlive>
      <div class="livescore-container">
        <div class="inplay">live score</div>
        <div class="pregame">
          <ul>
            <li>2</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>10</li>
          </ul>
        </div>
        <div class="footer">All Right Reserved. © 2018. Powered by In-Play</div>
      </div>
    </div>
    <div class="right-col" :class="{'hide-right-col':getIsHideDetailLiveScore}">
      <detailprediction></detailprediction>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import detailprediction from "./details/detaillivescore";
import calendarlive from "./calendarLiveScore";
export default {
  computed: {
    ...mapGetters("detaillivescore", ["getIsHideDetailLiveScore"])
  },
  methods: {
    ...mapActions("detaillivescore", ["hideDetailLiveScore"])
  },
  components: {
    detailprediction,
    calendarlive
  }
};
</script>
<style lang="scss" scoped>
.livescore {
  background-color: #444;
  top: 64px;
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
}
.calendar {
  height: 64px;
  background-color: #212121;
}
.left-col {
  position: relative;
  height: 100%;
  background-color: #333;
  min-width: 352px;
  flex: 1;
}
.livescore-container {
  display: grid;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  justify-items: center;
  overflow-x: hidden;
  max-height: calc(100% - 128px);
  margin: 0 5px;
  padding: 0 3px;
  grid-template-areas:
    "header header header header header header"
    "main main main main main main"
    "footer footer footer footer footer footer";
}
.right-col {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  transition: width 1s;
}
.hide-right-col {
  width: 0;
}
.inplay {
  grid-area: header;
  background-color: red;
  max-width: 360px;
  min-width: 200px;
  width: 100%;
  height: 500px;
  margin-top: 15px;
}
.pregame {
  grid-area: main;
  background-color: bisque;
  max-width: 360px;
  min-width: 200px;
  width: 100%;
  margin-top: 15px;
}
.footer {
  grid-area: footer;
  background-color: #333;
  height: 64px;
  width: 100%;
  border-top: 1px solid rgba(225, 225, 225, 0.1);
  margin-top: 15px;
  color: #fff;
  opacity: 0.34;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
}
@media (min-width: 320px) {
  .right-col {
    position: fixed;
    z-index: 3;
    top: 0;
    right: 0;
  }
}
@media (min-width: 672px) {
  .right-col {
    width: 100%;
    position: unset;
    z-index: 0;
    max-width: 512px;
    min-width: 320px;
  }
}
@media (min-width: 1248px) {
  .livescore-container {
    display: grid;
    grid-template-areas:
      "main main main right right right"
      "footer footer footer footer footer footer";
  }
  .inplay {
    grid-area: main;
  }
  .pregame {
    grid-area: right;
  }
}
</style>


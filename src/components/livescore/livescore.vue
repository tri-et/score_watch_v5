<template>
  <div class="livescores">
    <!-- {{this.$root.browserWidth}} -->
    <div class="left-col">
      <calendarlivescore></calendarlivescore>
      <div class="livescores-container">
        <div class="inplay">
         <leaguelivescore></leaguelivescore>
        </div>
        <div class="pregame">
          <leaguelivescore></leaguelivescore>
        </div>
        <div class="footer">All Right Reserved. © 2018. Powered by In-Play</div>
      </div>
    </div>
    <div class="right-col">
      <detaillivescore></detaillivescore>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import _ from 'lodash'
import detaillivescore from './details/detaillivescore'
import calendarlivescore from './calendarLivescore'
import leaguelivescore from './leagueNameLive'
export default {
  components: {
    calendarlivescore,
    detaillivescore,
    leaguelivescore,
  },
}
</script>
<style lang="scss" scoped>
.livescores {
  background-color: #444;
  top: 64px;
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
}
.left-col {
  position: relative;
  height: 100%;
  background-color: #333;
  min-width: 352px;
  flex: 1;
}
.livescores-container {
  display: block;
  -webkit-overflow-scrolling: touch;
  justify-items: center;
  overflow-x: hidden;
  max-height: calc(100% - 128px);
  margin: 0 5px;
  padding: 15px 3px 0px 3px;
  grid-template-areas:
    'header header header header header header'
    'main main main main main main'
    'footer footer footer footer footer footer';
}
.livescores-container::after {
  content: '';
  clear: both;
  display: table;
}
.right-col {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  transition: width 0.5s;
}
.hide-right-col {
  width: 0;
}
.inplay {
  grid-area: header;
  max-width: 360px;
  min-width: 200px;
  width: 100%;
  margin: auto;
  div[class='match_container last'] {
    padding-bottom: 10px !important;
  }
}
.pregame {
  grid-area: main;
  margin: auto;
  max-width: 360px;
  min-width: 200px;
  width: 100%;
  div[class='match_container last'] {
    padding-bottom: 10px !important;
  }
}
.match_container {
  background-color: #f0f0f0;
  padding: 0 8px 8px 8px;
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
.hide_no_matches {
  display: none !important;
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
  .livescores-container {
    display: grid;
    grid-template-areas:
      'main main main right right right'
      'footer footer footer footer footer footer';
    grid-column-gap: 5px;
  }
  .inplay {
    grid-area: main;
    margin: 0;
  }
  .pregame {
    grid-area: right;
    margin: 0;
  }
}
</style>


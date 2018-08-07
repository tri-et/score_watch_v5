<template>
  <div class="menu-header">
    <header>
      <nav>
        <ul>
          <li>
            <div class="logo">
              <img src="@/assets/imgs/logo.jpg" width="48" height="48">
            </div>
          </li>
          <router-link to="/" tag="li" :class="{'hideMenuMobile':getIsMobile}">
            <div class="item-menu" @click="menuSelect('predictions')">
              <div>
                <span>predictions</span>
              </div>
              <div class="underline" :class="{'activeUnderline':getActiveMenu=='predictions'}"></div>
            </div>
          </router-link>
          <router-link to="/livescore" tag="li" :class="{'hideMenuMobile':getIsMobile}">
            <div class="item-menu" @click="menuSelect('live score')">
              <div>
                <span>live score</span>
              </div>
              <div class="underline" :class="{'activeUnderline':getActiveMenu=='live score'}"></div>
            </div>
          </router-link>
          <li :class="{'hideMenuMobile':!getIsMobile}">
            <div class="group-menu">
              <router-link to="/" tag="li" :class="{'active-menu-mobile':getActiveMenu=='predictions'}">
                <div class="item-menu" @click="menuSelect('predictions')">
                  <div>
                    <span>prediction</span>
                  </div>
                </div>
              </router-link>
              <router-link to="/livescore" tag="li" :class="{'active-menu-mobile':getActiveMenu=='live score'}">
                <div class="item-menu" @click="menuSelect('live score')">
                  <div>
                    <span>live score</span>
                  </div>
                </div>
              </router-link>
            </div>
          </li>
          <li>
            <div class="btSearch" @click="closeOenSearch()">
              <i class="material-icons">{{getIsSearching?'youtube_searched_for':'search'}}</i>
            </div>
          </li>
        </ul>
      </nav>
    </header>
    <boxsearchdesktop></boxsearchdesktop>
    <boxsearchmobile></boxsearchmobile>
    <boxleaguemobile></boxleaguemobile>
    <boxleaguedesktop></boxleaguedesktop>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import boxsearchdesktop from '@/components/boxsearch/boxSearchDesktop'
import boxsearchmobile from '@/components/boxsearch/boxSearchMobile'
import boxleaguemobile from '@/components/boxsearch/boxLeagueMobile'
import boxleaguedesktop from '@/components/boxsearch/boxLeagueDeskTop'
export default {
  components: {
    boxsearchdesktop,
    boxsearchmobile,
    boxleaguemobile,
    boxleaguedesktop,
  },
  computed: {
    ...mapGetters('menuheader', ['getActiveMenu', 'getIsMobile', 'getIsSearching']),
  },
  methods: {
    ...mapActions('menuheader', ['menuSelect', 'checkIsMobile', 'clickSearch']),
    ...mapActions('boxsearch', ['closeOpenLeagueMobile', 'closeOpenLeagueDeskTop', 'searchTeamName']),
    ...mapActions('detailpredictions', ['hideDetail', 'hideHeader']),
    closeOenSearch() {
      this.searchTeamName('')
      this.closeOpenLeagueDeskTop(false)
      this.clickSearch(!this.getIsSearching)
    },
  },
  mounted() {
    var self = this
    this.$root.$on('browserResize', function(data) {
      if (data >= 672) {
        self.hideDetail(false)
        self.hideHeader(true)
      } else {
        self.hideHeader(false)
      }

      if (data >= 843) {
        self.checkIsMobile(false)
        self.closeOpenLeagueMobile(false)
      } else {
        self.checkIsMobile(true)
        self.closeOpenLeagueDeskTop(false)
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.menu-header {
  width: 100%;
  background-color: #444;
  font-size: 16px;
  max-width: 1280px;
  min-width: 320px;
  z-index: 2;
  position: absolute;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    li {
      height: 64px;
      display: flex;
      align-items: center;
    }
    li:nth-child(4) {
      flex: 1;
      justify-content: center;
    }
    li:last-child {
      box-shadow: -1px 0px 0px 0px hsla(0, 0%, 100%, 0.1);
    }
  }
}
.item-menu {
  color: #a4a4a4;
  width: fit-content;
  text-transform: uppercase;
  display: grid;
  justify-items: center;
  cursor: pointer;
  margin: 0 10px;
  padding: 20px 0;
}
.item-menu:hover .underline {
  visibility: visible !important;
}
.underline {
  width: 72px;
  height: 4px;
  background: #fff;
  border-radius: 50px;
  margin-top: 2px;
  visibility: hidden;
}
.activeUnderline {
  visibility: visible !important;
}
.logo {
  height: 48px;
  width: 48px;
  border-radius: 8px;
  background: #000;
  margin-left: 8px;
  img {
    border-radius: 8px;
  }
}
.btSearch {
  color: #fff;
  padding: 0 20px;
  cursor: pointer;
  i {
    padding-top: 7px;
  }
}
.hideMenuMobile {
  display: none !important;
}
.group-menu {
  display: flex;
  border: 2px solid #fff;
  li {
    color: #a4a4a4;
    height: 45px !important;
  }
  li:hover {
    color: #4d4d4d !important;
    background-color: #fff;
  }
}
.active-menu-mobile {
  color: #4d4d4d !important;
  background-color: #fff;
}
.zindex {
  z-index: -1 !important;
}
@media (min-width: 843px) {
  .menu-header {
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    ul {
      li:nth-child(3) {
        flex: 1;
      }
    }
  }
  .item-menu {
    color: #fff;
  }
}
// @media (min-width: 672px) {
//   .menu-header {
//     z-index: 1;
//   }
// }
// @media (min-width: 320px) {
//   .menu-header {
//     z-index: 0;
//   }
// }
</style>



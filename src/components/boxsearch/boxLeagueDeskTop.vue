<template>
    <div class="box-league-desktop" :class="{'show-league-desktop':getIsOpenLeagueDeskTop}">
        <div class="header-league-desk">
            <input type="text">
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("boxsearch", ["getIsOpenLeagueDeskTop"]),
    ...mapGetters("menuheader", ["getIsSearching"])
  }
};
</script>
<style lang="scss" scoped>
.box-league-desktop {
  position: absolute;
  top: 77px;
  width: 350px;
  background-color: #212121;
  height: 400px;
  right: 140px;
  border-radius: 8px;
  transform: scale(0);
  transition: all 0.5s ease-in-out;
  transform-origin: top center;
  visibility: hidden;
  //   transition: width 0.5s, visibility 0.5s;
}
.header-league-desk {
  background-color: #444;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  input {
    border-radius: 10px;
    border: none;
    height: 25px;
    outline: none;
    background-color: #575757;
    padding-left: 10px;
    width: 100%;
    color: #fff;
  }
}
.show-league-desktop {
  visibility: visible;
  transform: scale(1) !important;
}
</style>



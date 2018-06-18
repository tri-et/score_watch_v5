<template>
    <div class="predictions" @click="test()">{{this.$root.browserWidth}}</div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.predictions {
  background-color: #444;
  z-index: 0;
  top: 64px;
  position: absolute;
  width: 100%;
}
</style>


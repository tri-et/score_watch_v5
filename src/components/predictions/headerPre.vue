<template>
    <div class="header-pre" :style="bg">
        <slot/>
    </div>
</template>
<script>
export default {
  props: {
    type: [String]
  },
  data() {
    return {
      bg: {
        backgroundColor: "#ff7c7c"
      }
    };
  },
  created() {
    switch (this.type) {
      case "expired":
        this.bg.backgroundColor = "#767676";
        break;
      case "pregame":
        this.bg.backgroundColor = "#5bb6e7";
        break;
    }
  }
};
</script>
<style lang="scss" scoped>
.header-pre {
  width: 100%;
  min-width: 320px;
  max-width: 360px;
  height: 48px;
  text-transform: uppercase;
  font-size: 16px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.54);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
</style>


<template>
<div class="timestats">
  <div><span>Home</span></div>
  <div><slot name="timestats"/></div>
  <div><span>Away</span></div>
</div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.timestats{
  height: 55px;
  background-color: #444;
  text-transform: uppercase;
  display: flex;
  color:#fff;
  align-items: center;
  padding: 0 15px;
  div:nth-child(2){
    flex: 1;
    text-align: center;
  }
  div:first-child,div:last-child{
    font-size: 12px;
  }
}
</style>



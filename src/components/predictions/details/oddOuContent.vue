<template>
  <div class="odd-ou-content">
    <div class="m8">
      <div>
        <span>M8</span>
      </div>
      <div>
        <slot name="m8-1"/>
      </div>
      <div>
        <slot name="m8-2"/>
      </div>
      <div>
        <slot name="m8-3"/>
      </div>
    </div>
    <div class="sbo">
      <div>
        <span>SBO</span>
      </div>
      <div>
        <slot name="sbo-1"/>
      </div>
      <div>
        <slot name="sbo-2"/>
      </div>
      <div>
        <slot name="sbo-3"/>
      </div>
    </div>
    <div class="ibc">
      <div>
        <span>IBC</span>
      </div>
      <div>
       <slot name="ibc-1"/>
      </div>
      <div>
        <slot name="ibc-2"/>
      </div>
      <div>
        <slot name="ibc-3"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.odd-ou-content {
  background-color: #fff;
  display: grid;
  padding-left: 10px;
}
.m8,
.sbo,
.ibc {
  display: flex;
  padding: 15px 0;
  div:first-child {
    width: 20%;
    font-weight: bold;
  }
  div:nth-child(2) {
    opacity: 0.34;
  }
  div:not(:first-child) {
    font-size: 16px;
    flex: 1;
    text-align: center;
  }
}
</style>



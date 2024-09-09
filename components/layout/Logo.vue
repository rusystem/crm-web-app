<template>
  <div class="logo">
    <el-text class="logo__text" tag="b" size="large">
      Pomogator
      <sup class="logo__special">v0.0.2.0</sup>
    </el-text>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(2rem - 2px);
  text-transform: uppercase;
  // background-color: #ff009b;
  // margin: .5rem;
  // border-radius: 4px;

  &__text {
    position: relative;
    color: var(--el-text-color-regular);
    font-size: 1.25rem;
  }

  &__special {
    position: absolute;
    right: -.25rem;
    bottom: -.25rem;
    // transform: rotate3d(1, 1, 1, 344deg);
    color: #0800ff;
    font-family: "Bebas Neue", sans-serif;
    font-size: .5rem;
  }

  &__route {
    position: absolute;
    left: 10%;
    top: -.25rem;
    font-size: .5rem;
    white-space: nowrap;
    max-width: 8rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    line-height: 1;
  }
}
</style>
<template>
  <div class="logo">
    <el-text class="logo__text" tag="b" size="large">
      Pomogator
      <sup class="logo__special">Pink Edition v0.0.1.0</sup>
      <sub class="logo__route">{{ route.path }}</sub>
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
  height: 80px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  // background-color: #ff009b;
  // margin: .5rem;
  // border-radius: 4px;
  border-bottom: 1px solid rgb(239, 239, 239);

  &__text {
    position: relative;
    color: #000;
    font-size: 22px;
  }

  &__special {
    position: absolute;
    right: -.25rem;
    bottom: -.25rem;
    transform: rotate3d(1, 1, 1, 344deg);
    color: #ff009b;
    font-family: "Bebas Neue", sans-serif;
    font-size: .5rem;
  }

  &__route {
    position: absolute;
    left: 25%;
    top: -.25rem;
    font-size: .5rem;
  }
}
</style>
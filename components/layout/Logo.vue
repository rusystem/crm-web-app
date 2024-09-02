<template>
  <div class="logo">
    <el-text class="logo__text" tag="b" size="large">
      Pomogator
      <sup class="logo__special">Pink Edition</sup>
    </el-text>
    {{ route.path }}
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
  height: 60px;
  margin-bottom: 1rem;
  font-family: "Bebas Neue", sans-serif;

  &__text {
    position: relative;
    color: #000;
    font-size: 22px;
  }

  &__special {
    position: absolute;
    right: -1rem;
    bottom: -1rem;
    transform: rotate3d(1, 1, 1, 344deg);
    color: #f871c3;
    font-family: "Bebas Neue", sans-serif;
  }
}
</style>
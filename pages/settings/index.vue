<template>
  <div class="page">
    <div class="header">
      <el-text tag="h1" size="large">Настройки</el-text>
    </div>

    <div class="content">
      settings
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__description {
    max-width: 50%;
    color: #8a8a8a;
  }

  .el-text {
    align-self: start;
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button {
  &__content {
    display: flex;
    align-items: center;
    gap: .25rem;
  }
}
</style>
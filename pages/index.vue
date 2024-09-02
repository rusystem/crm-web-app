<template>
  <div class="page">
    <div class="header">
      <el-text tag="h1" size="large">Личный кабинет</el-text>
    
      <el-text tag="p">
        Здесь хранится Вся информация по Поставщикам компании. <br />
        Вы можете создавать карточки поставщиков, хранить данные по обороту средств с ними.  
      </el-text>
    </div>
  </div>
</template>

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

  .el-text {
    align-self: start;
  }
}

.carousel {
  &__item {
    background-color: #ccc;
  }
}
</style>
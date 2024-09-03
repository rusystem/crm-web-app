<template>
  <div class="page">
    <div class="header">
      <el-text tag="h1" size="large">Поставщики 💅</el-text>
    
      <el-text tag="p">
        Здесь хранится Вся информация по Поставщикам компании. <br />
        Вы можете создавать карточки поставщиков, хранить данные по обороту средств с ними.  
      </el-text>

      <div class="actions">
        <el-button class="button">
          <div class="button__content">
            <Icon name="solar:filter-bold" />
            Фильтры
          </div>
        </el-button>

        <el-button>Добавить поставщика</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="warehouseSuppliers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="Наименование" width="180" />
        <el-table-column prop="productTypes" label="Типы товаров" width="140" />
        <el-table-column prop="amount" label="Сумма закупа без НДС" width="200" />
        <el-table-column prop="balance" label="Баланс" />
        <el-table-column prop="contract" label="Договор" />
        <el-table-column prop="status" label="Статус">
          <template #default="{ row }">
            <div :class="['status', `status--${row.status}`]">
              {{ row.status === 'active' ? 'Активен' : 'Не активен' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="actions" label="" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { warehouseSuppliers } from '~/mockups';
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

.status {
  display: inline;
  background-color: #ccc;
  padding: .25rem .5rem;
  border-radius: 12px;
  font-size: .5rem;
  text-transform: uppercase;
  font-weight: 600;

  &--active {
    background-color: #85ce61;
    color: #fff;
  }

  &--not-active {
    background-color: #f78989;
    color: #fff;
  }
}
</style>
<template>
  <div class="page">
    <div class="header">
      <el-text tag="h1" size="large">Пользователи</el-text>
    
      <el-text class="header__description" tag="p" size="small">
        На этой странице представлена вся информация о существующих пользователях. Вы можете легко управлять пользователями и отслеживать их действия. Удобный интерфейс позволяет эффективно администрировать всех пользователей.
      </el-text>

      <div class="actions">
        <!-- <el-button class="button">
          <div class="button__content">
            <Icon name="solar:filter-bold" />
            Фильтры
          </div>
        </el-button> -->

        <el-button @click="router.push(`${router.currentRoute.value.path}/create`)">Добавить</el-button>
      </div>
    </div>

    <div class="content">
      <!-- <el-table :data="items" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="Название" />
        <el-table-column prop="address" label="Адрес"  />
        <el-table-column prop="country" label="Страна" />
        <el-table-column prop="max_capacity" label="Текущая занятость" width="180" />
        <el-table-column prop="phone" label="Телефон" />
        <el-table-column prop="phone" label="Телефон" />
        <el-table-column prop="responsible_person" label="Ответственное лицо" width="180" />
        <el-table-column prop="actions" label="" />
      </el-table> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = reactive([]);
const router = useRouter();

useHead({
  title: 'Пользователи — Pomogator',
});

const getItems = async () => {
  try {
    const response = await $apiClient(`http://91.243.71.100:8080/api/web-api-gateway/v1/warehouse`);

    if (response) {
      items.push(response);
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await getItems();
});
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
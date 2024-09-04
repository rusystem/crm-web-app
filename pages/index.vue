<template>
  <div class="page">
    <div class="header">
      <el-text tag="h1" size="large">Личный кабинет</el-text>
    
      <el-text tag="p">
        Добро пожаловать, Admin!
      </el-text>
    </div>

    <div class="content">
      <el-text tag="h2" size="medium">Процесс разработки</el-text>

      <div class="cards">
        <el-card v-for="(card, index) in cards" :key="index" shadow="never">
          <el-text class="card__title" tag="h2" size="small">
            {{ card.name }}
          </el-text>

          <el-text class="card__description" tag="p" size="small">
            {{ card.description }}
          </el-text>

          <el-progress
            :percentage="(100 / card.tasks.length * card.tasks.filter((task) => task.done).length).toFixed()"
          />

          <ul class="card-list">
            <li
              v-for="(task, taskIndex) in card.tasks"
              :key="taskIndex"
              :class="['card-list__item', { 'card-list__item--done': task.done }]"
            >
              {{ task.name }}
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = ref([
  {
    name: 'Дизайн и mock-контент',
    description: 'Дизайн интерфейса, создание привлекательного внешнего вида на старте проекта.',
    tasks: [
      { name: 'Библиотека компонентов и UI Kit', done: true },
      { name: 'Стилизаяция основных элементов интерфейса', done: true },
      { name: 'Дизайн страницы с таблицей и фильтрами', done: false },
      { name: 'Дизайн страницы создания/редактирования', done: false },
      { name: 'Продумана мобильная версия интерфейса', done: true },
      { name: 'Реализованы черновики всех страниц', done: false },
    ],
  },
  {
    name: 'Функционал',
    description: 'Основной функционал для MVP.',
    tasks: [
      { name: 'Авторизация', done: true },
      { name: 'Регистрация', done: false },
      { name: 'Восстановление/смена пароля', done: false },
      { name: 'Редактирование аккаунта', done: false },
      { name: 'Создание и редактирование пользователей', done: false },
      { name: '20% таблиц и форм', done: false },
      { name: '40% таблиц и форм', done: false },
      { name: '60% таблиц и форм', done: false },
      { name: '80% таблиц и форм', done: false },
      { name: '100% таблиц и форм', done: false },
      { name: 'Разбиение разделов на доступы', done: false },
    ],
  },
  {
    name: 'Интеграция',
    description: 'Взаимодействие с сервером.',
    tasks: [
      { name: 'Базовая интеграция', done: true },
      { name: 'Форма взаимодействия (пагинация, фильтры)', done: false },
    ],
  },
]);
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

.carousel {
  &__item {
    background-color: #ccc;
  }
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: .5rem;
  margin: .5rem 0
}

@media screen and (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

.card {
  &__title {
    margin-bottom: .25rem;
  }

  &__description {
    margin-bottom: .5rem;
  }

  &-list {
    padding-left: 1rem;
    margin: .5rem 0 0;

    &__item {
      font-size: .75rem;

      &--done {
        color: var(--el-color-success-dark-2);
      }
    }
  }
}
</style>
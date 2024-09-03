<template>
  <main class="main">
    <aside v-show="isOpen" class="aside">
      <layout-logo />

      <div class="navigation navigation__first">
        <template v-for="(item, index) in navigation" :key="index">
          <nuxt-link
            v-if="!item.children || !item.children.length"
            :to="item.to"
            :class="[
              'navigation__item',
              { 'navigation__item--active': route.path === item.to },
              { 'navigation__item--disabled' : item.disabled }
            ]"
          >
            <Icon v-if="item.icon" class="navigation__icon" :name="item.icon" />
            {{ item.name }}
          </nuxt-link>

          <div v-else class="navigation__section">
            <div class="navigation__item navigation__item--section">
              <Icon v-if="item.icon" class="navigation__icon" :name="item.icon" />
              {{ item.name }}
            </div>

            <nuxt-link
              v-for="(childrenItem, childrenIndex) in item.children"
              :key="childrenIndex"
              :class="[
                'navigation__item',
                'navigation__item--children',
                { 'navigation__item--active': route.path === childrenItem.to },
                { 'navigation__item--disabled' : childrenItem.disabled }
              ]"
              :to="!childrenItem.disabled ? childrenItem.to : null"
            >
              <Icon v-if="childrenItem.icon" class="navigation__icon" :name="childrenItem.icon" />
              {{ childrenItem.name }}
            </nuxt-link>
          </div>
        </template>
      </div>

      <!-- <div class="navigation navigation__second">
        <el-button @click="tourOpen = true">
          Tour
        </el-button>

        <el-tour v-model="tourOpen">
          <el-tour-step :target="ref1?.$el" title="Управление сайдбаром">
            <div>Сворачивайте и разворачивайте как хотите.</div>
          </el-tour-step>

          <el-tour-step :target="ref2?.$el" title="Можно выйти из кабинета">
            <div>Если вдруг вы хотите сменить аккаунт или еще шо.</div>
          </el-tour-step>
        </el-tour>
      </div> -->
    </aside>

    <div :class="['page', { 'page--short': isOpen }]">
      <header class="header">
        <div class="header__item">
          <el-button ref="ref1" @click="isOpen = !isOpen">
            <Icon name="solar:hamburger-menu-linear" />
          </el-button>
        </div>

        <div class="header__item">
          <el-button ref="ref2" @click="logout">Выйти</el-button>
        </div>
      </header>
      
      <div class="content">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import type { ButtonInstance } from 'element-plus'

const { logout } = useAuth();
const route = useRoute();

const isOpen = ref(true);

const navigation = reactive([
  {
    name: 'Главная',
    to: '/',
    icon: 'solar:home-2-bold',
  },
  {
    name: 'Склад',
    children: [
      {
        name: 'Поставщики',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/warehouse/suppliers',
      },
      {
        name: 'На приходе',
        to: '/warehouse/in-the-parish',
        icon: 'solar:round-alt-arrow-right-bold',
        disabled: true,
      },
      {
        name: 'Для закупа',
        to: '/warehouse/for-the-purchase',
        icon: 'solar:money-bag-bold',
        disabled: true,
      },
      {
        name: 'Производство',
        to: '/warehouse/production',
        icon: 'solar:settings-minimalistic-bold',
        disabled: true,
      },
    ],
  },
  {
    name: 'Менеджера',
    children: [
      {
        name: 'Кирилл',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/kirill',
        disabled: true,
      },
      {
        name: 'Даша',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/dasha',
        disabled: true,
      },
      {
        name: 'Дима',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/dima',
        disabled: true,
      },
    ],
  },
  {
    name: 'Производство',
    children: [
      {
        name: 'Планы',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/plans',
        disabled: true,
      },
    ],
  },
  {
    name: 'Отчеты',
    children: [
      {
        name: 'По производству',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/reports',
        disabled: true,
      },
      {
        name: 'Генератор отчетов',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/reports/generaotr',
        disabled: true,
      },
    ],
  },
  {
    name: 'Конфигурация',
    children: [
      {
        name: 'Настройки',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/settings',
        disabled: true,
      },
      {
        name: 'Редактировать аккаунт',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/settings/account',
        disabled: true,
      },
    ],
  },
]);

const tourOpen = ref(false);
const ref1 = ref<ButtonInstance>();
const ref2 = ref<ButtonInstance>();
</script>

<style lang="scss" scoped>
.page {
  &--short {
    margin-left: calc(240px + .5rem);
  }
}

.content {
  margin: 1rem;
}

.header {
  position: sticky;
  top: .5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  margin: 0 1rem 2rem;

  &__item {
    .el-button {
      // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
  }

  &__inner {
    width: 100%;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.aside {
  position: fixed;
  left: 0;
  width: 240px;
  height: 100%;
  z-index: 5;
  top: 0;
  // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: .5rem;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid rgb(239, 239, 239);
  max-height: calc(100vh - 1rem);
  display: flex;
  flex-direction: column;
  // border-left: none;
  
  // box-shadow: rgba(240, 46, 170, 0.4) -2px -2px, rgba(240, 46, 170, 0.3) -4px -4px, rgba(240, 46, 170, 0.2) -6px -6px, rgba(240, 46, 170, 0.1) -8px -8px, rgba(240, 46, 170, 0.05) -10px -10px;
  // box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;box-shadow: rgba(0, 0, 0, 0.4) -2px -2px, rgba(0, 0, 0, 0.3) -4px -4px, rgba(0, 0, 0, 0.2) -6px -6px, rgba(0, 0, 0, 0.1) -8px -8px, rgba(0, 0, 0, 0.05) -10px -10px;

}

.navigation {
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &__section {
    display: flex;
    flex-direction: column;
  }

  &__item {
    padding: .5rem 1rem;
    text-decoration: none;
    font-size: .75rem;
    color: #000000;
    border-radius: 4px;
    margin: 0 .5rem;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    gap: .25rem;

    &--section {
      font-size: .75rem;
      font-weight: 500;
      color: #838383;
      margin-top: 1rem;
    }

    &--children {
      // padding-left: 2rem;
    }

    &:hover:not(.navigation__item--section):not(.navigation__item--disabled),
    &.navigation__item--active {
      background-color: #f5f7fa;
    }

    &.navigation__item--active {
      font-weight: 600;
    }

    &--disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
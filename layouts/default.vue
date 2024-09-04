<template>
  <main :class="['main', { 'main--mobile': isMobileRef }]">
    <aside :class="['aside', { 'aside--open': isOpen }]">
      <nuxt-link class="home"to="/" @click="isMobileRef ? isOpen = false : null">
        <layout-logo />
      </nuxt-link>

      <el-button ref="ref1" class="aside-close" @click="isOpen = !isOpen">
        <Icon v-if="isOpen" class="aside-close__icon" name="solar:close-circle-linear" />
        <Icon v-else class="aside-close__icon" name="solar:hamburger-menu-linear" />
      </el-button>

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
            @click="isMobileRef ? isOpen = false : null"
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
              @click="isMobileRef ? isOpen = false : null"
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

    <div v-if="isMobileRef && isOpen" class="overlay" @click="isOpen = false"></div>

    <div :class="['page', { 'page--short': isOpen }]">
      <header class="header">
        <!-- <div class="header-item">
          <el-button ref="ref1" @click="isOpen = !isOpen">
            <Icon name="solar:hamburger-menu-linear" />
          </el-button>
        </div> -->
        <div></div>

        <div class="header-item">
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <el-button class="header-button">
              <div class="header-button__content">
                <el-avatar :size="20">A</el-avatar> Admin
              </div>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">Выйти</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
import type { ButtonInstance } from 'element-plus';

const { isMobile } = useDevice();

const isMobileRef = ref(isMobile);

const { logout } = useAuth();
const route = useRoute();

const isOpen = ref(true);

const updateIsMobile = () => {
  isMobileRef.value = window.matchMedia('(max-width: 768px)').matches;

  if (isMobileRef.value) {
    isOpen.value = false;
  }
};

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

const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'logout':
      logout();
      break;
  }
};

watch(isOpen, (newValue) => {
  console.log(isMobileRef)
  if (isMobileRef.value) {
    document.body.style.overflow = newValue ? 'hidden' : 'auto';
  }
});

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>

<style lang="scss" scoped>
.main {
  position: relative;

  &--mobile {
    .page {
      &--short {
        margin-left: 0;
      }
    }

    .aside {
      width: 100%;
      max-width: 280px;
      left: -280px;
      // transition: .25s ease;

      // &-close {
      //   display: block;
      // }

      &--open {
        left: 0;
      }
    }
  }
}

.page {
  transition: .25s ease;
  
  &--short {
    margin-left: calc(240px + .5rem);
  }
}

.content {
  margin: 1rem;
}

.home {
  text-decoration: none;
}

.header {
  position: sticky;
  top: .5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  margin: 0 1rem 2rem;

  &-button {
    &__content {
      display: flex;
      align-items: center;
      gap: .25rem;
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
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  max-height: calc(100vh - 1rem);
  display: flex;
  flex-direction: column;
  z-index: 999;
  transition: left .25s ease;
  left: -240px;

  &-close {
    position: absolute;
    top: 0;
    left: calc(100% + .5rem);
    cursor: pointer;
  }

  &--open {
    // left: 0;
    left: 0;
  }
}

.overlay {
  background-color: #000000;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 998;
  opacity: .25;
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
    color: var(--el-text-color-regular);
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
      background-color: var(--el-fill-color);
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
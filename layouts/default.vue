<template>
  <main class="main">
    <aside v-show="isOpen" class="aside">
      <div class="logo">
        <el-badge value="Pre-Alpha 0.0.1" type="primary">
          <el-text tag="b" size="large">Помогатор</el-text>
        </el-badge>
      </div>

      <div class="navigation">
        <template v-for="(item, index) in navigation" :key="index">
          <nuxt-link
            v-if="!item.children || !item.children.length"
            :to="item.to"
            class="navigation__item"
          >
            {{ item.name }}
          </nuxt-link>

          <div v-else class="navigation__section">
            <div class="navigation__item navigation__item--section">
              {{ item.name }}
            </div>

            <nuxt-link
              v-for="(childrenItem, childrenIndex) in item.children"
              :key="childrenIndex"
              class="navigation__item"
              :to="childrenItem.to"
            >
              {{ childrenItem.name }}
            </nuxt-link>
          </div>
        </template>
      </div>
    </aside>

    <div :class="['page', { 'page--short': isOpen }]">
      <header class="header">
        <div class="header__inner">
          <el-button @click="isOpen = !isOpen">
            <Icon name="solar:hamburger-menu-linear" />
          </el-button>

          <el-button @click="logout">Выйти</el-button>
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
const { logout } = useAuth();

const isOpen = ref(true);

const navigation = reactive([
  {
    name: 'Главная',
    to: '/',
  },
  {
    name: 'Разделы',
    children: [
      {
        name: 'Поставщики',
        to: '/suppliers'
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.page {
  &--short {
    margin-left: 240px;
  }
}

.content {
  margin: 1rem;
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid var(--el-border-color);
  z-index: 4;

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
  border-right: 1px solid var(--el-border-color);
  top: 0;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.header, .logo {
  height: 60px;
}

.navigation {
  display: flex;
  flex-direction: column;

  &__section {
    display: flex;
    flex-direction: column;
  }

  &__item {
    padding: .5rem 1rem;
    text-decoration: none;

    &--section {
      font-size: .75rem;
      font-weight: 600;
      text-transform: uppercase;
      color: #ccc;
    }
  }
}
</style>
<template>
  <main :class="['main', { 'main--mobile': isMobileRef }]">
    <aside :class="['aside', { 'aside--open': isOpen }]">
      <!-- <nuxt-link class="home"to="/" @click="isMobileRef ? isOpen = false : null">
        <layout-logo />
      </nuxt-link> -->

      <div class="aside__actions">
        <el-button ref="ref1" @click="isOpen = !isOpen">
          <Icon class="aside-close__icon" name="mdi:page-layout-sidebar-left" />
        </el-button>

        <!-- <el-button @click="router.push('/')">
          <Icon name="solar:home-2-bold" />
        </el-button>

        <el-button @click="router.push('/settings')">
          <Icon name="icon-park-solid:config" />
        </el-button>

        <el-tooltip content="Выйти">
          <el-button @click="logout">
            <Icon name="ion:log-out" />
          </el-button>
        </el-tooltip> -->
      </div>

      <div class="navigation navigation__first">
        <template v-for="(item, index) in navigation" :key="index">
          <div
            v-if="!item.children || !item.children.length"
            :class="[
              'navigation__item',
              { 'navigation__item--active': route.path === item.to || route.path === item.to + '/create' },
              { 'navigation__item--disabled' : item.disabled }
            ]"
            @click="router.push(!item.disabled ? item.to : null) && isMobileRef ? isOpen = false : null"
          >
            <div class="navigation__left">
              <Icon v-if="item.icon" class="navigation__icon" :name="item.icon" />
              {{ item.name }}
            </div>

            <el-button v-if="item.canCreate" link size="small" @click="router.push(`${item.to}/create`)" :disabled="item.disabled">
              <Icon name="ion:plus" />
            </el-button>
          </div>

          <div v-else class="navigation__section">
            <div class="navigation__item navigation__item--section">
              <div class="navigation__left">
                <Icon v-if="item.icon" class="navigation__icon" :name="item.icon" />
                {{ item.name }}
              </div>

              <el-button v-if="item.canCreate" link size="small" @click="router.push(`${item.to}/create`)" :disabled="item.disabled">
                <Icon name="ion:plus" />
              </el-button>
            </div>

            <div
              v-for="(childrenItem, childrenIndex) in item.children"
              :key="childrenIndex"
              :class="[
                'navigation__item',
                'navigation__item--children',
                { 'navigation__item--active': route.path === childrenItem.to || route.path === childrenItem.to + '/create' },
                { 'navigation__item--disabled' : childrenItem.disabled }
              ]"
              @click="router.push(!childrenItem.disabled ? childrenItem.to : null) && isMobileRef ? isOpen = false : null"
            >
              <div class="navigation__left">
                <Icon v-if="childrenItem.icon" class="navigation__icon" :name="childrenItem.icon" />
                {{ childrenItem.name }}
              </div>

              <el-button v-if="childrenItem.canCreate" link size="small" @click.stop="router.push(`${childrenItem.to}/create`)" :disabled="childrenItem.disabled">
                <Icon name="ion:plus" />
              </el-button>
            </div>
          </div>
        </template>
      </div>


      <div class="navigation navigation__second">
        <el-text class="user__email" tag="b" size="small">{{ profileStore.company?.name_ru }}</el-text>
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
        <div class="header-part">
          <el-button v-if="!isOpen" ref="ref1" @click="isOpen = !isOpen">
            <Icon class="aside-close__icon" name="mdi:page-layout-sidebar-left" />
          </el-button>

          <el-button v-if="isCreateRoute" class="header-button" @click="goBack">
            <div class="header-button__content">
              <Icon name="ion:arrow-back" />
              Назад
            </div>
          </el-button>

          <nuxt-link class="header-item" to="/" @click="isMobileRef ? isOpen = false : null">
            <el-text tag="b">Pomogator</el-text>
          </nuxt-link>
        </div>

        <div class="header-part">
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <el-button class="header-button" link>
              <div class="header-button__content user">
                <el-avatar class="user__avatar" :size="24">
                  {{ profileStore.user?.username?.split('')[0] }}
                </el-avatar>

                <el-text class="user__email" tag="b">{{ profileStore.user?.username }}</el-text>
              </div>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <div class="user-data">
                  {{ profileStore.company?.name_ru }}
                </div>

                <el-dropdown-item command="logout">Редактировать аккаунт</el-dropdown-item>
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
import { useProfile } from "@/stores/profile";

const { isMobile } = useDevice();
const profileStore = useProfile();

const isMobileRef = ref(isMobile);

const { logout } = useAuth();
const route = useRoute();
const router = useRouter();

const isOpen = ref(true);

const isCreateRoute = computed(() => route.path.endsWith('/create'));

const goBack = () => {
  const currentPath = router.currentRoute.value.path;
  const newPath = currentPath.replace('/create', '');
  router.push(newPath);
};

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
    name: 'Складской учет',
    children: [
      {
        name: 'Склады',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/warehouse',
        canCreate: true,
      },
      {
        name: 'Поставщики',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/suppliers',
        disabled: true,
        canCreate: true,
      },
      {
        name: 'Материалы',
        icon: 'solar:box-minimalistic-bold-duotone',
        to: '/suppliers',
        disabled: true,
        canCreate: true,
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

onMounted(async () => {
  await profileStore.getInfo();

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
      // width: 100%;
      // max-width: 280px;
      // left: calc(-280px - .5rem);
      // max-height: calc(100% - 1rem);
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
  padding-left: .5rem;
  
  &--short {
    margin-left: 232px;
  }
}

.content {
  margin: 1rem;
}

.home {
  text-decoration: none;
  // border-radius: 8px;
  // border: 1px solid var(--el-border-color-lighter);
  margin-bottom: .5rem;
  padding: 1rem 0;
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  margin: 0 1rem 2rem 1rem;
  padding: 1rem 0;
  background-color: #fff;

  &-part {
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  &-item {
    // display: flex;
    // align-items: center;
    // border-radius: var(--el-border-radius-base);
    // border: var(--el-border);
    // border-color: #f5f5f5;
    // max-height: 32px;
    // padding: 8px 15px;
    line-height: 1;
  }

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
  width: 232px;
  height: 100%;
  z-index: 5;
  top: 0;
  // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  // margin: .5rem 0 .5rem .5rem;
  // max-height: calc(100vh - 1rem);
  display: flex;
  flex-direction: column;
  z-index: 999;
  transition: left .25s ease;
  left: -232px;
  background-color: var(--el-bg-color);
  // border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);

  &__actions {
    margin: 1rem;

    .el-button {
      margin-left: .25rem;
    }
  }

  &-close {
    position: absolute;
    top: -1px;
    left: 100%;
    cursor: pointer;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #fafafa;
    border-left-color: #fafafa;
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
  // background-color: var(--el-bg-color);
  // border-radius: 8px;
  // border: 1px solid var(--el-border-color-lighter);
  padding: .5rem 0;
  height: 100%;

  &__second {
    justify-content: end;
  }

  &__section {
    display: flex;
    flex-direction: column;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: .25rem;
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
    justify-content: space-between;
    gap: .25rem;

    &--section {
      font-size: .75rem;
      font-weight: 500;
      color: #838383;
      margin-top: 1rem;
    }

    &:not(.navigation__item--section):not(.navigation__item--disabled) {
      cursor: pointer;
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

.user {
  &__avatar {
    background-color: #000;
    text-transform: uppercase;
  }

  &-data {
    padding: .25rem 1rem;
    color: #939393;
  }
}

.el-button+.el-button {
  margin-left: 0;
}
</style>
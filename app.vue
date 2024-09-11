<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import 'element-plus/theme-chalk/dark/css-vars.css';
// import 'element-plus/theme-chalk/src/index.scss';
import 'element-plus/theme-chalk/src/index.scss'; // Подключение стилей Element Plus

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Comforter&family=Great+Vibes&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=SUSE:wght@100..800&display=swap');

body,
html {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans', sans-serif;
}

// :root {
//     --po-bg-color-aside: #fafafa;

//     /* Основные цвета */
//     --el-color-primary: #4a4a4a; /* Темно-серый */
//     --el-color-primary-light-3: #6e6e6e; /* Светло-серый */
//     --el-color-primary-light-5: #9e9e9e; /* Очень светло-серый */
//     --el-color-primary-light-7: #bfbfbf; /* Почти белый */
//     --el-color-primary-light-8: #e0e0e0; /* Белый с серым оттенком */
//     --el-color-primary-light-9: #f5f5f5; /* Очень светлый серый */

//     /* Основные фоны */
//     --el-bg-color: #ffffff; /* Белый */
//     --el-bg-color-page: #f5f5f5; /* Очень светлый серый */

//     /* Цвета текста */
//     --el-text-color-primary: #000000; /* Черный */
//     --el-text-color-regular: #333333; /* Очень темный серый */
//     --el-text-color-secondary: #666666; /* Темный серый */
//     --el-text-color-placeholder: #999999; /* Средний серый */
//     --el-text-color-disabled: #d0d0d0; /* Очень светлый серый */

//     /* Цвета границ */
//     --el-border-color: #f5f5f5; /* Светлый серый */
//     --el-border-color-light: #f5f5f5; /* Очень светлый серый */
//     --el-border-color-lighter: #f5f5f5; /* Почти белый */
//     --el-border-color-dark: #b3b3b3; /* Средний серый */
//     --el-border-color-darker: #999999; /* Темный серый */

//     /* Цвета фонов для элементов */
//     --el-fill-color: #f5f5f5; /* Очень светлый серый */
//     --el-fill-color-light: #ffffff; /* Белый */
//     --el-fill-color-lighter: #f9f9f9; /* Почти белый */
//     --el-fill-color-extra-light: #fdfdfd; /* Очень светлый серый */
//     --el-fill-color-dark: #e0e0e0; /* Светлый серый */
//     --el-fill-color-darker: #d0d0d0; /* Средний серый */
//     --el-fill-color-blank: #ffffff; /* Белый */

//     /* Цвета для состояния disabled */
//     --el-disabled-bg-color: var(--el-fill-color-light);
//     --el-disabled-text-color: var(--el-text-color-placeholder);
//     --el-disabled-border-color: var(--el-border-color-light);

//     /* Цвета для overlay и mask */
//     --el-overlay-color: rgba(0, 0, 0, 0.8); /* Полупрозрачный черный */
//     --el-overlay-color-light: rgba(0, 0, 0, 0.7); /* Темный полупрозрачный черный */
//     --el-overlay-color-lighter: rgba(0, 0, 0, 0.5); /* Светлый полупрозрачный черный */
//     --el-mask-color: rgba(255, 255, 255, 0.9); /* Полупрозрачный белый */
//     --el-mask-color-extra-light: rgba(255, 255, 255, 0.3); /* Очень полупрозрачный белый */

//     /* Граница */
//     --el-border-width: 1px;
//     --el-border-style: solid;
//     --el-border-color-hover: var(--el-text-color-disabled);
//     --el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);

//     /* Тени */
//     --el-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
//     --el-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.12);
//     --el-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, 0.12);
//     --el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16);

//     /* Шрифты */
//     --el-font-size-extra-large: 20px;
//     --el-font-size-large: 18px;
//     --el-font-size-medium: 16px;
//     --el-font-size-base: 14px;
//     --el-font-size-small: 13px;
//     --el-font-size-extra-small: 12px;
//     --el-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
//     --el-font-weight-primary: 500;
//     --el-font-line-height-primary: 24px;

//     /* Радиусы и переходы */
//     --el-border-radius-base: 4px;
//     --el-border-radius-small: 2px;
//     --el-border-radius-round: 20px;
//     --el-border-radius-circle: 100%;
//     --el-transition-duration: 0.3s;
//     --el-transition-duration-fast: 0.2s;
//     --el-transition-function-ease-in-out-bezier: cubic-bezier(0.645,0.045,0.355,1);
//     --el-transition-function-fast-bezier: cubic-bezier(0.23,1,0.32,1);
//     --el-transition-all: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
//     --el-transition-fade: opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
//     --el-transition-md-fade: transform var(--el-transition-duration) var(--el-transition-function-fast-bezier), opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);
//     --el-transition-fade-linear: opacity var(--el-transition-duration-fast) linear;
//     --el-transition-border: border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
//     --el-transition-box-shadow: box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);
//     --el-transition-color: color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);

//     /* Размеры компонентов */
//     --el-component-size-large: 40px;
//     --el-component-size: 32px;
//     --el-component-size-small: 24px;
// }


// .dark:root {
//   --po-bg-color-aside: #040404;
  
//   --el-text-color-regular: #fff;
// }
</style>
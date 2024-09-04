export default defineNuxtRouteMiddleware(() => {
    if (process.client) {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (darkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  });
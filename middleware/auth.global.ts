import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token').value;

  if (!token && to.path !== '/login') {
    return navigateTo('/login');
  }

  if (token && to.path === '/login') {
    return navigateTo('/');
  }
});
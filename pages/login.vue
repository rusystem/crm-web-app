<template>
  <div class="login-container">
    <nuxt-link class="header-item" to="/" @click="isMobileRef ? isOpen = false : null">
      <el-text tag="b">Pomogator</el-text>
    </nuxt-link>

    <el-card class="login-card" shadow="never">
      <el-form class="form" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="Имя пользователя или email" :disabled="step === 1" @change="password = ''"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="password" placeholder="Пароль" show-password></el-input>
        </el-form-item>

        <div class="login-actions">
          <el-button class="login-submit" type="primary" @click="login">
            Войти
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from 'nuxt/app';
import { ElMessage } from 'element-plus';

definePageMeta({ layout: "login" });

const { $apiClient } = useNuxtApp();
const router = useRouter();

const username = ref();
const password = ref();

useHead({
  title: 'Авторизация — Pomogator',
});

const login = async () => {
  try {
    const response = await $apiClient('/auth/', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    });

    const token = useCookie('token');
    const refreshToken = useCookie('refresh_token');
    const expiresAt = useCookie('expires_at');

    token.value = response.token;
    refreshToken.value = response.refresh_token;
    expiresAt.value = response.expires_in;
    await router.push('/');
  } catch (error) {
    console.log(error);
    error.value = '12312';
    const token = useCookie('token');
    alert(error)
    ElMessage.error('Такого пользователя нет');
  }
};
</script>

<style scoped lang="scss">
.el-form {
  &-item {
    margin-bottom: .5rem;
  }
}

.el-button+.el-button {
  margin-left: .5rem;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 2rem;
}

.login-card {
  padding: 0 1rem;
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  // box-shadow: rgba(240, 46, 170, 0.4) -2px -2px, rgba(240, 46, 170, 0.3) -4px -4px, rgba(240, 46, 170, 0.2) -6px -6px, rgba(240, 46, 170, 0.1) -8px -8px, rgba(240, 46, 170, 0.05) -10px -10px;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.login-actions {
  display: flex;
}

.login-submit {
  width: 100%;

}
</style>

<template>
  <div class="login-container">
    <layout-logo />

    <el-card class="login-card" shadow="never">
      <el-text class="login-title" tag="h2">Войти</el-text>

      <el-form class="form" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="Пользователь"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="password" placeholder="Пароль" show-password></el-input>
        </el-form-item>

        <el-form-item class="login-submit">
          <el-button class="login-submit" type="primary" @click="onSubmit">
            Войти
          </el-button>
        </el-form-item>
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

const username = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await $apiClient('http://91.243.71.100:8080/api/web-api-gateway/v1/auth', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    });

    const token = useCookie('token');
    const refreshToken = useCookie('refresh_token');
    const expiresAt = useCookie('expires_at');

    token.value = response.token;
    refreshToken.value = response.refresh_token;
    expiresAt.value = response.expires_in;

    ElMessage.success('Login successful');
    await router.push('/');
  } catch (error) {
    console.log(error)
    ElMessage.error('Login failed');
  }
};

const onSubmit = () => {
  login();
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100vh;
}

.login-card {
  padding: 30px;
  width: 100%;
  max-width: 240px;
  border-radius: 12px;
  box-shadow: rgba(240, 46, 170, 0.4) -2px -2px, rgba(240, 46, 170, 0.3) -4px -4px, rgba(240, 46, 170, 0.2) -6px -6px, rgba(240, 46, 170, 0.1) -8px -8px, rgba(240, 46, 170, 0.05) -10px -10px;
  background-color: #ffffff;
  border: 1px solid rgb(239, 239, 239);
  border-left: none;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.login-submit {
  width: 100%;
}
</style>

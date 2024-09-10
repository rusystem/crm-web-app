<template>
  <div class="login-container">
    <nuxt-link class="header-item" to="/" @click="isMobileRef ? isOpen = false : null">
      <el-text tag="b">Pomogator</el-text>
    </nuxt-link>

    <el-card class="login-card" shadow="never">
      <el-form v-if="form === 'login'" class="form" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="Имя пользователя или email" :disabled="step === 1" @change="password = ''"></el-input>
        </el-form-item>

        <el-form-item v-show="step === 1" prop="password">
          <el-input v-model="password" placeholder="Пароль" show-password></el-input>
        </el-form-item>

        <div class="login-actions">
          <el-button class="login-submit" type="primary" @click="nextStep">
            Войти
          </el-button>
        </div>
      </el-form>

      <el-form v-if="form === 'register'" class="form" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="Имя пользователя" />
        </el-form-item>

        <el-form-item prop="email">
          <el-input v-model="email" placeholder="Email" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="password" placeholder="Пароль" show-password />
        </el-form-item>

        <el-form-item prop="repeatPassword">
          <el-input v-model="repeatPassword" placeholder="Повторите пароль" show-password />
        </el-form-item>

        <el-form-item prop="name">
          <el-input v-model="name" placeholder="Имя" />
        </el-form-item>

        <el-form-item prop="position">
          <el-input v-model="position" placeholder="Позиция" />
        </el-form-item>

        <el-form-item prop="phone">
          <el-input v-model="phone" placeholder="Телефон" />
        </el-form-item>

        <el-form-item prop="country">
          <el-input v-model="country" placeholder="Страна" />
        </el-form-item>

        <div class="login-actions">
          <el-button class="login-submit" type="primary" @click="register">
            Зарегистрироваться
          </el-button>
        </div>
      </el-form>
    </el-card>

    <!-- <el-button v-if="form === 'login'" class="login-submit" type="secondary" link @click="form = 'register'">
      Регистрация
    </el-button> -->

    <!-- <el-button v-else-if="form === 'register'" class="login-submit" type="secondary" link @click="form = 'login'">
      Уже есть аккаунт?
    </el-button> -->
    {{ error }}qrqwr12
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

const form = ref('login');
const step = ref(0);

const username = ref('admin');
const email = ref('');
const password = ref('pomogatoradmin');
const repeatPassword = ref('');
const name = ref('');
const phone = ref('');
const position = ref('');
const country = ref('');

useHead({
  title: 'Авторизация — Pomogator',
});

const error = ref(null);

const login = async () => {
  try {
    const response = await $apiClient('http://91.243.71.100:8080/api/web-api-gateway/v1/auth/', {
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

const register = async () => {
  try {
    const response = await $apiClient('http://91.243.71.100:8080/api/web-api-gateway/v1/register', {
      method: 'POST',
      body: {
        username: username.value,
        email: email.value,
        password: password.value,
        name: name.value,
        phone: phone.value,
        position: position.value,
        country: country.value,
      },
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
    ElMessage.error('Такого пользователя нет');
  }
};

const nextStep = async () => {
  if (step.value === 0 && username.value) {
    if (password.value) {
      await login();
      return;
    }

    step.value = 1;
    return;
  }

  if (!username.value) {
    ElMessage.error('Не ввели username');
    return;
  }

  await login();
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

<template>
  <div class="page">
    <div class="header">
      <el-text tag="h1" size="large">Создать пользователя</el-text>
    </div>

    <div class="content">
      <el-form label-width="auto" label-position="top" style="max-width: 600px">
        <!-- <el-form-item label="Название">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Страна">
          <el-select v-model="form.country" placeholder="Выберите страну">
            <el-option label="Казахстан" value="Kazakhstan" />
            <el-option label="Узбекистан" value="Uzbekistan" />
            <el-option label="Россия" value="Russia" />
            <el-option label="Кыргызстан" value="kyrgyzstan" />
          </el-select>
        </el-form-item>

        <el-form-item label="Адрес">
          <el-input v-model="form.address" />
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="form.email" type="email" />
        </el-form-item>

        <el-form-item label="Телефон">
          <el-input v-model="form.phone" type="phone" />
        </el-form-item>

        <el-form-item label="Вместительнось">
          <el-input-number v-model="form.max_capacity" />
        </el-form-item>

        <el-form-item label="Текущая заполненость">
          <el-input-number v-model="form.current_occupancy" />
        </el-form-item>

        <el-form-item label="Ответственное лицо">
          <el-input v-model="form.responsible_person" />
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Создать</el-button>
          <el-button @click="goBack">Отмена</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProfile } from "@/stores/profile";

const router = useRouter();
const { $apiClient } = useNuxtApp();

const profileStore = useProfile();

const country = computed(() => profileStore.user?.country);

const form = reactive({
  name: '',
  country: country.value || '',
  address: '',
  email: '',
  phone: '',
  max_capacity: 0,
  current_occupancy: 0,
  responsible_person: '',
});

const onSubmit = async () => {
  try {
    const response = $apiClient('http://91.243.71.100:8080/api/web-api-gateway/v1/warehouse', {
      method: 'POST',
      body: form,
    });

    console.log(response)
  } catch (error) {
    console.log(error);
  }
};

const goBack = () => {
  const currentPath = router.currentRoute.value.path;
  const newPath = currentPath.replace('/create', '');
  router.push(newPath);
};

watch(country, (newValue) => {
  if (newValue) {
    form.country = newValue;
  }
})
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 1rem;
}
</style>
import { useAuth } from '~/composables/useAuth';

const baseUrl = 'http://91.243.71.100:8080/api/web-api-gateway/v1';

export default defineNuxtPlugin((nuxtApp) => {
  const { refreshAccessToken } = useAuth();

  const apiClient = async (url: string, options: any = {}) => {
    const token = useCookie('token');
    const expiresAt = useCookie('expires_at');
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime >= expiresAt.value) {
      await refreshAccessToken();
    }

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token.value}`,
    };

    try {
      const response = await $fetch(`${baseUrl}${url}`, options);
      return response;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  };
  return {
    provide: {
      apiClient,
    },
  };
});
import { useCookie, useRouter } from 'nuxt/app';
import { ElMessage } from 'element-plus';

export function useAuth() {
  const router = useRouter();
  const token = useCookie('token');
  const refreshToken = useCookie('refresh_token');
  const expiresAt = useCookie('expires_at');

  const refreshAccessToken = async () => {
    try {
      const response = await $fetch('http://91.243.71.100:8080/api/web-api-gateway/v1/auth/refresh', {
        method: 'POST',
        body: {
          refresh_token: refreshToken.value,
          sections: ['full_all_access'],
        },
      });

      token.value = response.token;
      refreshToken.value = response.refresh_token;
      expiresAt.value = response.expires_in;

      ElMessage.success('Token refreshed successfully');
    } catch (error) {
      ElMessage.error('Token refresh failed');
      logout();
    }
  };

  const logout = () => {
    token.value = null;
    refreshToken.value = null;
    expiresAt.value = null;
    router.push('/login');
  };

  return { refreshAccessToken, logout };
}
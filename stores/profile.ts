import { defineStore } from 'pinia';

export const useProfile = defineStore('profile', {
  state: () => ({
    user: {
      company_id: null,
      country: null,
      created_at: null,
      email: null,
      id: 0,
      is_active: true,
      is_approved: true,
      is_send_system_notification: true,
      language: null,
      last_login: null,
      name: null,
      phone: null,
      position: null,
      role: null,
      sections: [],
      updated_at: null,
      username: null,
    },
    company: {
      address: null,
      country: null,
      created_at: null,
      email: null,
      id: null,
      is_active: null,
      is_approved: null,
      name_en: null,
      name_ru: null,
      phone: null,
      timezone: null,
      updated_at: null,
      website: null,
    },
  }),

  actions: {
    setInfo(data) {
      this.user.company_id = data.company_id;
      this.user.country = data.country;
      this.user.created_at = data.created_at;
      this.user.email = data.email;
      this.user.id = data.id;
      this.user.is_active = data.is_active;
      this.user.is_approved = data.is_approved;
      this.user.is_send_system_notification = data.is_send_system_notification;
      this.user.language = data.language;
      this.user.last_login = data.last_login;
      this.user.name = data.name;
      this.user.phone = data.phone;
      this.user.position = data.position;
      this.user.role = data.role;
      this.user.sections = data.sections;
      this.user.updated_at = data.updated_at;
      this.user.username = data.username;
    },
    setCompanyInfo(data) {
      this.company.address = data.address;
      this.company.country = data.country;
      this.company.created_at = data.created_at;
      this.company.email = data.email;
      this.company.id = data.id;
      this.company.is_active = data.is_active;
      this.company.is_approved = data.is_approved;
      this.company.name_en = data.name_en;
      this.company.name_ru = data.name_ru;
      this.company.phone = data.phone;
      this.company.timezone = data.timezone;
      this.company.updated_at = data.updated_at;
      this.company.website = data.website;
    },
    async getInfo() {
      try {
        const token = useCookie('token');
      
        const response = await useNuxtApp().$apiClient(`http://91.243.71.100:8080/api/web-api-gateway/v1/user/info?token=${token.value}`, {
          method: 'GET',
        });

        this.setInfo(response);

        await this.getCompany();
      } catch (error) {
        console.log(error);
      }
    },
    async getCompany() {
      try {
        const token = useCookie('token');
      
        const response = await useNuxtApp().$apiClient(`http://91.243.71.100:8080/api/web-api-gateway/v1/company/info?token=${token.value}`, {
          method: 'GET',
        });

        this.setCompanyInfo(response);
      } catch (error) {
        console.log(error);
      }
    }
  },
});

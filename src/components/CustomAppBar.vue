<template>
  <v-app-bar app>
    <v-app-bar-nav-icon icon="mdi-home" @click="navigateToHome"></v-app-bar-nav-icon>
    <v-toolbar-title >
      Devis Generator
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!userStore.isLoggedIn" text @click="navigateToLogin">
    {{ $t('Connexion') }}  
    </v-btn>
   
    <v-btn v-else @click="navigateToDashboard" prepend-icon="mdi-view-dashboard" variant="outlined">
  Dashboard
</v-btn>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon left>mdi-translate</v-icon>
          {{ currentLanguage.name }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
        >
          <v-list-item-title>
            <v-icon left>{{ lang.icon }}</v-icon>
            {{ lang.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
   
  </v-app-bar>
</template>

<script>
 import { useUserStore } from '@/stores/userStore';
 import {onMounted } from 'vue'; 
export default {

  setup() {
    const userStore = useUserStore();
    onMounted(() => {
        userStore.initialize();
      });

    return {
      userStore
    }

  },
  data() {
    return {
      languages: [
        { name: 'Français', code: 'fr', icon: 'mdi-flag-france' },
        { name: 'English', code: 'en', icon: 'mdi-flag-uk' },
      ],
    };
  },
  computed: {
    currentLanguage() {
      return this.languages.find(lang => lang.code === this.$i18n.locale) || this.languages[0];
    },
  },
  methods: {
    changeLanguage(code) {
      this.$i18n.locale = code;
    },
    navigateToHome() {
      this.$router.push({ name: 'DevisPage' }); 
    },
    navigateToLogin() {
      this.$router.push({ name: 'login' }); 
    },
    navigateToDashboard() {
      this.$router.push({ name: 'dashboard' }); 
    },

    logout() {
      this.userStore.logout(); // Call the logout method from the user store
      this.$router.push({ name: 'login' }); // Redirect to login page after logout
    },
  },
};
</script>
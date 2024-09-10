<!-- components/Layout.vue -->
<template>
    <v-app>
      <v-navigation-drawer
        class="bg-deep-purple"
        app
        permanent
        clipped
        theme="dark"
      >
        <v-list color="transparent">
          <v-list-item @click="navigateTo('DevisPage')" prepend-icon="mdi-view-dashboard" title="Home"></v-list-item>
          <v-list-item @click="navigateTo('informations')" prepend-icon="mdi-account-box" title="Informations"></v-list-item>
          <v-list-item @click="navigateTo('devis')" prepend-icon="mdi-file-document" title="Mes Devis"></v-list-item>
          <v-list-item @click="navigateTo('services')" prepend-icon="mdi-gavel" title="Services"></v-list-item>
        </v-list>
  
        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click="logout" block>
              {{$t('Déconnexion')}}
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
  
      <v-app-bar app clipped-left>
        <v-toolbar-title>Hello {{userStore.user.first_name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- Add other toolbar items here -->
      </v-app-bar>
  
      <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const userStore = useUserStore();
  
  const navigateTo = (routeName) => {
    router.push({ name: routeName });
  };
  
  const logout = () => {
    userStore.logout(); // Call the logout method from the user store
    router.push({ name: 'login' }); // Redirect to login page after logout
  };
  </script>
  
  <style scoped>
  /* Optional: Add some styling if needed */
  </style>
  
<template>
  <v-app>
    <CustomAppBar v-if="isHomePage" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer v-if="isHomePage" app padless>
      <v-col class="text-center" cols="12">
        &copy; 2024 - Medev
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { defineComponent } from 'vue';
import CustomAppBar from './components/CustomAppBar.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// Reactive reference to check if we are on the dashboard page
const route = useRoute();
const isHomePage = computed(() => route.name === 'DevisPage' ||route.name === 'login'||route.name === 'Register' ); // Adjust 'dashboard' to your route name


defineComponent({
  name: "App",
});
</script>

<style>
/* Custom styles for App.vue */
.v-app-bar {
  background-color: #3f51b5;
  color: white;
}
.v-footer {
  background-color: #3f51b5;
  color: white;
}
</style>
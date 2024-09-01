<template>
  <v-app>
    <CustomAppBar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app padless>
      <v-col class="text-center" cols="12">
        &copy; 2024 - Medev
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { defineComponent } from 'vue';
import CustomAppBar from './components/CustomAppBar.vue';

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
<template>
  <v-app-bar app>
    <v-app-bar-nav-icon icon="mdi-home" @click="navigateToHome"></v-app-bar-nav-icon>
    <v-toolbar-title >
      Devis Generator
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="navigateToLogin">
      Connexion
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
export default {
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
      this.$router.push({ name: 'DevisPage' }); // Adjust the route name as needed
    },
    navigateToLogin() {
      this.$router.push({ name: 'login' }); // Adjust the route name as needed
    }
  },
};
</script>
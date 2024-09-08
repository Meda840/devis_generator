import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createI18n } from "vue-i18n";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

const messages = {
  en: en,
  fr: fr,
};

const i18n = createI18n({
  locale: "fr", // default language
  fallbackLocale: "fr",
  messages,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(vuetify).use(i18n).mount("#app");

import { createRouter, createWebHistory } from "vue-router";
import DevisPage from "../pages/DevisPage.vue";

const routes = [
  {
    path: "/",
    name: "DevisPage",
    component: DevisPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

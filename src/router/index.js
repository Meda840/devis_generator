import { createRouter, createWebHistory } from "vue-router";
import DevisPage from "../pages/DevisPage.vue";

const routes = [
  {
    path: "/",
    name: "DevisPage",
    component: DevisPage,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/RegisterPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import DevisPage from "../pages/DevisPage.vue";

const routes = [
  {
    path: "/",
    name: "DevisPage",
    component: DevisPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/DashboardPage.vue"),
  },
  {
    path: "/informations",
    name: "informations",
    component: () => import("@/pages/InfoPage.vue"),
  },
  {
    path: "/services",
    name: "services",
    component: () => import("@/pages/ServicesPage.vue"),
  },
  {
    path: "/mes-devis",
    name: "devis",
    component: () => import("@/pages/DevisUser.vue"),
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

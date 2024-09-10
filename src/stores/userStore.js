import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    isLoggedIn: false,
    user: {
      first_name: null,
      last_name: null,
      email: null,
    },
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(
          "http://localhost/devis-app/public/api/login",
          {
            email: email,
            password: password,
          }
        );
        this.token = response.data.token;
        this.user = response.data.user;
        this.isLoggedIn = true;

        localStorage.setItem("token", this.user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      } catch (error) {
        console.error("Login failed:", error.response.data.message);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isLoggedIn = false;
      // Remove token from local storage
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    async getCsrfCookie() {
      try {
        await axios.get(
          "http://localhost/devis-app/public/sanctum/csrf-cookie"
        );
      } catch (error) {
        console.error("Failed to get CSRF cookie:", error.message);
      }
    },
    async initialize() {
      this.getCsrfCookie();
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isLoggedIn = true;
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        this.getUserInfo();
      }
    },
    async getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost/devis-app/public/api/user",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              Accept: "application/json",
            },
          }
        );
        this.user = response.data;
      } catch (error) {
        console.error(
          "Failed to retrieve user info:",
          error.response?.data?.message || error.message
        );
      }
    },

    async createCompany(companyInfo) {
      try {
        await axios.post(
          "http://localhost/devis-app/public/api/companies",
          companyInfo,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              Accept: "application/json",
            },
          }
        );
        alert("Company created successfully");
      } catch (error) {
        console.error(
          "Failed to create company:",
          error.response?.data?.message || error.message
        );
        alert("Failed to create company");
      }
    },

    async updateUser(updatedUser) {
      try {
        await this.getCsrfCookie();
        const response = await axios.put(
          "http://localhost/devis-app/public/api/user",
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              Accept: "application/json",
            },
          }
        );
        this.user = response.data.user;
      } catch (error) {
        console.error(
          "Failed to update user info:",
          error.response?.data?.message || error.message
        );
        throw error; // Re-throw error to handle it in the component
      }
    },
  },
});

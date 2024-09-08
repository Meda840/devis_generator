import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    user: null,
    isLoggedIn: false,
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
        // Optionally store token in local storage
        localStorage.setItem("token", this.token);
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
    initialize() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isLoggedIn = true;
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      }
    },
  },
});

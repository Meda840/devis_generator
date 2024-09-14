import { defineStore } from "pinia";
import axios from "axios";

export const useInfoGeneralStore = defineStore("infoGeneral", {
  state: () => ({
    currencies: [],
    services: [],
    isUserLogged: false,
    user: {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
    },
  }),

  actions: {
    async checkUserLoggedIn() {
      const token = localStorage.getItem("token");
      await axios.get("http://localhost/devis-app/public/sanctum/csrf-cookie");
      axios.defaults.withXSRFToken = true;
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      if (token) {
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

        return true;
      } else {
        return false;
      }
    },

    async fetchCurrencies() {
      try {
        const response = await axios.get(
          "http://localhost/devis-app/public/api/currencies" // change with medadev
        );
        this.currencies = response.data;
      } catch (error) {
        console.error("Failed to fetch currencies:", error);
      }
    },
    // Add method to fetch services
    async fetchServices() {
      try {
        const response = await axios.get(
          "http://localhost/devis-app/public/api/services" // change with medadev
        );
        this.services = response.data;
        console.log("services retrieved");
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    },
  },
});

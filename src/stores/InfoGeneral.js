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
    userCompany: {
      id: null,
      name: null,
      address: null,
      postal_code: null,
      city: null,
      siret: null,
    },
  }),

  actions: {
    async checkUserLoggedIn() {
      const token = localStorage.getItem("token");
      await axios.get("http://localhost/devis-app/public/sanctum/csrf-cookie");
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost/devis-app/public/api/user/companies",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
          this.user = response.data.user;
          if (response.data.companies && response.data.companies.length > 0) {
            this.userCompany = response.data.companies[0];
            console.log(
              "user comapany from infogeneral store ",
              this.userCompany
            );
          }
          if (this.user && this.user.id) {
            return true;
          }
        } catch (error) {
          console.error("Error fetching user or company data:", error);
        }
      }
      console.log("user not connected");
      return false;
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

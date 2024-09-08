import { defineStore } from "pinia";
import axios from "axios";

export const useInfoGeneralStore = defineStore("infoGeneral", {
  state: () => ({
    currencies: [],
  }),

  actions: {
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
  },
});

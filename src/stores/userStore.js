import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    isLoggedIn: false,
    user: {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
    },
    company: {
      id: null,
      name: null,
      address: null,
      postal_code: null,
      city: null,
      siret: null,
    },
    isUpdatingCompany: false,
    devis: [],
  }),
  actions: {
    async login(email, password) {
      await this.getCsrfCookie();
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

        localStorage.setItem("token", this.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      } catch (error) {
        console.error("Login failed:", error.response.data.message);
      }
    },

    async logout() {
      try {
        await axios.post("http://localhost/devis-app/public/api/logout");
        this.token = null;
        this.user = null;
        this.isLoggedIn = false;
        // Remove token from local storage
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    },
    async getCsrfCookie() {
      try {
        await axios.get(
          "http://localhost/devis-app/public/sanctum/csrf-cookie"
        );
        axios.defaults.withXSRFToken = true;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      } catch (error) {
        console.error("Failed to get CSRF cookie:", error.message);
      }
    },
    async initialize() {
      await this.getCsrfCookie();
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
          "http://localhost/devis-app/public/api/user/companies",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              Accept: "application/json",
            },
          }
        );
        this.user = response.data.user;
        if (response.data.companies && response.data.companies.length > 0) {
          this.company = response.data.companies[0]; // For now, handle only the first company
          this.isUpdatingCompany = true; // Indicates that the company exists and can be updated
        } else {
          this.isUpdatingCompany = false; // No company exists, so we'll create one
        }

        console.log("user info :", this.user.id);
      } catch (error) {
        console.error(
          "Failed to retrieve user info:",
          error.response?.data?.message || error.message
        );
      }
    },
    async createOrUpdateCompany(companyInfo) {
      try {
        const endpoint = this.isUpdatingCompany
          ? `http://localhost/devis-app/public/api/companies/${this.company.id}`
          : "http://localhost/devis-app/public/api/companies";

        const method = this.isUpdatingCompany ? "put" : "post";

        const response = await axios[method](endpoint, companyInfo, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/json",
          },
        });

        this.company = response.data.company;
        this.isUpdatingCompany = true; // Now it's an update if called again
        alert("Company information saved successfully");
      } catch (error) {
        console.error(
          "Failed to save company info:",
          error.response?.data?.message || error.message
        );
        alert("Failed to save company information");
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

    async fetchAllDevis() {
      try {
        await this.getCsrfCookie();
        const response = await axios.get(
          "http://localhost/devis-app/public/api/user/devis",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              Accept: "application/json",
            },
          }
        );
        this.devis = response.data.devis;
        console.log("devis retrieved");
      } catch (error) {
        console.error(
          "Failed to fetch devis:",
          error.response?.data?.message || error.message
        );
      }
    },

    async generatePdf(devisId) {
      try {
        const response = await axios.get(
          `http://localhost/devis-app/public/api/generate-pdf/${devisId}`,
          {
            responseType: "blob",
          }
        );

        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `devis_${devisId}.pdf`;
        link.click();
        URL.revokeObjectURL(fileURL);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF. Please try again.");
      }
    },

    async deleteDevis(devisId) {
      try {
        await this.getCsrfCookie(); // Ensure CSRF token is valid
        await axios.delete(
          `http://localhost/devis-app/public/api/devis/${devisId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              Accept: "application/json",
            },
          }
        );
        this.devis = this.devis.filter((devis) => devis.id !== devisId);
        alert("Devis deleted successfully");
      } catch (error) {
        console.error(
          "Failed to delete devis:",
          error.response?.data?.message || error.message
        );
        alert("Failed to delete devis. Please try again.");
      }
    },
  },
});

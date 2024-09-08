<template>
    <v-container fluid class="d-flex justify-center align-center" style="height: 100vh;">
      <v-card class="pa-8" width="400">
      
        <v-row justify="center" class="mb-6">
          <h3>Connexion à Medevis</h3>
        </v-row>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="email"
            label="E-mail"
            :rules="[rules.required, rules.email]"
            outlined
            prepend-inner-icon="mdi-email"
          />
          <v-text-field
            v-model="password"
            label="Mot de passe"
            :rules="[rules.required]"
            type="password"
            outlined
            prepend-inner-icon="mdi-lock"
          />
          <v-btn
            class="mt-6"
            :disabled="!valid"
            color="primary"
            block
            @click="login"
          >
            Connexion
          </v-btn>
        </v-form>
        <v-row class="mt-4">
          <v-col cols="6">
            <v-btn text class="text-left">Mot de passe oublié</v-btn>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn text @click="$router.push('/register')">Créer un compte</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import { useUserStore } from '@/stores/userStore';
  export default {
    
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        rules: {
          required: v => !!v || 'Ce champ est requis.',
          email: v => /.+@.+\..+/.test(v) || 'E-mail doit être valide.',
        },
      };
    },
    methods: {
      async login() {
        if (this.$refs.form.validate()) {
          // Handle the login logic here
          console.log('Logging in...');
          const userStore = useUserStore();
          await userStore.login(this.email, this.password);
            if (userStore.isLoggedIn) {
                this.$router.push('/'); // Replace '/home' with your actual route
            }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-application {
    background-color: #f4f5fa;
  }
  
  .pa-8 {
    padding: 32px;
  }
  
  .text-left {
    text-align: left;
  }
  
  .text-right {
    text-align: right;
  }
  </style>
  
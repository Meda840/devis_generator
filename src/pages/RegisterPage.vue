<template>
    <v-container fluid class="d-flex justify-center align-center" style="height: 100vh;">
      <v-card class="pa-8" width="400">
   
        <v-row justify="center" class="mb-6">
          <h3>Créer un compte</h3>
        </v-row>
        <v-form v-model="valid" ref="form">
            <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="first_name"
              label="Prénom"
              :rules="[rules.required]"
              outlined
              prepend-inner-icon="mdi-account"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="last_name"
              label="Nom"
              :rules="[rules.required]"
              outlined
              prepend-inner-icon="mdi-account"
            />
          </v-col>
        </v-row>
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
          <v-text-field
            v-model="confirmPassword"
            label="Confirmer le mot de passe"
            :rules="[rules.required, passwordMatch]"
            type="password"
            outlined
            prepend-inner-icon="mdi-lock"
          />
          <v-btn
            class="mt-6"
            :disabled="!valid"
            color="primary"
            block
            @click="register"
          >
            Créer un compte
          </v-btn>
        </v-form>
        <v-row class="mt-4">
          <v-col cols="12" class="text-center">
            <v-btn text @click="$router.push('/login')">Déjà un compte ? Connexion</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script>
   import axios from 'axios';
  export default {
    
    data() {
      return {
        valid: false,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        rules: {
          required: v => !!v || 'Ce champ est requis.',
          email: v => /.+@.+\..+/.test(v) || 'E-mail doit être valide.',
          passwordMatch: v => v === this.password || 'Les mots de passe ne correspondent pas.',
        },
      };
    },
    methods: {
      register() {
        if (this.$refs.form.validate()) {
          // Handle the registration logic here
          console.log('Registering...');
          axios.post('http://localhost/devis-app/public/api/register', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(response => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
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
  
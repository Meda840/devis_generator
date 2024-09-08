<template>
    <DashboardLayout>
    <v-container>
      <v-row>
        <v-col cols="6" sm="6">
          <v-card elevation="2" class="pa-4">
            <v-card-title>Company Information</v-card-title>
            <v-card-text>
              <!-- Company information fields go here -->
              <v-text-field label="Company Name" ></v-text-field>
              <v-text-field label="Address" ></v-text-field>
              <v-text-field label="Postal Code"></v-text-field>
              <v-text-field label="City"></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" sm="6">
          <v-card elevation="2" class="pa-4">
            <v-card-title>Personal Information</v-card-title>
            <v-card-text>
              <!-- Personal information fields go here -->
              <v-text-field label="Last Name" ></v-text-field>
              <v-text-field label="First Name"></v-text-field>
              <v-text-field label="Email"></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/components/DashboardLayout.vue';

  </script>
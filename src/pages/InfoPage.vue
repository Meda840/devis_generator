<template>
  <DashboardLayout>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="2" class="pa-4">
            <v-card-title>Votre entreprise</v-card-title>
            <v-card-text>
              <v-text-field
                label="Nom Entreprise"
                v-model="company.name"
                dense
              ></v-text-field>
              <v-text-field
                label="Address"
                v-model="company.address"
                dense
              ></v-text-field>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Postal Code"
                    v-model="company.postal_code"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Ville"
                    v-model="company.city"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                label="SIRET"
                v-model="company.siret"
                dense
              ></v-text-field>
            </v-card-text>
            <v-btn @click="updateUserCompany" color="success" class="mt-5" block>
              {{ $t('Modifier les informations') }}
            </v-btn>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" lg="6">
          <v-card elevation="2" class="pa-4">
            <v-card-title>Vos informations personnelles</v-card-title>
            <v-card-text>
              <v-text-field
                label="Prénom"
                v-model="user.firstName"
                dense
              ></v-text-field>
              <v-text-field
                label="Nom"
                v-model="user.lastName"
                dense
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="user.email"
                dense
              ></v-text-field>
            </v-card-text>
            <v-btn @click="updateUserInfo" color="success" class="mt-5" block>
              {{ $t('Modifier les informations') }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </DashboardLayout>
</template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import { useUserStore } from '@/stores/userStore';

  
  const userStore = useUserStore();
  const user = ref({
    firstName: '',
    lastName: '',
    email: '',
  });
  const company = ref({
    name: '',
    address: '',
    postal_code: '',
    city: '',
    siret: '',
  });

onMounted(async () => {
  await userStore.initialize();
  console.log(userStore.user);
  user.value.firstName = userStore.user.first_name;
  user.value.lastName = userStore.user.last_name;
  user.value.email = userStore.user.email;
});

const updateUserInfo = async () => {
  try {
    await userStore.updateUser({
      first_name: user.value.firstName,
      last_name: user.value.lastName,
      email: user.value.email,
    });
    alert('User information updated successfully');
  } catch (error) {
    alert('Failed to update user information');
  }
};

const updateUserCompany = async () => {

  try {
    await userStore.createCompany(company.value);
    alert("comapny created")
  }catch(error){
    console.log(error);
  }
}




  </script>
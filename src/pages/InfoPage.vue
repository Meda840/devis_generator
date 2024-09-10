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
            <v-btn @click="saveCompanyInfo" color="success" class="mt-5" block>
              {{ isUpdatingCompany ? 'Mettre à jour les informations' : 'Créer une entreprise' }}
            </v-btn>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" lg="6">
          <v-card elevation="2" class="pa-4">
            <v-card-title>{{ $t('Vos informations personnelles')}}</v-card-title>
            <v-card-text>
              <v-text-field
                label="Prénom"
                v-model="user.first_name"
                dense
              ></v-text-field>
              <v-text-field
                label="Nom"
                v-model="user.last_name"
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
  import { ref, onMounted ,watch} from 'vue';
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import { useUserStore } from '@/stores/userStore';

  const isLoading = ref(true);  // Track loading state
  const userStore = useUserStore();
  const user = ref(userStore.user);
  const company = ref(userStore.company);  // Bind the company from the store
  const isUpdatingCompany = ref(userStore.isUpdatingCompany);  // Track whether we are updating or creating


onMounted(async () => {
  try {
    await userStore.initialize();
    isUpdatingCompany.value = userStore.isUpdatingCompany;
  } catch (error) {
    console.error("Failed to initialize:", error);
  } finally {
    isLoading.value = false;
  }
});
watch(() => userStore.user, (newUser) => {
  user.value = newUser;
});

watch(() => userStore.company, (newCompany) => {
  company.value = newCompany;
});
watch(() => userStore.isUpdatingCompany, (newIsUpdatingCompany) => {
  isUpdatingCompany.value = newIsUpdatingCompany;
});

const updateUserInfo = async () => {
  try {
    await userStore.updateUser(user.value);
    alert('User information updated successfully');
  } catch (error) {
    alert('Failed to update user information');
  }
};

const saveCompanyInfo = async () => {
  await userStore.createOrUpdateCompany(company.value);
}

</script>
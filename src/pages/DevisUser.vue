<template>
    <DashboardLayout>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="devis"
          :items-per-page="itemsPerPage"
          :loading="loading"
          :server-items-length="totalItems"
          :search="search"
          @update:options="loadItems"
          item-key="id"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
                <td>{{ item.description }}</td>
                <td>{{ item.client_name }}</td>
                <td>{{ item.date_devis }}</td>
                <td>{{ item.amount }}</td>
                <td>
              <v-row align="center" justify="center">
                <v-col cols="auto">
                <v-btn size="small" icon @click="userStore.generatePdf(item.id)" title="Télecharger PDF">
                  <v-icon>mdi-file-pdf</v-icon>
                </v-btn>
                </v-col>
              
                 <v-col  cols="auto">
                    <v-btn size="small" icon @click="confirmDelete(item.id)" title="Supprimer">
                    <v-icon>mdi-delete</v-icon>
                    </v-btn>
                 </v-col>
              </v-row>

            </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
      <v-dialog
      v-model="showConfirmCard"
      max-width="400"
    >

      <v-card
        prepend-icon="mdi-map-marker"
        text="Etes vous sur de voulour supprimer ce devis, les infrmtions seront supprimes."
        title="Supprimer le devis?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="cancelDelete">
            {{$t("Annuler")}}
          </v-btn>

          <v-btn @click="cancelDelete">
            {{$t("Confirmer")}}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  
  const userStore = useUserStore();
  const devis = ref([]);
  const showConfirmCard = ref(false);
  const loadingConfirm = ref(false);
  const currentItemId = ref(null);
  const headers = ref([
    { title: 'Reference', value: 'id' },
    { title: 'Client', value: 'client_name' },
    { title: 'Date', value: 'date_devis' },
    { title: 'Prix HT', value: 'amount' },
    { title: 'Actions', value: 'actions' }
  ]);
  const itemsPerPage = ref(5);
  const totalItems = ref(0);
  const search = ref('');
  const loading = ref(true);

 

    const confirmDelete = (id) => {
    currentItemId.value = id;
    showConfirmCard.value = true;
    };
    const cancelDelete = () => {
    showConfirmCard.value = false;
    };

  
  const loadItems = async ({ page, itemsPerPage, sortBy }) => {
    loading.value = true;
    try {
      await userStore.fetchAllDevis({ page, itemsPerPage, sortBy }); //TODO pagination
      devis.value = userStore.devis;
      totalItems.value = userStore.devis.length; 
    } catch (error) {
      console.error('Error loading devis:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
  });
  </script>
  
  <style>
  /* Add any necessary styling here */
  </style>
  
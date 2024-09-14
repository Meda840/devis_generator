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
                <v-btn size="small" icon @click="userStore.generatePdf(item.id)" title="Download PDF">
                  <v-icon>mdi-file-pdf</v-icon>
                </v-btn>
                </v-col>
                <v-col  cols="auto">
                <v-btn  size="small" icon @click="modifyDevis(item.id)" title="Modify Devis">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                 </v-col>
                 <v-col  cols="auto">
                <v-btn size="small" icon @click="deleteDevis(item.id)" title="Delete Devis">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                 </v-col>
              </v-row>

            </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  
  const userStore = useUserStore();
  const devis = ref([]);
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
  
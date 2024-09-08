<template>
    <v-container class="mt-5">
      <v-card>
        <v-card-title>
          <h2 class="card-title"><v-text-field
                v-model="devis.number"
                :label="$t('devis.number')"
                dense
                hide-details
                 variant="plain"
                class="col-lg-5 plain-input mb-0"
              ></v-text-field></h2>
        </v-card-title>
        <v-card-text>
          <section>
            <div class="d-flex flex-column align-start mt-4">
              
              <v-text-field
                v-model="devis.companyName"
                :placeholder="$t('devis.companyName')"
                dense
                hide-details
                variant="plain"
                class="col-lg-5 col-sm-8 mb-0"
              ></v-text-field>
              <v-text-field
                v-model="devis.adressPro"
                :placeholder="$t('devis.adressPro')"
                dense
                hide-details
                variant="plain"
                class="col-lg-5 col-sm-8 mb-0"
              ></v-text-field>
              <v-text-field
                v-model="devis.cityPro"
                :placeholder="$t('Code Postal')"
                dense
                hide-details
                variant="plain"
                class="col-lg-5 col-sm-8 mb-0"
              ></v-text-field>
              <v-text-field
                v-model="devis.cityPro"
                :placeholder="$t('Ville')"
                dense
                hide-details
                variant="plain"
                class="col-lg-5 col-sm-8 mb-0"
              ></v-text-field>
              <v-text-field
                v-model="devis.siret"
                :label="$t('devis.siret')"
                dense
                hide-details
                variant="plain"
                class="col-lg-5 col-sm-8 plain-input mb-0"
              ></v-text-field>
            </div>
    
         <div class="d-flex flex-column align-end">
                <v-text-field 
                  v-model="devis.clientName"
                  :placeholder="$t('devis.clientName')"
                  hide-details
                    variant="plain"
                  class="col-lg-3  col-sm-6 mb-0"> 
                </v-text-field>
                <v-text-field 
                  v-model="devis.clientAdress"
                  :placeholder="$t('devis.adressPro')"
                  hide-details
                    variant="plain"
                  class="col-lg-3 col-sm-6 mb-0"> 
                </v-text-field>
                <v-text-field
                v-model="devis.cityClient"
                :placeholder="$t('Code Postal Ville')"
                dense
                hide-details
                  variant="plain"
                class="col-lg-3 col-sm-6 mb-0"
              ></v-text-field>
                <v-text-field
                  v-model="devis.clientSiret"
                  :label="$t('devis.clientSiret')"
                  hide-details
                   variant="plain"
                  class="col-lg-3  col-sm-6 mb-4">
                </v-text-field>
            </div>
          </section>

          <!-- Main Body - Growable Table -->
            <v-row>
                <v-col >
              <v-simple-table  >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="col-7">{{ $t('table.description') }}</th>
                      <th class="col-1">{{ $t('table.quantity') }}</th>
                      <th class="col-2">{{ $t('table.unitPrice') }}</th>
                      <th class="col-2">{{ $t('table.totalPrice') }}</th>
                      <th></th> <!-- Empty header for the delete icon -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in devis.items" :key="index">
                      <td>
                        <v-text-field
                        density="compact"
                          v-model="item.description"
                          placeholder="description de la tâche"
                          outlined
                          variant="plain"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model.number="item.quantity"
                          type="number"
                          density="compact"
                          variant="plain"
                          outlined
                          @input="calculateTotal(index)"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model.number="item.unitPrice"
                          variant = "plain"
                          type="number"
                          density="compact"
                          outlined
                          @input="calculateTotal(index)"
                        ></v-text-field>
                      </td>
                      <td>{{formatCurrency( item.totalPrice) }}</td>
                      <td>
                    <v-icon
                      color="red"
                      class="ml-2"
                      @click="removeItem(index)"
                    >
                      mdi-minus-circle-outline
                    </v-icon>
                  </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-btn @click="addItem" color="primary" class="mt-2">
            {{ $t('labels.addLine') }}
          </v-btn>
  
          <!-- Bottom Section - Automatic Calculation -->
                
        <v-container>
          <v-row class="justify-end">
            <v-col cols="auto">
              <v-card
                title ='Réglages'
                class="mx-auto ma-1 pa-1"
                width="330"
                outlined
                variant = 'tonal'
                color="primary"
              >
                <!-- Card content -->
                <v-card-text class="bg-surface-light ">
                  
                  <div class="d-flex justify-content-between align-items-center" >
                    <div class="mr-3" :class="{ 'mt-2': tvaEnabled === '0' }">
                    <span class="ml-2">{{ $t('Activer la TVA') }}</span>
                
                      <v-radio-group
                        v-model="tvaEnabled"
                        direction="horizontal"
                        inline
                        @change="handleTvaChange"
                        
                      >
                        <v-radio
                          label="Oui"
                          value="1"
                        ></v-radio>
                        <v-radio
                          label="Non"
                          value="0"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                  
                  <v-text-field
                    v-show="tvaEnabled === '1'"
                    v-model="devis.tvaRate"
                    label="TVA (en %)"
                    type="number"
                    :style="{ width: '30px', fontSize: '14px' }"
                    class="mt-3"
                    variant ="solo"
                    dense
                  ></v-text-field>
                </div>

                <v-divider class="my-2"></v-divider>
                <v-select
                  v-model="selectedCurrency"
                  :items="currencyCodes"
                  item-value="code"
                  item-text="name"
                  label="Select Currency"
                  return-object
                  :menu-props="{ maxHeight: '400' }"
                  class="mt-3"
                >
              <template v-slot:prepend-item>
                <v-list-item ripple>
                  <v-list-item-content>
                    <v-list-item-title>{{$t('Default Currency')}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!--TOTAL TABLE  --> 
        <v-col  cols="12" >
          <div class="d-flex flex-column align-end" >
            <v-simple-table dense class="invoice-totals-table" >
              <tbody>
                <tr>
                  <td class="text-right font-weight-medium" style="width:260px">{{ $t('labels.totalHT') }}</td>
                  <td class="text-right">{{ formatCurrency(totalHT) }} </td>
                </tr>
                <tr>
                  <td class="text-right font-weight-medium" style="width:260px">{{ $t('labels.tva') }} ({{ devis.tvaRate }}%)</td>
                  <td class="text-right">{{ formatCurrency(tva) }}</td>
                </tr>
                <tr class="total-ttc">
                  <td class="text-right font-weight-bold" style="width:260px">{{ $t('labels.totalTTC') }}</td>
                  <td class="text-right font-weight-bold">{{ formatCurrency(totalTTC) }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-col>

        <!-- Submit Button -->
        <v-btn @click="submitDevis" color="success" class="mt-5" block >
          {{ $t('Génerer le pdf') }}
        </v-btn>

        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
    import axios from 'axios';
    import { ref, onMounted, computed } from 'vue'; 
    import { useInfoGeneralStore } from '@/stores/InfoGeneral';
    export default {
      setup() {
      const infoGeneralStore = useInfoGeneralStore();
      const selectedCurrency = ref(null);

      onMounted(() => {
        infoGeneralStore.fetchServices();
        infoGeneralStore.fetchCurrencies().then(() => {
        // Set the default selected currency to the first item in the list
            if (infoGeneralStore.currencies.length > 0) {
                selectedCurrency.value = infoGeneralStore.currencies[0].code;     
            }
        });
      });

      const currencyCodes = computed(() => infoGeneralStore.currencies.map(currency => currency.code));
      const formatCurrency = (amount) => {
          const currency = infoGeneralStore.currencies.find(currency => currency.code === selectedCurrency.value);
          if (currency && currency.symbol) {
            return `${amount.toFixed(2)} ${currency.symbol}`;
          }
          return `${amount.toFixed(2)} €`; // Fallback if no currency is selected
        };

        return {
            infoGeneralStore,
            selectedCurrency,
            currencyCodes,
            formatCurrency
        };
      },
      data() {
        return {
          devis: {
            number: 1,
            companyName: "",
            adressPro : "",
            cityPro: "",
            siret: "",
            clientName: "",
            clientAdress:"",
            cityClient :"",
            clientSiret: "",
            tvaRate: 20,
            items: [{ description: "", quantity: 1, unitPrice: 0, totalPrice: 0 }],
          },
          tvaEnabled : '1',
        };
      },
      computed: {
        totalHT() {
          return this.devis.items.reduce((sum, item) => sum + item.totalPrice, 0);
        },
        tva() {        
          return this.tvaEnabled === '1' ? this.totalHT * (this.devis.tvaRate / 100) : 0;
        },
        totalTTC() {
          return this.totalHT + this.tva;
        },
      },
      methods: {
        addItem() {
          this.devis.items.push({
            description: "",
            quantity: 1,
            unitPrice: 0,
            totalPrice: 0,
          });
        },
        calculateTotal(index) {
          const item = this.devis.items[index];
          item.totalPrice = item.quantity * item.unitPrice;
        },
        removeItem(index) {
          this.devis.items.splice(index, 1); 
        },
        handleTvaChange(value) {
        if (value.target.value === '0') {
          this.devis.tvaRate = 0;  
        }else this.devis.tvaRate = 20;
       
      },
        async fetchCsrfCookie() {
        try {
          // This request will set the CSRF token cookie
          await axios.get('https://devis.medadev.com/sanctum/csrf-cookie');
        } catch (error) {
          console.error('Failed to fetch CSRF cookie:', error);
        }
      },
        async submitDevis() {
          await this.fetchCsrfCookie();
        try {
          const response = await axios.post("https://devis.medadev.com/api/devis", {
            pro_name: this.devis.companyName,
            pro_address: this.devis.adressPro,
            pro_city: this.devis.cityPro,
            pro_siret: this.devis.siret,
            client_name: this.devis.clientName,
            client_address: this.devis.clientAdress,
            client_city: this.devis.cityClient,
            client_siret: this.devis.clientSiret,
            description: this.devis.number, // TODO CHANGE add new field for devis number,
            amount: this.totalHT,
            tax_rate : this.devis.tvaRate,  
            date_devis: new Date().toISOString().split("T")[0],
            tasks: this.devis.items.map(item => ({
              item_description: item.description,
              item_price: item.unitPrice,
              item_quantity: item.quantity,
            })),
          });
          console.log(response.data);
          const devisId = response.data.devis.id; // change id by uuid
          this.generatePdf(devisId);
        // alert("Devis successfully submitted!");
        } catch (error) {
          console.error(error);
          alert("Verifier tout vos information.");
        }
      },
      async generatePdf(devisId) {
        try {
          
          const response = await axios.get(`https://devis.medadev.com/api/generate-pdf/${devisId}`, {
            responseType: 'blob', // Important for receiving binary data
          });

          // Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: 'application/pdf' });

          // Create a link element, use it to download the blob, then remove it
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = `devis_${devisId}.pdf`;
          link.click();
          URL.revokeObjectURL(fileURL);

        } catch (error) {
          console.error('Error generating PDF:', error);
          alert('Error generating PDF. Please try again.');
        }
      },
      },
    };
  </script>
  
  <style scoped>
  .plain-input .v-input__control {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
  padding: 0;
}

.plain-input .v-label {
  display: none; /* Hide the label */
}

.plain-input .v-input__slot {
  padding: 0;
  font-size: 16px; /* Adjust font size as needed */
}
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .v-card {
    padding: 20px;
  }
  
  .v-card-title {
    background-color: #f7f7f7;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .v-card-text {
    padding: 20px;
  }
  
  .v-text-field {
    margin-bottom: 15px;
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  
  th,
  td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f7f7f7;
  }
  .invoice-totals-table td {
  padding: 8px 12px; /* Adjust padding as necessary */
}

/* Style the left cells with a grey background */
.invoice-totals-table td:first-child {
  background-color: #f5f5f5; /* light grey background */
}

/* Style for the total TTC row specifically */
.invoice-totals-table tr.total-ttc td:first-child {
  background-color: #e0e0e0; /* slightly darker grey for emphasis */
}
/* Keep the right cells (values) with a white background */
.invoice-totals-table td:last-child {
  background-color: white;
}
  </style>
  @/stores/InfoGeneral
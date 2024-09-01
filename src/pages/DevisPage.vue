<template>
    <v-container class="mt-5">
      <v-card>
        <v-card-title>
          <h2 class="card-title">{{ $t('devis.number') }}</h2>
        </v-card-title>
        <v-card-text>
          <section>
            <div class="d-flex flex-column align-start mt-4">
              <v-text-field
                v-model="devis.number"
                :label="$t('devis.number')"
                dense
                hide-details
                 variant="plain"
                class="col-5 plain-input mb-0"
              ></v-text-field>
              <v-text-field
                v-model="devis.companyName"
                :label="$t('devis.companyName')"
                dense
                hide-details
                 variant="plain"
                class="col-5 mb-0"
              ></v-text-field>
              <v-text-field
                v-model="devis.adressPro"
                :label="$t('devis.adressPro')"
                dense
                hide-details
                  variant="plain"
                class="col-5 mb-0"
              ></v-text-field>
              <v-text-field
                v-model="devis.siret"
                :label="$t('devis.siret')"
                dense
                hide-details
                 variant="plain"
                class="col-5  plain-input mb-0"
              ></v-text-field>
            </div>
    
         <div class="d-flex flex-column align-end">
                <v-text-field 
                  v-model="devis.clientName"
                  :label="$t('devis.clientName')"
                  hide-details
                    variant="plain"
                  class="col-3 mb-0"> 
                </v-text-field>
                <v-text-field
                  v-model="devis.clientSiret"
                  :label="$t('devis.clientSiret')"
                  hide-details
                   variant="plain"
                  class="col-3 mb-4">
                </v-text-field>
            </div>
          </section>
   
          <!-- Main Body - Growable Table -->
            <v-row>
                <v-col >
              <v-simple-table >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="col-8">{{ $t('table.description') }}</th>
                      <th class="col-1">{{ $t('table.quantity') }}</th>
                      <th class="col-1">{{ $t('table.unitPrice') }}</th>
                      <th class="col">{{ $t('table.totalPrice') }}</th>
                      <th></th> <!-- Empty header for the delete icon -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in devis.items" :key="index">
                      <td>
                        <v-text-field
                        density="compact"
                          v-model="item.description"
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
                      <td>{{ item.totalPrice.toFixed(2) }} €</td>
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
          <v-btn @click="addItem" color="primary">
            {{ $t('labels.addLine') }}
          </v-btn>
  
          <!-- Bottom Section - Automatic Calculation -->
          <div class="d-flex flex-column align-end">
            <v-simple-table dense class="invoice-totals-table">
              <tbody>
                <tr>
                  <td class="text-right font-weight-medium">{{ $t('labels.totalHT') }}</td>
                  <td class="text-right">{{ totalHT.toFixed(2) }} €</td>
                </tr>
                <tr>
                  <td class="text-right font-weight-medium">{{ $t('labels.tva') }} ({{ tvaTaux }}%)</td>
                  <td class="text-right">{{ tva.toFixed(2) }} €</td>
                </tr>
                <tr class="total-ttc">
                  <td class="text-right font-weight-bold">{{ $t('labels.totalTTC') }}</td>
                  <td class="text-right font-weight-bold">{{ totalTTC.toFixed(2) }} €</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        devis: {
          number: 1,
          companyName: "",
          adressPro : "",
          siret: "",
          clientName: "",
          clientSiret: "",
          items: [{ description: "", quantity: 1, unitPrice: 0, totalPrice: 0 }],
        },
        taxRate: 0.2, // 20% VAT
      };
    },
  
    computed: {
      totalHT() {
        return this.devis.items.reduce((sum, item) => sum + item.totalPrice, 0);
      },
      tva() {
        return this.totalHT * this.taxRate;
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
  </style>
  
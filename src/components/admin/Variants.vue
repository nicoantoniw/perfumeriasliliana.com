<template>
  <div>
    <v-data-table
      style="margin-top:3rem;padding:1rem"
      :headers="headers"
      :search="search"
      :items="variants"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          color="black"
          class="elevation-5 mb-5 hidden-md-and-down"
          style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
          dark
        >
          <v-toolbar-title class="white--text">Variaciones</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            class="text-xs-center white--text"
            v-model="search"
            placeholder="Busqueda"
            single-line
            hide-details
            append-icon="mdi-magnify"
            color="white"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog :retain-focus="false" v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on }">
              <v-btn rounded color="white" class="mb-2 black--text" v-on="on">Nueva Variacion</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span>Nueva Variacion</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-text-field v-model="variant.code" label="Codigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-text-field v-model="variant.stock" label="Stock"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-checkbox
                        color="blue darken-1"
                        v-model="calculatedPriceCheckbox"
                        label="Calcular precio"
                        @change="calculatedPriceCheckbox === true"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="
                        finalPriceCheckbox || calculatedPriceCheckbox === false
                      "
                        v-model="variant.price"
                        label="Costo sin IVA"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="
                        finalPriceCheckbox || calculatedPriceCheckbox === false
                      "
                        v-model="variant.percentage"
                        label="Ganancia %"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-checkbox
                        color="blue darken-1"
                        v-model="finalPriceCheckbox"
                        label="Agregar precio publico directamente"
                        @change="
                        finalPriceCheckbox === true;
                        variant.price === 0;
                        variant.percentage === 0;
                      "
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="finalPriceCheckbox === false"
                        v-model="variant.finalPrice"
                        label="Precio Publico"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field v-show="false"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-checkbox
                        color="blue darken-1"
                        v-model="discountCheckbox"
                        label="Agregar descuento"
                        @change="discountCheckbox === true"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-text-field
                        :disabled="discountCheckbox === false"
                        v-model="variant.discount"
                        label="Descuento %"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="11" xs="11" md="4">
                      <v-autocomplete
                        color="black"
                        v-model="optionValue"
                        placeholder="Valores"
                        :items="optionsValues"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="7" sm="1" xs="1" md="7">
                      <v-icon color="black" class="mt-5" @click="addValue">add_circle</v-icon>
                    </v-col>
                  </v-row>
                  <v-data-table
                    :headers="headers2"
                    :items="variant.values"
                    class="elevation-1"
                    no-data-text="No se encontraron items"
                    no-results-text="No se encontraron resultados en la busqueda"
                    hide-default-footer
                  >
                    <template v-slot:item.action="{ item }" class="px-0">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon small v-on="on" @click="deleteValue(item)">mdi-delete</v-icon>
                        </template>
                        <span>Eliminar</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="clear">Cancelar</v-btn>
                <v-btn color="success" outlined @click="addVariant">Aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <!-- ---------------------- -->
        <!-- ---------------------- -->
        <!-- ---------------------- -->
        <v-toolbar
          height="250"
          color="primary"
          class="elevation-5 mb-5 hidden-lg-and-up"
          style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
          dark
        >
          <v-toolbar-title class="white--text">Opciones de producto</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            class="text-xs-center white--text"
            v-model="search"
            placeholder="Busqueda"
            single-line
            hide-details
            append-icon="mdi-magnify"
            color="white"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog :retain-focus="false" v-model="dialog2" max-width="1000px">
            <template v-slot:activator="{ on }">
              <v-btn rounded color="white" class="mb-2 black--text" v-on="on">Nueva Variacion</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span>Agregar Variacion</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field v-model="variant.code" label="Codigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field v-model="variant.stock" label="Stock"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field v-model="variant.price" label="Costo sin IVA"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field v-model="variant.percentage" label="Ganancia %"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-checkbox
                        color="blue darken-1"
                        v-model="discountCheckbox"
                        label="Agregar descuento"
                        @change="discountCheckbox === true"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="discountCheckbox === false"
                        v-model="variant.discount"
                        label="Descuento %"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="11" xs="11" md="4">
                      <v-autocomplete
                        color="black"
                        v-model="optionValue"
                        placeholder="Valores"
                        :items="optionsValues"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="7" sm="1" xs="1" md="7">
                      <v-icon color="black" @click="addValue">add_circle</v-icon>
                    </v-col>
                  </v-row>
                  <v-data-table
                    :headers="headers2"
                    :items="variant.values"
                    class="elevation-1"
                    no-data-text="No se encontraron items"
                    no-results-text="No se encontraron resultados en la busqueda"
                    hide-default-footer
                  >
                    <template v-slot:item.action="{ item }" class="px-0">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon small v-on="on" @click="deleteValue(item)">mdi-delete</v-icon>
                        </template>
                        <span>Eliminar</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="dialog4=false">Cancelar</v-btn>
                <v-btn color="success" outlined @click="addVariant">Aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }" class="px-0">
        <v-menu offset-y transition="slide-y-transition" open-on-click min-width="150px">
          <template v-slot:activator="{ on }">
            <v-icon text class="no-active" v-on="on">more_vert</v-icon>
          </template>
          <v-list>
            <v-list-item class="no-active" link @click="updateVariant(item)">
              <v-list-item-content>
                <v-list-item-title class>Editar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="deleteVariant(item)">
              <v-list-item-content>
                <v-list-item-title class>Eliminar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <p>No se encontraron items</p>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";

export default {
  name: "variants",
  data: () => ({
    headers: [
      { text: "Codigo", value: "code", sortable: true },
      { text: "Variacion", value: "name", sortable: true },
      { text: "Descuentos", value: "totalDiscounts", sortable: true },
      { text: "Publico", value: "finalPrice", sortable: true },
      { text: "Stock", value: "stock", sortable: true },
      { text: "", value: "action", sortable: false }
    ],
    headers2: [
      { text: "Valor", value: "value", sortable: true },
      { text: "", value: "action", sortable: false }
    ],
    search: "",
    dialog: false,
    dialog2: false,
    discountCheckbox: false,
    calculatedPriceCheckbox: false,
    finalPriceCheckbox: false,
    editedIndex: -1,
    variant: {
      values: [],
      stock: 0,
      code: "",
      price: 0,
      percentage: 0,
      discount: 0,
      finalPrice: 0
    },
    optionsValues: [],
    optionValue: "",
    variants: []
  }),
  created() {
    this.getOptions();
    this.getVariants();
  },
  methods: {
    async getVariants() {
      try {
        const response = await axios.get(
          `/product/variants/${this.$route.params.productId}`
        );
        const variants = response.data.variants;
        variants.forEach(variant => {
          variant.finalPrice = `$${variant.finalPrice}`;
          variant.totalDiscounts = `$${variant.totalDiscounts}`;
        });
        this.variants = variants;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async getOptions() {
      try {
        const response = await axios.get(
          `/product/options/${this.$route.params.productId}`
        );
        const options = response.data.options;
        options.map(x => {
          x.values.map(y => {
            this.optionsValues.push({
              text: y.value,
              value: y.value,
              id: y._id
            });
          });
        });
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async addVariant() {
      const data = {
        values: this.variant.values,
        stock: this.variant.stock,
        code: this.variant.code,
        price: this.variant.price,
        percentage: this.variant.percentage,
        discount: this.variant.discount,
        finalPrice: this.variant.finalPrice,
        discountFlag: this.discountCheckbox,
        calculatedPriceFlag: this.calculatedPriceCheckbox,
        finalPriceFlag: this.finalPriceCheckbox
      };
      const productId = this.$route.params.productId;
      try {
        if (this.editedIndex > -1) {
          await axios.put(`/product/variants/update/${productId}`, data);
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Opciones Agregadas"
          });
        } else {
          await axios.post(`/product/variants/add/${productId}`, data);
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Opciones Agregadas"
          });
        }
        this.getVariants();
        this.clear();
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    addValue() {
      const data = {
        value: this.optionValue
      };
      this.variant.values.push(data);
      this.$store.dispatch("showAlert", {
        status: true,
        type: "success",
        text: "Valor Agregado"
      });
      this.optionValue = "";
    },
    async updateVariant(item) {
      try {
        this.editedIndex = this.variants.indexOf(item);
        this.variant = Object.assign({}, item);
        this.dialog = true;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async deleteVariant(item) {
      const productId = this.$route.params.productId;
      const id = item._id;
      try {
        await axios.delete(`/product/variants/delete/${productId}/${id}`);
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Variacion eliminada"
        });
        this.getVariants();
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    deleteValue(item) {
      const index = this.variant.values.indexOf(item);
      this.variant.values.splice(index, 1);
      this.$store.dispatch("showAlert", {
        status: true,
        type: "success",
        text: "Valor eliminado"
      });
    },
    clear() {
      this.dialog = false;
      this.dialog2 = false;
      this.editedIndex = -1;
      this.discountCheckbox = false;
      this.calculatedPriceCheckbox = false;
      this.finalPriceCheckbox = false;
      this.variant.values = [];
      this.variant.stock = 0;
      this.variant.code = "";
      this.variant.price = 0;
      this.variant.percentage = 0;
      this.variant.discount = 0;
      this.variant.finalPrice = 0;
      this.optionValue = "";
    }
  }
};
</script>

<style lang="scss">
</style>
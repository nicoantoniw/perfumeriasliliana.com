<template>
  <div>
    <v-data-table
      style="margin-top:3rem;padding:1rem"
      :headers="headers"
      :search="search"
      :items="products"
      class="elevation-1"
      @click:row="log"
    >
      <template v-slot:top>
        <v-toolbar
          color="black"
          class="elevation-5 mb-5 hidden-md-and-down"
          style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
          dark
        >
          <v-toolbar-title class="white--text">Lista de Productos</v-toolbar-title>
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
              <v-btn v-on="on" rounded color="white" class="mb-2 black--text">Importacion masiva</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span>Importar Productos</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-file-input
                        chips
                        counter
                        show-size
                        color="blue darken-1"
                        label="Seleccione un archivo"
                        v-model="file"
                        outlined
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="dialog2=false">Cancelar</v-btn>
                <v-btn color="success" :disabled="!file" outlined @click="importProducts">Importar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-progress-circular class="ml-5" color="white" v-if="loader5" indeterminate></v-progress-circular>
          <v-spacer></v-spacer>
          <v-dialog :retain-focus="false" v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on }">
              <v-btn rounded color="white" class="mb-2 black--text" v-on="on">Nuevo Producto</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class>{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-text-field v-model="product.name" label="Producto"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-text-field v-model="product.brand" label="Marca"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-text-field v-model="product.description" label="Descripcion"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-text-field v-model="product.code" label="Codigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-text-field v-model="product.stock" label="Stock"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-select v-model="product.category" :items="categories" label="Categoria"></v-select>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-select v-model="product.iva" :items="ivas" label="IVA %"></v-select>
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
                        v-model="product.price"
                        label="Costo sin IVA"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="
                        finalPriceCheckbox || calculatedPriceCheckbox === false
                      "
                        v-model="product.percentage"
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
                        product.price === 0;
                        product.percentage === 0;
                      "
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="finalPriceCheckbox === false"
                        v-model="product.finalPrice"
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
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="discountCheckbox === false"
                        v-model="product.discount"
                        label="Descuento %"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="dialog=false">Cancelar</v-btn>
                <v-btn color="success" outlined @click="addProduct">{{ buttonTitle }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-toolbar
          height="250"
          color="primary"
          class="elevation-5 mb-5 hidden-lg-and-up"
          style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
          dark
        >
          <v-toolbar-title class="white--text">Lista de Productos</v-toolbar-title>
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
              <v-btn rounded color="secondary" class="mb-2" v-on="on">Nuevo Producto</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class>{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-text-field v-model="product.name" label="Producto"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-text-field v-model="product.brand" label="Marca"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-text-field v-model="product.description" label="Descripcion"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-text-field v-model="product.code" label="Codigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-text-field v-model="product.stock" label="Stock"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-select v-model="product.category" :items="categories" label="Categoria"></v-select>
                    </v-col>
                    <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                      <v-select v-model="product.iva" :items="ivas" label="IVA %"></v-select>
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
                        v-model="product.price"
                        label="Costo sin IVA"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="
                        finalPriceCheckbox || calculatedPriceCheckbox === false
                      "
                        v-model="product.percentage"
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
                        product.price === 0;
                        product.percentage === 0;
                      "
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="finalPriceCheckbox === false"
                        v-model="product.finalPrice"
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
                    <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                      <v-text-field
                        :disabled="discountCheckbox === false"
                        v-model="product.discount"
                        label="Descuento %"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="dialog=false">Cancelar</v-btn>
                <v-btn color="success" outlined @click="addProduct">{{ buttonTitle }}</v-btn>
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
            <v-list-item class="no-active" link @click="updateProduct(item)">
              <v-list-item-content>
                <v-list-item-title class>Editar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="openDialog3(item)">
              <v-list-item-content>
                <v-list-item-title class>Opciones</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'variants',params:{productId:item._id} }"
            >
              <v-list-item-content>
                <v-list-item-title class>Variantes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="addToWebsite(item._id)">
              <v-list-item-content>
                <v-list-item-title class>Agregar a la pagina</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="addToFeatured(item._id)">
              <v-list-item-content>
                <v-list-item-title class>Agregar a destacados</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="addToPromotions(item._id)">
              <v-list-item-content>
                <v-list-item-title class>Agregar a promociones</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="deleteProduct(item)">
              <v-list-item-content>
                <v-list-item-title class>Eliminar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <p>No se encontraron productos</p>
      </template>
    </v-data-table>

    <v-dialog :retain-focus="false" v-model="dialog3" min-width="90%">
      <v-card>
        <v-card-title>
          <span>Agregar opcion</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" lg="4" sm="12" xs="12" md="4">
                <v-select color="black" v-model="option" :items="options"></v-select>
              </v-col>
              <v-col cols="12" lg="1" sm="12" xs="12" md="1">
                <v-icon color="black" @click="addOption">add_circle</v-icon>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers2"
              :items="productOptions"
              class="elevation-1"
              no-data-text="No se encontraron items"
              no-results-text="No se encontraron resultados en la busqueda"
              hide-default-footer
            >
              <template v-slot:item.action="{ item }" class="px-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on" @click="deleteOption(item)">mdi-delete</v-icon>
                  </template>
                  <span>Eliminar</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outlined @click="dialog3=false;productOptions=[]">Cancelar</v-btn>
          <v-btn color="success" outlined @click="addOptions">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";

export default {
  name: "adminProducts",
  data: () => ({
    headers: [
      {
        text: "Codigo",
        align: "left",
        sortable: true,
        value: "code"
      },
      { text: "Marca", value: "brand", sortable: true },
      { text: "Nombre", value: "name", sortable: true },
      { text: "Descripcion", value: "description", sortable: false },
      { text: "Categoria", value: "category.name", sortable: true },
      { text: "Descuentos", value: "totalDiscounts", sortable: false },
      { text: "Precio Publico", value: "finalPrice", sortable: true },
      { text: "Stock", value: "stock", sortable: false },
      { text: "Estado", value: "websiteState", sortable: false },
      { text: "", value: "action", sortable: false }
    ],
    headers2: [
      {
        text: "Opcion",
        align: "left",
        sortable: true,
        value: "option"
      },
      { text: "", value: "action", sortable: false }
    ],
    headers3: [
      {
        text: "Valor",
        align: "left",
        sortable: true,
        value: "value"
      },
      { text: "", value: "action", sortable: false }
    ],
    loader5: false,
    search: "",
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    file: null,
    products: [],
    finalPriceCheckbox: false,
    discountCheckbox: false,
    calculatedPriceCheckbox: false,
    editedIndex: -1,
    ivas: [0, 21, 27, 10.5],
    product: {
      name: "",
      brand: "",
      iva: 21,
      description: "",
      code: "",
      category: "",
      price: 0,
      percentage: 0,
      stock: 0,
      finalPrice: 0,
      discount: 0
    },
    categories: [],
    options: [],
    productOptions: [],
    option: ""
  }),
  created() {
    this.getProducts();
    this.getCategories();
    this.getOptions();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo Producto"
        : `${this.product.name}`;
    },
    buttonTitle() {
      return this.editedIndex === -1 ? "Guardar" : `Editar`;
    }
  },
  methods: {
    log(item) {
      console.log(item);
    },
    async getProducts() {
      try {
        const response = await axios.get(
          `/website/user/products-perfumerialiliana`
        );
        const products = response.data.products;
        products.forEach(product => {
          if (
            product.websiteStatus === 1 &&
            product.websiteFeaturedStatus === 0 &&
            product.websitePromotionsStatus === 0
          ) {
            product.websiteState = "Producto en la pagina";
          } else if (product.websiteFeaturedStatus === 1) {
            product.websiteState = "Producto en destacados";
          } else if (product.websitePromotionsStatus === 1) {
            product.websiteState = "Producto en promociones";
          } else {
            product.websiteState = "No se encuentra en la pagina";
          }
        });
        this.products = products;
      } catch (err) {
        errorAlertHandler(err, err.message);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get(`/category/categories`);
        let categoriesr = response.data.categories;
        categoriesr.map(x => {
          this.categories.push({ text: x.name, value: x._id });
        });
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async getOptions() {
      try {
        const response = await axios.get(`/option/options`);
        const options = response.data.options;
        options.map(x => {
          this.options.push({ text: x.name, value: x.name });
        });
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async addToWebsite(item) {
      const data = {
        productId: item,
        status: 1,
        websiteFeaturedStatus: 0,
        websitePromotionsStatus: 0
      };
      try {
        const response = await axios.put(`/website/admin/edit`, data);
        await this.getProducts();
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Producto agregado a la pagina web"
        });
      } catch (err) {
        errorAlertHandler(err, "not found");
      }
    },
    async addToFeatured(item) {
      const data = {
        productId: item,
        status: 1,
        websiteFeaturedStatus: 1,
        websitePromotionsStatus: 0
      };
      try {
        const response = await axios.put(`/website/admin/edit`, data);
        await this.getProducts();
        this.dialog = false;
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Producto agregado a destacados"
        });
      } catch (err) {
        errorAlertHandler(err, "not found");
      }
    },
    async addToPromotions(item) {
      const data = {
        productId: item,
        status: 1,
        websiteFeaturedStatus: 0,
        websitePromotionsStatus: 1
      };
      try {
        const response = await axios.put(`/website/admin/edit`, data);
        await this.getProducts();
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Producto agregado a promociones"
        });
      } catch (err) {
        errorAlertHandler(err, "not found");
      }
    },
    async addProduct() {
      let finalPriceFlag = false;
      let discountFlag = false;
      let calculatedPriceFlag = false;
      if (this.finalPriceCheckbox) {
        finalPriceFlag = true;
      }
      if (this.discountCheckbox) {
        discountFlag = true;
      }
      if (this.calculatedPriceCheckbox) {
        calculatedPriceFlag = true;
      }
      if (this.editedIndex > -1) {
        const data = {
          name: this.product.name,
          brand: this.product.brand,
          description: this.product.description,
          code: this.product.code,
          category: this.product.category,
          price: Number(this.product.price).toFixed(2),
          percentage: Number(this.product.percentage),
          stock: Number(this.product.stock),
          iva: this.product.iva,
          finalPrice: this.product.finalPrice,
          discount: this.product.discount,
          finalPriceFlag,
          discountFlag,
          calculatedPriceFlag
        };
        try {
          await axios.put(`/product/update/${this.product._id}`, data);
          this.dialog = false;
          this.clear();
          this.getProducts();

          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Producto actualizado"
          });
        } catch (err) {
          errorAlertHandler(err, "Producto no encontrado");
        }
      } else {
        const data = {
          name: this.product.name,
          brand: this.product.brand,
          description: this.product.description,
          code: this.product.code,
          category: this.product.category,
          price: Number(this.product.price).toFixed(2),
          percentage: Number(this.product.percentage),
          stock: Number(this.product.stock),
          iva: this.product.iva,
          finalPrice: this.product.finalPrice,
          discount: this.product.discount,
          discountFlag,
          finalPriceFlag,
          calculatedPriceFlag
        };
        try {
          await axios.post(`/product/add`, data);
          this.dialog = false;
          this.clear();
          this.getProducts();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Producto creado"
          });
        } catch (err) {
          errorAlertHandler(err, "No encontrado");
        }
      }
    },
    async importProducts() {
      this.dialog2 = false;
      this.loader5 = true;
      const fd = new FormData();
      fd.append("file", this.file);
      try {
        await axios.post(`/product/add-massive`, fd);
        await this.getProducts();
        this.loader5 = false;
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Productos importados"
        });
        window.location.reload();
      } catch (err) {
        this.loader = false;
        this.file = null;
        errorAlertHandler(err, "No encontrado");
      }
    },
    async updateProduct(item) {
      try {
        this.editedIndex = this.products.indexOf(item);
        const response = await axios.get(`/product/products/${item.name}`);
        const product = response.data.product;
        this.product = product;
        this.dialog = true;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async addOptions() {
      const data = {
        options: this.productOptions
      };
      const productId = this.product._id;
      try {
        await axios.put(`/product/options/${productId}`, data);
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Opciones Agregadas"
        });
        this.getProducts();
        this.productOptions = [];
        this.clear();
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    addOption() {
      const data = {
        option: this.option
      };
      this.productOptions.push(data);
      this.$store.dispatch("showAlert", {
        status: true,
        type: "success",
        text: "Valor Agregado"
      });
      this.value = "";
    },
    deleteOption(item) {
      const index = this.productOptions.indexOf(item);
      this.productOptions.splice(index, 1);
      this.$store.dispatch("showAlert", {
        status: true,
        type: "success",
        text: "Opcion eliminada"
      });
    },
    async deleteProduct(item) {
      try {
        if (confirm("Eliminar item?")) {
          await axios.delete(`/product/delete/${item._id}`);
          this.getProducts();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Producto eliminado"
          });
        } else {
          return;
        }
      } catch (err) {
        errorAlertHandler(err, "Producto no encontrado");
      }
    },
    async openDialog3(item) {
      try {
        for (let index = 0; index < item.options.length; index++) {
          const x = item.options[index];
          const response = await axios.get(`/option/options/${x}`);
          const option = response.data.option;
          this.productOptions.push({ option: option.name });
        }
        this.product = item;
        this.dialog3 = true;
      } catch (err) {
        errorAlertHandler(err, "Producto no encontrado");
      }
    },
    clear() {
      this.product.name = "";
      this.product.brand = "";
      this.product.iva = 21;
      this.product.description = "";
      this.product.code = "";
      this.product.category = "";
      this.product.price = 0;
      this.product.percentage = 0;
      this.product.stock = 0;
      this.editedIndex = -1;
      this.product.finalPrice = 0;
      this.finalPriceCheckbox = false;
      this.discountCheckbox = false;
      this.calculatedPriceCheckbox = false;
      this.option = "";
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialog4 = false;
    }
  }
};
</script>

<style  lang="scss">
.v-navigation-drawer {
  .v-navigation-drawer__content {
    h2 {
      color: white;
    }
    .spacer {
      color: white;
      width: 100%;
    }
  }
}
table {
  tbody {
    td {
    }
    tr {
      :hover {
        cursor: pointer;
      }
    }
  }
}
</style>
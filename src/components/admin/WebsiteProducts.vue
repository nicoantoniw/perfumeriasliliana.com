<template>
  <div>
    <v-data-table
      style="margin-top:3rem"
      :headers="headers"
      :search="search"
      :items="products"
      class="elevation-1"
      show-select
      item-key="._id"
      v-model="selected"
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
          <v-spacer />
          <v-dialog :retain-focus="false" v-model="dialog2" max-width="1000px">
            <template v-slot:activator="{ on }">
              <v-btn color="white" class="black--text" v-on="on">CAMBIAR CATEGORIA</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span>Cambiar Categoria</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="12" sm="12" xs="12" md="12">
                      <v-select v-model="category" :items="categories" label="Categoría"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="dialog2=false">Cancelar</v-btn>
                <v-btn color="success" outlined @click="changeCategories">Aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }" class="px-0">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mr-2" @click="openDialog(item)">mdi-camera</v-icon>
          </template>
          <span>Cargar imagen</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="removeFromWebsite(item)">mdi-delete</v-icon>
          </template>
          <span>Sacar de la pagina</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <p>No se encontraron productos</p>
      </template>
    </v-data-table>

    <v-dialog :retain-focus="false" v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class>Cargar imagen</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" sm="12" md="12" xs="12">
                <v-file-input
                  chips
                  counter
                  show-size
                  color="blue darken-1"
                  label="Seleccione una imagen"
                  v-model="file"
                  outlined
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outlined @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success" @click="uploadImage">Cargar imagen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";

export default {
  name: "websiteProducts",
  data: () => ({
    headers: [
      {
        text: "Codigo",
        align: "left",
        sortable: true,
        value: "code"
      },
      { text: "Nombre", value: "name", sortable: true },
      { text: "Descripcion", value: "description", sortable: false },
      { text: "Categoria", value: "category.name", sortable: true },

      { text: "Descuentos", value: "totalDiscounts", sortable: false },
      { text: "Precio Publico", value: "finalPrice", sortable: true },
      { text: "Stock", value: "stock", sortable: false },
      { text: "", value: "action", sortable: false }
    ],
    selected: [],
    search: "",
    dialog: false,
    dialog2: false,
    file: null,
    productId: "",
    products: [],
    category: "",
    categories: []
  }),
  created() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get(`/website/admin/products`);
        const products = response.data.products;
        products.forEach(product => {});
        this.products = products;
      } catch (err) {
        console.log(err);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get(`/category/categories`);
        let categories = response.data.categories;
        categories.map(x => {
          this.categories.push({ text: x.name, value: x._id });
        });
      } catch (err) {
        console.log(err);
      }
    },
    async changeCategories() {
      const data = {
        products: this.selected,
        category: this.category
      };
      await axios.post(`website/admin/change-categories`, data);
      this.getCategories();
      this.dialog2 = false;
      this.$store.dispatch("showAlert", {
        status: true,
        type: "success",
        text: "Productos actualizados"
      });
    },
    async removeFromWebsite(item) {
      const index = this.products.indexOf(item);
      const data = {
        productId: item._id,
        status: 0,
        websiteFeaturedStatus: 0,
        websitePromotionsStatus: 0
      };
      try {
        const response = await axios.put(`/website/admin/edit`, data);
        this.products.splice(index, 1);
        await this.getProducts();
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Producto eliminado del carrito"
        });
      } catch (err) {
        errorAlertHandler(err, "not found");
      }
    },
    async uploadImage() {
      const productId = this.productId;
      const fd = new FormData();
      fd.append("file", this.file);
      try {
        const response = await axios.post(
          `/product/add-image/${productId}`,
          fd
        );
        this.dialog = false;
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Imagen actualizada"
        });
      } catch (err) {
        errorAlertHandler(err, "not found");
      }
    },
    openDialog(item) {
      this.dialog = true;
      this.productId = item._id;
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
</style>
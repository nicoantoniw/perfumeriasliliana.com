<template>
  <v-data-table
    style="margin-top:3rem;padding:1rem"
    :headers="headers"
    :search="search"
    :items="products"
    class="elevation-1"
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
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }" class="px-0">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon class="mr-2" v-on="on" @click="addToWebsite(item._id)">mdi-web</v-icon>
        </template>
        <span>Agregar a la pagina</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon class="mr-2" v-on="on" @click="addToFeatured(item._id)">mdi-star</v-icon>
        </template>
        <span>Agregar a destacados</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" @click="addToPromotions(item._id)">mdi-cash-usd</v-icon>
        </template>
        <span>Agregar a promociones</span>
      </v-tooltip>
    </template>
    <template v-slot:no-data>
      <p>No se encontraron productos</p>
    </template>
  </v-data-table>
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
      { text: "Nombre", value: "name", sortable: true },
      { text: "Descripcion", value: "description", sortable: false },
      { text: "Categoria", value: "category.name", sortable: true },
      { text: "Descuentos", value: "totalDiscounts", sortable: false },
      { text: "Precio Publico", value: "finalPrice", sortable: true },
      { text: "Stock", value: "stock", sortable: false },
      { text: "Estado", value: "websiteState", sortable: false },
      { text: "", value: "action", sortable: false }
    ],
    search: "",
    dialog: false,
    products: []
  }),
  created() {
    this.getProducts();
  },
  methods: {
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
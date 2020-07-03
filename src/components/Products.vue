<template>
  <div>
    <v-icon class="mt-3 mb-8 ml-8" color="black" @click="goBack" x-large>arrow_back</v-icon>
    <div class="products-container">
      <div class="toolbar">
        <h1>Ajustá tu Búsqueda</h1>
        <v-select
          append-icon="keyboard_arrow_down"
          :items="filterPreferences"
          v-model="filterPreference"
          placeholder="Precio"
          color="black"
          solo
          @change="getProductsByPrice"
          style="margin-top:3rem"
        ></v-select>
        <v-select
          append-icon="keyboard_arrow_down"
          :items="sortedPreferences"
          v-model="sortedPreference"
          color="black"
          placeholder="Ordenar por"
          solo
          @change="getProductsByPrice"
        ></v-select>
      </div>
      <div class="products">
        <h2 class="products-title">Productos</h2>
        <v-row>
          <v-col cols="12" lg="12" sm="12" xs="12" md="12">
            <v-autocomplete
              clearable
              :items="allProducts"
              color="black"
              outlined
              v-model="selectedProduct"
              @change="showOnlySelectedProduct"
              placeholder="Busqueda"
              append-icon="search"
              no-data-text="No se encontraron resultados"
              class="mb-5"
              full-width
            ></v-autocomplete>
          </v-col>
        </v-row>
        <div class="product-boxes">
          <div v-if="skeleton" class="product-box">
            <v-skeleton-loader type="card" min-width="300px"></v-skeleton-loader>
          </div>
          <div v-if="skeleton" class="product-box">
            <v-skeleton-loader type="card" min-width="300px"></v-skeleton-loader>
          </div>
          <div v-if="skeleton" class="product-box">
            <v-skeleton-loader type="card" min-width="300px"></v-skeleton-loader>
          </div>
          <div v-if="skeleton" class="product-box">
            <v-skeleton-loader type="card" min-width="300px"></v-skeleton-loader>
          </div>
          <div v-if="skeleton" class="product-box">
            <v-skeleton-loader type="card" min-width="300px"></v-skeleton-loader>
          </div>
          <div v-if="skeleton" class="product-box">
            <v-skeleton-loader type="card" min-width="300px"></v-skeleton-loader>
          </div>
          <div v-else class="product-box" v-for="product in filterProducts" :key="product._id">
            <div class="product-title">
              <h3>{{product.name}}</h3>
            </div>
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-price">
              <p>{{product.finalPrice}}</p>
            </div>
            <v-btn
              class="product-btn"
              link
              :to="{ name: 'product',params:{productId:product._id} }"
              outlined
            >Ver producto</v-btn>
          </div>
        </div>
        <v-pagination
          color="black"
          @input="getProductsByPrice()"
          :length="paginationLength"
          v-model="page"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";

export default {
  name: "product",
  data: () => ({
    products: [],
    allProducts: [],
    selectedProduct: "",
    sortedPreference: 0,
    sortedPreferences: [
      { text: "Precio menor a mayor", value: 1 },
      { text: "Precio mayor a menor", value: -1 }
    ],
    filterPreferences: [
      { text: "Todos", value: -2 },
      { text: "$0 - $500", value: 0 },
      { text: "$500 - $1000", value: 500, value2: 500 },
      { text: "$1000 - $1500", value: 1000, value2: 1500 },
      { text: "$1500 - $3000", value: 1500, value2: 3000 },
      { text: "+ $3000", value: 3000, value2: 50000 }
    ],
    filterPreference: -1,
    search: null,
    skeleton: true,
    page: 1,
    paginationLength: 1
  }),
  created() {
    this.getProducts();
    this.getProductsNoPagination();
  },
  watch: {
    "$route.params.category"() {
      this.getProducts();
    }
  },
  computed: {
    filterProducts() {
      if (this.search) {
        return this.products.filter(product => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => product.name.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    }
  },

  methods: {
    async getProducts() {
      this.skeleton = true;
      try {
        const response = await axios.get(
          `/website/admin/products/${this.$route.params.category}?page=${this.page}&sort=${this.sortedPreference}`
        );
        const products = response.data.products;
        products.forEach(product => {
          product.finalPrice = `$${product.finalPrice}`;
        });
        this.products = products;
        let num = response.data.totalItems % 6;
        if (num === 0) {
          this.paginationLength = Math.floor(response.data.totalItems / 6);
        } else {
          this.paginationLength = Math.floor(response.data.totalItems / 6) + 1;
        }
        this.skeleton = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getProductsNoPagination() {
      try {
        const response = await axios.get(
          `/website/admin/products/${
            this.$route.params.category
          }?pagination=${true}`
        );
        const products = response.data.products;
        products.map(x => {
          this.allProducts.push({ text: x.name, value: x._id });
        });
      } catch (err) {
        console.log(err);
      }
    },
    async showOnlySelectedProduct() {
      let response;
      try {
        if (!this.selectedProduct) {
          return this.getProducts();
        } else {
          response = await axios.get(
            `/website/user/products-perfumerialiliana/${this.selectedProduct}`
          );
        }
        const product = response.data.product;
        product.finalPrice = `$${product.finalPrice}`;
        this.products = [];
        this.products.push(product);
      } catch (err) {
        console.log(err);
      }
    },
    async getProductsByPrice() {
      this.skeleton = true;
      let value2;
      const filteredProducts = [];
      switch (this.filterPreference) {
        case -1:
          value2 = 50000;
          break;
        case -2:
          value2 = 50000;
          break;
        case 0:
          value2 = 500;
          break;
        case 500:
          value2 = 1000;
          break;
        case 1000:
          value2 = 1500;
          break;
        case 1500:
          value2 = 3000;
          break;
        case 3000:
          value2 = 50000;
          break;
        default:
          break;
      }
      try {
        const response = await axios.get(
          `/website/admin/products/${this.$route.params.category}?sort=${this.sortedPreference}&page=${this.page}`
        );
        const products = response.data.products;
        products.forEach(product => {
          if (
            product.finalPrice >= this.filterPreference &&
            product.finalPrice <= value2
          ) {
            product.finalPrice = `$${product.finalPrice}`;
            filteredProducts.push(product);
          }
        });
        this.products = filteredProducts;
        let num = response.data.totalItems % 6;
        if (num === 0) {
          this.paginationLength = Math.floor(response.data.totalItems / 6);
        } else {
          this.paginationLength = Math.floor(response.data.totalItems / 6) + 1;
        }
        this.skeleton = false;
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: flex-start;
  margin-top: 3rem;
  .toolbar {
    grid-column: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .products {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    grid-column: 2 / span 4;

    .products-title {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 3rem;
    }
    .product-boxes {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1rem;
      margin-bottom: 3rem;
      .product-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 3px 4px 8px 0 rgba(0, 0, 0, 0.2);
        padding: 2rem;
        // border: 1px solid rgba(0, 0, 0, 0.4);
        height: 500px;
        width: 400px;
        text-align: center;
        .product-title {
          font-size: 1.5rem;
          height: 100px;
        }
        .product-image {
          img {
            height: 200px;
          }
        }
        .product-price {
          font-size: 1.3rem;
        }
        .product-btn {
          transition: 0.2s ease-in-out;
          &:hover {
            background: #000;
            color: white;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1264px) {
  .products-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    .toolbar {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .products {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;

      .products-title {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 3rem;
      }
      .product-boxes {
        display: flex;
        flex-direction: column;
        margin-bottom: 3rem;
        .product-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 3px 4px 8px 0 rgba(0, 0, 0, 0.2);
          padding: 2rem;
          // border: 1px solid rgba(0, 0, 0, 0.4);
          height: 500px;
          width: 400px;
          text-align: center;
          .product-title {
            font-size: 1.5rem;
            height: 100px;
          }
          .product-image {
            img {
              height: 200px;
            }
          }
          .product-price {
            font-size: 1.3rem;
          }
          .product-btn {
            transition: 0.2s ease-in-out;
            &:hover {
              background: #000;
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>
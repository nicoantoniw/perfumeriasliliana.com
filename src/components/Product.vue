<template>
  <div>
    <v-icon class="mb-8 ml-8" color="black" @click="goBack" x-large>arrow_back</v-icon>
    <div class="product-container">
      <div class="product-image">
        <img :src="image" :alt="`img-${name}`" />
      </div>
      <div class="product-options">
        <h1 class="product-title">{{name}}</h1>
        <h1 class="product-price">${{finalPrice}}</h1>
        <div class="size">
          <p>Tamaño</p>
          <v-select color="black" outlined :items="quantities" v-model="quantity" label="Cantidad"></v-select>
        </div>
        <v-btn
          v-if="authenticated"
          :disabled="quantity ===0"
          color="secondary"
          class="white--text"
          @click="addToCart"
          large
        >AGREGAR AL CARRITO</v-btn>
        <v-btn
          v-else
          :disabled="true"
          color="secondary"
          class="white--text"
          @click="addToCart"
          large
        >INICIA SESION PARA AGREGAR AL CARRITO</v-btn>
        <v-divider class="mb-5"></v-divider>
        <div class="product-description">
          <h2>Descripción</h2>
          <p>{{description}}</p>
        </div>
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
    quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    quantity: 0,
    name: "",
    description: "",
    finalPrice: 0,
    productId: "",
    image: ""
  }),
  created() {
    this.getProduct();
  },
  computed: {
    authenticated() {
      return this.$store.state.token;
    }
  },
  methods: {
    async getProduct() {
      const productId = this.$route.params.productId;
      try {
        const response = await axios.get(
          `/website/user/products-perfumerialiliana/${productId}`
        );
        const product = response.data.product;
        this.name = product.name;
        this.description = product.description;
        this.finalPrice = product.finalPrice;
        this.image = product.image;
        this.productId = product._id;
      } catch (error) {
        errorAlertHandler(error, "error");
      }
    },
    async addToCart() {
      const data = {
        product: this.productId,
        quantity: this.quantity,
        price: this.finalPrice,
        image: this.image,
        name: this.name
      };
      try {
        await axios.post(`/website/user/add`, data);
        const response = await axios.get(
          `/website/user/cart/${this.$store.state.userId}`
        );
        let cartItems = response.data.cart.items.length;
        this.$store.dispatch("cart", cartItems);
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Item agregado al carrito"
        });
      } catch (error) {
        errorAlertHandler(error, "error");
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  margin-top: 3rem;
  .product-image {
    margin: auto;
    img {
      height: 600px;
      width: 600px;
    }
  }
  .product-options {
    margin-right: auto;
    margin-top: 3rem;
    .product-title {
      margin-bottom: 1rem;
    }
    .product-price {
      margin-bottom: 1rem;
    }
    .size {
      p {
        font-size: 1.5rem;
      }
    }
    .v-select {
      color: black;
      width: 30%;
    }
    .product-description {
      width: 500px;
    }
    .v-btn {
      margin-bottom: 2rem;
    }
  }
}
</style>
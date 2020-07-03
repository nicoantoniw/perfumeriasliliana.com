<template>
  <div>
    <v-icon class="mt-2 mb-8 ml-8" color="black" @click="goBack" x-large>arrow_back</v-icon>
    <div class="product-container">
      <div class="product-image">
        <img :src="image" :alt="`img-${name}`" />
      </div>
      <div class="product-options">
        <h1 class="product-title">{{name}}</h1>
        <h1 class="product-price">${{finalPrice}}</h1>
        <div v-if="hasVariants" class="size">
          <div v-for="option in options" :key="option.name">
            <v-select
              color="black"
              outlined
              :items="option.values"
              :value="selectedOption"
              @input="addSelectedOption($event)"
              :label="option.name"
            ></v-select>
          </div>
        </div>
        <v-select
          v-if="hasVariants"
          color="black"
          :disabled="disabled"
          outlined
          :items="quantities"
          v-model="quantity"
          label="Cantidad"
        ></v-select>
        <v-select
          v-else
          color="black"
          outlined
          :items="quantities"
          v-model="quantity"
          label="Cantidad"
        ></v-select>
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
    image: "",
    hasVariants: false,
    hasColors: false,
    hasSizes: false,
    disabled: true,
    variants: [],
    optionsIds: [],
    options: [],
    variant: "",
    selectedOption: "",
    selectedOptions: []
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
        this.hasVariants = product.hasVariants;
        if (this.hasVariants) {
          this.variants = product.variants;
          this.optionsIds = product.options;
          this.getOption();
        }
      } catch (error) {
        errorAlertHandler(error, "error");
      }
    },
    async getOption() {
      try {
        this.optionsIds.map(async id => {
          const response = await axios.get(`/option/options/${id}`);
          const option = response.data.option;
          option.values.forEach(value => {
            value.text = value.value;
          });
          this.options.push(option);
        });
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
        name: this.name,
        hasVariants: false
      };
      if (this.hasVariants) {
        data.hasVariants = true;
        data.variant = this.variant._id;
      }
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
    addSelectedOption(e) {
      let variantOptions = [];
      let convertedArray = [];
      this.selectedOptions.push(e);
      if (this.selectedOptions.length < this.variants[0].values.length) {
        return (this.disabled = true);
      } else if (this.selectedOptions.length > this.variants[0].values.length) {
        this.selectedOptions.splice(0, this.variants[0].values.length);
        return (this.disabled = true);
      } else {
        this.selectedOptions.sort();
        convertedArray = JSON.parse(JSON.stringify(this.selectedOptions));
        this.variants.forEach(variant => {
          variant.values.forEach(value => {
            variantOptions.push(value.value);
            if (variantOptions.length < this.variants[0].values.length) {
              return;
            }
            if (variantOptions.length > this.variants[0].values.length) {
              return variantOptions.splice(0, this.variants[0].values.length);
            } else {
              variantOptions.sort();
              if (
                variantOptions.every(
                  (val, index) => val === convertedArray[index]
                )
              ) {
                this.finalPrice = variant.finalPrice;
                this.variant = variant;
                this.disabled = false;
              }
            }
          });
        });
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
@media only screen and (max-width: 1264px) {
  .product-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    .product-image {
      margin: 0;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .product-options {
      margin-right: 0;
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
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
        width: 50%;
        margin: auto;
      }
      .product-description {
        width: 500px;
        display: none;
      }
      .v-btn {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
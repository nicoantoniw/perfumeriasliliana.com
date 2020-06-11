<template>
  <div>
    <div class="showcase-container">
      <div class="overlay"></div>
      <v-carousel
        continuous
        cycle
        hide-delimiter-background
        show-arrows
        hide-delimiters
        height="90vh"
      >
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <!-- ------------------------------------------------------------- -->
    <!-- ------------------------------------------------------------- -->
    <!-- ------------------------------------------------------------- -->
    <div class="delivery-free-banner">
      <v-icon large color="white">mdi-truck-delivery</v-icon>
      <h2>Envios gratis a todo el pais en compras mayores a $4000</h2>
    </div>
    <!-- ----------------------------------------------------------- -->
    <!-- ----------------------------------------------------------- -->
    <!-- ----------------------------------------------------------- -->
    <div class="content-container">
      <div class="parallax1">
        <div class="overlay"></div>
        <div class="ptext">
          <span class="border trans">PRODUCTOS DESTACADOS</span>
        </div>
      </div>
      <div class="featured-products">
        <vueper-slides
          class="no-shadow"
          :visible-slides="3"
          :slide-ratio="1 / 3"
          :dragging-distance="70"
          :bullets="false"
          fixed-height="500px"
        >
          <vueper-slide v-for="product in featuredProducts" :key="product._id">
            <template v-slot:content>
              <p class="product-title">{{ product.name }}</p>
              <img class="product-image" :src="product.image" :alt="`img-${product.image}`" />
              <p class="product-price">{{ product.finalPrice }}</p>
              <v-btn
                class="product-btn"
                link
                :to="{ name: 'product', params: { productId: product._id } }"
                outlined
              >Ver producto</v-btn>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>

      <div class="parallax2">
        <div class="overlay"></div>
        <div class="ptext">
          <span class="border trans">OFERTAS</span>
        </div>
      </div>
      <div class="promotions">
        <div class="promotion-boxes">
          <div v-for="item in promotionProducts" :key="item._id" class="promotion-box">
            <p class="product-title">{{ item.name }}</p>
            <router-link :to="{ name: 'product', params: { productId: item._id } }">
              <img class="product-image" src="../assets/product.jpg" :alt="item.name" />
            </router-link>
            <p class="product-price">{{ item.finalPrice }}</p>
          </div>
        </div>
        <v-btn x-large class="add-more" dark>VER MAS OFERTAS</v-btn>
      </div>

      <div class="parallax3">
        <div class="overlay"></div>
        <div class="ptext">
          <span class="border trans">FRAGANCIAS</span>
        </div>
      </div>

      <div class="fragrances">
        <vueper-slides
          class="no-shadow"
          :visible-slides="3"
          :slide-ratio="1 / 3"
          :dragging-distance="70"
          :bullets="false"
          fixed-height="500px"
        >
          <vueper-slide v-for="product in fragrancesProducts" :key="product._id">
            <template v-slot:content>
              <p class="product-title">{{ product.name }}</p>
              <img class="product-image" :src="product.image" :alt="`img-${product.image}`" />
              <p class="product-price">{{ product.finalPrice }}</p>
              <v-btn
                class="product-btn"
                link
                :to="{ name: 'product', params: { productId: product._id } }"
                outlined
              >Ver producto</v-btn>
            </template>
          </vueper-slide>
        </vueper-slides>
        <div class="btns">
          <v-btn
            x-large
            outlined
            class="add-more"
            link
            :to="{
                name: 'products',
                params: { category: 'perfumes mujer' },
              }"
          >ver fragancias mujer</v-btn>
          <v-btn
            x-large
            class="add-more"
            dark
            link
            :to="{
                name: 'products',
                params: { category: 'perfumes hombre' },
              }"
          >ver fragancias hombre</v-btn>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------------------- -->
    <!-- ------------------------------------------------------------- -->
    <!-- ------------------------------------------------------------- -->
    <div class="brands-container">
      <vueper-slides
        class="no-shadow"
        :visible-slides="5"
        :slide-ratio="1 / 5"
        :dragging-distance="70"
        :bullets="false"
        :autoplay="true"
        :duration="1500"
        :arrows="false"
        fixed-height="100px"
      >
        <vueper-slide v-for="image in brands" :key="image.number">
          <template v-slot:content>
            <img class="product-image" :src="image.src" :alt="`img-${image.number}`" />
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>

    <!-- ------------------------------------------------------------- -->
    <!-- ------------------------------------------------------------- -->
    <!-- ------------------------------------------------------------- -->

    <div class="delivery-container">
      <div class="mini-delivery-text">
        <p>Envios a todo el pais a traves de Correo Argentino</p>
      </div>
      <img src="../assets/banner-mercadopago.jpg" alt="12s" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import errorAlertHandler from "../util/error";

export default {
  name: "home",
  components: {
    VueperSlides,
    VueperSlide
  },
  data: () => ({
    brands: [
      {
        src: require("../assets/revlon-logo.svg"),
        alt: "revlon",
        number: 1
      },
      {
        src: require("../assets/alfaparf.jpeg"),
        alt: "alfa",
        number: 2
      },
      {
        src: require("../assets/question.png"),
        alt: "question",
        number: 3
      },
      {
        src: require("../assets/kerastase.svg"),
        alt: "ker",
        number: 33
      },
      {
        src: require("../assets/givency.png"),
        alt: "gi",
        number: 11
      },
      {
        src: require("../assets/giorgio.png"),
        alt: "gio",
        number: 4
      },
      {
        src: require("../assets/gucci.png"),
        alt: "gucci",
        number: 5
      },
      {
        src: require("../assets/yves.jpg"),
        alt: "yves",
        number: 6
      },
      {
        src: require("../assets/rabbane.jpg"),
        alt: "rabbane",
        number: 7
      },
      {
        src: require("../assets/loewe.jpg"),
        alt: "revlon",
        number: 8
      },
      {
        src: require("../assets/polo.jpg"),
        alt: "polo",
        number: 9
      },
      {
        src: require("../assets/ch.jpg"),
        alt: "ch",
        number: 10
      },
      {
        src: require("../assets/ck.png"),
        alt: "ck",
        number: 55
      },
      {
        src: require("../assets/dior.png"),
        alt: "dior",
        number: 12
      }
    ],
    images: [
      {
        src: require("../assets/assorted-dolce-gabbana-fragrance-bottles-965990.jpg")
      },
      {
        src: require("../assets/dolce-and-gabbana-perfume-bottle-1961795.jpg")
      },
      {
        src: require("../assets/photo-of-perfume-3059609.jpg")
      }
    ],
    products: [],
    promotionProducts: [],
    featuredProducts: [],
    fragrancesProducts: []
  }),
  created() {
    this.getProducts();
    this.getPromotionProducts();
    this.getFeaturedProducts();
  },
  computed: {
    authenticated() {
      return this.$store.state.token;
    }
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get(`/website/admin/products`);
        const products = response.data.products;
        products.forEach(product => {
          product.finalPrice = `$${product.finalPrice}`;
          if (
            product.category.name === "perfumes hombre" ||
            product.category.name === "perfumes mujer"
          ) {
            this.fragrancesProducts.push(product);
          }
        });
        this.products = products;
      } catch (err) {
        console.log(err);
      }
    },
    async getPromotionProducts() {
      try {
        const response = await axios.get(`/website/admin/promotion-products`);
        const products = response.data.products;
        products.forEach(product => {
          product.finalPrice = `$${product.finalPrice}`;
        });
        this.promotionProducts = products;
      } catch (err) {
        console.log(err);
      }
    },
    async getFeaturedProducts() {
      try {
        const response = await axios.get(`/website/admin/featured-products`);
        const products = response.data.products;
        products.forEach(product => {
          product.finalPrice = `$${product.finalPrice}`;
        });
        this.featuredProducts = products;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.showcase-container {
  width: 95%;
  margin: auto;
  margin-top: 2rem;
  .overlay {
    pointer-events: none;
    background: rgba($color: #000000, $alpha: 0.2);
    position: absolute;
    z-index: 3;
    width: 95%;
    height: 90vh;
  }
}
.delivery-free-banner {
  width: 95%;
  background: #000;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 4rem;
  h2 {
    color: white;
    margin-left: 1rem;
  }
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;

  .featured-products {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 600px;
    .featured-title {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      margin: auto;
    }
    .vueperslides {
      height: 70%;

      .vueperslides__inner {
        .vueperslides__parallax-wrapper {
          .vueperslides__track {
            .vueperslides__track-inner {
              .vueperslide,
              .vueperslide--visible {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.5rem;
                .product-title {
                  font-size: 1.5rem;
                  text-align: center;
                  height: 100px;
                }
                .product-description {
                }
                .product-image {
                  height: 300px;
                }
                .product-price {
                  font-size: 2rem;
                }
                .product-btn {
                  transition: 0.2s ease-in;
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
      .vueperslides__bullets {
        display: none;
      }
    }
    .add-more {
      width: 20%;
      margin: auto;
    }
  }

  .promotions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    .promotions-title {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 3rem;
    }
    .promotion-boxes {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1rem;
      margin-bottom: 3rem;
      .promotion-box {
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
        }
        .product-description {
          font-size: 1.5rem;
        }
        .product-price {
          font-size: 1.3rem;
        }
        a {
          height: 250px;
          width: 250px;
          .product-image {
            height: 100%;
          }
        }
      }
    }
    .add-more {
      width: 20%;
    }
  }

  .fragrances {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 800px;
    margin-bottom: 3rem;
    .fragrances-title {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      margin: auto;
    }
    .vueperslides {
      height: 70%;

      .vueperslides__inner {
        .vueperslides__parallax-wrapper {
          .vueperslides__track {
            .vueperslides__track-inner {
              .vueperslide,
              .vueperslide--visible {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.5rem;
                .product-title {
                  font-size: 1.5rem;
                  text-align: center;
                  height: 100px;
                }
                .product-description {
                }
                .product-image {
                  height: 300px;
                }
                .product-price {
                  font-size: 2rem;
                }
                .product-btn {
                  transition: 0.2s ease-in;
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
      .vueperslides__bullets {
        display: none;
      }
    }
    .btns {
      display: flex;
      justify-content: center;
      align-items: center;
      .add-more {
        margin-right: 3rem;
      }
    }
  }

  .parallax1 {
    background-image: url("../assets/banne1.jpg");
  }
  .parallax2 {
    background-image: url("../assets/banne2.jpg");
  }
  .parallax3 {
    background-image: url("../assets/banne3.jpg");
  }

  .parallax1,
  .parallax2,
  .parallax3 {
    width: 100%;
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100%;
    background-attachment: fixed;
    height: 300px;
    margin-bottom: 3rem;

    .overlay {
      background: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 300px;
    }

    .ptext {
      font-family: "Dancing Script", cursive !important;
      position: absolute;
      top: 30%;
      width: 100%;
      text-align: center;
      color: #000;
      font-size: 4rem;
      letter-spacing: 8px;
      text-transform: uppercase;
      z-index: 4;
    }
    .ptext .border {
      background-color: #111;
      color: #fff;
      padding: 20px;
      font-weight: bold;
    }

    .ptext .border.trans {
      background-color: transparent;
    }
  }
}
.brands-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 7rem;
  margin-right: 4rem;
  img {
    height: 100px;
  }
}
.delivery-container {
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: 4rem;
  padding-top: 0;
  .mini-delivery-text {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  img {
    margin: auto;
    height: 150px;
  }
}

.VueCarousel {
  margin-left: 12rem;
  margin-right: 12rem;
  .VueCarousel-pagination {
  }
}
</style>

<template>
  <div id="main">
    <div class="showcase-container">
      <div class="overlay"></div>
      <v-carousel
        continuous
        cycle
        hide-delimiter-background
        :show-arrows="$vuetify.breakpoint.lgAndUp ? true : false"
        hide-delimiters
        height="78vh"
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
      <v-icon large color="black">local_shipping</v-icon>
      <h2>Envios gratis a todo el pais en compras mayores a $4000</h2>
    </div>
    <!-- ----------------------------------------------------------- -->
    <!-- ----------------------------------------------------------- -->
    <!-- ----------------------------------------------------------- -->
    <div class="content-container">
      <div class="parallax1">
        <div class="overlay"></div>
        <div class="ptext3">
          <p>
            <span>
              <img src="../assets/destacados.png" alt="destacados" />
            </span>
          </p>
        </div>
      </div>
      <div class="featured-products">
        <vueper-slides
          v-if="$vuetify.breakpoint.lgAndUp"
          class="no-shadow"
          :visible-slides="3"
          :slide-ratio="1 / 3"
          :dragging-distance="70"
          :bullets="false"
          :touchable="false"
          fixed-height="500px"
        >
          <vueper-slide v-for="product in featuredProducts" :key="product._id">
            <template v-slot:content>
              <p class="product-title">{{ product.name }}</p>
              <router-link :to="{ name: 'product', params: { productId: product._id } }">
                <img class="product-image" :src="product.image" :alt="`img-${product.image}`" />
              </router-link>
              <p class="product-price">{{ product.finalPrice }}</p>
            </template>
          </vueper-slide>
        </vueper-slides>

        <vueper-slides
          v-else
          class="no-shadow"
          :visible-slides="1"
          :arrows="true"
          fixed-height="600px"
          :touchable="false"
        >
          <vueper-slide v-for="product in featuredProducts" :key="product._id">
            <template v-slot:content>
              <p class="product-title">{{ product.name }}</p>
              <router-link :to="{ name: 'product', params: { productId: product._id } }">
                <img class="product-image" :src="product.image" :alt="`img-${product.image}`" />
              </router-link>
              <p class="product-price">{{ product.finalPrice }}</p>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>

      <div class="parallax2">
        <div class="overlay"></div>
        <div class="ptext2">
          <img src="../assets/ofertas.png" alt="ofertas" />
        </div>
      </div>
      <div class="promotions">
        <div class="promotion-boxes" v-if="$vuetify.breakpoint.lgAndUp">
          <div v-for="item in promotionProducts" :key="item._id" class="promotion-box">
            <p class="product-title">{{ item.name }}</p>
            <router-link :to="{ name: 'product', params: { productId: item._id } }">
              <img class="product-image" :src="item.image" :alt="item.name" />
            </router-link>
            <p class="product-price">{{ item.finalPrice }}</p>
          </div>
        </div>
        <div class="promotion-boxes" v-else>
          <div v-for="item in promotionProductsMobile" :key="item._id" class="promotion-box">
            <p class="product-title">{{ item.name }}</p>
            <router-link :to="{ name: 'product', params: { productId: item._id } }">
              <img class="product-image" :src="item.image" :alt="item.name" />
            </router-link>
            <p class="product-price">{{ item.finalPrice }}</p>
          </div>
        </div>
        <v-btn large class="add-more" dark>VER MAS OFERTAS</v-btn>
      </div>

      <div class="parallax3">
        <div class="overlay"></div>
        <div class="ptext">
          <img src="../assets/fargancias.png" alt="fragancias" />
        </div>
      </div>

      <div class="fragrances">
        <vueper-slides
          v-if="$vuetify.breakpoint.lgAndUp"
          class="no-shadow"
          :visible-slides="3"
          :slide-ratio="1 / 3"
          :dragging-distance="70"
          :bullets="false"
          :touchable="false"
          fixed-height="500px"
        >
          <vueper-slide v-for="product in fragrancesProducts" :key="product._id">
            <template v-slot:content>
              <p class="product-title">{{ product.name }}</p>
              <router-link :to="{ name: 'product', params: { productId: product._id } }">
                <img class="product-image" :src="product.image" :alt="`img-${product.image}`" />
              </router-link>
              <p class="product-price">{{ product.finalPrice }}</p>
            </template>
          </vueper-slide>
        </vueper-slides>
        <vueper-slides
          v-else
          class="no-shadow"
          :visible-slides="1"
          :bullets="false"
          :touchable="false"
          fixed-height="600px"
        >
          <vueper-slide v-for="product in fragrancesProducts" :key="product._id">
            <template v-slot:content>
              <p class="product-title">{{ product.name }}</p>
              <router-link :to="{ name: 'product', params: { productId: product._id } }">
                <img class="product-image" :src="product.image" :alt="`img-${product.image}`" />
              </router-link>
              <p class="product-price">{{ product.finalPrice }}</p>
            </template>
          </vueper-slide>
        </vueper-slides>
        <div class="btns">
          <v-btn
            large
            outlined
            class="add-more"
            link
            :to="{
                name: 'products',
                params: { category: 'perfumes mujer' },
              }"
          >ver fragancias mujer</v-btn>
          <v-btn
            large
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
    <div class="brands-container" v-if="$vuetify.breakpoint.lgAndUp">
      <vueper-slides
        class="no-shadow"
        :visible-slides="5"
        :slide-ratio="1 / 5"
        :dragging-distance="70"
        :bullets="false"
        :autoplay="true"
        :duration="1500"
        :arrows="false"
        :touchable="false"
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
        src: require("../assets/million.png")
      },
      {
        src: require("../assets/max-factor.png")
      },
      {
        src: require("../assets/good-girl.png")
      }
    ],
    products: [],
    promotionProducts: [],
    promotionProductsMobile: [],
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
        let promotionProducts = [];
        let promotionProductsMobile = [];
        for (let index = 0; index < 6; index++) {
          const product = products[index];
          product.finalPrice = `$${product.finalPrice}`;
          promotionProducts.push(product);
          promotionProductsMobile.push(product);
        }
        this.promotionProducts = promotionProducts;
        this.promotionProductsMobile = promotionProductsMobile;
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
    },
    goToProduct(item) {
      this.$router.push({ name: "product", params: { productId: item._id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.showcase-container {
  width: 100%;
  margin: auto;
  margin-top: 0;
  .overlay {
    pointer-events: none;
    background: rgba($color: #000000, $alpha: 0);
    position: absolute;
    z-index: 3;
    width: 80%;
    height: 78vh;
  }
}
.delivery-free-banner {
  width: 100%;
  background: #eee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  h2 {
    color: black;
    margin-left: 1rem;
    text-align: center;
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
                  margin-bottom: 0.5rem;
                }
                .product-price {
                  font-size: 1.3rem;
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
        height: 600px;
        width: 500px;
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
        .product-btn {
          transition: 0.2s ease-in;
          padding: 0.7rem 1.3rem;
          border: 1px solid #000;
          border-radius: 0.3rem;
          &:hover {
            border: 1px solid rgba(0, 0, 0, 0);
            background: #000;
            color: white;
          }
        }
        a {
          height: 350px;
          width: 400px;
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
                  margin-bottom: 0.5rem;
                }
                .product-price {
                  font-size: 1.3rem;
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
    background-image: url("../assets/banne3.jpg");
  }
  .parallax2 {
    background-image: url("../assets/banne3.jpg");
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
    display: flex;
    justify-content: center;
    align-items: center;

    .overlay {
      background: rgba($color: #000000, $alpha: 0.8);
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 300px;
    }

    .ptext {
      img {
        position: relative;
        z-index: 4;
        height: 150px;
      }
    }
    .ptext3 {
      img {
        position: relative;
        z-index: 4;
        height: 120px;
      }
    }
    .ptext2 {
      img {
        position: relative;
        z-index: 4;
        height: 150px;
      }
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
    font-size: 1.3rem;
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

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

@media only screen and (max-width: 1264px) {
  #main {
    overflow-x: hidden;
  }
  .showcase-container {
    width: 100%;
    margin: auto;
    margin-top: 0;
    .overlay {
      pointer-events: none;
      background: rgba($color: #000000, $alpha: 0.2);
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 90vh;
    }
  }
  .delivery-free-banner {
    width: 100%;
    background: #000;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 0;
    h2 {
      color: white;
      margin-left: 1rem;
      text-align: center;
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
                    height: 40%;
                    margin-bottom: 0.5rem;
                  }
                  .product-price {
                    font-size: 1.3rem;
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
        grid-template-columns: repeat(1, 1fr);
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
            margin-bottom: 0.5rem;
          }
          .product-price {
            font-size: 1.3rem;
          }
          .product-btn {
            transition: 0.2s ease-in;
            padding: 0.7rem 1.3rem;
            border: 1px solid #000;
            border-radius: 0.3rem;
            &:hover {
              border: 1px solid rgba(0, 0, 0, 0);
              background: #000;
              color: white;
            }
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
        width: 50%;
      }
    }

    .fragrances {
      display: flex;
      flex-direction: column;
      width: 90%;
      height: 800px;
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
                    height: 40%;
                    margin-bottom: 0.5rem;
                  }
                  .product-price {
                    font-size: 1.3rem;
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
        flex-direction: column;
        .add-more {
          margin: auto;
          margin-bottom: 1rem;
        }
      }
    }

    .parallax1 {
      background-image: url("../assets/banne3.jpg");
    }
    .parallax2 {
      background-image: url("../assets/banne3.jpg");
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
      display: flex;
      justify-content: center;
      align-items: center;

      .overlay {
        background: rgba($color: #000000, $alpha: 0.8);
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 300px;
      }

      .ptext {
        img {
          position: relative;
          z-index: 4;
          height: 80px;
        }
      }
      .ptext3 {
        img {
          position: relative;
          z-index: 4;
          height: 80px;
        }
      }
      .ptext2 {
        img {
          position: relative;
          z-index: 4;
          height: 80px;
        }
      }
    }
  }
  .brands-container {
    flex-direction: column;
    justify-content: center;
    margin-left: 7rem;
    margin-right: 4rem;
    img {
      height: 100px;
    }
  }
  .delivery-container {
    display: flex;
    flex-direction: column;
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
      margin-bottom: 2rem;
    }
    img {
      margin: 0;
      height: 80px;
    }
  }

  .VueCarousel {
    margin-left: 0;
    margin-right: 0;
    .VueCarousel-pagination {
    }
  }
}
</style>

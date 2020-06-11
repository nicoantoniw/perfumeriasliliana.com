<template>
  <div class="cart-container">
    <router-link style="text-decoration:none" :to="{ name: 'home' }">
      <v-icon class="mb-8 ml-8" color="black" x-large>arrow_back</v-icon>
    </router-link>
    <div class="cart-details">
      <h1 class="cart-title">Carrito de compras</h1>
      <table class="cart-table">
        <tr class="cart-table-titles">
          <th class="cart-table-title">Producto</th>
          <th class="cart-table-title">Precio</th>
          <th class="cart-table-title">Cantidad</th>
          <th class="cart-table-title">Subtotal</th>
        </tr>
        <tr class="cart-table-items" v-for="(item, index) in cartItems" :key="item._id">
          <td class="image-name-td cart-table-item">
            <img class="item-image" :src="item.image" alt="product" />
            <p class="product-name">{{ item.name }}</p>
          </td>
          <td class="cart-table-item">
            <p class="product-price">${{ item.price / item.quantity }}</p>
          </td>
          <td class="cart-table-item">
            <p class="product-quantity">{{ item.quantity }}</p>
          </td>
          <td class="cart-table-item">
            <p class="product-price">${{ item.price }}</p>
          </td>
          <td class="cart-table-item">
            <v-icon @click="deleteItem(item.product, index)">cancel</v-icon>
          </td>
        </tr>
      </table>
      <v-btn style="margin-top:2rem" @click="restoreCart" color="black" dark>Vaciar Carrito</v-btn>
    </div>
    <div class="cart-summary">
      <h1 class="cart-title">Resumen de compra</h1>
      <h2 class="cart-subtotal">Subtotal: ${{total}}</h2>
      <h2 class="cart-discounts">Descuentos: $0</h2>
      <h2 class="cart-taxes">Impuestos: $0</h2>
      <h2 class="cart-shipping" v-if="total<4000 &&cartItems.length>0">Envio: $250</h2>
      <h2 class="cart-shipping" v-else>Envio: $0</h2>
      <h2 class="cart-total" v-if="total<4000&&cartItems.length>0">Total: {{total+250}}</h2>
      <h2 class="cart-total" v-else>Total: {{total}}</h2>
      <v-btn
        color="black"
        :disabled="cartItems.length===0"
        class="white--text"
        @click="addMercadopagoSale"
        x-large
      >Realizar compra</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";

export default {
  name: "cart",
  data: () => ({
    cartItems: [],
    total: 0
  }),
  created() {
    this.getCart();
  },
  methods: {
    async getCart() {
      try {
        const response = await axios.get(
          `/website/user/cart/${this.$store.state.userId}`
        );
        this.cartItems = response.data.cart.items;
        this.total = response.data.cart.total;
      } catch (error) {}
    },
    async deleteItem(product, index) {
      try {
        await axios.delete(`website/user/delete/${product}`);
        this.cartItems.splice(index, 1);
        this.getCart();
        const cartItems = this.cartItems.length;
        this.$store.dispatch("cart", cartItems);
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Producto eliminado del carrito"
        });
      } catch (error) {
        errorAlertHandler(error, "not found");
      }
    },
    async restoreCart(no) {
      try {
        await axios.patch(`/website/user/restore`);
        this.cartItems = [];
        this.getCart();
        const cartItems = this.cartItems.length;
        this.$store.dispatch("cart", cartItems);
        if (!no) {
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Carrito vaciado"
          });
        }
      } catch (error) {
        errorAlertHandler(error, "not found");
      }
    },
    async addMercadopagoSale() {
      const data = {
        items: this.cartItems
      };
      let sum = 0;
      data.items.forEach(item => {
        sum += item.price;
      });
      if (sum < 4000) {
        data.items.push({
          product: "",
          quantity: 1,
          name: "envio",
          image: "",
          price: 250
        });
      }
      try {
        const response = await axios.post(
          `/website/user/add-mercadopago-sale`,
          data
        );
        this.addOrder(data.items);
        this.restoreCart(sum);
        window.location.replace(`${response.data.url}`);
      } catch (error) {
        errorAlertHandler(error, "not found");
      }
    },
    async addOrder(items) {
      let num;
      let number = Math.floor(Math.random() * Math.floor(100000));
      const data = {
        number,
        description: "Venta de Pagina Web",
        total: 0,
        totalIva: 0,
        bi10: 0,
        iva10: 0,
        bi21: 0,
        deposit: 0,
        iva21: 0,
        bi27: 0,
        iva27: 0,
        totalNoIva: 0,
        details: [],
        status: "Pendiente de pago",
        creator: "5ea9c4a058eb5371b70d4dc6",
        customer: this.$store.state.clientId
      };
      try {
        const calculatedDiscount = 0;
        items.forEach(item => {
          const details = {
            product: item.name,
            quantity: item.quantity,
            aggregateDiscount: 0,
            price: parseFloat(item.price.toFixed(2)),
            subtotal: 0,
            totalIva: 0
          };
          data.total += details.price;
          data.details.push(details);
        });
        const response = await axios.post(`/order/add-from-website`, data);
        const response2 = await axios.post(`/website/user/add-last-order`, {
          orderId: response.data.order._id
        });
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    }
  }
};
</script>

<style lang="scss">
.cart-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 4rem 3rem;
  .cart-details {
    grid-column: 1 / span 5;
    margin-left: 2rem;
    .cart-title {
      margin-bottom: 3rem;
    }
    .cart-table {
      width: 70%;
      .cart-table-title {
      }
      .cart-table-items {
        text-align: center;
        p {
          font-size: 1.3rem;
        }
        .cart-table-item {
          border-top: 1px solid rgb(209, 208, 208);
          padding: 1rem;
        }
        .image-name-td {
          display: flex;
          justify-content: left;
          align-items: center;
          .item-image {
            height: 175px;

            margin-right: 1rem;
          }
        }
      }
    }
  }
  .cart-summary {
    grid-column: 6 / span 2;
    .cart-title {
      margin-bottom: 0.7rem;
    }
    .cart-subtotal {
      margin-bottom: 0.7rem;
    }
    .cart-discounts {
      margin-bottom: 0.7rem;
    }
    .cart-taxes {
      margin-bottom: 0.7rem;
    }
    .cart-shipping {
      margin-bottom: 0.7rem;
    }
    .cart-shipping {
      margin-bottom: 0.7rem;
    }
    .cart-total {
      margin-bottom: 0.7rem;
    }
    .cart-total {
      margin-bottom: 2rem;
    }
  }
}
</style>

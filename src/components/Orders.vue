<template>
  <div>
    <router-link style="text-decoration:none" :to="{ name: 'home' }">
      <v-icon class="mt-3 mb-8 ml-8" color="black" x-large>arrow_back</v-icon>
    </router-link>
    <v-data-table
      :headers="headers"
      :items="orders"
      hide-default-footer
      class="elevation-1"
      no-data-text="No se encontro ninguna compra"
      no-results-text="No se encontro ninguna compra"
      style="font-size: 18px;margin-top:4rem;margin-bottom:4rem;padding:1rem"
    >
      <template v-slot:top>
        <v-toolbar
          color="black"
          class="elevation-5 mb-5 hidden-md-and-down"
          style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
          dark
        >
          <v-toolbar-title class="white--text">Mis Compras</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status === 'Entregado'" color="success">Compra Enviada</v-chip>
        <v-chip v-if="item.status === 'Preparado'" color="info">Preparando Compra</v-chip>
        <v-chip dark v-if="item.status === 'No preparado'" color="warning">Preparando Compra</v-chip>
        <v-chip dark v-if="item.status === 'Pendiente de pago'" color="red">Pendiente de Pago</v-chip>
      </template>

      <template v-slot:item.action="{ item }" class="px-0">
        <v-dialog :retain-focus="false" v-model="dialog2" max-width="700px">
          <template v-slot:activator="{ on: dialog2 }">
            <v-tooltip top>
              <template v-slot:activator="{ on: tooltip }">
                <v-icon
                  small
                  class="mr-2"
                  v-on="{ ...tooltip, ...dialog2 }"
                  @click="getOrder(item._id)"
                >mdi-eye</v-icon>
              </template>
              <span>Ver Pedido</span>
            </v-tooltip>
          </template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Productos</th>
                  <th class="text-left">Cantidad</th>
                  <th class="text-left">Descuento</th>
                  <th class="text-left">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in order.details" :key="index">
                  <td>{{ item.product }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.aggregateDiscount }}</td>
                  <td>${{ item.price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";
import moment from "moment";

export default {
  name: "orders",
  data: () => ({
    dialog: false,
    dialog2: false,
    dialog3: false,
    search: "",
    headers: [
      {
        text: "Numero de compra",
        align: "left",
        sortable: true,
        value: "number"
      },
      {
        text: "Fecha de Compra",
        align: "left",
        sortable: true,
        value: "createdAt"
      },
      { text: "Importe", value: "total", sortable: false },
      { text: "Estado", value: "status", sortable: false },
      { text: "Acciones", value: "action", sortable: false }
    ],
    headers2: [
      {
        text: "Producto",
        align: "left",
        sortable: true,
        value: "product"
      },
      {
        text: "Cantidad",
        align: "left",
        sortable: true,
        value: "quantity"
      },
      { text: "", value: "action", sortable: false }
    ],
    date: new Date().toISOString().substr(0, 10),
    dateMenu: false,
    dateMenu2: false,
    dateMenu3: false,
    orderStatus: ["Entregado", "Preparado", "No preparado"],
    orders: [],
    editedIndex: -1,
    order: {
      number: 0,
      description: "",
      customer: "",
      deliveryDate: "",
      total: 0,
      details: [],
      deposit: 0,
      status: ""
    },
    totalOrders: 0,
    customers: [],
    products: [],
    sellers: [],
    detailProduct: "",
    detailQuantity: 1,
    detailAggregateDiscount: 0,
    sale: {
      ticketType: "Cotización",
      customer: "",
      seller: "",
      salePoint: 0,
      createdAt: null
    },
    bi10: 0,
    bi21: 0,
    bi27: 0,
    iva10: 0,
    iva21: 0,
    iva27: 0,
    totalIva: 0,
    totalNoIva: 0,
    ticketTypes: [
      "Cotización",
      "Factura A",
      "Nota de débito A",
      "Nota de crédito A",
      "Factura B",
      "Nota de débito B",
      "Nota de crédito B",
      "Factura C",
      "Nota de débito C",
      "Nota de crédito C"
    ],
    selectedCashRegister: "",
    cashRegisters: [],
    salePoints: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Pedido" : `${this.order.number}`;
    },
    buttonTitle() {
      return this.editedIndex === -1 ? "Guardar" : `Editar`;
    },
    authenticated() {
      return this.$store.state.token;
    },
    isAdmin() {
      return this.$store.state.role === "admin";
    },
    isSeller() {
      if (
        this.$store.state.role === "admin" ||
        this.$store.state.role === "seller"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isUser() {
      if (
        this.$store.state.role === "admin" ||
        this.$store.state.role === "seller" ||
        this.$store.state.role === "user"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getOrders();
  },

  methods: {
    async getOrders() {
      try {
        const response = await axios.get(`/website/user/orders`);
        const orders = response.data.orders;
        const totalOrders = response.data.totalOrders;
        orders.forEach(order => {
          order.total = `$${order.total}`;
          moment.locale("es");
          const date = moment
            .utc(order.createdAt)
            .utcOffset(-3)
            .format("L");
          order.createdAt = date;
          moment.locale("es");
          const date2 = moment
            .utc(order.deliveryDate)
            .utcOffset(-3)
            .format("L");
          order.deliveryDate = date2;
          order.number = `#${order.number}`;
        });
        this.orders = orders;
        this.totalOrders = totalOrders;
      } catch (err) {
        errorAlertHandler(err, "not here");
      }
    },
    async getOrder(id) {
      try {
        const response = await axios.get(`/website/user/order/${id}`);
        const order = response.data.order;
        this.order = order;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.order = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    showAlert(message) {
      return message;
    }
  }
};
</script>

<style lang="scss">
.v-data-table {
  .v-data-table__wrapper {
    .v-data-table-header {
      tr {
        th {
          font-size: 22px;
        }
      }
    }
    tr {
      td {
        font-size: 20px;

        .v-chip {
          .v-chip__content {
            font-size: 20px;
          }
        }
      }
    }
  }
}
.v-card {
  .v-card__title {
    .headline {
      font-size: 26px;
    }
  }
}
.v-text-field__slot {
  font-size: 24px;

  label {
    font-size: 20px;
  }
}
.v-input {
  .v-input__control {
    .v-input__slot {
      .v-select__slot {
        font-size: 24px;

        label {
          font-size: 20px;
        }
      }
    }
  }
}
</style>

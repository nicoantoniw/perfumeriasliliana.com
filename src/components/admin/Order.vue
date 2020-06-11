<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    :search="search"
    class="elevation-1"
    no-data-text="No se encontraron pedidos"
    no-results-text="No se encontraron resultados en la busqueda"
    style="font-size: 18px;margin-top:4rem;padding:1rem"
  >
    <template v-slot:top>
      <v-toolbar
        color="black"
        class="elevation-5 mb-5 hidden-md-and-down"
        style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
        dark
      >
        <v-toolbar-title class="white--text">Lista de Pedidos</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class>{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                    <v-text-field v-model="order.description" label="Descripcion"></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                    <v-autocomplete v-model="order.customer" :items="customers" label="Cliente"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" lg="3" sm="12" xs="12" md="3">
                    <v-menu
                      ref="dateMenu"
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="order.deliveryDate"
                          label="Fecha de Entrega"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="blue darken-2" @click="dateMenu = false">Cancelar</v-btn>
                        <v-btn text color="blue darken-2" @click="saveDate(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" lg="3" sm="12" xs="12" md="3">
                    <v-text-field v-model="order.deposit" label="Seña"></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                    <v-select v-model="order.status" :items="orderStatus" label="Estado"></v-select>
                  </v-col>
                  <v-col cols="12" lg="6" sm="12" xs="12" md="6">
                    <v-autocomplete v-model="detailProduct" :items="products" label="Producto"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" lg="2" sm="12" xs="12" md="2">
                    <v-text-field v-model="detailQuantity" label="Cantidad"></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="2" sm="12" xs="12" md="2">
                    <v-text-field v-model="detailAggregateDiscount" label="Descuento %"></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="2" sm="12" xs="12" md="2">
                    <v-tooltip top>
                      <template v-slot:activator="{}">
                        <v-btn
                          color="blue darken-2"
                          icon
                          bottom
                          @click="addDetail(sale.ticketType)"
                        >
                          <v-icon size="35">mdi-plus-circle</v-icon>
                        </v-btn>
                      </template>
                      <span>Editar</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <v-data-table
                  :headers="headers2"
                  :items="order.details"
                  class="elevation-1"
                  no-data-text="No se encontraron productos"
                  no-results-text="No se encontraron resultados en la busqueda"
                  hide-default-footer
                >
                  <template v-slot:item.action="{ item }" class="px-0">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon small v-on="on" @click="deleteProduct(item)">mdi-delete</v-icon>
                      </template>
                      <span>Eliminar</span>
                    </v-tooltip>
                  </template>
                </v-data-table>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" outlined @click="dialog = false">Cancelar</v-btn>
              <v-btn color="success" outlined @click="editOrder">{{ buttonTitle }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip v-if="item.status === 'Entregado'" color="success">
        {{
        item.status
        }}
      </v-chip>
      <v-chip v-if="item.status === 'Preparado'" color="info">
        {{
        item.status
        }}
      </v-chip>
      <v-chip dark v-if="item.status === 'No preparado'" color="warning">
        {{
        item.status
        }}
      </v-chip>
      <v-chip dark v-if="item.status === 'Pendiente de pago'" color="red">
        {{
        item.status
        }}
      </v-chip>
    </template>

    <template v-slot:item.action="{ item }" class="px-0">
      <v-dialog :retain-focus="false" v-model="dialog2" max-width="500px">
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
      <!-- ///////////////////////////////////////////////// -->
      <!-- ///////////////////////////////////////////////// -->
      <!-- ///////////////////////////////////////////////// -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon small class="mr-2" v-on="on" @click="updateOrder(item)">mdi-pencil</v-icon>
        </template>
        <span>Editar</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon small v-on="on" @click="deleteOrder(item)">mdi-delete</v-icon>
        </template>
        <span>Eliminar</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";
import moment from "moment";

export default {
  name: "order",
  data: () => ({
    dialog: false,
    dialog2: false,
    dialog3: false,
    search: "",
    headers: [
      {
        text: "Fecha de Pedido",
        align: "left",
        sortable: true,
        value: "createdAt"
      },
      { text: "Fecha de Entrega", value: "deliveryDate", sortable: true },
      { text: "Descripcion", value: "description", sortable: false },
      { text: "Cliente", value: "customer.name", sortable: true },
      { text: "Importe", value: "total", sortable: false },
      { text: "Seña", value: "deposit", sortable: false },
      { text: "Estado", value: "status", sortable: false },
      { text: "", value: "action", sortable: false }
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
    this.getProducts();
  },

  methods: {
    async getOrders() {
      try {
        const response = await axios.get(`/order/orders`);
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
        });
        this.orders = orders;
        this.totalOrders = totalOrders;
      } catch (err) {
        errorAlertHandler(err, "not here");
      }
    },
    async getOrder(id) {
      try {
        const response = await axios.get(`/order/orders/${id}`);
        const order = response.data.order;
        this.order = order;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async getProducts() {
      try {
        const response = await axios.get(`/product/products`);
        const products = response.data.products;
        products.map(x => {
          this.products.push({
            text: x.name,
            value: x.name,
            price: x.price
          });
        });
      } catch (err) {
        errorAlertHandler(err, this.products);
      }
    },
    async editOrder() {
      const data = {
        description: "Venta de Pagina Web",
        total: this.order.total,
        totalIva: this.totalIva,
        bi10: this.bi10,
        iva10: this.iva10,
        bi21: this.bi21,
        iva21: this.iva21,
        bi27: this.bi27,
        iva27: this.iva27,
        totalNoIva: this.totalNoIva,
        details: this.order.details,
        status: this.order.status
      };
      try {
        await axios.put(`/order/update/${this.order._id}`, data);
        this.dialog = false;
        this.dialog2 = false;
        this.getOrders();
        this.clearOrder();
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Pedido actualizado"
        });
      } catch (err) {
        errorAlertHandler(err, "Pedido no encontrado");
      }
    },
    async updateOrder(item) {
      try {
        this.editedIndex = this.orders.indexOf(item);
        const response = await axios.get(`/order/orders/${item._id}`);
        const order = response.data.order;
        this.order = order;
        this.dialog = true;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },

    async deleteOrder(item) {
      const index = this.orders.indexOf(item);
      try {
        if (confirm("Eliminar item?")) {
          await axios.delete(`/order/delete/${item._id}`);
          this.orders.splice(index, 1);
          await this.getOrders();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Pedido eliminado"
          });
        } else {
          return;
        }
      } catch (err) {
        errorAlertHandler(err, "Pedido no encontrado");
      }
    },
    saveDate(date) {
      this.order.deliveryDate = date;
      this.dateMenu = false;
      this.dateMenu2 = false;
    },
    saveDate2(date) {
      this.sale.createdAt = date;
      this.dateMenu3 = false;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.order = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    clearOrder() {
      this.order.description = "";
      this.order.customer = "";
      this.order.deliveryDate = "";
      this.order.total = 0;
      this.order.deposit = 0;
      this.order.status = "";
      this.order.details = [];
      this.detailProduct = "";
      this.detailQuantity = 1;
      this.detailAggregateDiscount = 0;
      this.sale.ticketType = "Cotización";
      this.sale.customer = "";
      this.sale.seller = "";
      this.sale.salePoint = 0;
      this.sale.createdAt = null;
      this.selectedCashRegister = "";
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

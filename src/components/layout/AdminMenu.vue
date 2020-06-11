<template>
  <div>
    <Alert />

    <v-navigation-drawer class="nav" app dark width="300px" color="black" permanent>
      <h2 style="text-align:center">Panel de Administrador</h2>
      <v-list nav>
        <v-list-item link :to="{ name: 'adminProducts' }">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="white">Todos los productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'websiteProducts' }">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="white">Productos del website</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'promotionProducts' }">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="white">Productos en oferta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'featuredProducts' }">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="white">Productos destacados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'order' }">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="white">Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'users' }">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="white">Gestionar usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="white">Volver al website</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Alert from "../Alert";
export default {
  name: "adminMenu",
  components: {
    Alert
  },
  data: () => ({}),
  created() {},
  methods: {}
};
</script>

<style lang="scss">
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

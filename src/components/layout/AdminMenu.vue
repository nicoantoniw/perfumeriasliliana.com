<template>
  <div
    v-if="
          checkRoute === '/admin/products' ||
            checkRoute === '/admin/orders' ||
            checkRoute === '/admin/categories' ||
            checkRoute === '/admin/options' ||
            checkRouteByName === 'variants' ||
            checkRoute === '/admin/website-products' ||
            checkRoute === '/admin/featured-products' ||
            checkRoute === '/admin/promotion-products' ||
            checkRoute === '/admin/users'
        "
  >
    <Alert />
    <v-navigation-drawer class="nav" app dark width="200" color="black" permanent>
      <h2 style="text-align:center">Panel de Administrador</h2>
      <v-list nav>
        <v-list-item link :to="{ name: 'adminProducts' }">
          <v-list-item-content>
            <v-list-item-title color="white">Todos los productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'adminCategories' }">
          <v-list-item-content>
            <v-list-item-title color="white">Categorias</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'options' }">
          <v-list-item-content>
            <v-list-item-title color="white">Opciones de Producto</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'websiteProducts' }">
          <v-list-item-content>
            <v-list-item-title color="white">Productos del website</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'promotionProducts' }">
          <v-list-item-content>
            <v-list-item-title color="white">Productos en oferta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'featuredProducts' }">
          <v-list-item-content>
            <v-list-item-title color="white">Productos destacados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'order' }">
          <v-list-item-content>
            <v-list-item-title color="white">Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'users' }">
          <v-list-item-content>
            <v-list-item-title color="white">Gestionar usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/">
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
  computed: {
    checkRoute() {
      return this.$route.path;
    },
    checkRouteByName() {
      return this.$route.name;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.v-navigation-drawer {
  .v-navigation-drawer__content {
    .v-list {
      .v-list-item {
        .v-list-item__title {
          font-size: 14px;
        }
      }
    }
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

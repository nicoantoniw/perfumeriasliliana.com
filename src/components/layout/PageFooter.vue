<template>
  <div
    class="footer-container"
    v-if="
      checkRoute !== '/admin/products' &&
        checkRoute !== '/admin/website-products' &&
        checkRoute !== '/admin/orders' &&
        checkRoute !== '/admin/featured-products' &&
        checkRoute !== '/admin/promotion-products' &&
        checkRoute !== '/admin/users'
    "
  >
    <div class="footer-boxes">
      <div class="footer-box">
        <router-link :to="{ name: 'about' }">
          <p>Quienes somos</p>
        </router-link>
        <router-link :to="{ name: 'contact' }">
          <p>Contacto</p>
        </router-link>
        <router-link :to="{ name: 'stores' }">
          <p>Sucursales</p>
        </router-link>
      </div>
      <div class="footer-box">
        <router-link :to="{ name: 'faqs' }">
          <p>Formas de pago</p>
        </router-link>
        <router-link :to="{ name: 'faqs' }">
          <p>Metodos de envio</p>
        </router-link>
        <router-link :to="{ name: 'faqs' }">
          <p>Preguntas frecuentes</p>
        </router-link>
      </div>

      <div class="footer-box">
        <h1 style="margin-bottom:1rem">logo</h1>
        <div class="icons">
          <a href="https://instagram.com/perfumeriasliliana" target="_blank">
            <v-icon style="margin-right:1rem;margin-bottom:1rem" x-large color="#000">mdi-instagram</v-icon>
          </a>
          <a href="https://wa.me/" target="_blank">
            <v-icon style="margin-bottom:1rem" x-large color="#000">mdi-whatsapp</v-icon>
          </a>
        </div>
      </div>
      <div class="footer-box">
        <div class="email">
          <v-icon x-large color="#000">mdi-email-outline</v-icon>
          <a href="mailto:perfuliliana@yahoo.com.ar" target="_blank">
            <p>perfuliliana@yahoo.com.ar</p>
          </a>
        </div>
        <h2 style="margin-bottom:.5rem">Horarios</h2>
        <p>Lunes a Sabados de:</p>
        <p>9:00 a 16:00</p>
        <!-- <p>9:00 a 13:00 y 16:00 a 20:00</p> -->
      </div>
    </div>
    <div class="ozix-container">
      <p>&copy 2020 Perfumeria Liliana. Todos los derechos reservados.</p>
      <div>
        <p>
          Designed by
          <span>
            <a href="https://ozixmedia.com" target="_blank">Ozixmedia</a>
          </span>
        </p>
        <a href="https://ozixmedia.com" target="_blank">
          <img src="../../assets/ozixmedia-logo.png" alt="ozixmedia-logo" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageFooter",
  data: () => ({}),
  computed: {
    checkRoute() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  background: #eee;
}

.footer-boxes {
  padding: 2rem;
  display: flex;

  .footer-box {
    margin: auto;
    a {
      color: black;
      text-decoration: none;
    }
    .icons {
      a {
        text-decoration: none;
      }
    }
    p {
      font-size: 1.1rem;
    }

    .email {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .v-icon {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
}

.ozix-container {
  display: flex;
  justify-content: space-between;
  background: #000;
  width: 100%;
  padding: 1rem;
  p {
    margin: auto;
    color: white;
  }

  div {
    margin: auto;
    display: flex;
  }
  p {
    margin-right: 1rem;
  }

  a {
    text-decoration: none;
    color: white;
  }

  img {
    height: 70px;
  }
}
</style>

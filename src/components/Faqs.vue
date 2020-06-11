<template>
  <div>
    <v-icon class="mb-8 ml-8" color="black" @click="goBack" x-large>arrow_back</v-icon>
    <div class="faqs-container">
      <h1>Preguntas Frecuentes</h1>
      <div class="faqs">
        <h2 v-if="!show1" @click="show1=true">
          Medios de pago
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show1=false">
          Medios de pago
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show1"
        >Todas las compras on-line se realizan de forma segura a través de Mercadopago, con todos los medios de pago disponibles en la plataforma. Una vez seleccionados los productos y confirmado la compra, el usuario es reedirigido a la pagina de Mercadopago para elegir la forma de pago y finalizar la compra de forma segura.</p>
        <h2 v-if="!show2" @click="show2=true">
          Envios
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show2=false">
          Envios
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show2"
        >Se realizan envíos a todo el país a través de Correo Argentino</p>
        <h2 v-if="!show3" @click="show3=true">
          Costos de envío
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show3=false">
          Costos de envío
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show3"
        >El costo de los envíos es de $250 cuando la compra es menor a 4000.</p>
        <h2 v-if="!show4" @click="show4=true">
          Envíos Gratis
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show4=false">
          Envíos Gratis
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show4"
        >Los envíos gratis se realizan en todo el país con las compras mayores a $4000</p>
        <h2 v-if="!show8" @click="show8=true">
          Retiro en Sucursal
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show8=false">
          Retiro en sucursal
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p class="answer" v-if="show8">
          Todas las compras pueden ser retiradas en cualquiera de nuestros locales eligiendo "Retiro en Sucursal" como forma de envío.
          <span>
            <router-link :to="{ name: 'stores' }">
              <p>Ver sucursales</p>
            </router-link>
          </span>
        </p>
        <h2 v-if="!show5" @click="show5=true">
          Confirmación de Pago
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show5=false">
          Confirmación de Pago
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show5"
        >Si elegiste como medio de pago una tarjeta de crédito, la compra se acreditará en el momento, si elegis otro medio de pago la confirmación puede tardar hasta dos días habiles</p>
        <h2 v-if="!show6" @click="show6=true">
          Ver estado de compra
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show6=false">
          Confirmación de Pago
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show6"
        >Podes ver el estado de tu compra en la sección Mis Compras, en el Menu de cuenta.</p>
        <h2 v-if="!show7" @click="show7=true">
          No puedo realizar una compra después de registrarme
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show7=false">
          No puedo realizar una compra después de registrarme
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show7"
        >Si te registraste y no podes realizar ninguna compra, asegurate de haber confirmado la cuenta siguiendo el link de confirmación que te mandamos a tu correo electrónico. Si no lo encontrás en tu bandeja, puede que esté en Spam.</p>
        <h2 v-if="!show9" @click="show9=true">
          Cambio de un producto abierto o fragancia
          <span>
            <v-icon color="black">mdi-arrow-down-drop-circle</v-icon>
          </span>
        </h2>
        <h2 v-else @click="show9=false">
          Cambio de un producto abierto o fragancia
          <span>
            <v-icon color="black">mdi-arrow-left-drop-circle</v-icon>
          </span>
        </h2>
        <p
          class="answer"
          v-if="show9"
        >Las fragancias o productos abiertos no tienen cambio. La única excepción es que presente fallas en su funcionamiento. Recordar que los aspectos subjetivos, como la persistencia, no son motivo de cambio.</p>
      </div>
      <h2>Ante cualquier otra duda consulta nuestros medios de contacto y comunicate con nosotros</h2>
      <router-link style="color:black" :to="{ name: 'contact' }">
        <h2>Ver medios de Contacto</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";
import moment from "moment";

export default {
  name: "faqs",
  data: () => ({
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show7: false,
    show8: false,
    show9: false,
    show10: false,
    show11: false
  }),

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.faqs-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 3rem;
  .answer {
    transition: 0.5s ease-in-out;
  }
  h1 {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.5rem;
  }
}
</style>

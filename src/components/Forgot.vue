<template>
  <div class="restore-container">
    <h1>Reestablecer contraseña</h1>
    <v-text-field v-model="email" placeholder="Ingrese su email" outlined color="black"></v-text-field>
    <v-btn v-if="button" @click="restorePassword" dark>Enviar</v-btn>
    <v-progress-circular v-if="loader" indeterminate color="blue lighten-2"></v-progress-circular>
    <v-alert
      v-if="!button"
      type="info"
      border="top"
      color="purple darken-2"
    >Contraseña reestablecida. Revisa tu casilla de correo e ingresa con la nueva clave.</v-alert>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";

export default {
  name: "forgot",

  data: () => ({
    button: true,
    loader: false,
    email: ""
  }),
  methods: {
    async restorePassword() {
      this.loader = true;
      const data = {
        email: this.email
      };
      try {
        const response = await axios.put(
          `/website/user/restore-password`,
          data
        );
        const password = response.data.password;
        console.log(password);
        const data2 = {
          subject: "Contraseña reestablecida",
          sender: "perfuliliana@yahoo.com.ar",
          receiver: this.email,
          html: `<h1>Cambio de Contraseña</h1>

          <h2>La nueva contraseña es: ${password}</h2>
        
        <p>Para mayor seguridad, ingresa a tu cuenta con la nueva contraseña y cambiala por una nueva.</p>
        `
        };
        await axios.post(`/website/user/send-email`, data2);
        this.loader = false;
        this.button = false;
      } catch (error) {
        this.loader = false;
        errorAlertHandler(error, "Usuario no encontrado");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.restore-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
  h1 {
    margin-bottom: 3rem;
  }
  .v-text-field {
    margin: auto;
    width: 20%;
  }
  .v-btn {
    width: 10%;
    margin: auto;
    margin-bottom: 3rem;
  }
  .v-alert {
    width: 30%;
    margin: auto;
  }
  .v-progress-circular {
    margin: auto;
  }
}
@media only screen and (max-width: 1264px) {
}
</style>

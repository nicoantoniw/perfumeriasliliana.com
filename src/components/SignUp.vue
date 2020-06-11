<template>
  <div class="signup-container" style="margin-top:4rem">
    <h1>Registrarse</h1>
    <div class="email-password">
      <v-text-field outlined color="black" v-model="email" label="Direccion de correo"></v-text-field>
      <v-text-field outlined color="black" v-model="password" type="password" label="Contraseña"></v-text-field>
      <v-text-field outlined color="black" type="password" label="Confirmar Contraseña"></v-text-field>
    </div>
    <div class="data"></div>
    <h1>Datos de envio</h1>
    <v-row>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="name" outlined label="Nombre"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="surname" outlined label="Apellido"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="id" outlined label="DNI"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="phone" outlined label="Telefono"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="address" outlined label="Direccion"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="province" outlined label="Provincia"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="city" outlined label="Localidad"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" sm="12" xs="12" md="6">
        <v-text-field color="black" v-model="zip" outlined label="Codigo postal"></v-text-field>
      </v-col>
    </v-row>
    <v-btn x-large color="black" @click="signup" dark>Registrarse</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";

export default {
  name: "signUp",
  data: () => ({
    email: "",
    password: "",
    name: "",
    surname: "",
    id: "",
    phone: "",
    address: "",
    province: "",
    city: "",
    zip: ""
  }),
  methods: {
    async signup() {
      let data = {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        id: this.id,
        phone: this.phone,
        address: this.address,
        province: this.province,
        city: this.city,
        zip: this.zip
      };
      try {
        await axios.post("/auth/website-signup", data);
        data = {
          email: this.email,
          password: this.password
        };
        this.$router.replace("/");
        this.$store.dispatch("login", data);
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Se ha registrado correctamente"
        });
      } catch (error) {
        if (error.response.status) {
          this.$store.dispatch("showAlert", {
            status: true,
            type: "error",
            text: "Por favor, complete todos los campos."
          });
        } else {
          errorAlertHandler(
            error,
            "Ya se encuentra registrada una cuenta con el correo especificado"
          );
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.signup-container {
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .email-password {
    width: 80%;
    display: flex;
    margin-bottom: 1rem;
    .v-text-field {
      margin-right: 1rem;
    }
  }
  h1 {
    margin-bottom: 2rem;
  }
}
</style>

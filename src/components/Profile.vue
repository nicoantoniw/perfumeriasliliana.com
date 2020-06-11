<template>
  <div class="profile-container">
    <router-link :to="{ name: 'home' }">
      <v-icon class="mb-8" color="black" x-large>arrow_back</v-icon>
    </router-link>

    <h2>Cambiar contraseña</h2>
    <v-row>
      <v-col cols="12" lg="4" sm="12" xs="12" md="4">
        <v-text-field
          type="password"
          color="black"
          outlined
          v-model="oldPassword"
          placeholder="Contraseña actual"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="4" sm="12" xs="12" md="4">
        <v-text-field
          type="password"
          color="black"
          outlined
          v-model="password"
          placeholder="Nueva contraseña"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" sm="12" xs="12" md="2">
        <v-btn dark x-large @click="changePassword">CAMBIAR</v-btn>
        <v-progress-circular class="loader" v-if="loader1" indeterminate dark></v-progress-circular>
      </v-col>
    </v-row>
    <h2>Datos Personales</h2>
    <v-row>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="name" outlined label="Nombre"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="surname" outlined label="Apellido"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="id" outlined label="DNI"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="phone" outlined label="Telefono"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="address" outlined label="Direccion"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="province" outlined label="Provincia"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="city" outlined label="Localidad"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="3">
        <v-text-field color="black" v-model="zip" outlined label="Codigo postal"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12" md="6">
        <v-btn x-large dark @click="updateUser">ACTUALIZAR DATOS</v-btn>
        <v-progress-circular class="loader" v-if="loader2" indeterminate dark></v-progress-circular>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";
import moment from "moment";

export default {
  name: "stores",
  data: () => ({
    oldPassword: "",
    password: "",
    name: "",
    surname: "",
    id: "",
    phone: "",
    address: "",
    province: "",
    city: "",
    zip: "",
    loader1: false,
    loader2: false
  }),
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get(`/website/user/user`);
        const user = response.data.user;
        this.name = user.name;
        this.surname = user.surname;
        this.id = user.idNumber;
        this.phone = user.phone;
        this.address = user.address;
        this.province = user.province;
        this.city = user.city;
        this.zip = user.zip;
      } catch (error) {
        errorAlertHandler(err, "error");
      }
    },
    async updateUser() {
      this.loader2 = true;
      try {
        const data = {
          name: this.name,
          surname: this.surname,
          idNumber: this.id,
          phone: this.phone,
          address: this.address,
          province: this.province,
          city: this.city,
          zip: this.zip
        };
        await axios.put(`/website/user/update`, data);
        this.loader2 = false;
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Usuario actualizado"
        });
      } catch (error) {
        this.loader2 = false;
        errorAlertHandler(error, "error");
      }
    },
    async changePassword() {
      this.loader1 = true;
      const data = {
        oldPassword: this.oldPassword,
        password: this.password
      };
      try {
        await axios.post(`/website/user/change-password`, data);
        this.clear();
        this.loader1 = false;
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Se ha cambiado la contraseña"
        });
      } catch (err) {
        this.loader1 = false;
        errorAlertHandler(err, "error");
      }
    },
    clear() {
      this.oldPassword = "";
      this.password = "";
    }
  }
};
</script>

<style lang="scss">
.profile-container {
  margin-bottom: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  .loader {
    margin-left: 1rem;
  }
  a {
    text-decoration: none;
  }
}
</style>

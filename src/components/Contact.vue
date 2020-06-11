<template>
  <div>
    <v-icon class="mb-8 ml-8" color="black" @click="goBack" x-large>arrow_back</v-icon>
    <div class="contact-container">
      <div class="contact-boxes">
        <div class="contact-box">
          <v-icon color="black" size="10rem">mdi-email</v-icon>
          <h2>E-mail</h2>
          <p>perfuliliana@yahoo.com.ar</p>
        </div>
        <div class="contact-box">
          <a href="https://instagram.com/perfumeriasliliana" target="_blank">
            <v-icon color="black" size="10rem">mdi-instagram</v-icon>
          </a>
          <a href="https://instagram.com/perfumeriasliliana" target="_blank">
            <h2>Instagram</h2>
          </a>
          <a href="https://instagram.com/perfumeriasliliana" target="_blank">
            <p>@perfumeriasliliana</p>
          </a>
        </div>
        <div class="contact-box">
          <a href="https://wa.me/" target="_blank">
            <v-icon color="black" size="10rem">mdi-whatsapp</v-icon>
          </a>
          <a href="https://wa.me/" target="_blank">
            <h2>Whatsapp</h2>
          </a>
          <a href="https://wa.me/" target="_blank">
            <p>1111111111</p>
          </a>
        </div>
      </div>
      <div class="contact-form">
        <h1>Envianos tu consulta</h1>
        <v-textarea outlined color="black" v-model="message"></v-textarea>
        <button class="btn" @click="sendEmail">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../util/error";
import moment from "moment";

export default {
  name: "contact",
  data: () => ({
    message: "",
    subject: "Consulta desde Pagina Web",
    receiver: "perfuliliana@yahoo.com.ar"
  }),
  methods: {
    async sendEmail() {
      const data = {
        subject: this.subject,
        receiver: this.receiver,
        html: `Mensaje de: ${this.$store.state.email}
        
        <p>${this.message}</p>
        `
      };
      try {
        await axios.post(`/website/user/send-email`, data);
        this.subject = "";
        this.message = "";
        this.$store.dispatch("showAlert", {
          status: true,
          type: "success",
          text: "Mensage enviado"
        });
      } catch (err) {
        errorAlertHandler(err, "");
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.contact-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 4rem;
  .contact-boxes {
    display: flex;
    margin-bottom: 5rem;
    .contact-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 3.5rem;
      a {
        color: black;
        text-decoration: none;
      }
    }
  }
  .contact-form {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
    .btn {
      width: 20%;
      margin: auto;
      background: #000;
      color: white;
      padding: 0.7rem;
      transition: 0.3s ease-in-out;
      border: 1px solid #000;
      font-size: 1.2rem;
      &:hover {
        background: white;
        color: black;
        border: 1px solid #000;
      }
    }
  }
}
</style>

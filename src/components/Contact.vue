<template>
  <div>
    <v-icon class="mt-3 mb-8 ml-8" color="black" @click="goBack" x-large
      >arrow_back</v-icon
    >
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
        <v-text-field
          v-model="email"
          outlined
          placeholder="Ingrese su email"
        ></v-text-field>
        <v-textarea
          outlined
          color="black"
          placeholder="Mensaje..."
          v-model="message"
        ></v-textarea>
        <vue-recaptcha
          sitekey="6Lfkl6UZAAAAANkMcb_9uLlDjg5n2_5HpXTMqcnl"
          :loadRecaptchaScript="true"
          @verify="captchaVerify"
          @error="captchaError"
          @expired="captchaExpired"
          style="margin:auto"
        ></vue-recaptcha>
        <v-btn
          :disabled="!button"
          color="black"
          class="white--text"
          @click="sendEmail"
          >Enviar</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import errorAlertHandler from '../util/error';
import moment from 'moment';
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'contact',
  components: {
    VueRecaptcha,
  },
  data: () => ({
    message: '',
    button: false,
    email: '',
  }),
  methods: {
    async sendEmail() {
      const data = {
        subject: 'Consulta desde Pagina Web',
        receiver: 'perfuliliana@yahoo.com.ar',
        sender: 'mailer@perfumerialiliana.com',
        html: `Mensaje de: ${this.email}
        
        <p>${this.message}</p>
        `,
      };
      try {
        const response2 = await axios.post(`/website/user/send-email`, data);
        console.log(response2.data.message);
        this.subject = '';
        this.message = '';
        this.email = '';
        this.$store.dispatch('showAlert', {
          status: true,
          type: 'success',
          text: 'Mensage enviado',
        });
      } catch (err) {
        errorAlertHandler(err, '');
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    captchaVerify() {
      this.button = true;
    },
    captchaError() {
      this.$store.dispatch('showAlert', {
        status: true,
        type: 'error',
        text: 'Error de verificacion, por favor intenta de nuevo',
      });
    },
    captchaExpired() {
      this.$store.dispatch('showAlert', {
        status: true,
        type: 'warning',
        text: 'Captcha expirado, por favor intenta de nuevo',
      });
    },
  },
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
    .v-text-field {
      width: 60%;
      margin: auto;
    }
    .v-btn {
      width: 20%;
      margin: auto;
      margin-top: 2rem;
    }
  }
}

@media only screen and (max-width: 1264px) {
  .contact-boxes {
    flex-direction: column;
  }
}
</style>

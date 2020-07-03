<template>
  <div class="success-container">
    <h2>El pago fue exitoso</h2>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";

export default {
  name: "paymentSuccess",
  data: () => ({}),
  created() {
    this.confirmPayment();
  },
  methods: {
    async confirmPayment() {
      const response = await axios.get(`/website/user/user`);
      const orderId = response.data.user.lastOrder;
      await axios.patch(`/order/status/${orderId}`, { status: "No preparado" });
      setTimeout(() => {
        this.$router.replace("/");
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
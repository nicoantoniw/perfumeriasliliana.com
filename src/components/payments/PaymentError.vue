<template>
  <div class="success-container">
    <h2>El pago fue rechazado, por favor intente de nuevo o elija otro medio de pago</h2>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";

export default {
  name: "paymentError",
  data: () => ({}),
  created() {
    this.declinePayment();
  },
  methods: {
    async declinePayment() {
      const response = await axios.get(`/website/user/user`);
      const orderId = response.data.user.lastOrder;
      await axios.patch(`/order/status/${orderId}`, {
        status: "delete"
      });
      setTimeout(() => {
        this.$router.replace("/cart");
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
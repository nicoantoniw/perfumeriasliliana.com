<template>
  <v-alert
    :type="this.$store.state.alertType"
    :value="this.$store.state.alert"
    dismissible
    prominent
    class="alert"
    border="top"
    elevation="5"
    transition="slide-y-transition"
    mode="in-out"
  >{{this.$store.state.alertMessage}}</v-alert>
</template>

<script>
export default {
  name: "alert"
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 961px) {
  .alert {
    position: fixed;
    width: 900px;
    bottom: 0.1%;
    z-index: 1000;
    left: 30%;
  }

  .v-alert {
    .v-alert__wrapper {
      .v-alert__content {
        font-size: 7rem;
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .alert {
    position: fixed;
    width: 100%;
    top: 0.1%;
    z-index: 1000;
    left: 0;
  }
  .v-alert {
    .v-alert__wrapper {
      .v-alert__content {
        font-size: 7rem;
      }
    }
  }
}
</style>